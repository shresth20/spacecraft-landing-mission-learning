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
 *   7. the halves shade in two colours; each height drops in turn and its
 *      area line types out under the shape, lighting what it names; the last
 *      line adds the two up
 *   8. Next
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
                   'quizMascot', 'sideMascot', 'flyer']
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

  /* A scene waiting on the learner for something other than a round -- the
     drop-down, the diagonal -- leaves its answer here, and a skip puts it in. */
  let skipFill = null;

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
      if (skipFill) { const fill = skipFill; skipFill = null; fill(); }
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
    let r1 = bubble.getBoundingClientRect();

    /* a long line on a narrow screen: slide the box left rather than let it
       run off the edge -- keeping room for the emphasis strokes outside it */
    const vw = window.innerWidth;
    const edge = 12 + parseFloat(getComputedStyle(bubble).fontSize) * 1.1;
    if (r1.right > vw - edge) {
      bubble.style.left = Math.max(edge, vw - edge - r1.width) + 'px';
      r1 = bubble.getBoundingClientRect();
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

  function showNext() {
    /* the scene is over: a skip in flight stops here, and Skip stands down
       until the next scene opens */
    sceneEnd();
    return new Promise(resolve => {
      nextBtn.hidden = false;
      void nextBtn.offsetHeight;
      nextBtn.classList.add('in');
      lockInput(false);
      nextBtn.focus({ preventScroll: true });

      nextBtn.addEventListener('click', () => {
        sfx('click', .6);
        lockInput(true);
        nextBtn.classList.remove('in');
        nextBtn.classList.add('out');
        setTimeout(() => {
          nextBtn.hidden = true;
          nextBtn.classList.remove('out');
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

  /* ---------- section 3: the quadrilateral ---------- */
  const quad       = document.getElementById('quad');
  const quadShape  = document.getElementById('quadShape');
  const quadSvg    = document.getElementById('quadSvg');
  const quadFill   = quadShape.querySelector('.shape-fill');
  const joinLine   = document.getElementById('joinLine');
  const demoG      = document.getElementById('demoJoin');
  const demoLine   = document.getElementById('demoLine');
  const demoHand   = document.getElementById('demoHand');
  const corners    = Array.from(quadSvg.querySelectorAll('.corner'));
  const quizBlock  = document.getElementById('quizBlock');
  const quizMascot = document.getElementById('quizMascot');
  const dd         = document.getElementById('dd');
  const ddBtn      = document.getElementById('ddBtn');
  const ddValue    = document.getElementById('ddValue');
  const ddOpts     = Array.from(dd.querySelectorAll('.dd-opt'));
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
  const areaLines  = Array.from(document.querySelectorAll('.area-line'));
  const flyer      = document.getElementById('flyer');

  /* Swiftee's lines in the quadrilateral scene */
  const QUAD = {
    tap:       'Tap here!',
    answer:    'quadrilateral',
    notes: {
      triangle:      'A triangle has 3 sides. Check again!',
      pentagon:      'A pentagon has 5 sides. Check again!',
      quadrilateral: 'Correct! A quadrilateral has 4 sides.'
    },
    general:   'This is a general quadrilateral.',
    area:      'Let’s try and find its area!',
    join:      'Join the corners to divide the quadrilateral into two parts.',
    joinWrong: 'Try again! Join the left and right corners.',
    divided:   'The quadrilateral is divided into two triangles.'
  };

  /* The working under the shape, in pieces: every word that names a part of
     the drawing is its own span, so it can light up -- and light the part it
     names -- the moment it has finished typing. */
  const AREA_LINES = [
    [{ t: 'Area of ' }, { t: 'Triangle 1', w: 't1' }, { t: ' = ½ × ' }, { t: 'base', w: 'base' }, { t: ' × ' }, { t: 'height', w: 'h1' }],
    [{ t: 'Area of ' }, { t: 'Triangle 2', w: 't2' }, { t: ' = ½ × ' }, { t: 'base', w: 'base' }, { t: ' × ' }, { t: 'height', w: 'h2' }],
    /* the no-break spaces keep "= Area of" and "+ Area of" whole, so the long
       line wraps before an operator rather than leaving one dangling */
    [{ t: 'Area of ' }, { t: 'Quadrilateral', w: 'quad' }, { t: ' = Area of ' }, { t: 'Triangle 1', w: 't1' }, { t: ' + Area of ' }, { t: 'Triangle 2', w: 't2' }]
  ];
  const AREA_MS    = 64;       /* per character */
  const AREA_PAUSE = 560;      /* a beat after each key word, for the highlight to land */

  /* the corners, in the svg's own units, read off the dots themselves */
  const CORNERS = {};
  corners.forEach(c => {
    const d = c.querySelector('.dot');
    CORNERS[c.dataset.corner] = { x: +d.getAttribute('cx'), y: +d.getAttribute('cy') };
  });
  const HIT = 24;              /* how near a corner a release counts, in svg units */

  const longest = list => list.reduce((a, b) => (b.length > a.length ? b : a), '');

  /* every ghost holds its longest line from the first frame, so no box under
     the shape changes size once it is on screen */
  noteGhost.textContent = longest([QUAD.tap].concat(Object.keys(QUAD.notes).map(k => QUAD.notes[k])));
  sayGhost.textContent  = longest([QUAD.general, QUAD.area]);

  function segSpans(root, segs) {
    root.textContent = '';
    return segs.map(seg => {
      const el = document.createElement('span');
      if (seg.w) el.className = 'w w-' + seg.w;
      root.appendChild(el);
      return el;
    });
  }
  areaLines.forEach((line, i) => {
    segSpans(line.querySelector('.type-ghost'), AREA_LINES[i])
      .forEach((el, j) => { el.textContent = AREA_LINES[i][j].t; });
  });

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

  /* an eased 0 -> 1 over ms, driven by the frame clock; a skip lands it at 1 */
  function tween(ms, step) {
    if (REDUCED || fastForward) { step(1); return wait(0); }
    return new Promise(resolve => {
      const t0 = performance.now();
      (function f(t) {
        const p = fastForward ? 1 : Math.min(1, (t - t0) / ms);
        step(1 - Math.pow(1 - p, 3));                       /* ease-out cubic */
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
    const pt = quadSvg.createSVGPoint();
    pt.x = x; pt.y = y;
    const m = quadSvg.getScreenCTM();
    return m ? pt.matrixTransform(m.inverse()) : pt;
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

  /* ---------- the drop-down ----------
   * A custom one, so the box can be a slot, shake, go green, and open with a
   * pop: a native select can do none of that. */
  let quizLive = false;
  let quizResolve = null;
  let ddReset = null;

  function openMenu(on) {
    dd.classList.toggle('open', !!on);
    ddBtn.setAttribute('aria-expanded', on ? 'true' : 'false');
  }
  ddBtn.addEventListener('click', e => {
    if (!interactive || !quizLive) return;
    e.stopPropagation();
    openMenu(!dd.classList.contains('open'));
    sfx('click', .5);
  });
  ddOpts.forEach(opt => opt.addEventListener('click', e => {
    if (!interactive || !quizLive) return;
    e.stopPropagation();
    chooseOption(opt, false);
  }));
  document.addEventListener('click', () => { if (dd.classList.contains('open')) openMenu(false); });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && dd.classList.contains('open')) openMenu(false);
  });

  /* an answer goes in; `auto` is true when a skip put it there */
  function chooseOption(opt, auto) {
    if (!quizLive || !opt) return;
    openMenu(false);
    clearTimeout(ddReset);
    const v = opt.dataset.value;
    ddValue.textContent = opt.textContent;
    dd.classList.remove('hint', 'reject');
    dd.classList.add('chosen');
    sfx('click', .5);

    /* ---- wrong name: red shake, Swiftee says how many sides it has ---- */
    if (v !== QUAD.answer) {
      sfx('wrong');
      swiftee.play('confused', 1);
      note(QUAD.notes[v] || QUAD.notes.triangle);
      void ddBtn.offsetWidth;                            /* restart the shake */
      dd.classList.add('reject');
      setTimeout(() => dd.classList.remove('reject'), 430);
      /* then the box empties again, so it reads as a question once more */
      ddReset = setTimeout(() => {
        if (!quizLive) return;
        ddValue.textContent = '';
        dd.classList.remove('chosen');
      }, 1500);
      return;
    }

    /* ---- right: the slot closes up green, confetti out of it ---- */
    quizLive = false;
    skipFill = null;
    lockInput(true);
    dd.classList.add('correct');
    sfx('correct', auto ? .55 : 1);
    if (!auto) {
      swiftee.play('happy', 1);
      sfx('confetti', .55);
      requestAnimationFrame(() => burst(ddBtn));
    }
    note(QUAD.notes[v]);
    if (quizResolve) quizResolve();
  }

  function awaitQuiz() {
    return new Promise(resolve => {
      quizResolve = resolve;
      quizLive = true;
      lockInput(false);
      skipFill = () => chooseOption(ddOpts.find(o => o.dataset.value === QUAD.answer), true);
    });
  }

  /* ---------- joining the corners ----------
   * Drag from one corner to another, or tap one and then the other. The
   * diagonal the scene is built around runs left to right; the other pair is
   * turned down gently and the learner pointed back at it. */
  let joinLive = false;
  let joinResolve = null;
  let joinSignal = null;
  let jdrag = null;            /* { from, start } while a corner is being dragged from */
  let armed = null;            /* a corner tapped once, waiting for its partner */

  function setArmed(k) {
    corners.forEach(c => c.classList.toggle('armed', c.dataset.corner === k));
    armed = k;
  }
  function setHot(k) {
    corners.forEach(c => c.classList.toggle('hot', c.dataset.corner === k));
  }
  function hideDemo() { demoG.classList.remove('on'); }

  corners.forEach(c => c.addEventListener('pointerdown', onCornerDown));

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
    const ok = (a === 'L' && b === 'R') || (a === 'R' && b === 'L');
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
    feedback(QUAD.joinWrong);
    [cornerEl(a), cornerEl(b)].forEach(c => c.classList.add('hot'));
    await wait(520);
    [cornerEl(a), cornerEl(b)].forEach(c => c.classList.remove('hot'));
    if (!joinLive || jdrag) return;        /* completed, or a new drag has begun */
    await tween(260, p => setEnd(joinLine, { x: B.x + (A.x - B.x) * p, y: B.y + (A.y - B.y) * p }));
    if (!jdrag) joinLine.classList.remove('bad');
  }

  /* the diagonal is in; `auto` is true when a skip drew it */
  async function completeJoin(auto, from) {
    if (!joinLive) return;
    joinLive = false;
    skipFill = null;
    lockInput(true);
    if (joinSignal) joinSignal.done = true;
    hideDemo();
    setArmed(null);
    setHot(null);
    quadShape.classList.remove('live');

    const a = from || 'L', b = a === 'L' ? 'R' : 'L';
    const A = CORNERS[a], B = CORNERS[b];
    joinLine.classList.remove('bad');
    if (auto) {
      /* nobody drew it: the line draws itself, corner to corner */
      setLine(joinLine, A, A);
      joinLine.classList.add('live');
      await tween(620, p => setEnd(joinLine, { x: A.x + (B.x - A.x) * p, y: A.y + (B.y - A.y) * p }));
    } else {
      setLine(joinLine, A, B);
    }
    joinLine.classList.remove('live');
    joinLine.classList.add('done');
    quadShape.classList.add('joined');
    sfx('correct', auto ? .55 : 1);
    if (!auto) swiftee.play('happy', 1);
    if (joinResolve) joinResolve();
  }

  function awaitJoin(signal) {
    return new Promise(resolve => {
      joinResolve = resolve;
      joinSignal = signal;
      joinLive = true;
      quadShape.classList.add('live');
      lockInput(false);
      skipFill = () => completeJoin(true);
    });
  }

  /* ---------- the hint under the instruction ----------
   * A dotted line grows from the left corner to the right with a finger
   * riding its tip, again and again, until the learner takes hold of a
   * corner -- the way the ghost chip demonstrates a drag in the warm-up. */
  function demoJoin(signal) {
    const A = CORNERS.L, B = CORNERS.R;
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

  /* the perpendicular drops from the apex to the base, then its right-angle
     mark appears at the foot */
  async function dropHeight(n) {
    await growLine(quadSvg.querySelector('.h' + n), 640);
    quadShape.classList.add('marked-' + n);
    await wait(260);
  }

  /* a key word has landed in the working: light the part of the drawing it
     names -- a triangle swells once, a line stays lit */
  function onAreaWord(w) {
    if (w === 't1' || w === 't2') {
      const cls = 'pulse-' + w;
      quadShape.classList.remove(cls);
      void quadShape.offsetWidth;
      quadShape.classList.add(cls);
      setTimeout(() => quadShape.classList.remove(cls), 700);
      return;
    }
    quadShape.classList.add('lit-' + w);
  }

  async function showAreaLine(i) {
    const line = areaLines[i];
    line.classList.add('show');
    sfx('click', .3);
    await wait(REDUCED ? 160 : 460);
    await typeSegments(line.querySelector('.txt'), line.querySelector('.caret'),
      AREA_LINES[i], AREA_MS, AREA_PAUSE, onAreaWord);
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

    /* the heading's ghost takes this section's longest line; the board is
       blank, so the row can re-measure with nothing on it to move */
    promptGhost.textContent = longest([QUAD.join, QUAD.joinWrong, QUAD.divided]);

    /* 2. the quadrilateral: outline first, then the colour */
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
    await awaitQuiz();
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
    const demo = demoJoin(signal);
    swiftee.hold('talking');
    await typewrite(QUAD.join, QUAD.join.length * TYPE_MS);
    swiftee.release();
    await awaitJoin(signal);
    await demo;

    /* 6. joined */
    await wait(360);
    feedbackGen++;
    swiftee.hold('talking');
    await typewrite(QUAD.divided, QUAD.divided.length * TYPE_MS);
    swiftee.release();
    await wait(520);

    /* 7. the shape moves to the left, making room for the working on the
          right; then two colours, two heights, two areas, and their sum */
    await layoutWide();
    await wait(300);
    quadFill.style.opacity = '';
    quadShape.classList.add('split');
    await wait(REDUCED ? 300 : 900);

    await dropHeight(1);
    await showAreaLine(0);
    await wait(760);
    await dropHeight(2);
    await showAreaLine(1);
    await wait(760);
    await showAreaLine(2);
    onAreaWord('t1');
    onAreaWord('t2');
    swiftee.play('proud', 1);
    skyConfetti(120, 3200);
    sfx('confetti', .8);

    /* a few seconds to take it in, then on */
    await wait(2600);
    await showNext();
    /* section 4 continues here */
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
