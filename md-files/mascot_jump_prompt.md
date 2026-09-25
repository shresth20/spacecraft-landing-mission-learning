# Task: a mascot that leaves by jumping behind the board, and arrives by jumping out from behind it

Implement the arrival and the exit described below. The mascot is never faded in or
out, and never slides in from a side.

- **To leave:** it crouches on its spot, springs up off it, and **falls back down
  behind the top edge of the board**, out of sight. The spot it held is given up.
- **To arrive:** it **springs up from behind that same top edge**, arcs over it, and
  **drops onto its spot** with a landing squash — beside the heading, or wherever the
  scene wants it.

The whole trick is that **two elements share one arc** and swap at the top of it.
Read section 1 before writing any code; every gotcha in section 5 is a bug that was
actually hit and fixed in the original.

---

## 1. Why two elements, and not one

The mascot's resting place is a cell **inside** the board. An element inside the
board cannot hide behind the board: a transform does not clip, and giving the board
`overflow: hidden` would clip everything else the board holds.

So the arc is split in half at its apex:

| half of the arc | which element does it | where it is painted |
|---|---|---|
| **rising out from behind the edge** (arrival) | a `position: fixed` clone — call it the **hopper** — living outside and *under* the board | under the board, so its starting position is genuinely hidden behind it |
| **falling onto the spot** (arrival) | the **real in-board sprite** | over the board |
| **crouch and spring off the spot** (exit) | the **real in-board sprite** | over the board |
| **falling back behind the edge** (exit) | the **hopper** | under the board |

They hand over at the **apex**, the one point where both are fully clear of the
board's top edge and therefore look identical. Same artwork, same size, same pixel,
one painter — so the cut is invisible.

**Hard requirement:** the hopper must render **underneath** the board. The simplest
way that works: put the hopper **before** the board/stage in the document and give
it **no `z-index`**, while the board also has none. Do not reach for a negative
`z-index` if the board creates a stacking context — verify in DevTools that the
hopper is genuinely invisible while parked at its start position.

---

## 2. Markup

```html
<!-- BEFORE the stage/board in the document: this is what makes it paint underneath -->
<div class="hopper" id="hopper" aria-hidden="true"></div>

<div class="stage">
  <main class="board" id="board">
    <div class="prompt-row">
      <div class="prompt">
        <span class="mascot" id="mascot" aria-hidden="true"></span>
        <!-- the heading text sits beside it -->
      </div>
    </div>
    <!-- the rest of the board -->
  </main>
</div>
```

The mascot is `aria-hidden`: it is decoration, and the line it stands beside is what
the screen reader is given.

## 3. CSS

```css
.mascot {
  position: relative;
  flex: none;
  width: var(--mascot);
  height: var(--mascot);
  pointer-events: none;
  /* ADAPT: however your mascot is painted -- sprite sheet, background image, <img>.
     The hopper MUST paint identically, at the same size. */
  background-image: var(--sprite-img);
  background-repeat: no-repeat;
  background-size: var(--sprite-size);
  background-position: var(--sprite-pos);
  filter: drop-shadow(0 5px 8px rgba(0, 0, 0, .25));

  /* No fade, and NO transition on opacity: it arrives by jumping, and the
     hand-over from the hopper has to be a hard cut on the very same frame. */
  opacity: 0;
}
.mascot.in { opacity: 1; }

/* The hopper: the same sprite, fixed to the viewport, sized and placed by JS
   from the in-board sprite's own box. */
.hopper {
  position: fixed;
  display: none;
  pointer-events: none;
  background-image: var(--sprite-img);
  background-repeat: no-repeat;
  background-size: var(--sprite-size);
  background-position: var(--sprite-pos);
  filter: drop-shadow(0 5px 8px rgba(0, 0, 0, .25));
}
/* `.on` is on for exactly the length of one flight, which is exactly how long
   the compositor should be holding a layer for it. */
.hopper.on { display: block; will-change: transform; }
```

## 4. JavaScript

```js
const REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const finished = a => a.finished.catch(() => {});   /* ADAPT: see section 7 */

const board       = document.getElementById('board');
const hopper      = document.getElementById('hopper');
const boardMascot = document.getElementById('mascot');

let inFlight = [];          /* the spots a flight now in the air is leaving / bound for */

/* ---------- ARRIVE: up from behind the board, then down onto the spot ---------- */
async function mascotJumpIn(target) {
  const spot = target || boardMascot;          /* the heading's spot unless told otherwise */
  const m = spot.getBoundingClientRect();
  const b = board.getBoundingClientRect();
  if (!m.width || REDUCED) { spot.classList.add('in'); return; }

  const apexTop = b.top - m.height * 0.9 - 8;  /* the whole mascot clear above the edge */
  const hideTop = b.top + 14;                  /* tucked just under the edge, covered */

  /* --- the rising half: the hopper, starting hidden behind the board --- */
  inFlight = [spot];
  Object.assign(hopper.style, {
    left:   m.left   + 'px',
    top:    hideTop  + 'px',
    width:  m.width  + 'px',
    height: m.height + 'px'
  });
  hopper.classList.add('on');
  const rise = hopper.animate(
    [{ transform: 'translateY(0)' },
     { transform: 'translateY(' + (apexTop - hideTop) + 'px)' }],
    { duration: 380, easing: 'cubic-bezier(.2, .6, .35, 1)', fill: 'forwards' }
  );
  await finished(rise);

  /* --- hand over at the apex, then the falling half: the in-board sprite ---
     MEASURE THE SPOT AGAIN HERE -- see gotcha (a). */
  const at   = spot.getBoundingClientRect();
  const drop = apexTop - at.top;
  spot.style.transform = 'translateY(' + drop + 'px)';   /* written BEFORE it is shown -- gotcha (b) */
  spot.classList.add('in');
  hopper.classList.remove('on');
  rise.cancel();

  const fall = spot.animate([
    { transform: 'translateY(' + drop + 'px)', easing: 'cubic-bezier(.45, 0, .85, .5)' },
    { transform: 'translateY(0) scale(1.06, .92)', offset: .8, easing: 'ease-out' },  /* the landing squash */
    { transform: 'none' }
  ], { duration: Math.min(760, 320 - drop * 0.5), fill: 'forwards' });   /* a longer drop takes longer to fall */

  /* The fill holds the last keyframe -- which is `none` -- so clearing the inline
     transform and dropping the animation changes nothing on screen. */
  try { await finished(fall); }
  finally { spot.style.removeProperty('transform'); fall.cancel(); inFlight = []; }
}

/* ---------- LEAVE: crouch, spring up, fall back behind the board ---------- */
async function mascotJumpOut(source) {
  const spot = source || boardMascot;
  if (!spot.classList.contains('in')) return;        /* already gone */
  const m = spot.getBoundingClientRect();
  const b = board.getBoundingClientRect();
  if (!m.width || REDUCED) { spot.classList.remove('in'); return; }

  const apexTop = b.top - m.height * 0.9 - 8;        /* the same apex as the arrival */
  const hideTop = b.top + 14;

  /* --- the rising half, this time by the in-board sprite: crouch, then spring --- */
  inFlight = [spot];
  const rise = spot.animate([
    { transform: 'none', easing: 'ease-in' },
    { transform: 'translateY(6%) scale(1.06, .92)', offset: .24, easing: 'cubic-bezier(.2, .6, .35, 1)' },
    { transform: 'translateY(' + (apexTop - m.top) + 'px)' }
  ], { duration: 560, fill: 'forwards' });
  await finished(rise);

  /* --- hand over to the hopper at the apex ---
     Take the box the sprite ACTUALLY ended at, not the one it was aimed at: the
     fill holds the rise, so this is its own last painted position -- correct even
     if the row closed underneath it on the way up. */
  const at = spot.getBoundingClientRect();
  Object.assign(hopper.style, {
    left:   at.left   + 'px',
    top:    at.top    + 'px',
    width:  at.width  + 'px',
    height: at.height + 'px'
  });
  hopper.classList.add('on');
  spot.classList.remove('in');
  rise.cancel();

  /* --- the falling half: down behind the board's top edge, and gone --- */
  const fall = hopper.animate(
    [{ transform: 'translateY(0)' },
     { transform: 'translateY(' + (hideTop - at.top) + 'px)' }],
    { duration: 360, easing: 'cubic-bezier(.45, 0, .85, .5)', fill: 'forwards' }
  );
  await finished(fall);
  hopper.classList.remove('on');
  fall.cancel();
  inFlight = [];
}
```

Both functions are awaitable and resolve only once the mascot has landed, or is
fully out of sight, so a scene can chain the next beat without the two overlapping.

---

## 5. The gotchas — each one is a visible flicker if you skip it

**(a) Re-measure the landing spot at the apex.** Do not reuse the box read before
the jump. If the mascot's row opens or grows to make room for it (section 6), the
landing spot **slides down the board while the mascot is in the air** — 55px, in the
original. Starting the fall from the stale box puts the in-board sprite somewhere
other than where the hopper was left standing, and the swap paints the character
**in two places on consecutive frames**: exactly the flicker the hand-over exists to
hide. The same applies in reverse on the way out — read the sprite's live box before
placing the hopper.

**(b) Write the fall's starting transform BEFORE showing the sprite.** Set
`spot.style.transform`, then add `.in`, in that order. Otherwise a frame painted
before the animation's first sample catches the mascot sitting at its destination
for one frame.

**(c) `fill: forwards` on every leg, and `cancel()` only after you have read what
you need from it.** The fill is what keeps a sprite painted at the hand-over point
across the swap. Cancel the rise only once the other element is already visible in
the same place.

**(d) No transition on the mascot's opacity.** The swap is a hard cut on one frame;
any fade makes the mascot visibly ghost through the board's edge.

**(e) Bail out honestly.** A zero-width box (the spot is hidden, or not laid out
yet) or `prefers-reduced-motion` — just toggle `.in` and return. Never animate from
a zero-width box.

**(f) Size and place the hopper before adding `.on`,** since `.on` is what flips
`display: none` off.

**(g) Never run a jump against a board whose layout is still settling** — a scene
still fading its board in, a font still loading. Await that first; both jumps
measure real geometry.

---

## 6. The row that gives its room back (do this if the spot should fold away)

If the mascot leaving should also hand its space back to the board, make its row an
accordion whose height is measured from its visible occupants and transitioned.

```css
.prompt-row { overflow: hidden; transition: height .5s cubic-bezier(.4, 0, .2, 1); }
```

Measure the row as **open** when it holds a line, when the mascot is standing in it,
**or while a flight with this row at one end of it is in the air**:

```js
function roomHeight(room) {
  const flying  = hopper.classList.contains('on');
  const here    = boardMascot.classList.contains('in') ||
                  (flying && inFlight.indexOf(boardMascot) >= 0);
  const hasText = /* ADAPT: does this row's text hold anything? */;
  return (hasText || here) ? room.firstElementChild.offsetHeight : 0;
}
```

- Counting **only** whether the mascot is standing there makes the row snap shut and
  straight back open on every hop, which pumps the whole board.
- Gate on `inFlight` holding *this* row's spot. A mascot flying somewhere else on
  the screen must not hold this row open for the length of its trip, or the board's
  entire contents drop and rise again underneath it.
- **Open immediately, close on a short delay** (~360ms). A room emptied and refilled
  within a few frames — the gap between one beat handing over to the next — then
  never moves at all. Opening is never delayed; arrivals are what the room is for.
- Re-measure on: a `MutationObserver` over the board (`class`, `hidden`, childList,
  subtree), **a second observer on the hopper's `class`** (it lives outside the
  board, so the first observer never sees it), `transitionend`, and `resize`.
  Coalesce all of them through a single `requestAnimationFrame`.
- Height is the one layout property worth animating here: the point of the row is
  that everything below it moves up as it folds, which a transform cannot do.

## 7. Concurrency and teardown — wire these into this game's own system

- **One arrival at a time.** Hold the in-flight promise and return it if a second
  request comes in while a jump is running. Two overlapping arrivals read as the
  mascot flickering in twice.
- **Do not re-arrive if it is already there.** Skip if the in-board sprite has `.in`
  or the hopper is mid-flight.
- **Wait for a departure to land before the next arrival.** Keep the leave promise;
  if the mascot is still dropping out of sight when the next line asks for it,
  `await` that first — otherwise the jump in starts from a sprite that is halfway
  through leaving, and the line arrives with nobody beside it.
- **Sequence guard on leaving:** `const mine = ++leaveSeq` … `if (mine === leaveSeq)
  leaving = null`, so only the latest trip clears the flag.
- **Scene teardown / replay:** replace `finished()` with this game's cancellable
  version, and on teardown remove `.on` from the hopper, clear `.in`, remove inline
  transforms, and reset `inFlight = []`. A cancelled animation must never leave a
  fixed-position clone parked over the new scene.
- **Between scenes, prefer leaving the mascot where it is.** A rebuild that sent it
  behind the board every time reads as blinking. Send it away only at a real
  hand-over — the moment the board becomes the player's.

## 8. Optional: the other way off

When the mascot came down into the **middle** of the board and has nothing above it
to hide behind, do not use the hopper. Drop it clean off the bottom of the screen
with the in-board sprite alone — the page clips at the bottom edge, which is exactly
where it is going:

```js
const drop = window.innerHeight - r.top + 40;      /* clear of the bottom edge */
spot.classList.add('dropping');                    /* a z-index that clears any footer it falls past */
const a = spot.animate([
  { transform: 'none', easing: 'ease-in' },
  { transform: 'translateY(7%) scale(1.06, .92)',  offset: .2,  easing: 'cubic-bezier(.2, .6, .35, 1)' },
  { transform: 'translateY(-26%) scale(1)',        offset: .46, easing: 'cubic-bezier(.45, 0, .85, .5)' },
  { transform: 'translateY(' + drop + 'px)' }
], { duration: 860, fill: 'forwards' });
/* the class goes before the animation is let go, so the frame that stops filling
   the fall is the same frame the sprite stops being painted */
try { await finished(a); }
finally { spot.classList.remove('in', 'dropping'); a.cancel(); }
```

---

## 9. Done when

- The mascot is **never visible above the board's top edge before it jumps**: park
  the hopper at `hideTop` with `.on` and confirm in DevTools that nothing shows.
- Frame-stepping the arrival (DevTools, animation speed at 10%) shows **no frame
  with two mascots, and no frame with none**.
- The landing reads as weight, not as a scale glitch: it falls, compresses, settles.
- The exit is the arrival in reverse — crouch, spring, sink behind the edge, gone —
  with no fade anywhere in either.
- If section 6 is implemented: the row does not flinch during the flight, it folds
  once the mascot is gone and the line is cleared, and an immediate re-arrival never
  lets it close at all.
- Resizing the window mid-flight, or tearing the scene down mid-flight, leaves no
  fixed-position clone stranded on screen.

## 10. The numbers, if you want to tune the character

| value | what it controls |
|---|---|
| `b.top - m.height * 0.9 - 8` | the apex: how far clear of the board's edge the arc goes |
| `hideTop = b.top + 14` | how deep behind the edge it parks — enough to be covered, no more |
| rise 380ms, fall `min(760, 320 - drop * .5)` | the arrival's weight |
| crouch-and-spring 560ms, fall 360ms | the exit's weight; the exit rises slower than it falls |
| `scale(1.06, .92)` | the squash, on both the landing and the crouch |
