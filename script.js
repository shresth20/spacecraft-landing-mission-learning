/* Shape Docking Bay.
 *
 * Opening, once:
 *   0. Swiftee jumps up into the middle of the landscape and greets the learner
 *      from a speech bubble ("Hey there", then "Let's do a quick warm-up!"),
 *      jumps to its place beside the board's heading, and the board fades in
 *      behind it
 *   0b. each shape draws its own outline, then the colour pours in
 *
 * Then every round runs the same beats:
 *   1. that round's slots fade up
 *   2. that round's chips fade up
 *   3. the prompt types itself out in step with the voice-over -- Swiftee
 *      talking along with it -- while a half-transparent chip demonstrates
 *      the drag; the screen is dead to input the whole time
 *   4. the voice-over ends, the prompt stays put, play begins
 *   5. all three docked -> confetti from the sky, then the next round
 *
 * Round 2 also coaches: one wrong drop labels the sides of every shape, a
 * second wrong drop concedes and flies the formulas into place itself.
 *
 *   Round 1  name the shape     Rectangle / Square / Triangle
 *   Round 2  area of the shape  Length x Breadth / (Side)^2 / 1/2(Base x Height)
 */

(function () {
  'use strict';

  const wait = ms => new Promise(r => setTimeout(r, ms));
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
      text: 'Drag each name to its shape.',
      src:  'assets/audio/Drag each block to the matching shape.mp3'
    },
    2: {
      text: 'Drag each area to the matching shape.',
      src:  'assets/audio/Drag each area to the matching shape.mp3'
    }
  };
  const LAST_ROUND = 2;

  /* The heading's ghost holds the longest line of the level from the first
     frame, so the heading -- and Swiftee standing beside it -- keeps one width
     and one place for the whole mission. */
  promptGhost.textContent = Object.keys(ROUNDS)
    .map(n => ROUNDS[n].text)
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
   * One player driving the welcome cut-out, the intro's centre-stage bird and
   * the board's corner; at most one is visible at a time, so they can share a
   * clock -- and the moment two overlap (the hand-off to the corner) they are
   * painting the very same frame.
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
    const nodes = ['mascot', 'welcomeMascot', 'introMascot']
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

    promptTxt.textContent = '';
    caret.hidden = true;
    prompt.classList.add('show');
    await wait(320);

    let length = await durationOf(vo);
    let playing = false;

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

    /* Swiftee talks along with the narrator and stops when it does */
    swiftee.hold('talking');

    /* Type across ~82% of the clip so the last character lands a moment
       before the narrator finishes the sentence. */
    const typeMs = (playing && length > 0.5) ? length * 1000 * 0.82 : 2400;

    const signal = { done: false, anim: null };
    const demo = demoDrag(signal);

    await typewrite(spec.text, typeMs);

    if (playing && !vo.ended) {
      await new Promise(res => {
        const end = () => { vo.removeEventListener('ended', end); res(); };
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

    if (!last) await startRound(round + 1);
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

    if (roundSlots.every(s => s.classList.contains('filled'))) {
      setTimeout(finishRound, 420);
    }
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
   * away, the bird jumps to its place to the left of the board's heading --
   * shrinking to exactly that sprite's box on the way -- and the board fades
   * up around it. */
  const intro       = document.getElementById('intro');
  const introMascot = document.getElementById('introMascot');
  const bubble      = document.getElementById('bubble');
  const bubbleGhost = document.getElementById('bubbleGhost');
  const bubbleType  = document.getElementById('bubbleType');
  const bubbleTxt   = bubbleType.querySelector('.txt');
  const bubbleCaret = bubbleType.querySelector('.caret');
  const cornerMascot = document.getElementById('mascot');

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

  /* Swiftee leaves centre stage for its spot beside the heading: the same FLIP
     as a chip docking, from this sprite's box to the board sprite's. Both boxes
     are painted by one player, so at touchdown the swap is invisible. */
  async function flyToCorner() {
    const from = introMascot.getBoundingClientRect();
    const to   = cornerMascot.getBoundingClientRect();
    if (!from.width || !to.width || REDUCED) return;

    const dx = to.left - from.left;
    const dy = to.top  - from.top;
    const s  = to.width / from.width;

    introMascot.style.transformOrigin = 'top left';
    const a = introMascot.animate([
      { transform: 'translate(0px, 0px) scale(1)' },
      { transform: 'translate(' + (dx * .5) + 'px,' + (dy * .5 - 70) + 'px) scale(' + ((1 + s) / 2) + ')', offset: .55 },
      { transform: 'translate(' + dx + 'px,' + dy + 'px) scale(' + s + ')' }
    ], { duration: 820, easing: 'cubic-bezier(.35, .05, .25, 1)', fill: 'forwards' });

    /* the board starts fading up while the bird is still on approach, so it
       is there to land on */
    setTimeout(showBoard, 420);
    try { await a.finished; } catch (e) { /* cancelled */ }
  }

  function showBoard() {
    if (board.classList.contains('show')) return;
    board.classList.add('show');
    if (REDUCED) return;
    board.animate([
      { transform: 'translateY(26px) scale(.955)', opacity: 0 },
      { transform: 'none', opacity: 1 }
    ], { duration: 640, easing: 'cubic-bezier(.2, .9, .3, 1.15)' });
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

    await flyToCorner();
    showBoard();                         /* reduced motion skips the flight */

    intro.classList.remove('on');
    await wait(REDUCED ? 500 : 260);
  }

  /* ---------- go ---------- */
  async function boot() {
    lockInput(true);

    /* the loader has already waited on the webfont, so the console height
       measured here is the final one */
    await welcomeScreen();
    lockTrayHeight();

    await introScene();

    for (const shape of shapes) {
      await revealShape(shape);
      await wait(200);
    }
    await wait(180);

    await startRound(1);
  }

  window.addEventListener('load', () => { boot(); }, { once: true });
})();
