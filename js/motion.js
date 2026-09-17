/* ==========================================================================
 * motion.js -- the one motion system for the whole game
 * --------------------------------------------------------------------------
 * Every duration, every easing and every piece of UI feedback in the game
 * comes from here. Nothing else hard-codes a number of milliseconds or a
 * cubic-bezier: if a beat needs a timing this file does not have, the timing
 * is added here and used by name, so the whole game stays in step.
 *
 * There is no build step and no module loader in this project -- index.html
 * loads plain <script> tags in order -- so the "export" is a single frozen
 * global, window.Motion. Load order is fixed:
 *
 *     libs/gsap.min.js  ->  libs/Flip.min.js  ->  js/motion.js  ->  script.js
 *
 * ---- how this joins the game's own pacing ----
 * The game already has two rules that every beat has to obey, and GSAP has to
 * obey them too or Skip and Replay break:
 *
 *   Skip    a scene plays its whole choreography out in a handful of frames
 *           and lands in the state it would have reached anyway. So while the
 *           game's fastForward flag is up, every duration asked of this file
 *           collapses to nothing, and every animation already in the air is
 *           jumped to its end by Motion.skip().
 *
 *   Replay  the scene in play is genuinely stopped, not fast-forwarded,
 *           because the abandoned chain would carry on writing to the board
 *           underneath the fresh one. Every animation made here is tracked,
 *           so Motion.retire() can kill the lot and hand back whatever they
 *           had written inline.
 *
 * script.js hands those two flags over once, at startup, with Motion.bind().
 * Until it does, this file works standalone -- which is all a page that only
 * wants press feedback needs.
 * ========================================================================== */

(function (global) {
  'use strict';

  var gsap = global.gsap;
  if (!gsap) {
    throw new Error('motion.js: load libs/gsap.min.js before js/motion.js');
  }
  if (global.Flip) gsap.registerPlugin(global.Flip);

  /* ---------- durations (seconds, the unit GSAP works in) ----------
   * 150-300ms for UI feedback, 400-800ms for a concept reveal. */
  var FAST   = 0.15;   /* a press, a nudge: felt, not watched            */
  var NORMAL = 0.3;    /* the everyday answer: a pulse, a shake, a snap  */
  var REVEAL = 0.6;    /* a concept step: long enough to follow          */

  /* ---------- easings ----------
   * Out for anything arriving (it lands and settles), in for anything
   * leaving (it gathers speed on its way out), and the overshoot for the
   * playful pops -- a correct answer, a chip snapping home. */
  var EASE_IN  = 'power2.in';
  var EASE_OUT = 'power2.out';
  var POP      = 'back.out(1.4)';

  /* how far apart a group of things arrives */
  var STAGGER = 0.08;

  /* Not zero: a zero-length tween still fires its callbacks, but a browser is
     free to skip the frame that writes the end state, and the element is left
     where it started. One thousandth of a second always paints. */
  var NEAR_ZERO = 0.001;

  /* ---------- reduced motion ----------
   * Honoured live: a learner who turns the setting on mid-lesson gets the
   * short version from the next beat onwards, without a reload. */
  var mq = global.matchMedia ? global.matchMedia('(prefers-reduced-motion: reduce)') : null;
  var reduced = !!(mq && mq.matches);
  if (mq) {
    var onMQ = function (e) { reduced = e.matches; };
    if (mq.addEventListener) mq.addEventListener('change', onMQ);
    else if (mq.addListener) mq.addListener(onMQ);          /* older WebKit */
  }
  function reducedMotion() { return reduced; }

  /* ---------- the bridge to the game's pacing ---------- */
  var readToken = function () { return 0; };
  var readFast  = function () { return false; };
  function bind(hooks) {
    if (hooks && typeof hooks.token === 'function') readToken = hooks.token;
    if (hooks && typeof hooks.fast  === 'function') readFast  = hooks.fast;
  }

  /* Every duration in the game goes through here. Reduced motion and a skip
     in flight both collapse it; nothing else changes it. */
  function dur(seconds) {
    if (reduced || readFast()) return NEAR_ZERO;
    return seconds == null ? NORMAL : seconds;
  }
  /* and every stagger: a skipped or reduced group arrives all at once */
  function gap(seconds) {
    if (reduced || readFast()) return 0;
    return seconds == null ? STAGGER : seconds;
  }

  /* ---------- the registry ----------
   * Every animation this file makes is held until it finishes, so a replay
   * can find it and kill it. Entries drop out as they complete, so the set
   * stays the size of what is actually moving -- a handful, at most. */
  var live = new Set();

  function toArray(t) {
    if (!t) return [];
    if (typeof t.length === 'number' && !t.nodeType) return Array.prototype.slice.call(t);
    return [t];
  }

  /* will-change is a promise to the compositor, and an expensive one to leave
     standing: it goes on for the length of the animation and comes off the
     moment it ends, however it ends. */
  function willChange(targets, value) {
    var els = toArray(targets).filter(Boolean);
    els.forEach(function (el) { if (el.style) el.style.willChange = value || 'transform'; });
    return function () {
      els.forEach(function (el) { if (el.style) el.style.willChange = ''; });
    };
  }

  function track(anim, revert) {
    anim.__motionRevert = revert || null;
    live.add(anim);
    /* a GSAP animation is thenable: this settles when it reaches its end */
    anim.then(function () { release(anim); }, function () { release(anim); });
    return anim;
  }
  function release(anim) {
    if (!live.has(anim)) return;
    live.delete(anim);
    if (anim.__motionRevert) { anim.__motionRevert(); anim.__motionRevert = null; }
  }

  /* A scene has been retired. Everything in the air belonged to it, so kill
     the lot and hand back whatever each one had written inline -- otherwise
     an element frozen mid-pulse carries that transform into the fresh scene. */
  function retire() {
    var all = Array.from(live);            /* a Set: Array.from, never slice.call */
    live.clear();
    all.forEach(function (anim) {
      anim.kill();
      if (anim.__motionRevert) { anim.__motionRevert(); anim.__motionRevert = null; }
    });
  }

  /* A skip is in flight: everything already moving lands where it was going.
     Anything started from here on is built at NEAR_ZERO by dur(), so the rest
     of the scene plays out in a few frames. */
  function skip() {
    Array.from(live).forEach(function (anim) {
      if (anim.totalProgress() < 1) anim.totalProgress(1, false);
    });
  }

  /* ---------- the factory ----------
   * A concept explanation is one timeline, built in the order the learner's
   * eye should follow. Made here, it is tracked, it carries will-change for
   * its own lifetime only, and Skip and Replay both reach it. */
  function timeline(opts) {
    var o = opts || {};
    var marked = toArray(o.willChange);
    var lift = null;
    var tl = gsap.timeline({
      paused: !!o.paused,
      defaults: o.defaults || { ease: EASE_OUT },
      onStart: function () {
        if (marked.length) lift = willChange(marked, o.willChangeValue);
        if (o.onStart) o.onStart();
      },
      onComplete: o.onComplete
    });
    /* One tidy-up, run whichever way the timeline ends -- its own last frame,
       or a replay killing it half way. Anything that has to be handed back
       goes here rather than into a clearProps on the final tween, which a
       killed timeline would never reach. */
    return track(tl, function () {
      if (lift) { lift(); lift = null; }
      if (o.revert) o.revert();
    });
  }

  /* one-off tweens, tracked the same way */
  function to(targets, vars)     { return track(gsap.to(targets, vars)); }
  function from(targets, vars)   { return track(gsap.from(targets, vars)); }
  function fromTo(targets, a, b) { return track(gsap.fromTo(targets, a, b)); }
  function set(targets, vars)    { return gsap.set(targets, vars); }

  /* ======================================================================
   * the shared feedback
   * Every button press, and every answer the game judges, goes through one
   * of these. They are the only place the game's feel is decided.
   * ====================================================================== */

  /* Feedback is transient by definition: the element is borrowed for a
     quarter of a second and must be handed back exactly as it was found.
     Most of these elements are positioned by a stylesheet rule, not by an
     inline transform, so an inline transform left behind by GSAP would
     quietly outrank the rule from then on. Hence: remember what was inline
     before (usually nothing), and put that back at the end.
       A second press on something already being shaken or pulsed takes over
     rather than fighting it -- two tweens writing the same transform is a
     visible stutter -- so the one in flight is killed and handed back first. */
  var feedbackOf = new WeakMap();

  function feedback(el, build) {
    var running = feedbackOf.get(el);
    if (running) { running.kill(); release(running); }

    var wasInline = el.style ? el.style.transform : '';
    var tl = timeline({
      willChange: el,
      revert: function () {
        gsap.set(el, { clearProps: 'transform' });
        if (wasInline && el.style) el.style.transform = wasInline;
        if (feedbackOf.get(el) === tl) feedbackOf.delete(el);
      }
    });
    feedbackOf.set(el, tl);
    build(tl);
    return tl;
  }

  /* A press: the thing gives a little under the finger and springs back.
     Short enough that a fast tapper never waits for it, and it never blocks
     -- whatever the press actually does runs alongside it. */
  function pressFeedback(el) {
    if (!el) return null;
    return feedback(el, function (tl) {
      tl.to(el, { scale: 0.94, duration: dur(FAST * 0.6), ease: EASE_IN })
        .to(el, { scale: 1, duration: dur(FAST), ease: POP });
    });
  }

  /* Right: one short outward pulse. No colour here -- the element's own class
     carries that, this carries only the movement. */
  function correctPulse(el) {
    if (!el) return null;
    return feedback(el, function (tl) {
      tl.to(el, { scale: 1.08, duration: dur(NORMAL * 0.5), ease: EASE_OUT })
        .to(el, { scale: 1, duration: dur(NORMAL), ease: POP });
    });
  }

  /* Wrong: a head-shake. It loses amplitude as it goes, so it reads as "not
     that one" rather than as an alarm. */
  var SHAKE = [-8, 8, -5.6, 5.6, 0];
  function wrongShake(el) {
    if (!el) return null;
    return feedback(el, function (tl) {
      var each = dur((NORMAL + FAST) / SHAKE.length);
      SHAKE.forEach(function (x, i) {
        tl.to(el, {
          x: x,
          rotate: x ? (x > 0 ? 1.4 : -1.4) : 0,
          duration: each,
          ease: i === SHAKE.length - 1 ? EASE_OUT : 'none'
        });
      });
    });
  }

  /* A group arrives in the order it is meant to be read: each item rises the
     last few pixels into place as it fades up, one after another. Returns the
     timeline, which is thenable -- `await revealSequence(...)`. */
  function revealSequence(elements, opts) {
    var o = opts || {};
    var els = toArray(elements).filter(Boolean);
    if (!els.length) return timeline();
    /* However this ends -- its own last frame, or a replay cutting it short
       -- the group is left plainly visible and back under its stylesheet.
       Killed half way with the fade still inline, half the group would stay
       part-transparent for the rest of the session. */
    var tl = timeline({
      willChange: els,
      willChangeValue: 'transform, opacity',
      revert: function () { gsap.set(els, { clearProps: 'opacity,transform' }); }
    });
    tl.fromTo(els,
      { opacity: 0, y: o.y == null ? 12 : o.y, scale: o.scale == null ? 1 : o.scale },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: dur(o.duration == null ? REVEAL : o.duration),
        ease: o.ease || EASE_OUT,
        stagger: gap(o.stagger),
        onStart: o.onStart
      });
    return tl;
  }

  /* The release of a drag: the thing springs the last stretch to where it
     belongs. Only the release is animated -- while a finger is on it, it
     tracks the finger exactly, with no easing in the way. */
  function snapTo(el, x, y) {
    if (!el) return null;
    var tl = timeline({ willChange: el });
    tl.to(el, { x: x, y: y, duration: dur(NORMAL), ease: POP });
    return tl;
  }

  /* ---------- a layout move, done on the compositor ----------
   * When a box really does have to change size or place -- a speech bubble
   * growing to fit a longer line -- Flip measures both states and plays the
   * difference as a transform, so no frame of it costs a layout. */
  function flip(targets, change, opts) {
    var Flip = global.Flip;
    if (!Flip) { change(); return null; }
    var o = opts || {};
    var state = Flip.getState(targets, o.props ? { props: o.props } : undefined);
    change();
    var lift = willChange(targets, o.willChangeValue);
    var anim = Flip.from(state, {
      duration: dur(o.duration == null ? NORMAL : o.duration),
      ease: o.ease || EASE_OUT,
      absolute: !!o.absolute,
      nested: !!o.nested,
      scale: o.scale !== false,
      onComplete: o.onComplete
    });
    return track(anim, lift);
  }

  global.Motion = Object.freeze({
    /* durations */
    FAST: FAST, NORMAL: NORMAL, REVEAL: REVEAL, NEAR_ZERO: NEAR_ZERO,
    /* easings */
    EASE_IN: EASE_IN, EASE_OUT: EASE_OUT, POP: POP,
    /* rhythm */
    STAGGER: STAGGER,
    /* scaling */
    dur: dur, gap: gap, reducedMotion: reducedMotion,
    /* lifecycle */
    bind: bind, retire: retire, skip: skip,
    /* building blocks */
    timeline: timeline, to: to, from: from, fromTo: fromTo, set: set,
    willChange: willChange, flip: flip,
    /* the shared feedback */
    pressFeedback: pressFeedback,
    correctPulse: correctPulse,
    wrongShake: wrongShake,
    revealSequence: revealSequence,
    snapTo: snapTo
  });
})(window);
