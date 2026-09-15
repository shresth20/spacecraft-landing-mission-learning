/* GENERATED FILE — do not edit by hand.
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
 * Frame i of a clip sits at col = i %% cols, row = (i / cols) | 0 — one uniform
 * grid, pivot at the exact cell centre, which is what lets any frame of any
 * animation stand in for any other without the character shifting a pixel.
 */
window.SWIFTEE_DATA = {
  "fps": 20,
  "cell": 256,
  "pivot": [
    0.5,
    0.5
  ],
  "baseline": 0.877,
  "states": {
    "calling": {
      "start": "callstart",
      "loop": "calling",
      "stop": "callstop",
      "play": [
        "callstart",
        "calling",
        "callstop"
      ]
    },
    "celebrating": {
      "start": "celebrate_start",
      "loop": "celebrating",
      "stop": "celebrate_stop",
      "play": [
        "celebrate_start",
        "celebrating",
        "celebrate_stop"
      ]
    },
    "confident": {
      "start": "confident_start",
      "loop": "confident",
      "stop": "confident_stop",
      "play": [
        "confident_start",
        "confident",
        "confident_stop"
      ]
    },
    "confused": {
      "start": "confused_start",
      "loop": "confused",
      "stop": "confused_stop",
      "play": [
        "confused_start",
        "confused",
        "confused_stop"
      ]
    },
    "curious": {
      "start": "curious_start",
      "loop": "curious",
      "stop": "curious_stop",
      "play": [
        "curious_start",
        "curious",
        "curious_stop"
      ]
    },
    "daydreaming": {
      "start": "daydream_start",
      "loop": "daydreaming",
      "stop": "daydreaming_stop",
      "play": [
        "daydream_start",
        "daydreaming",
        "daydreaming_stop"
      ]
    },
    "driving": {
      "start": "driving_start",
      "loop": "driving",
      "stop": null,
      "play": [
        "driving_start",
        "driving"
      ]
    },
    "excited": {
      "start": "excited_start",
      "loop": "excited",
      "stop": "excited_stop",
      "play": [
        "excited_start",
        "excited",
        "excited_stop"
      ]
    },
    "focussed": {
      "start": "focussed_start",
      "loop": "focussed",
      "stop": "focussed_stop",
      "play": [
        "focussed_start",
        "focussed",
        "focussed_stop"
      ]
    },
    "happy": {
      "start": "happy_start",
      "loop": "happy",
      "stop": "happy_stop",
      "play": [
        "happy_start",
        "happy",
        "happy_stop"
      ]
    },
    "laptop": {
      "start": "laptop_start",
      "loop": "laptop",
      "stop": "laptop_stop",
      "play": [
        "laptop_start",
        "laptop",
        "laptop_stop"
      ]
    },
    "learning": {
      "start": "learning_start",
      "loop": "learning",
      "stop": "learning_stop",
      "play": [
        "learning_start",
        "learning",
        "learning_stop"
      ]
    },
    "listening": {
      "start": "listening_start",
      "loop": "listening",
      "stop": "listening_stop",
      "play": [
        "listening_start",
        "listening",
        "listening_stop"
      ]
    },
    "love": {
      "start": "love_start",
      "loop": "love",
      "stop": "love_stop",
      "play": [
        "love_start",
        "love",
        "love_stop"
      ]
    },
    "peeping": {
      "start": "peeping_start",
      "loop": "peeping",
      "stop": "peeping_stop",
      "play": [
        "peeping_start",
        "peeping",
        "peeping_stop"
      ]
    },
    "playful": {
      "start": "playful_start",
      "loop": "playful",
      "stop": "playful_stop",
      "play": [
        "playful_start",
        "playful",
        "playful_stop"
      ]
    },
    "proud": {
      "start": "proud_start",
      "loop": "proud",
      "stop": "proud_stop",
      "play": [
        "proud_start",
        "proud",
        "proud_stop"
      ]
    },
    "puzzleing": {
      "start": "puzzle_start",
      "loop": "puzzleing",
      "stop": "puzzle_stop",
      "play": [
        "puzzle_start",
        "puzzleing",
        "puzzle_stop"
      ]
    },
    "reading": {
      "start": "reading_start",
      "loop": "reading",
      "stop": "reading_stop",
      "play": [
        "reading_start",
        "reading",
        "reading_stop"
      ]
    },
    "relieved": {
      "start": "relieved_start",
      "loop": "relieved",
      "stop": "relieved_stop",
      "play": [
        "relieved_start",
        "relieved",
        "relieved_stop"
      ]
    },
    "sleeping": {
      "start": "sleep_start",
      "loop": "sleeping",
      "stop": null,
      "play": [
        "sleep_start",
        "sleeping"
      ]
    },
    "surprised": {
      "start": "surprised_start",
      "loop": "surprised",
      "stop": "surprised_stop",
      "play": [
        "surprised_start",
        "surprised",
        "surprised_stop"
      ]
    },
    "talking": {
      "start": "talk_start",
      "loop": "talking",
      "stop": "talk_stop",
      "play": [
        "talk_start",
        "talking",
        "talk_stop"
      ]
    },
    "thinking": {
      "start": "thinking_start",
      "loop": "thinking",
      "stop": "thinking_stop",
      "play": [
        "thinking_start",
        "thinking",
        "thinking_stop"
      ]
    },
    "waving": {
      "start": "wave_start",
      "loop": "waving",
      "stop": "wave_stop",
      "play": [
        "wave_start",
        "waving",
        "wave_stop"
      ]
    },
    "writing": {
      "start": "write_start",
      "loop": "writing",
      "stop": "write_stop",
      "play": [
        "write_start",
        "writing",
        "write_stop"
      ]
    }
  },
  "standalone": [
    "blinking",
    "drive_away",
    "flapping",
    "honk",
    "reset",
    "wake"
  ],
  "exitsCell": [
    "drive_away",
    "driving",
    "peeping_start",
    "peeping_stop",
    "sleep_start",
    "wake"
  ],
  "clips": {
    "blinking": {
      "image": "assets/swiftee-assets/spritesheets/1x/swiftee_blinking@1x.webp",
      "cols": 7,
      "rows": 6,
      "frames": 40,
      "pingpong": false,
      "loop": true
    },
    "calling": {
      "image": "assets/swiftee-assets/spritesheets/1x/swiftee_calling@1x.webp",
      "cols": 6,
      "rows": 5,
      "frames": 27,
      "pingpong": false,
      "loop": true
    },
    "callstart": {
      "image": "assets/swiftee-assets/spritesheets/1x/swiftee_callstart@1x.webp",
      "cols": 3,
      "rows": 3,
      "frames": 7,
      "pingpong": false,
      "loop": false
    },
    "callstop": {
      "image": "assets/swiftee-assets/spritesheets/1x/swiftee_callstop@1x.webp",
      "cols": 3,
      "rows": 3,
      "frames": 7,
      "pingpong": false,
      "loop": false
    },
    "celebrate_start": {
      "image": "assets/swiftee-assets/spritesheets/1x/swiftee_celebrate_start@1x.webp",
      "cols": 3,
      "rows": 3,
      "frames": 8,
      "pingpong": false,
      "loop": false
    },
    "celebrate_stop": {
      "image": "assets/swiftee-assets/spritesheets/1x/swiftee_celebrate_stop@1x.webp",
      "cols": 4,
      "rows": 3,
      "frames": 10,
      "pingpong": false,
      "loop": false
    },
    "celebrating": {
      "image": "assets/swiftee-assets/spritesheets/1x/swiftee_celebrating@1x.webp",
      "cols": 8,
      "rows": 7,
      "frames": 50,
      "pingpong": false,
      "loop": true
    },
    "confident": {
      "image": "assets/swiftee-assets/spritesheets/1x/swiftee_confident@1x.webp",
      "cols": 7,
      "rows": 7,
      "frames": 45,
      "pingpong": true,
      "loop": true
    },
    "confident_start": {
      "image": "assets/swiftee-assets/spritesheets/1x/swiftee_confident_start@1x.webp",
      "cols": 4,
      "rows": 3,
      "frames": 10,
      "pingpong": false,
      "loop": false
    },
    "confident_stop": {
      "image": "assets/swiftee-assets/spritesheets/1x/swiftee_confident_stop@1x.webp",
      "cols": 4,
      "rows": 3,
      "frames": 10,
      "pingpong": false,
      "loop": false
    },
    "confused": {
      "image": "assets/swiftee-assets/spritesheets/1x/swiftee_confused@1x.webp",
      "cols": 7,
      "rows": 6,
      "frames": 40,
      "pingpong": false,
      "loop": true
    },
    "confused_start": {
      "image": "assets/swiftee-assets/spritesheets/1x/swiftee_confused_start@1x.webp",
      "cols": 3,
      "rows": 3,
      "frames": 7,
      "pingpong": false,
      "loop": false
    },
    "confused_stop": {
      "image": "assets/swiftee-assets/spritesheets/1x/swiftee_confused_stop@1x.webp",
      "cols": 3,
      "rows": 3,
      "frames": 7,
      "pingpong": false,
      "loop": false
    },
    "curious": {
      "image": "assets/swiftee-assets/spritesheets/1x/swiftee_curious@1x.webp",
      "cols": 6,
      "rows": 6,
      "frames": 33,
      "pingpong": false,
      "loop": true
    },
    "curious_start": {
      "image": "assets/swiftee-assets/spritesheets/1x/swiftee_curious_start@1x.webp",
      "cols": 3,
      "rows": 3,
      "frames": 8,
      "pingpong": false,
      "loop": false
    },
    "curious_stop": {
      "image": "assets/swiftee-assets/spritesheets/1x/swiftee_curious_stop@1x.webp",
      "cols": 3,
      "rows": 3,
      "frames": 8,
      "pingpong": false,
      "loop": false
    },
    "daydream_start": {
      "image": "assets/swiftee-assets/spritesheets/1x/swiftee_daydream_start@1x.webp",
      "cols": 3,
      "rows": 3,
      "frames": 8,
      "pingpong": false,
      "loop": false
    },
    "daydreaming": {
      "image": "assets/swiftee-assets/spritesheets/1x/swiftee_daydreaming@1x.webp",
      "cols": 7,
      "rows": 6,
      "frames": 40,
      "pingpong": false,
      "loop": true
    },
    "daydreaming_stop": {
      "image": "assets/swiftee-assets/spritesheets/1x/swiftee_daydreaming_stop@1x.webp",
      "cols": 3,
      "rows": 3,
      "frames": 7,
      "pingpong": false,
      "loop": false
    },
    "drive_away": {
      "image": "assets/swiftee-assets/spritesheets/1x/swiftee_drive_away@1x.webp",
      "cols": 5,
      "rows": 4,
      "frames": 20,
      "pingpong": false,
      "loop": false
    },
    "driving": {
      "image": "assets/swiftee-assets/spritesheets/1x/swiftee_driving@1x.webp",
      "cols": 8,
      "rows": 7,
      "frames": 51,
      "pingpong": false,
      "loop": false
    },
    "driving_start": {
      "image": "assets/swiftee-assets/spritesheets/1x/swiftee_driving_start@1x.webp",
      "cols": 5,
      "rows": 4,
      "frames": 20,
      "pingpong": false,
      "loop": false
    },
    "excited": {
      "image": "assets/swiftee-assets/spritesheets/1x/swiftee_excited@1x.webp",
      "cols": 9,
      "rows": 8,
      "frames": 72,
      "pingpong": true,
      "loop": true
    },
    "excited_start": {
      "image": "assets/swiftee-assets/spritesheets/1x/swiftee_excited_start@1x.webp",
      "cols": 3,
      "rows": 3,
      "frames": 7,
      "pingpong": false,
      "loop": false
    },
    "excited_stop": {
      "image": "assets/swiftee-assets/spritesheets/1x/swiftee_excited_stop@1x.webp",
      "cols": 3,
      "rows": 3,
      "frames": 7,
      "pingpong": false,
      "loop": false
    },
    "flapping": {
      "image": "assets/swiftee-assets/spritesheets/1x/swiftee_flapping@1x.webp",
      "cols": 6,
      "rows": 5,
      "frames": 27,
      "pingpong": false,
      "loop": true
    },
    "focussed": {
      "image": "assets/swiftee-assets/spritesheets/1x/swiftee_focussed@1x.webp",
      "cols": 7,
      "rows": 6,
      "frames": 37,
      "pingpong": false,
      "loop": true
    },
    "focussed_start": {
      "image": "assets/swiftee-assets/spritesheets/1x/swiftee_focussed_start@1x.webp",
      "cols": 3,
      "rows": 3,
      "frames": 7,
      "pingpong": false,
      "loop": false
    },
    "focussed_stop": {
      "image": "assets/swiftee-assets/spritesheets/1x/swiftee_focussed_stop@1x.webp",
      "cols": 3,
      "rows": 3,
      "frames": 7,
      "pingpong": false,
      "loop": false
    },
    "happy": {
      "image": "assets/swiftee-assets/spritesheets/1x/swiftee_happy@1x.webp",
      "cols": 7,
      "rows": 6,
      "frames": 40,
      "pingpong": false,
      "loop": true
    },
    "happy_start": {
      "image": "assets/swiftee-assets/spritesheets/1x/swiftee_happy_start@1x.webp",
      "cols": 3,
      "rows": 3,
      "frames": 7,
      "pingpong": false,
      "loop": false
    },
    "happy_stop": {
      "image": "assets/swiftee-assets/spritesheets/1x/swiftee_happy_stop@1x.webp",
      "cols": 3,
      "rows": 3,
      "frames": 7,
      "pingpong": false,
      "loop": false
    },
    "honk": {
      "image": "assets/swiftee-assets/spritesheets/1x/swiftee_honk@1x.webp",
      "cols": 6,
      "rows": 5,
      "frames": 27,
      "pingpong": false,
      "loop": false
    },
    "laptop": {
      "image": "assets/swiftee-assets/spritesheets/1x/swiftee_laptop@1x.webp",
      "cols": 7,
      "rows": 6,
      "frames": 40,
      "pingpong": true,
      "loop": true
    },
    "laptop_start": {
      "image": "assets/swiftee-assets/spritesheets/1x/swiftee_laptop_start@1x.webp",
      "cols": 3,
      "rows": 3,
      "frames": 8,
      "pingpong": false,
      "loop": false
    },
    "laptop_stop": {
      "image": "assets/swiftee-assets/spritesheets/1x/swiftee_laptop_stop@1x.webp",
      "cols": 3,
      "rows": 3,
      "frames": 8,
      "pingpong": false,
      "loop": false
    },
    "learning": {
      "image": "assets/swiftee-assets/spritesheets/1x/swiftee_learning@1x.webp",
      "cols": 8,
      "rows": 7,
      "frames": 50,
      "pingpong": false,
      "loop": true
    },
    "learning_start": {
      "image": "assets/swiftee-assets/spritesheets/1x/swiftee_learning_start@1x.webp",
      "cols": 5,
      "rows": 4,
      "frames": 20,
      "pingpong": false,
      "loop": false
    },
    "learning_stop": {
      "image": "assets/swiftee-assets/spritesheets/1x/swiftee_learning_stop@1x.webp",
      "cols": 5,
      "rows": 4,
      "frames": 20,
      "pingpong": false,
      "loop": false
    },
    "listening": {
      "image": "assets/swiftee-assets/spritesheets/1x/swiftee_listening@1x.webp",
      "cols": 7,
      "rows": 6,
      "frames": 40,
      "pingpong": false,
      "loop": true
    },
    "listening_start": {
      "image": "assets/swiftee-assets/spritesheets/1x/swiftee_listening_start@1x.webp",
      "cols": 3,
      "rows": 3,
      "frames": 8,
      "pingpong": false,
      "loop": false
    },
    "listening_stop": {
      "image": "assets/swiftee-assets/spritesheets/1x/swiftee_listening_stop@1x.webp",
      "cols": 3,
      "rows": 3,
      "frames": 7,
      "pingpong": false,
      "loop": false
    },
    "love": {
      "image": "assets/swiftee-assets/spritesheets/1x/swiftee_love@1x.webp",
      "cols": 7,
      "rows": 6,
      "frames": 37,
      "pingpong": true,
      "loop": true
    },
    "love_start": {
      "image": "assets/swiftee-assets/spritesheets/1x/swiftee_love_start@1x.webp",
      "cols": 3,
      "rows": 3,
      "frames": 8,
      "pingpong": false,
      "loop": false
    },
    "love_stop": {
      "image": "assets/swiftee-assets/spritesheets/1x/swiftee_love_stop@1x.webp",
      "cols": 3,
      "rows": 3,
      "frames": 8,
      "pingpong": false,
      "loop": false
    },
    "peeping": {
      "image": "assets/swiftee-assets/spritesheets/1x/swiftee_peeping@1x.webp",
      "cols": 7,
      "rows": 6,
      "frames": 40,
      "pingpong": false,
      "loop": true
    },
    "peeping_start": {
      "image": "assets/swiftee-assets/spritesheets/1x/swiftee_peeping_start@1x.webp",
      "cols": 4,
      "rows": 3,
      "frames": 10,
      "pingpong": false,
      "loop": false
    },
    "peeping_stop": {
      "image": "assets/swiftee-assets/spritesheets/1x/swiftee_peeping_stop@1x.webp",
      "cols": 4,
      "rows": 3,
      "frames": 10,
      "pingpong": false,
      "loop": false
    },
    "playful": {
      "image": "assets/swiftee-assets/spritesheets/1x/swiftee_playful@1x.webp",
      "cols": 6,
      "rows": 5,
      "frames": 30,
      "pingpong": true,
      "loop": true
    },
    "playful_start": {
      "image": "assets/swiftee-assets/spritesheets/1x/swiftee_playful_start@1x.webp",
      "cols": 4,
      "rows": 3,
      "frames": 10,
      "pingpong": false,
      "loop": false
    },
    "playful_stop": {
      "image": "assets/swiftee-assets/spritesheets/1x/swiftee_playful_stop@1x.webp",
      "cols": 4,
      "rows": 3,
      "frames": 10,
      "pingpong": false,
      "loop": false
    },
    "proud": {
      "image": "assets/swiftee-assets/spritesheets/1x/swiftee_proud@1x.webp",
      "cols": 7,
      "rows": 6,
      "frames": 40,
      "pingpong": false,
      "loop": true
    },
    "proud_start": {
      "image": "assets/swiftee-assets/spritesheets/1x/swiftee_proud_start@1x.webp",
      "cols": 3,
      "rows": 3,
      "frames": 7,
      "pingpong": false,
      "loop": false
    },
    "proud_stop": {
      "image": "assets/swiftee-assets/spritesheets/1x/swiftee_proud_stop@1x.webp",
      "cols": 3,
      "rows": 3,
      "frames": 7,
      "pingpong": false,
      "loop": false
    },
    "puzzle_start": {
      "image": "assets/swiftee-assets/spritesheets/1x/swiftee_puzzle_start@1x.webp",
      "cols": 3,
      "rows": 3,
      "frames": 7,
      "pingpong": false,
      "loop": false
    },
    "puzzle_stop": {
      "image": "assets/swiftee-assets/spritesheets/1x/swiftee_puzzle_stop@1x.webp",
      "cols": 3,
      "rows": 3,
      "frames": 7,
      "pingpong": false,
      "loop": false
    },
    "puzzleing": {
      "image": "assets/swiftee-assets/spritesheets/1x/swiftee_puzzleing@1x.webp",
      "cols": 7,
      "rows": 6,
      "frames": 37,
      "pingpong": false,
      "loop": true
    },
    "reading": {
      "image": "assets/swiftee-assets/spritesheets/1x/swiftee_reading@1x.webp",
      "cols": 6,
      "rows": 5,
      "frames": 30,
      "pingpong": false,
      "loop": true
    },
    "reading_start": {
      "image": "assets/swiftee-assets/spritesheets/1x/swiftee_reading_start@1x.webp",
      "cols": 3,
      "rows": 3,
      "frames": 8,
      "pingpong": false,
      "loop": false
    },
    "reading_stop": {
      "image": "assets/swiftee-assets/spritesheets/1x/swiftee_reading_stop@1x.webp",
      "cols": 3,
      "rows": 3,
      "frames": 8,
      "pingpong": false,
      "loop": false
    },
    "relieved": {
      "image": "assets/swiftee-assets/spritesheets/1x/swiftee_relieved@1x.webp",
      "cols": 7,
      "rows": 7,
      "frames": 45,
      "pingpong": false,
      "loop": true
    },
    "relieved_start": {
      "image": "assets/swiftee-assets/spritesheets/1x/swiftee_relieved_start@1x.webp",
      "cols": 3,
      "rows": 3,
      "frames": 8,
      "pingpong": false,
      "loop": false
    },
    "relieved_stop": {
      "image": "assets/swiftee-assets/spritesheets/1x/swiftee_relieved_stop@1x.webp",
      "cols": 3,
      "rows": 3,
      "frames": 8,
      "pingpong": false,
      "loop": false
    },
    "reset": {
      "image": "assets/swiftee-assets/spritesheets/1x/swiftee_reset@1x.webp",
      "cols": 2,
      "rows": 2,
      "frames": 3,
      "pingpong": false,
      "loop": false
    },
    "sleep_start": {
      "image": "assets/swiftee-assets/spritesheets/1x/swiftee_sleep_start@1x.webp",
      "cols": 5,
      "rows": 4,
      "frames": 17,
      "pingpong": false,
      "loop": false
    },
    "sleeping": {
      "image": "assets/swiftee-assets/spritesheets/1x/swiftee_sleeping@1x.webp",
      "cols": 7,
      "rows": 6,
      "frames": 40,
      "pingpong": false,
      "loop": true
    },
    "surprised": {
      "image": "assets/swiftee-assets/spritesheets/1x/swiftee_surprised@1x.webp",
      "cols": 7,
      "rows": 7,
      "frames": 47,
      "pingpong": true,
      "loop": true
    },
    "surprised_start": {
      "image": "assets/swiftee-assets/spritesheets/1x/swiftee_surprised_start@1x.webp",
      "cols": 3,
      "rows": 3,
      "frames": 8,
      "pingpong": false,
      "loop": false
    },
    "surprised_stop": {
      "image": "assets/swiftee-assets/spritesheets/1x/swiftee_surprised_stop@1x.webp",
      "cols": 3,
      "rows": 3,
      "frames": 8,
      "pingpong": false,
      "loop": false
    },
    "talk_start": {
      "image": "assets/swiftee-assets/spritesheets/1x/swiftee_talk_start@1x.webp",
      "cols": 2,
      "rows": 2,
      "frames": 3,
      "pingpong": false,
      "loop": false
    },
    "talk_stop": {
      "image": "assets/swiftee-assets/spritesheets/1x/swiftee_talk_stop@1x.webp",
      "cols": 3,
      "rows": 2,
      "frames": 5,
      "pingpong": false,
      "loop": false
    },
    "talking": {
      "image": "assets/swiftee-assets/spritesheets/1x/swiftee_talking@1x.webp",
      "cols": 3,
      "rows": 3,
      "frames": 8,
      "pingpong": false,
      "loop": true
    },
    "thinking": {
      "image": "assets/swiftee-assets/spritesheets/1x/swiftee_thinking@1x.webp",
      "cols": 7,
      "rows": 7,
      "frames": 47,
      "pingpong": false,
      "loop": true
    },
    "thinking_start": {
      "image": "assets/swiftee-assets/spritesheets/1x/swiftee_thinking_start@1x.webp",
      "cols": 4,
      "rows": 3,
      "frames": 10,
      "pingpong": false,
      "loop": false
    },
    "thinking_stop": {
      "image": "assets/swiftee-assets/spritesheets/1x/swiftee_thinking_stop@1x.webp",
      "cols": 3,
      "rows": 3,
      "frames": 8,
      "pingpong": false,
      "loop": false
    },
    "wake": {
      "image": "assets/swiftee-assets/spritesheets/1x/swiftee_wake@1x.webp",
      "cols": 4,
      "rows": 3,
      "frames": 10,
      "pingpong": false,
      "loop": false
    },
    "wave_start": {
      "image": "assets/swiftee-assets/spritesheets/1x/swiftee_wave_start@1x.webp",
      "cols": 3,
      "rows": 3,
      "frames": 7,
      "pingpong": false,
      "loop": false
    },
    "wave_stop": {
      "image": "assets/swiftee-assets/spritesheets/1x/swiftee_wave_stop@1x.webp",
      "cols": 3,
      "rows": 3,
      "frames": 8,
      "pingpong": false,
      "loop": false
    },
    "waving": {
      "image": "assets/swiftee-assets/spritesheets/1x/swiftee_waving@1x.webp",
      "cols": 6,
      "rows": 5,
      "frames": 30,
      "pingpong": false,
      "loop": true
    },
    "write_start": {
      "image": "assets/swiftee-assets/spritesheets/1x/swiftee_write_start@1x.webp",
      "cols": 3,
      "rows": 3,
      "frames": 7,
      "pingpong": false,
      "loop": false
    },
    "write_stop": {
      "image": "assets/swiftee-assets/spritesheets/1x/swiftee_write_stop@1x.webp",
      "cols": 3,
      "rows": 3,
      "frames": 8,
      "pingpong": false,
      "loop": false
    },
    "writing": {
      "image": "assets/swiftee-assets/spritesheets/1x/swiftee_writing@1x.webp",
      "cols": 8,
      "rows": 8,
      "frames": 60,
      "pingpong": false,
      "loop": true
    }
  }
};
