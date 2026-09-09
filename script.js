/* Spacecraft Mission Learning.
 *
 * Opening, once:
 *   0. Swiftee jumps up into the middle of the landscape, greets the learner
 *      from a speech bubble ("Hey there", then "Let's do a quick warm-up!"),
 *      and jumps away off the bottom of the screen; the board fades in, and
 *      Swiftee jumps up from behind it to its place beside the heading
 *   0b. each shape draws its own outline, then the colour pours in, and the
 *      heading types "Here are a few common shapes."
 *
 * Then every round runs the same beats:
 *   1. that round's slots fade up
 *   2. that round's chips fade up
 *   3. the prompt types itself out in step with the voice-over -- Swiftee
 *      talking along with it -- while a half-transparent chip demonstrates
 *      the drag; the screen is dead to input the whole time
 *   4. the voice-over ends, the prompt stays put, play begins; every drop is
 *      answered in the heading ("That's Correct" / "Try again")
 *   5. all three docked -> "Well Done!", confetti from the sky, then the next
 *      round
 *
 * Round 2 also coaches: one wrong drop labels the sides of every shape, a
 * second wrong drop concedes and flies the formulas into place itself.
 *
 *   Round 1  name the shape     Rectangle / Square / Triangle
 *   Round 2  area of the shape  Length x Breadth / (Side)^2 / 1/2(Base x Height)
 *
 * Section 2, the triangle lesson, once a Next button in the footer is pressed:
 *   1. Swiftee jumps back behind the board and the warm-up fades off it
 *   2. one triangle draws itself in the middle of the empty board
 *   3. Swiftee jumps back up: "A triangle can be of different types."
 *   4. the triangle slides left; a right-angled and an obtuse one join it
 *   5. "Let's observe their base and height." -- dotted base and height lines
 *      grow onto all three
 *   6. the area formula types itself out under them; as "Base" and then
 *      "Height" land, the matching lines on every triangle light up
 *   7. Next
 *
 * Section 3, the quadrilateral, once that Next is pressed:
 *   1. Swiftee jumps back behind the board and the lesson fades off it
 *   2. one quadrilateral draws itself in the middle of the empty board
 *   3. "This is a [ v ]" with a drop-down; Swiftee jumps in beside it, says
 *      "Tap here!", and answers each choice -- a wrong name is turned down
 *      with how many sides that shape has, the right one is cheered
 *   4. the sentence goes; Swiftee hops to the left: "This is a general
 *      quadrilateral." / "Let's try and find its area!"
 *   5. Swiftee hops up to the heading; four dots appear on the corners and
 *      "Join the corners to divide the quadrilateral into two parts." types
 *      while a finger traces the diagonal, left to right
 *   6. the learner draws it: "The quadrilateral is divided into two
 *      triangles."
 *   7. the shape slides left and the halves shade in two colours; each height
 *      drops in turn and its area line types out beside the shape, lighting
 *      what it names; the last line adds the two up
 *   8. Next -- then the same shape again, cut top to bottom: the learner
 *      draws that diagonal, and names the base and height of the green and
 *      then the purple triangle from drop-downs; the sum is written out
 *
 * Section 4: a different quadrilateral, with measurements. Its diagonal and
 * heights draw themselves; the learner picks each triangle's base and height
 * from the measurements, and the working (½ × 10 × 6 = 30 sq. cm ...) types
 * itself out, then the two are added.
 *
 * Section 5: the learner's own go. A third quadrilateral, already cut and
 * measured: the sum of the heights and the diagonal from drop-downs, then the
 * area itself.
 *
 * Between: the board goes, and Swiftee says from its speech bubble that the
 * special quadrilaterals are next.
 *
 * Section 6, the parallelogram (the first special quadrilateral):
 *   1. the board comes back and a parallelogram draws itself on it
 *   2. Swiftee jumps up to the heading: "What shape is this?" over two
 *      chips, Parallelogram and Trapezium; the wrong one steps back
 *   3. the top and bottom sides light up and are carried on past their
 *      corners -- they never meet -- and take arrow marks; the left and
 *      right do the same; Swiftee hops down beside the fact list:
 *      "Opposite sides are parallel to each other."
 *   4. a glowing copy of the top side travels down to lie exactly over the
 *      bottom, tick marks land on both; the left side onto the right;
 *      "Opposite sides are equal in length."
 *   5. Next
 */

(function () {
  'use strict';

  /* Every beat of the game is paced through here, which is what makes Skip
     possible: while a skip is running each wait collapses to a single turn of
     the event loop, so a scene plays its whole choreography out in a handful
     of frames and lands in exactly the state it would have reached anyway. */
  let fastForward = false;
  const wait = ms => new Promise(r => setTimeout(r, fastForward ? 0 : ms));
  const REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- pieces ---------- */
  const board       = document.getElementById('board');
  const prompt      = document.getElementById('prompt');
  const promptGhost = document.getElementById('promptGhost');
  const promptType  = document.getElementById('promptType');
  const promptTxt   = promptType.querySelector('.txt');
  const caret       = promptType.querySelector('.caret');
  const trayArea    = document.getElementById('trayArea');
  const fx          = document.getElementById('fx');
  const inputLock   = document.getElementById('inputLock');
  const tapStart    = document.getElementById('tapStart');

  const shapes   = Array.from(document.querySelectorAll('.shape'));
  const allSlots = Array.from(document.querySelectorAll('.slot'));
  const allChips = Array.from(document.querySelectorAll('.chip'));
  const trays    = { 1: document.getElementById('tray'), 2: document.getElementById('tray2') };

  const ROUNDS = {
    1: {
      text: 'Drag each block to the matching shape.',
      src:  'assets/audio/Drag each block to the matching shape.mp3'
    },
    2: {
      text: 'Drag each area to the matching shape.',
      src:  'assets/audio/Drag each area to the matching shape.mp3'
    }
  };
  const LAST_ROUND = 2;

  /* said once the three shapes have drawn, before round 1 opens */
  const SHAPES_READY = 'Here are a few common shapes.';

  /* section 2: Swiftee's two lines in the triangle lesson */
  const LESSON = {
    types: 'A triangle can be of different types.',
    dims:  'Let’s observe their base and height.'
  };

  /* The heading's ghost holds the longest line of the level from the first
     frame, so the heading -- and Swiftee standing beside it -- keeps one width
     and one place for the whole mission, lesson included. */
  promptGhost.textContent = Object.keys(ROUNDS)
    .map(n => ROUNDS[n].text)
    .concat(SHAPES_READY, LESSON.types, LESSON.dims)
    .reduce((a, b) => (b.length > a.length ? b : a), '');

  const slotsOf = n => allSlots.filter(s => s.dataset.round === String(n));
  const chipsOf = n => allChips.filter(c => c.dataset.round === String(n));

  /* Shuffle each deck so its left-to-right order never mirrors the shapes'. */
  [1, 2].forEach(n => {
    const deck = chipsOf(n);
    for (let i = deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    deck.forEach(c => trays[n].appendChild(c));
  });

  let round = 0;                 /* 0 until the first round opens */
  let roundSlots = [];
  let roundChips = [];
  let wrongInRound = 0;          /* drives round 2's two coaching steps */
  let autoScheduled = false;
  let roundDone = false;

  /* ---------- palette ----------
   * style.css is the only place a colour is written down, so anything the
   * script needs to paint is read back out of the custom properties rather
   * than repeated here. */
  const rootStyle = getComputedStyle(document.documentElement);
  const token = name => rootStyle.getPropertyValue(name).trim();

  const CONFETTI = [1, 2, 3, 4, 5, 6]
    .map(n => token('--confetti-' + n))
    .filter(Boolean);

  /* ---------- Swiftee ----------
   * One player driving the welcome cut-out, the intro's centre-stage bird, the
   * bird beside the board's heading and the hopper that stands in for it
   * behind the board; at most one is visible at a time, so they can share a
   * clock -- and the moment two swap (the top of the jump) they are painting
   * the very same frame.
   *
   * Every sheet is a uniform grid whose frames all pivot on the cell centre,
   * which is what lets one expression cut to another without the character
   * shifting. A frame is selected by background-position in percentages, so
   * the selection is exact at any rendered size: with background-size set to
   * cols x rows of the box, column i sits at i/(cols-1) of the width.
   *
   * Frame counts, grids and the start -> loop -> stop triads all come from
   * swiftee-sheets.js, generated from the pipeline's manifest. */
  const swiftee = (function () {
    const S = window.SWIFTEE;
    const nodes = ['mascot', 'welcomeMascot', 'introMascot', 'hopper',
                   'quizMascot', 'sideMascot', 'factMascot', 'flyer']
      .map(id => document.getElementById(id))
      .filter(Boolean);

    if (!S || !nodes.length) {
      /* no assets, no mascot -- never a blocked mission */
      return { play() {}, hold() {}, release() {}, show() {}, ms: () => 0, sheets: [] };
    }

    const FRAME_MS = 1000 / S.fps;
    const clipOf = name => S.clips[name];

    let program = [];    /* steps still to run: { clip, repeat } */
    let step = null;
    let frame = 0;
    let pass = 0;
    let accum = 0;
    let lastT = 0;

    function paint() {
      const d = clipOf(step.clip);
      const col = frame % d.cols;
      const row = (frame / d.cols) | 0;
      const px = d.cols > 1 ? (col / (d.cols - 1)) * 100 : 0;
      const py = d.rows > 1 ? (row / (d.rows - 1)) * 100 : 0;
      nodes.forEach(n => {
        n.style.setProperty('--sw-img', 'url("' + d.img + '")');
        n.style.setProperty('--sw-size', (d.cols * 100) + '% ' + (d.rows * 100) + '%');
        n.style.setProperty('--sw-pos', px + '% ' + py + '%');
      });
    }

    function advance() {
      step = program.shift() || null;
      frame = 0;
      pass = 0;
      if (step) paint();
    }

    function tick(t) {
      requestAnimationFrame(tick);
      if (!step) return;
      if (!lastT) lastT = t;
      let dt = t - lastT;
      lastT = t;
      /* a backgrounded tab hands back one enormous delta; spend one frame on
         it rather than fast-forwarding the whole animation */
      if (dt > 250) dt = FRAME_MS;
      accum += dt;

      while (step && accum >= FRAME_MS) {
        accum -= FRAME_MS;
        frame++;
        if (frame >= clipOf(step.clip).frames) {
          pass++;
          if (pass >= step.repeat) advance();
          else frame = 0;
        }
      }
      if (step) paint();
    }

    /* Play the full triad the animator drew: start once, loop `passes` times,
       stop once, then settle back to the idle blink. Cutting straight from one
       loop into another skips the transition and reads as a jerk. */
    function build(state, passes) {
      const st = S.states[state];
      const tail = { clip: S.idle, repeat: Infinity };
      if (!st) return [tail];

      const p = [];
      if (st.start) p.push({ clip: st.start, repeat: 1 });
      p.push({ clip: st.loop, repeat: passes });
      if (st.stop) p.push({ clip: st.stop, repeat: 1 });
      p.push(tail);
      return p;
    }

    /* how long a one-shot reaction takes, so a caller can wait it out */
    function ms(state, passes) {
      const st = S.states[state];
      if (!st) return 0;
      let f = st.start ? clipOf(st.start).frames : 0;
      f += clipOf(st.loop).frames * (passes === undefined ? 1 : passes);
      f += st.stop ? clipOf(st.stop).frames : 0;
      return f * FRAME_MS;
    }

    requestAnimationFrame(tick);
    program = build(null, 1);
    advance();

    return {
      /* a one-shot reaction that settles back to idle on its own */
      play(state, passes) {
        program = build(state, passes === undefined ? 1 : passes);
        accum = 0;
        advance();
      },
      /* an expression held open until release() -- used while a clip narrates */
      hold(state) {
        program = build(state, Infinity);
        accum = 0;
        advance();
      },
      /* let the held loop finish its current pass, then run its stop clip */
      release() {
        if (step && step.repeat === Infinity && step.clip !== S.idle) {
          step.repeat = pass + 1;
        }
      },
      show(on) {
        nodes.forEach(n => n.classList.toggle('show', !!on));
      },
      ms: ms,
      sheets: Object.keys(S.clips).map(k => S.clips[k].img)
    };
  })();

  /* ---------- audio ---------- */
  const SRC = {
    correct:  'assets/audio/correct-answer.ogg',
    wrong:    'assets/audio/incorrect-answer.ogg',
    confetti: 'assets/audio/confetti-sound.ogg',
    click:    'assets/audio/button-click.ogg'
  };

  const bank = {};
  Object.keys(SRC).forEach(key => {
    const a = new Audio(SRC[key]);
    a.preload = 'auto';
    bank[key] = a;
  });
  /* one dedicated element per briefing, so each keeps its own duration */
  Object.keys(ROUNDS).forEach(n => {
    const a = new Audio(ROUNDS[n].src);
    a.preload = 'auto';
    ROUNDS[n].audio = a;
  });

  /* Effects play off clones so overlapping hits never cut each other short. */
  function sfx(key, volume) {
    if (fastForward) return;         /* a skip races past; it does not chime */
    const src = bank[key];
    if (!src) return;
    try {
      const a = src.cloneNode();
      a.volume = volume === undefined ? 1 : volume;
      const p = a.play();
      if (p && p.catch) p.catch(() => {});
    } catch (e) { /* audio is a nicety, never a blocker */ }
  }

  /* Duration is needed to pace the typewriter. Resolves to 0 if the file
     cannot be read, and the caller falls back to a fixed pace. */
  function durationOf(a) {
    return new Promise(resolve => {
      if (a.readyState >= 1 && isFinite(a.duration) && a.duration > 0) {
        return resolve(a.duration);
      }
      let settled = false;
      const off = () => {
        a.removeEventListener('loadedmetadata', done);
        a.removeEventListener('error', fail);
      };
      const done = () => {
        if (settled) return;
        settled = true; off();
        resolve(isFinite(a.duration) && a.duration > 0 ? a.duration : 0);
      };
      const fail = () => {
        if (settled) return;
        settled = true; off();
        resolve(0);
      };
      a.addEventListener('loadedmetadata', done);
      a.addEventListener('error', fail);
      setTimeout(fail, 4000);
      try { a.load(); } catch (e) { fail(); }
    });
  }

  /* ---------- hold the layout still ----------
   * Nothing that appears or disappears may move the shapes, so every box that
   * could otherwise resize is pinned:
   *   - the prompt reserves its final width with a hidden ghost (HTML/CSS)
   *   - both rounds' slots exist from the first frame (HTML)
   *   - round 2's deck is laid over round 1's (CSS), and the console band keeps
   *     the height of a full row even after the last chip has been docked
   *   - Swiftee is out of the flow entirely (CSS)
   */
  function lockTrayHeight() {
    const home = allChips.filter(c => c.parentElement === trays[1] || c.parentElement === trays[2]);
    if (!home.length) return;                 /* nothing left to measure from */
    const cs = getComputedStyle(trayArea);
    const pad = parseFloat(cs.paddingTop) + parseFloat(cs.paddingBottom);
    const tall = home.reduce((m, c) => Math.max(m, c.getBoundingClientRect().height), 0);
    if (tall) trayArea.style.minHeight = (tall + pad) + 'px';
  }

  let resizeTimer = null;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(lockTrayHeight, 160);
  });

  /* ---------- input lock ---------- */
  let interactive = false;

  function lockInput(on) {
    interactive = !on;
    inputLock.classList.toggle('on', !!on);
  }
  lockInput(true);

  /* ---------- skip ----------
   * A scene is skipped by fast-forwarding it, never by abandoning it: waits
   * collapse, animations are finished frame by frame, the narration is left
   * unplayed and a round waiting on the learner is filled in. The scene
   * therefore runs its own choreography through to the end and hands over
   * exactly as it always does, so no scene needs a second, "instant" path --
   * and none of them can be left half-built by a skip.
   *
   * A skip stops at the scene's own boundary, so Skip reads as "take me to the
   * end of this bit" rather than "take me somewhere else": the learner is
   * handed the same Next button they would have reached by playing it.
   */
  const skipBtn = document.getElementById('skipBtn');

  /* Bumped when a scene opens and again when one reaches its hand-off. The
     scene in play is state rather than something read off a call stack: the
     chain is driven partly by the learner, since the drop that completes a
     round carries the game into the next scene by itself. */
  let sceneSeq = 0;
  let skipHideTimer = null;

  function showSkip(on) {
    clearTimeout(skipHideTimer);
    if (on) {
      skipBtn.hidden = false;
      void skipBtn.offsetHeight;
      skipBtn.classList.add('in');
      return;
    }
    skipBtn.classList.remove('in');
    skipHideTimer = setTimeout(function () { skipBtn.hidden = true; }, 340);
  }

  /* offered only while a scene is actually playing */
  function sceneStart() { sceneSeq++; showSkip(true); }
  function sceneEnd()   { sceneSeq++; showSkip(false); }

  /* Waits that hang on an event rather than a clock -- so far, a voice-over
     running to its end. A skip resolves them at once. */
  const skipWaiters = new Set();

  function waitOrSkip(register) {
    return new Promise(function (resolve) {
      const done = function () { skipWaiters.delete(done); resolve(); };
      skipWaiters.add(done);
      register(done);
    });
  }

  function releaseWaiters() {
    Array.from(skipWaiters).forEach(function (done) {
      try { done(); } catch (e) { /* already gone */ }
    });
  }

  /* Web Animations run off the clock, not through wait(), so they are finished
     every frame for as long as the skip lasts -- which also catches the ones a
     scene creates while it unwinds. Endless ones (the caret's blink, a
     button's pulse) are left alone: finish() throws on them. */
  function flushAnimations() {
    document.getAnimations().forEach(function (a) {
      const timing = a.effect && a.effect.getComputedTiming();
      if (!timing || timing.iterations === Infinity) return;
      try { a.finish(); } catch (e) { /* not finishable; leave it running */ }
    });
  }

  function stopVoice() {
    Object.keys(ROUNDS).forEach(function (n) {
      const a = ROUNDS[n].audio;
      try { a.pause(); a.currentTime = 0; } catch (e) { /* nothing to stop */ }
    });
  }

  /* A scene waiting on the learner for something other than a round -- a
     drop-down, the diagonal -- leaves a way to answer it here, and a skip
     runs them all. */
  const skipFills = new Set();

  /* A round waiting on the learner would stall a skip forever, so the answers
     go in for them -- no coaching, no confetti out of the cards, no chime. */
  const roundWaiting = function () {
    return interactive && round > 0 && !roundDone && roundSlots.length > 0;
  };

  function fillRound() {
    roundSlots.forEach(function (slot) {
      if (slot.classList.contains('filled')) return;
      const chip = roundChips.find(function (c) {
        return c.dataset.word === slot.dataset.accept && !c.disabled;
      });
      if (chip) dock(chip, slot, false);
    });
    if (roundSlots.every(function (s) { return s.classList.contains('filled'); })) {
      feedback(FEEDBACK.done);
      finishRound();
    }
  }

  async function skipScene() {
    if (fastForward) return;
    const from = sceneSeq;

    fastForward = true;
    skipBtn.disabled = true;
    stopVoice();

    /* Never spin forever: if a scene ends up waiting on something a skip
       cannot reach, hand the game back at normal speed rather than leaving it
       stuck in fast-forward. */
    const deadline = performance.now() + 8000;
    while (sceneSeq === from && performance.now() < deadline) {
      flushAnimations();
      releaseWaiters();
      if (roundWaiting()) fillRound();
      Array.from(skipFills).forEach(function (fill) { skipFills.delete(fill); fill(); });
      await new Promise(function (r) { requestAnimationFrame(r); });
    }
    flushAnimations();

    fastForward = false;
    skipBtn.disabled = false;
  }

  skipBtn.addEventListener('click', skipScene);

  /* ---------- opening: draw each shape, then pour the colour in ---------- */
  async function revealShape(shape) {
    const svg     = shape.querySelector('svg');
    const outline = shape.querySelector('.shape-outline');
    const fill    = shape.querySelector('.shape-fill');
    const wipe    = shape.querySelector('.wipe');

    let len = 4000;
    try { len = outline.getTotalLength() || len; } catch (e) { /* keep guard */ }
    outline.style.strokeDasharray = len;
    outline.style.strokeDashoffset = len;

    if (REDUCED) {
      outline.style.strokeDashoffset = 0;
      fill.style.opacity = 1;
      await wait(120);
      return;
    }

    await outline.animate(
      [{ strokeDashoffset: len }, { strokeDashoffset: 0 }],
      { duration: 760, easing: 'cubic-bezier(.5,0,.2,1)', fill: 'forwards' }
    ).finished;
    outline.style.strokeDashoffset = 0;

    /* the clip rect slides up from below the artwork, so the colour reads as
       rising into the outline rather than simply switching on */
    const h = (svg.viewBox && svg.viewBox.baseVal && svg.viewBox.baseVal.height) || 200;
    fill.style.opacity = 1;
    await wipe.animate(
      [{ transform: 'translateY(' + h + 'px)' }, { transform: 'translateY(0px)' }],
      { duration: 560, easing: 'cubic-bezier(.35,0,.25,1)', fill: 'forwards' }
    ).finished;
  }

  /* ---------- typewriter ----------
   * Paced against a wall clock rather than a chain of timeouts, so a slow
   * frame costs nothing: the line always lands on time. */
  async function typeInto(txt, blink, text, totalMs) {
    txt.textContent = '';
    blink.hidden = false;
    const step = totalMs / text.length;
    const t0 = performance.now();
    for (let i = 0; i < text.length; i++) {
      txt.textContent = text.slice(0, i + 1);
      const due = t0 + (i + 1) * step;
      const left = due - performance.now();
      if (left > 0) await wait(left);
    }
    blink.hidden = true;
  }
  const typewrite = (text, totalMs) => typeInto(promptTxt, caret, text, totalMs);

  /* ---------- feedback in the heading ----------
   * Swiftee's reaction to a drop, typed where the instruction was: a quick
   * "That's Correct" or "Try again", and "Well Done!" when the last block
   * lands. A drop that comes in while an earlier line is still typing takes
   * the heading over from it, and a new briefing does the same. */
  const FEEDBACK = {
    right: 'That’s Correct',
    wrong: 'Try again',
    done:  'Well Done!'
  };
  const FEEDBACK_MS = 45;            /* per character: snappier than a briefing */
  let feedbackGen = 0;

  async function feedback(text) {
    const gen = ++feedbackGen;
    promptTxt.textContent = '';
    caret.hidden = false;
    const t0 = performance.now();
    for (let i = 0; i < text.length; i++) {
      if (gen !== feedbackGen) return;               /* superseded */
      promptTxt.textContent = text.slice(0, i + 1);
      const left = t0 + (i + 1) * FEEDBACK_MS - performance.now();
      if (left > 0) await wait(left);
    }
    if (gen === feedbackGen) caret.hidden = true;
  }

  /* ---------- the ghost chip that demonstrates the drag ---------- */
  function demoDrag(signal) {
    const slot = roundSlots[0];
    const chip = roundChips.find(c => c.dataset.word === slot.dataset.accept);
    if (!chip) return Promise.resolve();

    async function pass() {
      const from = chip.getBoundingClientRect();
      const to   = slot.getBoundingClientRect();
      if (!from.width || !to.width) return;

      const ghost = chip.cloneNode(true);
      ghost.className = 'chip demo-ghost' + (chip.classList.contains('formula') ? ' formula' : '');
      ghost.disabled = true;
      Object.assign(ghost.style, {
        left: from.left + 'px',
        top: from.top + 'px',
        width: from.width + 'px',
        height: from.height + 'px',
        margin: '0'
      });
      fx.appendChild(ghost);

      const dx = (to.left + to.width / 2) - (from.left + from.width / 2);
      const dy = (to.top + to.height / 2) - (from.top + from.height / 2);

      const anim = ghost.animate([
        { transform: 'translate(0,0) scale(.96)', opacity: 0 },
        { transform: 'translate(0,0) scale(1.06)', opacity: .55, offset: .14 },
        { transform: 'translate(' + dx + 'px,' + dy + 'px) scale(1)', opacity: .55, offset: .74 },
        { transform: 'translate(' + dx + 'px,' + dy + 'px) scale(1)', opacity: .55, offset: .88 },
        { transform: 'translate(' + dx + 'px,' + dy + 'px) scale(.96)', opacity: 0 }
      ], { duration: 2100, easing: 'cubic-bezier(.35,.05,.25,1)' });

      signal.anim = anim;
      const glow = setTimeout(() => slot.classList.add('over'), 1450);

      try { await anim.finished; } catch (e) { /* cancelled */ }
      clearTimeout(glow);
      if (!slot.classList.contains('filled')) slot.classList.remove('over');
      ghost.remove();
      signal.anim = null;
    }

    return (async () => {
      /* let a beat of the voice-over land before the hand moves */
      await wait(450);
      while (!signal.done) {
        await pass();
        if (signal.done) break;
        await wait(420);
      }
    })();
  }

  /* ---------- briefing ----------
   * The prompt is the board's heading and it is never taken away: it is wiped
   * back to empty, typed out again for the new round, and then left alone. */
  async function briefing(spec) {
    const vo = spec.audio;

    feedbackGen++;                  /* a feedback line still typing stops here */
    promptTxt.textContent = '';
    caret.hidden = true;
    prompt.classList.add('show');
    await wait(320);

    let length = await durationOf(vo);
    let playing = false;

    /* A skip leaves the clip unplayed rather than starting it only to cut it
       off a frame later. `playing` stays false, so the typewriter falls back to
       its fixed pace -- which a collapsed wait() makes instant anyway. */
    if (!fastForward) {
      try {
        vo.currentTime = 0;
        await vo.play();
        playing = true;
      } catch (e) {
        /* the browser blocked autoplay -- ask for the one gesture it wants */
        tapStart.hidden = false;
        await new Promise(res =>
          tapStart.querySelector('.tap-start-btn').addEventListener('click', res, { once: true })
        );
        tapStart.hidden = true;
        try { await vo.play(); playing = true; } catch (e2) { /* give up on sound */ }
        if (!length) length = await durationOf(vo);
      }
    }

    /* Swiftee talks along with the narrator and stops when it does */
    swiftee.hold('talking');

    /* Type across ~82% of the clip so the last character lands a moment
       before the narrator finishes the sentence. */
    const typeMs = (playing && length > 0.5) ? length * 1000 * 0.82 : 2400;

    const signal = { done: false, anim: null };
    const demo = demoDrag(signal);

    await typewrite(spec.text, typeMs);

    if (playing && !vo.ended) {
      await waitOrSkip(function (done) {
        const end = function () { vo.removeEventListener('ended', end); done(); };
        vo.addEventListener('ended', end);
        setTimeout(end, 12000);           /* never hang on a stalled clip */
      });
    }

    swiftee.release();

    signal.done = true;
    if (signal.anim) { try { signal.anim.finish(); } catch (e) {} }
    await demo;
  }

  /* ---------- a round ---------- */
  async function startRound(n) {
    lockInput(true);
    round = n;
    roundSlots = slotsOf(n);
    roundChips = chipsOf(n);
    wrongInRound = 0;
    autoScheduled = false;
    roundDone = false;

    /* only the deck in play takes pointer events */
    Object.keys(trays).forEach(k => trays[k].classList.toggle('live', Number(k) === n));

    roundSlots.forEach((s, i) => setTimeout(() => s.classList.add('reveal'), i * 170));
    await wait(roundSlots.length * 170 + 380);

    roundChips.forEach((c, i) => setTimeout(() => c.classList.add('reveal'), i * 170));
    await wait(roundChips.length * 170 + 380);

    await briefing(ROUNDS[n]);

    lockInput(false);
  }

  async function finishRound() {
    if (roundDone) return;      /* a hand-placed last answer can race autoSolve */
    roundDone = true;
    lockInput(true);

    const last = round === LAST_ROUND;

    board.classList.add('cheer');
    setTimeout(() => board.classList.remove('cheer'), 1200);

    /* proud closes the mission out; a mid-game round gets the shorter cheer */
    swiftee.play(last ? 'proud' : 'celebrating', 1);

    /* the round is closed out by confetti falling across the whole screen,
       not by another volley out of the slots that were just filled */
    skyConfetti(last ? 150 : 100, last ? 3800 : 2900);
    sfx('confetti', .85);

    await wait(last ? 2200 : 1700);

    if (!last) return startRound(round + 1);

    /* the warm-up is over: hand the learner the Next button, then the lesson */
    await showNext();
    await sectionTwo();
  }

  /* ---------- round 2 coaching ---------- */

  /* first wrong drop: name the sides of every shape */
  function showLabels() {
    shapes.forEach((s, i) => setTimeout(() => s.classList.add('labelled'), i * 130));
  }

  /* second wrong drop: stop asking, and fly each formula home */
  async function autoSolve() {
    if (roundDone) return;
    lockInput(true);
    unpick();
    showLabels();
    await wait(300);

    for (const slot of roundSlots) {
      if (slot.classList.contains('filled')) continue;
      const chip = roundChips.find(c => c.dataset.word === slot.dataset.accept && !c.disabled);
      if (!chip) continue;
      await flyIntoSlot(chip, slot);
      await wait(200);
    }

    await wait(340);
    finishRound();
  }

  /* the chip lifts out of the console and settles into the slot, growing or
     shrinking into the slot's exact box on the way */
  function flyIntoSlot(chip, slot) {
    return new Promise(resolve => {
      const from = chip.getBoundingClientRect();
      const to   = slot.getBoundingClientRect();
      if (!from.width || !to.width || REDUCED) {
        dock(chip, slot, false);
        return resolve();
      }

      const ghost = chip.cloneNode(true);
      ghost.className = 'chip ghost' + (chip.classList.contains('formula') ? ' formula' : '');
      ghost.disabled = true;
      Object.assign(ghost.style, {
        position: 'fixed',
        left: from.left + 'px',
        top: from.top + 'px',
        width: from.width + 'px',
        height: from.height + 'px',
        margin: 0,
        pointerEvents: 'none',
        zIndex: 960,
        transformOrigin: 'top left'
      });
      fx.appendChild(ghost);
      chip.style.visibility = 'hidden';

      const dx = to.left - from.left;
      const dy = to.top - from.top;
      const sx = to.width / from.width;
      const sy = to.height / from.height;

      slot.classList.add('over');
      const a = ghost.animate([
        { transform: 'translate(0px,0px) scale(1,1)' },
        { transform: 'translate(' + (dx * .5) + 'px,' + (dy * .5 - 30) + 'px) scale(' +
                     ((1 + sx) / 2) + ',' + ((1 + sy) / 2) + ')', offset: .55 },
        { transform: 'translate(' + dx + 'px,' + dy + 'px) scale(' + sx + ',' + sy + ')' }
      ], { duration: 780, easing: 'cubic-bezier(.35,.05,.25,1)', fill: 'forwards' });

      const land = () => {
        ghost.remove();
        slot.classList.remove('over');
        dock(chip, slot, false);
        resolve();
      };
      a.onfinish = land;
      a.oncancel = land;
    });
  }

  /* ---------- confetti ---------- */
  function confettiPiece() {
    if (!CONFETTI.length) return null;         /* no palette, no paint */
    const p = document.createElement('i');
    const w = 7 + Math.random() * 8;
    const h = 10 + Math.random() * 12;
    p.style.width  = w + 'px';
    p.style.height = h + 'px';
    p.style.background = CONFETTI[(Math.random() * CONFETTI.length) | 0];
    return p;
  }

  /* How a round is closed out: confetti rains down the whole screen rather
     than firing out of the slots that were just filled. */
  function skyConfetti(count, span) {
    if (REDUCED) return;
    const W = window.innerWidth;
    const H = window.innerHeight;

    for (let i = 0; i < count; i++) {
      const p = confettiPiece();
      if (!p) return;
      p.style.left = (Math.random() * W) + 'px';
      p.style.top = '0px';
      fx.appendChild(p);

      const from = -50 - Math.random() * 320;      /* staggered above the fold */
      const to   = H + 80;
      const sway = Math.random() * 170 - 85;       /* sideways drift as it falls */
      const spin = (Math.random() * 1440 - 720) | 0;
      const life = span * (0.66 + Math.random() * 0.5);
      const delay = Math.random() * span * 0.42;

      const step = (t, x, r) =>
        ({ transform: 'translate(' + x + 'px,' + (from + (to - from) * t) + 'px) rotate(' + r + 'deg)' });

      const a = p.animate([
        step(0, 0, 0),
        step(.33, sway * .65, spin * .33),
        step(.66, sway * -.35, spin * .66),
        step(1, sway, spin)
      ], { duration: life, delay: delay, easing: 'linear', fill: 'backwards' });

      a.onfinish = () => p.remove();
      a.oncancel = () => p.remove();
    }
  }

  function burst(el) {
    if (REDUCED) return;
    const r = el.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;

    for (let i = 0; i < 34; i++) {
      const p = confettiPiece();
      if (!p) return;
      p.style.left = (cx - parseFloat(p.style.width) / 2) + 'px';
      p.style.top  = (cy - parseFloat(p.style.height) / 2) + 'px';
      fx.appendChild(p);

      const angle = (Math.random() * Math.PI * 2);
      const dist  = 70 + Math.random() * 190;
      const dx    = Math.cos(angle) * dist;
      const up    = Math.sin(angle) * dist - 90;      /* biased upward */
      const drop  = up + 150 + Math.random() * 190;   /* then gravity wins */
      const spin  = (Math.random() * 900 - 450) | 0;
      const life  = 900 + Math.random() * 600;

      const a = p.animate([
        { transform: 'translate(0,0) rotate(0deg) scale(1)', opacity: 1 },
        { transform: 'translate(' + dx * 0.85 + 'px,' + up + 'px) rotate(' + spin * 0.6 + 'deg) scale(1)',
          opacity: 1, offset: .55 },
        { transform: 'translate(' + dx + 'px,' + drop + 'px) rotate(' + spin + 'deg) scale(.85)',
          opacity: 0 }
      ], { duration: life, easing: 'cubic-bezier(.15,.6,.35,1)' });

      a.onfinish = () => p.remove();
      a.oncancel = () => p.remove();
    }
  }

  /* ---------- drag / drop plumbing ---------- */
  let drag = null;      // { el, ghost, offsetX, offsetY }
  let picked = null;    // click / keyboard selection

  /* only the round in play can be dropped on */
  function slotUnder(x, y) {
    return roundSlots.find(slot => {
      const r = slot.getBoundingClientRect();
      return x >= r.left && x <= r.right && y >= r.top && y <= r.bottom;
    }) || null;
  }

  const clearOver = () => roundSlots.forEach(s => s.classList.remove('over'));

  function unpick() {
    if (picked) picked.classList.remove('picked');
    picked = null;
  }

  /* seat a chip in its slot; `earned` is false when the game placed it itself */
  function dock(chip, slot, earned) {
    slot.appendChild(chip);
    slot.classList.add('filled');
    chip.classList.remove('picked', 'dragging');
    chip.style.visibility = '';
    chip.disabled = true;
    slot.closest('.cell').classList.add('docked');

    slot.classList.add('correct');
    setTimeout(() => slot.classList.remove('correct'), 520);

    sfx('correct', earned ? 1 : .55);
    if (earned) {
      swiftee.play('happy', 1);
      sfx('confetti', .55);
      requestAnimationFrame(() => burst(chip));
    }
  }

  function place(chip, slot) {
    if (!interactive) return false;
    if (chip.dataset.round !== slot.dataset.round) return false;
    if (slot.classList.contains('filled')) return false;

    /* ---- wrong block: red shake + buzzer, the chip stays in the tray ---- */
    if (slot.dataset.accept !== chip.dataset.word) {
      sfx('wrong');
      feedback(FEEDBACK.wrong);
      slot.classList.add('reject');
      chip.classList.add('reject');
      setTimeout(() => {
        slot.classList.remove('reject');
        chip.classList.remove('reject');
      }, 430);

      /* Round 2 escalates: name the sides once, then take over. */
      wrongInRound++;
      /* encouraging, never punishing: puzzled once the learner is stuck */
      swiftee.play(wrongInRound >= 2 ? 'puzzleing' : 'confused', 1);

      if (round === LAST_ROUND) {
        if (wrongInRound === 1) {
          setTimeout(showLabels, 500);
        } else if (wrongInRound >= 2 && !autoScheduled) {
          autoScheduled = true;
          setTimeout(autoSolve, 700);
        }
      }
      return false;
    }

    /* ---- right block: dock it, chime, confetti out of the chip ---- */
    dock(chip, slot, true);

    const done = roundSlots.every(s => s.classList.contains('filled'));
    feedback(done ? FEEDBACK.done : FEEDBACK.right);
    if (done) setTimeout(finishRound, 420);
    return true;
  }

  /* ---------- pointer drag (mouse, pen and touch alike) ---------- */
  allChips.forEach(chip => chip.addEventListener('pointerdown', onDown));

  function onDown(e) {
    if (!interactive) return;
    const chip = e.currentTarget;
    if (chip.disabled || chip.dataset.round !== String(round)) return;
    if (e.button !== undefined && e.button !== 0) return;

    const rect = chip.getBoundingClientRect();
    const ghost = chip.cloneNode(true);
    ghost.classList.add('ghost');
    Object.assign(ghost.style, {
      position: 'fixed',
      left: rect.left + 'px',
      top: rect.top + 'px',
      width: rect.width + 'px',
      height: rect.height + 'px',
      margin: 0,
      pointerEvents: 'none',
      zIndex: 999,
      transform: 'scale(1.05)'
    });
    document.body.appendChild(ghost);
    chip.classList.add('dragging');
    unpick();
    sfx('click', .5);

    drag = { el: chip, ghost, offsetX: e.clientX - rect.left, offsetY: e.clientY - rect.top };

    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
    window.addEventListener('pointercancel', onUp);
    e.preventDefault();
  }

  function onMove(e) {
    if (!drag) return;
    drag.ghost.style.left = (e.clientX - drag.offsetX) + 'px';
    drag.ghost.style.top = (e.clientY - drag.offsetY) + 'px';

    clearOver();
    const slot = slotUnder(e.clientX, e.clientY);
    if (slot && !slot.classList.contains('filled')) slot.classList.add('over');
  }

  function onUp(e) {
    if (!drag) return;
    window.removeEventListener('pointermove', onMove);
    window.removeEventListener('pointerup', onUp);
    window.removeEventListener('pointercancel', onUp);

    const { el, ghost } = drag;
    drag = null;
    ghost.remove();
    el.classList.remove('dragging');
    clearOver();

    const slot = slotUnder(e.clientX, e.clientY);
    if (slot) place(el, slot);
  }

  /* ---------- click / keyboard: pick a word, then choose a slot ---------- */
  allChips.forEach(chip => {
    chip.addEventListener('click', e => {
      if (!interactive || chip.disabled || chip.dataset.round !== String(round)) return;
      e.preventDefault();
      const wasPicked = picked === chip;
      unpick();
      if (!wasPicked) {
        picked = chip;
        chip.classList.add('picked');
        sfx('click', .5);
      }
    });
  });

  allSlots.forEach(slot => {
    slot.addEventListener('click', () => {
      if (!interactive || !picked) return;
      const chip = picked;
      unpick();
      place(chip, slot);
    });
  });

  document.addEventListener('keydown', e => {
    if (!interactive) return;
    if (e.key === 'Escape') return unpick();
    if (!picked) return;
    const idx = ['1', '2', '3'].indexOf(e.key);
    if (idx === -1) return;
    const chip = picked;
    unpick();
    place(chip, roundSlots[idx]);
  });

  /* ---------- welcome screen ---------- */
  /* It covers the preload, and the tap on its button is the gesture the
     browser wants before it will let any of the voice-overs play. */
  const welcome   = document.getElementById('welcome');
  const loaderBox = document.getElementById('loader');
  const loadTrack = document.getElementById('loadTrack');
  const loadFill  = document.getElementById('loadFill');
  const loadPct   = document.getElementById('loadPct');
  const startBtn  = document.getElementById('startBtn');

  const ART = ['assets/image/bg.png', 'assets/image/board.png'];
  const MIN_LOAD_MS = 1600;      /* the bar is never allowed to blink past */

  /* Every clip and sheet is fetched up front so the first briefing does not
     stall halfway through, and so Swiftee's first expression change is not a
     blank frame. A file that will not load resolves anyway: a missing asset is
     a nicety lost, never a blocked mission. */
  function preloadAudio(a) {
    return new Promise(resolve => {
      if (a.readyState >= 3) return resolve();
      let settled = false;
      const done = () => {
        if (settled) return;
        settled = true;
        a.removeEventListener('canplaythrough', done);
        a.removeEventListener('error', done);
        resolve();
      };
      a.addEventListener('canplaythrough', done);
      a.addEventListener('error', done);
      setTimeout(done, 8000);
      /* The element started fetching the moment it was built with
         preload="auto". Calling load() now would abort that request and open a
         second one for the same file, so it is only used to kick off an
         element that has nothing in flight. */
      if (a.networkState === a.NETWORK_EMPTY) {
        try { a.load(); } catch (e) { done(); }
      }
    });
  }

  function preloadImage(src) {
    return new Promise(resolve => {
      const img = new Image();
      img.onload = img.onerror = () => resolve();
      img.src = src;
      setTimeout(resolve, 8000);
    });
  }

  function setProgress(v) {
    const pct = Math.max(0, Math.min(100, v));
    loadFill.style.width = pct + '%';
    loadPct.textContent = Math.round(pct) + '%';
    loadTrack.setAttribute('aria-valuenow', String(Math.round(pct)));
  }

  /* Three things steer the bar, and the smallest of them wins:
       - the real tally of finished jobs
       - a slow creep, so a clip that is slow to report never freezes the bar
       - the clock, so a warm cache still walks the width instead of
         flashing 100% for a single frame
     Only the tally can carry it the last stretch to 100. */
  function runLoader() {
    const jobs = ART.concat(swiftee.sheets).map(preloadImage)
      .concat(Object.keys(bank).map(k => preloadAudio(bank[k])))
      .concat(Object.keys(ROUNDS).map(n => preloadAudio(ROUNDS[n].audio)));
    if (document.fonts && document.fonts.ready) {
      jobs.push(document.fonts.ready.catch(() => {}));
    }

    let loaded = 0;
    let finished = false;
    jobs.forEach(p => p.then(() => { loaded++; }));
    Promise.all(jobs).then(() => { finished = true; });

    const t0 = performance.now();

    return new Promise(resolve => {
      let shown = 0;
      (function tick() {
        const elapsed = performance.now() - t0;
        const tally = loaded / jobs.length;
        const creep = Math.min(.92, elapsed / 6000);
        const target = Math.min(Math.max(tally, creep), elapsed / MIN_LOAD_MS) * 100;
        shown += (target - shown) * 0.12;
        if (finished && elapsed >= MIN_LOAD_MS && shown > 99.3) shown = 100;
        setProgress(shown);
        if (shown >= 100) return resolve();
        requestAnimationFrame(tick);
      })();
    });
  }

  async function welcomeScreen() {
    await runLoader();
    await wait(280);

    /* the button takes the loader's own grid cell, so nothing shifts */
    loaderBox.classList.add('out');
    startBtn.hidden = false;
    void startBtn.offsetHeight;
    startBtn.classList.add('in');
    startBtn.focus({ preventScroll: true });

    /* Swiftee waves the learner in once the sheets are actually decoded */
    swiftee.show(true);
    swiftee.play('waving', 2);

    await new Promise(res =>
      startBtn.addEventListener('click', res, { once: true })
    );
    sfx('click', .6);

    /* the cover fades while Swiftee is already hopping in behind it */
    welcome.classList.add('off');
    setTimeout(() => { welcome.hidden = true; }, 620);
  }

  /* ---------- intro: Swiftee's greeting ----------
   * Swiftee jumps up into the middle of the landscape, waves, and
   * says two lines from a speech bubble, each typed out. Then the bubble pops
   * away, the bird jumps off the bottom of the screen, the board fades up, and
   * the bird jumps back in from behind the board to its place to the left of
   * the heading. */
  const intro       = document.getElementById('intro');
  const introMascot = document.getElementById('introMascot');
  const bubble      = document.getElementById('bubble');
  const bubbleGhost = document.getElementById('bubbleGhost');
  const bubbleType  = document.getElementById('bubbleType');
  const bubbleTxt   = bubbleType.querySelector('.txt');
  const bubbleCaret = bubbleType.querySelector('.caret');
  const boardMascot = document.getElementById('mascot');
  const hopper      = document.getElementById('hopper');

  const GREETING = ['Hey there', 'Let’s do a quick warm-up!'];
  const TYPE_MS  = 72;              /* per character, no voice-over to pace against */

  /* one jump straight up into the middle of the screen: Swiftee springs up
     from below the ground line, hangs for a beat, and lands where it stands */
  function hopIn() {
    if (REDUCED) {
      introMascot.style.transform = 'none';
      return wait(120);
    }
    const kf = [
      { transform: 'translate(0, 60%) scale(.9)',   opacity: 0,  offset: 0,   easing: 'cubic-bezier(.2, .7, .3, 1)' },
      { transform: 'translate(0, -12%) scale(1.04)', opacity: 1, offset: .5,  easing: 'cubic-bezier(.5, 0, .8, .4)' },
      { transform: 'translate(0, 0) scale(.97, 1.03)', opacity: 1, offset: .78, easing: 'ease-out' },
      { transform: 'translate(0, 0) scale(1)',      opacity: 1,  offset: 1 }
    ];
    const a = introMascot.animate(kf, { duration: 820, fill: 'forwards' });
    return a.finished.then(() => {
      /* bake the resting pose into the element so the next animation starts
         from a clean transform instead of stacking on this one */
      try { a.commitStyles(); } catch (e) {
        introMascot.style.transform = 'translate(0px, 0px)';
        introMascot.style.opacity = '1';
      }
      a.cancel();
    });
  }

  /* Type one line into the bubble. The bubble is sized to the whole line
     before the first character lands (the ghost holds the width), and when a
     line replaces a longer or shorter one the box glides between the two
     widths rather than snapping. */
  async function say(text) {
    bubbleTxt.textContent = '';
    bubbleCaret.hidden = true;

    const shown = bubble.classList.contains('show');
    const r0 = bubble.getBoundingClientRect();
    bubble.style.width = '';
    bubble.style.height = '';
    bubble.style.left = '';
    bubbleGhost.textContent = text;

    /* before its pop-in the box sits scaled down to a dot, so it is measured
       with the scale lifted for the instant of the measurement */
    const measure = () => {
      if (shown) return bubble.getBoundingClientRect();
      bubble.style.transition = 'none';
      bubble.style.transform = 'none';
      const r = bubble.getBoundingClientRect();
      bubble.style.transform = '';
      void bubble.offsetWidth;
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

    /* the box is only measured true once it is shown (before that it is
       scaled down to its pop-in size), so a resize is only ever a second line */
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

    if (!bubble.classList.contains('show')) {
      bubble.classList.add('show');
      sfx('click', .35);
      await wait(REDUCED ? 200 : 460);
    }

    await typeInto(bubbleTxt, bubbleCaret, text, text.length * TYPE_MS);
  }

  /* Swiftee leaves centre stage: a crouch, a spring, and a drop straight out
     of the bottom of the frame. */
  async function introExit() {
    const r = introMascot.getBoundingClientRect();
    if (!r.width || REDUCED) return;
    const drop = window.innerHeight - r.top + 40;      /* clear of the bottom edge */

    const a = introMascot.animate([
      { transform: 'translate(0, 0)', easing: 'ease-in' },
      { transform: 'translate(0, 5%) scale(1.06, .92)', offset: .2, easing: 'cubic-bezier(.2, .6, .35, 1)' },
      { transform: 'translate(0, -30%) scale(1)', offset: .52, easing: 'cubic-bezier(.45, 0, .85, .5)' },
      { transform: 'translate(0, ' + drop + 'px) scale(1)' }
    ], { duration: 980, fill: 'forwards' });
    try { await a.finished; } catch (e) { /* cancelled */ }
  }

  async function showBoard() {
    if (board.classList.contains('show')) return;
    board.classList.add('show');
    if (REDUCED) return wait(500);
    const a = board.animate([
      { transform: 'translateY(26px) scale(.955)', opacity: 0 },
      { transform: 'none', opacity: 1 }
    ], { duration: 640, easing: 'cubic-bezier(.2, .9, .3, 1.15)' });
    try { await a.finished; } catch (e) { /* cancelled */ }
  }

  /* Swiftee arrives on the board by jumping up from behind it and dropping
     onto its spot to the left of the heading.
     Two sprites share the jump: the hopper, painted under the board, does the
     rising half that starts hidden behind the board's top edge, and the
     in-board sprite does the falling half over it. They swap at the top of the
     arc, where both are fully clear of the board, and since one player paints
     both, the cut is invisible. */
  async function mascotJumpIn(target) {
    const spot = target || boardMascot;         /* the heading's, unless told otherwise */
    const m = spot.getBoundingClientRect();
    const b = board.getBoundingClientRect();
    if (!m.width || REDUCED) { spot.classList.add('in'); return; }

    const apexTop = b.top - m.height * .9 - 8;         /* the whole bird above the edge */
    const hideTop = b.top + 14;                        /* tucked just under it, covered */

    /* up from behind the board to the apex... */
    Object.assign(hopper.style, {
      left: m.left + 'px', top: hideTop + 'px', width: m.width + 'px', height: m.height + 'px'
    });
    hopper.classList.add('on');
    const rise = hopper.animate(
      [{ transform: 'translateY(0)' }, { transform: 'translateY(' + (apexTop - hideTop) + 'px)' }],
      { duration: 380, easing: 'cubic-bezier(.2, .6, .35, 1)', fill: 'forwards' }
    );
    try { await rise.finished; } catch (e) {}

    /* ...hand over, and drop onto the spot with a little squash */
    spot.classList.add('in');
    hopper.classList.remove('on');
    rise.cancel();
    const fall = spot.animate([
      { transform: 'translateY(' + (apexTop - m.top) + 'px)', easing: 'cubic-bezier(.45, 0, .85, .5)' },
      { transform: 'translateY(0) scale(1.06, .92)', offset: .8, easing: 'ease-out' },
      { transform: 'none' }
    ], { duration: Math.min(760, 320 + (m.top - apexTop) * .5) });   /* longer drop, longer fall */
    try { await fall.finished; } catch (e) {}
  }

  /* The way back: the in-board sprite crouches and springs up to the apex
     over the board, hands over to the hopper there, and the hopper drops
     behind the board's top edge. Same two sprites, same swap point, same
     shared clock as the jump in, so the cut is just as invisible. */
  async function mascotJumpOut(source) {
    const spot = source || boardMascot;
    const m = spot.getBoundingClientRect();
    const b = board.getBoundingClientRect();
    if (!m.width || REDUCED) { spot.classList.remove('in'); return; }

    const apexTop = b.top - m.height * .9 - 8;
    const hideTop = b.top + 14;

    const rise = spot.animate([
      { transform: 'none', easing: 'ease-in' },
      { transform: 'translateY(6%) scale(1.06, .92)', offset: .24, easing: 'cubic-bezier(.2, .6, .35, 1)' },
      { transform: 'translateY(' + (apexTop - m.top) + 'px)' }
    ], { duration: 560, fill: 'forwards' });
    try { await rise.finished; } catch (e) {}

    Object.assign(hopper.style, {
      left: m.left + 'px', top: apexTop + 'px', width: m.width + 'px', height: m.height + 'px'
    });
    hopper.classList.add('on');
    spot.classList.remove('in');
    rise.cancel();
    const fall = hopper.animate(
      [{ transform: 'translateY(0)' }, { transform: 'translateY(' + (hideTop - apexTop) + 'px)' }],
      { duration: 360, easing: 'cubic-bezier(.45, 0, .85, .5)', fill: 'forwards' }
    );
    try { await fall.finished; } catch (e) {}
    hopper.classList.remove('on');
    fall.cancel();
  }

  /* ---------- next button ----------
   * Pops up in the middle of the footer band and resolves on the click. The
   * pointer lock is lifted only while it is showing; by then every card of the
   * warm-up is docked and disabled, so nothing else can be touched. */
  const nextBtn = document.getElementById('nextBtn');

  const nextBtnFree = document.getElementById('nextBtnFree');

  /* the board's Next unless told otherwise; a scene with no board on screen
     passes the viewport-anchored one */
  function showNext(which) {
    const b = which || nextBtn;
    /* the scene is over: a skip in flight stops here, and Skip stands down
       until the next scene opens */
    sceneEnd();
    return new Promise(resolve => {
      b.hidden = false;
      void b.offsetHeight;
      b.classList.add('in');
      lockInput(false);
      b.focus({ preventScroll: true });

      b.addEventListener('click', () => {
        sfx('click', .6);
        lockInput(true);
        b.classList.remove('in');
        b.classList.add('out');
        setTimeout(() => {
          b.hidden = true;
          b.classList.remove('out');
        }, 320);
        resolve();
      }, { once: true });
    });
  }

  /* ---------- section 2: the triangle lesson ---------- */
  const lesson       = document.getElementById('lesson');
  const triRow       = document.getElementById('triRow');
  const tris         = Array.from(lesson.querySelectorAll('.tri'));
  const formulaBox   = document.getElementById('formulaBox');
  const formulaGhost = document.getElementById('formulaGhost');
  const formulaType  = document.getElementById('formulaType');
  const formulaTxt   = formulaType.querySelector('.txt');
  const formulaCaret = formulaType.querySelector('.caret');

  /* The formula in pieces: the two words the lesson is about are their own
     spans, so each can light up the moment it has finished typing. */
  const FORMULA = [
    { t: 'Area = 1/2(' },
    { t: 'Base',   w: 'base' },
    { t: ' × ' },
    { t: 'Height', w: 'height' },
    { t: ')' }
  ];
  const FORMULA_MS    = 110;      /* per character: slower than a briefing, on purpose */
  const FORMULA_PAUSE = 720;      /* a beat after each key word, for the highlight to land */

  function formulaSpans(root) {
    root.textContent = '';
    return FORMULA.map(seg => {
      const el = document.createElement('span');
      if (seg.w) el.className = 'w w-' + seg.w;
      root.appendChild(el);
      return el;
    });
  }
  /* the ghost carries the whole formula from the start, so the box is sized
     before the first character lands */
  formulaSpans(formulaGhost).forEach((el, i) => { el.textContent = FORMULA[i].t; });

  /* The first triangle is drawn in the middle of the empty board, so before
     it draws it is carried from its own cell to the centre of the row... */
  function parkCentre(tri) {
    const row  = triRow.getBoundingClientRect();
    const cell = tri.parentElement.getBoundingClientRect();
    if (!row.width || !cell.width) return;
    const dx = (row.left + row.width / 2) - (cell.left + cell.width / 2);
    tri.style.transform = 'translateX(' + dx + 'px)';
  }

  /* ...and slides home once Swiftee has introduced it. The inline transform
     is cleared in the same task the animation starts, so there is no frame
     in which the triangle sits at either end unanimated. */
  async function slideHome(tri) {
    const from = tri.style.transform;
    tri.style.transform = '';
    if (!from || REDUCED) return wait(120);
    const a = tri.animate(
      [{ transform: from }, { transform: 'none' }],
      { duration: 760, easing: 'cubic-bezier(.4, 0, .2, 1)' }
    );
    try { await a.finished; } catch (e) {}
  }

  /* Grow a dotted line out from its first point. The dash pattern is anchored
     at (x1, y1), so moving the far end reveals the dots one by one instead of
     scrolling them; a dash-offset draw would not work on a dotted stroke. */
  function growLine(line, ms) {
    if (!line) return Promise.resolve();
    const x1 = +line.getAttribute('x1'), y1 = +line.getAttribute('y1');
    const X2 = +(line.dataset.x2 || (line.dataset.x2 = line.getAttribute('x2')));
    const Y2 = +(line.dataset.y2 || (line.dataset.y2 = line.getAttribute('y2')));

    if (REDUCED) {
      line.setAttribute('x2', X2); line.setAttribute('y2', Y2);
      line.style.opacity = 1;
      return wait(80);
    }

    line.setAttribute('x2', x1); line.setAttribute('y2', y1);
    line.style.opacity = 1;
    return new Promise(resolve => {
      const t0 = performance.now();
      (function step(t) {
        const p = fastForward ? 1 : Math.min(1, (t - t0) / ms);
        const e = 1 - Math.pow(1 - p, 3);                 /* ease-out cubic */
        line.setAttribute('x2', x1 + (X2 - x1) * e);
        line.setAttribute('y2', y1 + (Y2 - y1) * e);
        if (p < 1) requestAnimationFrame(step);
        else resolve();
      })(t0);
    });
  }

  /* Base, then height, on every triangle, each starting a beat after the one
     to its left; the obtuse one first carries its base on under the apex. */
  function drawDims() {
    return Promise.all(tris.map((tri, i) => (async () => {
      await wait(i * 340);
      await growLine(tri.querySelector('.dim-base'), 540);
      await wait(120);
      await growLine(tri.querySelector('.dim-ext'), 380);
      await growLine(tri.querySelector('.dim-height'), 540);
      tri.classList.add('marked');
    })()));
  }

  /* the formula's word has landed: light the matching line on each triangle,
     left to right */
  function lightDims(kind) {
    tris.forEach((tri, i) => setTimeout(() => tri.classList.add('lit-' + kind), i * 150));
  }

  /* The formula pops up, then types itself out on a wall clock. When a key
     word completes, it is highlighted, the lines it names light up, and the
     typing rests for a beat before going on. */
  async function showFormula() {
    const spans = formulaSpans(formulaTxt);
    formulaCaret.hidden = true;
    formulaBox.classList.add('show');
    sfx('click', .35);
    await wait(REDUCED ? 200 : 560);

    formulaCaret.hidden = false;
    let due = performance.now();
    for (let i = 0; i < FORMULA.length; i++) {
      const seg = FORMULA[i];
      for (let c = 0; c < seg.t.length; c++) {
        spans[i].textContent = seg.t.slice(0, c + 1);
        due += FORMULA_MS;
        const left = due - performance.now();
        if (left > 0) await wait(left);
      }
      if (seg.w) {
        spans[i].classList.add('lit');
        lightDims(seg.w);
        due += FORMULA_PAUSE;
        const left = due - performance.now();
        if (left > 0) await wait(left);
      }
    }
    formulaCaret.hidden = true;
  }

  async function sectionTwo() {
    lockInput(true);
    sceneStart();

    /* 1. Swiftee ducks back behind the board, and the warm-up clears away
          while it is mid-air */
    const out = mascotJumpOut();
    await wait(260);
    feedbackGen++;
    promptTxt.textContent = '';
    caret.hidden = true;
    board.classList.add('sec2');
    await out;
    await wait(520);

    /* 2. one triangle, drawn in the middle of the empty board */
    const first = tris[0];
    parkCentre(first);
    lesson.classList.add('on');
    lesson.setAttribute('aria-hidden', 'false');
    await wait(80);
    await revealShape(first);
    await wait(320);

    /* 3. Swiftee jumps back up to its spot and names what this is */
    await mascotJumpIn();
    await wait(240);
    swiftee.hold('talking');
    await typewrite(LESSON.types, LESSON.types.length * TYPE_MS);
    swiftee.release();
    await wait(700);

    /* 4. it moves aside, and two more kinds join it, one at a time */
    await slideHome(first);
    await wait(220);
    for (const tri of tris.slice(1)) {
      await revealShape(tri);
      await wait(260);
    }
    await wait(320);

    /* 5. base and height on all three */
    swiftee.hold('talking');
    await typewrite(LESSON.dims, LESSON.dims.length * TYPE_MS);
    swiftee.release();
    await wait(380);
    await drawDims();
    await wait(520);

    /* 6. the formula, word by word, lighting the lines it names */
    await showFormula();
    swiftee.play('happy', 1);

    /* 7. two seconds to take it in, then on */
    await wait(2000);
    await showNext();
    await sectionThree();
  }

  /* ---------- section 3 onward: quadrilaterals ----------
   * One board section serves every quadrilateral scene from here. Its svg is
   * rebuilt per scene from four corners and a chosen diagonal: the two
   * triangles that diagonal makes, each with its perpendicular height, foot
   * mark and label, are all worked out here rather than drawn by hand. The
   * triangles are told apart by colour -- never by lettered corners. */
  const quad       = document.getElementById('quad');
  const quadShape  = document.getElementById('quadShape');
  const quadSvg    = document.getElementById('quadSvg');
  const quadArt    = quadSvg.querySelector('.art');
  const quadDims   = quadSvg.querySelector('.dims');
  const quadDots   = document.getElementById('dots');
  const joinLine   = document.getElementById('joinLine');
  const demoG      = document.getElementById('demoJoin');
  const demoLine   = document.getElementById('demoLine');
  const demoHand   = document.getElementById('demoHand');
  const quizBlock  = document.getElementById('quizBlock');
  const quizMascot = document.getElementById('quizMascot');
  const dd         = document.getElementById('dd');
  const noteGhost  = document.getElementById('noteGhost');
  const noteType   = document.getElementById('noteType');
  const noteTxt    = noteType.querySelector('.txt');
  const noteCaret  = noteType.querySelector('.caret');
  const sayRow     = document.getElementById('sayRow');
  const sideMascot = document.getElementById('sideMascot');
  const sayGhost   = document.getElementById('sayGhost');
  const sayType    = document.getElementById('sayType');
  const sayTxt     = sayType.querySelector('.txt');
  const sayCaret   = sayType.querySelector('.caret');
  const areaLinesEl = document.getElementById('areaLines');
  const flyer      = document.getElementById('flyer');

  let quadFill = null;         /* the whole-shape fill of the quadrilateral on the board */
  let corners  = [];           /* the corner groups of the shape on the board */
  let CORNERS  = {};           /* corner key -> { x, y }, in the svg's units */
  const HIT  = 24;             /* how near a corner a release counts, in svg units */
  const NAME = { T: 'top', R: 'right', B: 'bottom', L: 'left' };

  /* ---- the shapes ----
   * Corners are keyed by where they sit (top, right, bottom, left), which is
   * how Swiftee refers to them. A spec names the diagonal, and for each of
   * the two triangles it makes: the corner it reaches, its colour, and what
   * its height is labelled. */
  const PTS_A = { T: { x: 165, y: 10 }, R: { x: 323, y: 151 }, B: { x: 73,  y: 262 }, L: { x: 10,  y: 151 } };
  const PTS_B = { T: { x: 120, y: 10 }, R: { x: 322, y: 70 },  B: { x: 250, y: 262 }, L: { x: 12,  y: 200 } };
  const PTS_C = { T: { x: 106, y: 49 }, R: { x: 322, y: 190 }, B: { x: 221, y: 226 }, L: { x: 12,  y: 140 } };
  const ORDER = ['T', 'R', 'B', 'L'];

  /* section 3: the first quadrilateral, cut left to right... */
  const SPEC_A = {
    pts: PTS_A, diag: ['L', 'R'], base: 'base',
    tris: [{ apex: 'T', color: 'purple', label: 'height' }, { apex: 'B', color: 'green', label: 'height' }]
  };
  /* ...and then the same one, cut top to bottom */
  const SPEC_A2 = {
    pts: PTS_A, diag: ['T', 'B'], base: 'base',
    tris: [{ apex: 'L', color: 'green', label: 'height' }, { apex: 'R', color: 'purple', label: 'height' }]
  };
  /* section 4: a different one, with measurements */
  const SPEC_B = {
    pts: PTS_B, diag: ['T', 'B'], base: '10 cm',
    tris: [{ apex: 'L', color: 'green', label: '6 cm' }, { apex: 'R', color: 'purple', label: '5 cm' }]
  };
  /* section 5: the one the learner works out alone */
  const SPEC_C = {
    pts: PTS_C, diag: ['L', 'R'], base: '18 cm',
    tris: [{ apex: 'T', color: 'green', label: '6 cm' }, { apex: 'B', color: 'purple', label: '3 cm' }]
  };

  /* ---- Swiftee's lines ---- */
  const QUAD = {
    tap:     'Tap here!',
    answer:  'quadrilateral',
    notes: {
      triangle:      'A triangle has 3 sides. Check again!',
      pentagon:      'A pentagon has 5 sides. Check again!',
      quadrilateral: 'Correct! A quadrilateral has 4 sides.'
    },
    general: 'This is a general quadrilateral.',
    area:    'Let’s try and find its area!',
    join:    'Join the corners to divide the quadrilateral into two parts.',
    divided: 'The quadrilateral is divided into two triangles.',
    another: 'Let’s try a different way!',
    twoNew:  'Two new triangles! Let’s find their areas.',
    joinWrong: (a, b) => 'Try again! Join the ' + NAME[a] + ' and ' + NAME[b] + ' corners.'
  };
  const FOUR = {
    here: 'Here is a different quadrilateral.',
    dims: 'Let’s look at its base and heights.',
    pick: 'Choose the base and height for each triangle.'
  };
  const FIVE = {
    turn: 'Now it’s your turn! Find the area of this quadrilateral.'
  };

  /* The working under (later, beside) the shape, in pieces: every word that
     names a part of the drawing is its own span, so it can light up -- and
     light the part it names -- the moment it has finished typing. */
  const LINES_A = [
    [{ t: 'Area of ' }, { t: 'Triangle 1', w: 'purple' }, { t: ' = ½ × ' }, { t: 'base', w: 'base' }, { t: ' × ' }, { t: 'height', w: 'h-purple' }],
    [{ t: 'Area of ' }, { t: 'Triangle 2', w: 'green' },  { t: ' = ½ × ' }, { t: 'base', w: 'base' }, { t: ' × ' }, { t: 'height', w: 'h-green' }],
    /* the no-break spaces keep "= Area of" and "+ Area of" whole, so the long
       line wraps before an operator rather than leaving one dangling */
    [{ t: 'Area of ' }, { t: 'Quadrilateral', w: 'quad' }, { t: ' = Area of ' }, { t: 'Triangle 1', w: 'purple' }, { t: ' + Area of ' }, { t: 'Triangle 2', w: 'green' }]
  ];
  const SUM_A2 = [{ t: 'Area of ' }, { t: 'Quadrilateral', w: 'quad' }, { t: ' = Area of ' }, { t: 'Green Triangle', w: 'green' }, { t: ' + Area of ' }, { t: 'Purple Triangle', w: 'purple' }];
  const SUM_B  = [{ t: 'Area of ' }, { t: 'Quadrilateral', w: 'quad' }, { t: ' = ' }, { t: '30 sq. cm', w: 'green' }, { t: ' + ' }, { t: '25 sq. cm', w: 'purple' }, { t: ' = 55 sq. cm' }];

  /* what the drop-downs in a formula offer: the parts of the drawing by name
     in section 3, and by measurement in section 4 */
  const NOTATION = [{ v: 'base', t: 'Base' }, { v: 'h-green', t: 'Green height' }, { v: 'h-purple', t: 'Purple height' }];
  const MEASURES = [{ v: '10', t: '10 cm' }, { v: '6', t: '6 cm' }, { v: '5', t: '5 cm' }];

  const AREA_MS    = 64;       /* per character */
  const AREA_PAUSE = 560;      /* a beat after each key word, for the highlight to land */

  const longest = list => list.reduce((a, b) => (b.length > a.length ? b : a), '');

  /* every ghost holds its longest line from the first frame, so no box under
     the shape changes size once it is on screen */
  noteGhost.textContent = longest([QUAD.tap].concat(Object.keys(QUAD.notes).map(k => QUAD.notes[k])));
  sayGhost.textContent  = longest([QUAD.general, QUAD.area]);

  /* ---------- building a quadrilateral ---------- */
  const fmt = n => Math.round(n * 10) / 10;
  const pt  = p => fmt(p.x) + ',' + fmt(p.y);

  function buildQuad(spec) {
    const P = spec.pts;
    const [d1, d2] = spec.diag;
    const A = P[d1], B = P[d2];
    const dx = B.x - A.x, dy = B.y - A.y;
    const L2 = dx * dx + dy * dy, len = Math.sqrt(L2);

    /* the shape: one fill, the two halves, the outline that draws itself */
    let art = '<polygon class="shape-fill" clip-path="url(#wipeQuad)" points="' + ORDER.map(k => pt(P[k])).join(' ') + '" />';
    spec.tris.forEach(t => {
      art += '<polygon class="tri-fill c-' + t.color + '" points="' + pt(A) + ' ' + pt(P[t.apex]) + ' ' + pt(B) + '" />';
    });
    art += '<path class="shape-outline" d="M' + ORDER.map(k => fmt(P[k].x) + ' ' + fmt(P[k].y)).join(' L') + ' Z" fill="none" stroke-width="5" />';
    quadArt.innerHTML = art;
    quadFill = quadArt.querySelector('.shape-fill');

    /* each height: from the triangle's far corner straight down onto the
       diagonal, a right-angle mark at its foot, and a label alongside, run
       along the line and set on whichever side has more room */
    let dims = '';
    let tallest = spec.tris[0];
    spec.tris.forEach(t => {
      const X = P[t.apex];
      const tt = ((X.x - A.x) * dx + (X.y - A.y) * dy) / L2;
      const F = { x: A.x + dx * tt, y: A.y + dy * tt };
      const side = tt < .5 ? 1 : -1;                        /* toward the farther end */
      const u = { x: dx / len * side, y: dy / len * side };
      const hv = { x: X.x - F.x, y: X.y - F.y };
      const hl = Math.hypot(hv.x, hv.y);
      const v = { x: hv.x / hl, y: hv.y / hl };
      t.height = hl;
      t.foot = tt;
      if (hl > tallest.height) tallest = t;
      const s = 11;
      dims += '<line class="dim h-' + t.color + '" x1="' + fmt(X.x) + '" y1="' + fmt(X.y) + '" x2="' + fmt(F.x) + '" y2="' + fmt(F.y) + '" />';
      dims += '<path class="dim-mark mark-' + t.color + '" d="M' + fmt(F.x + u.x * s) + ' ' + fmt(F.y + u.y * s) +
              ' L' + fmt(F.x + u.x * s + v.x * s) + ' ' + fmt(F.y + u.y * s + v.y * s) +
              ' L' + fmt(F.x + v.x * s) + ' ' + fmt(F.y + v.y * s) + '" />';
      const M = { x: (X.x + F.x) / 2 + u.x * 12, y: (X.y + F.y) / 2 + u.y * 12 };
      let ang = Math.atan2(hv.y, hv.x) * 180 / Math.PI;
      if (ang > 90) ang -= 180;
      if (ang < -90) ang += 180;
      dims += '<text class="dim-label lbl-h lbl-' + t.color + '" x="' + fmt(M.x) + '" y="' + fmt(M.y) + '" font-size="13" text-anchor="middle" ' +
              'dominant-baseline="middle" transform="rotate(' + fmt(ang) + ' ' + fmt(M.x) + ' ' + fmt(M.y) + ')">' + t.label + '</text>';
    });
    /* the base label: along the diagonal, set into the taller triangle, at
       whichever of three places is farthest from both heights' feet */
    {
      const X = P[tallest.apex];
      const feet = spec.tris.map(t => t.foot);
      const at = [.22, .5, .78].reduce((best, c) => {
        const gap = Math.min.apply(null, feet.map(f => Math.abs(f - c)));
        return gap > best.gap ? { t: c, gap: gap } : best;
      }, { t: .5, gap: -1 }).t;
      const mid = { x: A.x + dx * at, y: A.y + dy * at };
      let n = { x: -dy / len, y: dx / len };
      if ((X.x - mid.x) * n.x + (X.y - mid.y) * n.y < 0) n = { x: -n.x, y: -n.y };
      const M = { x: mid.x + n.x * 14, y: mid.y + n.y * 14 };
      let ang = Math.atan2(dy, dx) * 180 / Math.PI;
      if (ang > 90) ang -= 180;
      if (ang < -90) ang += 180;
      dims += '<text class="dim-label lbl-base" x="' + fmt(M.x) + '" y="' + fmt(M.y) + '" font-size="13" text-anchor="middle" ' +
              'dominant-baseline="middle" transform="rotate(' + fmt(ang) + ' ' + fmt(M.x) + ' ' + fmt(M.y) + ')">' + spec.base + '</text>';
    }
    quadDims.innerHTML = dims;

    /* the corners; the hit circle is bigger than the dot it serves */
    quadDots.innerHTML = ORDER.map(k =>
      '<g class="corner" data-corner="' + k + '"><circle class="dot" cx="' + P[k].x + '" cy="' + P[k].y + '" r="7" />' +
      '<circle class="dot-hit" cx="' + P[k].x + '" cy="' + P[k].y + '" r="22" /></g>').join('');
    corners = Array.from(quadDots.querySelectorAll('.corner'));
    corners.forEach(c => c.addEventListener('pointerdown', onCornerDown));
    CORNERS = {};
    ORDER.forEach(k => { CORNERS[k] = P[k]; });

    /* a clean slate: no split, no lights, no lines, one column */
    quadShape.className = 'quad-shape';
    quad.classList.remove('wide');
    setLine(joinLine, A, A);
    joinLine.classList.remove('live', 'bad', 'done');
    demoG.classList.remove('on');
    areaLinesEl.textContent = '';
  }

  function segSpans(root, segs) {
    root.textContent = '';
    return segs.map(seg => {
      const el = document.createElement('span');
      if (seg.w) el.className = 'w w-' + seg.w;
      root.appendChild(el);
      return el;
    });
  }

  /* A typewriter bound to one box. A line that comes in while an earlier one
     is still typing takes the box over from it, as feedback() does above. */
  function typer(txt, blink, perChar) {
    let gen = 0;
    return async function (text) {
      const g = ++gen;
      txt.textContent = '';
      blink.hidden = false;
      const t0 = performance.now();
      for (let i = 0; i < text.length; i++) {
        if (g !== gen) return;
        txt.textContent = text.slice(0, i + 1);
        const left = t0 + (i + 1) * perChar - performance.now();
        if (left > 0) await wait(left);
      }
      if (g === gen) blink.hidden = true;
    };
  }
  const note  = typer(noteTxt, noteCaret, 55);        /* Swiftee's remark on an answer */
  const aside = typer(sayTxt, sayCaret, TYPE_MS);     /* Swiftee's line beside itself */

  /* Swiftee says a line from its place by the heading */
  async function heading(text) {
    feedbackGen++;
    swiftee.hold('talking');
    await typewrite(text, text.length * TYPE_MS);
    swiftee.release();
  }

  /* the formula typewriter, generalised: a line in segments, with a pause
     and a callback each time a key word completes */
  async function typeSegments(txt, blink, segs, perChar, pause, onWord) {
    const spans = segSpans(txt, segs);
    blink.hidden = false;
    let due = performance.now();
    for (let i = 0; i < segs.length; i++) {
      const seg = segs[i];
      for (let c = 0; c < seg.t.length; c++) {
        spans[i].textContent = seg.t.slice(0, c + 1);
        due += perChar;
        const left = due - performance.now();
        if (left > 0) await wait(left);
      }
      if (seg.w) {
        spans[i].classList.add('lit');
        if (onWord) onWord(seg.w);
        due += pause;
        const left = due - performance.now();
        if (left > 0) await wait(left);
      }
    }
    blink.hidden = true;
  }

  /* an eased 0 -> 1 over ms, driven by the frame clock; a skip lands it at 1.
     Ease-out cubic unless told otherwise. */
  const easeOut   = p => 1 - Math.pow(1 - p, 3);
  const easeInOut = p => (p < .5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2);
  function tween(ms, step, ease) {
    const fn = ease || easeOut;
    if (REDUCED || fastForward) { step(1); return wait(0); }
    return new Promise(resolve => {
      const t0 = performance.now();
      (function f(t) {
        const p = fastForward ? 1 : Math.min(1, (t - t0) / ms);
        step(fn(p));
        if (p < 1) requestAnimationFrame(f);
        else resolve();
      })(t0);
    });
  }

  function setLine(line, a, b) {
    line.setAttribute('x1', a.x); line.setAttribute('y1', a.y);
    line.setAttribute('x2', b.x); line.setAttribute('y2', b.y);
  }
  function setEnd(line, b) {
    line.setAttribute('x2', b.x); line.setAttribute('y2', b.y);
  }
  /* a screen position in the svg's units */
  function svgPoint(x, y) {
    const p = quadSvg.createSVGPoint();
    p.x = x; p.y = y;
    const m = quadSvg.getScreenCTM();
    return m ? p.matrixTransform(m.inverse()) : p;
  }
  function nearCorner(p, except) {
    let best = null, bd = HIT;
    Object.keys(CORNERS).forEach(k => {
      if (k === except) return;
      const c = CORNERS[k];
      const d = Math.hypot(c.x - p.x, c.y - p.y);
      if (d < bd) { bd = d; best = k; }
    });
    return best;
  }
  const cornerEl = k => corners.find(c => c.dataset.corner === k);

  /* ---------- a hop from one spot on the board to another ----------
   * Over the board this time, so the flyer carries the sprite: it takes over
   * at the first spot, flies the arc, and hands back at the second. All the
   * spots are the same size, so the box is simply moved. The arc is a
   * parabola on a linear clock -- the way a real jump moves -- with the
   * height of the spring scaled to how far it has to go. */
  async function hopBetween(fromEl, toEl) {
    const a = fromEl.getBoundingClientRect();
    const b = toEl.getBoundingClientRect();
    if (!a.width || !b.width || REDUCED) {
      fromEl.classList.remove('in');
      toEl.classList.add('in');
      return;
    }

    /* a crouch before the spring */
    const crouch = fromEl.animate(
      [{ transform: 'none' }, { transform: 'translateY(5%) scale(1.06, .92)' }],
      { duration: 150, easing: 'ease-in', fill: 'forwards' }
    );
    try { await crouch.finished; } catch (e) {}
    crouch.cancel();

    Object.assign(flyer.style, {
      left: a.left + 'px', top: a.top + 'px', width: a.width + 'px', height: a.height + 'px'
    });
    flyer.classList.add('on');
    fromEl.classList.remove('in');

    const dx = b.left - a.left;
    const dy = b.top - a.top;
    const arc = Math.min(170, Math.max(70, Math.abs(dx) * .3 + Math.max(0, -dy) * .2));
    const N = 18;
    const kf = [];
    for (let i = 0; i <= N; i++) {
      const t = i / N;
      kf.push({ transform: 'translate(' + (dx * t) + 'px, ' + (dy * t - arc * 4 * t * (1 - t)) + 'px)' });
    }
    const fly = flyer.animate(kf, {
      duration: Math.min(900, 480 + Math.hypot(dx, dy) * .35), easing: 'linear', fill: 'forwards'
    });
    try { await fly.finished; } catch (e) {}

    toEl.classList.add('in');
    flyer.classList.remove('on');
    fly.cancel();
    const land = toEl.animate(
      [{ transform: 'scale(1.06, .92)' }, { transform: 'none' }],
      { duration: 220, easing: 'ease-out' }
    );
    try { await land.finished; } catch (e) {}
  }

  /* ---------- drop-downs ----------
   * Custom ones, so the box can be a slot, shake, go green and open with a
   * pop: a native select can do none of that. makeDD builds one; ddController
   * runs one -- the quiz's, written in the HTML, and every one built here. */
  function makeDD(opts, small) {
    const root = document.createElement('div');
    root.className = 'dd' + (small ? ' dd-small' : '');
    root.innerHTML =
      '<button class="dd-btn" type="button" aria-haspopup="listbox" aria-expanded="false" aria-label="Choose an answer">' +
        '<span class="dd-value"></span>' +
        '<svg class="dd-chev" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16l-8 10z" /></svg>' +
      '</button><div class="dd-menu" role="listbox"></div>';
    const menu = root.querySelector('.dd-menu');
    opts.forEach(o => {
      const b = document.createElement('button');
      b.className = 'dd-opt';
      b.type = 'button';
      b.setAttribute('role', 'option');
      b.dataset.value = o.v;
      b.textContent = o.t;
      menu.appendChild(b);
    });
    return root;
  }

  function closeMenus() {
    document.querySelectorAll('.dd.open').forEach(d => {
      d.classList.remove('open');
      const b = d.querySelector('.dd-btn');
      if (b) b.setAttribute('aria-expanded', 'false');
    });
  }
  document.addEventListener('click', closeMenus);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenus(); });

  function ddController(root) {
    const btn   = root.querySelector('.dd-btn');
    const value = root.querySelector('.dd-value');
    const opts  = Array.from(root.querySelectorAll('.dd-opt'));
    let live = false, check = null, onRight = null, onWrong = null, resolve = null, resetT = null, fill = null;

    function open(on) {
      root.classList.toggle('open', !!on);
      btn.setAttribute('aria-expanded', on ? 'true' : 'false');
    }
    btn.addEventListener('click', e => {
      if (!interactive || !live) return;
      e.stopPropagation();
      const was = root.classList.contains('open');
      closeMenus();
      open(!was);
      sfx('click', .5);
    });
    opts.forEach(o => o.addEventListener('click', e => {
      if (!interactive || !live) return;
      e.stopPropagation();
      choose(o, false);
    }));

    /* an answer goes in; `auto` is true when a skip put it there */
    function choose(opt, auto) {
      if (!live || !opt) return;
      open(false);
      clearTimeout(resetT);
      const v = opt.dataset.value;
      value.textContent = opt.textContent;
      root.classList.remove('hint', 'reject');
      root.classList.add('chosen');
      sfx('click', .5);

      /* ---- wrong: red shake, and the box empties again after a beat ---- */
      if (!check(v)) {
        sfx('wrong');
        swiftee.play('confused', 1);
        void btn.offsetWidth;                              /* restart the shake */
        root.classList.add('reject');
        setTimeout(() => root.classList.remove('reject'), 430);
        if (onWrong) onWrong(v);
        resetT = setTimeout(() => {
          if (!live) return;
          value.textContent = '';
          root.classList.remove('chosen');
        }, 1500);
        return;
      }

      /* ---- right: the slot closes up green, confetti out of it ---- */
      live = false;
      skipFills.delete(fill);
      root.classList.add('correct');
      sfx('correct', auto ? .55 : 1);
      if (!auto) {
        swiftee.play('happy', 1);
        sfx('confetti', .55);
        requestAnimationFrame(() => burst(btn));
      }
      if (onRight) onRight(v);
      if (resolve) resolve(v);
    }

    return {
      root: root,
      /* resolves with the value once a right answer is in; a skip picks the
         first right one itself */
      ask(isRight, right, wrong) {
        return new Promise(res => {
          check = isRight; onRight = right || null; onWrong = wrong || null; resolve = res;
          live = true;
          root.classList.add('hint');
          fill = () => choose(opts.find(o => isRight(o.dataset.value)), true);
          skipFills.add(fill);
        });
      }
    };
  }
  const quizDD = ddController(dd);

  /* ---------- joining the corners ----------
   * Drag from one corner to another, or tap one and then the other. Only the
   * diagonal the scene is built around counts; the other pair is turned down
   * gently and the learner pointed back at it. */
  let joinLive = false;
  let joinResolve = null;
  let joinSignal = null;
  let joinPair = ['L', 'R'];
  let jdrag = null;            /* { from, start } while a corner is being dragged from */
  let armed = null;            /* a corner tapped once, waiting for its partner */
  const fillJoin = () => completeJoin(true);

  function setArmed(k) {
    corners.forEach(c => c.classList.toggle('armed', c.dataset.corner === k));
    armed = k;
  }
  function setHot(k) {
    corners.forEach(c => c.classList.toggle('hot', c.dataset.corner === k));
  }
  function hideDemo() { demoG.classList.remove('on'); }

  function onCornerDown(e) {
    if (!interactive || !joinLive) return;
    if (e.button !== undefined && e.button !== 0) return;
    e.preventDefault();
    const k = e.currentTarget.dataset.corner;

    /* the learner has taken hold: the hint has done its job */
    if (joinSignal) joinSignal.done = true;
    hideDemo();

    if (armed && armed !== k) {
      const from = armed;
      setArmed(null);
      return tryPair(from, k);
    }
    setArmed(null);

    const p = CORNERS[k];
    jdrag = { from: k, start: svgPoint(e.clientX, e.clientY) };
    setLine(joinLine, p, p);
    joinLine.classList.remove('bad', 'done');
    joinLine.classList.add('live');
    sfx('click', .5);

    window.addEventListener('pointermove', onJoinMove);
    window.addEventListener('pointerup', onJoinUp);
    window.addEventListener('pointercancel', onJoinUp);
  }

  function onJoinMove(e) {
    if (!jdrag) return;
    const q = svgPoint(e.clientX, e.clientY);
    setEnd(joinLine, q);
    setHot(nearCorner(q, jdrag.from));
  }

  async function onJoinUp(e) {
    if (!jdrag) return;
    window.removeEventListener('pointermove', onJoinMove);
    window.removeEventListener('pointerup', onJoinUp);
    window.removeEventListener('pointercancel', onJoinUp);

    const { from, start } = jdrag;
    jdrag = null;
    setHot(null);

    const q = svgPoint(e.clientX, e.clientY);
    const to = nearCorner(q, from);
    if (to) return tryPair(from, to);

    /* a tap, not a drag: the corner waits for its partner */
    if (Math.hypot(q.x - start.x, q.y - start.y) < 6) {
      joinLine.classList.remove('live');
      setArmed(from);
      return;
    }

    /* let go in the open: the line runs back into its corner */
    const a = CORNERS[from];
    const x = +joinLine.getAttribute('x2'), y = +joinLine.getAttribute('y2');
    await tween(260, p => setEnd(joinLine, { x: x + (a.x - x) * p, y: y + (a.y - y) * p }));
    if (!jdrag) joinLine.classList.remove('live');
  }

  function tryPair(a, b) {
    const ok = (a === joinPair[0] && b === joinPair[1]) || (a === joinPair[1] && b === joinPair[0]);
    if (ok) return completeJoin(false, a);
    return wrongJoin(a, b);
  }

  /* the other diagonal: shown red for a beat, then drawn back in */
  async function wrongJoin(a, b) {
    const A = CORNERS[a], B = CORNERS[b];
    setLine(joinLine, A, B);
    joinLine.classList.remove('live');
    joinLine.classList.add('bad');
    sfx('wrong');
    swiftee.play('confused', 1);
    feedback(QUAD.joinWrong(joinPair[0], joinPair[1]));
    [cornerEl(a), cornerEl(b)].forEach(c => c && c.classList.add('hot'));
    await wait(520);
    [cornerEl(a), cornerEl(b)].forEach(c => c && c.classList.remove('hot'));
    if (!joinLive || jdrag) return;        /* completed, or a new drag has begun */
    await tween(260, p => setEnd(joinLine, { x: B.x + (A.x - B.x) * p, y: B.y + (A.y - B.y) * p }));
    if (!jdrag) joinLine.classList.remove('bad');
  }

  /* the diagonal draws itself, corner to corner */
  async function drawJoin(a, b) {
    const A = CORNERS[a], B = CORNERS[b];
    setLine(joinLine, A, A);
    joinLine.classList.remove('bad', 'done');
    joinLine.classList.add('live');
    await tween(620, p => setEnd(joinLine, { x: A.x + (B.x - A.x) * p, y: A.y + (B.y - A.y) * p }));
    joinLine.classList.remove('live');
    joinLine.classList.add('done');
    quadShape.classList.add('joined');
  }

  /* the diagonal is in; `auto` is true when a skip drew it */
  async function completeJoin(auto, from) {
    if (!joinLive) return;
    joinLive = false;
    skipFills.delete(fillJoin);
    lockInput(true);
    if (joinSignal) joinSignal.done = true;
    hideDemo();
    setArmed(null);
    setHot(null);
    quadShape.classList.remove('live');

    const a = from || joinPair[0];
    const b = a === joinPair[0] ? joinPair[1] : joinPair[0];
    joinLine.classList.remove('bad');
    if (auto) {
      await drawJoin(a, b);
    } else {
      setLine(joinLine, CORNERS[a], CORNERS[b]);
      joinLine.classList.remove('live');
      joinLine.classList.add('done');
      quadShape.classList.add('joined');
    }
    sfx('correct', auto ? .55 : 1);
    if (!auto) swiftee.play('happy', 1);
    if (joinResolve) joinResolve();
  }

  function awaitJoin(signal, pair) {
    return new Promise(resolve => {
      joinResolve = resolve;
      joinSignal = signal;
      joinPair = pair;
      joinLive = true;
      quadShape.classList.add('live');
      lockInput(false);
      skipFills.add(fillJoin);
    });
  }

  /* ---------- the hint under the instruction ----------
   * A dotted line grows from one corner of the pair to the other with a
   * finger riding its tip, again and again, until the learner takes hold of
   * a corner -- the way the ghost chip demonstrates a drag in the warm-up. */
  function demoJoin(signal, pair) {
    const A = CORNERS[pair[0]], B = CORNERS[pair[1]];
    const S = 1.7;                 /* the hand glyph's scale; its fingertip is at (11.5, 3) */
    const handAt = (x, y) => demoHand.setAttribute('transform',
      'translate(' + (x - 11.5 * S) + ' ' + (y - 3 * S) + ') scale(' + S + ')');

    if (REDUCED) {
      /* no motion: the whole line, held, until the learner starts */
      return (async () => {
        setLine(demoLine, A, B); handAt(B.x, B.y);
        demoG.classList.add('on');
        while (!signal.done && !fastForward) await wait(200);
        demoG.classList.remove('on');
      })();
    }

    async function pass() {
      setLine(demoLine, A, A); handAt(A.x, A.y);
      demoG.classList.add('on');
      await wait(200);
      await new Promise(resolve => {
        const t0 = performance.now(), ms = 1300;
        (function f(t) {
          if (signal.done || fastForward) return resolve();
          const p = Math.min(1, (t - t0) / ms);
          const e = p < .5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;   /* ease-in-out */
          const x = A.x + (B.x - A.x) * e, y = A.y + (B.y - A.y) * e;
          setEnd(demoLine, { x: x, y: y }); handAt(x, y);
          if (p < 1) requestAnimationFrame(f);
          else resolve();
        })(t0);
      });
      if (signal.done) return;
      await wait(380);
      demoG.classList.remove('on');
      await wait(300);
    }

    return (async () => {
      await wait(350);
      while (!signal.done && !fastForward) {
        await pass();
        if (signal.done) break;
        await wait(550);
      }
      demoG.classList.remove('on');
    })();
  }

  /* ---------- the working ---------- */

  /* The board's middle cell goes from one column to two: the shape to the
     left two fifths, the working to the right three fifths. A grid cannot
     animate that change, so the shape's box is measured before and after and
     the move is played back as a transform from the old place to the new. */
  async function layoutWide() {
    const before = quadSvg.getBoundingClientRect();
    quad.classList.add('wide');
    const after = quadSvg.getBoundingClientRect();
    if (REDUCED || !before.width || !after.width) return wait(120);

    const dx = before.left - after.left;
    const dy = before.top - after.top;
    const s  = before.width / after.width;
    quadSvg.style.transformOrigin = '0 0';
    const a = quadSvg.animate(
      [{ transform: 'translate(' + dx + 'px, ' + dy + 'px) scale(' + s + ')' }, { transform: 'none' }],
      { duration: 760, easing: 'cubic-bezier(.4, 0, .2, 1)' }
    );
    try { await a.finished; } catch (e) {}
    quadSvg.style.transformOrigin = '';
  }

  /* the whole-shape fill gives way to the two coloured halves */
  function splitShape() {
    if (quadFill) quadFill.style.opacity = '';
    quadShape.classList.add('split');
  }

  /* the perpendicular drops from the far corner to the base, then its
     right-angle mark appears at the foot */
  async function dropHeight(color) {
    await growLine(quadSvg.querySelector('.h-' + color), 640);
    quadShape.classList.add('marked-' + color);
    await wait(260);
  }

  /* a key word has landed in the working: light the part of the drawing it
     names -- a triangle swells once, a line stays lit */
  function onAreaWord(w) {
    if (w === 'green' || w === 'purple') {
      const cls = 'pulse-' + w;
      quadShape.classList.remove(cls);
      void quadShape.offsetWidth;
      quadShape.classList.add(cls);
      setTimeout(() => quadShape.classList.remove(cls), 700);
      return;
    }
    quadShape.classList.add('lit-' + w.replace(/^h-/, ''));
  }

  function showLine(line) {
    areaLinesEl.appendChild(line);
    void line.offsetWidth;
    line.classList.add('show');
    sfx('click', .3);
    return wait(REDUCED ? 160 : 460);
  }

  /* a line of working that types itself out, lighting what it names */
  async function showTypedLine(segs) {
    const line = document.createElement('div');
    line.className = 'area-line';
    line.innerHTML = '<span class="type-wrap"><span class="type-ghost"></span>' +
      '<span class="type"><span class="txt"></span><i class="caret" aria-hidden="true"></i></span></span>';
    /* the ghost carries the whole line, so the box is sized before the first
       character lands */
    segSpans(line.querySelector('.type-ghost'), segs).forEach((el, j) => { el.textContent = segs[j].t; });
    await showLine(line);
    await typeSegments(line.querySelector('.txt'), line.querySelector('.caret'), segs, AREA_MS, AREA_PAUSE, onAreaWord);
    return line;
  }

  /* "Area of [Green Triangle] = ½ × [ v ] × [ v ]": a line with two
     drop-downs in it, and a tail the working is typed into once both are
     right */
  function formulaLine(name, color, opts) {
    const line = document.createElement('div');
    line.className = 'area-line f-line';
    const seg = (cls, text) => {
      const el = document.createElement('span');
      el.className = cls;
      el.textContent = text;
      return el;
    };
    const dd1 = makeDD(opts, true), dd2 = makeDD(opts, true);
    const tail = document.createElement('span');
    tail.className = 'seg tail';
    tail.innerHTML = '<span class="txt"></span><i class="caret" hidden aria-hidden="true"></i>';
    const expr = document.createElement('span');
    expr.className = 'expr';
    expr.append(seg('seg', ' = ½ × '), dd1, seg('seg', ' × '), dd2);
    line.append(seg('seg', 'Area of '), seg('w w-' + color + ' lit', name), expr, tail);
    return {
      line: line,
      dds: [ddController(dd1), ddController(dd2)],
      tail: typer(tail.querySelector('.txt'), tail.querySelector('.caret'), AREA_MS)
    };
  }

  /* Both boxes are live at once, and between them they must hold the two
     parts named -- in either order. A part already in one box is turned down
     by the other. */
  async function askFormula(f, need) {
    const taken = new Set();
    const ok = v => need.indexOf(v) !== -1 && !taken.has(v);
    lockInput(false);
    await Promise.all(f.dds.map(d => d.ask(ok,
      v => { taken.add(v); feedback(FEEDBACK.right); },
      () => feedback(FEEDBACK.wrong))));
    lockInput(true);
  }

  /* "The sum of the perpendicular heights is [ v ]": a label card with a
     drop-down slot on its end, as the name quiz was */
  function questionLine(label, opts) {
    const line = document.createElement('div');
    line.className = 'area-line q-line';
    const lab = document.createElement('span');
    lab.className = 'quiz-label';
    lab.textContent = label;
    const d = makeDD(opts, false);
    line.append(lab, d);
    return { line: line, dd: ddController(d) };
  }

  /* the last line of a scene is in: "Well Done!", the halves swell together,
     Swiftee is proud, and confetti falls */
  function celebrate() {
    feedback(FEEDBACK.done);
    onAreaWord('green');
    onAreaWord('purple');
    swiftee.play('proud', 1);
    skyConfetti(120, 3200);
    sfx('confetti', .8);
  }

  /* Between quadrilaterals the board goes blank: Swiftee ducks behind it,
     the old shape fades, the new one is built and drawn, and Swiftee jumps
     back up to the heading. */
  async function nextQuad(spec) {
    const out = mascotJumpOut();
    await wait(260);
    feedbackGen++;
    promptTxt.textContent = '';
    caret.hidden = true;
    quad.classList.add('off');
    await out;
    await wait(520);
    await freshQuad(spec);
    await mascotJumpIn();
    await wait(240);
  }

  /* the shape is rebuilt while the section is faded out, then drawn again */
  async function freshQuad(spec) {
    buildQuad(spec);
    quad.style.transition = 'none';
    quad.classList.remove('off');
    void quad.offsetWidth;
    quad.style.transition = '';
    await wait(80);
    await revealShape(quadShape);
    await wait(300);
  }

  /* the diagonal, the two colours, and both heights with their labels */
  async function showSplit(pair, spec) {
    quadShape.classList.add('dots');
    await wait(500);
    await drawJoin(pair[0], pair[1]);
    await wait(300);
    splitShape();
    await wait(700);
    await layoutWide();
    await wait(300);
    for (const t of spec.tris) {
      await dropHeight(t.color);
      quadShape.classList.add('lit-' + t.color);
    }
    quadShape.classList.add('lit-base');
    await wait(500);
  }

  async function sectionThree() {
    lockInput(true);
    sceneStart();

    /* 1. Swiftee ducks back behind the board, and the lesson clears away
          while it is mid-air; the empty footer band draws in too */
    const out = mascotJumpOut();
    await wait(260);
    feedbackGen++;
    promptTxt.textContent = '';
    caret.hidden = true;
    board.classList.add('sec3');
    trayArea.style.minHeight = '';
    await out;
    await wait(520);

    /* the heading's ghost takes the longest line of the quadrilateral
       scenes; the board is blank, so the row can re-measure with nothing on
       it to move */
    promptGhost.textContent = longest([QUAD.join, QUAD.divided, QUAD.twoNew, FOUR.pick, FIVE.turn, QUAD.joinWrong('bottom', 'right')]);

    /* 2. the quadrilateral: outline first, then the colour */
    buildQuad(SPEC_A);
    quad.classList.add('on');
    quad.setAttribute('aria-hidden', 'false');
    await wait(80);
    await revealShape(quadShape);
    await wait(360);

    /* 3. "This is a ..." with a drop-down; Swiftee jumps in beside it and
          points the learner at the arrow */
    quizBlock.classList.add('show');
    await wait(REDUCED ? 200 : 440);
    await mascotJumpIn(quizMascot);
    await wait(200);
    dd.classList.add('hint');
    swiftee.hold('talking');
    await note(QUAD.tap);
    swiftee.release();
    lockInput(false);
    await quizDD.ask(v => v === QUAD.answer,
      v => note(QUAD.notes[v]),
      v => note(QUAD.notes[v] || QUAD.notes.triangle));
    lockInput(true);
    await wait(1900);

    /* 4. the sentence goes; Swiftee hops to the left and names the shape */
    quizBlock.classList.add('off');
    await wait(380);
    sayRow.classList.add('show');
    await hopBetween(quizMascot, sideMascot);
    quizBlock.classList.remove('show');
    await wait(220);
    swiftee.hold('talking');
    await aside(QUAD.general);
    swiftee.release();
    await wait(1400);
    swiftee.hold('talking');
    await aside(QUAD.area);
    swiftee.release();
    await wait(1100);

    /* 5. up to the heading; the corners light up, and the instruction types
          while a finger shows the line to draw */
    sayRow.classList.add('off');
    await wait(320);
    await hopBetween(sideMascot, boardMascot);
    sayRow.classList.remove('show');
    await wait(240);
    quadShape.classList.add('dots');
    await wait(560);
    const signal = { done: false };
    const demo = demoJoin(signal, ['L', 'R']);
    await heading(QUAD.join);
    await awaitJoin(signal, ['L', 'R']);
    await demo;

    /* 6. joined */
    await wait(360);
    await heading(QUAD.divided);
    await wait(520);

    /* 7. the shape moves to the left, making room for the working on the
          right; then two colours, two heights, two areas, and their sum */
    await layoutWide();
    await wait(300);
    splitShape();
    await wait(REDUCED ? 300 : 900);
    await dropHeight('purple');
    await showTypedLine(LINES_A[0]);
    await wait(760);
    await dropHeight('green');
    await showTypedLine(LINES_A[1]);
    await wait(760);
    await showTypedLine(LINES_A[2]);
    celebrate();

    /* a few seconds to take it in, then on */
    await wait(2600);
    await showNext();

    /* ---- the other way: the same shape, cut top to bottom ---- */
    sceneStart();
    feedbackGen++;
    promptTxt.textContent = '';
    caret.hidden = true;
    quad.classList.add('off');
    await wait(480);
    await freshQuad(SPEC_A2);
    await heading(QUAD.another);
    await wait(300);

    /* the corners again, and a finger tracing the other diagonal */
    quadShape.classList.add('dots');
    await wait(560);
    const signal2 = { done: false };
    const demo2 = demoJoin(signal2, ['T', 'B']);
    await wait(900);
    await awaitJoin(signal2, ['T', 'B']);
    await demo2;

    /* two new colours, and the shape moves aside for the working */
    await wait(360);
    splitShape();
    await wait(700);
    await heading(QUAD.twoNew);
    await layoutWide();
    await wait(300);
    for (const t of SPEC_A2.tris) {
      await dropHeight(t.color);
      quadShape.classList.add('lit-' + t.color);
    }
    quadShape.classList.add('lit-base');
    await wait(400);

    /* the learner names the base and height of each triangle in turn... */
    const g = formulaLine('Green Triangle', 'green', NOTATION);
    await showLine(g.line);
    await askFormula(g, ['base', 'h-green']);
    onAreaWord('green');
    await wait(700);
    const p = formulaLine('Purple Triangle', 'purple', NOTATION);
    await showLine(p.line);
    await askFormula(p, ['base', 'h-purple']);
    onAreaWord('purple');
    await wait(700);

    /* ...and the sum is written out */
    await showTypedLine(SUM_A2);
    celebrate();
    await wait(2600);
    await showNext();
    await sectionFour();
  }

  /* ---------- section 4: a different quadrilateral, with measurements ---------- */
  async function sectionFour() {
    lockInput(true);
    sceneStart();

    await nextQuad(SPEC_B);
    await heading(FOUR.here);
    await wait(700);
    await heading(FOUR.dims);
    await wait(200);
    await showSplit(['T', 'B'], SPEC_B);
    await heading(FOUR.pick);
    await wait(200);

    /* each triangle: pick the base and the height, and the working follows */
    const g = formulaLine('Green Triangle', 'green', MEASURES);
    await showLine(g.line);
    await askFormula(g, ['10', '6']);
    await wait(300);
    await g.tail(' = ½ × 10 × 6 = 30 sq. cm');
    onAreaWord('green');
    await wait(800);
    const p = formulaLine('Purple Triangle', 'purple', MEASURES);
    await showLine(p.line);
    await askFormula(p, ['10', '5']);
    await wait(300);
    await p.tail(' = ½ × 10 × 5 = 25 sq. cm');
    onAreaWord('purple');
    await wait(800);

    /* and the two are added up */
    await showTypedLine(SUM_B);
    celebrate();
    await wait(2600);
    await showNext();
    await sectionFive();
  }

  /* ---------- section 5: the learner's own go ---------- */
  async function sectionFive() {
    lockInput(true);
    sceneStart();

    await nextQuad(SPEC_C);
    await heading(FIVE.turn);
    await wait(300);
    await showSplit(['L', 'R'], SPEC_C);

    /* two questions at once: the heights added, and the diagonal */
    const q1 = questionLine('The sum of the perpendicular heights is',
      [{ v: '24', t: '24 cm' }, { v: '9', t: '9 cm' }, { v: '21', t: '21 cm' }]);
    const q2 = questionLine('Diagonal length is',
      [{ v: '6', t: '6 cm' }, { v: '3', t: '3 cm' }, { v: '18', t: '18 cm' }]);
    await showLine(q1.line);
    await showLine(q2.line);
    const right = () => feedback(FEEDBACK.right);
    const wrong = () => feedback(FEEDBACK.wrong);
    lockInput(false);
    await Promise.all([
      q1.dd.ask(v => v === '9', right, wrong),
      q2.dd.ask(v => v === '18', right, wrong)
    ]);
    lockInput(true);
    await wait(700);

    /* then the area itself */
    const q3 = questionLine('The area of the quadrilateral is',
      [{ v: '81', t: '81 sq. cm' }, { v: '162', t: '162 sq. cm' }, { v: '182', t: '182 sq. cm' }]);
    await showLine(q3.line);
    lockInput(false);
    await q3.dd.ask(v => v === '81', right, wrong);
    lockInput(true);
    celebrate();
    await wait(2600);
    await showNext();
    await specialIntro();
  }

  /* ---------- between sections: on to the special quadrilaterals ----------
   * Swiftee ducks behind the board, the board itself fades off the
   * landscape, and Swiftee hops up a little left of centre to say two lines
   * from its speech bubble -- the intro's own stage, brought back. */
  const SPECIAL = [
    'We now know how to find the area of a quadrilateral by splitting it into triangles.',
    'Let us now try finding the area of some special quadrilaterals.'
  ];

  async function specialIntro() {
    lockInput(true);
    sceneStart();

    const out = mascotJumpOut();
    await wait(260);
    feedbackGen++;
    promptTxt.textContent = '';
    caret.hidden = true;
    await out;
    await wait(200);
    board.classList.remove('show');
    await wait(620);

    /* the intro's stage again, tidied of how the intro left it: the bird is
       still off the bottom of the frame from its exit, the bubble popped out */
    introMascot.getAnimations().forEach(a => { try { a.cancel(); } catch (e) {} });
    introMascot.style.transform = '';
    introMascot.style.opacity = '';
    bubble.classList.remove('out', 'show');
    bubbleTxt.textContent = '';
    intro.classList.add('on', 'aside');
    await wait(140);

    await hopIn();
    await wait(240);
    swiftee.hold('talking');
    await say(SPECIAL[0]);
    swiftee.release();
    await wait(1500);
    swiftee.hold('talking');
    await say(SPECIAL[1]);
    swiftee.release();
    await wait(700);

    await showNext(nextBtnFree);
    await paraSection();
  }

  /* ---------- section 4: the parallelogram ----------
   * The first of the special quadrilaterals. Swiftee's aside is over: the
   * bird drops out of the frame, the board comes back blank, and a
   * parallelogram draws itself in the middle of it -- outline first, then
   * the colour. Swiftee jumps up from behind the board to the heading, two
   * names appear under the shape, and it asks "What shape is this?": the
   * wrong name is shaken off and steps back, the right one goes green.
   *
   * Then the two facts, each shown on the shape before it is said:
   *   1. parallel -- the top and bottom sides light up, are carried on past
   *      their corners in dotted lines that never meet, and take an arrow
   *      mark each; the left and right pair do the same in their own hue.
   *      Swiftee hops down beside the fact list and states it.
   *   2. equal -- the marks step back; a glowing copy of the top side lifts
   *      off and travels down to lie exactly over the bottom side, and tick
   *      marks land on both; the left side does the same onto the right.
   *      Swiftee hops down and states the second fact.
   * Back up to the heading, and Next. */
  const para       = document.getElementById('para');
  const paraShape  = document.getElementById('paraShape');
  const paraSvg    = document.getElementById('paraSvg');
  const paraArt    = paraSvg.querySelector('.art');
  const paraEx     = document.getElementById('paraEx');
  const paraTray   = document.getElementById('paraTray');
  const paraChips  = Array.from(paraTray.querySelectorAll('.chip'));
  const facts      = document.getElementById('facts');
  const factMascot = document.getElementById('factMascot');
  const factEls    = { par: document.getElementById('factA'), eq: document.getElementById('factB') };

  /* the corners, clockwise from the top left: the top runs parallel to the
     bottom and the left to the right, and each pair is the same length --
     which is the whole lesson */
  const PARA_PTS   = { TL: { x: 74, y: 6 }, TR: { x: 358, y: 6 }, BR: { x: 290, y: 198 }, BL: { x: 6, y: 198 } };
  const PARA_ORDER = ['TL', 'TR', 'BR', 'BL'];

  /* the two pairs of opposite sides. Each side is named by its corners,
     walked the same way round as its partner, so a copy of one slides onto
     the other corner for corner. The tick count is the usual notation: one
     tick on the first pair, two on the second. */
  const PAIRS = {
    a: { sides: [['TL', 'TR'], ['BL', 'BR']], ticks: 1 },      /* top and bottom */
    b: { sides: [['TL', 'BL'], ['TR', 'BR']], ticks: 2 }       /* left and right */
  };
  const EXT = 44;              /* how far a side is carried on past each corner */

  const PARA = {
    ask:     'What shape is this?',
    right:   'That’s Correct! This is a parallelogram.',
    look1:   'Look at the top and bottom sides.',
    never:   'They run side by side and never meet.',
    look2:   'The left and right sides do the same!',
    measure: 'Now let’s compare their lengths.',
    fit1:    'The top side fits the bottom side exactly!',
    fit2:    'And the left side fits the right side too!',
    facts: {
      par: [{ t: 'Opposite sides are ' }, { t: 'parallel', w: 'par' }, { t: ' to each other.' }],
      eq:  [{ t: 'Opposite sides are ' }, { t: 'equal in length', w: 'eq' }, { t: '.' }]
    }
  };
  const PARA_ANSWER = 'parallelogram';

  /* each fact's ghost holds its whole line from the first frame, so the list
     is sized before a character lands */
  Object.keys(PARA.facts).forEach(k => {
    const segs = PARA.facts[k];
    segSpans(factEls[k].querySelector('.type-ghost'), segs).forEach((el, j) => { el.textContent = segs[j].t; });
  });

  /* ---------- building the parallelogram ----------
   * The shape, and over it everything the explanation will need: for every
   * side, a glowing copy to grow along it, two dotted carry-ons past its
   * corners, an arrow mark and its tick marks; and for each pair, the
   * measuring copy of its first side. Every mark is inked in the pair's hue
   * over a pale halo, so it reads on the lit side, the fill and the board
   * alike. */
  function buildPara() {
    const P = PARA_PTS;
    paraArt.innerHTML =
      '<polygon class="shape-fill" clip-path="url(#wipePara)" points="' + PARA_ORDER.map(k => pt(P[k])).join(' ') + '" />' +
      '<path class="shape-outline" d="M' + PARA_ORDER.map(k => fmt(P[k].x) + ' ' + fmt(P[k].y)).join(' L') + ' Z" fill="none" stroke-width="5" />';

    const ln = (cls, a, b) => '<line class="' + cls + '" x1="' + fmt(a.x) + '" y1="' + fmt(a.y) + '" x2="' + fmt(b.x) + '" y2="' + fmt(b.y) + '" />';
    const at = (o, u, s, n, t) => ({ x: o.x + u.x * s + n.x * t, y: o.y + u.y * s + n.y * t });

    let ex = '';
    Object.keys(PAIRS).forEach(k => {
      const pair = PAIRS[k];
      ex += '<g class="pair pair-' + k + '" data-pair="' + k + '">';
      pair.sides.forEach(side => {
        const A = P[side[0]], B = P[side[1]];
        const dx = B.x - A.x, dy = B.y - A.y, len = Math.hypot(dx, dy);
        const u = { x: dx / len, y: dy / len };                  /* along the side */
        const n = { x: -u.y, y: u.x };                           /* across it */

        /* carried on past both corners, each drawn outward from its corner */
        ex += ln('ext', A, at(A, u, -EXT, n, 0));
        ex += ln('ext', B, at(B, u, EXT, n, 0));
        /* the glowing copy, grown from the first corner */
        ex += ln('side-hl', A, B);

        /* "parallel": an arrowhead most of the way along, pointing the way
           the side runs */
        const M = at(A, u, len * .62, n, 0), s = 9;
        const chev = 'M' + fmt(M.x - u.x * s + n.x * s) + ' ' + fmt(M.y - u.y * s + n.y * s) +
                    ' L' + fmt(M.x) + ' ' + fmt(M.y) +
                    ' L' + fmt(M.x - u.x * s - n.x * s) + ' ' + fmt(M.y - u.y * s - n.y * s);
        ex += '<g class="par-mark"><path class="halo" d="' + chev + '" /><path class="ink" d="' + chev + '" /></g>';

        /* "equal": one or two ticks across the middle */
        const C = at(A, u, len / 2, n, 0), t = 10, gap = 8;
        let ticks = '';
        for (let j = 0; j < pair.ticks; j++) {
          const off = (j - (pair.ticks - 1) / 2) * gap;
          ticks += 'M' + fmt(C.x + u.x * off + n.x * t) + ' ' + fmt(C.y + u.y * off + n.y * t) +
                  ' L' + fmt(C.x + u.x * off - n.x * t) + ' ' + fmt(C.y + u.y * off - n.y * t) + ' ';
        }
        ex += '<g class="eq-mark"><path class="halo" d="' + ticks + '" /><path class="ink" d="' + ticks + '" /></g>';
      });
      /* the measuring copy: the pair's first side, to be slid onto the second */
      ex += ln('ghost-side', P[pair.sides[0][0]], P[pair.sides[0][1]]);
      ex += '</g>';
    });
    paraEx.innerHTML = ex;
  }

  const pairEl = k => paraEx.querySelector('.pair-' + k);

  /* ---------- the name quiz ----------
   * Two chips under the shape. The right one goes green with a burst; a wrong
   * one is shaken off, turned down in the heading, and steps back so the
   * choice left is the answer. A skip taps the right one. */
  function askName() {
    return new Promise(resolve => {
      let over = false;
      const finish = (chip, auto) => {
        if (over) return;
        over = true;
        skipFills.delete(fill);
        lockInput(true);
        paraChips.forEach(c => c.removeEventListener('click', onTap));
        feedbackGen++;                       /* a "Try again" still typing stops here */
        chip.classList.add('correct');
        if (!auto) {
          sfx('correct', .7);
          burst(chip);
          swiftee.play('happy', 1);
        }
        resolve();
      };
      const onTap = e => {
        const chip = e.currentTarget;
        if (!interactive || chip.classList.contains('spent')) return;
        if (chip.dataset.answer === PARA_ANSWER) { finish(chip, false); return; }
        sfx('wrong', .6);
        feedback(FEEDBACK.wrong);
        swiftee.play('confused', 1);
        chip.classList.add('reject');
        setTimeout(() => {
          chip.classList.remove('reject');
          chip.classList.add('spent');
        }, 440);
      };
      const fill = () => finish(paraChips.find(c => c.dataset.answer === PARA_ANSWER), true);
      skipFills.add(fill);
      paraChips.forEach(c => c.addEventListener('click', onTap));
      lockInput(false);
    });
  }

  /* ---------- showing the two facts ---------- */

  /* the pair's two sides light up, one after the other */
  async function lightPair(k) {
    const pair = pairEl(k);
    pair.classList.add('lit');
    const sides = pair.querySelectorAll('.side-hl');
    await growLine(sides[0], 620);
    await wait(140);
    await growLine(sides[1], 620);
  }

  /* both sides are carried on past their corners, all four ends at once, and
     the arrow marks land: two lines that keep their distance never meet */
  async function extendPair(k) {
    const pair = pairEl(k);
    await Promise.all(Array.from(pair.querySelectorAll('.ext')).map(l => growLine(l, 760)));
    await wait(200);
    pair.classList.add('show-par');
    sfx('click', .35);
    await wait(REDUCED ? 160 : 480);
  }

  /* the point is made: the carry-ons and arrows leave, the sides dim to a
     trace. The lines were lit inline by growLine, so that is lifted first
     and the classes take over the fade. */
  function quietPair(k) {
    const pair = pairEl(k);
    pair.querySelectorAll('.ext, .side-hl').forEach(l => { l.style.opacity = ''; });
    pair.classList.remove('show-par');
    pair.classList.add('quiet');
  }

  /* a glowing copy of the pair's first side lifts off it, glides across the
     shape and lands exactly over the second; the tick marks land on both, and
     the copy fades away */
  async function measurePair(k) {
    const pair = pairEl(k);
    const ghost = pair.querySelector('.ghost-side');
    const [s1, s2] = PAIRS[k].sides;
    const A = PARA_PTS[s1[0]], C = PARA_PTS[s2[0]];
    const dx = C.x - A.x, dy = C.y - A.y;

    ghost.setAttribute('transform', 'translate(0 0)');
    ghost.classList.add('show');
    await wait(REDUCED ? 120 : 420);
    await tween(1150, e => {
      ghost.setAttribute('transform', 'translate(' + fmt(dx * e) + ' ' + fmt(dy * e) + ')');
    }, easeInOut);
    /* it fits: one pulse, and the ticks go on */
    sfx('click', .45);
    ghost.classList.add('land');
    await wait(180);
    pair.classList.add('show-eq');
    await wait(REDUCED ? 160 : 520);
    ghost.classList.remove('land');
    await wait(420);
    ghost.classList.remove('show');
    await wait(320);
  }

  /* Swiftee hops down beside the list and states a fact: the line types out
     beside it, its key words lighting up in the pair's hue, and the ring
     fills with a tick once it has landed */
  async function stateFact(k) {
    const el = factEls[k];
    feedbackGen++;
    promptTxt.textContent = '';
    caret.hidden = true;
    await hopBetween(boardMascot, factMascot);
    await wait(200);
    el.classList.add('show');
    await wait(REDUCED ? 160 : 420);
    swiftee.hold('talking');
    await typeSegments(el.querySelector('.txt'), el.querySelector('.caret'), PARA.facts[k], TYPE_MS, 420, null);
    swiftee.release();
    el.classList.add('done');
    sfx('correct', .45);
  }

  async function paraSection() {
    lockInput(true);
    sceneStart();

    /* 1. the aside ends: the bubble pops away and Swiftee drops out of the
          frame, as it did before the board first arrived */
    bubble.classList.add('out');
    bubble.classList.remove('show');
    await wait(300);
    await introExit();
    intro.classList.remove('on', 'aside');

    /* the board comes back blank: the quadrilateral scenes are cleared off
       it while it is still invisible, and the heading's ghost takes the
       longest line of this scene while there is nothing on the board to move */
    board.classList.add('sec4');
    promptGhost.textContent = longest([PARA.ask, PARA.right, PARA.look1, PARA.never, PARA.look2, PARA.measure, PARA.fit1, PARA.fit2]);
    buildPara();
    await wait(200);
    await showBoard();
    await wait(300);

    /* 2. the parallelogram: outline first, then the colour */
    para.classList.add('on');
    para.setAttribute('aria-hidden', 'false');
    await wait(120);
    await revealShape(paraShape);
    await wait(380);

    /* 3. Swiftee jumps up from behind the board to the heading; the two
          names appear, and the question is asked */
    await mascotJumpIn();
    await wait(260);
    for (const chip of paraChips) {
      chip.classList.add('reveal');
      await wait(150);
    }
    sfx('click', .3);
    await wait(200);
    await heading(PARA.ask);
    await askName();
    await heading(PARA.right);
    await wait(1500);

    /* 4. the names go; the fact list stands ready under the shape */
    paraTray.classList.add('off');
    await wait(460);
    facts.classList.add('show');
    await wait(200);

    /* 5. parallel: the top and bottom light up as Swiftee points at them,
          are carried on and never meet; then the left and right */
    let said = heading(PARA.look1);
    await lightPair('a');
    await said;
    await wait(500);
    said = heading(PARA.never);
    await extendPair('a');
    await said;
    await wait(900);
    said = heading(PARA.look2);
    await lightPair('b');
    await extendPair('b');
    await said;
    await wait(800);

    /* Swiftee hops down and states the first fact */
    await stateFact('par');
    await wait(1500);

    /* 6. equal: the marks step back, Swiftee hops back up, and a copy of
          each first side is laid over its partner */
    quietPair('a');
    quietPair('b');
    await hopBetween(factMascot, boardMascot);
    await wait(240);
    await heading(PARA.measure);
    await wait(500);
    await measurePair('a');
    await heading(PARA.fit1);
    await wait(700);
    await measurePair('b');
    await heading(PARA.fit2);
    await wait(700);

    /* Swiftee hops down and states the second fact, and is proud of it */
    await stateFact('eq');
    swiftee.play('proud', 1);
    skyConfetti(90, 2800);
    sfx('confetti', .7);
    await wait(2200);

    /* 7. back to the heading, and on */
    await hopBetween(factMascot, boardMascot);
    await wait(300);
    await showNext();
    /* section 5 continues here */
  }

  async function introScene() {
    intro.classList.add('on');
    await wait(140);

    await hopIn();
    await wait(160);

    /* wave hello while the first line types out */
    swiftee.play('waving', 1);
    const wave = swiftee.ms('waving', 1);
    const t0 = performance.now();
    await say(GREETING[0]);
    const left = wave - (performance.now() - t0);
    if (left > 0) await wait(left);
    await wait(420);

    /* and talk along with the second */
    swiftee.hold('talking');
    await say(GREETING[1]);
    swiftee.release();
    await wait(900);

    bubble.classList.add('out');
    bubble.classList.remove('show');
    await wait(300);

    await introExit();
    intro.classList.remove('on');

    /* the board arrives, and Swiftee jumps up from behind it to its spot */
    await showBoard();
    await wait(160);
    await mascotJumpIn();
    await wait(220);
  }

  /* ---------- go ---------- */
  async function boot() {
    lockInput(true);

    /* the loader has already waited on the webfont, so the console height
       measured here is the final one */
    await welcomeScreen();
    lockTrayHeight();

    sceneStart();
    await introScene();

    /* the intro is over and the warm-up owns the board from here: a skip of
       the intro stops on this boundary */
    sceneStart();

    for (const shape of shapes) {
      await revealShape(shape);
      await wait(200);
    }
    await wait(180);

    /* the shapes are on the board: Swiftee names what the learner is looking
       at, then the round takes the heading over with its own instruction */
    prompt.classList.add('show');
    swiftee.hold('talking');
    await typewrite(SHAPES_READY, SHAPES_READY.length * TYPE_MS);
    swiftee.release();
    await wait(1600);

    await startRound(1);
  }

  window.addEventListener('load', () => { boot(); }, { once: true });
})();
