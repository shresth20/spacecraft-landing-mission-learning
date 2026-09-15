/* Swiftee — the mascot layer.
 *
 * One component, one element, one requestAnimationFrame ticker. It blits a
 * uniform sprite grid by moving background-position, which is all the sheets
 * need: every frame of every animation is the same cell with the pivot at its
 * exact centre, so switching expression never moves the character.
 *
 * Everything it knows about the sheets comes from window.SWIFTEE_DATA, which is
 * generated from the manifest (see build/gen_swiftee_data.py). No frame count,
 * grid size or sheet path is written down twice.
 *
 * The triad matters. Most expressions ship as start -> loop -> stop, and cutting
 * from one loop straight into another skips the transition the animator drew.
 * play() always runs the full sequence:
 *
 *     swiftee.play('happy');                 // start, one loop, stop, settle
 *     swiftee.play('talking', { hold: true });   // ...and loop until released
 *     swiftee.release();                     // play the stop, settle to idle
 */

(function (global) {
  'use strict';

  const DATA = global.SWIFTEE_DATA;

  function Swiftee(el, options) {
    const opts = options || {};
    this.el = el;
    this.fps = DATA.fps;
    this.idleState = opts.idle || 'blinking';

    this.sheets = Object.create(null);   /* clip name -> Image, once loaded  */
    this.seq = [];                       /* segments left in this sequence   */
    this.seg = null;                     /* { clip, left, frame, dir }       */
    this.pending = null;                 /* at most one queued reaction      */
    this.held = false;                   /* a loop is being held open        */
    this.done = null;                    /* resolver for the running play()  */
    this.acc = 0;
    this.last = 0;
    this.raf = 0;
    this.current = '';                   /* clip whose sheet is on the element */

    /* The standing character's feet are at 87.7% down the cell, not at its
       bottom edge. Handing that slack to CSS lets a caller align the mascot to
       a real ground line instead of eyeballing it. */
    el.style.setProperty('--sw-slack', ((1 - DATA.baseline) * 100).toFixed(2) + '%');
  }

  /* ---------- sheets ---------- */

  Swiftee.prototype.load = function (clipName) {
    const clip = DATA.clips[clipName];
    if (!clip) return Promise.resolve(null);
    if (this.sheets[clipName]) return Promise.resolve(clip);

    const self = this;
    if (!clip._loading) {
      clip._loading = new Promise(resolve => {
        const img = new Image();
        img.onload = () => { self.sheets[clipName] = img; resolve(clip); };
        img.onerror = () => resolve(null);        /* a missing sheet is a lost
                                                     nicety, never a blocker */
        img.src = clip.image;
      });
    }
    return clip._loading.then(ok => (ok ? clip : null));
  };

  /* Warm the sheets for a list of states (or bare clips) up front, so the first
     reaction of a lesson does not arrive a beat late. */
  Swiftee.prototype.preload = function (states) {
    const names = [];
    states.forEach(name => {
      const state = DATA.states[name];
      if (state) names.push.apply(names, state.play);
      else names.push(name);
    });
    return Promise.all(names.map(this.load, this));
  };

  /* ---------- drawing ---------- */

  Swiftee.prototype._show = function (clipName, frame) {
    const clip = DATA.clips[clipName];
    if (!clip || !this.sheets[clipName]) return;

    if (this.current !== clipName) {
      this.current = clipName;
      this.el.style.backgroundImage = 'url("' + clip.image + '")';
      this.el.style.backgroundSize = (clip.cols * 100) + '% ' + (clip.rows * 100) + '%';
    }
    const col = frame % clip.cols;
    const row = (frame / clip.cols) | 0;
    /* With a background that many times wider than its box, the percentage that
       lands cell n flush is n / (cells - 1). */
    const x = clip.cols > 1 ? (col / (clip.cols - 1)) * 100 : 0;
    const y = clip.rows > 1 ? (row / (clip.rows - 1)) * 100 : 0;
    this.el.style.backgroundPosition = x + '% ' + y + '%';
  };

  /* ---------- sequencing ---------- */

  /* Expand a state into the segments to play: its start once, its loop as many
     times as asked (or forever, if the caller is holding it open), its stop
     once. A standalone clip has no triad and is simply itself. */
  function segmentsFor(state, loops, hold) {
    const spec = DATA.states[state];
    if (!spec) {
      return DATA.clips[state] ? [{ clip: state, left: Math.max(1, loops) }] : [];
    }
    const out = [];
    if (spec.start) out.push({ clip: spec.start, left: 1 });
    if (spec.loop)  out.push({ clip: spec.loop, left: hold ? Infinity : Math.max(1, loops) });
    if (spec.stop)  out.push({ clip: spec.stop, left: 1 });
    return out;
  }

  Swiftee.prototype._begin = function (segments) {
    this.seq = segments.slice();
    this.seg = null;
    this._next();
  };

  Swiftee.prototype._next = function () {
    if (!this.seq.length) {
      this.seg = null;
      const done = this.done;
      this.done = null;
      if (done) done();

      if (this.pending) {
        const p = this.pending;
        this.pending = null;
        this._start(p);
      } else {
        this._settle();
      }
      return;
    }
    const seg = this.seq.shift();
    this.seg = { clip: seg.clip, left: seg.left, frame: 0, dir: 1 };
    this.acc = 0;
    this._show(seg.clip, 0);
  };

  Swiftee.prototype._settle = function () {
    this.held = false;
    const idle = DATA.states[this.idleState]
      ? segmentsFor(this.idleState, 1, true)
      : [{ clip: this.idleState, left: Infinity }];
    this._begin(idle);
  };

  Swiftee.prototype._start = function (req) {
    const self = this;
    this.held = !!req.hold;
    this.done = req.resolve;          /* claimed before the await, so a play()
                                         arriving during the load queues */
    return this.preload([req.state]).then(() => {
      self._begin(segmentsFor(req.state, req.loops, req.hold));
    });
  };

  /* ---------- ticker ---------- */

  Swiftee.prototype._tick = function (now) {
    this.raf = requestAnimationFrame(this._tick.bind(this));
    if (!this.seg) return;

    const step = 1000 / this.fps;
    if (!this.last) this.last = now;
    this.acc += Math.min(now - this.last, 200);   /* a backgrounded tab must not
                                                     fast-forward on return */
    this.last = now;
    if (this.acc < step) return;

    const clip = DATA.clips[this.seg.clip];
    if (!clip) return this._next();

    while (this.acc >= step) {
      this.acc -= step;
      const seg = this.seg;

      if (clip.pingpong) {
        seg.frame += seg.dir;
        if (seg.frame >= clip.frames - 1) { seg.frame = clip.frames - 1; seg.dir = -1; }
        else if (seg.frame <= 0 && seg.dir === -1) { seg.frame = 0; seg.dir = 1; seg.left--; }
      } else {
        seg.frame++;
        if (seg.frame >= clip.frames) { seg.frame = 0; seg.left--; }
      }

      if (seg.left <= 0) { this._next(); return; }
    }
    this._show(this.seg.clip, this.seg.frame);
  };

  /* ---------- public ---------- */

  Swiftee.prototype.mount = function () {
    const self = this;
    return this.preload([this.idleState]).then(() => {
      self._settle();
      if (!self.raf) self.raf = requestAnimationFrame(self._tick.bind(self));
      return self;
    });
  };

  /* Play one reaction and settle back to idle. Resolves when the sequence has
     played out — a held loop resolves once its stop has run, i.e. on release().
     At most one reaction waits behind the running one: a learner on a hot
     streak should not build up a backlog of celebrations. */
  Swiftee.prototype.play = function (state, options) {
    const opts = options || {};
    const self = this;
    return new Promise(resolve => {
      const req = {
        state: state,
        loops: opts.loops === undefined ? 1 : opts.loops,
        hold: !!opts.hold,
        resolve: resolve
      };
      if (self.done) {
        /* A reaction is already running: queue behind it so its stop still
           plays. If it is a held loop nobody will ever close, close it here. */
        self.pending = req;
        if (self.held) self.release();
        return;
      }
      self.done = resolve;                /* claimed synchronously, so a second
                                             play() in the same tick queues */
      self._start(req);
    });
  };

  /* End a held loop: fall through to the segment's stop, then settle. */
  Swiftee.prototype.release = function () {
    if (!this.held || !this.seg) return;
    this.held = false;
    if (this.seg.left === Infinity) this.seg.left = 1;
  };

  Swiftee.prototype.idle = function (state) {
    this.idleState = state;
  };

  global.Swiftee = Swiftee;
})(window);
