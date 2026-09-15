#!/usr/bin/env python3
"""Regenerate swiftee-data.js from the Swiftee manifest.

    python build/gen_swiftee_data.py

The manifest (assets/swiftee-assets/atlas/swiftee.manifest.json) is the single
source of truth for frame counts, grid sizes, sheet paths and state names. The
lesson has to run from file://, where fetching a local JSON is blocked, so the
parts the mascot component needs are baked into a small JS constants file
instead of read at runtime. Nothing here is hand-authored: rebuild the sheets,
re-run this, and the component follows.

Only the @1x sheets are emitted. The mascot never renders larger than 256 CSS
pixels, so the @2x set would be bytes spent on resolution no one can see.
"""

import json
import pathlib

ROOT = pathlib.Path(__file__).resolve().parent.parent
ASSETS = "assets/swiftee-assets/"
MANIFEST = ROOT / ASSETS / "atlas" / "swiftee.manifest.json"
OUT = ROOT / "swiftee-data.js"

HEADER = """/* GENERATED FILE — do not edit by hand.
 *
 * Built from assets/swiftee-assets/atlas/swiftee.manifest.json, which is the
 * single source of truth for Swiftee frame counts, grid sizes, sheet paths and
 * state names. Regenerate whenever the sprite sheets are rebuilt:
 *
 *   python build/gen_swiftee_data.py
 *
 * A generated constants file rather than a fetch() of the manifest, because the
 * lesson has to run from file:// where fetching a local JSON is blocked.
 *
 * Frame i of a clip sits at col = i % cols, row = (i / cols) | 0 — one uniform
 * grid, pivot at the exact cell centre, which is what lets any frame of any
 * animation stand in for any other without the character shifting a pixel.
 */
window.SWIFTEE_DATA = """


def main():
    manifest = json.loads(MANIFEST.read_text(encoding="utf-8"))
    sheets = manifest["scales"]["1x"]["sheets"]
    anims = manifest["animations"]

    clips = {}
    for key, sheet in sorted(sheets.items()):
        meta = anims.get(key) or anims.get(key.title()) or {}
        if not meta:
            # a few clips are titled with spaces in the rig ("Sleep Start")
            for name, value in anims.items():
                if name.lower().replace(" ", "_") == key.lower():
                    meta = value
                    break
        clips[key] = {
            "image": ASSETS + sheet["image"],
            "cols": sheet["cols"],
            "rows": sheet["rows"],
            "frames": sheet["frames"],
            "pingpong": bool(meta.get("pingpong", False)),
            "loop": bool(meta.get("loop", False)),
        }

    states = {
        name: {
            "start": spec.get("start"),
            "loop": spec.get("loop"),
            "stop": spec.get("stop"),
            "play": spec.get("play"),
        }
        for name, spec in manifest["states"].items()
    }

    data = {
        "fps": manifest["fps"],
        "cell": manifest["cell"]["1x"],
        "pivot": [manifest["pivot"]["x"], manifest["pivot"]["y"]],
        "baseline": manifest["baselineY"]["normalized"],
        "states": states,
        "standalone": manifest["standalone"],
        "exitsCell": manifest["exitsCell"],
        "clips": clips,
    }

    OUT.write_text(HEADER + json.dumps(data, indent=2) + ";\n", encoding="utf-8")
    print("wrote %s — %d clips, %d states" % (OUT.name, len(clips), len(states)))


if __name__ == "__main__":
    main()
