#!/usr/bin/env python3
"""Fill the gaps in the Marathi voice-over pack (assets/VO-MR) with Gemini TTS.

    GEMINI_API_KEY=... python3 build/gen_mr_vo.py --match '^p(29|30)'
    python3 build/gen_mr_vo.py --dry                 # show what would be said

The 270 clips already in assets/VO-MR were made on 2026-11-03 with the
"Ai Wala Human By Aamir" studio, voice "Female Child (Energetic)". That studio
is Gemini TTS underneath: model gemini-3.1-flash-tts-preview, prebuilt voice
Zephyr, style "Bright, energetic, and engaging". This script asks the same
model for the same voice directly, so the lines the studio could not finish
(its rate limit, then its own API credit running out) can be made without it.

By default it makes every line the Hindi pack has a clip for and the Marathi
pack does not (voiceOver.hi.files minus voiceOver.mr.files). --match / --only
narrow that; --force remakes lines that already have a clip.

Smooth with the clips already there:
  * the text is said, not read: digits, ½ × = + and the letters a b h d are
    written out as Marathi words first (spoken() below), so a formula line is
    not stumbled over;
  * each clip keeps the same lead-in and tail as the studio clips (0.15 s and
    0.25 s), is levelled to their loudness (about -17.5 LUFS) and encoded the
    same way (Opus 48 kb/s VBR, mono), each saved as N.webm under the number
    the Hindi pack uses for that line.

The raw API answers (24 kHz PCM as .wav) are kept in raw-audio/VO-MR/, so a
clip can be re-cut without paying for it again. A line is only re-requested
when its spoken text, voice or model changes, or with --force. Afterwards
voiceOver.mr in locales-quadrilaterals.json is updated and gen_locales.py run.
"""

import argparse
import array
import base64
import glob
import hashlib
import json
import os
import pathlib
import re
import shutil
import subprocess
import sys
import time
import urllib.error
import urllib.request
import wave

ROOT = pathlib.Path(__file__).resolve().parent.parent
SRC = ROOT / "locales" / "locales-quadrilaterals.json"
OUT_DIR = ROOT / "assets" / "VO-MR"
RAW_DIR = ROOT / "raw-audio" / "VO-MR"

MODEL = os.environ.get("GEMINI_TTS_MODEL", "gemini-3.1-flash-tts-preview")
VOICE = os.environ.get("GEMINI_VOICE", "Zephyr")          # the studio's "Female Child (Energetic)"
STYLE = "Say in Marathi, in a bright, energetic and engaging young girl's voice, clearly for a school child"

LEAD_S = 0.15          # sound kept before the first word (as the studio clips were cut)
TAIL_S = 0.25          # and after the last
TARGET_LUFS = -17.5    # the studio clips measure -16.3 to -18.3
SILENCE_DB = -45.0     # below this (dBFS, 10 ms windows) counts as silence


# ------------------------------------------------------------ spoken words
NUM = {
    1: "एक", 2: "दोन", 3: "तीन", 4: "चार", 5: "पाच", 6: "सहा", 8: "आठ", 10: "दहा",
    11: "अकरा", 12: "बारा", 13: "तेरा", 14: "चौदा", 15: "पंधरा", 16: "सोळा", 20: "वीस",
    22: "बावीस", 24: "चोवीस", 30: "तीस", 32: "बत्तीस", 33: "तेहतीस", 40: "चाळीस",
    66: "सहासष्ट", 70: "सत्तर", 90: "नव्वद", 96: "शहाण्णव", 120: "एकशे वीस",
    165: "एकशे पासष्ट", 180: "एकशे ऐंशी", 240: "दोनशे चाळीस", 480: "चारशे ऐंशी",
    525: "पाचशे पंचवीस",
}
LETTER = {"a": "ए", "b": "बी", "h": "एच", "d": "डी", "A": "ए"}
SUB = {"₁": "एक", "₂": "दोन"}

# whole phrases first, then symbols
PHRASES = [
    ("(बाजू)²", "बाजूचा वर्ग"),
    ("(90°)", ", नव्वद अंशात,"),
    ("चौ. सेमी", "चौरस सेंटीमीटर"),
    ("सेमी", "सेंटीमीटर"),
]
SYMBOLS = [
    ("½", " एक द्वितीयांश "),
    ("×", " गुणिले "),
    ("=", " बरोबर "),
    ("+", " अधिक "),
    ("·", ", "),
    ("°", " अंश"),
    ("(", ", "),          # a breath before a bracketed sum, and after it
    (")", ", "),
]


def spoken(text):
    s = text
    for a, b in PHRASES:
        s = s.replace(a, b)

    def num(m):
        n = int(m.group(0))
        if n not in NUM:
            raise SystemExit("no Marathi words for the number %d in: %s" % (n, text))
        return NUM[n]
    s = re.sub(r"\d+", num, s)
    s = re.sub(r"(?<![A-Za-z])([abhdA])([₁₂]?)(?![A-Za-z])",
               lambda m: " " + LETTER[m.group(1)] + (" " + SUB[m.group(2)] if m.group(2) else "") + " ", s)
    for a, b in SYMBOLS:
        s = s.replace(a, b)
    s = re.sub(r"\s+,", ",", s)
    s = re.sub(r",\s*([,.!?।:])", r"\1", s)
    s = re.sub(r"([.!?।:])\s*,", r"\1", s)
    s = re.sub(r",(\s*,)+", ",", s)
    s = re.sub(r"\s+", " ", s).strip().lstrip(", ")
    left = re.findall(r"[A-Za-z0-9½×=+·°²₁₂()]", s)
    if left:
        raise SystemExit("unspoken symbols %r left in: %s" % (left, s))
    return s


def line_texts(data):
    """key -> (file, Marathi text) for every line the Hindi pack has."""
    mr = data["mr"]
    out = {}
    for key, file in data["voiceOver"]["hi"]["files"].items():
        base, _, idx = key.partition(".")
        val = mr[base]
        if idx:
            val = val[int(idx)]
        out[key] = (file, val)
    return out


# -------------------------------------------------------------- the API
def tts(text, key):
    """24 kHz mono 16-bit PCM for the text, and its sample rate"""
    url = "https://generativelanguage.googleapis.com/v1beta/models/%s:generateContent" % MODEL
    body = {
        "contents": [{"parts": [{"text": "%s: %s" % (STYLE, text)}]}],
        "generationConfig": {
            "responseModalities": ["AUDIO"],
            "speechConfig": {"voiceConfig": {"prebuiltVoiceConfig": {"voiceName": VOICE}}},
        },
    }
    for attempt in range(6):
        req = urllib.request.Request(url, data=json.dumps(body).encode(), method="POST",
                                     headers={"x-goog-api-key": key, "Content-Type": "application/json"})
        try:
            with urllib.request.urlopen(req, timeout=180) as r:
                res = json.loads(r.read())
            part = res["candidates"][0]["content"]["parts"][0]["inlineData"]
            m = re.search(r"rate=(\d+)", part.get("mimeType", ""))
            return base64.b64decode(part["data"]), int(m.group(1)) if m else 24000
        except urllib.error.HTTPError as e:
            msg = e.read().decode(errors="replace")[:400]
            if e.code in (429, 500, 502, 503, 504):
                time.sleep(10 * (attempt + 1))
                continue
            raise SystemExit("Gemini %d: %s" % (e.code, msg))
        except (KeyError, IndexError) as e:
            raise SystemExit("Gemini sent no audio (%s) for: %s\n%s" % (e, text, json.dumps(res)[:400]))
        except (urllib.error.URLError, TimeoutError):
            time.sleep(10 * (attempt + 1))
    raise SystemExit("Gemini kept failing for: " + text)


# -------------------------------------------------------------- the audio
def ffmpeg_bin():
    if os.environ.get("FFMPEG"):
        return os.environ["FFMPEG"]
    try:
        import imageio_ffmpeg
        return imageio_ffmpeg.get_ffmpeg_exe()
    except ImportError:
        pass
    if shutil.which("ffmpeg"):
        return shutil.which("ffmpeg")
    hits = sorted(glob.glob(os.path.expanduser("~/.cache/uv/archive-v0/*/imageio_ffmpeg/binaries/ffmpeg-*")))
    if hits:
        return hits[0]
    raise SystemExit("no ffmpeg: set FFMPEG=/path/to/ffmpeg or pip install imageio-ffmpeg")


FF = None


def ff(*args):
    return subprocess.run([FF, "-hide_banner", "-nostdin", "-y", *args],
                          capture_output=True, text=True, check=True)


def voiced_span(wav_path):
    """first and last moment above SILENCE_DB, in seconds"""
    with wave.open(str(wav_path)) as w:
        rate = w.getframerate()
        pcm = array.array("h", w.readframes(w.getnframes()))
    win = rate // 100
    thr = (10 ** (SILENCE_DB / 20) * 32768) ** 2
    loud = []
    for i in range(0, len(pcm), win):
        seg = pcm[i:i + win]
        if seg and sum(x * x for x in seg) / len(seg) > thr:
            loud.append(i)
    total = len(pcm) / rate
    if not loud:
        return 0.0, total
    return loud[0] / rate, min(total, (loud[-1] + win) / rate)


def loudness(path):
    r = ff("-i", str(path), "-af", "ebur128", "-f", "null", "-")
    m = re.findall(r"I:\s+(-?[\d.]+) LUFS", r.stderr)
    return float(m[-1]) if m else TARGET_LUFS


def cut(raw_wav, out_webm, tmp):
    wav = tmp / "full.wav"
    ff("-i", str(raw_wav), "-ac", "1", "-ar", "48000", str(wav))
    first, last = voiced_span(wav)
    start = max(0.0, first - LEAD_S)
    with wave.open(str(wav)) as w:
        total = w.getnframes() / w.getframerate()
    end = min(total, last + TAIL_S)
    dur = end - start
    trimmed = tmp / "trim.wav"
    ff("-i", str(wav), "-ss", "%.3f" % start, "-t", "%.3f" % dur, str(trimmed))
    gain = TARGET_LUFS - loudness(trimmed)
    fade_out = min(0.06, dur / 4)
    af = ("volume=%.2fdB,alimiter=limit=0.94:attack=2:release=40:level=disabled,"
          "afade=t=in:d=0.012,afade=t=out:st=%.3f:d=%.3f" % (gain, dur - fade_out, fade_out))
    ff("-i", str(trimmed), "-af", af, "-c:a", "libopus", "-b:a", "48k", "-vbr", "on",
       "-ac", "1", str(out_webm))
    return dur


# -------------------------------------------------------------- main
def main():
    global FF
    ap = argparse.ArgumentParser()
    ap.add_argument("--only", help="comma-separated keys")
    ap.add_argument("--match", help="regex on the keys, e.g. '^p(29|30)'")
    ap.add_argument("--force", action="store_true", help="remake lines that already have a clip")
    ap.add_argument("--dry", action="store_true", help="print the spoken text and stop")
    ap.add_argument("--from", dest="src_dir", metavar="DIR",
                    help="take each line's audio from DIR/N.wav (a studio batch download) "
                         "instead of calling Gemini; lines with no N.wav there are skipped")
    args = ap.parse_args()

    data = json.loads(SRC.read_text(encoding="utf-8"))
    pack = data["voiceOver"].get("mr", {"dir": "assets/VO-MR/", "files": {}})
    files = dict(pack.get("files", {}))
    lines = line_texts(data)
    if not args.force:
        lines = {k: v for k, v in lines.items() if k not in files}
    if args.only:
        want = set(args.only.split(","))
        lines = {k: v for k, v in lines.items() if k in want}
    if args.match:
        lines = {k: v for k, v in lines.items() if re.search(args.match, k)}

    jobs = {k: {"file": f, "text": t, "spoken": spoken(t)} for k, (f, t) in lines.items()}

    if args.dry or not jobs:
        for k, j in jobs.items():
            print("%-16s %-5s %s\n%22s → %s" % (k, j["file"], j["text"], "", j["spoken"]))
        print("\n%d lines to make" % len(jobs))
        return

    key = os.environ.get("GEMINI_API_KEY") or os.environ.get("GOOGLE_API_KEY")
    src_dir = pathlib.Path(args.src_dir) if args.src_dir else None
    if src_dir:
        have = {k: j for k, j in jobs.items() if (src_dir / (j["file"].rsplit(".", 1)[0] + ".wav")).exists()}
        for k in jobs.keys() - have.keys():
            print("skipped %-16s no %s.wav in %s" % (k, jobs[k]["file"].rsplit(".", 1)[0], src_dir))
        jobs = have
        if not jobs:
            raise SystemExit("nothing to take from " + str(src_dir))
    elif not key:
        raise SystemExit("set GEMINI_API_KEY")
    FF = ffmpeg_bin()
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    RAW_DIR.mkdir(parents=True, exist_ok=True)
    tmp = pathlib.Path(os.environ.get("TMPDIR", "/tmp")) / "mr-vo"
    tmp.mkdir(parents=True, exist_ok=True)

    replaced = False
    for n, (k, j) in enumerate(jobs.items(), 1):
        stem = j["file"].rsplit(".", 1)[0]
        raw_wav, raw_json = RAW_DIR / (stem + ".wav"), RAW_DIR / (stem + ".json")
        digest = hashlib.sha1((MODEL + VOICE + STYLE + j["spoken"]).encode()).hexdigest()
        meta = json.loads(raw_json.read_text()) if raw_json.exists() else {}
        if src_dir:
            shutil.copyfile(src_dir / (stem + ".wav"), raw_wav)
            raw_json.write_text(json.dumps({"key": k, "text": j["text"], "source": "studio batch",
                                            "from": str(src_dir)}, ensure_ascii=False), encoding="utf-8")
            fresh = "studio"
        elif args.force or meta.get("digest") != digest or not raw_wav.exists():
            pcm, rate = tts(j["spoken"], key)
            with wave.open(str(raw_wav), "wb") as w:
                w.setnchannels(1)
                w.setsampwidth(2)
                w.setframerate(rate)
                w.writeframes(pcm)
            raw_json.write_text(json.dumps({"key": k, "digest": digest, "text": j["text"],
                                            "spoken": j["spoken"], "model": MODEL, "voice": VOICE},
                                           ensure_ascii=False), encoding="utf-8")
            fresh = "new"
        else:
            fresh = "cached"
        out = OUT_DIR / j["file"]
        replaced = replaced or out.exists()
        dur = cut(raw_wav, out, tmp)
        files[k] = j["file"]
        print("[%2d/%d] %-16s %-6s %5.2fs  %s" % (n, len(jobs), k, fresh, dur, j["text"]), flush=True)

    order = list(data["voiceOver"]["hi"]["files"])
    pack["files"] = {k: files[k] for k in order if k in files}
    if replaced or "rev" not in pack:
        pack["rev"] = time.strftime("%Y%m%d")     # a clip changed under its old name: refetch
    data["voiceOver"]["mr"] = pack
    SRC.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    subprocess.run([sys.executable, str(ROOT / "build" / "gen_locales.py")], check=True)
    print("voiceOver.mr: %d of %d lines voiced" % (len(pack["files"]), len(order)))


if __name__ == "__main__":
    main()
