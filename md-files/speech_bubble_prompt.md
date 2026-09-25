# Task: a speech bubble the mascot talks from — pops out of its own tail, sized before it speaks, words easing in one at a time

Implement the speech bubble described below for the mascot in this game. It is the
bubble the bird speaks its greeting from in the Area of Quadrilaterals game, and the same
drawing is reused on the board as the green/red box a verdict is spoken from.

Read section 1 before writing any code. Every gotcha in section 7 is a visible defect
that was actually hit and fixed in the original.

The bubble does four things, and each one is a rule, not a nicety:

- **It pops out of its own tail.** Scaled down to a dot at the tail's root, it springs
  open with an overshoot and settles. It never fades in from nothing, and never slides.
- **It is sized to the whole line before the first word appears.** A hidden copy of
  the line (the *ghost*) sets the box's width; the live text sits on top of it. The
  box never grows as words land.
- **The words arrive one at a time, in place.** Each word fades up and sharpens where
  it already sits. Nothing reflows. Pacing is per character, so a long word takes
  longer than a short one.
- **A second line glides the box to its new size.** When one line replaces another,
  the box animates between the two widths instead of snapping.

---

## 1. How the pieces fit

```
   .intro  (fixed, full-screen, pointer-transparent layer; toggled with .on)
   └── .bubble                      ← the box: border, fill, glow, pop transition
       ├── svg.bubble-mark.mark-left    two short strokes, outside the box on the left
       ├── span.type-wrap               inline-block; position: relative
       │   ├── span.type-ghost          the whole line, visibility: hidden — sets the width
       │   └── span.type                position: absolute; inset: 0 — the live words
       │       ├── span.txt             filled with one <span class="wd"> per word
       │       └── i.caret              kept in the markup, never shown
       ├── svg.bubble-mark.mark-right   two strokes on the right
       └── svg.bubble-tail              the curved tail off the bottom-left corner
```

**Ghost + live copy.** The ghost holds the complete line and is invisible. The live
span is absolutely positioned over it. Because the ghost is laid out first, the bubble
already has its final width and height when the first word fades in. This is the
whole reason the box does not shove sideways while the line arrives.

**Tail drawn in two passes.** The tail's filled shape is drawn first, starting a few
units *inside* the box so it covers the box's border where the two meet. Then only the
tail's two free edges are stroked. Without this the border shows through as a line
across the tail's root.

**The pop.** `transform-origin: 12% 100%` is the tail's root. The box starts at
`scale(.15)` and `opacity: 0`; `.show` sets `transform: none` with an overshooting
cubic-bezier. The result reads as the bubble inflating out of the mascot's beak.

---

## 2. Markup

Paste inside `<body>`. Put your own mascot element inside the `.intro` layer if the
bubble should float beside it on an empty stage.

```html
<div class="intro" id="intro" aria-hidden="true">
  <!-- your mascot element here, e.g. <div class="intro-mascot" id="introMascot"></div> -->

  <div class="bubble" id="bubble">
    <!-- the two little emphasis strokes either side of the bubble -->
    <svg class="bubble-mark mark-left" viewBox="0 0 40 60" aria-hidden="true">
      <path d="M8 12 L30 24" /><path d="M8 48 L30 36" />
    </svg>
    <span class="type-wrap">
      <span class="type-ghost" id="bubbleGhost"></span>
      <span class="type" id="bubbleType" aria-live="polite"><span class="txt"></span><i class="caret" aria-hidden="true"></i></span>
    </span>
    <svg class="bubble-mark mark-right" viewBox="0 0 40 60" aria-hidden="true">
      <path d="M32 12 L10 24" /><path d="M32 48 L10 36" />
    </svg>
    <!-- tail: filled first so it covers the bubble's border where it joins,
         then stroked on its two free edges only -->
    <svg class="bubble-tail" viewBox="0 -8 44 42" aria-hidden="true">
      <path class="tail-fill"   d="M4 -8 H42 V0 C36 12 24 22 2 34 C8 24 8 12 4 0 Z" />
      <path class="tail-stroke" d="M42 0 C36 12 24 22 2 34 C8 24 8 12 4 0" />
    </svg>
  </div>
</div>
```

The live span carries `aria-live="polite"` so a screen reader gets the line once it
is complete. The strokes and tail are `aria-hidden`; they are decoration.

If the tail is needed in more than one place (section 8), move it to an SVG
`<symbol id="ico-tail">` in a hidden `<svg>` at the top of the body, and stamp it with
`<svg class="bubble-tail" viewBox="0 0 44 42"><use href="#ico-tail" /></svg>`. Give the
stroke `stroke="var(--note-edge)"` so the tail takes the colour of whatever box it
hangs off.

---

## 3. CSS

### 3a. Tokens

The bubble uses seven colours. **ADAPT these to the host game's palette** — the bubble
must look like it belongs to the game it is in, not to the one it came from. Keep the
relationships: fill is a pale tint, border is a mid tone of the same hue, text is a
dark tone of it, the glows are the border colour at 26% and 13%, the drop shadow is
the game's darkest colour at 16%.

```css
:root {
  --board-bg: #FBE8EA;          /* bubble fill                         */
  --board-border: #EA979E;      /* 4px border, tail stroke, side marks */
  --heading: #85345E;           /* the text                            */
  --bubble-sheen: #FFFFFF;      /* the catch-light in the corner       */
  --glow-board-soft: rgba(234, 151, 158, .26);   /* --board-border at 26% */
  --glow-board-dim:  rgba(234, 151, 158, .13);   /* --board-border at 13% */
  --shadow-soft:     rgba(98, 31, 55, .16);      /* darkest colour at 16% */
}
```

### 3b. The layer and the box

```css
/* fixed to the viewport, over everything, pointer-transparent; toggle .on */
.intro {
  position: fixed;
  inset: 0;
  z-index: 950;
  display: none;
  pointer-events: none;
  /* ADAPT: the game's display face. The original is Baloo 2 at weight 700. */
  font-family: "Baloo 2", "Trebuchet MS", system-ui, sans-serif;
}
.intro.on { display: block; }

/* Every fraction of the bubble's drawing -- corner, catch-light, tail -- is a
   share of ONE unit, so a bubble drawn at any type size keeps its proportions.
   (Section 8 changes only --bub-u to draw the small on-board box.) */
.bubble,
.msg {
  --bub-u:       1em;
  --bub-corner:  calc(var(--bub-u) * .62);
  --bub-light-w: calc(var(--bub-u) * .5);
  --bub-light-h: calc(var(--bub-u) * .2);
  --bub-light-x: calc(var(--bub-u) * .42);
  --bub-light-y: calc(var(--bub-u) * .34);
  --bub-tail-w:  calc(var(--bub-u) * .76);
  --bub-tail-x:  calc(var(--bub-u) * .78);
}

.bubble {
  position: absolute;
  /* ADAPT: where the bubble floats relative to the mascot. In the original the
     bird stands left of centre with its feet 17.5vh up, and the bubble sits up
     and to the right of its head so the tail comes down by the beak. */
  left: 38%;
  bottom: 57.5vh;
  /* wide enough for a line to stay on one row; the script slides the box left
     when the screen runs out before the line does. The subtraction is the
     screen margin plus the emphasis strokes either side. */
  max-width: min(1000px, calc(100vw - 24px - 2.2em));
  --note-edge: var(--board-border);
  padding: .62em 1em;
  border: 4px solid var(--note-edge);
  border-radius: var(--bub-corner);
  background: var(--board-bg);
  box-shadow:
    0 0 14px 2px var(--glow-board-soft),
    0 0 34px 10px var(--glow-board-dim),
    0 10px 26px var(--shadow-soft);
  color: var(--heading);
  font-weight: 700;
  /* keyed to the viewport height like the rest of the type, but reined in by the
     width so a portrait phone does not get a bubble wider than the screen */
  font-size: clamp(24.2px, min(6.6vh, 5.1vw), 63.8px);
  line-height: 1.2;
  letter-spacing: .2px;
  text-align: center;

  /* pops out of its own tail, overshoots, settles */
  opacity: 0;
  transform: scale(.15);
  transform-origin: 12% 100%;
  transition: transform .44s cubic-bezier(.2, .9, .3, 1.45), opacity .2s ease;
}
.bubble.show { opacity: 1; transform: none; }
.bubble.out  { transition: transform .26s ease-in, opacity .22s ease .04s; }

/* the catch-light in the top-left corner */
.bubble::before {
  content: "";
  position: absolute;
  left: var(--bub-light-x);
  top: var(--bub-light-y);
  width: var(--bub-light-w);
  height: var(--bub-light-h);
  border-radius: 999px;
  background: var(--bubble-sheen);
  transform: rotate(-22deg);
  opacity: .95;
}
```

### 3c. Ghost, live copy, and the words

```css
.type-wrap  { position: relative; display: inline-block; }
.type-ghost { visibility: hidden; }
.type {
  position: absolute;
  inset: 0;
  text-align: left;
  white-space: pre-wrap;
}
/* the bubble's line may wrap inside the bubble's width, ghost and live alike,
   and the wrapped rows are centred as the box is */
.bubble .type-wrap { display: inline-block; vertical-align: top; white-space: normal; max-width: 100%; }
.bubble .type-wrap .type-ghost,
.bubble .type-wrap .type { white-space: pre-wrap; }
.bubble .type { text-align: center; }

/* each word fades up and sharpens where it already sits */
.wd { opacity: 0; }
.wd.in { animation: wd-in .46s cubic-bezier(.2, .7, .3, 1) both; }
@keyframes wd-in {
  from { opacity: 0; filter: blur(4px); }
  to   { opacity: 1; filter: blur(0); }
}

/* the typewriter's caret -- kept in the markup for the pacing code, never shown */
.caret { display: none; }
.caret[hidden] { display: none; }
```

### 3d. Marks and tail

```css
/* two short strokes each side, converging on the bubble */
.bubble-mark {
  position: absolute;
  top: 50%;
  width: .62em;
  height: .93em;
  transform: translateY(-50%);
  fill: none;
  stroke: var(--board-border);
  stroke-width: 7;
  stroke-linecap: round;
  overflow: visible;
}
.mark-left  { right: calc(100% + .42em); }
.mark-right { left:  calc(100% + .42em); }

/* the tail hangs off the bottom-left corner and reaches back toward the mascot */
.bubble-tail {
  position: absolute;
  left: var(--bub-tail-x);
  top: calc(100% - 4px);        /* starts inside the border so it can cover it */
  width: var(--bub-tail-w);
  height: auto;
  overflow: visible;
}
.tail-fill   { fill: var(--board-bg); }
.tail-stroke {
  fill: none;
  stroke: var(--note-edge, var(--board-border));
  stroke-width: 4;
  stroke-linecap: round;
  stroke-linejoin: round;
  /* the svg is .76em wide for a 44-unit viewBox: keep the stroke the border's
     4px on screen regardless of the scale */
  vector-effect: non-scaling-stroke;
}

@media (prefers-reduced-motion: reduce) {
  .wd.in { animation-duration: .08s; }
  .bubble { transition: opacity .2s ease; }
}
```

### 3e. The "aside" placement (optional)

When the mascot stands over on the left of an empty stage and the bubble sits beside
it, longer lines are allowed to wrap and the box is capped so it stays beside the
mascot instead of sliding across its head:

```css
.intro.aside .bubble {
  left: 26.5%;
  max-width: min(900px, 64vw);
}
```

---

## 4. JavaScript

Expose one object with `say`, `hide`, `reset`, `aside`, `configure`. `say()` is
awaitable and resolves when the line has fully landed.

```js
(function () {
  'use strict';

  const REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

  const intro       = document.getElementById('intro');
  const bubble      = document.getElementById('bubble');
  const bubbleGhost = document.getElementById('bubbleGhost');
  const bubbleType  = document.getElementById('bubbleType');
  const bubbleTxt   = bubbleType.querySelector('.txt');
  const bubbleCaret = bubbleType.querySelector('.caret');

  let TYPE_MS = 72;                 /* ms per character when there is no voice-over to pace against */
  let onPop   = null;               /* ADAPT: the host game plays a soft click here */
  const WORD_IN_MS = 200;           /* the tail of a line: its last word finishing its fade */

  /* ---------- word by word ----------
   * The places a text is cut: after each word together with the spaces that
   * follow it. Pacing stays per character, so a long word takes longer. */
  function wordCuts(text) {
    const cuts = [];
    const re = /\S+\s*/g;
    let m;
    while ((m = re.exec(text)) !== null) cuts.push(m.index + m[0].length);
    if (!cuts.length || cuts[cuts.length - 1] !== text.length) cuts.push(text.length);
    return cuts;
  }

  /* A line laid out whole, a span per word, each hidden until revealed. */
  function wordSpans(root, text) {
    root.textContent = '';
    const words = [];
    let from = 0;
    wordCuts(text).forEach(cut => {
      const sp = document.createElement('span');
      sp.className = 'wd';
      const piece = text.slice(from, cut);
      sp.dataset.t = piece;
      sp.textContent = piece;
      root.appendChild(sp);
      words.push({ el: sp, cut: cut });
      from = cut;
    });
    return words;
  }

  /* Show the words from `due`, each when its first character would have
     been typed. Paced against a wall clock rather than a chain of timeouts,
     so a slow frame costs nothing: the line always lands on time.
     Resolves to the time the line is complete. */
  async function revealWords(words, due, perChar) {
    let from = 0;
    for (const w of words) {
      const left = due + from * perChar - performance.now();
      if (left > 0) await wait(left);
      w.el.classList.add('in');
      from = w.cut;
    }
    return due + from * perChar;
  }
  const wordsSettle = () => wait(REDUCED ? 0 : WORD_IN_MS);

  async function typeInto(txt, blink, text, totalMs) {
    blink.hidden = true;
    const words = wordSpans(txt, text);
    const end = await revealWords(words, performance.now(), totalMs / Math.max(1, text.length));
    const left = end - performance.now();
    if (left > 0) await wait(left);
    await wordsSettle();
  }

  /* ---------- say ----------
   * The bubble is sized to the whole line before the first word lands (the
   * ghost holds the width), and when a line replaces a longer or shorter one
   * the box glides between the two sizes rather than snapping. */
  async function say(text) {
    if (!intro.classList.contains('on')) intro.classList.add('on');
    bubble.classList.remove('out');
    bubbleTxt.textContent = '';
    bubbleCaret.hidden = true;

    const shown = bubble.classList.contains('show');
    const r0 = bubble.getBoundingClientRect();        /* the box as it is now */
    bubble.style.width = '';
    bubble.style.height = '';
    bubble.style.left = '';
    wordSpans(bubbleGhost, text);                     /* the ghost takes the new line */

    /* Before its pop-in the box sits scaled down to a dot, so it is measured
       with the scale lifted for the instant of the measurement. */
    const measure = () => {
      if (shown) return bubble.getBoundingClientRect();
      bubble.style.transition = 'none';
      bubble.style.transform = 'none';
      const r = bubble.getBoundingClientRect();
      bubble.style.transform = '';
      void bubble.offsetWidth;                        /* flush, so the restored scale is not transitioned */
      bubble.style.transition = '';
      return r;
    };
    let r1 = measure();

    /* A long line on a narrow screen: slide the box left rather than let it
       run off the edge -- keeping room for the emphasis strokes outside it.
       The box is only as wide as the room to the right of its left edge, so
       sliding it can let it grow; a second pass settles it. */
    const vw = window.innerWidth;
    const edge = 12 + parseFloat(getComputedStyle(bubble).fontSize) * 1.1;
    for (let pass = 0; pass < 2 && r1.right > vw - edge; pass++) {
      bubble.style.left = Math.max(edge, vw - edge - r1.width) + 'px';
      r1 = measure();
    }

    /* The box is only measured true once it is shown, so a resize is only ever
       a second line: glide from the old size to the new one. */
    if (shown && !REDUCED && (Math.abs(r1.width - r0.width) > 1 || Math.abs(r1.height - r0.height) > 1)) {
      bubble.style.width  = r0.width + 'px';
      bubble.style.height = r0.height + 'px';
      void bubble.offsetWidth;
      bubble.style.transition = 'width .36s cubic-bezier(.2, .9, .3, 1.2), height .36s cubic-bezier(.2, .9, .3, 1.2)';
      bubble.style.width  = r1.width + 'px';
      bubble.style.height = r1.height + 'px';
      await wait(380);
      bubble.style.transition = '';
      bubble.style.width = '';
      bubble.style.height = '';
    }

    /* first line: pop in, and let the pop finish before the words start */
    if (!bubble.classList.contains('show')) {
      bubble.classList.add('show');
      if (onPop) onPop();
      await wait(REDUCED ? 200 : 460);
    }

    await typeInto(bubbleTxt, bubbleCaret, text, text.length * TYPE_MS);
  }

  /* the bubble pops away, back into its tail */
  async function hide(opts) {
    bubble.classList.add('out');
    bubble.classList.remove('show');
    await wait(REDUCED ? 200 : 300);
    if (opts && opts.layer) intro.classList.remove('on', 'aside');
  }

  /* back to a blank, un-popped bubble ready for the next say() -- call this
     when a scene is torn down or replayed */
  function reset() {
    bubble.classList.remove('out', 'show');
    bubble.style.width = bubble.style.height = bubble.style.left = bubble.style.transition = '';
    bubbleTxt.textContent = '';
    bubbleGhost.textContent = '';
  }

  const aside = on => intro.classList.toggle('aside', !!on);
  function configure(o) {
    if (o && typeof o.typeMs === 'number') TYPE_MS = o.typeMs;
    if (o && typeof o.onPop === 'function') onPop = o.onPop;
  }

  window.MascotBubble = { say, hide, reset, aside, configure, wordSpans, typeInto };
})();
```

---

## 5. How a scene uses it

```js
MascotBubble.configure({ onPop: () => sfx('click', .35) });   /* ADAPT: this game's click */

// the mascot has already hopped onto the stage
mascot.play('waving');                        /* ADAPT: this game's mascot API */
await MascotBubble.say('Hey there!');
await wait(420);

mascot.hold('talking');                       /* mouth moves while the words land */
await MascotBubble.say('Let’s start with a quick warm-up!');
mascot.release();
await wait(900);

await MascotBubble.hide();                    /* pops away... */
await mascotExit();                           /* ...THEN the mascot leaves */
MascotBubble.hide({ layer: true });
```

The beats that matter:

- **The mascot is on stage before the bubble pops.** The bubble comes out of the
  mascot's beak; if it pops onto an empty stage the tail points at nothing.
- **Between lines, a pause.** 420ms after the first line, 1500ms between lines of a
  longer aside, 700–900ms after the last, before anything else happens. The learner
  needs the beat to finish reading.
- **The mascot talks along.** If the mascot has a `talking` loop, hold it open for the
  length of `say()` and release it after. The first line can pair with a wave instead.
- **The bubble pops away before the mascot leaves,** never after, and never at the
  same time. Words the mascot is no longer standing under read as a mistake.
- **Lines are short.** One sentence. Two lines at most per appearance. The bubble is
  for a greeting, an aside, a verdict — not for paragraphs.

---

## 6. Voice-over pacing (do this if the game has narration clips)

When a line has a recording, the words should land across the clip so the last word
arrives a moment before the narrator finishes, and the next line must wait for the
clip to end. Replace the fixed pace in `typeInto` with this shape:

```js
async function typeInto(txt, blink, text, totalMs) {
  const said = await voSay(text);            /* ADAPT: start this line's clip; returns { playing, length, audio } or silence */
  blink.hidden = true;
  const words = wordSpans(txt, text);
  /* across ~82% of the clip when there is one, at the box's own pace when not */
  const paced = (said.playing && said.length > 0.5) ? said.length * 1000 * 0.82 : totalMs;
  const end = await revealWords(words, performance.now(), paced / Math.max(1, text.length));
  const left = end - performance.now();
  if (left > 0) await wait(left);
  await wordsSettle();
  await voHold(said);                        /* ADAPT: resolve when the clip ends, or at once when silent */
}
```

Silence is never a failure. A muted game, a missing clip, a browser holding audio
back until the first tap: in every case `voSay` resolves to a silent state and the
line types at its own pace.

---

## 7. The gotchas — each one is a visible defect if you skip it

**(a) Measure with the scale lifted.** Before its first `.show`, the bubble sits at
`scale(.15)`. `getBoundingClientRect()` returns the *transformed* box, so measuring it
as-is gives a width one-seventh of the truth, and the slide-left logic thinks every
line fits. Set `transition: none` and `transform: none`, read the box, restore both,
and flush layout (`void bubble.offsetWidth`) between them so the restore is not
animated.

**(b) Reset inline width, height and left before measuring.** A previous line may have
pinned them. Measuring with the old pins in place gives the old line's size.

**(c) Fill the ghost, not the live span, to size the box.** The live span is
`position: absolute` and contributes nothing to layout. If the ghost is empty the box
collapses to its padding and the words spill out of it.

**(d) Never apply the size glide to the first line.** Before the pop the measured box
is not true (see a), so gliding from it produces a box that visibly inflates from the
wrong size. Gate the glide on `shown`.

**(e) Two passes for the slide-left.** A box near the right edge is only as wide as
the room to its right. Sliding it left gives it more room, so it grows, and may now
be too wide for its new position. The second pass settles it. Two passes are always
enough because the width is capped by `max-width`.

**(f) Clear the inline transition after the glide.** Left in place, the `width` and
`height` transition fights the class transition on `transform` and `opacity` and the
next pop-in or pop-out judders.

**(g) Let the pop finish before the first word.** 460ms, the length of the pop
transition. Words fading in while the box is still overshooting read as the words
wobbling.

**(h) `whitespace: pre-wrap` on the ghost AND the live span.** The word spans carry
their trailing spaces. With `white-space: normal` on one and not the other the two
wrap at different points and the live words drift off the ghost's rows.

**(i) The tail starts 4px inside the border.** `top: calc(100% - 4px)` and a filled
path that begins above the tail's own top edge. Otherwise the border draws straight
across the root of the tail.

**(j) `vector-effect: non-scaling-stroke` on the tail's stroke.** The SVG is `.76em`
wide for a 44-unit viewBox, so a 4-unit stroke would scale with the type size and no
longer match the box's 4px border.

**(k) `reset()` on teardown.** A replay or a jump to another scene must clear `.out`,
`.show`, every inline style, and both text spans. A bubble left mid-glide, or left
popped, reappears in that state when the scene is next entered.

**(l) `.out` before removing `.show`.** The exit transition is faster than the entry.
Removing `.show` alone plays the entry's slow overshoot in reverse, which reads as the
bubble deflating slowly instead of popping away.

---

## 8. Optional: the same bubble on the board as a verdict box

The greeting's bubble is the one drawing; a verdict spoken beside the mascot on the
board ("That's correct!", "Try again!") is the same bubble at the board's type size,
coloured green or red, and the box appears only when there is a verdict to put in it.
An instruction is just the words; only a verdict gets the box.

**Why `--bub-u` is 1.55em here.** The one length the two boxes share is the 4px edge.
At the greeting's ~59px type that edge is a hairline round a big box; at a verdict's
~22px it is three times as heavy a share. Drawing the small box's corner, light and
tail at 1.55x puts each back at the same share of the box the greeting gives them,
which is what makes the two read as the same bubble.

```html
<div class="quiz-say">
  <div class="mascot" id="quizMascot" aria-hidden="true"></div>
  <p class="quiz-bubble msg" id="quizNote" aria-live="polite">
    <span class="type-wrap">
      <span class="type-ghost" id="noteGhost"></span>
      <span class="type" id="noteType"><span class="txt"></span><i class="caret" aria-hidden="true"></i></span>
    </span>
    <svg class="bubble-tail" viewBox="0 0 44 42" aria-hidden="true"><use href="#ico-tail" /></svg>
  </p>
</div>
```

```css
/* mascot on the left, its box up and to its right, level with its head */
.quiz-say { display: flex; align-items: flex-end; justify-content: center; gap: clamp(2px, .5vw, 8px); }
.quiz-bubble {
  max-width: min(460px, calc(100% - var(--mascot)));
  margin: 0 0 calc(var(--mascot) * .42);        /* up beside the head, not level with the feet */
  opacity: 0; visibility: hidden; transform: translateY(8px);
  transition: transform .3s ease-in, opacity .22s ease, visibility 0s linear .3s,
              color .35s ease, border-color .35s ease, background-color .35s ease, box-shadow .35s ease;
}
.quiz-bubble.show {
  opacity: 1; visibility: visible; transform: none;
  transition: transform .44s cubic-bezier(.2, .9, .3, 1.45), opacity .2s ease,
              color .35s ease, border-color .35s ease, background-color .35s ease, box-shadow .35s ease;
}
.quiz-bubble .type-wrap { display: block; }
.quiz-bubble .type-ghost { display: block; text-wrap: balance; }
.quiz-bubble .type { white-space: normal; text-align: center; text-wrap: balance; }

/* the box itself: transparent until it has a verdict, so a verdict arriving
   does not move the line it replaces -- the box is a colour that comes and
   goes, not a shape that pushes the room open */
.msg {
  --note-edge: transparent;
  --note-glow-soft: transparent;
  --note-glow-dim: transparent;
  --bub-u: 1.55em;
  position: relative;
  min-width: 0;
  padding: .62em 1em;
  border: 4px solid var(--note-edge);
  border-radius: var(--bub-corner);
  background: none;
  box-shadow: none;
  text-align: center;
  font-weight: 700; line-height: 1.2; letter-spacing: .2px;
  color: var(--heading);
}
/* the ghost holds the LONGEST line the box will ever say, so one verdict
   replacing another never resizes it; the live line is centred in that room */
.msg .type { display: flex; align-items: center; justify-content: center; }
.msg.ok, .msg.bad {
  background: var(--board-bg);
  box-shadow: 0 0 14px 2px var(--note-glow-soft), 0 0 34px 10px var(--note-glow-dim), 0 10px 26px var(--shadow-soft);
}
.msg.ok  { --note-edge: var(--correct); --note-glow-soft: var(--glow-correct-soft); --note-glow-dim: var(--glow-correct-dim); color: var(--correct); }
.msg.bad { --note-edge: var(--wrong);   --note-glow-soft: var(--glow-wrong-soft);   --note-glow-dim: var(--glow-wrong-dim);   color: var(--wrong); }
/* catch-light and tail, hidden until there is a box for them */
.msg::before { /* same as .bubble::before */ opacity: 0; transition: opacity .35s ease; }
.msg.ok::before, .msg.bad::before { opacity: .95; }
.msg > .bubble-tail { opacity: 0; transition: opacity .3s ease; }
.msg.ok > .bubble-tail, .msg.bad > .bubble-tail { opacity: 1; }
/* a boxed verdict pops out of its tail the way the greeting does */
.quiz-bubble.ok, .quiz-bubble.bad { transform: scale(.16); transform-origin: 12% 100%; }
.quiz-bubble.ok.show, .quiz-bubble.bad.show { transform: none; }
```

The tail symbol's stroke must read `var(--note-edge)` (section 2) so it turns green
or red with the box. Set the ghost once, to the longest verdict, and only ever change
the live span; the box then holds one size for the whole quiz.

---

## 9. Done when

- The bubble **pops out of the tail's root**, overshoots slightly, settles. No fade-in
  from nothing, no slide.
- Frame-stepping the first line (DevTools, animation speed 10%): the box is at its
  **final size before the first word appears**, and no word moves after appearing.
- Words **fade up and sharpen in place**, one after another, longer words holding a
  little longer. The whole line lands in `text.length × 72ms` (or across 82% of its
  voice clip).
- A **second, shorter or longer line glides** the box to its new size in ~360ms; it
  does not snap and does not pop again.
- A line too long for a narrow phone **slides the box left** and wraps inside it. The
  emphasis strokes stay on screen; nothing is clipped at the right edge.
- The tail **covers the border** where it joins; no line shows across the tail's root
  at any type size.
- `hide()` **pops the bubble away faster than it came**, and the mascot leaves only
  after.
- `prefers-reduced-motion`: the bubble fades in 200ms, words appear in 80ms each, no
  overshoot, no glide.
- Replaying or skipping the scene mid-line leaves **no half-typed bubble** on the next
  entry.

## 10. The numbers, if you want to tune the character

| value | what it controls |
|---|---|
| `scale(.15)`, `transform-origin: 12% 100%` | how small the pop starts, and that it starts at the tail |
| `.44s cubic-bezier(.2, .9, .3, 1.45)` | the pop's overshoot: the `1.45` is the bounce past full size |
| `.26s ease-in` | the pop-away; faster than the arrival |
| `TYPE_MS = 72` | pace per character with no voice-over |
| `.82` | share of a voice clip the words land across |
| `wd-in .46s`, `blur(4px)` | how long a word takes to sharpen, and from how soft |
| `WORD_IN_MS = 200` | the pause after the last word before `say()` resolves |
| `460ms` | the wait after the pop before the first word |
| `.36s cubic-bezier(.2, .9, .3, 1.2)` | the size glide between lines |
| `edge = 12 + fontSize × 1.1` | the screen margin kept clear for the emphasis strokes |
| `4px` border, `stroke-width: 7` on marks | the drawing's line weights |
| `--bub-u: 1em` / `1.55em` | the drawing's unit for the big bubble / the small verdict box |
