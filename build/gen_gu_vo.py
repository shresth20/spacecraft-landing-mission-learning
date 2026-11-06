#!/usr/bin/env python3
"""Generate the Gujarati voice-over pack (assets/VO-GU) with ElevenLabs.

    ELEVENLABS_API_KEY=sk_... python3 build/gen_gu_vo.py [--only key1,key2] [--force]

Every line the Hindi pack has a clip for (voiceOver.hi.files) is spoken from
its Gujarati text in locales-quadrilaterals.json and saved under the same
number, N.webm. Then voiceOver.gu is written into the JSON (dir, rev, files,
cues) and gen_locales.py is run.

Smooth and in sync:
  * the text is said, not read: symbols, digits and letters are written out
    as Gujarati words first (SPOKEN below) so "½ × d₁" is not stumbled over;
  * one voice, one set of settings and one seed for every line;
  * each clip is cut to the same lead-in and tail, levelled to the same
    loudness, and given short fades, so clips join without clicks or jumps;
  * the API's character timings give the moment each piece of the line (the
    pieces script.js's chunkCuts() types one at a time) begins. They are
    stored as voiceOver.gu.cues, so the typewriter moves on to the next piece
    exactly as the narrator reaches it.

The raw API answers (mp3 + timings) are kept in raw-audio/VO-GU/, so the
clips can be re-cut or re-levelled without paying for them again. A line is
only re-requested when its spoken text changes, or with --force.
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
import subprocess
import sys
import time
import urllib.error
import urllib.request
import wave

ROOT = pathlib.Path(__file__).resolve().parent.parent
SRC = ROOT / "locales" / "locales-quadrilaterals.json"
OUT_DIR = ROOT / "assets" / "VO-GU"
RAW_DIR = ROOT / "raw-audio" / "VO-GU"

VOICE_ID = os.environ.get("ELEVEN_VOICE", "cgSgspJ2msm6clMCkdW9")   # Jessica (premade: free plan)
# mitali-kids (mSBBhhehKHhzCdUCrPVu) / Monika Sogam (f1abxvIEijusskcPWE5x) need a paid plan
MODEL_ID = os.environ.get("ELEVEN_MODEL", "eleven_v4")
SEED = 4242
VOICE_SETTINGS = {"stability": 0.5, "similarity_boost": 0.8, "style": 0.0, "use_speaker_boost": True}
REV = time.strftime("%Y%m%d")

LEAD_S = 0.04          # sound kept before the first word
TAIL_S = 0.14          # and after the last
TARGET_LUFS = -18.0    # every clip levelled to this
SILENCE_DB = -45.0     # below this (dBFS, 10 ms windows) counts as silence


# --------------------------------------------------------------- the pieces
# A port of chunkCuts() in js/script.js: where a line is cut into the pieces
# the typewriter shows one at a time. It must agree with the game exactly, or
# the cue count will not match and the game falls back to letter pacing.
CHUNK_ABBR = re.compile(r"(?:^|[\s(])(?:sq|e\.g|i\.e|etc|vs|approx|चौ|ચો|సెం\.మీ|చ\.సెం\.మీ|ସେ\.ମି)\.$", re.I)
CHUNK_RE = re.compile(r"[,!.?।]+['’\"”)]*\s+(?=\S)")


def chunk_cuts(text):
    cuts = []
    for m in CHUNK_RE.finditer(text):
        mark = text[: m.start() + 1]
        if m.group(0)[0] == "." and CHUNK_ABBR.search(mark):
            continue
        frm = cuts[-1] if cuts else 0
        if m.group(0)[0] == "," and not re.search(r"\s", text[frm:m.start()].strip()):
            continue
        cuts.append(m.end())
    return cuts


def pieces(text):
    cuts = [0] + chunk_cuts(text) + [len(text)]
    out = [text[a:b].strip() for a, b in zip(cuts, cuts[1:])]
    return [p for p in out if p]


# ------------------------------------------------------------ spoken words
NUM = {
    1: "એક", 2: "બે", 3: "ત્રણ", 4: "ચાર", 5: "પાંચ", 6: "છ", 7: "સાત", 8: "આઠ", 9: "નવ",
    10: "દસ", 11: "અગિયાર", 12: "બાર", 13: "તેર", 14: "ચૌદ", 15: "પંદર", 16: "સોળ",
    17: "સત્તર", 18: "અઢાર", 19: "ઓગણીસ", 20: "વીસ", 21: "એકવીસ", 22: "બાવીસ",
    23: "તેવીસ", 24: "ચોવીસ", 25: "પચ્ચીસ", 28: "અઠ્ઠાવીસ", 30: "ત્રીસ", 32: "બત્રીસ",
    33: "તેત્રીસ", 39: "ઓગણચાલીસ", 40: "ચાલીસ", 43: "તેતાલીસ", 66: "છાસઠ",
    70: "સિત્તેર", 90: "નેવું", 96: "છન્નું", 120: "એકસો વીસ", 165: "એકસો પાંસઠ",
    180: "એકસો એંસી", 192: "એકસો બાણું", 240: "બસો ચાલીસ", 330: "ત્રણસો ત્રીસ",
    360: "ત્રણસો સાઠ", 450: "ચારસો પચાસ", 480: "ચારસો એંસી", 525: "પાંચસો પચ્ચીસ",
    1050: "એક હજાર પચાસ",
}
LETTER = {"a": "એ", "b": "બી", "h": "એચ", "d": "ડી", "A": "એ"}
SUB = {"₁": "એક", "₂": "બે"}

# whole phrases first, then symbols
PHRASES = [
    ("(બાજુ)²", "બાજુનો વર્ગ"),
    ("(90°)", ", નેવું અંશે,"),
    ("ચો. સેમી", "ચોરસ સેન્ટિમીટર"),
    ("સેમી", "સેન્ટિમીટર"),
]
SYMBOLS = [
    ("½", " એક દ્વિતીયાંશ "),
    ("×", " ગુણ્યા "),
    ("=", " બરાબર "),
    ("+", " વત્તા "),
    ("·", ", "),
    ("°", " અંશ"),
    ("(", " "),
    (")", ", "),
]


def spoken(piece):
    s = piece
    for a, b in PHRASES:
        s = s.replace(a, b)

    def num(m):
        n = int(m.group(0))
        if n not in NUM:
            raise SystemExit("no Gujarati words for the number %d in: %s" % (n, piece))
        return NUM[n]
    s = re.sub(r"\d+", num, s)
    s = re.sub(r"(?<![A-Za-z])([abhdA])([₁₂]?)(?![A-Za-z])",
               lambda m: " " + LETTER[m.group(1)] + (" " + SUB[m.group(2)] if m.group(2) else "") + " ", s)
    for a, b in SYMBOLS:
        s = s.replace(a, b)
    s = re.sub(r"\s+,", ",", s)
    s = re.sub(r",\s*([,.!?।:])", r"\1", s)
    s = re.sub(r",(\s*,)+", ",", s)
    s = re.sub(r"\s+", " ", s).strip().lstrip(", ")
    s = re.sub(r",\s*,", ",", s)
    left = re.findall(r"[A-Za-z0-9½×=+·°²₁₂()]", s)
    if left:
        raise SystemExit("unspoken symbols %r left in: %s" % (left, s))
    return s


def line_texts(data):
    """key -> (file, Gujarati text) for every line the Hindi pack has."""
    gu = data["gu"]
    out = {}
    for key, file in data["voiceOver"]["hi"]["files"].items():
        base, _, idx = key.partition(".")
        val = gu[base]
        if idx:
            val = val[int(idx)]
        out[key] = (file, val)
    return out


# -------------------------------------------------------------- the API
def tts(text, key):
    url = ("https://api.elevenlabs.io/v1/text-to-speech/%s/with-timestamps"
           "?output_format=mp3_44100_128" % VOICE_ID)
    body = {"text": text, "model_id": MODEL_ID, "language_code": "gu",
            "voice_settings": VOICE_SETTINGS, "seed": SEED}
    for attempt in range(6):
        req = urllib.request.Request(url, data=json.dumps(body).encode(), method="POST",
                                     headers={"xi-api-key": key, "Content-Type": "application/json"})
        try:
            with urllib.request.urlopen(req, timeout=120) as r:
                return json.loads(r.read())
        except urllib.error.HTTPError as e:
            msg = e.read().decode(errors="replace")
            if e.code in (429, 500, 502, 503, 504):
                time.sleep(4 * (attempt + 1))
                continue
            raise SystemExit("ElevenLabs %d: %s" % (e.code, msg))
        except (urllib.error.URLError, TimeoutError):
            time.sleep(4 * (attempt + 1))
    raise SystemExit("ElevenLabs kept failing for: " + text)


# -------------------------------------------------------------- the audio
def ffmpeg_bin():
    if os.environ.get("FFMPEG"):
        return os.environ["FFMPEG"]
    for pat in ["~/.cache/uv/archive-v0/*/imageio_ffmpeg/binaries/ffmpeg-*",
                "~/**/imageio_ffmpeg/binaries/ffmpeg-*"]:
        hits = sorted(glob.glob(os.path.expanduser(pat), recursive=True))
        if hits:
            return hits[0]
    raise SystemExit("no ffmpeg: set FFMPEG=/path/to/ffmpeg")


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


def cut(raw_mp3, out_webm, tmp):
    wav = tmp / "full.wav"
    ff("-i", str(raw_mp3), "-ac", "1", "-ar", "48000", str(wav))
    first, last = voiced_span(wav)
    start = max(0.0, first - LEAD_S)
    end = last + TAIL_S
    dur = end - start
    trimmed = tmp / "trim.wav"
    ff("-i", str(wav), "-ss", "%.3f" % start, "-t", "%.3f" % dur, str(trimmed))
    gain = TARGET_LUFS - loudness(trimmed)
    fade_out = min(0.06, dur / 4)
    af = ("volume=%.2fdB,alimiter=limit=0.94:attack=2:release=40:level=disabled,"
          "afade=t=in:d=0.012,afade=t=out:st=%.3f:d=%.3f" % (gain, dur - fade_out, fade_out))
    ff("-i", str(trimmed), "-af", af, "-c:a", "libopus", "-b:a", "48k", "-vbr", "on",
       "-ac", "1", str(out_webm))
    return start, dur


def piece_cues(text, align, start, dur):
    """where each piece begins in the cut clip, from the character timings"""
    chars = align["characters"]
    times = align["character_start_times_seconds"]
    said = "".join(chars)
    cues, at = [], 0
    for p in text["pieces_spoken"]:
        i = said.find(p[:6], at)
        if i < 0:
            return None
        cues.append(times[i])
        at = i + len(p)
    cues = [round(max(0.0, min(dur, t - start)), 2) for t in cues]
    cues[0] = 0.0
    if any(b <= a for a, b in zip(cues, cues[1:])):
        return None
    return cues


# -------------------------------------------------------------- main
def main():
    global FF
    ap = argparse.ArgumentParser()
    ap.add_argument("--only", help="comma-separated keys")
    ap.add_argument("--match", help="regex on the keys, e.g. '^(fb|p\\d)'")
    ap.add_argument("--force", action="store_true", help="ask the API again even if cached")
    ap.add_argument("--dry", action="store_true", help="print the spoken text and stop")
    args = ap.parse_args()

    data = json.loads(SRC.read_text(encoding="utf-8"))
    lines = line_texts(data)
    if args.only:
        want = set(args.only.split(","))
        lines = {k: v for k, v in lines.items() if k in want}
    if args.match:
        lines = {k: v for k, v in lines.items() if re.search(args.match, k)}

    jobs = {}
    for k, (file, text) in lines.items():
        ps = pieces(text)
        sp = [spoken(p) for p in ps]
        jobs[k] = {"file": file, "text": text, "pieces": ps, "pieces_spoken": sp, "spoken": " ".join(sp)}

    if args.dry:
        for k, j in jobs.items():
            print("%-22s %s\n%22s → %s" % (k, j["text"], "", " | ".join(j["pieces_spoken"])))
        print("\n%d lines, %d characters to speak" % (len(jobs), sum(len(j["spoken"]) for j in jobs.values())))
        return

    key = os.environ.get("ELEVENLABS_API_KEY")
    if not key:
        raise SystemExit("set ELEVENLABS_API_KEY")
    FF = ffmpeg_bin()
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    RAW_DIR.mkdir(parents=True, exist_ok=True)
    tmp = pathlib.Path(os.environ.get("TMPDIR", "/tmp")) / "gu-vo"
    tmp.mkdir(parents=True, exist_ok=True)

    cues = dict(data["voiceOver"].get("gu", {}).get("cues", {}))
    files = dict(data["voiceOver"].get("gu", {}).get("files", {}))
    for n, (k, j) in enumerate(jobs.items(), 1):
        stem = j["file"].rsplit(".", 1)[0]
        raw_mp3, raw_json = RAW_DIR / (stem + ".mp3"), RAW_DIR / (stem + ".json")
        digest = hashlib.sha1((MODEL_ID + VOICE_ID + json.dumps(VOICE_SETTINGS, sort_keys=True)
                               + j["spoken"]).encode()).hexdigest()
        meta = json.loads(raw_json.read_text()) if raw_json.exists() else {}
        if args.force or meta.get("digest") != digest or not raw_mp3.exists():
            r = tts(j["spoken"], key)
            raw_mp3.write_bytes(base64.b64decode(r["audio_base64"]))
            meta = {"key": k, "digest": digest, "text": j["text"], "spoken": j["spoken"],
                    "alignment": r.get("alignment") or r.get("normalized_alignment")}
            raw_json.write_text(json.dumps(meta, ensure_ascii=False), encoding="utf-8")
            fresh = "new"
        else:
            fresh = "cached"
        start, dur = cut(raw_mp3, OUT_DIR / j["file"], tmp)
        files[k] = j["file"]
        c = piece_cues(j, meta["alignment"], start, dur) if len(j["pieces"]) > 1 else None
        if c:
            cues[k] = c
        else:
            cues.pop(k, None)
        print("[%3d/%d] %-22s %-6s %5.2fs %s" % (n, len(jobs), k, fresh, dur, c or ""), flush=True)

    order = list(data["voiceOver"]["hi"]["files"])
    data["voiceOver"]["gu"] = {
        "dir": "assets/VO-GU/",
        "rev": REV,
        "files": {k: files[k] for k in order if k in files},
        "cues": {k: cues[k] for k in order if k in cues},
    }
    SRC.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    subprocess.run([sys.executable, str(ROOT / "build" / "gen_locales.py")], check=True)
    print("voiceOver.gu: %d clips, %d with cues" % (len(data["voiceOver"]["gu"]["files"]),
                                                     len(data["voiceOver"]["gu"]["cues"])))


if __name__ == "__main__":
    main()
