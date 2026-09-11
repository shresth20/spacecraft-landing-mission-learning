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
 *   5. Next -- the marks clear; the base is drawn under the shape and the
 *      height dropped onto it; the diagonal cuts it into two triangles and
 *      the shape moves aside for the working: ½ × b × h twice is b × h
 *   6. Next -- the shape is put back together: "Which of these is the area
 *      of the parallelogram?" over three formula chips
 *   7. Next -- the learner's own go: the labels become 8 cm and 5 cm, and
 *      the base, the height and then the area are picked from drop-downs
 *   8. Next -- the board goes and Swiftee says from its bubble that a
 *      special parallelogram is next
 *
 * Section 7, the rhombus (the special parallelogram):
 *   1. the board comes back and a second parallelogram, in a colour of its
 *      own, draws itself on it
 *   2. its two diagonals draw corner to corner; the obtuse angle at their
 *      crossing takes an arc, then the other three do, and each is labelled
 *      with its size
 *   3. Swiftee jumps up to the heading: "Drag the points to make each angle
 *      90 degrees." The top and right sides light up with a point on each;
 *      one slides the top side up and down its slant, the other the right
 *      side left and right, and the shape, its diagonals and the four angles
 *      follow every frame. The moment the sides come out equal the four arcs
 *      morph together into little squares and go green
 *   4. the showcase: a glow runs right round the shape and leaves a tick on
 *      each side ("All four sides are equal in length!"), the squares swell
 *      ("And the diagonals meet at a right angle (90°)."), and the heading
 *      names it: a parallelogram with these properties is called a rhombus
 *   5. Swiftee hops down beside the shape: "This is the special
 *      parallelogram called Rhombus." -- and Next
 *   6. Next -- the same rhombus tilts until its long diagonal lies flat; d1
 *      and d2 draw along the diagonals with a right angle marked between
 *      them, and Swiftee jumps up to the heading: "Here, is a Rhombus."
 *   7. d2 leaves; the lower half shades green and its height drops from the
 *      crossing: which of two formulas is its area? Then the upper half in
 *      purple, with its own height, and the same question. Next
 *   8. the shape moves left and the working types out beside it: each
 *      triangle's area, and the rhombus as the sum of the two. Next
 *   9. the numbers: the shape comes back to the middle, plain, with both
 *      diagonals; "Drag the two lengths into the formula." -- the
 *      diagonals are measured (16 cm and 12 cm) and four lengths appear
 *      under "Area = ½ × [ ] × [ ]"; the two right ones dock, the answer is
 *      said, and Next
 *  10. practice, a Next between each: "Choose the correct area." of the
 *      same rhombus; a rhombus of 240 sq. cm with one diagonal 30 cm --
 *      "Find the other diagonal."; two rhombi to compare -- "Tap the
 *      rhombus with the larger area." -- the working appears under each and
 *      Swiftee hops down to say that a longer diagonal alone does not
 *      decide it; and a slanted shape with a base and a height -- "Which
 *      formula can you use here?"
 *  11. Next -- the board goes and Swiftee says from its bubble that the
 *      area of a rhombus is known, and another special quadrilateral is next
 *
 * Section 8, the trapezium, in two levels:
 *   1. the board comes back and a trapezium draws itself on it; "This is a
 *      [ v ]" with a drop-down (Kite / Parallelogram / Trapezium) appears
 *      under it, and Swiftee jumps in beside the sentence: "Tap here!" Each
 *      choice is answered in a banner under the sentence, and the shape
 *      takes its "parallel" marks so the answer can be checked against it
 *   2. Next -- the sentence goes and Swiftee ducks behind the board; the
 *      shape fades and six cards take its place, three of them trapeziums.
 *      Swiftee jumps up to the heading -- "Select all the trapeziums." --
 *      and ducks back, taking the line with it. Each tap is answered at
 *      once: a trapezium locks green with confetti, anything else shakes
 *      red and steps back for good
 *   3. Next -- the three other cards leave, the trapeziums line up in one
 *      row and each takes a slot under it; the three names appear below,
 *      and Swiftee jumps up: "Drag each block to the matching shape." --
 *      the warm-up's line and voice-over. Each name is dragged onto its
 *      shape, and Next
 *
 * Section 9, the area of a trapezium -- one unbroken piece, Swiftee
 * narrating every beat, played three times: for the right-angled trapezium
 * (two copies make a rectangle), then the scalene and the isosceles (two
 * copies make a parallelogram):
 *   1. the cards (or the last trapezium) go and a trapezium draws itself in
 *      the middle of the board; it slides to the left and its sides are
 *      named: a on top, b below, h up the left
 *   2. a copy of it lifts off and turns half a circle about the middle of
 *      its slanted side -- a finger pushes it round a curved arrow -- and
 *      lands beside it: the two make the whole. The copy's sides are
 *      named, the equal sides are shown equal (b and b, then a and a), and
 *      the two names along each side of the rectangle merge into a + b
 *   3. Swiftee hops down beside the working: (a + b) x h is the whole;
 *      the copy fades to a dashed outline and the trapezium is half of it,
 *      half of (a + b) x h; the copy goes, the trapezium comes back to the
 *      middle, and the rule is boxed. Confetti, Next
 *   4. practice, a Next between each: the values of a measured trapezium
 *      dragged into A = 1/2 (a + b) x h, then the working step by step; a
 *      second trapezium's sum of parallel sides and height from drop-downs,
 *      then its area from chips; and two trapeziums to compare -- "Tap the
 *      trapezium which has the largest area." -- the working under each
 */

(function () {
  'use strict';

  /* Every beat of the game is paced through here, which is what makes Skip
     possible: while a skip is running each wait collapses to a single turn of
     the event loop, so a scene plays its whole choreography out in a handful
     of frames and lands in exactly the state it would have reached anyway. */
  let fastForward = false;

  /* Replay has to genuinely stop the scene in play -- a fast-forward will not
     do, because the abandoned chain would carry on writing to the board
     underneath the fresh one. So every wait belongs to the scene that started
     it, and rejects with CANCELLED once that scene has been retired, which
     unwinds the whole await chain of the scene being replaced. */
  const CANCELLED = { cancelled: 'scene replaced' };
  let runToken = 0;

  const wait = ms => new Promise(function (resolve, reject) {
    const mine = runToken;
    setTimeout(function () {
      if (mine !== runToken) return reject(CANCELLED);
      resolve();
    }, fastForward ? 0 : ms);
  });

  /* A retired scene unwinds through whatever await chain it was in, and some
     of those chains are deliberately awaited by nobody -- a feedback line
     typing itself out, a round finishing on a timer. Their rejection has
     nowhere to go, so it is swallowed here rather than at a dozen call sites.
     Anything that is not a cancellation is left to surface as usual. */
  window.addEventListener('unhandledrejection', function (e) {
    if (e.reason === CANCELLED) e.preventDefault();
  });
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
                   'quizMascot', 'sideMascot', 'factMascot', 'rhomMascot', 'practiceMascot',
                   'trapMascot', 'rtrapMascot', 'rtrapPMascot', 'flyer']
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
  const backBtn   = document.getElementById('backBtn');
  const skipBtn   = document.getElementById('skipBtn');
  const resetBtn  = document.getElementById('resetBtn');
  const jump      = document.getElementById('jump');
  const jumpBtn   = document.getElementById('jumpBtn');
  const jumpMenu  = document.getElementById('jumpMenu');
  const jumpLabel = document.getElementById('jumpLabel');

  /* Bumped when a scene opens and again when one reaches its hand-off. The
     scene in play is state rather than something read off a call stack: the
     chain is driven partly by the learner, since the drop that completes a
     round carries the game into the next scene by itself. */
  let sceneSeq = 0;

  /* the Next the mission is waiting on, if it is waiting on one */
  let pendingNext = null;

  /* How to re-enter the scene in play, so Replay runs the same code that
     played it the first time rather than a second, "from the top" path. */
  let sceneAgain = null;
  let replaying = false;

  /* ---------- the mission, in order ----------
   * The scenes chain by calling one another, which says what follows what but
   * never lays the whole running order out in one place. The jump menu needs
   * exactly that, so here it is -- and the menu is built from it, so the two
   * cannot drift apart.
   *
   * The entries are function declarations, so they are all hoisted and defined
   * by the time this array is evaluated, however far down the file they sit. */
  const MISSION = [
    { entry: sceneIntro,        name: 'Welcome' },
    { entry: sceneWarmUp,       name: 'Warm-up \u00b7 name the shapes' },
    { entry: sectionTwo,        name: 'Triangles \u00b7 base and height' },
    { entry: sectionThree,      name: 'Quadrilateral \u00b7 one diagonal' },
    { entry: sectionThreeAgain, name: 'Quadrilateral \u00b7 the other diagonal' },
    { entry: sectionFour,       name: 'Quadrilateral \u00b7 with measurements' },
    { entry: sectionFive,       name: 'Quadrilateral \u00b7 your own go' },
    { entry: specialIntro,      name: 'Aside \u00b7 special quadrilaterals' },
    { entry: paraSection,       name: 'Parallelogram \u00b7 its sides' },
    { entry: paraArea,          name: 'Parallelogram \u00b7 its area' },
    { entry: paraAreaQuestion,  name: 'Parallelogram \u00b7 the formula' },
    { entry: paraCheck,         name: 'Parallelogram \u00b7 your own go' },
    { entry: paraAside,         name: 'Aside \u00b7 on to the rhombus' },
    { entry: rhombusSection,    name: 'Rhombus \u00b7 its sides' },
    { entry: rhombusArea,       name: 'Rhombus \u00b7 its area' },
    { entry: rhombusSum,        name: 'Rhombus \u00b7 the sum' },
    { entry: rhombusNumbers,    name: 'Rhombus \u00b7 with numbers' },
    { entry: rhombusPractice1,  name: 'Rhombus \u00b7 practice 1' },
    { entry: rhombusPractice2,  name: 'Rhombus \u00b7 practice 2' },
    { entry: rhombusPractice3,  name: 'Rhombus \u00b7 practice 3' },
    { entry: rhombusPractice4,  name: 'Rhombus \u00b7 practice 4' },
    { entry: rhombusAside,      name: 'Aside \u00b7 on to the trapezium' },
    { entry: trapSection,       name: 'Trapezium \u00b7 its name' },
    { entry: trapSelect,        name: 'Trapezium \u00b7 pick them out' },
    { entry: trapMatch,         name: 'Trapezium \u00b7 its kinds' },
    { entry: rtrapArea,         name: 'Right-angled trapezium \u00b7 its area' },
    { entry: rtrapHalf,         name: 'Right-angled trapezium \u00b7 the formula' },
    { entry: scalArea,          name: 'Scalene trapezium \u00b7 its area' },
    { entry: scalHalf,          name: 'Scalene trapezium \u00b7 the formula' },
    { entry: isoArea,           name: 'Isosceles trapezium \u00b7 its area' },
    { entry: isoHalf,           name: 'Isosceles trapezium \u00b7 the formula' },
    { entry: trapNumbers,       name: 'Trapezium \u00b7 drag the values' },
    { entry: trapSteps,         name: 'Trapezium \u00b7 step by step' },
    { entry: trapPractice1,     name: 'Trapezium \u00b7 practice 1' },
    { entry: trapPractice2,     name: 'Trapezium \u00b7 practice 2' },
    { entry: trapPractice3,     name: 'Trapezium \u00b7 practice 3' }
  ];

  /* where we are in that order, and the stage every scene we have opened was
     opened on -- which is what lets one be gone back to exactly */
  let sceneIndex = -1;
  let jumping = false;
  const sceneOpened = new Map();

  /* The scenes played so far, most recent last: { entry, stage }.
     `stage` is what the board looked like as the scene opened -- which is to
     say, what the scene before it left behind. Recording it is what makes Back
     possible: a scene's own code sets up its own stage, but only some scenes
     do (section 4 inherits the quadrilateral stage from section 3 and takes it
     as given), so where a scene starts from cannot be worked out from the
     scene alone. Taking the snapshot at the door is exact for all of them. */
  const sceneHistory = [];

  const TOOLS = [backBtn, skipBtn, resetBtn];

  function showTools() {
    TOOLS.forEach(function (b) {
      b.hidden = false;
      void b.offsetHeight;
      b.classList.add('in');
    });
    showJump();
  }

  /* Which tools are any use right now. Replay needs somewhere to go back to
     in the scene itself; Back needs a scene behind this one. */
  function armTools() {
    resetBtn.disabled = !sceneAgain;
    backBtn.disabled = sceneHistory.length < 2;
  }

  /* The tools stay up from the first scene to the last, the hand-offs
     included: with a Next waiting, Skip still means "move on", Replay still
     means "play that again" and Back still means "go back", so there is
     nothing to be gained by taking them away at exactly the moment a learner
     might want one.
     `again` is the scene's own re-entry point; a scene that passes none cannot
     be replayed, and Replay stays down for it. */
  function sceneStart(again) {
    sceneSeq++;
    noteScene(again, stageNow());
    showTools();
    armTools();
  }

  /* Where we are, and what the board looked like when we got here.
     The history is kept as a path through the mission rather than a browser
     trail: arriving somewhere we have already been truncates back to it, so
     Back always means the section before this one. That also makes a replay a
     no-op on the history, since it finds itself already on the end. */
  function noteScene(entry, stage) {
    sceneAgain = entry || null;
    if (!entry) return;

    sceneIndex = MISSION.findIndex(function (m) { return m.entry === entry; });
    sceneOpened.set(entry, stage);

    const at = sceneHistory.findIndex(function (h) { return h.entry === entry; });
    if (at !== -1) sceneHistory.length = at + 1;
    else sceneHistory.push({ entry: entry, stage: stage });

    markJump();
  }

  /* A scene has reached its hand-off. Only the counter moves, which is what
     stops a skip that is still running; the tools stay where they are. */
  function sceneEnd() { sceneSeq++; }

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

  /* Waits that hang on the scene's own furniture rather than on a clock: the
     Next button, a corner join. A skip must NOT resolve these -- it stops at
     the Next button by design -- but a teardown has to, or the abandoned
     frame sits there for the rest of the session instead of unwinding at its
     next wait(). */
  const sceneWaiters = new Set();

  function waitForScene(register) {
    return new Promise(function (resolve) {
      const done = function () { sceneWaiters.delete(done); resolve(); };
      sceneWaiters.add(done);
      register(done);
    });
  }

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

    /* At a hand-off the scene is already over and the mission is waiting on
       the Next button, so there is no choreography left to race through: Skip
       means the same thing the learner means by pressing it. */
    if (pendingNext) { pendingNext.click(); return; }

    const from = sceneSeq;

    const token = runToken;

    fastForward = true;
    skipBtn.disabled = true;
    stopVoice();

    /* Never spin forever: if a scene ends up waiting on something a skip
       cannot reach, hand the game back at normal speed rather than leaving it
       stuck in fast-forward. A replay retires the token, which drops the skip
       at once rather than letting it fast-forward the fresh scene too. */
    const deadline = performance.now() + 8000;
    while (sceneSeq === from && runToken === token && performance.now() < deadline) {
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

  /* ---------- replay ----------
   * The scene's furniture is put back to how the page was parsed, and its own
   * re-entry function is called again.
   *
   * What "put back" means is taken from the page rather than from each scene:
   * the class list and the child nodes of everything inside a scene container
   * are snapshotted at load, so restoring them undoes in one sweep every class
   * a scene turned on and removes everything it built for itself -- without
   * eight scenes each having to remember their own list, and without going
   * stale as the mission grows.
   *
   * The board itself, Swiftee and the mission chrome are left alone: Replay
   * re-enters one scene, not the whole mission.
   */
  const SCENE_ROOTS = ['bay', 'trayArea', 'lesson', 'quad', 'para', 'rhom', 'trap', 'rtrap', 'intro']
    .map(function (id) { return document.getElementById(id); })
    .filter(Boolean);

  const pristineClass = new Map();
  const bornWith = new Set();

  SCENE_ROOTS.forEach(function (root) {
    bornWith.add(root);
    root.querySelectorAll('*').forEach(function (el) {
      bornWith.add(el);
      pristineClass.set(el, el.getAttribute('class') || '');
    });
  });

  /* The inline properties the scenes park on things: hop offsets, the centred
     first triangle, a bubble mid-resize, a docked card's hidden state. Cleared
     one property at a time rather than by dropping the style attribute, so the
     sprite sheet custom properties on the mascots survive. */
  const PARKED = ['transform', 'opacity', 'width', 'height', 'left', 'top',
                  'visibility', 'transition', 'min-height'];

  function clearStage() {
    /* let go of anything blocked on the scene's own furniture, so its frame
       unwinds at its next wait() instead of waiting for a click that will
       never come */
    Array.from(sceneWaiters).forEach(function (done) {
      try { done(); } catch (e) { /* already gone */ }
    });
    sceneWaiters.clear();
    skipFills.clear();
    releaseWaiters();
    stopVoice();

    /* drop every animation still holding a forwards fill */
    [document.querySelector('.stage'), intro].forEach(function (root) {
      if (!root || !root.getAnimations) return;
      root.getAnimations({ subtree: true }).forEach(function (a) {
        try { a.cancel(); } catch (e) { /* already done with */ }
      });
    });

    SCENE_ROOTS.forEach(function (root) {
      /* whatever the scene built for itself goes away again; taking only the
         top of each built subtree, since removing it takes its children too */
      Array.from(root.querySelectorAll('*')).forEach(function (el) {
        if (!bornWith.has(el) && bornWith.has(el.parentNode)) el.remove();
      });
      Array.from(root.querySelectorAll('*')).concat(root).forEach(function (el) {
        PARKED.forEach(function (prop) { el.style.removeProperty(prop); });
      });
    });

    /* and the classes it turned on -- the containers themselves excepted,
       since whether one is on screen at all was decided by an earlier scene
       and the scene being replayed takes it as given */
    pristineClass.forEach(function (cls, el) {
      if (cls) el.setAttribute('class', cls);
      else el.removeAttribute('class');
    });

    /* the cards go home, and the round they belonged to is forgotten */
    allChips.forEach(function (chip) {
      const home = trays[chip.dataset.round];
      if (home) home.appendChild(chip);
      chip.disabled = false;
      chip.style.removeProperty('visibility');
    });
    round = 0;
    roundSlots = [];
    roundChips = [];
    wrongInRound = 0;
    autoScheduled = false;
    roundDone = false;
    drag = null;
    picked = null;
    trayArea.style.removeProperty('min-height');

    /* every typewriter on the board, the heading included */
    feedbackGen++;
    document.querySelectorAll('.type .txt').forEach(function (t) { t.textContent = ''; });
    document.querySelectorAll('.type .caret').forEach(function (c) { c.hidden = true; });

    /* neither Next belongs to the scene being replayed */
    pendingNext = null;
    [nextBtn, nextBtnFree].forEach(function (b) {
      if (!b) return;
      b.hidden = true;
      b.classList.remove('in', 'out');
    });

    board.classList.remove('cheer');
    fx.textContent = '';                  /* confetti still on the way down */
  }

  /* Which stage is on the board: which of the scene containers are up, and
     the board's own class, which is what decides between them. */
  function stageNow() {
    return {
      board: board.getAttribute('class') || '',
      roots: SCENE_ROOTS.map(function (r) {
        return { cls: r.getAttribute('class') || '', aria: r.getAttribute('aria-hidden') };
      })
    };
  }

  function restoreStage(stage) {
    board.setAttribute('class', stage.board);
    SCENE_ROOTS.forEach(function (r, i) {
      const was = stage.roots[i];
      if (was.cls) r.setAttribute('class', was.cls); else r.removeAttribute('class');
      if (was.aria === null) r.removeAttribute('aria-hidden');
      else r.setAttribute('aria-hidden', was.aria);
    });
  }

  /* Re-enter a scene on the stage it originally opened on. Both tools that go
     somewhere -- Replay and Back -- are this, and only differ in which scene
     they hand it. */
  async function enterScene(entry, stage) {
    replaying = true;
    TOOLS.forEach(function (b) { b.disabled = true; });
    fastForward = false;
    lockInput(true);

    runToken++;                           /* retire the scene that is running */
    clearStage();
    restoreStage(stage);
    lockTrayHeight();

    /* one turn of the loop, so the retired chain has rejected and unwound
       before the fresh one starts writing to the same board */
    await new Promise(function (r) { setTimeout(r, 0); });

    replaying = false;
    noteScene(entry, stage);
    skipBtn.disabled = false;
    armTools();

    /* not awaited: a scene runs on past its own function, carried by the
       learner's answers, so there is nothing here to wait for */
    entry().catch(function (e) { if (e !== CANCELLED) throw e; });
  }

  async function replayScene() {
    if (replaying || !sceneHistory.length) return;
    const here = sceneHistory[sceneHistory.length - 1];
    resetBtn.classList.add('working');
    await enterScene(here.entry, here.stage);
    resetBtn.classList.remove('working');
  }

  async function backScene() {
    if (replaying || sceneHistory.length < 2) return;
    sceneHistory.pop();                   /* step out of the scene we are in */
    const prev = sceneHistory[sceneHistory.length - 1];
    backBtn.classList.add('working');
    await enterScene(prev.entry, prev.stage);
    backBtn.classList.remove('working');
  }

  resetBtn.addEventListener('click', replayScene);
  backBtn.addEventListener('click', backScene);

  /* ---------- jump to a section ----------
   * Behind us, a scene can be entered outright: it has been played, so the
   * stage it opens on was recorded on the way through.
   *
   * Ahead of us there is no such record -- and it could not simply be guessed,
   * because a scene's stage is mostly built by the scenes before it (section 4
   * inherits the quadrilateral from section 3 and takes it as given). So going
   * forward is a run of skips, one hand-off at a time: every scene in between
   * actually plays, which both leaves the board in a state its own code built
   * and records each stage on the way, so coming back afterwards is exact.
   */
  MISSION.forEach(function (m, i) {
    const opt = document.createElement('button');
    opt.type = 'button';
    opt.className = 'jump-opt';
    opt.setAttribute('role', 'option');
    opt.dataset.i = String(i);
    opt.innerHTML = '<span class="jump-n"></span><span class="jump-name"></span>';
    opt.querySelector('.jump-n').textContent = String(i + 1);
    opt.querySelector('.jump-name').textContent = m.name;
    opt.addEventListener('click', function (e) {
      e.stopPropagation();
      openJump(false);
      jumpTo(i);
    });
    jumpMenu.appendChild(opt);
  });

  const jumpOpts = Array.from(jumpMenu.querySelectorAll('.jump-opt'));

  /* the button says where we are; the list says which one that is, and which
     of them would have to be played through to reach */
  function markJump() {
    const here = MISSION[sceneIndex];
    jumpLabel.textContent = here ? here.name : 'Section';
    jumpOpts.forEach(function (opt, i) {
      opt.setAttribute('aria-selected', i === sceneIndex ? 'true' : 'false');
      opt.classList.toggle('ahead', i > sceneIndex);
    });
  }

  function openJump(on) {
    jump.classList.toggle('open', !!on);
    jumpBtn.setAttribute('aria-expanded', on ? 'true' : 'false');
    if (on) jumpOpts[Math.max(0, sceneIndex)].scrollIntoView({ block: 'nearest' });
  }

  function showJump() {
    jump.hidden = false;
    void jump.offsetHeight;
    jump.classList.add('in');
  }

  jumpBtn.addEventListener('click', function (e) {
    e.stopPropagation();
    if (jumping || replaying) return;
    const was = jump.classList.contains('open');
    closeMenus();                     /* a quiz drop-down must not stay open under it */
    openJump(!was);
    sfx('click', .4);
  });

  /* anywhere else, and Escape, closes it -- the quiz drop-downs already do
     the same, on the same two events */
  document.addEventListener('click', function () { openJump(false); });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') openJump(false);
  });

  async function jumpTo(i) {
    if (jumping || replaying || !MISSION[i]) return;
    const entry = MISSION[i].entry;

    /* the scene in play: the same thing Replay means */
    if (i === sceneIndex) return replayScene();

    /* behind us, so the stage it opens on is known */
    if (i < sceneIndex) {
      const stage = sceneOpened.get(entry);
      if (stage) return enterScene(entry, stage);
    }

    /* ahead: play through what is in between, as fast as Skip can */
    jumping = true;
    jumpBtn.disabled = true;
    jumpBtn.classList.add('working');
    TOOLS.forEach(function (b) { b.disabled = true; });

    const guard = performance.now() + 180000;
    let quiet = 0;

    while (sceneIndex < i && sceneIndex !== -1 && performance.now() < guard) {
      const atScene = sceneIndex;
      const atSeq = sceneSeq;

      /* A skip has a watchdog of its own and hands the game back if a scene is
         long, so one is not always enough to reach a hand-off -- which is why
         this keeps going rather than reading a single skip as the end of the
         road. */
      await skipScene();
      if (pendingNext) await skipScene();     /* at the hand-off: take it */

      /* Taking a hand-off only resolves the wait the scene was sitting on; the
         next scene opens a beat later, of its own accord. Give it that beat,
         or the jump reads its own success as a stall. */
      const settle = performance.now() + 3000;
      while (sceneIndex === atScene && performance.now() < settle) {
        await new Promise(function (r) { requestAnimationFrame(r); });
      }

      /* Neither the scene nor the mission moved: let a few of those pass,
         since a long scene makes no visible progress between skips, then give
         up rather than spin to the guard. */
      if (sceneIndex === atScene && sceneSeq === atSeq) {
        if (++quiet >= 6) break;
      } else {
        quiet = 0;
      }
    }

    jumping = false;
    jumpBtn.disabled = false;
    jumpBtn.classList.remove('working');
    skipBtn.disabled = false;
    armTools();
  }

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

    /* a replay cancels whatever a scene left running, and a cancelled
       animation rejects; the scene is being torn down either way */
    try {
      await outline.animate(
        [{ strokeDashoffset: len }, { strokeDashoffset: 0 }],
        { duration: 760, easing: 'cubic-bezier(.5,0,.2,1)', fill: 'forwards' }
      ).finished;
    } catch (e) { return; }
    outline.style.strokeDashoffset = 0;

    /* the clip rect slides up from below the artwork, so the colour reads as
       rising into the outline rather than simply switching on */
    const h = (svg.viewBox && svg.viewBox.baseVal && svg.viewBox.baseVal.height) || 200;
    fill.style.opacity = 1;
    try {
      await wipe.animate(
        [{ transform: 'translateY(' + h + 'px)' }, { transform: 'translateY(0px)' }],
        { duration: 560, easing: 'cubic-bezier(.35,0,.25,1)', fill: 'forwards' }
      ).finished;
    } catch (e) { /* cancelled by a replay */ }
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
         from a clean transform instead of stacking on this one. Written out
         rather than committed from the animation: commitStyles() folds in
         whatever else is animating the element, and after a section's exit
         that can be the drop off the bottom of the screen, which would leave
         the bird standing there out of sight. */
      introMascot.style.transform = 'translate(0px, 0px)';
      introMascot.style.opacity = '1';
      a.cancel();
    }, function () {
      /* cancelled by a replay or a jump: the scene is being taken down, so
         there is no resting pose left to bake in. Every other animation in the
         file tolerates this the same way -- and without a handler here the
         rejection has nowhere to go. */
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
    try { await a.finished; } catch (e) { return; /* cancelled */ }
    /* The drop is baked into the element and the animation let go. Left
       filling forwards on the hidden intro, the browser stops reporting it,
       so the aside's tidy-up could not cancel it -- and the bird would stand
       off the bottom of the screen while its bubble spoke. */
    introMascot.style.transform = 'translate(0px, ' + drop + 'px)';
    a.cancel();
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
    return waitForScene(resolve => {
      b.hidden = false;
      void b.offsetHeight;
      b.classList.add('in');
      lockInput(false);
      b.focus({ preventScroll: true });
      pendingNext = b;

      b.addEventListener('click', () => {
        pendingNext = null;
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
    sceneStart(sectionTwo);

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
    return waitForScene(resolve => {
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
  async function layoutWide(sec, svg, on) {
    sec = sec || quad;
    svg = svg || quadSvg;
    const before = svg.getBoundingClientRect();
    sec.classList.toggle('wide', on !== false);
    const after = svg.getBoundingClientRect();
    if (REDUCED || !before.width || !after.width) return wait(120);

    const dx = before.left - after.left;
    const dy = before.top - after.top;
    const s  = before.width / after.width;
    svg.style.transformOrigin = '0 0';
    const a = svg.animate(
      [{ transform: 'translate(' + dx + 'px, ' + dy + 'px) scale(' + s + ')' }, { transform: 'none' }],
      { duration: 760, easing: 'cubic-bezier(.4, 0, .2, 1)' }
    );
    try { await a.finished; } catch (e) {}
    svg.style.transformOrigin = '';
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
  function pulseTri(shape, color) {
    const cls = 'pulse-' + color;
    shape.classList.remove(cls);
    void shape.offsetWidth;
    shape.classList.add(cls);
    setTimeout(() => shape.classList.remove(cls), 700);
  }

  function onAreaWord(w) {
    if (w === 'green' || w === 'purple') { pulseTri(quadShape, w); return; }
    quadShape.classList.add('lit-' + w.replace(/^h-/, ''));
  }

  /* into the quadrilateral's working unless told otherwise */
  function showLine(line, root) {
    (root || areaLinesEl).appendChild(line);
    void line.offsetWidth;
    line.classList.add('show');
    sfx('click', .3);
    return wait(REDUCED ? 160 : 460);
  }

  /* a line of working that types itself out, lighting what it names */
  async function showTypedLine(segs, root, onWord) {
    const line = document.createElement('div');
    line.className = 'area-line';
    line.innerHTML = '<span class="type-wrap"><span class="type-ghost"></span>' +
      '<span class="type"><span class="txt"></span><i class="caret" aria-hidden="true"></i></span></span>';
    /* the ghost carries the whole line, so the box is sized before the first
       character lands */
    segSpans(line.querySelector('.type-ghost'), segs).forEach((el, j) => { el.textContent = segs[j].t; });
    await showLine(line, root);
    await typeSegments(line.querySelector('.txt'), line.querySelector('.caret'), segs, AREA_MS, AREA_PAUSE, onWord || onAreaWord);
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
    sceneStart(sectionThree);

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
    await sectionThreeAgain();
  }

  /* ---- the other way: the same shape, cut top to bottom ----
     Its own function so that it, like every other scene, has a re-entry point
     Replay can call. */
  async function sectionThreeAgain() {
    lockInput(true);
    sceneStart(sectionThreeAgain);
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
    sceneStart(sectionFour);

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
    sceneStart(sectionFive);

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

  /* Swiftee ducks behind the board, the board fades off the landscape, and
     Swiftee hops up on the intro's stage to say the lines from its bubble.
     `again` is the calling scene's own re-entry point, for Replay. The scene
     that follows takes the stage down again (see paraSection). */
  async function boardAside(lines, again) {
    lockInput(true);
    sceneStart(again);

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
    for (let i = 0; i < lines.length; i++) {
      swiftee.hold('talking');
      await say(lines[i]);
      swiftee.release();
      await wait(i < lines.length - 1 ? 1500 : 700);
    }

    await showNext(nextBtnFree);
  }

  async function specialIntro() {
    await boardAside(SPECIAL, specialIntro);
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
  const paraDims   = document.getElementById('paraDims');
  const paraTray   = document.getElementById('paraTray');
  const paraChips  = Array.from(paraTray.querySelectorAll('.chip'));
  const areaTray   = document.getElementById('areaTray');
  const areaChips  = Array.from(areaTray.querySelectorAll('.chip'));
  const paraLines  = document.getElementById('paraLines');
  const facts      = document.getElementById('facts');
  let paraFill = null;         /* the whole-shape fill, once built */
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

  /* the second half: base, height, the cut, the working, and the quiz */
  const PARA2 = {
    here:   'Here is a parallelogram.',
    base:   'This is the base of the parallelogram.',
    height: 'Here comes the height!',
    divide: 'Let us divide this into two triangles.',
    which:  'Which of these is the area of the parallelogram?',
    right:  'That’s Correct! Area of a parallelogram = base × height.'
  };
  const AREA_ANSWER = 'bh';

  /* the learner's own go: the same shape with measurements on it */
  const PARA3 = {
    turn:   'Now it’s your turn! Find the area of this parallelogram.',
    base:   '8 cm',
    height: '5 cm'
  };
  /* and Swiftee's aside once it is done */
  const PARA_ASIDE = [
    'We now know how to find the area of a parallelogram.',
    'Let us now try finding the area of a special parallelogram.'
  ];

  /* the two triangles are told apart by colour: purple on top of the cut,
     green under it. Each has the same base b and the same height h. */
  const PARA_LINES = [
    [{ t: 'Area of ' }, { t: 'Triangle 1', w: 'purple' }, { t: ' = ½ × ' }, { t: 'b', w: 'b' }, { t: ' × ' }, { t: 'h', w: 'h' }],
    [{ t: 'Area of ' }, { t: 'Triangle 2', w: 'green' },  { t: ' = ½ × ' }, { t: 'b', w: 'b' }, { t: ' × ' }, { t: 'h', w: 'h' }],
    [{ t: 'Area of ' }, { t: 'Parallelogram', w: 'para' }, { t: ' = ½ × b × h + ½ × b × h' }],
    [{ t: 'Area of ' }, { t: 'Parallelogram', w: 'para' }, { t: ' = ' }, { t: 'base × height', w: 'para' }]
  ];

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
    const ln = (cls, a, b) => '<line class="' + cls + '" x1="' + fmt(a.x) + '" y1="' + fmt(a.y) + '" x2="' + fmt(b.x) + '" y2="' + fmt(b.y) + '" />';
    const at = (o, u, s, n, t) => ({ x: o.x + u.x * s + n.x * t, y: o.y + u.y * s + n.y * t });

    /* the shape, the two triangles the diagonal will make (purple above the
       cut, green below), and the outline that draws itself */
    paraArt.innerHTML =
      '<polygon class="shape-fill" clip-path="url(#wipePara)" points="' + PARA_ORDER.map(k => pt(P[k])).join(' ') + '" />' +
      '<polygon class="tri-fill c-purple" points="' + pt(P.TL) + ' ' + pt(P.TR) + ' ' + pt(P.BR) + '" />' +
      '<polygon class="tri-fill c-green" points="' + pt(P.TL) + ' ' + pt(P.BR) + ' ' + pt(P.BL) + '" />' +
      '<path class="shape-outline" d="M' + PARA_ORDER.map(k => fmt(P[k].x) + ' ' + fmt(P[k].y)).join(' L') + ' Z" fill="none" stroke-width="5" />';
    paraFill = paraArt.querySelector('.shape-fill');

    /* the dimensions. A base is a two-headed arrow a little off its side,
       with its label beyond; a height is dropped from a corner straight onto
       the opposite side, with a right-angle mark at its foot and its label
       alongside. The bottom base and the left height come first; the
       diagonal, the top base and the right height arrive with the cut. */
    const GAP = 20, HEAD = 9;
    const arrow = (cls, a, b, ly, label, sym) => {
      const y = a.y + GAP * (ly > 0 ? 1 : -1);
      const A = { x: a.x, y: y }, B = { x: b.x, y: y };
      return '<g class="d-group d-base ' + cls + '">' +
        ln('d-arrow', A, B) +
        '<path class="d-head" d="M' + fmt(A.x + HEAD) + ' ' + fmt(y - HEAD * .65) + ' L' + fmt(A.x) + ' ' + fmt(y) + ' L' + fmt(A.x + HEAD) + ' ' + fmt(y + HEAD * .65) + '" />' +
        '<path class="d-head" d="M' + fmt(B.x - HEAD) + ' ' + fmt(y - HEAD * .65) + ' L' + fmt(B.x) + ' ' + fmt(y) + ' L' + fmt(B.x - HEAD) + ' ' + fmt(y + HEAD * .65) + '" />' +
        '<text class="d-label" x="' + fmt((A.x + B.x) / 2) + '" y="' + fmt(y + (ly > 0 ? 22 : -11)) + '" font-size="' + (sym ? 17 : 14) + '" text-anchor="middle">' +
          label + (sym ? '<tspan class="d-sym">' + sym + '</tspan>' : '') + '</text>' +
      '</g>';
    };
    const height = (cls, top, foot, side, label, sym) => {
      /* side: which way the mark and the label sit, +1 to the right */
      const M = 12, up = foot.y > top.y ? -1 : 1;    /* the mark stands off the foot, toward the top */
      const mark = 'M' + fmt(foot.x) + ' ' + fmt(foot.y + up * M) + ' H' + fmt(foot.x + side * M) + ' V' + fmt(foot.y);
      return '<g class="d-group d-h ' + cls + '">' +
        ln('d-height', top, foot) +
        '<path class="d-mark" d="' + mark + '" />' +
        '<text class="d-label" x="' + fmt(foot.x + side * 9) + '" y="' + fmt((top.y + foot.y) / 2) + '" font-size="' + (sym ? 17 : 14) + '" text-anchor="' + (side > 0 ? 'start' : 'end') + '" dominant-baseline="middle">' +
          label + (sym ? '<tspan class="d-sym">' + sym + '</tspan>' : '') + '</text>' +
      '</g>';
    };
    paraDims.innerHTML =
      arrow('d-bottom', P.BL, P.BR, 1, 'Base', ' (b)') +
      height('d-left', P.TL, { x: P.TL.x, y: P.BL.y }, 1, 'Height', ' (h)') +
      '<g class="split-dims">' +
        ln('join-line', P.TL, P.BR) +
        arrow('d-top', P.TL, P.TR, -1, 'b', '') +
        height('d-right', P.BR, { x: P.BR.x, y: P.TR.y }, -1, 'h', '') +
      '</g>';

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

  /* ---------- tap the right chip ----------
   * A row of chips under the shape. The right one goes green with a burst; a
   * wrong one is shaken off, turned down in the heading, and steps back. A
   * skip taps the right one. */
  function askChips(chips, answer) {
    return new Promise(resolve => {
      let over = false;
      const finish = (chip, auto) => {
        if (over) return;
        over = true;
        skipFills.delete(fill);
        sceneWaiters.delete(teardown);
        lockInput(true);
        chips.forEach(c => c.removeEventListener('click', onTap));
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
        if (chip.dataset.answer === answer) { finish(chip, false); return; }
        sfx('wrong', .6);
        feedback(FEEDBACK.wrong);
        swiftee.play('confused', 1);
        chip.classList.add('reject');
        setTimeout(() => {
          chip.classList.remove('reject');
          chip.classList.add('spent');
        }, 440);
      };
      const fill = () => finish(chips.find(c => c.dataset.answer === answer), true);
      /* A replay retires the scene while the question is open. The chips
         stay on the page, so the listeners must come off them here -- left
         on, the retired question would answer the fresh one's tap first and
         lock the input under it. The promise is simply never settled. */
      const teardown = () => {
        sceneWaiters.delete(teardown);
        over = true;
        skipFills.delete(fill);
        chips.forEach(c => c.removeEventListener('click', onTap));
      };
      sceneWaiters.add(teardown);
      skipFills.add(fill);
      chips.forEach(c => c.addEventListener('click', onTap));
      lockInput(false);
    });
  }

  /* the chips fade up one after another */
  async function dealChips(chips) {
    for (const chip of chips) {
      chip.classList.add('reveal');
      await wait(150);
    }
    sfx('click', .3);
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
    sceneStart(paraSection);

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
    promptGhost.textContent = longest([PARA.ask, PARA.right, PARA.look1, PARA.never, PARA.look2, PARA.measure, PARA.fit1, PARA.fit2]
      .concat(Object.keys(PARA2).map(k => PARA2[k]), PARA3.turn));
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
    await dealChips(paraChips);
    await wait(200);
    await heading(PARA.ask);
    await askChips(paraChips, PARA_ANSWER);
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
    await paraArea();
  }

  /* ---------- the area of the parallelogram ----------
   * The marks and the facts clear, leaving Swiftee and the shape. The base
   * is drawn under it and the height dropped onto it, each named as it
   * comes; the diagonal cuts the shape into two triangles, the second base
   * and height appear, and the shape moves aside for the working: half of
   * b times h, twice over, is b times h. Then the shape is put back together
   * in the middle for the quiz: which of three formulas is its area. */

  /* a key word of the working lands: light what it names */
  function onParaWord(w) {
    if (w === 'green' || w === 'purple') { pulseTri(paraShape, w); return; }
    if (w === 'b' || w === 'h') { paraShape.classList.add('lit-' + w); return; }
    /* the whole shape: both halves swell and the outline glows */
    pulseTri(paraShape, 'purple');
    pulseTri(paraShape, 'green');
    paraShape.classList.remove('lit-quad');
    void paraShape.offsetWidth;
    paraShape.classList.add('lit-quad');
  }

  const dimGroup = cls => paraDims.querySelector('.' + cls);

  /* the arrow grows from its left end, then the heads and the label come on */
  async function drawBase(cls) {
    const g = dimGroup(cls);
    await growLine(g.querySelector('.d-arrow'), 720);
    g.classList.add('on');
    sfx('click', .35);
    await wait(REDUCED ? 160 : 520);
  }

  /* the dotted height drops from the corner, then the mark and the label */
  async function drawHeight(cls) {
    const g = dimGroup(cls);
    await growLine(g.querySelector('.d-height'), 640);
    g.classList.add('on');
    sfx('click', .35);
    await wait(REDUCED ? 160 : 520);
  }

  /* the diagonal draws, the two colours shade in, and the second base and
     height arrive with it */
  async function dividePara() {
    paraShape.classList.add('divided');
    const diag = paraDims.querySelector('.join-line');
    await growLine(diag, 700);
    diag.classList.add('done');
    await wait(300);
    if (paraFill) paraFill.style.opacity = '';
    paraShape.classList.add('split');
    await wait(REDUCED ? 300 : 800);
    await drawBase('d-top');
    await drawHeight('d-right');
  }

  /* the shape is put back together: the working leaves, the cut and the
     second pair fade, the colour comes back */
  async function mendPara() {
    paraLines.classList.add('off');
    await wait(450);
    paraShape.classList.remove('split', 'divided', 'lit-b', 'lit-h', 'lit-quad');
    if (paraFill) paraFill.style.opacity = 1;
    await wait(600);
    await layoutWide(para, paraSvg, false);
    paraLines.textContent = '';
    paraLines.classList.remove('off');
  }

  async function paraArea() {
    lockInput(true);
    sceneStart(paraArea);

    /* 1. the marks and the facts clear: Swiftee and the shape alone */
    feedbackGen++;
    promptTxt.textContent = '';
    caret.hidden = true;
    paraEx.classList.add('gone');
    facts.classList.remove('show');
    await wait(560);
    await heading(PARA2.here);
    await wait(1000);

    /* 2. the base, named as it is drawn */
    let said = heading(PARA2.base);
    await wait(500);
    await drawBase('d-bottom');
    await said;
    await wait(700);

    /* 3. the height, dropped from the corner; then both take their letters */
    said = heading(PARA2.height);
    await wait(400);
    await drawHeight('d-left');
    await said;
    await wait(300);
    paraShape.classList.add('syms');
    await wait(900);

    /* 4. the cut */
    await heading(PARA2.divide);
    await wait(300);
    await dividePara();
    await wait(500);

    /* 5. the shape moves to the left, and the working follows on the right:
          each triangle, their sum, and what that comes to */
    await layoutWide(para, paraSvg);
    await wait(300);
    await showTypedLine(PARA_LINES[0], paraLines, onParaWord);
    await wait(760);
    await showTypedLine(PARA_LINES[1], paraLines, onParaWord);
    await wait(760);
    await showTypedLine(PARA_LINES[2], paraLines, onParaWord);
    await wait(760);
    await showTypedLine(PARA_LINES[3], paraLines, onParaWord);
    feedback(FEEDBACK.done);
    swiftee.play('proud', 1);
    skyConfetti(120, 3200);
    sfx('confetti', .8);
    await wait(2600);
    await showNext();
    await paraAreaQuestion();
  }

  /* ---- the question the whole section was building to ----
     Its own function so that it, like every other scene, has a re-entry point
     Replay can call. */
  async function paraAreaQuestion() {
    lockInput(true);
    sceneStart(paraAreaQuestion);
    feedbackGen++;
    promptTxt.textContent = '';
    caret.hidden = true;
    await mendPara();
    await wait(300);
    await dealChips(areaChips);
    await wait(200);
    await heading(PARA2.which);
    await askChips(areaChips, AREA_ANSWER);
    await heading(PARA2.right);
    await wait(1800);
    await showNext();
    await paraCheck();
  }

  /* ---------- the learner's own go ----------
   * The formula chips leave and the labels on the shape swap their letters
   * for measurements. The shape moves aside, as the quadrilateral did, and
   * the learner reads the base and the height off it from drop-downs -- both
   * live at once -- then works out the area. Then Swiftee's aside. */

  /* "Base (b)" and "Height (h)" become "8 cm" and "5 cm": each label fades,
     is re-lettered, and fades back in */
  async function measurePara() {
    const swaps = [['d-bottom', PARA3.base], ['d-left', PARA3.height]];
    const labels = swaps.map(([cls]) => dimGroup(cls).querySelector('.d-label'));
    labels.forEach(l => l.classList.add('swap'));
    paraShape.classList.remove('syms');
    await wait(REDUCED ? 100 : 460);
    labels.forEach((l, i) => { l.textContent = swaps[i][1]; l.classList.remove('swap'); });
    await wait(REDUCED ? 100 : 560);
  }

  async function paraCheck() {
    lockInput(true);
    sceneStart(paraCheck);

    /* the chips go, and the shape is measured */
    feedbackGen++;
    promptTxt.textContent = '';
    caret.hidden = true;
    areaTray.classList.add('off');
    await wait(460);
    await measurePara();
    await heading(PARA3.turn);
    await wait(300);

    /* aside for the questions */
    await layoutWide(para, paraSvg);
    await wait(300);

    /* two questions at once: the base and the height, read off the shape;
       the part named lights up as it is got right */
    const right = () => feedback(FEEDBACK.right);
    const wrong = () => feedback(FEEDBACK.wrong);
    const q1 = questionLine('The base of the parallelogram is',
      [{ v: '8', t: '8 cm' }, { v: '5', t: '5 cm' }, { v: '13', t: '13 cm' }]);
    const q2 = questionLine('The height is',
      [{ v: '5', t: '5 cm' }, { v: '8', t: '8 cm' }, { v: '3', t: '3 cm' }]);
    await showLine(q1.line, paraLines);
    await showLine(q2.line, paraLines);
    lockInput(false);
    await Promise.all([
      q1.dd.ask(v => v === '8', () => { right(); paraShape.classList.add('lit-b'); }, wrong),
      q2.dd.ask(v => v === '5', () => { right(); paraShape.classList.add('lit-h'); }, wrong)
    ]);
    lockInput(true);
    await wait(700);

    /* then the area itself */
    const q3 = questionLine('The area of the parallelogram is',
      [{ v: '40', t: '40 sq. cm' }, { v: '13', t: '13 sq. cm' }, { v: '20', t: '20 sq. cm' }]);
    await showLine(q3.line, paraLines);
    lockInput(false);
    await q3.dd.ask(v => v === '40', right, wrong);
    lockInput(true);
    feedback(FEEDBACK.done);
    onParaWord('para');
    swiftee.play('proud', 1);
    skyConfetti(120, 3200);
    sfx('confetti', .8);
    await wait(2600);
    await showNext();
    await paraAside();
  }

  /* the board goes, and Swiftee looks ahead from its bubble. Its own scene,
     so Replay can re-enter it. */
  async function paraAside() {
    await boardAside(PARA_ASIDE, paraAside);
    await rhombusSection();
  }

  /* ---------- section 7: the rhombus ----------
   * The special parallelogram. Swiftee's aside is over: the bird drops out
   * of the frame, the board comes back blank, and a second parallelogram --
   * sky blue, so it cannot be taken for the amber one -- draws itself in the
   * middle of it. Its two diagonals draw corner to corner and the four
   * angles at their crossing are marked: the obtuse one first, as the
   * lesson is about angles, then the other three, each with its size.
   *
   * Then the learner takes over. The shape is pinned at its bottom-left
   * corner: the bottom runs to the right and the left side up a fixed slant,
   * so two lengths describe it -- a, the top and bottom, and b, the left and
   * right. The point on the top-right corner slides the top side up and
   * down the slant (changing b); the point on the bottom-right corner slides
   * the right side left and right (changing a). Everything is redrawn from a
   * and b every frame: the shape, the diagonals, the four angle marks and
   * their labels. The diagonals of a parallelogram are perpendicular exactly
   * when its sides are all equal, so the moment a and b come within a whisker
   * of each other they lock together and the arcs morph into squares, all
   * four at once, and go green; drag away and they unlock and morph back.
   *
   * Once the learner lets go with them locked: a glow runs right round the
   * shape and leaves a tick on each side, the squares swell, the heading
   * names the shape, and Swiftee hops down to say so. Then Next. */
  const rhom       = document.getElementById('rhom');
  const rhomShape  = document.getElementById('rhomShape');
  const rhomSvg    = document.getElementById('rhomSvg');
  const rhomArt    = rhomSvg.querySelector('.art');
  const rhomLiveG  = document.getElementById('rhomLive');
  const rhomDiagG  = document.getElementById('rhomDiag');
  const rhomMarks  = document.getElementById('rhomMarks');
  const rhomEx     = document.getElementById('rhomEx');
  const rhomHands  = document.getElementById('rhomHandles');
  const rhomHint   = document.getElementById('rhomHint');
  const rhomSay    = document.getElementById('rhomSay');
  const rhomArea   = document.getElementById('rhomArea');
  const rhomTray1  = document.getElementById('rhomTray1');
  const rhomTray2  = document.getElementById('rhomTray2');
  const rhomChips1 = Array.from(rhomTray1.querySelectorAll('.chip'));
  const rhomChips2 = Array.from(rhomTray2.querySelectorAll('.chip'));
  const rhomLines  = document.getElementById('rhomLines');
  const rhomQuiz   = document.getElementById('rhomQuiz');
  const rhomFormula = document.getElementById('rhomFormula');
  const rhomSlots  = Array.from(rhomFormula.querySelectorAll('.fslot'));
  const rhomTray3  = document.getElementById('rhomTray3');
  const rhomChips3 = Array.from(rhomTray3.querySelectorAll('.chip'));
  const rhomPractice = document.getElementById('rhomPractice');
  const figRow     = document.getElementById('figRow');
  const practiceTray = document.getElementById('practiceTray');
  const practiceSay  = document.getElementById('practiceSay');
  const practiceMascot = document.getElementById('practiceMascot');
  const practiceText = document.getElementById('practiceText');
  const rhomMascot = document.getElementById('rhomMascot');
  const rhomText   = document.getElementById('rhomText');
  const rhomTxt    = rhomText.querySelector('.txt');
  const rhomCaret  = rhomText.querySelector('.caret');

  const RHOM = {
    drag:  'Drag the points to make each angle 90 degrees.',
    sides: 'All four sides are equal in length!',
    right: 'And the diagonals meet at a right angle (90°).',
    named: 'A parallelogram with these properties is called a rhombus.',
    final: [{ t: 'This is the special parallelogram called ' }, { t: 'Rhombus', w: 'rhom' }, { t: '.' }]
  };

  /* the say line's ghost holds its whole line from the first frame */
  segSpans(rhomText.querySelector('.type-ghost'), RHOM.final).forEach((el, j) => { el.textContent = RHOM.final[j].t; });

  /* the geometry, in the svg's units: the pinned corner, the slant of the
     left side as a unit vector, the two lengths the shape opens with, how
     far each may be dragged, and how close they must come to lock */
  const RH_BL    = { x: 30, y: 262 };
  const RH_V     = (() => { const l = Math.hypot(60, 150); return { x: 60 / l, y: -150 / l }; })();
  const RH_A0    = 250, RH_B0 = 170;
  const RH_RANGE = { a: [100, 290], b: [100, 258] };
  const RH_SNAP  = 7;
  /* the angle marks: the arc's radius, the square's side (its far corner
     lands about where the arc was) and how many points draw each */
  const ARC_R = 27, SQ_S = 18, ARC_N = 12;
  /* the four angles, each named by the two corners it opens toward,
     clockwise round the crossing */
  const ANGLES = { top: ['TL', 'TR'], right: ['TR', 'BR'], bottom: ['BR', 'BL'], left: ['BL', 'TL'] };
  const ANGLE_KEYS = ['top', 'right', 'bottom', 'left'];
  const RH_ORDER = ['TL', 'TR', 'BR', 'BL'];

  /* what the shape is right now: the two lengths, how far the marks have
     morphed from arc (0) to square (1), and whether the lengths are locked.
     `pose` is null while the shape stands as drawn; the area lesson gives it
     one -- a turn about the crossing of the diagonals, a scale, and where
     the crossing is put -- and everything is drawn through it. */
  let rh = { a: RH_A0, b: RH_B0, morph: 0, snapped: false, pose: null };
  let rhomEls = null;          /* the built pieces, looked up once per build */
  let rhomLive = false;        /* the points can be dragged */
  let rhomDone = null;         /* how the activity is finished, while it is live */
  let rdrag = null;            /* { key, g, off } while a point is held */
  let hintSignal = null;       /* the hint stops when this is marked done */
  let morphGen = 0;

  const rhLerp = (p, q, t) => ({ x: p.x + (q.x - p.x) * t, y: p.y + (q.y - p.y) * t });
  const rhUnit = (p, o) => { const l = Math.hypot(p.x - o.x, p.y - o.y) || 1; return { x: (p.x - o.x) / l, y: (p.y - o.y) / l }; };
  const rhClamp = (v, r) => Math.min(r[1], Math.max(r[0], v));

  /* the four corners and the crossing of the diagonals, from a and b */
  function rhomPts() {
    const BL = RH_BL;
    const BR = { x: BL.x + rh.a, y: BL.y };
    const TL = { x: BL.x + RH_V.x * rh.b, y: BL.y + RH_V.y * rh.b };
    const TR = { x: TL.x + rh.a, y: TL.y };
    const O = { x: (TL.x + BR.x) / 2, y: (TL.y + BR.y) / 2 };
    if (!rh.pose) return { TL: TL, TR: TR, BR: BR, BL: BL, O: O };
    const q = rh.pose, c = Math.cos(q.rot), s = Math.sin(q.rot);
    const tf = p => ({
      x: q.cx + ((p.x - O.x) * c - (p.y - O.y) * s) * q.scale,
      y: q.cy + ((p.x - O.x) * s + (p.y - O.y) * c) * q.scale
    });
    return { TL: tf(TL), TR: tf(TR), BR: tf(BR), BL: tf(BL), O: { x: q.cx, y: q.cy } };
  }

  /* One angle at the crossing, as a run of points: along an arc between the
     two diagonals when morph is 0, along two sides of a small square when it
     is 1, and part way between for anything else. The same number of points
     draw both, so one becomes the other point for point. Also hands back the
     angle's size and the direction of its middle, for the label. */
  function anglePoints(P, key, morph) {
    const O = P.O;
    const d1 = rhUnit(P[ANGLES[key][0]], O), d2 = rhUnit(P[ANGLES[key][1]], O);
    const f1 = Math.atan2(d1.y, d1.x);
    let delta = Math.atan2(d2.y, d2.x) - f1;
    while (delta > Math.PI) delta -= 2 * Math.PI;
    while (delta < -Math.PI) delta += 2 * Math.PI;
    const P1 = { x: O.x + d1.x * SQ_S, y: O.y + d1.y * SQ_S };
    const P2 = { x: O.x + d2.x * SQ_S, y: O.y + d2.y * SQ_S };
    const C  = { x: O.x + (d1.x + d2.x) * SQ_S, y: O.y + (d1.y + d2.y) * SQ_S };
    const pts = [];
    for (let i = 0; i <= ARC_N; i++) {
      const t = i / ARC_N;
      const f = f1 + delta * t;
      const arc = { x: O.x + Math.cos(f) * ARC_R, y: O.y + Math.sin(f) * ARC_R };
      const sq = t < .5 ? rhLerp(P1, C, t * 2) : rhLerp(C, P2, (t - .5) * 2);
      pts.push(rhLerp(arc, sq, morph));
    }
    return {
      pts: pts,
      deg: Math.abs(delta) * 180 / Math.PI,
      bis: { x: Math.cos(f1 + delta / 2), y: Math.sin(f1 + delta / 2) }
    };
  }

  /* everything on the board that depends on a and b, redrawn */
  function renderRhom() {
    if (!rhomEls) return;
    const P = rhomPts();
    const E = rhomEls;
    E.fill.setAttribute('points', RH_ORDER.map(k => pt(P[k])).join(' '));
    E.outline.setAttribute('d', 'M' + RH_ORDER.map(k => fmt(P[k].x) + ' ' + fmt(P[k].y)).join(' L') + ' Z');
    setLine(E.liveTop, P.TL, P.TR);
    setLine(E.liveRight, P.TR, P.BR);
    setLine(E.diag1, P.BL, P.TR);
    setLine(E.diag2, P.TL, P.BR);
    ANGLE_KEYS.forEach(k => {
      const m = anglePoints(P, k, rh.morph);
      const run = m.pts.map(q => fmt(q.x) + ' ' + fmt(q.y)).join(' L');
      E.ang[k].stroke.setAttribute('d', 'M' + run);
      E.ang[k].fill.setAttribute('d', 'M' + fmt(P.O.x) + ' ' + fmt(P.O.y) + ' L' + run + ' Z');
      const L = { x: P.O.x + m.bis.x * (ARC_R + 16), y: P.O.y + m.bis.y * (ARC_R + 16) };
      E.ang[k].lbl.setAttribute('x', fmt(L.x));
      E.ang[k].lbl.setAttribute('y', fmt(L.y));
      E.ang[k].lbl.textContent = Math.round(m.deg) + '°';
    });
    E.handles.TR.setAttribute('transform', 'translate(' + fmt(P.TR.x) + ' ' + fmt(P.TR.y) + ')');
    E.handles.BR.setAttribute('transform', 'translate(' + fmt(P.BR.x) + ' ' + fmt(P.BR.y) + ')');
  }

  /* the shape and everything drawn over it, from the opening lengths -- or,
     with `keep`, from the lengths the learner left it with */
  function buildRhom(keep) {
    rh = keep ? { a: rh.a, b: rh.b, morph: rh.morph, snapped: rh.snapped, pose: null }
              : { a: RH_A0, b: RH_B0, morph: 0, snapped: false, pose: null };
    rhomLive = false;
    rhomDone = null;
    rdrag = null;
    morphGen++;

    rhomArt.innerHTML =
      '<polygon class="shape-fill" clip-path="url(#wipeRhom)" points="" />' +
      '<path class="shape-outline" d="" fill="none" stroke-width="5" />';
    rhomLiveG.innerHTML = '<line class="live-side" /><line class="live-side" />';
    rhomDiagG.innerHTML = '<line class="rhom-diag-line" /><line class="rhom-diag-line" />';
    rhomMarks.innerHTML = ANGLE_KEYS.map(k =>
      '<g class="ang ang-' + k + '" data-angle="' + k + '">' +
        '<path class="ang-fill" /><path class="ang-stroke" />' +
        '<text class="ang-lbl" font-size="12" text-anchor="middle" dominant-baseline="middle"></text>' +
      '</g>').join('');
    rhomEx.innerHTML = '';
    rhomArea.innerHTML = '';
    /* the hit circle is bigger than the dot it serves */
    rhomHands.innerHTML = ['TR', 'BR'].map(k =>
      '<g class="handle" data-h="' + k + '"><circle class="h-ring" r="15" /><circle class="h-dot" r="8" /><circle class="h-hit" r="26" /></g>').join('');
    rhomHint.classList.remove('on');

    const live = rhomLiveG.querySelectorAll('.live-side');
    const diag = rhomDiagG.querySelectorAll('.rhom-diag-line');
    const ang = {};
    ANGLE_KEYS.forEach(k => {
      const g = rhomMarks.querySelector('.ang-' + k);
      ang[k] = { g: g, fill: g.querySelector('.ang-fill'), stroke: g.querySelector('.ang-stroke'), lbl: g.querySelector('.ang-lbl') };
    });
    rhomEls = {
      fill: rhomArt.querySelector('.shape-fill'),
      outline: rhomArt.querySelector('.shape-outline'),
      liveTop: live[0], liveRight: live[1],
      diag1: diag[0], diag2: diag[1],
      ang: ang,
      handles: { TR: rhomHands.querySelector('[data-h="TR"]'), BR: rhomHands.querySelector('[data-h="BR"]') }
    };
    renderRhom();
    rhomShape.className = 'rhom-shape';
  }

  /* a screen position in the rhombus svg's units */
  function rhomPoint(x, y) {
    const p = rhomSvg.createSVGPoint();
    p.x = x; p.y = y;
    const m = rhomSvg.getScreenCTM();
    return m ? p.matrixTransform(m.inverse()) : p;
  }

  /* the lengths lock or unlock: the marks morph between arc and square, all
     four together, and take or lose their green */
  function setSnapped(on) {
    if (rh.snapped === on) return;
    rh.snapped = on;
    rhomShape.classList.toggle('square', on);
    if (on) sfx('click', .5);
    const g = ++morphGen;
    const from = rh.morph, to = on ? 1 : 0;
    tween(380, e => {
      if (g !== morphGen) return;
      rh.morph = from + (to - from) * e;
      renderRhom();
    }, easeInOut);
  }

  /* one of the two lengths has been set by a drag: lock it to the other if
     it is close enough, and redraw */
  function settle(key) {
    if (Math.abs(rh.a - rh.b) < RH_SNAP) {
      if (key === 'a') rh.a = rh.b; else rh.b = rh.a;
      setSnapped(true);
    } else {
      setSnapped(false);
    }
    renderRhom();
  }

  function onHandleDown(e) {
    if (!interactive || !rhomLive || rdrag) return;
    if (e.button !== undefined && e.button !== 0) return;
    e.preventDefault();
    const g = e.currentTarget;
    const key = g.dataset.h;
    const P = rhomPts();
    const q = rhomPoint(e.clientX, e.clientY);
    /* the point is held where it was touched, not by its centre */
    rdrag = { key: key, g: g, off: { x: q.x - P[key].x, y: q.y - P[key].y } };
    g.classList.add('grab');
    /* the learner has taken hold: the hint has done its job */
    if (hintSignal) hintSignal.done = true;
    rhomHint.classList.remove('on');
    sfx('click', .4);
    window.addEventListener('pointermove', onHandleMove);
    window.addEventListener('pointerup', onHandleUp);
    window.addEventListener('pointercancel', onHandleUp);
  }

  function onHandleMove(e) {
    if (!rdrag) return;
    const q = rhomPoint(e.clientX, e.clientY);
    const x = q.x - rdrag.off.x, y = q.y - rdrag.off.y;
    if (rdrag.key === 'BR') {
      /* the right side slides left and right: the top and bottom change length */
      rh.a = rhClamp(x - RH_BL.x, RH_RANGE.a);
      settle('a');
    } else {
      /* the top side slides up and down its slant: the left and right change length */
      const P = rhomPts();
      const t = (x - P.BR.x) * RH_V.x + (y - P.BR.y) * RH_V.y;
      rh.b = rhClamp(t, RH_RANGE.b);
      settle('b');
    }
  }

  function onHandleUp() {
    if (!rdrag) return;
    window.removeEventListener('pointermove', onHandleMove);
    window.removeEventListener('pointerup', onHandleUp);
    window.removeEventListener('pointercancel', onHandleUp);
    rdrag.g.classList.remove('grab');
    rdrag = null;
    /* let go with the lengths locked: the shape is a rhombus */
    if (rh.snapped && rhomDone) rhomDone(false);
  }

  /* the hint: a finger takes hold of the right-hand point and nudges it to
     the left and back, twice, unless the learner takes hold first */
  async function hintRhom(signal) {
    const S = 1.5;                                  /* the hand's scale */
    const at = (x, y) => rhomHint.setAttribute('transform',
      'translate(' + fmt(x - 11.5 * S) + ' ' + fmt(y - 3 * S) + ') scale(' + S + ')');
    await wait(900);
    for (let pass = 0; pass < 2 && !signal.done; pass++) {
      const P = rhomPts();
      const x0 = P.BR.x, y0 = P.BR.y + 4;           /* the fingertip on the point */
      at(x0, y0);
      rhomHint.classList.add('on');
      await wait(320);
      if (signal.done) break;
      await tween(1100, e => at(x0 - 48 * Math.sin(e * Math.PI), y0), easeInOut);
      await wait(200);
    }
    rhomHint.classList.remove('on');
  }

  /* The drag activity. Resolves once the learner lets go with the lengths
     locked; a skip slides the right side across itself. Registered with the
     scene's own waiters, so a replay can let go of it. */
  function awaitRhombus() {
    return waitForScene(resolve => {
      const handles = Array.from(rhomHands.querySelectorAll('.handle'));
      const finish = auto => {
        if (!rhomLive) return;
        rhomLive = false;
        rhomDone = null;
        skipFills.delete(fill);
        lockInput(true);
        if (hintSignal) hintSignal.done = true;
        rhomHint.classList.remove('on');
        handles.forEach(h => h.removeEventListener('pointerdown', onHandleDown));
        rhomShape.classList.remove('live');
        rhomShape.classList.add('done');
        sfx('correct', auto ? .55 : 1);
        if (!auto) swiftee.play('happy', 1);
        resolve();
      };
      const fill = async () => {
        if (!rhomLive) return;
        if (rdrag) onHandleUp();
        const from = rh.a, to = rh.b;
        await tween(700, e => { rh.a = from + (to - from) * e; renderRhom(); }, easeInOut);
        setSnapped(true);
        finish(true);
      };
      rhomLive = true;
      rhomDone = finish;
      skipFills.add(fill);
      handles.forEach(h => h.addEventListener('pointerdown', onHandleDown));
      lockInput(false);
    });
  }

  /* the sides are shown equal: a glow runs right round the shape from the
     pinned corner, and as it passes the middle of each side a tick lands
     there; then the outline glows as a whole and the glow fades */
  async function sweepSides() {
    const P = rhomPts();
    const order = ['BL', 'TL', 'TR', 'BR'];
    let ex = '<path class="rhom-sweep" d="M' + order.map(k => fmt(P[k].x) + ' ' + fmt(P[k].y)).join(' L') + ' Z" />';
    order.forEach((k, i) => {
      const A = P[k], B = P[order[(i + 1) % 4]];
      const u = rhUnit(B, A), n = { x: -u.y, y: u.x };
      const C = { x: (A.x + B.x) / 2, y: (A.y + B.y) / 2 }, t = 10;
      const d = 'M' + fmt(C.x + n.x * t) + ' ' + fmt(C.y + n.y * t) + ' L' + fmt(C.x - n.x * t) + ' ' + fmt(C.y - n.y * t);
      ex += '<g class="eq-mark"><path class="halo" d="' + d + '" /><path class="ink" d="' + d + '" /></g>';
    });
    rhomEx.innerHTML = ex;
    const sweep = rhomEx.querySelector('.rhom-sweep');
    const ticks = Array.from(rhomEx.querySelectorAll('.eq-mark'));
    let total = 1000;
    try { total = sweep.getTotalLength() || total; } catch (e) { /* keep guard */ }
    sweep.style.strokeDasharray = total;
    sweep.style.strokeDashoffset = total;
    sweep.classList.add('on');
    let landed = 0;
    await tween(2200, e => {
      sweep.style.strokeDashoffset = total * (1 - e);
      while (landed < ticks.length && e >= (landed + .5) / ticks.length) {
        ticks[landed].classList.add('on');
        sfx('click', .3);
        landed++;
      }
    }, easeInOut);
    ticks.forEach(t => t.classList.add('on'));
    rhomShape.classList.add('equal');
    await wait(REDUCED ? 200 : 700);
    sweep.classList.remove('on');
    await wait(500);
  }

  async function rhombusSection() {
    lockInput(true);
    sceneStart(rhombusSection);
    const mine = runToken;

    /* 1. the aside ends: the bubble pops away and Swiftee drops out of the
          frame, as it did before the board first arrived */
    bubble.classList.add('out');
    bubble.classList.remove('show');
    await wait(300);
    await introExit();
    intro.classList.remove('on', 'aside');

    /* the board comes back blank: the parallelogram scenes are cleared off
       it while it is still invisible, and the heading's ghost takes the
       longest line of this scene while there is nothing on the board to move */
    board.classList.add('sec5');
    promptGhost.textContent = longest([RHOM.drag, RHOM.sides, RHOM.right, RHOM.named]);
    buildRhom();
    await wait(200);
    await showBoard();
    await wait(300);

    /* 2. the parallelogram: outline first, then the colour. The outline is
          about to change shape under the learner's hand, so the dash the
          reveal drew it with is lifted -- a dash sized to the old perimeter
          would open a gap in the new one. */
    rhom.classList.add('on');
    rhom.setAttribute('aria-hidden', 'false');
    await wait(120);
    await revealShape(rhomShape);
    rhomEls.outline.style.strokeDasharray = 'none';
    rhomEls.outline.style.strokeDashoffset = '0';
    await wait(500);

    /* 3. the diagonals, corner to corner; then the obtuse angle takes its
          arc, then the other three, and each is labelled with its size */
    await growLine(rhomEls.diag1, 720);
    await wait(140);
    await growLine(rhomEls.diag2, 720);
    await wait(420);
    rhomEls.ang.top.g.classList.add('show');
    sfx('click', .4);
    await wait(REDUCED ? 300 : 1000);
    for (const k of ['right', 'bottom', 'left']) {
      rhomEls.ang[k].g.classList.add('show');
      sfx('click', .3);
      await wait(180);
    }
    await wait(420);
    rhomShape.classList.add('degrees');
    await wait(REDUCED ? 300 : 900);

    /* 4. Swiftee jumps up from behind the board to the heading; the two
          sides light up with their points, and the learner is asked to
          make the angles right angles. A finger shows the first nudge. */
    await mascotJumpIn();
    await wait(260);
    rhomShape.classList.add('live');
    await wait(300);
    await heading(RHOM.drag);
    /* the finger shows the first nudge once the learner is free to move,
       and stands down the moment they take hold themselves */
    hintSignal = { done: false };
    hintRhom(hintSignal);
    await awaitRhombus();
    /* A replay (or Back) lets go of the wait above too, having already
       retired this run of the scene -- so a wait() from here on would take
       the fresh token as its own and carry on. The retired frame unwinds
       here instead, before it can start the celebration on the fresh scene. */
    if (mine !== runToken) throw CANCELLED;

    /* 5. a rhombus: "Well Done!", confetti, and Swiftee is proud */
    feedback(FEEDBACK.done);
    swiftee.play('proud', 1);
    skyConfetti(100, 3000);
    sfx('confetti', .7);
    await wait(2200);

    /* 6. the showcase: the rhombus settles to one size in the middle of
          the board, whichever point made it; then the sides are shown
          equal, the right angles are pointed at, and the shape is named */
    feedbackGen++;
    rhomShape.classList.add('clean');
    await wait(300);
    await poseTo(settledPose(0), 1100);
    await wait(300);
    let say = heading(RHOM.sides);
    await wait(300);
    await sweepSides();
    await say;
    await wait(700);
    say = heading(RHOM.right);
    await wait(500);
    rhomShape.classList.remove('pulse-sq');
    void rhomShape.offsetWidth;
    rhomShape.classList.add('pulse-sq');
    sfx('click', .45);
    await say;
    await wait(1100);
    await heading(RHOM.named);
    await wait(1400);

    /* 7. Swiftee hops down beside the shape and says so */
    feedbackGen++;
    promptTxt.textContent = '';
    caret.hidden = true;
    rhomSay.classList.add('show');
    await hopBetween(boardMascot, rhomMascot);
    await wait(240);
    swiftee.hold('talking');
    await typeSegments(rhomTxt, rhomCaret, RHOM.final, TYPE_MS, 320, null);
    swiftee.release();
    await wait(300);
    swiftee.play('happy', 1);
    await wait(1400);

    /* 8. the activity is complete: Next */
    await showNext();
    await rhombusArea();
  }

  /* ---------- the area of the rhombus ----------
   * The same rhombus the learner made, carried on with. Swiftee ducks
   * behind the board and the shape turns about the crossing of its
   * diagonals until the long one lies flat, growing or shrinking to one
   * size on the way, so whatever rhombus was made the lesson is laid out
   * the same. The long diagonal is drawn as d1 and the short one as d2,
   * with the right angle between them marked, and Swiftee jumps up to the
   * heading. Then d2 leaves: the lower half shades green and its height --
   * half of d2 -- drops from the crossing, and the learner picks its area
   * from two formulas; the upper half in purple, with its own height, and
   * the same question. Then the shape moves left and the working types out
   * beside it: the two triangles, and the rhombus as their sum. */
  const RHOM2 = {
    here:   'Here, is a Rhombus.',
    askG:   'Choose the correct area of the green triangle.',
    rightG: 'That’s Correct! Area of the green triangle = ½ × d₁ × h₁.',
    askP:   'Choose the correct area of the purple triangle.',
    rightP: 'That’s Correct! Area of the purple triangle = ½ × d₁ × h₂.',
    sum:    'Let’s find the area of the whole rhombus.'
  };
  const RHOM_D1 = 330;                    /* how long the long diagonal is shown, once settled */
  const RHOM_CENTRE = { x: 220, y: 148 }; /* where the crossing is put: the middle of the viewBox */

  /* the long diagonal (bottom-left to top-right) as the shape stands, before
     any pose */
  function rawDiag() {
    return { dx: rh.a + RH_V.x * rh.b, dy: RH_V.y * rh.b };
  }

  /* the pose that shows the shape at one size in the middle of the board,
     turned by `rot` */
  function settledPose(rot) {
    const d = rawDiag();
    return { rot: rot || 0, scale: RHOM_D1 / Math.hypot(d.dx, d.dy), cx: RHOM_CENTRE.x, cy: RHOM_CENTRE.y };
  }

  /* glide from the pose the shape has to another */
  async function poseTo(target, ms) {
    let from = rh.pose;
    if (!from) { const O = rhomPts().O; from = { rot: 0, scale: 1, cx: O.x, cy: O.y }; }
    await tween(ms, e => {
      rh.pose = {
        rot:   from.rot   + (target.rot   - from.rot)   * e,
        scale: from.scale + (target.scale - from.scale) * e,
        cx:    from.cx    + (target.cx    - from.cx)    * e,
        cy:    from.cy    + (target.cy    - from.cy)    * e
      };
      renderRhom();
    }, easeInOut);
  }

  /* the working: every word that names a part of the drawing is its own
     span, so it lights up -- and lights the part it names -- as it lands */
  const RHOM_LINES = [
    [{ t: 'Area of ' }, { t: 'Green Triangle', w: 'green' },  { t: ' = ½ × ' }, { t: 'd₁', w: 'd1' }, { t: ' × ' }, { t: 'h₁', w: 'h1' }],
    [{ t: 'Area of ' }, { t: 'Purple Triangle', w: 'purple' }, { t: ' = ½ × ' }, { t: 'd₁', w: 'd1' }, { t: ' × ' }, { t: 'h₂', w: 'h2' }],
    [{ t: 'Area of ' }, { t: 'Rhombus', w: 'rhom' }, { t: ' = Area of ' }, { t: 'Green Triangle', w: 'green' }, { t: ' + Area of ' }, { t: 'Purple Triangle', w: 'purple' }],
    [{ t: 'Area of ' }, { t: 'Rhombus', w: 'rhom' }, { t: ' = ½ × d₁ × h₁ + ½ × d₁ × h₂' }]
  ];

  const areaEl = cls => rhomArea.querySelector('.' + cls);

  /* the lesson's marks, laid over the tilted shape: the diagonals with their
     names, a right angle in the upper-right corner of the crossing and one in
     the lower-right, and the two heights with theirs. The halves of the
     shape go into the art, under the outline. */
  function buildRhomArea() {
    const P = rhomPts();
    const O = P.O, M = 12;
    const ln = (cls, a, b) => '<line class="' + cls + '" x1="' + fmt(a.x) + '" y1="' + fmt(a.y) + '" x2="' + fmt(b.x) + '" y2="' + fmt(b.y) + '" />';
    const lbl = (cls, x, y, anchor, text) => '<text class="rd-lbl ' + cls + '" x="' + fmt(x) + '" y="' + fmt(y) + '" font-size="17" text-anchor="' + anchor + '" dominant-baseline="middle">' + text + '</text>';
    rhomArea.innerHTML =
      ln('rd rd-d1', P.BL, P.TR) +
      ln('rd rd-d2', P.BR, P.TL) +
      ln('rd rd-h rd-h1', O, P.BR) +
      ln('rd rd-h rd-h2', O, P.TL) +
      '<path class="rmark mark-up" d="M' + fmt(O.x) + ' ' + fmt(O.y - M) + ' H' + fmt(O.x + M) + ' V' + fmt(O.y) + '" />' +
      '<path class="rmark mark-down" d="M' + fmt(O.x) + ' ' + fmt(O.y + M) + ' H' + fmt(O.x + M) + ' V' + fmt(O.y) + '" />' +
      lbl('lbl-d1', O.x - 62, O.y + 18, 'middle', 'd₁') +
      lbl('lbl-d2', O.x + 14, (O.y + P.TL.y) / 2, 'start', 'd₂') +
      lbl('lbl-h lbl-h1', O.x + 14, (O.y + P.BR.y) / 2, 'start', 'h₁') +
      lbl('lbl-h lbl-h2', O.x + 14, (O.y + P.TL.y) / 2, 'start', 'h₂');

    const outline = rhomEls.outline;
    const half = (cls, a, b, c) => {
      const el = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
      el.setAttribute('class', 'tri-fill ' + cls);
      el.setAttribute('points', pt(a) + ' ' + pt(b) + ' ' + pt(c));
      outline.parentNode.insertBefore(el, outline);
    };
    half('c-green rt-green',   P.BL, P.BR, P.TR);
    half('c-purple rt-purple', P.BL, P.TL, P.TR);
  }

  /* the diagonal, or a height, grows along its line and takes its name */
  async function drawDiag(cls, label, ms) {
    await growLine(areaEl(cls), ms || 700);
    areaEl(label).classList.add('on');
    sfx('click', .35);
    await wait(REDUCED ? 160 : 480);
  }

  /* a key word of the working lands: light what it names */
  function onRhomWord(w) {
    if (w === 'green' || w === 'purple') { pulseTri(rhomShape, w); return; }
    if (w === 'd1' || w === 'h1' || w === 'h2') { rhomShape.classList.add('lit-' + w); return; }
    /* the whole shape: both halves swell and the outline glows */
    pulseTri(rhomShape, 'purple');
    pulseTri(rhomShape, 'green');
    rhomShape.classList.remove('lit-quad');
    void rhomShape.offsetWidth;
    rhomShape.classList.add('lit-quad');
  }

  /* the shape turns about the crossing of its diagonals until the long one
     lies flat, is brought to one size, and is put in the middle */
  async function tiltRhom() {
    const d = rawDiag();
    await poseTo(settledPose(-Math.atan2(d.dy, d.dx)), 1600);
  }

  async function rhombusArea() {
    lockInput(true);
    sceneStart(rhombusArea);
    const mine = runToken;
    promptGhost.textContent = longest(Object.keys(RHOM2).map(k => RHOM2[k]));

    /* 1. the last scene clears: Swiftee ducks behind the board from beside
          the shape, its line goes, and the shape stands alone */
    feedbackGen++;
    promptTxt.textContent = '';
    caret.hidden = true;
    rhom.classList.remove('wide', 'numbers');
    rhomLines.textContent = '';
    /* a replay has taken the built shape away: it is built again from the
       lengths the learner left it with, already revealed */
    if (!rhomEls || !rhomArt.contains(rhomEls.outline)) {
      buildRhom(true);
      rhomEls.fill.style.opacity = 1;
      rhomEls.outline.style.strokeDasharray = 'none';
      rhomEls.outline.style.strokeDashoffset = '0';
      rhomEls.diag1.style.opacity = 1;
      rhomEls.diag2.style.opacity = 1;
      rhomShape.classList.add('square', 'done', 'clean');
      ANGLE_KEYS.forEach(k => rhomEls.ang[k].g.classList.add('show'));
      rh.pose = settledPose(0);
      renderRhom();
    } else {
      rhomArea.innerHTML = '';
      rhomArt.querySelectorAll('.tri-fill').forEach(el => el.remove());
      renderRhom();
    }
    if (rhomMascot.classList.contains('in')) await mascotJumpOut(rhomMascot);
    rhomSay.classList.remove('show');
    await wait(500);

    /* 2. the tilt: the marks of the last scene fade as the shape turns */
    rhomShape.classList.add('tilt');
    rhomEls.diag1.style.opacity = '';
    rhomEls.diag2.style.opacity = '';
    await wait(200);
    await tiltRhom();
    await wait(400);

    /* 3. d1 along the flat diagonal, d2 up the other, the right angle
          between them; Swiftee jumps up and names the shape */
    buildRhomArea();
    await drawDiag('rd-d1', 'lbl-d1', 760);
    await drawDiag('rd-d2', 'lbl-d2', 620);
    areaEl('mark-up').classList.add('on');
    sfx('click', .4);
    await wait(REDUCED ? 200 : 700);
    await mascotJumpIn();
    await wait(240);
    await heading(RHOM2.here);
    await wait(1400);

    /* 4. d2 leaves; the lower half shades green and its height drops from
          the crossing; which formula is its area? */
    areaEl('rd-d2').style.opacity = '';
    areaEl('lbl-d2').classList.remove('on');
    areaEl('mark-up').classList.remove('on');
    await wait(560);
    rhomShape.classList.add('fill-green');
    pulseTri(rhomShape, 'green');
    await wait(700);
    await drawDiag('rd-h1', 'lbl-h1', 560);
    areaEl('mark-down').classList.add('on');
    await wait(400);
    await dealChips(rhomChips1);
    await wait(200);
    await heading(RHOM2.askG);
    await askChips(rhomChips1, 'half');
    if (mine !== runToken) throw CANCELLED;
    await heading(RHOM2.rightG);
    await wait(1600);

    /* 5. the green steps back; the upper half shades purple with its own
          height, and the same question */
    rhomTray1.classList.add('off');
    rhomShape.classList.add('quiet-green');
    areaEl('mark-down').classList.remove('on');
    areaEl('rd-h1').style.opacity = '';
    areaEl('lbl-h1').classList.remove('on');
    await wait(560);
    rhomShape.classList.add('fill-purple');
    pulseTri(rhomShape, 'purple');
    await wait(700);
    await drawDiag('rd-h2', 'lbl-h2', 560);
    areaEl('mark-up').classList.add('on');
    await wait(400);
    await dealChips(rhomChips2);
    await wait(200);
    await heading(RHOM2.askP);
    await askChips(rhomChips2, 'half');
    if (mine !== runToken) throw CANCELLED;
    await heading(RHOM2.rightP);
    swiftee.play('happy', 1);
    await wait(1800);
    await showNext();
    await rhombusSum();
  }

  /* ---- the sum ----
     Its own function so that it, like every other scene, has a re-entry
     point Replay can call. The chips go, both halves come fully on with
     both heights, the shape moves to the left, and the working types out
     on the right. */
  async function rhombusSum() {
    lockInput(true);
    sceneStart(rhombusSum);
    promptGhost.textContent = longest(Object.keys(RHOM2).map(k => RHOM2[k]));
    feedbackGen++;
    promptTxt.textContent = '';
    caret.hidden = true;

    /* a replay comes back to a bare shape: everything the lesson drew is put
       back as it stood at the hand-off */
    if (ensureTilted()) {
      areaEl('rd-h2').style.opacity = 1;
      ['lbl-h2', 'mark-up'].forEach(c => areaEl(c).classList.add('on'));
      rhomShape.classList.add('fill-green', 'quiet-green', 'fill-purple');
      if (!boardMascot.classList.contains('in')) boardMascot.classList.add('in');
    }
    rhomTray2.classList.add('off');
    rhom.classList.remove('wide', 'numbers');
    rhomLines.textContent = '';
    rhomLines.classList.remove('off');
    await wait(460);

    /* 1. both halves fully on, both heights in */
    rhomShape.classList.remove('quiet-green');
    await drawDiag('rd-h1', 'lbl-h1', 520);
    areaEl('mark-down').classList.add('on');
    await heading(RHOM2.sum);
    await wait(600);

    /* 2. the shape moves to the left, and the working follows on the right:
          each triangle, and the rhombus as the two together */
    await layoutWide(rhom, rhomSvg);
    await wait(300);
    await showTypedLine(RHOM_LINES[0], rhomLines, onRhomWord);
    await wait(760);
    await showTypedLine(RHOM_LINES[1], rhomLines, onRhomWord);
    await wait(760);
    await showTypedLine(RHOM_LINES[2], rhomLines, onRhomWord);
    await wait(760);
    await showTypedLine(RHOM_LINES[3], rhomLines, onRhomWord);
    feedback(FEEDBACK.done);
    swiftee.play('proud', 1);
    skyConfetti(120, 3200);
    sfx('confetti', .8);
    await wait(2600);
    await showNext();
    await rhombusNumbers();
  }

  /* The tilted rhombus with d1 drawn along it, put back if a replay has
     taken it away. Returns true when it had to be rebuilt, so the scene can
     add whatever else it had on the shape at its hand-off. */
  function ensureTilted() {
    if (rhomEls && rhomArt.contains(rhomEls.outline) && rhomArea.firstChild) return false;
    if (!rhomEls || !rhomArt.contains(rhomEls.outline)) {
      buildRhom(true);
      rhomEls.fill.style.opacity = 1;
      rhomEls.outline.style.strokeDasharray = 'none';
      rhomEls.outline.style.strokeDashoffset = '0';
    }
    const d = rawDiag();
    rh.pose = settledPose(-Math.atan2(d.dy, d.dx));
    renderRhom();
    rhomShape.classList.add('tilt', 'done', 'clean');
    buildRhomArea();
    areaEl('rd-d1').style.opacity = 1;
    areaEl('lbl-d1').classList.add('on');
    return true;
  }

  /* ---------- the numbers ----------
   * The working leaves and the shape comes back to the middle, plain again
   * with both diagonals and the right angle between them. Swiftee asks for
   * the two lengths to be dragged into the formula; the diagonals are
   * measured off the shape -- a two-headed arrow under d1 reading 16 cm, one
   * up the right of d2 reading 12 cm -- and the formula appears under the
   * shape with two empty slots and four lengths to choose from. Either
   * length may go in either slot; a wrong one is shaken off. Both in, the
   * answer is said in the heading, and Next. */
  const NUM = {
    drag:  'Drag the two lengths into the formula.',
    right: 'That’s Correct! Area = ½ × 16 × 12 = 96 sq. cm'
  };
  const NUM_D1 = '16 cm', NUM_D2 = '12 cm';
  const NUM_NEED = ['16', '12'];

  const dimEl = cls => rhomArea.querySelector('.' + cls);

  /* the two measurements, laid over the settled shape: for each, a dotted
     line out from each end of the diagonal, a two-headed arrow between them
     and the length written on it */
  function buildRhomDims() {
    const P = rhomPts();
    const H = 9;
    const ln = (cls, a, b) => '<line class="' + cls + '" x1="' + fmt(a.x) + '" y1="' + fmt(a.y) + '" x2="' + fmt(b.x) + '" y2="' + fmt(b.y) + '" />';
    /* an arrowhead at `tip`, pointing along (dx, dy) */
    const head = (tip, dx, dy) => {
      const nx = -dy, ny = dx;
      return '<path class="d-head" d="M' + fmt(tip.x - dx * H + nx * H * .65) + ' ' + fmt(tip.y - dy * H + ny * H * .65) +
             ' L' + fmt(tip.x) + ' ' + fmt(tip.y) +
             ' L' + fmt(tip.x - dx * H - nx * H * .65) + ' ' + fmt(tip.y - dy * H - ny * H * .65) + '" />';
    };
    /* d1: under the shape */
    const y = P.BR.y + 16;
    const A = { x: P.BL.x, y: y }, B = { x: P.TR.x, y: y };
    let g = '<g class="d-group d-d1">' +
      ln('d-ext', P.BL, A) + ln('d-ext', P.TR, B) +
      ln('d-arrow', A, B) + head(A, -1, 0) + head(B, 1, 0) +
      '<text class="d-label" x="' + fmt((A.x + B.x) / 2) + '" y="' + fmt(y) + '" font-size="19" text-anchor="middle" dominant-baseline="middle">' + NUM_D1 + '</text>' +
    '</g>';
    /* d2: up the right of the shape, its length written along the arrow */
    const x = P.TR.x + 24;
    const C = { x: x, y: P.TL.y }, D = { x: x, y: P.BR.y };
    const my = (C.y + D.y) / 2;
    g += '<g class="d-group d-d2">' +
      ln('d-ext', P.TL, C) + ln('d-ext', P.BR, D) +
      ln('d-arrow', C, D) + head(C, 0, -1) + head(D, 0, 1) +
      '<text class="d-label" x="' + fmt(x) + '" y="' + fmt(my) + '" font-size="19" text-anchor="middle" dominant-baseline="middle" ' +
        'transform="rotate(-90 ' + fmt(x) + ' ' + fmt(my) + ')">' + NUM_D2 + '</text>' +
    '</g>';
    rhomArea.insertAdjacentHTML('beforeend', g);
  }

  /* a measurement comes on: the dotted lines run out from the corners, the
     arrow grows between them, and the heads and the length appear */
  async function showDim(cls) { await showDimGroup(dimEl(cls)); }
  async function showDimGroup(g) {
    const ext = Array.from(g.querySelectorAll('.d-ext'));
    await Promise.all(ext.map(l => growLine(l, 380)));
    ext.forEach(l => { l.style.opacity = .7; });
    await growLine(g.querySelector('.d-arrow'), 720);
    g.classList.add('on');
    sfx('click', .35);
    await wait(REDUCED ? 160 : 520);
  }

  /* The drag. Its own small plumbing, on the warm-up's pattern: a copy of
     the chip follows the pointer, the slot under it lights, and a release
     over a slot is judged. A chip may also be tapped and then a slot tapped.
     Either of the two lengths may go in either slot, but not the same one
     twice; a wrong one is shaken off and stays in the tray. A skip docks the
     two itself; a replay takes the listeners off. */
  function dragLengths() {
    return waitForScene(resolve => {
      let ldrag = null, lpicked = null, over = false;
      const filled = () => rhomSlots.filter(s => s.classList.contains('filled'));
      const taken  = () => filled().map(s => s.querySelector('.chip').dataset.len);
      const slotAt = (x, y) => rhomSlots.find(s => {
        const r = s.getBoundingClientRect();
        return x >= r.left && x <= r.right && y >= r.top && y <= r.bottom;
      }) || null;
      const clearOver = () => rhomSlots.forEach(s => s.classList.remove('over'));
      const unpick = () => { if (lpicked) lpicked.classList.remove('picked'); lpicked = null; };

      const dockLen = (chip, slot, earned) => {
        slot.appendChild(chip);
        slot.classList.add('filled');
        chip.classList.remove('picked', 'dragging');
        chip.disabled = true;
        slot.classList.add('correct');
        setTimeout(() => slot.classList.remove('correct'), 520);
        rhomShape.classList.add(chip.dataset.len === '16' ? 'lit-d1' : 'lit-d2');
        sfx('correct', earned ? 1 : .55);
        if (earned) {
          swiftee.play('happy', 1);
          sfx('confetti', .55);
          requestAnimationFrame(() => burst(chip));
        }
      };

      const tryPlace = (chip, slot) => {
        if (!slot || slot.classList.contains('filled')) return;
        const ok = NUM_NEED.indexOf(chip.dataset.len) !== -1 && taken().indexOf(chip.dataset.len) === -1;
        if (!ok) {
          sfx('wrong');
          feedback(FEEDBACK.wrong);
          swiftee.play('confused', 1);
          slot.classList.add('reject');
          chip.classList.add('reject');
          setTimeout(() => { slot.classList.remove('reject'); chip.classList.remove('reject'); }, 430);
          return;
        }
        dockLen(chip, slot, true);
        if (filled().length === rhomSlots.length) finish(false);
        else feedback(FEEDBACK.right);
      };

      const onDownL = e => {
        if (!interactive || over) return;
        const chip = e.currentTarget;
        if (chip.disabled) return;
        if (e.button !== undefined && e.button !== 0) return;
        const rect = chip.getBoundingClientRect();
        const ghost = chip.cloneNode(true);
        ghost.classList.add('ghost');
        Object.assign(ghost.style, {
          position: 'fixed', left: rect.left + 'px', top: rect.top + 'px',
          width: rect.width + 'px', height: rect.height + 'px',
          margin: 0, pointerEvents: 'none', zIndex: 999, transform: 'scale(1.05)'
        });
        document.body.appendChild(ghost);
        chip.classList.add('dragging');
        unpick();
        sfx('click', .5);
        ldrag = { el: chip, ghost: ghost, offsetX: e.clientX - rect.left, offsetY: e.clientY - rect.top, start: { x: e.clientX, y: e.clientY } };
        window.addEventListener('pointermove', onMoveL);
        window.addEventListener('pointerup', onUpL);
        window.addEventListener('pointercancel', onUpL);
        e.preventDefault();
      };
      const onMoveL = e => {
        if (!ldrag) return;
        ldrag.ghost.style.left = (e.clientX - ldrag.offsetX) + 'px';
        ldrag.ghost.style.top  = (e.clientY - ldrag.offsetY) + 'px';
        clearOver();
        const slot = slotAt(e.clientX, e.clientY);
        if (slot && !slot.classList.contains('filled')) slot.classList.add('over');
      };
      const onUpL = e => {
        if (!ldrag) return;
        window.removeEventListener('pointermove', onMoveL);
        window.removeEventListener('pointerup', onUpL);
        window.removeEventListener('pointercancel', onUpL);
        const { el, ghost, start } = ldrag;
        ldrag = null;
        ghost.remove();
        el.classList.remove('dragging');
        clearOver();
        const slot = slotAt(e.clientX, e.clientY);
        if (slot) return tryPlace(el, slot);
        /* a tap, not a drag: the chip waits for a slot to be tapped */
        if (Math.hypot(e.clientX - start.x, e.clientY - start.y) < 6) {
          lpicked = el;
          el.classList.add('picked');
        }
      };
      const onSlotTap = e => {
        if (!interactive || !lpicked) return;
        const chip = lpicked;
        unpick();
        tryPlace(chip, e.currentTarget);
      };

      const cleanup = () => {
        rhomChips3.forEach(c => c.removeEventListener('pointerdown', onDownL));
        rhomSlots.forEach(s => s.removeEventListener('click', onSlotTap));
        window.removeEventListener('pointermove', onMoveL);
        window.removeEventListener('pointerup', onUpL);
        window.removeEventListener('pointercancel', onUpL);
        if (ldrag) { ldrag.ghost.remove(); ldrag.el.classList.remove('dragging'); ldrag = null; }
        clearOver();
        unpick();
        skipFills.delete(fill);
        sceneWaiters.delete(teardown);
      };
      const finish = auto => {
        if (over) return;
        over = true;
        cleanup();
        lockInput(true);
        resolve();
      };
      /* a skip: the two right lengths go in by themselves */
      const fill = () => {
        if (over) return;
        const free = () => rhomSlots.find(s => !s.classList.contains('filled'));
        NUM_NEED.forEach(v => {
          if (taken().indexOf(v) !== -1) return;
          const chip = rhomChips3.find(c => c.dataset.len === v && !c.disabled);
          const slot = free();
          if (chip && slot) dockLen(chip, slot, false);
        });
        finish(true);
      };
      /* a replay retires the scene while the drag is open */
      const teardown = () => { over = true; cleanup(); };

      rhomChips3.forEach(c => c.addEventListener('pointerdown', onDownL));
      rhomSlots.forEach(s => s.addEventListener('click', onSlotTap));
      sceneWaiters.add(teardown);
      skipFills.add(fill);
      lockInput(false);
    });
  }

  async function rhombusNumbers() {
    lockInput(true);
    sceneStart(rhombusNumbers);
    const mine = runToken;
    promptGhost.textContent = longest([NUM.drag, NUM.right]);
    feedbackGen++;
    promptTxt.textContent = '';
    caret.hidden = true;

    /* a replay comes back to a bare shape, and to lengths still sitting in
       the slots they were dropped in: the shape is put back and the lengths
       go home */
    const rebuilt = ensureTilted();
    rhomChips3.forEach(c => { rhomTray3.appendChild(c); c.disabled = false; });
    rhomArea.querySelectorAll('.d-group').forEach(g => g.remove());
    if (!boardMascot.classList.contains('in')) boardMascot.classList.add('in');

    /* 1. the working leaves; the shape keeps the left two fifths and the
          right three fifths are cleared for the formula */
    rhomLines.classList.add('off');
    await wait(450);
    rhom.classList.add('numbers');
    await layoutWide(rhom, rhomSvg, true);
    rhomLines.textContent = '';
    rhomLines.classList.remove('off');

    /* 2. the halves and their heights leave; d2 comes back, so the shape
          stands plain with both diagonals and the right angle between them */
    rhomShape.classList.remove('fill-green', 'quiet-green', 'fill-purple', 'lit-d1', 'lit-d2', 'lit-h1', 'lit-h2', 'lit-quad');
    ['rd-h1', 'rd-h2'].forEach(c => { areaEl(c).style.opacity = ''; });
    ['lbl-h1', 'lbl-h2', 'mark-down'].forEach(c => areaEl(c).classList.remove('on'));
    await wait(600);
    if (rebuilt) {
      areaEl('rd-d2').style.opacity = 1;
      areaEl('lbl-d2').classList.add('on');
    } else {
      await drawDiag('rd-d2', 'lbl-d2', 620);
    }
    areaEl('mark-up').classList.add('on');
    await wait(400);

    /* 3. Swiftee asks */
    await heading(NUM.drag);
    await wait(300);

    /* 4. the diagonals are measured */
    buildRhomDims();
    await showDim('d-d1');
    await showDim('d-d2');
    await wait(200);

    /* 5. the formula, then the lengths, then the drag */
    rhomQuiz.classList.add('show');
    await wait(200);
    rhomFormula.classList.add('show');
    sfx('click', .3);
    await wait(REDUCED ? 160 : 520);
    await dealChips(rhomChips3);
    await dragLengths();
    if (mine !== runToken) throw CANCELLED;

    /* 6. both lengths are in: the answer, and on */
    feedback(FEEDBACK.done);
    onRhomWord('rhom');
    await wait(900);
    await heading(NUM.right);
    swiftee.play('proud', 1);
    skyConfetti(120, 3200);
    sfx('confetti', .8);
    await wait(2400);
    await showNext();
    await rhombusPractice1();
  }

  /* ---------- practice ----------
   * Four questions, a Next between each. The first is asked of the measured
   * rhombus itself. For the rest the rhombus fades and figures built for
   * the question draw themselves in its place. Answers are chips under the
   * shape, as before, except for the comparison, where the figures
   * themselves (or the names under them) are tapped. */
  const PRACTICE = {
    area:     'Choose the correct area.',
    areaOk:   'That’s Correct! ½ × 16 × 12 = 96 sq. cm',
    find:     'This rhombus has an area of 240 sq. cm. Find the other diagonal.',
    findOk:   'That’s Correct! ½ × 30 × d₂ = 240, so d₂ = 16 cm.',
    larger:   'Tap the rhombus with the larger area.',
    largerLine: [{ t: 'Rhombus II', w: 'rhom' }, { t: ' is larger – a longer diagonal alone does not decide it.' }],
    which:    'Which formula can you use here?',
    whichOk:  'That’s Correct! No diagonals are given, so use base × height.'
  };
  const PRACTICE_GHOST = [PRACTICE.area, PRACTICE.areaOk, PRACTICE.find, PRACTICE.findOk, PRACTICE.larger, PRACTICE.which, PRACTICE.whichOk];

  /* the banner's ghost holds its whole line from the first frame */
  segSpans(practiceText.querySelector('.type-ghost'), PRACTICE.largerLine).forEach((el, j) => { el.textContent = PRACTICE.largerLine[j].t; });
  const practiceTxt = practiceText.querySelector('.txt');
  const practiceCaret = practiceText.querySelector('.caret');

  /* the answers to a question: chips built fresh each time */
  function practiceChips(list, tray) {
    tray = tray || practiceTray;
    tray.classList.remove('off');
    tray.innerHTML = list.map(c =>
      '<button class="chip' + (c.formula ? ' formula' : '') + '" type="button" data-answer="' + c.v + '"><span>' + c.t + '</span></button>').join('');
    return Array.from(tray.querySelectorAll('.chip'));
  }

  /* ---- the figures ----
   * Each is its own little shape, in a 360 x 260 box: a fill behind a wipe,
   * an outline that draws itself, and the lesson's marks over it. */
  const FIG_W = 360, FIG_H = 260;
  const figLine = (cls, a, b) => '<line class="' + cls + '" x1="' + fmt(a.x) + '" y1="' + fmt(a.y) + '" x2="' + fmt(b.x) + '" y2="' + fmt(b.y) + '" />';
  const figHead = (tip, dx, dy) => {
    const H = 9, nx = -dy, ny = dx;
    return '<path class="d-head" d="M' + fmt(tip.x - dx * H + nx * H * .65) + ' ' + fmt(tip.y - dy * H + ny * H * .65) +
           ' L' + fmt(tip.x) + ' ' + fmt(tip.y) +
           ' L' + fmt(tip.x - dx * H - nx * H * .65) + ' ' + fmt(tip.y - dy * H - ny * H * .65) + '" />';
  };
  /* a two-headed arrow between a and b with its length written on it;
     `ext` are the corners it measures from */
  function figMeasure(cls, a, b, label, ext, rotate) {
    const mid = { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
    const u = rhUnit(b, a);
    return '<g class="d-group ' + cls + '">' +
      ext.map(e => figLine('d-ext', e.from, e.to)).join('') +
      figLine('d-arrow', a, b) + figHead(a, -u.x, -u.y) + figHead(b, u.x, u.y) +
      '<text class="d-label" x="' + fmt(mid.x) + '" y="' + fmt(mid.y) + '" font-size="17" text-anchor="middle" dominant-baseline="middle"' +
        (rotate ? ' transform="rotate(-90 ' + fmt(mid.x) + ' ' + fmt(mid.y) + ')"' : '') + '>' + label + '</text>' +
    '</g>';
  }
  function figShell(key, name, art, over, h) {
    h = h || FIG_H;
    return '<div class="fig" data-fig="' + key + '" tabindex="-1">' +
      '<div class="fig-art"><svg viewBox="0 0 ' + FIG_W + ' ' + h + '" preserveAspectRatio="xMidYMid meet" aria-hidden="true">' +
        '<defs><clipPath id="wipeFig' + key + '"><rect class="wipe" x="0" y="0" width="' + FIG_W + '" height="' + h + '" /></clipPath></defs>' +
        '<g class="art">' + art + '</g>' +
        '<g class="fig-over" style="--pair: var(--heading)">' + over + '</g>' +
      '</svg></div>' +
      (name ? '<button class="chip formula fig-chip" type="button" tabindex="-1" data-answer="' + key + '"><span>' + name + '</span></button>' : '') +
      '<p class="fig-work"><span class="type-wrap"><span class="type-ghost"></span>' +
        '<span class="type"><span class="txt"></span><i class="caret" hidden aria-hidden="true"></i></span></span></p>' +
    '</div>';
  }
  /* a rhombus with its diagonals flat and upright. d1 and d2 are in the
     box's units; labD1 goes on an arrow under it, labD2 on an arrow to its
     left -- or, with `unknown`, d2 is dashed and marked "?" */
  function figRhombus(key, name, d1, d2, labD1, labD2, unknown) {
    const cx = 185, cy = 118;
    const L = { x: cx - d1 / 2, y: cy }, R = { x: cx + d1 / 2, y: cy };
    const T = { x: cx, y: cy - d2 / 2 }, B = { x: cx, y: cy + d2 / 2 };
    const O = { x: cx, y: cy }, M = 11;
    const art =
      '<polygon class="shape-fill" clip-path="url(#wipeFig' + key + ')" points="' + [L, T, R, B].map(pt).join(' ') + '" />' +
      '<path class="shape-outline" d="M' + [L, T, R, B].map(p => fmt(p.x) + ' ' + fmt(p.y)).join(' L') + ' Z" fill="none" stroke-width="5" />';
    let over =
      figLine('rd rd-d1', L, R) +
      figLine('rd rd-d2' + (unknown ? ' dashed' : ''), T, B) +
      '<path class="rmark mark-up" d="M' + fmt(O.x) + ' ' + fmt(O.y - M) + ' H' + fmt(O.x + M) + ' V' + fmt(O.y) + '" />';
    if (unknown) {
      over += '<text class="rd-lbl lbl-d2 lbl-q" x="' + fmt(cx + 14) + '" y="' + fmt(cy - d2 / 4) + '" font-size="26" text-anchor="start" dominant-baseline="middle">?</text>';
    }
    const y = B.y + 18;
    over += figMeasure('d-d1', { x: L.x, y: y }, { x: R.x, y: y }, labD1,
      [{ from: L, to: { x: L.x, y: y } }, { from: R, to: { x: R.x, y: y } }], false);
    if (labD2 && !unknown) {
      const x = L.x - 22;
      over += figMeasure('d-d2', { x: x, y: T.y }, { x: x, y: B.y }, labD2,
        [{ from: T, to: { x: x, y: T.y } }, { from: B, to: { x: x, y: B.y } }], true);
    }
    return figShell(key, name, art, over);
  }
  /* a slanted shape with all four sides equal, given by its base and its
     height only: a rhombus too, but with no diagonal to be seen */
  function figSlant(key) {
    /* a base of 175 and a height of 105 (10 : 6), the slant chosen so the
       side comes out the same length as the base */
    const BL = { x: 15, y: 145 }, BR = { x: 190, y: 145 }, TL = { x: 155, y: 40 }, TR = { x: 330, y: 40 };
    const F = { x: TL.x, y: BL.y };
    const art =
      '<polygon class="shape-fill" clip-path="url(#wipeFig' + key + ')" points="' + [BL, TL, TR, BR].map(pt).join(' ') + '" />' +
      '<path class="shape-outline" d="M' + [BL, TL, TR, BR].map(p => fmt(p.x) + ' ' + fmt(p.y)).join(' L') + ' Z" fill="none" stroke-width="5" />';
    /* one tick across the middle of every side: four equal sides */
    let over = '';
    [[BL, TL], [TL, TR], [TR, BR], [BR, BL]].forEach(([a, b]) => {
      const u = rhUnit(b, a), n = { x: -u.y, y: u.x }, C = { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 }, t = 9;
      const d = 'M' + fmt(C.x + n.x * t) + ' ' + fmt(C.y + n.y * t) + ' L' + fmt(C.x - n.x * t) + ' ' + fmt(C.y - n.y * t);
      over += '<g class="eq-mark"><path class="halo" d="' + d + '" /><path class="ink" d="' + d + '" /></g>';
    });
    /* the height, dropped from the top-left corner onto the base */
    const M = 11;
    over += '<g class="d-group d-hgt">' +
      figLine('d-height', TL, F) +
      '<path class="d-mark" d="M' + fmt(F.x) + ' ' + fmt(F.y - M) + ' H' + fmt(F.x + M) + ' V' + fmt(F.y) + '" />' +
      '<text class="d-label" x="' + fmt(F.x + 10) + '" y="' + fmt((TL.y + F.y) / 2) + '" font-size="17" text-anchor="start" dominant-baseline="middle">6 cm</text>' +
    '</g>';
    /* the base, measured under the shape */
    const y = BL.y + 20;
    over += figMeasure('d-d1', { x: BL.x, y: y }, { x: BR.x, y: y }, '10 cm',
      [{ from: BL, to: { x: BL.x, y: y } }, { from: BR, to: { x: BR.x, y: y } }], false);
    return figShell(key, '', art, over, 172);
  }

  const figEl = (key, row) => (row || figRow).querySelector('.fig[data-fig="' + key + '"]');

  /* the figures are put up in place of the rhombus and draw themselves,
     one a beat after the other; then each takes its marks */
  async function showFigures(html, row, host) {
    row = row || figRow;
    host = host || rhomPractice;
    row.innerHTML = html;
    row.classList.remove('off');
    row.classList.toggle('single', row.children.length === 1);
    host.classList.add('on');
    await wait(160);
    const figs = Array.from(row.querySelectorAll('.fig'));
    await Promise.all(figs.map(async (f, i) => { await wait(i * 260); await revealShape(f); }));
    await wait(300);
    for (const f of figs) await showFigMarks(f);
  }
  async function showFigMarks(f) {
    const d1 = f.querySelector('.rd-d1'), d2 = f.querySelector('.rd-d2');
    if (d1) await growLine(d1, 520);
    if (d2) await growLine(d2, 440);
    const mark = f.querySelector('.rmark');
    if (mark) mark.classList.add('on');
    const q = f.querySelector('.lbl-q');
    if (q) { q.classList.add('on'); sfx('click', .35); }
    const hgt = f.querySelector('.d-hgt');
    if (hgt) {
      await growLine(hgt.querySelector('.d-height'), 520);
      hgt.classList.add('on');
      sfx('click', .35);
      await wait(REDUCED ? 120 : 360);
    }
    f.querySelectorAll('.eq-mark, .par-mark').forEach(m => m.classList.add('on'));
    for (const g of Array.from(f.querySelectorAll('.d-group:not(.d-hgt)'))) await showDimGroup(g);
  }

  /* the old figures leave */
  async function clearFigures(row) {
    row = row || figRow;
    if (!row.children.length) return;
    row.classList.add('off');
    await wait(450);
    row.innerHTML = '';
  }

  /* Tap the right figure -- or the name under it, which is part of it. The
     wrong one is shaken and steps back; the right one goes green. A skip
     taps it. */
  function askFigures(answer, row) {
    return new Promise(resolve => {
      const figs = Array.from((row || figRow).querySelectorAll('.fig'));
      let over = false;
      const finish = (fig, auto) => {
        if (over) return;
        over = true;
        skipFills.delete(fill);
        sceneWaiters.delete(teardown);
        lockInput(true);
        figs.forEach(f => { f.removeEventListener('click', onTap); f.classList.remove('pick'); });
        feedbackGen++;
        fig.classList.add('correct');
        if (!auto) {
          sfx('correct', .7);
          const chip = fig.querySelector('.fig-chip');
          if (chip) burst(chip);
          swiftee.play('happy', 1);
        }
        resolve();
      };
      const onTap = e => {
        const fig = e.currentTarget;
        if (!interactive || fig.classList.contains('spent')) return;
        if (fig.dataset.fig === answer) { finish(fig, false); return; }
        sfx('wrong', .6);
        feedback(FEEDBACK.wrong);
        swiftee.play('confused', 1);
        fig.classList.add('reject');
        setTimeout(() => { fig.classList.remove('reject'); fig.classList.add('spent'); }, 440);
      };
      const fill = () => finish(figs.find(f => f.dataset.fig === answer), true);
      const teardown = () => {
        sceneWaiters.delete(teardown);
        over = true;
        skipFills.delete(fill);
        figs.forEach(f => f.removeEventListener('click', onTap));
      };
      figs.forEach(f => { f.classList.add('pick'); f.addEventListener('click', onTap); });
      sceneWaiters.add(teardown);
      skipFills.add(fill);
      lockInput(false);
    });
  }

  /* the working under a figure types itself out */
  async function figWorking(key, text, row) {
    const f = figEl(key, row);
    const work = f.querySelector('.fig-work');
    work.querySelector('.type-ghost').textContent = text;
    work.classList.add('show');
    sfx('click', .3);
    await wait(REDUCED ? 120 : 380);
    await typer(work.querySelector('.txt'), work.querySelector('.caret'), AREA_MS)(text);
  }

  /* the measured rhombus, put back if a replay has taken it away: tilted,
     both diagonals, the right angle, and the two lengths on it */
  function ensureMeasured() {
    const rebuilt = ensureTilted();
    if (rebuilt) {
      areaEl('rd-d2').style.opacity = 1;
      ['lbl-d2', 'mark-up'].forEach(c => areaEl(c).classList.add('on'));
    }
    if (!rhomArea.querySelector('.d-group')) {
      buildRhomDims();
      rhomArea.querySelectorAll('.d-group').forEach(g => {
        g.querySelectorAll('.d-ext').forEach(l => { l.style.opacity = .7; });
        g.querySelector('.d-arrow').style.opacity = 1;
        g.classList.add('on');
      });
    }
    return rebuilt;
  }

  /* the common opening of a practice question: the heading clears, and
     whatever the question before left is tidied */
  function practiceOpen(again) {
    lockInput(true);
    sceneStart(again);
    promptGhost.textContent = longest(PRACTICE_GHOST);
    feedbackGen++;
    promptTxt.textContent = '';
    caret.hidden = true;
    rhom.classList.remove('numbers');
    rhomQuiz.classList.remove('show');
    rhomChips3.forEach(c => { rhomTray3.appendChild(c); c.disabled = false; });
    return runToken;
  }

  /* 1. the area of the measured rhombus */
  async function rhombusPractice1() {
    const mine = practiceOpen(rhombusPractice1);
    rhomPractice.classList.remove('on');
    rhomShape.classList.remove('away', 'lit-d1', 'lit-d2', 'lit-quad');
    ensureMeasured();
    if (!boardMascot.classList.contains('in')) boardMascot.classList.add('in');
    await wait(460);

    /* the shape comes back to the middle, the formula gone */
    await layoutWide(rhom, rhomSvg, false);
    await wait(300);

    const chips = practiceChips([{ v: '96', t: '96 sq. cm' }, { v: '192', t: '192 sq. cm' }, { v: '28', t: '28 sq. cm' }]);
    await dealChips(chips);
    await wait(200);
    await heading(PRACTICE.area);
    await askChips(chips, '96');
    if (mine !== runToken) throw CANCELLED;
    onRhomWord('rhom');
    await heading(PRACTICE.areaOk);
    await wait(1800);
    await showNext();
    await rhombusPractice2();
  }

  /* 2. a rhombus of 240 sq. cm with one diagonal known */
  async function rhombusPractice2() {
    const mine = practiceOpen(rhombusPractice2);
    practiceTray.classList.add('off');
    if (!boardMascot.classList.contains('in')) boardMascot.classList.add('in');

    /* the measured rhombus gives way to the question's own */
    rhomShape.classList.add('away');
    await clearFigures();
    await wait(300);
    await showFigures(figRhombus('a', '', 260, 150, '30 cm', '', true));
    await wait(300);

    const chips = practiceChips([{ v: '8', t: '8 cm' }, { v: '16', t: '16 cm' }, { v: '32', t: '32 cm' }]);
    await dealChips(chips);
    await wait(200);
    await heading(PRACTICE.find);
    await askChips(chips, '16');
    if (mine !== runToken) throw CANCELLED;
    /* the answer: the dashed diagonal becomes solid and takes its length */
    const f = figEl('a');
    f.querySelector('.rd-d2').classList.remove('dashed');
    f.querySelector('.lbl-q').textContent = '16 cm';
    await heading(PRACTICE.findOk);
    await wait(1800);
    await showNext();
    await rhombusPractice3();
  }

  /* 3. two rhombi: which has the larger area? */
  async function rhombusPractice3() {
    const mine = practiceOpen(rhombusPractice3);
    practiceTray.classList.add('off');
    practiceSay.classList.remove('show');
    rhomShape.classList.add('away');
    /* Swiftee is at the heading for the question (a replay may find it
       still down by the banner) */
    if (practiceMascot.classList.contains('in')) practiceMascot.classList.remove('in');
    if (!boardMascot.classList.contains('in')) boardMascot.classList.add('in');

    await clearFigures();
    await wait(300);
    await showFigures(
      figRhombus('I',  'Rhombus I',  260, 108, '24 cm', '10 cm', false) +
      figRhombus('II', 'Rhombus II', 173, 195, '16 cm', '18 cm', false));
    await wait(200);
    await dealChips(Array.from(figRow.querySelectorAll('.fig-chip')));
    await wait(200);
    await heading(PRACTICE.larger);
    await askFigures('II');
    if (mine !== runToken) throw CANCELLED;
    feedback(FEEDBACK.right);
    await wait(700);

    /* the working under each: the longer diagonal did not decide it */
    await figWorking('I', '½ × 24 × 10 = 120 sq. cm');
    await wait(400);
    await figWorking('II', '½ × 16 × 18 = 144 sq. cm');
    await wait(700);

    /* Swiftee hops down beside the banner and says why */
    feedbackGen++;
    promptTxt.textContent = '';
    caret.hidden = true;
    practiceSay.classList.add('show');
    await hopBetween(boardMascot, practiceMascot);
    await wait(240);
    swiftee.hold('talking');
    await typeSegments(practiceTxt, practiceCaret, PRACTICE.largerLine, TYPE_MS, 320, null);
    swiftee.release();
    swiftee.play('proud', 1);
    skyConfetti(90, 2800);
    sfx('confetti', .7);
    await wait(2200);
    await showNext();
    await rhombusPractice4();
  }

  /* 4. a shape with a base and a height, and no diagonal in sight */
  async function rhombusPractice4() {
    const mine = practiceOpen(rhombusPractice4);
    rhomShape.classList.add('away');

    /* Swiftee comes back up to the heading, and the banner goes */
    if (practiceMascot.classList.contains('in')) {
      await hopBetween(practiceMascot, boardMascot);
    } else if (!boardMascot.classList.contains('in')) {
      boardMascot.classList.add('in');
    }
    practiceSay.classList.remove('show');
    practiceTxt.textContent = '';
    await clearFigures();
    await wait(300);
    await showFigures(figSlant('s'));
    await wait(300);

    const chips = practiceChips([{ v: 'diag', t: '½ × (product of diagonals)', formula: true }, { v: 'bh', t: 'base × height', formula: true }]);
    await dealChips(chips);
    await wait(200);
    await heading(PRACTICE.which);
    await askChips(chips, 'bh');
    if (mine !== runToken) throw CANCELLED;
    await heading(PRACTICE.whichOk);
    swiftee.play('proud', 1);
    skyConfetti(120, 3200);
    sfx('confetti', .8);
    await wait(2400);
    await showNext();
    await rhombusAside();
  }

  /* the board goes, and Swiftee looks ahead from its bubble. Its own scene,
     so Replay can re-enter it. */
  const RHOM_ASIDE = [
    'We now know how to find the area of a rhombus.',
    'Let us now try finding the area of another special quadrilateral.'
  ];
  async function rhombusAside() {
    await boardAside(RHOM_ASIDE, rhombusAside);
    await trapSection();
  }

  /* ---------- section 8: the trapezium ----------
   * The third special quadrilateral, in two levels.
   *
   * Level 1. Swiftee's aside is over: the bird drops out of the frame, the
   * board comes back blank and a trapezium draws itself in the middle of it.
   * "This is a [ v ]" appears under it with a drop-down -- Kite,
   * Parallelogram, Trapezium -- and Swiftee jumps in beside the sentence and
   * points the learner at the arrow, as it did for the quadrilateral. Each
   * choice is answered in a banner under the sentence, red or green, and
   * either way the shape takes its "parallel" marks, so the answer can be
   * checked against the shape itself.
   *
   * Level 2. The sentence goes and Swiftee ducks behind the board; the
   * trapezium fades and six cards take its place, three of them trapeziums
   * (isosceles, scalene and right-angled) and three not. Swiftee jumps up to
   * the heading, says "Select all the trapeziums.", and ducks back down,
   * taking the line with it. Each tap is answered at once: a trapezium
   * locks green with confetti out of the card, anything else shakes red and
   * steps back for good. All three found: confetti and Next. Then the other three leave, the trapeziums glide
   * into one row and each takes a slot under it; the three names appear
   * below, and Swiftee jumps up to say "Drag each block to the matching
   * shape." -- the warm-up's line, with the warm-up's voice-over. Each name
   * is dragged (or tapped, then its slot tapped) onto its shape. */
  const trap       = document.getElementById('trap');
  const trapShape  = document.getElementById('trapShape');
  const trapSvg    = document.getElementById('trapSvg');
  const trapArt    = trapSvg.querySelector('.art');
  const trapMarksG = document.getElementById('trapMarks');
  const trapCards  = document.getElementById('trapCards');
  const cardGrid   = document.getElementById('cardGrid');
  const trapQuiz   = document.getElementById('trapQuiz');
  const trapDD     = document.getElementById('trapDD');
  const trapMascot = document.getElementById('trapMascot');
  const trapNote   = document.getElementById('trapNote');
  const trapNoteTxt   = trapNote.querySelector('.txt');
  const trapNoteCaret = trapNote.querySelector('.caret');
  const trapTray   = document.getElementById('trapTray');
  const trapChips  = Array.from(trapTray.querySelectorAll('.chip'));

  const TRAP = {
    tap:    'Tap here!',
    answer: 'trapezium',
    notes: {
      kite:          'Almost! A kite has two pairs of equal sides next to each other. Check the shape carefully.',
      parallelogram: 'Almost! A parallelogram has two pairs of parallel sides. Check the shape carefully.',
      trapezium:     'Correct! Look at the shape \u2014 it has only one pair of parallel sides.'
    },
    select: 'Select all the trapeziums.',
    match:  'Drag each block to the matching shape.'
  };
  const TRAP_GHOST = [TRAP.select, TRAP.match, FEEDBACK.done];

  /* the banner's ghost holds its longest line from the first frame */
  trapNote.querySelector('.type-ghost').textContent =
    longest([TRAP.tap].concat(Object.keys(TRAP.notes).map(k => TRAP.notes[k])));
  const trapSay    = typer(trapNoteTxt, trapNoteCaret, 45);
  const trapQuizDD = ddController(trapDD);

  /* the trapezium's corners, clockwise from the top left, in the svg's units */
  const TRAP_PTS = [{ x: 62, y: 8 }, { x: 358, y: 8 }, { x: 412, y: 252 }, { x: 8, y: 252 }];

  /* the "parallel" mark: two chevrons astride the middle of a side, pointing
     the way the side runs, with a halo so they read over the outline */
  function parMark(a, b) {
    const u = rhUnit(b, a), n = { x: -u.y, y: u.x };
    const M = { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
    const s = 8;
    let d = '';
    [-6, 6].forEach(off => {
      const C = { x: M.x + u.x * off, y: M.y + u.y * off };
      d += 'M' + fmt(C.x - u.x * s + n.x * s) + ' ' + fmt(C.y - u.y * s + n.y * s) +
           ' L' + fmt(C.x) + ' ' + fmt(C.y) +
           ' L' + fmt(C.x - u.x * s - n.x * s) + ' ' + fmt(C.y - u.y * s - n.y * s);
    });
    return '<g class="par-mark"><path class="halo" d="' + d + '" /><path class="ink" d="' + d + '" /></g>';
  }

  function buildTrap() {
    const P = TRAP_PTS;
    trapArt.innerHTML =
      '<polygon class="shape-fill" clip-path="url(#wipeTrap)" points="' + P.map(pt).join(' ') + '" />' +
      '<path class="shape-outline" d="M' + P.map(p => fmt(p.x) + ' ' + fmt(p.y)).join(' L') + ' Z" fill="none" stroke-width="5" />';
    trapMarksG.innerHTML = parMark(P[0], P[1]) + parMark(P[3], P[2]);
    trapShape.classList.remove('marked', 'away');
  }

  /* Swiftee's answer to a choice, in the banner under the sentence -- green
     for the right name, red for a wrong one. The shape takes its parallel
     marks on the first answer, whichever it is, so the learner can check
     the answer against the shape itself. */
  function trapAnswer(v) {
    trapNote.classList.remove('ok', 'bad');
    trapNote.classList.add(v === TRAP.answer ? 'ok' : 'bad');
    if (!trapShape.classList.contains('marked')) {
      trapShape.classList.add('marked');
      sfx('click', .35);
    }
    return trapSay(TRAP.notes[v] || TRAP.notes.parallelogram);
  }

  /* the names go home between scenes: a replay may find them docked in a
     card that the teardown has just taken away */
  function homeTrapChips() {
    trapChips.forEach(c => { trapTray.appendChild(c); c.disabled = false; });
  }

  /* Swiftee says a line from its place by the heading, with a voice-over
     when there is one for it: the line types across the clip, as a briefing
     does, and falls back to the usual pace when the clip will not play. */
  async function voiced(text, vo) {
    feedbackGen++;
    let length = 0, playing = false;
    if (vo && !fastForward) {
      length = await durationOf(vo);
      try { vo.currentTime = 0; await vo.play(); playing = true; } catch (e) { /* no sound, then */ }
    }
    swiftee.hold('talking');
    await typewrite(text, (playing && length > .5) ? length * 1000 * .82 : text.length * TYPE_MS);
    if (playing && !vo.ended) {
      await waitOrSkip(done => {
        const end = () => { vo.removeEventListener('ended', end); done(); };
        vo.addEventListener('ended', end);
        setTimeout(end, 12000);            /* never hang on a stalled clip */
      });
    }
    swiftee.release();
  }

  /* ---- level 1: name the shape ---- */
  async function trapSection() {
    lockInput(true);
    sceneStart(trapSection);
    const mine = runToken;
    homeTrapChips();
    /* the bird is behind the board for the whole of level 1 (it jumps in
       beside the sentence, not the heading), and the drop-down is empty: a
       Back into this scene may find both otherwise */
    boardMascot.classList.remove('in');
    trapDD.querySelector('.dd-value').textContent = '';

    /* 1. the aside ends: the bubble pops away and Swiftee drops out of the
          frame, as it did before the board first arrived */
    bubble.classList.add('out');
    bubble.classList.remove('show');
    await wait(300);
    await introExit();
    intro.classList.remove('on', 'aside');

    /* the board comes back blank: the rhombus scenes are cleared off it
       while it is still invisible, and the heading's ghost takes the longest
       line of these scenes while there is nothing on the board to move */
    board.classList.add('sec6');
    promptGhost.textContent = longest(TRAP_GHOST);
    buildTrap();
    await wait(200);
    await showBoard();
    await wait(300);

    /* 2. the trapezium: outline first, then the colour */
    trap.classList.add('on');
    trap.setAttribute('aria-hidden', 'false');
    await wait(120);
    await revealShape(trapShape);
    await wait(380);

    /* 3. "This is a ..." with a drop-down; Swiftee jumps in beside it and
          points the learner at the arrow */
    trapNote.classList.remove('ok', 'bad');
    trapQuiz.classList.add('show');
    await wait(REDUCED ? 200 : 440);
    await mascotJumpIn(trapMascot);
    await wait(200);
    trapDD.classList.add('hint');
    swiftee.hold('talking');
    await trapSay(TRAP.tap);
    swiftee.release();
    lockInput(false);
    await trapQuizDD.ask(v => v === TRAP.answer, trapAnswer, trapAnswer);
    lockInput(true);
    /* a replay lets go of the wait above too, having already retired this
       run of the scene: unwind here rather than carry on into the fresh one */
    if (mine !== runToken) throw CANCELLED;
    await wait(2600);

    /* 4. named: Next */
    await showNext();
    await trapSelect();
  }

  /* ---- the cards ----
   * Each is a rounded card with one shape outlined on it, in a 320 x 200
   * box; the shapes are drawn in a 200 x 130 space and set in the middle.
   * `trap` says whether the shape is a trapezium -- exactly one pair of
   * parallel sides -- and the three that are not have none. */
  const CARDS = {
    iso:     { trap: true,  pts: '50,25 150,25 175,105 25,105' },
    q1:      { trap: false, pts: '30,20 110,45 170,105 30,105' },
    scalene: { trap: true,  pts: '40,25 140,25 180,105 20,105' },
    q2:      { trap: false, pts: '45,30 130,20 165,105 25,95' },
    right:   { trap: true,  pts: '25,25 130,25 175,105 25,105' },
    q3:      { trap: false, pts: '70,20 150,40 175,105 25,105' }
  };
  const CARD_ORDER  = ['iso', 'q1', 'scalene', 'q2', 'right', 'q3'];   /* as dealt: left to right, top to bottom */
  const MATCH_ORDER = ['iso', 'right', 'scalene'];                     /* as lined up for the names */

  const cardsNow   = () => Array.from(cardGrid.querySelectorAll('.card'));
  const isTrapCard = c => c.dataset.trap === '1';

  function buildCards(keys) {
    cardGrid.innerHTML = keys.map((k, i) => {
      const c = CARDS[k];
      return '<div class="card" data-kind="' + k + '" data-trap="' + (c.trap ? 1 : 0) + '" role="button" tabindex="-1" ' +
                  'aria-pressed="false" aria-label="Shape ' + (i + 1) + '">' +
        '<svg class="card-box" viewBox="0 0 320 200" preserveAspectRatio="xMidYMid meet" aria-hidden="true">' +
          '<rect class="card-bg" x="2" y="2" width="316" height="196" rx="30" />' +
          '<polygon class="card-shape" points="' + c.pts + '" transform="translate(60 35)" />' +
        '</svg>' +
        (c.trap ? '<div class="slot card-slot" data-accept="' + k + '" aria-label="Name of this trapezium"></div>' : '') +
      '</div>';
    }).join('');
    return cardsNow();
  }

  /* Tap a card, and it is answered at once: a trapezium locks green with
     confetti out of it; anything else shakes red and steps back, and takes
     no more taps. Resolves once all three trapeziums are found. A skip
     finds them itself; a replay lets go. */
  function selectCards() {
    return waitForScene(resolve => {
      const cards = cardsNow();
      let over = false;

      const onTap = e => {
        if (!interactive || over) return;
        const c = e.currentTarget;
        if (c.classList.contains('correct') || c.classList.contains('spent')) return;

        /* ---- not a trapezium: red shake, then it steps back for good ---- */
        if (!isTrapCard(c)) {
          sfx('wrong');
          swiftee.play('confused', 1);
          c.classList.add('reject');
          c.setAttribute('aria-disabled', 'true');
          setTimeout(() => { c.classList.remove('reject'); c.classList.add('spent'); }, 440);
          return;
        }

        /* ---- a trapezium: it locks green, confetti out of the card ---- */
        c.classList.add('correct');
        c.setAttribute('aria-pressed', 'true');
        sfx('correct', .85);
        sfx('confetti', .5);
        swiftee.play('happy', 1);
        requestAnimationFrame(() => burst(c.querySelector('.card-box')));
        if (cards.filter(isTrapCard).every(k => k.classList.contains('correct'))) finish(false);
      };

      const cleanup = () => {
        cards.forEach(c => { c.removeEventListener('click', onTap); c.classList.remove('pick'); });
        skipFills.delete(fill);
        sceneWaiters.delete(teardown);
      };
      const finish = auto => {
        if (over) return;
        over = true;
        cleanup();
        lockInput(true);
        cards.forEach(c => {
          if (!isTrapCard(c)) return;
          c.classList.add('correct');
          c.setAttribute('aria-pressed', 'true');
        });
        if (!auto) {
          swiftee.play('proud', 1);
          skyConfetti(90, 2800);
          sfx('confetti', .7);
        }
        resolve();
      };
      const fill = () => finish(true);
      /* a replay retires the scene while the question is open: the cards go
         with it, so there is only the bookkeeping to undo */
      const teardown = () => { over = true; cleanup(); };

      cards.forEach(c => { c.classList.add('pick'); c.addEventListener('click', onTap); });
      sceneWaiters.add(teardown);
      skipFills.add(fill);
      lockInput(false);
    });
  }

  /* ---- level 2, first half: pick the trapeziums out ---- */
  async function trapSelect() {
    lockInput(true);
    sceneStart(trapSelect);
    const mine = runToken;
    homeTrapChips();
    boardMascot.classList.remove('in');    /* it jumps in from behind the board below */
    promptGhost.textContent = longest(TRAP_GHOST);
    feedbackGen++;
    promptTxt.textContent = '';
    caret.hidden = true;

    /* 1. the sentence goes and Swiftee ducks behind the board; the
          trapezium fades while it is mid-air */
    trapQuiz.classList.add('off');
    const out = trapMascot.classList.contains('in') ? mascotJumpOut(trapMascot) : wait(0);
    await wait(260);
    trapShape.classList.add('away');
    await out;
    trapQuiz.classList.remove('show', 'off');
    trap.classList.add('lvl2');            /* the sentence's row gives up its room */
    await wait(REDUCED ? 200 : 480);

    /* 2. the six cards, dealt one after another */
    const cards = buildCards(CARD_ORDER);
    cardGrid.classList.remove('row');
    trapCards.classList.remove('match');
    trapCards.classList.add('on');
    await wait(120);
    for (const c of cards) {
      c.classList.add('reveal');
      sfx('click', .22);
      await wait(130);
    }
    await wait(500);

    /* 3. Swiftee jumps up from behind the board, says what to do, and
          ducks back down to leave the board to the learner -- taking the
          line with it, so the board is the cards and nothing else */
    await mascotJumpIn();
    await wait(240);
    await heading(TRAP.select);
    await wait(900);
    const down = mascotJumpOut();
    await wait(260);
    feedbackGen++;
    promptTxt.textContent = '';
    caret.hidden = true;
    await down;
    await wait(200);

    /* 4. the learner picks the trapeziums out, each tap answered at once */
    await selectCards();
    if (mine !== runToken) throw CANCELLED;
    await wait(2000);

    /* 5. Next */
    await showNext();
    await trapMatch();
  }

  /* the three trapeziums, lined up: put back if a replay has taken the
     cards down. True if they had to be rebuilt. */
  function ensureCards() {
    if (cardGrid.children.length) return false;
    buildCards(MATCH_ORDER).forEach(c => c.classList.add('reveal'));
    cardGrid.classList.add('row');
    trapCards.classList.add('on', 'match');
    trapShape.classList.add('away');
    return true;
  }

  /* The cards that stay glide from where they were to their new places:
     measured before and after the change, then each is animated from the
     one to the other. A card keeps its proportions, so a uniform scale is
     exact -- the box is measured by its drawn rounded rectangle, which the
     svg centres, so the svg's own centre is the right origin. */
  async function flipCards(cards, mutate) {
    const boxes = cards.map(c => c.querySelector('.card-box'));
    const bgs   = cards.map(c => c.querySelector('.card-bg'));
    const before = bgs.map(b => b.getBoundingClientRect());
    mutate();
    if (REDUCED) return wait(120);
    const after = bgs.map(b => b.getBoundingClientRect());
    const anims = [];
    boxes.forEach((box, i) => {
      const a = before[i], b = after[i];
      if (!a.width || !b.width) return;
      const dx = (a.left + a.width / 2) - (b.left + b.width / 2);
      const dy = (a.top + a.height / 2) - (b.top + b.height / 2);
      const s  = a.width / b.width;
      anims.push(box.animate(
        [{ transform: 'translate(' + fmt(dx) + 'px, ' + fmt(dy) + 'px) scale(' + s + ')' }, { transform: 'none' }],
        { duration: 860, delay: i * 90, easing: 'cubic-bezier(.4, 0, .2, 1)', fill: 'backwards' }
      ));
    });
    await Promise.all(anims.map(a => a.finished.catch(() => {})));
  }

  /* Drag a chip onto a slot -- or tap the chip, then the slot. `fits` says
     whether a chip belongs in a slot; a wrong drop shakes both and the chip
     stays where it was; a right one docks, and `onDock` is told. Resolves
     once every slot is filled. A skip fills them; a replay lets go. */
  function dragMatch(chips, slots, fits, onDock) {
    return waitForScene(resolve => {
      let mdrag = null, mpicked = null, over = false;
      const free = () => slots.filter(s => !s.classList.contains('filled'));
      const slotAt = (x, y) => free().find(s => {
        const r = s.getBoundingClientRect();
        return x >= r.left && x <= r.right && y >= r.top && y <= r.bottom;
      }) || null;
      const clearOver = () => slots.forEach(s => s.classList.remove('over'));
      const unpick = () => { if (mpicked) mpicked.classList.remove('picked'); mpicked = null; };

      const dockIn = (chip, slot, earned) => {
        slot.appendChild(chip);
        slot.classList.add('filled');
        chip.classList.remove('picked', 'dragging');
        chip.disabled = true;
        slot.classList.add('correct');
        setTimeout(() => slot.classList.remove('correct'), 520);
        if (onDock) onDock(chip, slot);
        sfx('correct', earned ? 1 : .55);
        if (earned) {
          swiftee.play('happy', 1);
          sfx('confetti', .55);
          requestAnimationFrame(() => burst(chip));
        }
      };
      const tryPlace = (chip, slot) => {
        if (!slot || slot.classList.contains('filled')) return;
        if (!fits(chip, slot)) {
          sfx('wrong');
          feedback(FEEDBACK.wrong);
          swiftee.play('confused', 1);
          slot.classList.add('reject');
          chip.classList.add('reject');
          setTimeout(() => { slot.classList.remove('reject'); chip.classList.remove('reject'); }, 430);
          return;
        }
        dockIn(chip, slot, true);
        if (!free().length) finish(false);
        else feedback(FEEDBACK.right);
      };

      const onDownM = e => {
        if (!interactive || over) return;
        const chip = e.currentTarget;
        if (chip.disabled) return;
        if (e.button !== undefined && e.button !== 0) return;
        const rect = chip.getBoundingClientRect();
        const ghost = chip.cloneNode(true);
        ghost.classList.add('ghost');
        Object.assign(ghost.style, {
          position: 'fixed', left: rect.left + 'px', top: rect.top + 'px',
          width: rect.width + 'px', height: rect.height + 'px',
          margin: 0, pointerEvents: 'none', zIndex: 999, transform: 'scale(1.05)'
        });
        document.body.appendChild(ghost);
        chip.classList.add('dragging');
        unpick();
        sfx('click', .5);
        mdrag = { el: chip, ghost: ghost, offsetX: e.clientX - rect.left, offsetY: e.clientY - rect.top, start: { x: e.clientX, y: e.clientY } };
        window.addEventListener('pointermove', onMoveM);
        window.addEventListener('pointerup', onUpM);
        window.addEventListener('pointercancel', onUpM);
        e.preventDefault();
      };
      const onMoveM = e => {
        if (!mdrag) return;
        mdrag.ghost.style.left = (e.clientX - mdrag.offsetX) + 'px';
        mdrag.ghost.style.top  = (e.clientY - mdrag.offsetY) + 'px';
        clearOver();
        const slot = slotAt(e.clientX, e.clientY);
        if (slot) slot.classList.add('over');
      };
      const onUpM = e => {
        if (!mdrag) return;
        window.removeEventListener('pointermove', onMoveM);
        window.removeEventListener('pointerup', onUpM);
        window.removeEventListener('pointercancel', onUpM);
        const { el, ghost, start } = mdrag;
        mdrag = null;
        ghost.remove();
        el.classList.remove('dragging');
        clearOver();
        const slot = slotAt(e.clientX, e.clientY);
        if (slot) return tryPlace(el, slot);
        /* a tap, not a drag: the chip waits for a slot to be tapped */
        if (Math.hypot(e.clientX - start.x, e.clientY - start.y) < 6) {
          mpicked = el;
          el.classList.add('picked');
        }
      };
      const onSlotTap = e => {
        if (!interactive || !mpicked) return;
        const chip = mpicked;
        unpick();
        tryPlace(chip, e.currentTarget);
      };

      const cleanup = () => {
        chips.forEach(c => c.removeEventListener('pointerdown', onDownM));
        slots.forEach(s => s.removeEventListener('click', onSlotTap));
        window.removeEventListener('pointermove', onMoveM);
        window.removeEventListener('pointerup', onUpM);
        window.removeEventListener('pointercancel', onUpM);
        if (mdrag) { mdrag.ghost.remove(); mdrag.el.classList.remove('dragging'); mdrag = null; }
        clearOver();
        unpick();
        skipFills.delete(fill);
        sceneWaiters.delete(teardown);
      };
      const finish = auto => {
        if (over) return;
        over = true;
        cleanup();
        lockInput(true);
        resolve();
      };
      /* a skip: each name goes onto its own shape by itself */
      const fill = () => {
        if (over) return;
        free().forEach(slot => {
          const chip = chips.find(c => !c.disabled && fits(c, slot));
          if (chip) dockIn(chip, slot, false);
        });
        finish(true);
      };
      /* a replay retires the scene while the drag is open */
      const teardown = () => { over = true; cleanup(); };

      chips.forEach(c => c.addEventListener('pointerdown', onDownM));
      slots.forEach(s => s.addEventListener('click', onSlotTap));
      sceneWaiters.add(teardown);
      skipFills.add(fill);
      lockInput(false);
    });
  }

  /* ---- level 2, second half: name the three ---- */
  async function trapMatch() {
    lockInput(true);
    sceneStart(trapMatch);
    const mine = runToken;
    homeTrapChips();
    boardMascot.classList.remove('in');    /* it jumps in from behind the board below */
    promptGhost.textContent = longest(TRAP_GHOST);
    feedbackGen++;
    promptTxt.textContent = '';
    caret.hidden = true;
    trap.classList.add('lvl2');

    const rebuilt = ensureCards();
    const traps  = cardsNow().filter(isTrapCard);
    const others = cardsNow().filter(c => !isTrapCard(c));

    if (!rebuilt) {
      /* 1. the three that are not trapeziums leave */
      await wait(300);
      others.forEach(c => c.classList.add('gone'));
      await wait(REDUCED ? 150 : 460);

      /* 2. the trapeziums glide into one row, in the order the names will
            be asked, and the green rings from the last question come off */
      await flipCards(traps, () => {
        others.forEach(c => { c.hidden = true; });
        traps.forEach(c => {
          c.classList.remove('correct');
          c.style.order = String(MATCH_ORDER.indexOf(c.dataset.kind));
        });
        cardGrid.classList.add('row');
        trapCards.classList.add('match');
      });
    }
    await wait(260);

    /* 3. a slot under each, left to right; then the three names, shuffled
          so their order never mirrors the shapes' */
    const slots = MATCH_ORDER.map(k => cardGrid.querySelector('.card[data-kind="' + k + '"] .card-slot'));
    for (const s of slots) {
      s.classList.add('reveal');
      sfx('click', .3);
      await wait(150);
    }
    await wait(300);
    const deck = trapChips.slice();
    for (let i = deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    deck.forEach(c => trapTray.appendChild(c));
    trapTray.classList.add('show');
    await wait(120);
    await dealChips(deck);
    await wait(300);

    /* 4. Swiftee jumps up from behind the board and says what to do, with
          the warm-up's voice-over for the same line */
    await mascotJumpIn();
    await wait(260);
    await voiced(TRAP.match, ROUNDS[1].audio);

    /* 5. the names go onto the shapes */
    await dragMatch(deck, slots,
      (chip, slot) => chip.dataset.kind === slot.dataset.accept,
      (chip, slot) => slot.closest('.card').classList.add('named'));
    if (mine !== runToken) throw CANCELLED;

    /* 6. all three named: Well Done, and Next */
    feedback(FEEDBACK.done);
    swiftee.play('proud', 1);
    skyConfetti(120, 3200);
    sfx('confetti', .8);
    await wait(2600);
    await showNext();
    await rtrapArea();
  }

  /* ---------- section 9: the area of a trapezium, three times ----------
   * One continuous derivation -- no Next until the formula is in -- with
   * Swiftee narrating every beat, from the heading first and then from
   * beside the working. It is played three times, once for each kind of
   * trapezium the learner has just named: right-angled (two copies make a
   * rectangle), then scalene and isosceles (two copies make a
   * parallelogram). The choreography is one piece of code; the kind only
   * changes the corners and the words. Each kind has two entry points, so
   * Replay and the jump menu can land on the rectangle as well as on the
   * start.
   *
   *   1. the last drawing goes (or, the first time, the cards) and a
   *      trapezium draws itself in the middle of the board; the
   *      right-angled one has its two right angles marked: "Let us try to
   *      find the area of this ... trapezium."
   *   2. it slides to the left and its sides are named on arrows: a along
   *      the top, b along the bottom, h up the left -- with the height
   *      itself dotted in when the left side is slanted
   *   3. a copy in sky blue appears over it, lifts, and turns half a circle
   *      about the middle of the right-hand side -- a finger pushes it round
   *      a curved arrow -- to land on the right, where the two make one
   *      rectangle or parallelogram; the copy's sides are named too, b on
   *      top and a below
   *   4. the equal sides are shown equal: b and b glow green together, then
   *      a and a
   *   5. the two names along the top merge into one, a + b, and so do the
   *      two along the bottom
   *   6. the drawing moves to the left half of the board and Swiftee hops
   *      down to the right half, beside the working: Total area = length ×
   *      breadth (or base × height) = (a + b) × h, lighting what it names
   *   7. the copy fades to a dashed outline -- the trapezium is exactly
   *      half: Area of Trapezium = Half of total area = ½ × (a + b) × h
   *   8. the copy goes, the trapezium comes back to the middle with a, b
   *      and h and its parallel marks, and the rule is boxed: Area of
   *      Trapezium = ½ × (sum of parallel sides) × height. Confetti, Next. */
  const rtrap       = document.getElementById('rtrap');
  const rtrapShape  = document.getElementById('rtrapShape');
  const rtrapSvg    = document.getElementById('rtrapSvg');
  const rtScene     = document.getElementById('rtScene');
  const rtArt       = document.getElementById('rtArt');
  const rtCopy      = document.getElementById('rtCopy');
  const rtDims      = document.getElementById('rtDims');
  const rtHl        = document.getElementById('rtHl');
  const rtGuide     = document.getElementById('rtGuide');
  const rtrapSay    = document.getElementById('rtrapSay');
  const rtrapMascot = document.getElementById('rtrapMascot');
  const rtrapText   = document.getElementById('rtrapText');
  const rtrapLines  = document.getElementById('rtrapLines');

  /* the geometry every kind shares, in the svg's units: the parallel sides
     a (top) and b (bottom) and the height h. A kind is told by how far its
     top side is set in from the left, x0: none for the right-angled
     trapezium, whose left side stands square; half of b - a for the
     isosceles, so both slants match; something else for the scalene. */
  const RT_A = 200, RT_B = 300, RT_H = 160;
  /* the middle of the viewBox, where the drawing is centred */
  const RT_MID = 260;

  function rtKind(key, name, x0, whole, dims) {
    const P = { TL: { x: x0, y: 0 }, TR: { x: x0 + RT_A, y: 0 }, BR: { x: RT_B, y: RT_H }, BL: { x: 0, y: RT_H } };
    /* the copy is the shape turned half a circle about M, the middle of the
       right-hand side, which is also the middle of the whole the two make */
    const M = { x: (P.TR.x + P.BR.x) / 2, y: RT_H / 2 };
    const rot = p => ({ x: 2 * M.x - p.x, y: 2 * M.y - p.y });
    const W = RT_A + RT_B;                            /* the whole's base */
    const right = Math.max(P.TR.x, P.BR.x);          /* the trapezium's own right edge */
    const shortName = name === 'Right-angled' ? name : name.toLowerCase();
    return {
      key: key, name: name, x0: x0, P: P, M: M, rot: rot, W: W, whole: whole,
      /* where the drawing sits: alone, the trapezium is centred; with the
         copy, the pair is */
      home: RT_MID - right / 2,
      pair: RT_MID - (x0 + W) / 2,
      say: {
        here:  'Let us try to find the area of this ' + name + ' trapezium.',
        sides: 'Its parallel sides are a and b, and its height is h.',
        copy:  'Let us take a copy of it and rotate it.',
        made:  'The two trapeziums fit together to make a ' + whole + '!',
        eqB:   'Look! Side b of the copy is equal to side b.',
        eqA:   'And side a of the copy is equal to side a.',
        sum:   whole === 'rectangle' ? 'So the rectangle is a + b long and h wide.'
                                     : 'So the parallelogram has base a + b and height h.',
        /* from beside the working */
        area:  'The area of the whole ' + whole + ' is:',
        half:  'Our trapezium is exactly half of this ' + whole + '.',
        so:    'So, the area of the trapezium is:',
        rule:  'This works for every trapezium!'
      },
      lines: {
        total:  [{ t: 'Total area = ' }, { t: dims[0], w: 'ab' }, { t: ' × ' }, { t: dims[1], w: 'h' }],
        total2: [{ t: '= ' }, { t: '(a + b)', w: 'ab' }, { t: ' × ' }, { t: 'h', w: 'h' }],
        half:   [{ t: 'Area of ' }, { t: 'Trapezium', w: 'trap' }, { t: ' = Half of total area' }],
        half2:  [{ t: '= ½ × ' }, { t: '(a + b)', w: 'ab' }, { t: ' × ' }, { t: 'h', w: 'h' }],
        /* the last two run to two lines by design -- the name, then the
           formula under it -- so they never break mid-formula in the column */
        final:  [{ t: 'Area of ' }, { t: name + ' Trapezium', w: 'trap' }, { t: String.fromCharCode(10) + '= ½ × (a + b) × h' }],
        rule:   [{ t: 'Area of Trapezium' + String.fromCharCode(10) + '= ½ × ' }, { t: '(sum of parallel sides)', w: 'ab' }, { t: ' × ' }, { t: 'height', w: 'h' }]
      },
      shortName: shortName
    };
  }
  const RT_KINDS = {
    right:   rtKind('right',   'Right-angled', 0,                    'rectangle',     ['length', 'breadth']),
    scalene: rtKind('scalene', 'Scalene',      70,                   'parallelogram', ['base', 'height']),
    iso:     rtKind('iso',     'Isosceles',    (RT_B - RT_A) / 2,    'parallelogram', ['base', 'height'])
  };
  const rtHeadLines = k => [k.say.here, k.say.sides, k.say.copy, k.say.made, k.say.eqB, k.say.eqA, k.say.sum];
  const rtSayLines  = k => [k.say.area, k.say.half, k.say.so, k.say.rule];

  /* the kind on the board right now, and where its drawing sits */
  let rk = RT_KINDS.right;
  let rtX = rk.home;

  /* the say line's ghost holds the longest line of any kind from the first
     frame, so the row is one size for all three */
  rtrapText.querySelector('.type-ghost').textContent =
    longest(Object.keys(RT_KINDS).reduce((all, k) => all.concat(rtSayLines(RT_KINDS[k])), []));
  const rtSay = typer(rtrapText.querySelector('.txt'), rtrapText.querySelector('.caret'), 45);

  /* the finger: the rhombus hint's, so the two are one drawing */
  const HAND_D = rhomHint.querySelector('path').getAttribute('d');

  const rtDim  = cls => rtDims.querySelector('.' + cls);
  const rtLine = (cls, a, b) => '<line class="' + cls + '" x1="' + fmt(a.x) + '" y1="' + fmt(a.y) + '" x2="' + fmt(b.x) + '" y2="' + fmt(b.y) + '" />';

  /* a two-headed arrow from a to b, with its letter set at (lx, ly): the
     parallelogram's dimension language, so the same classes style it.
     `extra` is anything else the group carries, drawn after the arrow. */
  function rtArrow(cls, a, b, label, lx, ly, anchor, extra) {
    const u = rhUnit(b, a), HEAD = 10;
    const head = (tip, d) => {
      const n = { x: -d.y, y: d.x };
      return '<path class="d-head" d="M' + fmt(tip.x - d.x * HEAD + n.x * HEAD * .65) + ' ' + fmt(tip.y - d.y * HEAD + n.y * HEAD * .65) +
        ' L' + fmt(tip.x) + ' ' + fmt(tip.y) +
        ' L' + fmt(tip.x - d.x * HEAD - n.x * HEAD * .65) + ' ' + fmt(tip.y - d.y * HEAD - n.y * HEAD * .65) + '" />';
    };
    return '<g class="d-group ' + cls + '">' +
      rtLine('d-arrow', a, b) +
      head(a, { x: -u.x, y: -u.y }) + head(b, u) +
      (extra || '') +
      '<text class="d-label" x="' + fmt(lx) + '" y="' + fmt(ly) + '" font-size="21" text-anchor="' + anchor + '" dominant-baseline="middle">' + label + '</text>' +
    '</g>';
  }

  /* the whole drawing for one kind, put back to its first frame */
  function buildRtrap(kind) {
    rk = kind || rk;
    const P = rk.P, M = rk.M, rot = rk.rot, W = rk.W;
    const pts = [P.TL, P.TR, P.BR, P.BL];
    const path = 'M' + pts.map(p => fmt(p.x) + ' ' + fmt(p.y)).join(' L') + ' Z';
    const S = 16;                                  /* the right-angle marks' side */
    rtArt.innerHTML =
      '<polygon class="shape-fill" clip-path="url(#wipeRtrap)" points="' + pts.map(pt).join(' ') + '" />' +
      '<path class="shape-outline" d="' + path + '" fill="none" stroke-width="5" />' +
      /* the right-angled trapezium's two right angles, in its left corners */
      (rk.x0 === 0 ?
        '<path class="rt-mark" d="M' + fmt(P.TL.x) + ' ' + fmt(P.TL.y + S) + ' h' + S + ' v' + (-S) + '" />' +
        '<path class="rt-mark" d="M' + fmt(P.BL.x) + ' ' + fmt(P.BL.y - S) + ' h' + S + ' v' + S + '" />' : '');

    /* the copy: the same corners, turned by its transform */
    rtCopy.innerHTML =
      '<polygon class="rt-cfill" points="' + pts.map(pt).join(' ') + '" />' +
      '<path class="rt-cline" d="' + path + '" />' +
      '<path class="rt-cdash" d="' + path + '" />';
    rtCopy.setAttribute('transform', 'rotate(0 ' + fmt(M.x) + ' ' + fmt(M.y) + ')');
    rtCopy.classList.remove('show', 'flying');
    rtScene.insertBefore(rtCopy, rtArt);           /* under the trapezium until it lifts */

    /* the names: a and b along the trapezium's top and bottom and h up its
       left; b and a along the copy's top and bottom; and a + b along the
       whole of the top and of the bottom. When the left side is slanted,
       the height is also dotted in from the top-left corner straight down
       to the base, with a right angle at its foot, so h is seen to be the
       distance between the parallel sides and not the slanted side. */
    const G = 26, LAB = 17, yT = -G, yB = RT_H + G, MK = 12;
    const top = (cls, x1, x2, lab) => rtArrow(cls + ' rt-len', { x: x1, y: yT }, { x: x2, y: yT }, lab, (x1 + x2) / 2, yT - LAB, 'middle');
    const bot = (cls, x1, x2, lab) => rtArrow(cls + ' rt-len', { x: x1, y: yB }, { x: x2, y: yB }, lab, (x1 + x2) / 2, yB + LAB + 1, 'middle');
    const inner = rk.x0 === 0 ? '' :
      rtLine('d-height', P.TL, { x: P.TL.x, y: RT_H }) +
      '<path class="d-mark" d="M' + fmt(P.TL.x) + ' ' + fmt(RT_H - MK) + ' H' + fmt(P.TL.x + MK) + ' V' + fmt(RT_H) + '" />';
    rtDims.innerHTML =
      top('top-a', P.TL.x, P.TR.x, 'a') +
      bot('bot-b', P.BL.x, P.BR.x, 'b') +
      rtArrow('left-h rt-hgt', { x: -G, y: 0 }, { x: -G, y: RT_H }, 'h', -G - LAB, RT_H / 2, 'end', inner) +
      top('top-b', P.TR.x, P.TR.x + RT_B, 'b') +
      bot('bot-a', P.BR.x, W, 'a') +
      top('top-ab', P.TL.x, P.TL.x + W, 'a + b') +
      bot('bot-ab', P.BL.x, W, 'a + b') +
      '<g class="rt-par">' + parMark(P.TL, P.TR) + parMark(P.BL, P.BR) + '</g>';

    /* the glowing copies of the sides compared: b along the trapezium's
       bottom and the copy's top, a along the trapezium's top and the copy's
       bottom */
    rtHl.innerHTML =
      rtLine('hl-b1', P.BL, P.BR) + rtLine('hl-b2', rot(P.BR), rot(P.BL)) +
      rtLine('hl-a1', P.TL, P.TR) + rtLine('hl-a2', rot(P.TR), rot(P.TL));

    /* the turn: a dot on M, an arc round it from the left over the top to
       the right, an arrowhead at its end, and the finger */
    const R = 64, a0 = Math.PI * 200 / 180, a1 = Math.PI * 340 / 180;
    const at = t => ({ x: M.x + R * Math.cos(t), y: M.y + R * Math.sin(t) });
    const S0 = at(a0), S1 = at(a1);
    const d = { x: -Math.sin(a1), y: Math.cos(a1) }, n = { x: -d.y, y: d.x }, HD = 11;
    rtGuide.innerHTML =
      '<circle class="rt-pivot" cx="' + fmt(M.x) + '" cy="' + fmt(M.y) + '" r="5" />' +
      '<path class="rt-arc" d="M' + fmt(S0.x) + ' ' + fmt(S0.y) + ' A' + R + ' ' + R + ' 0 0 1 ' + fmt(S1.x) + ' ' + fmt(S1.y) + '" />' +
      '<path class="rt-arc-head" d="M' + fmt(S1.x - d.x * HD + n.x * HD * .7) + ' ' + fmt(S1.y - d.y * HD + n.y * HD * .7) +
        ' L' + fmt(S1.x) + ' ' + fmt(S1.y) +
        ' L' + fmt(S1.x - d.x * HD - n.x * HD * .7) + ' ' + fmt(S1.y - d.y * HD - n.y * HD * .7) + '" />' +
      '<g class="rt-hand"><path d="' + HAND_D + '" /></g>';
    rtGuide.classList.remove('show', 'tip');

    rtX = rk.home;
    rtScene.setAttribute('transform', 'translate(' + fmt(rtX) + ' 0)');
    rtrapShape.classList.remove('marked', 'parallel', 'ghost', 'alone', 'lit-rect', 'pulse');
  }

  /* the drawing slides from where it is to x */
  function rtSlide(x, ms) {
    const from = rtX;
    rtX = x;
    return tween(ms || 820, p => {
      rtScene.setAttribute('transform', 'translate(' + fmt(from + (x - from) * p) + ' 0)');
    }, easeInOut);
  }

  /* a name arrives: its arrow grows along the side (and the dotted height
     with it, where there is one), then the heads and the letter come on */
  async function rtDraw(cls, ms) {
    const g = rtDim(cls);
    await Promise.all(Array.from(g.querySelectorAll('.d-arrow, .d-height')).map(l => growLine(l, ms || 560)));
    g.classList.add('on');
    sfx('click', .3);
    await wait(REDUCED ? 80 : 240);
  }

  /* a name already in place, without the choreography */
  function rtSet(cls, gone) {
    const g = rtDim(cls);
    g.querySelectorAll('.d-arrow, .d-height').forEach(l => { l.style.opacity = 1; });
    g.classList.add('on');
    g.classList.toggle('gone', !!gone);
  }

  /* the outline of the whole glows, as one */
  function rtGlow() {
    rtrapShape.classList.remove('lit-rect');
    void rtrapShape.offsetWidth;
    rtrapShape.classList.add('lit-rect');
  }

  /* the finger rides the tip of the arc as it draws */
  function rtHandAt(hand, q) {
    hand.setAttribute('transform', 'translate(' + fmt(q.x - 20.7) + ' ' + fmt(q.y - 5.4) + ') scale(1.8)');
  }

  /* The copy lifts off the trapezium and turns half a circle about M,
     pushed round by a finger riding a curved arrow that draws itself as the
     copy turns. It lands on the right, settles under the trapezium (so the
     side they share keeps the trapezium's colour), and the whole's outline
     glows once. */
  async function rtTurnCopy() {
    const M = fmt(rk.M.x) + ' ' + fmt(rk.M.y);
    /* the copy peels up a little as it appears, so it reads as a second
       sheet lying over the trapezium rather than as the trapezium changing
       colour; the offset is taken back as it turns */
    const PEEL = { x: 10, y: -12 };
    rtScene.insertBefore(rtCopy, rtDims);          /* over the trapezium while in the air */
    rtCopy.setAttribute('transform', 'translate(' + PEEL.x + ' ' + PEEL.y + ') rotate(0 ' + M + ')');
    rtCopy.classList.add('show');
    const arc  = rtGuide.querySelector('.rt-arc');
    const hand = rtGuide.querySelector('.rt-hand');
    let L = 200;
    try { L = arc.getTotalLength() || L; } catch (e) { /* keep guard */ }
    arc.style.strokeDasharray = L;
    arc.style.strokeDashoffset = L;
    rtHandAt(hand, arc.getPointAtLength(0));
    rtGuide.classList.add('show');
    await wait(REDUCED ? 100 : 560);

    rtCopy.classList.add('flying');
    sfx('click', .35);
    await tween(1600, p => {
      const lift = 34 * Math.sin(Math.PI * p);
      const ox = PEEL.x * (1 - p), oy = PEEL.y * (1 - p) - lift;
      rtCopy.setAttribute('transform', 'translate(' + fmt(ox) + ' ' + fmt(oy) + ') rotate(' + fmt(180 * p) + ' ' + M + ')');
      arc.style.strokeDashoffset = L * (1 - p);
      rtHandAt(hand, arc.getPointAtLength(L * p));
    }, easeInOut);
    rtGuide.classList.add('tip');
    rtCopy.classList.remove('flying');
    rtCopy.setAttribute('transform', 'rotate(180 ' + M + ')');
    rtScene.insertBefore(rtCopy, rtArt);           /* landed: under the trapezium */
    rtGlow();
    sfx('correct', .45);
    await wait(REDUCED ? 100 : 520);
    rtGuide.classList.remove('show');
  }

  /* two equal sides shown equal: a glow grows along both together, their
     names go green with it, and both fade again */
  async function rtCompare(k) {
    const names = k === 'b' ? ['bot-b', 'top-b'] : ['top-a', 'bot-a'];
    const lines = [1, 2].map(i => rtHl.querySelector('.hl-' + k + i));
    await Promise.all(lines.map(l => growLine(l, 720)));
    names.forEach(c => rtDim(c).classList.add('eq'));
    sfx('correct', .4);
    await wait(REDUCED ? 300 : 1500);
    lines.forEach(l => { l.style.opacity = ''; });
    names.forEach(c => rtDim(c).classList.remove('eq'));
    await wait(REDUCED ? 100 : 460);
  }

  /* the two names along the top become one, a + b -- and the bottom's too */
  async function rtMerge() {
    ['top-a', 'top-b', 'bot-b', 'bot-a'].forEach(c => rtDim(c).classList.add('gone'));
    await wait(REDUCED ? 60 : 200);
    await Promise.all([rtDraw('top-ab', 760), rtDraw('bot-ab', 760)]);
  }

  /* a key word has landed in the working: light what it names */
  function onRtWord(w) {
    if (w === 'ab') {
      ['top-a', 'bot-b', 'top-b', 'bot-a', 'top-ab', 'bot-ab'].forEach(c => rtDim(c).classList.add('lit'));
      return;
    }
    if (w === 'h') { rtDim('left-h').classList.add('lit'); return; }
    /* the trapezium itself: it swells once */
    rtrapShape.classList.remove('pulse');
    void rtrapShape.offsetWidth;
    rtrapShape.classList.add('pulse');
    setTimeout(() => rtrapShape.classList.remove('pulse'), 700);
  }

  /* Swiftee's line from beside the working */
  async function rtTalk(text) {
    swiftee.hold('talking');
    await rtSay(text);
    swiftee.release();
  }

  /* a line of working, said along with */
  async function rtWork(segs) {
    swiftee.hold('talking');
    const line = await showTypedLine(segs, rtrapLines, onRtWord);
    swiftee.release();
    return line;
  }

  /* the lines of working step back together */
  async function rtClear() {
    const lines = Array.from(rtrapLines.children);
    if (!lines.length) return;
    lines.forEach(l => l.classList.add('off'));
    await wait(REDUCED ? 100 : 420);
    lines.forEach(l => l.remove());
  }

  /* the whole as the first scene leaves it, without the choreography: for
     a replay of, or a jump into, the second scene */
  function rtWhole(kind) {
    buildRtrap(kind);
    const outline = rtArt.querySelector('.shape-outline');
    outline.style.strokeDasharray = 'none';
    outline.style.strokeDashoffset = '0';
    rtArt.querySelector('.shape-fill').style.opacity = 1;
    rtrapShape.classList.add('marked');
    rtX = rk.pair;
    rtScene.setAttribute('transform', 'translate(' + fmt(rtX) + ' 0)');
    rtCopy.classList.add('show');
    rtCopy.setAttribute('transform', 'rotate(180 ' + fmt(rk.M.x) + ' ' + fmt(rk.M.y) + ')');
    ['top-a', 'top-b', 'bot-b', 'bot-a'].forEach(c => rtSet(c, true));
    ['left-h', 'top-ab', 'bot-ab'].forEach(c => rtSet(c, false));
  }

  /* ---- the whole: the trapezium, and a copy that completes it ---- */
  async function rtArea(kind, entry) {
    lockInput(true);
    sceneStart(entry);
    promptGhost.textContent = longest(rtHeadLines(kind));
    feedbackGen++;
    promptTxt.textContent = '';
    caret.hidden = true;
    board.classList.add('sec7');

    /* 1. the board is cleared for the trapezium. The first time the cards
          fade under it; after that the last kind's drawing and working fade
          and Swiftee hops back up to the heading (a Back into this scene
          may find the bird elsewhere, so it jumps up if it is not there) */
    const wasOn = rtrap.classList.contains('on') && !!rtArt.firstChild;
    if (wasOn) {
      const clearing = rtClear();
      rtrapSay.classList.remove('show');
      rtrapShape.classList.add('away');
      if (rtrapMascot.classList.contains('in')) await hopBetween(rtrapMascot, boardMascot);
      await clearing;
      await wait(REDUCED ? 100 : 360);
    }
    rtrap.classList.remove('wide');              /* the drawing has the whole width until the working */
    rtrapSay.classList.remove('show');
    rtrapLines.textContent = '';
    rtrapLines.classList.remove('rule');
    buildRtrap(kind);
    rtrapShape.classList.remove('away');
    if (!wasOn) {
      await wait(REDUCED ? 150 : 480);
      rtrap.classList.add('on');
      rtrap.setAttribute('aria-hidden', 'false');
      await wait(120);
    }
    if (!boardMascot.classList.contains('in')) { await mascotJumpIn(); await wait(200); }
    await revealShape(rtrapShape);
    await wait(200);
    rtrapShape.classList.add('marked');
    if (rk.x0 === 0) sfx('click', .35);
    await wait(360);
    await heading(rk.say.here);
    await wait(1100);

    /* 2. it moves over to the left, and its sides are named as Swiftee
          says them: a along the top, b along the bottom, h up the left */
    await rtSlide(rk.pair);
    await wait(200);
    let said = heading(rk.say.sides);
    await wait(300);
    await rtDraw('top-a');
    await rtDraw('bot-b');
    await rtDraw('left-h');
    await said;
    await wait(900);

    /* 3. a copy lifts off and turns half a circle to land beside it: the
          two make a rectangle or a parallelogram, and the copy's sides are
          named too */
    said = heading(rk.say.copy);
    await wait(500);
    await rtTurnCopy();
    await said;
    await wait(200);
    said = heading(rk.say.made);
    await wait(300);
    await rtDraw('top-b');
    await rtDraw('bot-a');
    await said;
    await wait(900);

    /* 4. the equal sides, shown equal: b and b, then a and a */
    said = heading(rk.say.eqB);
    await rtCompare('b');
    await said;
    await wait(300);
    said = heading(rk.say.eqA);
    await rtCompare('a');
    await said;
    await wait(300);

    /* 5. the two names along the top become one, a + b; the bottom's too */
    said = heading(rk.say.sum);
    await wait(300);
    await rtMerge();
    await said;
    await wait(1100);
  }

  /* ---- the half ----
     A fresh entry (Replay, or the jump menu) finds the first scene's
     drawing gone and puts the whole back as it was left. */
  async function rtHalf(kind, entry) {
    lockInput(true);
    sceneStart(entry);
    feedbackGen++;
    promptTxt.textContent = '';
    caret.hidden = true;
    board.classList.add('sec7');
    rtrap.classList.add('on');
    rtrap.setAttribute('aria-hidden', 'false');
    if (rk !== kind || !rtArt.firstChild || !rtCopy.classList.contains('show')) rtWhole(kind);
    rtrapLines.textContent = '';
    rtrapLines.classList.remove('rule');
    /* the last kind's closing line must not show while the row comes back */
    rtrapText.querySelector('.txt').textContent = '';
    rtrapText.querySelector('.caret').hidden = true;

    /* 6. the drawing moves to the left half of the board and Swiftee hops
          down to the right half, beside the working: the whole's area,
          from the two lengths it has just named */
    rtrapSay.classList.add('show');
    await layoutWide(rtrap, rtrapSvg);
    await wait(REDUCED ? 100 : 260);
    if (boardMascot.classList.contains('in')) await hopBetween(boardMascot, rtrapMascot);
    else await mascotJumpIn(rtrapMascot);
    await wait(260);
    await rtTalk(rk.say.area);
    await wait(200);
    await rtWork(rk.lines.total);
    await wait(500);
    await rtWork(rk.lines.total2);
    rtGlow();
    await wait(1800);

    /* 7. the copy fades to a dashed outline: the trapezium is exactly half
          of the whole, so its area is half of the whole's */
    await rtClear();
    rtDims.querySelectorAll('.d-group').forEach(g => g.classList.remove('lit'));
    rtrapShape.classList.add('ghost');
    await rtTalk(rk.say.half);
    await wait(300);
    await rtWork(rk.lines.half);
    await wait(500);
    await rtWork(rk.lines.half2);
    await wait(1800);

    /* 8. the copy goes; the trapezium comes back to the middle with its own
          names and its parallel marks, and the rule is boxed */
    await rtClear();
    rtrapShape.classList.add('alone');
    ['top-ab', 'bot-ab'].forEach(c => rtDim(c).classList.add('gone'));
    rtDims.querySelectorAll('.d-group').forEach(g => g.classList.remove('lit'));
    await wait(REDUCED ? 100 : 500);
    ['top-a', 'bot-b'].forEach(c => rtDim(c).classList.remove('gone'));
    await rtSlide(rk.home);
    rtrapShape.classList.add('parallel');
    sfx('click', .3);
    await wait(400);
    rtrapLines.classList.add('rule');
    await rtTalk(rk.say.so);
    await wait(200);
    await rtWork(rk.lines.final);
    await wait(900);
    await rtTalk(rk.say.rule);
    await wait(200);
    await rtWork(rk.lines.rule);
    swiftee.play('proud', 1);
    skyConfetti(120, 3200);
    sfx('confetti', .8);
    await wait(2600);
    await showNext();
  }

  /* the six scenes: each kind's whole, straight on into its half (no Next
     between them -- the derivation is one piece), then Next and the next
     kind. Each is its own function, so Replay and the jump menu can re-enter
     it on its own. */
  async function rtrapArea() { await rtArea(RT_KINDS.right, rtrapArea); await rtrapHalf(); }
  async function rtrapHalf() { await rtHalf(RT_KINDS.right, rtrapHalf); await scalArea(); }
  async function scalArea()  { await rtArea(RT_KINDS.scalene, scalArea);  await scalHalf(); }
  async function scalHalf()  { await rtHalf(RT_KINDS.scalene, scalHalf);  await isoArea(); }
  async function isoArea()   { await rtArea(RT_KINDS.iso, isoArea);       await isoHalf(); }
  async function isoHalf()   { await rtHalf(RT_KINDS.iso, isoHalf);         await trapNumbers(); }

  /* ---------- section 9, the practice: the trapezium's area in use ----------
   * Five questions on what the derivation built, a Next between each, on
   * the rhombus practice's pattern: the derivation's drawing fades and
   * figures built for each question draw themselves in its place.
   *
   *   1. "Drag the values into the area formula." -- a trapezium measured
   *      8 cm, 14 cm and 6 cm; A = ½ × ( [a] + [b] ) × [h] under it with
   *      the three values to drag in. Either parallel side may go in either
   *      of the first two boxes; anything else is shaken off
   *   2. the figure moves to the left and Swiftee hops down to the right:
   *      "Follow each simplification step." -- the working from the formula
   *      in words down to 66 sq. cm, one line at a time
   *   3. a trapezium measured 18 cm, 20 cm and 10 cm, with two drop-downs
   *      under it: the sum of the parallel sides, and the height
   *   4. the same figure: "Choose the correct area of the above trapezium."
   *      over three chips
   *   5. two trapeziums: "Tap the trapezium which has the largest area." --
   *      the working appears under each, and Swiftee hops down to say which */
  const rtrapPractice = document.getElementById('rtrapPractice');
  const rtFigRow      = document.getElementById('rtFigRow');
  const rtrapQuiz     = document.getElementById('rtrapQuiz');
  const rtrapFormula  = document.getElementById('rtrapFormula');
  const tpSlots       = Array.from(rtrapFormula.querySelectorAll('.fslot'));
  const rtrapTray     = document.getElementById('rtrapTray');
  const tpChips       = Array.from(rtrapTray.querySelectorAll('.chip'));
  const rtrapQs       = document.getElementById('rtrapQs');
  const rtrapPTray    = document.getElementById('rtrapPTray');
  const rtrapPSay     = document.getElementById('rtrapPSay');
  const rtrapPMascot  = document.getElementById('rtrapPMascot');
  const rtrapPText    = document.getElementById('rtrapPText');

  const TP = {
    drag:    'Drag the values into the area formula.',
    dragOk:  'That’s Correct! A = ½ × (8 + 14) × 6',
    steps:   'Follow each simplification step.',
    read:    'Look at the trapezium and choose the correct values.',
    readOk:  'That’s Correct! 18 + 20 = 38 cm, and the height is 10 cm.',
    area:    'Choose the correct area of the above trapezium.',
    areaOk:  'That’s Correct! ½ × 38 × 10 = 190 sq. cm',
    larger:  'Tap the trapezium which has the largest area.',
    largerLine: [{ t: 'Trapezium I', w: 'trap' }, { t: ' has the largest area.' }]
  };
  const TP_GHOST = [TP.drag, TP.dragOk, TP.read, TP.readOk, TP.area, TP.areaOk, TP.larger];
  const TP_STEPS = [
    [{ t: 'A = ½ × ' }, { t: '(sum of parallel sides)', w: 'ab' }, { t: ' × ' }, { t: 'perpendicular height', w: 'h' }],
    [{ t: 'A = ½ × ' }, { t: '(8 + 14)', w: 'ab' }, { t: ' × ' }, { t: '6', w: 'h' }],
    [{ t: 'A = ½ × 22 × 6' }],
    [{ t: 'A = 11 × 6' }],
    [{ t: 'A = ' }, { t: '66 sq. cm', w: 'trap' }]
  ];

  /* the banner's ghost holds its whole line from the first frame */
  segSpans(rtrapPText.querySelector('.type-ghost'), TP.largerLine).forEach((el, j) => { el.textContent = TP.largerLine[j].t; });

  /* ---- the figures ----
   * A trapezium in the practice's 360 x 260 box, from its four corners:
   * the two parallel sides measured on arrows above and below, the height
   * dotted in from one corner to the opposite parallel side with a right
   * angle at its foot, and the parallel marks. `hgt` says which corner the
   * height drops from and which way its label and mark sit. */
  function figTrap(key, name, P, labels, hgt) {
    const pts = [P.TL, P.TR, P.BR, P.BL];
    const art =
      '<polygon class="shape-fill" clip-path="url(#wipeFig' + key + ')" points="' + pts.map(pt).join(' ') + '" />' +
      '<path class="shape-outline" d="M' + pts.map(p => fmt(p.x) + ' ' + fmt(p.y)).join(' L') + ' Z" fill="none" stroke-width="5" />';
    const yT = P.TL.y - 22, yB = P.BL.y + 22;
    let over =
      figMeasure('d-top rt-len', { x: P.TL.x, y: yT }, { x: P.TR.x, y: yT }, labels.a, [], false) +
      figMeasure('d-bot rt-len', { x: P.BL.x, y: yB }, { x: P.BR.x, y: yB }, labels.b, [], false);
    /* the height: from `from` straight to the other parallel side */
    const from = P[hgt.from], foot = { x: from.x, y: hgt.from.charAt(0) === 'T' ? P.BL.y : P.TL.y };
    const M = 11, up = foot.y > from.y ? -1 : 1, side = hgt.side;
    over += '<g class="d-group d-hgt">' +
      figLine('d-height', from, foot) +
      '<path class="d-mark" d="M' + fmt(foot.x) + ' ' + fmt(foot.y + up * M) + ' H' + fmt(foot.x + side * M) + ' V' + fmt(foot.y) + '" />' +
      '<text class="d-label" x="' + fmt(foot.x + side * 10) + '" y="' + fmt((from.y + foot.y) / 2) + '" font-size="17" text-anchor="' + (side > 0 ? 'start' : 'end') + '" dominant-baseline="middle">' + labels.h + '</text>' +
    '</g>';
    over += '<g class="rt-par">' + parMark(P.TL, P.TR) + parMark(P.BL, P.BR) + '</g>';
    return figShell(key, name, art, over);
  }
  /* the four figures, in the box's units */
  const TP_FIGS = {
    /* 8, 14 and 6: the bottom is 300 wide, the top set in and shorter */
    n:  { P: { TL: { x: 85, y: 62 }, TR: { x: 256, y: 62 }, BR: { x: 330, y: 190 }, BL: { x: 30, y: 190 } },
          labels: { a: '8 cm', b: '14 cm', h: '6 cm' }, hgt: { from: 'TL', side: 1 } },
    /* 18, 20 and 10 */
    p:  { P: { TL: { x: 50, y: 40 }, TR: { x: 320, y: 40 }, BR: { x: 330, y: 190 }, BL: { x: 30, y: 190 } },
          labels: { a: '18 cm', b: '20 cm', h: '10 cm' }, hgt: { from: 'TL', side: 1 } },
    /* 40 on top, 25 below, 20 high: the height rises from the bottom-right corner */
    I:  { P: { TL: { x: 30, y: 40 }, TR: { x: 330, y: 40 }, BR: { x: 236, y: 190 }, BL: { x: 48, y: 190 } },
          labels: { a: '40 cm', b: '25 cm', h: '20 cm' }, hgt: { from: 'BR', side: -1 } },
    /* 30 on top, 40 below, 15 high, its right side square */
    II: { P: { TL: { x: 105, y: 78 }, TR: { x: 330, y: 78 }, BR: { x: 330, y: 190 }, BL: { x: 30, y: 190 } },
          labels: { a: '30 cm', b: '40 cm', h: '15 cm' }, hgt: { from: 'TL', side: 1 } }
  };
  const tpFig = (key, name) => figTrap(key, name || '', TP_FIGS[key].P, TP_FIGS[key].labels, TP_FIGS[key].hgt);
  const tpFigEl = key => figEl(key, rtFigRow);

  /* a figure already drawn, with all its marks, without the choreography:
     for a replay of, or a jump into, a question that inherits its figure */
  function tpEnsureFig(key) {
    if (tpFigEl(key)) return false;
    rtFigRow.innerHTML = tpFig(key);
    rtFigRow.classList.remove('off');
    rtFigRow.classList.add('single');
    rtrapPractice.classList.add('on');
    const f = tpFigEl(key);
    const outline = f.querySelector('.shape-outline');
    outline.style.strokeDasharray = 'none';
    outline.style.strokeDashoffset = '0';
    f.querySelector('.shape-fill').style.opacity = 1;
    f.querySelectorAll('.d-arrow, .d-height').forEach(l => { l.style.opacity = 1; });
    f.querySelectorAll('.d-group').forEach(g => g.classList.add('on'));
    f.querySelectorAll('.par-mark').forEach(m => m.classList.add('on'));
    return true;
  }

  /* a value lands in the working or the formula: the part of the figure it
     names lights up */
  function tpLight(key, what) {
    const f = tpFigEl(key);
    if (!f) return;
    const cls = { a: '.d-top', b: '.d-bot', ab: '.d-top, .d-bot', h: '.d-hgt' }[what];
    if (cls) f.querySelectorAll(cls).forEach(g => g.classList.add('lit'));
  }
  function onTpWord(w) {
    if (w === 'ab' || w === 'h') { tpLight('n', w); return; }
    const f = tpFigEl('n');
    if (!f) return;
    f.classList.remove('pulse');
    void f.offsetWidth;
    f.classList.add('pulse');
    setTimeout(() => f.classList.remove('pulse'), 700);
  }

  /* the values go home between scenes: a replay may find them docked */
  function homeTpChips() {
    tpChips.forEach(c => { rtrapTray.appendChild(c); c.disabled = false; c.classList.remove('reveal', 'picked', 'dragging', 'reject'); });
    tpSlots.forEach(s => s.classList.remove('filled', 'over', 'correct', 'reject'));
  }

  /* the common opening of a practice question: the heading clears, the
     derivation's drawing stays away, and Swiftee is put back at the heading
     if the last question left it down by the working or the banner */
  async function tpOpen(again) {
    lockInput(true);
    sceneStart(again);
    const mine = runToken;
    promptGhost.textContent = longest(TP_GHOST);
    feedbackGen++;
    promptTxt.textContent = '';
    caret.hidden = true;
    board.classList.add('sec7');
    rtrap.classList.add('on');
    rtrap.setAttribute('aria-hidden', 'false');
    rtrapShape.classList.add('away');
    rtrapLines.classList.remove('rule', 'steps');
    const clearing = rtClear();
    rtrapSay.classList.remove('show');
    rtrapPSay.classList.remove('show');
    if (rtrapMascot.classList.contains('in')) await hopBetween(rtrapMascot, boardMascot);
    else if (rtrapPMascot.classList.contains('in')) await hopBetween(rtrapPMascot, boardMascot);
    else if (!boardMascot.classList.contains('in')) await mascotJumpIn();
    await clearing;
    rtrapLines.textContent = '';
    rtrapText.querySelector('.txt').textContent = '';
    return mine;
  }

  /* 1. the values into the formula */
  async function trapNumbers() {
    const mine = await tpOpen(trapNumbers);
    homeTpChips();
    rtrapQuiz.classList.remove('show');
    rtrapFormula.classList.remove('show');
    rtrapQs.classList.remove('show');
    rtrapPTray.classList.add('off');
    await wait(300);
    rtrap.classList.remove('wide');
    await clearFigures(rtFigRow);
    tpSlots.forEach(s => s.classList.remove('filled'));
    await showFigures(tpFig('n'), rtFigRow, rtrapPractice);
    await wait(300);

    /* Swiftee asks; the formula comes up with its three empty boxes, and
       the values under it */
    await heading(TP.drag);
    await wait(300);
    rtrapQuiz.classList.add('show');
    await wait(200);
    rtrapFormula.classList.add('show');
    sfx('click', .3);
    await wait(REDUCED ? 160 : 520);
    await dealChips(tpChips);

    /* the drag: either parallel side in either of the first two boxes, but
       not the same one twice; only the height in the last */
    const taken = () => tpSlots.filter(s => s.classList.contains('filled')).map(s => s.querySelector('.chip').dataset.len);
    const fits = (chip, slot) => {
      const v = chip.dataset.len;
      if (slot.dataset.accept === 'h') return v === '6';
      return (v === '8' || v === '14') && taken().indexOf(v) === -1;
    };
    await dragMatch(tpChips, tpSlots, fits, chip => tpLight('n', { 8: 'a', 14: 'b', 6: 'h' }[chip.dataset.len]));
    if (mine !== runToken) throw CANCELLED;

    /* all three in: the formula, filled */
    feedback(FEEDBACK.done);
    await wait(900);
    await heading(TP.dragOk);
    swiftee.play('proud', 1);
    skyConfetti(120, 3200);
    sfx('confetti', .8);
    await wait(2400);
    await showNext();
    await trapSteps();
  }

  /* 2. step by step to the answer */
  async function trapSteps() {
    lockInput(true);
    sceneStart(trapSteps);
    promptGhost.textContent = longest(TP_GHOST);
    feedbackGen++;
    promptTxt.textContent = '';
    caret.hidden = true;
    board.classList.add('sec7');
    rtrap.classList.add('on');
    rtrap.setAttribute('aria-hidden', 'false');
    rtrapShape.classList.add('away');
    rtrapPSay.classList.remove('show');
    rtrapQs.classList.remove('show');
    rtrapPTray.classList.add('off');
    tpEnsureFig('n');
    const fig = tpFigEl('n');
    fig.querySelectorAll('.d-group').forEach(g => g.classList.remove('lit'));
    rtrapLines.textContent = '';
    rtrapLines.classList.remove('rule');
    rtrapLines.classList.add('steps');
    rtrapText.querySelector('.txt').textContent = '';
    rtrapText.querySelector('.caret').hidden = true;

    /* the formula and the values leave; the figure moves to the left half
       and Swiftee hops down to the right half */
    rtrapQuiz.classList.remove('show');
    await wait(REDUCED ? 100 : 460);
    rtrapSay.classList.add('show');
    await layoutWide(rtrap, fig.querySelector('svg'));
    await wait(REDUCED ? 100 : 260);
    if (boardMascot.classList.contains('in')) await hopBetween(boardMascot, rtrapMascot);
    else if (!rtrapMascot.classList.contains('in')) await mascotJumpIn(rtrapMascot);
    await wait(260);
    await rtTalk(TP.steps);
    await wait(300);

    /* the working, a line at a time, lighting the figure as it goes */
    for (let i = 0; i < TP_STEPS.length; i++) {
      swiftee.hold('talking');
      await showTypedLine(TP_STEPS[i], rtrapLines, onTpWord);
      swiftee.release();
      await wait(i < TP_STEPS.length - 1 ? 520 : 300);
    }
    swiftee.play('proud', 1);
    skyConfetti(120, 3200);
    sfx('confetti', .8);
    await wait(2600);
    await showNext();
    await trapPractice1();
  }

  /* 3. read the sum of the parallel sides and the height off a trapezium */
  async function trapPractice1() {
    const mine = await tpOpen(trapPractice1);
    rtrapQuiz.classList.remove('show');
    rtrapPTray.classList.add('off');
    rtrapQs.classList.remove('show');
    rtrapQs.textContent = '';

    /* the last figure goes, and the question's own draws itself in the
       middle of the board */
    await clearFigures(rtFigRow);
    rtrap.classList.remove('wide');
    await wait(200);
    await showFigures(tpFig('p'), rtFigRow, rtrapPractice);
    await wait(300);

    /* two questions at once, read off the figure; the part named lights
       up as each is got right */
    await heading(TP.read);
    const right = () => feedback(FEEDBACK.right);
    const wrong = () => feedback(FEEDBACK.wrong);
    const q1 = questionLine('Sum of parallel sides is',
      [{ v: '30', t: '30 cm' }, { v: '38', t: '38 cm' }, { v: '28', t: '28 cm' }]);
    const q2 = questionLine('Height is',
      [{ v: '18', t: '18 cm' }, { v: '20', t: '20 cm' }, { v: '10', t: '10 cm' }]);
    rtrapQs.classList.add('show');
    await showLine(q1.line, rtrapQs);
    await showLine(q2.line, rtrapQs);
    lockInput(false);
    await Promise.all([
      q1.dd.ask(v => v === '38', () => { right(); tpLight('p', 'ab'); }, wrong),
      q2.dd.ask(v => v === '10', () => { right(); tpLight('p', 'h'); }, wrong)
    ]);
    lockInput(true);
    if (mine !== runToken) throw CANCELLED;
    await wait(600);
    await heading(TP.readOk);
    swiftee.play('happy', 1);
    await wait(2000);
    await showNext();
    await trapPractice2();
  }

  /* 4. the area of the same trapezium */
  async function trapPractice2() {
    const mine = await tpOpen(trapPractice2);
    rtrapQuiz.classList.remove('show');
    rtrap.classList.remove('wide');
    tpEnsureFig('p');

    /* the two questions go; the area chips come */
    rtrapQs.classList.remove('show');
    await wait(REDUCED ? 100 : 460);
    rtrapQs.textContent = '';
    const chips = practiceChips([{ v: '190', t: '190 sq. cm' }, { v: '380', t: '380 sq. cm' }, { v: '270', t: '270 sq. cm' }], rtrapPTray);
    await dealChips(chips);
    await wait(200);
    await heading(TP.area);
    await askChips(chips, '190');
    if (mine !== runToken) throw CANCELLED;
    tpLight('p', 'ab');
    tpLight('p', 'h');
    await heading(TP.areaOk);
    await wait(1800);
    await showNext();
    await trapPractice3();
  }

  /* 5. two trapeziums: which has the larger area? */
  async function trapPractice3() {
    const mine = await tpOpen(trapPractice3);
    rtrapQuiz.classList.remove('show');
    rtrapQs.classList.remove('show');
    rtrapPTray.classList.add('off');
    rtrap.classList.remove('wide');

    await clearFigures(rtFigRow);
    await wait(300);
    await showFigures(tpFig('I', 'Trapezium I') + tpFig('II', 'Trapezium II'), rtFigRow, rtrapPractice);
    await wait(200);
    await dealChips(Array.from(rtFigRow.querySelectorAll('.fig-chip')));
    await wait(200);
    await heading(TP.larger);
    await askFigures('I', rtFigRow);
    if (mine !== runToken) throw CANCELLED;
    feedback(FEEDBACK.right);
    await wait(700);

    /* the working under each */
    await figWorking('I', '½ × (40 + 25) × 20 = 650 sq. cm', rtFigRow);
    await wait(400);
    await figWorking('II', '½ × (30 + 40) × 15 = 525 sq. cm', rtFigRow);
    await wait(700);

    /* Swiftee hops down beside the banner and says which */
    feedbackGen++;
    promptTxt.textContent = '';
    caret.hidden = true;
    rtrapPSay.classList.add('show');
    await hopBetween(boardMascot, rtrapPMascot);
    await wait(240);
    swiftee.hold('talking');
    await typeSegments(rtrapPText.querySelector('.txt'), rtrapPText.querySelector('.caret'), TP.largerLine, TYPE_MS, 320, null);
    swiftee.release();
    swiftee.play('proud', 1);
    skyConfetti(90, 2800);
    sfx('confetti', .7);
    await wait(2200);
    await showNext();
    /* the next section continues from here */
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

    sceneStart(sceneIntro);
    await sceneIntro();
  }

  /* Swiftee's greeting, and the board arriving behind it. Replaying it starts
     from a bare landscape again, so the board has to be taken back down: the
     one bit of undoing that belongs to a scene rather than to the generic
     teardown, since showBoard() is a no-op once the board is already up. */
  async function sceneIntro() {
    board.classList.remove('show');
    boardMascot.classList.remove('in');
    await introScene();

    /* The hand-off belongs to the scene, not to whoever called it: a replay
       re-enters this function directly, so anything sequenced by an enclosing
       function would be lost the moment the replay retired it. Every other
       scene chains to the next the same way. */
    sceneStart(sceneWarmUp);
    await sceneWarmUp();
  }

  /* The warm-up: the three shapes draw themselves, Swiftee names what they
     are, and round 1 opens. */
  async function sceneWarmUp() {
    lockInput(true);

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
