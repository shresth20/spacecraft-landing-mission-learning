# Task: draw this speech bubble

Build the speech bubble described below — the box a mascot speaks from. **This is the
drawing only.** How the words arrive, how the box is sized to a line, and how a scene
sequences it are a separate concern; here, the job is that the bubble *looks* right in
every state.

Everything is specified. Copy the markup and the CSS, swap the palette for the host
game's own, and change nothing else without a reason.

---

## 1. What it looks like

A rounded box with a heavy border, a soft coloured halo around it, a small white
catch-light in its top-left corner, a curved tail hanging off its bottom-left corner,
and two short strokes floating outside it on either side like the marks in a comic
panel.

```
              ╭──────────────────────────────╮
       ╲╲     │ ◜                            │     ╱╱
       ╱╱     │      Hey there!              │     ╲╲
              ╰─╮╭───────────────────────────╯
                ╰╯──╮
                     ╰──╮
                         ╰─
```

- the box: 4px border, generous corner radius, pale fill, dark text at weight 700
- `◜` the catch-light: a small white lozenge, rotated, top-left inside the box
- `╲╲ ╱╱` the emphasis marks: two short strokes each side, converging on the box
- the tail: hangs off the bottom-left, curving down and to the left, toward the
  mascot's beak

---

## 2. The proportion system — read this before touching a number

Every part of the drawing is a fraction of **one unit**, `--bub-u`, which is `1em`.
Corner radius, catch-light, tail: none of them has a size of its own.

This exists because the same bubble is drawn at two very different type sizes. The
one length the two share is the **4px border**. At a greeting's ~59px type that border
is a hairline around a big box; at an on-board verdict's ~22px type it is three times
as heavy a share of the box. Drawing the small box's corner, light and tail at
`--bub-u: 1.55em` puts each of them back at the same *share* of the box that the big
one gives them — roughly a quarter of the height for the corner, a fifth for the
light, a little over a quarter for the tail. That is what makes the two read as the
same bubble rather than as two bubbles that happen to be the same colour.

```css
.bubble,
.msg {
  --bub-u:       1em;                        /* the small verdict box sets 1.55em */
  --bub-corner:  calc(var(--bub-u) * .62);
  --bub-light-w: calc(var(--bub-u) * .5);
  --bub-light-h: calc(var(--bub-u) * .2);
  --bub-light-x: calc(var(--bub-u) * .42);
  --bub-light-y: calc(var(--bub-u) * .34);
  --bub-tail-w:  calc(var(--bub-u) * .76);
  --bub-tail-x:  calc(var(--bub-u) * .78);
}
```

**Do not replace these with pixel values.** A bubble drawn at pixel sizes is correct
at exactly one type size and wrong at every other.

---

## 3. Palette

Seven colours. **ADAPT these to the host game** — the bubble must belong to the game
it is in. Keep the relationships, not the hues:

| token | role | relationship |
|---|---|---|
| `--board-bg` | the fill | a pale tint of the game's accent |
| `--board-border` | border, tail stroke, side marks | a mid tone of the same hue |
| `--heading` | the words | a dark tone of the same hue |
| `--bubble-sheen` | the catch-light | white, the only pure white in the game |
| `--glow-board-soft` | inner halo | `--board-border` at 26% alpha |
| `--glow-board-dim` | outer halo | `--board-border` at 13% alpha |
| `--shadow-soft` | the drop shadow | the game's darkest colour at 16% alpha |

```css
:root {
  --board-bg: #FBE8EA;
  --board-border: #EA979E;
  --heading: #85345E;
  --bubble-sheen: #FFFFFF;
  --glow-board-soft: rgba(234, 151, 158, .26);
  --glow-board-dim:  rgba(234, 151, 158, .13);
  --shadow-soft:     rgba(98, 31, 55, .16);

  /* only for the verdict box in section 8 */
  --correct: #2EBF7A;
  --wrong:   #E5304B;
  --glow-correct-soft: rgba(46, 191, 122, .26);
  --glow-correct-dim:  rgba(46, 191, 122, .15);
  --glow-wrong-soft:   rgba(229, 48, 75, .26);
  --glow-wrong-dim:    rgba(229, 48, 75, .13);
}
```

**Typeface:** a rounded display sans at weight 700. The original is Baloo 2. ADAPT to
the game's own display face; keep the weight heavy and the corners round. A thin or
grotesque face reads as a system tooltip, not as speech.

---

## 4. Markup

```html
<!-- the layer the bubble floats on: fixed, full-screen, pointer-transparent.
     Put the mascot element in here too, so the two move together. -->
<div class="intro" id="intro" aria-hidden="true">

  <div class="bubble" id="bubble">
    <!-- two short strokes on the left, converging on the box -->
    <svg class="bubble-mark mark-left" viewBox="0 0 40 60" aria-hidden="true">
      <path d="M8 12 L30 24" /><path d="M8 48 L30 36" />
    </svg>

    <!-- the text. The hidden ghost holds the full line and sets the box's size;
         the live span sits on top of it. Keep BOTH even for static text: the
         structure is what lets the box be sized before the words appear. -->
    <span class="type-wrap">
      <span class="type-ghost" id="bubbleGhost"></span>
      <span class="type" id="bubbleType" aria-live="polite"><span class="txt"></span><i class="caret" aria-hidden="true"></i></span>
    </span>

    <!-- two short strokes on the right -->
    <svg class="bubble-mark mark-right" viewBox="0 0 40 60" aria-hidden="true">
      <path d="M32 12 L10 24" /><path d="M32 48 L10 36" />
    </svg>

    <!-- the tail: filled first so it covers the box's border where the two meet,
         then stroked on its two free edges only -->
    <svg class="bubble-tail" viewBox="0 -8 44 42" aria-hidden="true">
      <path class="tail-fill"   d="M4 -8 H42 V0 C36 12 24 22 2 34 C8 24 8 12 4 0 Z" />
      <path class="tail-stroke" d="M42 0 C36 12 24 22 2 34 C8 24 8 12 4 0" />
    </svg>
  </div>
</div>
```

**The tail is drawn in two passes and this is not optional.** The filled shape starts
*above* the tail's own top edge (`M4 -8`), inside the box, so it paints over the box's
border where the tail joins. Then only the tail's two free edges are stroked. Draw it
as one stroked path instead and the box's border runs straight across the root of the
tail, which looks like a mistake at every size.

If the bubble appears in more than one place, move the tail into a `<symbol>` once and
stamp it with `<use>`, giving the stroke `stroke="var(--note-edge)"` so it takes the
colour of whatever box it hangs off:

```html
<svg width="0" height="0" style="position:absolute" aria-hidden="true">
  <symbol id="ico-tail" viewBox="0 0 44 42">
    <path d="M4 0 H42 V8 C36 20 24 30 2 42 C8 32 8 20 4 8 Z" fill="var(--board-bg)" />
    <path d="M42 8 C36 20 24 30 2 42 C8 32 8 20 4 8" fill="none"
          stroke="var(--note-edge)" stroke-width="4"
          stroke-linecap="round" stroke-linejoin="round"
          vector-effect="non-scaling-stroke" />
  </symbol>
</svg>

<svg class="bubble-tail" viewBox="0 0 44 42" aria-hidden="true"><use href="#ico-tail" /></svg>
```

---

## 5. CSS

### The layer

```css
.intro {
  position: fixed;
  inset: 0;
  z-index: 950;
  display: none;
  pointer-events: none;
  font-family: "Baloo 2", "Trebuchet MS", system-ui, sans-serif;   /* ADAPT */
}
.intro.on { display: block; }
```

### The box

```css
.bubble {
  position: absolute;
  /* ADAPT: where it floats relative to the mascot. In the original the bird
     stands left of centre with its feet 17.5vh up, and the bubble sits up and
     to the right of its head so the tail comes down by the beak. */
  left: 38%;
  bottom: 57.5vh;
  /* wide enough for a short line to stay on one row. The subtraction is the
     screen margin plus room for the emphasis strokes outside the box. */
  max-width: min(1000px, calc(100vw - 24px - 2.2em));

  --note-edge: var(--board-border);
  padding: .62em 1em;
  border: 4px solid var(--note-edge);
  border-radius: var(--bub-corner);
  background: var(--board-bg);
  /* three layers: a tight bright halo, a wide dim one, and a real drop shadow
     below. The first two are what make the box look lit rather than pasted on. */
  box-shadow:
    0 0 14px 2px var(--glow-board-soft),
    0 0 34px 10px var(--glow-board-dim),
    0 10px 26px var(--shadow-soft);

  color: var(--heading);
  font-weight: 700;
  /* keyed to the viewport height like the rest of the game's type, but reined in
     by the width so a portrait phone does not get a bubble wider than the screen */
  font-size: clamp(24.2px, min(6.6vh, 5.1vw), 63.8px);
  line-height: 1.2;
  letter-spacing: .2px;
  text-align: center;

  /* resting state: scaled down to a dot at the tail's root */
  opacity: 0;
  transform: scale(.15);
  transform-origin: 12% 100%;
  transition: transform .44s cubic-bezier(.2, .9, .3, 1.45), opacity .2s ease;
}

/* shown: springs open, overshoots, settles */
.bubble.show { opacity: 1; transform: none; }

/* leaving: back into the tail, faster than it came */
.bubble.out  { transition: transform .26s ease-in, opacity .22s ease .04s; }
```

**`transform-origin: 12% 100%` is the tail's root.** That is the whole illusion: the
box inflates out of the tail, which points at the mascot's beak. Change the origin to
centre and the bubble becomes a generic popup.

**The `1.45` in the cubic-bezier is the overshoot** — the box passes full size and
comes back. Reduce it toward `1.0` for a more restrained game; do not remove it, or
the pop becomes a fade with extra steps.

### The catch-light

```css
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

A single small lozenge, tilted. It reads as a highlight on a glossy surface and it is
the only pure white in the drawing. One is enough — a second light, or a gradient
sheen across the whole box, makes it look like a button.

### The text spans

```css
.type-wrap  { position: relative; display: inline-block; }
.type-ghost { visibility: hidden; }          /* holds the line, sets the box's size */
.type {
  position: absolute;
  inset: 0;
  text-align: center;
  white-space: pre-wrap;
}
/* the bubble's line may wrap inside the box's width -- ghost and live copy alike,
   or the two wrap at different points and the words drift off their rows */
.bubble .type-wrap { display: inline-block; vertical-align: top; white-space: normal; max-width: 100%; }
.bubble .type-wrap .type-ghost,
.bubble .type-wrap .type { white-space: pre-wrap; }

/* the caret is kept in the markup and never shown */
.caret { display: none; }
```

### The emphasis marks

```css
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
```

Vertically centred on the box, a small gap outside each edge. They sit in `em`, so
they scale with the bubble. They are decoration and must never be allowed to push the
box's layout.

### The tail

```css
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
  /* the svg is .76em wide for a 44-unit viewBox: without this the stroke scales
     with the type size and no longer matches the box's 4px border */
  vector-effect: non-scaling-stroke;
}
```

### Reduced motion

```css
@media (prefers-reduced-motion: reduce) {
  .bubble { transition: opacity .2s ease; }   /* it fades; it does not pop */
}
```

---

## 6. Placement against the mascot

The tail is a pointer. Wherever the bubble sits, **the tail's tip must fall near the
mascot's beak**, and the bubble must sit **up and to the right of the head**, clear of
it. Two consequences:

- Stand the mascot **left of centre**, not dead centre. The bubble takes the space off
  its right shoulder, so a centred mascot pushes the pair into the right edge of the
  screen. Left of centre, the two together read as centred.
- Anchor both to the same axis so they move together. In the original the mascot's
  left edge and the bubble's left edge are both percentages of the viewport width, and
  a second placement (the between-sections aside) moves both by changing only those
  two percentages:

```css
.intro.aside .intro-mascot { left: 26%; }
.intro.aside .bubble {
  left: 26.5%;
  max-width: min(900px, 64vw);     /* longer lines, allowed to wrap */
}
```

---

## 7. An optional second placement: the box on the board

The same drawing, at the board's type size, next to a mascot standing in a row rather
than on an empty stage. This is where `--bub-u: 1.55em` earns its keep.

```html
<div class="quiz-say">
  <div class="mascot" aria-hidden="true"></div>
  <p class="quiz-bubble msg" aria-live="polite">
    <span class="type-wrap">
      <span class="type-ghost"></span>
      <span class="type"><span class="txt"></span><i class="caret" aria-hidden="true"></i></span>
    </span>
    <svg class="bubble-tail" viewBox="0 0 44 42" aria-hidden="true"><use href="#ico-tail" /></svg>
  </p>
</div>
```

```css
/* mascot on the left, its box up beside its HEAD -- not level with its feet */
.quiz-say {
  display: flex;
  align-items: flex-end;
  justify-content: center;
  gap: clamp(2px, .5vw, 8px);
}
.quiz-bubble {
  max-width: min(460px, calc(100% - var(--mascot)));
  margin: 0 0 calc(var(--mascot) * .42);
}
.quiz-bubble .type-wrap  { display: block; }
.quiz-bubble .type-ghost { display: block; text-wrap: balance; }
.quiz-bubble .type       { white-space: normal; text-align: center; text-wrap: balance; }
```

---

## 8. The verdict colouring

A line the mascot simply says is **just the words** — no box. Only a verdict, right or
wrong, gets the box, and the box's whole hue changes with it: edge, halo and words
together.

The box therefore has to be **transparent but present** at rest: it keeps its padding
and a border of its own width in the clear, so a verdict arriving colours a box that
was already there instead of pushing the room open.

```css
.msg {
  --note-edge: transparent;
  --note-glow-soft: transparent;
  --note-glow-dim: transparent;
  --bub-u: 1.55em;                  /* the drawing, one size up: see section 2 */

  position: relative;
  min-width: 0;
  padding: .62em 1em;
  border: 4px solid var(--note-edge);
  border-radius: var(--bub-corner);
  background: none;
  box-shadow: none;
  text-align: center;
  /* the greeting's type at the board's size: same weight, line and tracking, so
     the words inside the box sit the way they sit in the big bubble */
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: .2px;
  color: var(--heading);
  transition: opacity .36s ease, color .35s ease, border-color .35s ease,
              background-color .35s ease, box-shadow .35s ease;
}

.msg.ok,
.msg.bad {
  background: var(--board-bg);
  box-shadow:
    0 0 14px 2px var(--note-glow-soft),
    0 0 34px 10px var(--note-glow-dim),
    0 10px 26px var(--shadow-soft);
}
.msg.ok {
  --note-edge: var(--correct);
  --note-glow-soft: var(--glow-correct-soft);
  --note-glow-dim: var(--glow-correct-dim);
  color: var(--correct);
}
.msg.bad {
  --note-edge: var(--wrong);
  --note-glow-soft: var(--glow-wrong-soft);
  --note-glow-dim: var(--glow-wrong-dim);
  color: var(--wrong);
}

/* the catch-light and the tail belong to the box, so they arrive with it */
.msg::before {
  content: "";
  position: absolute;
  left: var(--bub-light-x);
  top: var(--bub-light-y);
  width: var(--bub-light-w);
  height: var(--bub-light-h);
  border-radius: 999px;
  background: var(--bubble-sheen);
  transform: rotate(-22deg);
  opacity: 0;
  transition: opacity .35s ease;
}
.msg.ok::before,
.msg.bad::before { opacity: .95; }

.msg > .bubble-tail { opacity: 0; transition: opacity .3s ease; }
.msg.ok  > .bubble-tail,
.msg.bad > .bubble-tail { opacity: 1; }
```

### How it arrives

An uncoloured line **rises** into place. A coloured verdict **pops out of its tail**,
exactly as the big bubble does.

```css
.quiz-bubble {
  opacity: 0;
  visibility: hidden;
  transform: translateY(8px);
  transition: transform .3s ease-in, opacity .22s ease, visibility 0s linear .3s,
              color .35s ease, border-color .35s ease, background-color .35s ease, box-shadow .35s ease;
}
.quiz-bubble.show {
  opacity: 1;
  visibility: visible;
  transform: none;
  transition: transform .44s cubic-bezier(.2, .9, .3, 1.45), opacity .2s ease,
              color .35s ease, border-color .35s ease, background-color .35s ease, box-shadow .35s ease;
}
/* a verdict starts as a dot at its tail instead */
.quiz-bubble.ok,
.quiz-bubble.bad { transform: scale(.16); transform-origin: 12% 100%; }
/* ...and still settles where .show puts it, written out because the rule above
   would otherwise win on source order */
.quiz-bubble.ok.show,
.quiz-bubble.bad.show { transform: none; }
```

---

## 9. The states to build and check

Four classes drive every state. Wire them to buttons and step through all of them.

| class | state |
|---|---|
| `.intro.on` | the layer is up |
| `.bubble.show` | popped open |
| `.bubble.out` (with `.show` removed) | popping away |
| `.msg.ok` / `.msg.bad` | the on-board box, green or red |

```js
/* the whole of the design's behaviour: */
intro.classList.add('on');
bubble.classList.add('show');                          // pop in
bubble.classList.add('out'); bubble.classList.remove('show');   // pop away
```

---

## 10. Done when

- The bubble **inflates out of the tail's root**, passes full size, and settles. It
  never fades in from nothing and never slides in from a side.
- **The tail's tip points at the mascot's beak**, and the box sits up and to the right
  of the head, not over it.
- **No line shows across the root of the tail** at any type size — the filled pass
  covers the box's border where the two meet.
- The tail's stroke is **the same visual weight as the box's border** at every type
  size. Zoom the page to 200% and check it again.
- **One catch-light**, small, tilted, top-left, white.
- The emphasis marks sit **outside the box on both sides**, vertically centred, and
  scale with it.
- The halo reads as **light around the box**, not as a hard outline: three layers,
  tight and bright, wide and dim, then a real shadow below.
- On a **portrait phone**: the box is never wider than the screen, the emphasis marks
  are still on screen, and the type is still readable. On a **wide desktop**: the box
  does not stretch past its `max-width` and the type stops growing at its clamp.
- The **on-board verdict box** reads as the same bubble as the greeting, not as a
  smaller different one. Screenshot both, scale one to the other's width, and the
  corner radius, catch-light and tail should land in the same places.
- An **uncoloured line has no box at all** — no border, no fill, no tail, no light —
  and colouring it does not move the line or anything around it.
- `prefers-reduced-motion`: the bubble fades, with no pop and no overshoot.

## 11. The numbers, if you want to tune the character

| value | what it controls |
|---|---|
| `--bub-u: 1em` / `1.55em` | the drawing's unit: big bubble / small verdict box |
| `.62` of the unit | corner radius — a quarter of the box's height |
| `.5` × `.2` of the unit | the catch-light's size |
| `.76` of the unit | the tail's width |
| `4px` border, `stroke-width: 7` on the marks | the drawing's two line weights |
| `scale(.15)`, `transform-origin: 12% 100%` | how small the pop starts, and that it starts at the tail |
| `.44s cubic-bezier(.2, .9, .3, 1.45)` | the pop; `1.45` is the overshoot past full size |
| `.26s ease-in` | the pop-away, deliberately faster than the arrival |
| `rotate(-22deg)`, `opacity: .95` | the catch-light's tilt and strength |
| `14px 2px` / `34px 10px` / `0 10px 26px` | the three shadow layers: halo, glow, shadow |
| `clamp(24.2px, min(6.6vh, 5.1vw), 63.8px)` | the type: keyed to height, capped by width |
| `calc(100vw - 24px - 2.2em)` | the width cap: screen margin plus room for the marks |
