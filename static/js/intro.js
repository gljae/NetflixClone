/* ══════════════════════════════════════════════════════════════════
 *  넷플릭스 인트로 "두둥" — N 분해
 *
 *  메인 HTML 에 합치는 법 (3줄이면 끝):
 *    1) <link rel="stylesheet" href="/static/css/intro.css">   ← <head> 안
 *    2) index.html 의 [붙여넣기] 블록(<div id="nfx-intro">…</div>) 을
 *       <body> 맨 위에 그대로 복사
 *    3) <script src="/static/js/intro.js" defer></script>      ← </body> 직전
 *
 *  동작:
 *    페이지가 열리면 인트로가 자동 재생되고, 끝나면 오버레이가 스스로
 *    사라진다. 그 순간 document 에 'nfx:done' 이벤트가 발생한다.
 *
 *      document.addEventListener('nfx:done', () => {
 *        // 여기서 메인 페이지 초기화 (슬라이더 시작, 데이터 로드 등)
 *      });
 *
 *  #nfx-intro 의 data 속성으로 동작을 바꿀 수 있다:
 *    data-once="session"  → 한 세션에 딱 한 번만 재생 (새로고침해도 안 나옴)
 *    data-next="/home"    → 인트로가 끝나면 그 주소로 이동 (스플래시 페이지용)
 *
 *  수동 제어가 필요하면:  NFX_INTRO.play()  /  NFX_INTRO.close()
 * ══════════════════════════════════════════════════════════════════ */

window.NFX_INTRO = (() => {
  "use strict";

  /* ── 설정 — 여기 숫자만 만져도 연출이 다 바뀐다 ────────────── */

  const CONFIG = {
    slices: 68,       // N 을 몇 개의 세로 직선으로 쪼갤지
    blueRatio: 0.36,  // 흩어질 때 파랗게 튀는 조각 비율 (0 이면 전부 빨강)

    // 타임라인 (ms). CSS 애니메이션 길이도 여기서 계산해 넘긴다.
    timeline: {
      buildDur: 620,     // 조각 하나가 세로로 펴지는 시간
      buildSpread: 430,  // 왼→오 로 훑는 폭 (조각별 시작 지연의 범위)
      burstDur: 1350,    // 흩어져 사라지는 데 걸리는 시간

      hit1: 900,         // "두"  — 플래시 + N 이 한 번 튄다
      hit2: 1250,        // "둥"  — 여기서 분해 시작
      burst: 1250,
      close: 2700,       // 오버레이가 걷히기 시작 (메인 페이지가 드러난다)
      done: 3500,        // 오버레이 제거 + 'nfx:done' 이벤트
    },
  };

  /* ── DOM ─────────────────────────────────────────────────── */

  const root = document.getElementById("nfx-intro");
  if (!root) return { play() {}, close() {} }; // 인트로 마크업이 없는 페이지

  const flash    = root.querySelector(".nfx-flash");
  const sliceBox = root.querySelector("[data-nfx-slices]");
  const burstBox = root.querySelector(".nfx-burst");
  const skipBtn  = root.querySelector(".nfx-skip");
  const soundBtn = root.querySelector(".nfx-sound");

  const SVG_NS = "http://www.w3.org/2000/svg";
  const T = CONFIG.timeline;

  /* ── N 을 세로 직선들로 "그려서" 만든다 ────────────────────
   *
   *  넷플릭스 N 은 (좌측 기둥 | 대각 리본 | 우측 기둥) 구조라서
   *  x 좌표마다 세로 구간이 딱 정해진다.
   *    - 기둥 구간(x<68, x>=232) : y 0~400 전체
   *    - 가운데 구간             : 대각선의 위/아래 모서리 사이 (두께 항상 117.2)
   *
   *  이렇게 조각으로 만들어 두면, 분해 연출이 "같은 조각을 그대로
   *  흩뜨리는 것"뿐이라 도형이 바뀌는 순간이 없어 이음매가 안 보인다.
   * ------------------------------------------------------- */
  function buildSlices() {
    sliceBox.innerHTML = "";

    const n = CONFIG.slices;
    const w = 300 / n;
    const frag = document.createDocumentFragment();

    for (let i = 0; i < n; i++) {
      const x = i * w;
      const xc = x + w / 2;                   // 조각 중심에서 N 의 세로 구간을 잰다
      const isBar = xc < 68 || xc >= 232;
      const y0 = isBar ? 0 : (400 * (xc - 68)) / 232;
      const y1 = isBar ? 400 : (400 * xc) / 232;

      const r = document.createElementNS(SVG_NS, "rect");
      // 파란 조각은 흩어질 때만 색이 변한다. N 이 그려지는 동안은 전부 빨강.
      const isBlue = Math.random() < CONFIG.blueRatio;
      r.setAttribute("class", isBlue ? "nfx-slice nfx-slice--blue" : "nfx-slice");
      r.setAttribute("x", x.toFixed(2));
      r.setAttribute("y", y0.toFixed(2));
      r.setAttribute("width", (w + 0.4).toFixed(2)); // 살짝 겹쳐 이음매를 없앤다
      r.setAttribute("height", (y1 - y0).toFixed(2));
      r.setAttribute("fill", isBar ? "url(#nfx-bar)" : "url(#nfx-diag)");

      // ① 그리기 — 왼→오 로 훑되 약간 흐트러뜨린다
      const t = i / (n - 1);
      r.style.setProperty("--d", `${(t * T.buildSpread + Math.random() * 90).toFixed(0)}ms`);
      r.style.setProperty("--sd", `${T.buildDur}ms`);

      // ② 분해 — 중심에서 먼 조각일수록 멀리, 길이는 제각각
      r.style.setProperty("--dx", `${(((xc - 150) / 150) * 430 * (0.7 + Math.random() * 0.6)).toFixed(0)}px`);
      r.style.setProperty("--sy", (3 + Math.random() * 9).toFixed(1));
      r.style.setProperty("--bd", `${(Math.random() * 190).toFixed(0)}ms`);
      r.style.setProperty("--bdur", `${T.burstDur}ms`);
      // 파랑이 한꺼번에 뜨지 않고 "간간히" 번지도록 시점을 흩뿌린다
      r.style.setProperty("--fd", `${(Math.random() * 620).toFixed(0)}ms`);

      frag.appendChild(r);
    }

    sliceBox.appendChild(frag);
    burstBox.style.setProperty("--bdur", `${T.burstDur}ms`);
  }

  /* ── 사운드 ───────────────────────────────────────────────
   *  넷플릭스 원본 오디오는 저작권이 있어 쓰지 않는다.
   *  Web Audio API 로 합성하므로 음원 파일이 필요 없다.
   *  타격 하나 = 떨어지는 서브베이스 + 배음 바디 + 어택 노이즈.
   * ------------------------------------------------------- */

  const PRESET = {
    rev: 0.50,                                                    // 잔향량
    riser: { from: 100, to: 1800, peak: 0.09, q: 2.0 },           // 임팩트 전까지 차오르는 소리
    hits: [
      { f0: 96, f1: 34, dur: 0.70, gain: 0.85, bright: 0.60 },    // "두"
      { f0: 68, f1: 22, dur: 2.60, gain: 1.05, bright: 0.45 },    // "둥"
    ],
    tail: { delay: 0.06, dur: 1.5, from: 300, to: 7000, peak: 0.13, q: 0.8 }, // 흩어지는 잔향
    sparks: { count: 6, spread: 0.9, from: 1500, to: 3400, gain: 0.10 },      // 파란 조각의 불꽃음
  };

  const AudioCtx = window.AudioContext || window.webkitAudioContext;

  const sound = {
    ctx: null, master: null, rev: null,

    init() {
      if (this.ctx) {
        if (this.ctx.state === "suspended") this.ctx.resume().catch(() => {});
        return this.ctx;
      }
      const ctx = new AudioCtx();
      // 사용자 조작 전이면 suspended 로 만들어진다 (브라우저 자동재생 정책)
      if (ctx.state === "suspended") ctx.resume().catch(() => {});

      const comp = ctx.createDynamicsCompressor();
      comp.threshold.value = -14;
      comp.knee.value = 24;
      comp.ratio.value = 8;
      comp.attack.value = 0.004;
      comp.release.value = 0.25;
      comp.connect(ctx.destination);

      const master = ctx.createGain();
      master.gain.value = 0.9;
      master.connect(comp);

      // 노이즈로 임펄스 응답을 만들어 홀 잔향을 낸다
      const conv = ctx.createConvolver();
      conv.buffer = this.impulse(ctx, 2.8, 3.4);
      const rev = ctx.createGain();
      rev.gain.value = PRESET.rev;
      rev.connect(conv);
      conv.connect(master);

      this.ctx = ctx; this.master = master; this.rev = rev;
      return ctx;
    },

    impulse(ctx, seconds, decay) {
      const len = Math.floor(ctx.sampleRate * seconds);
      const buf = ctx.createBuffer(2, len, ctx.sampleRate);
      for (let ch = 0; ch < 2; ch++) {
        const d = buf.getChannelData(ch);
        for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, decay);
      }
      return buf;
    },

    noise(ctx, seconds) {
      const len = Math.floor(ctx.sampleRate * seconds);
      const buf = ctx.createBuffer(1, len, ctx.sampleRate);
      const d = buf.getChannelData(0);
      for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
      return buf;
    },

    // 지수 램프에 0 을 넣을 수 없어 최소값을 쓴다
    env(param, t, peak, attack, decay) {
      param.setValueAtTime(0.0001, t);
      param.linearRampToValueAtTime(peak, t + attack);
      param.exponentialRampToValueAtTime(0.0001, t + attack + decay);
    },

    /** 한 번의 타격음 */
    boom(t, o) {
      const ctx = this.ctx;
      const out = ctx.createGain();
      out.connect(this.master);
      out.connect(this.rev);

      // 서브: 아래로 떨어지는 저음 — "두둥"의 몸통
      const sub = ctx.createOscillator();
      sub.type = "sine";
      sub.frequency.setValueAtTime(o.f0, t);
      sub.frequency.exponentialRampToValueAtTime(o.f1, t + o.dur * 0.8);
      const subG = ctx.createGain();
      this.env(subG.gain, t, o.gain, 0.008, o.dur);
      sub.connect(subG).connect(out);
      sub.start(t); sub.stop(t + o.dur + 0.1);

      // 바디: 배음을 얹어 작은 스피커에서도 들리게
      const body = ctx.createOscillator();
      body.type = "triangle";
      body.frequency.setValueAtTime(o.f0 * 2.02, t);
      body.frequency.exponentialRampToValueAtTime(o.f1 * 2, t + o.dur * 0.5);
      const lp = ctx.createBiquadFilter();
      lp.type = "lowpass";
      lp.frequency.value = 520 * o.bright;
      const bodyG = ctx.createGain();
      this.env(bodyG.gain, t, o.gain * 0.35, 0.006, o.dur * 0.55);
      body.connect(lp).connect(bodyG).connect(out);
      body.start(t); body.stop(t + o.dur + 0.1);

      // 어택: 짧은 노이즈 버스트 = "치는" 질감
      const n = ctx.createBufferSource();
      n.buffer = this.noise(ctx, 0.3);
      const bp = ctx.createBiquadFilter();
      bp.type = "bandpass";
      bp.frequency.value = 900 * o.bright;
      bp.Q.value = 0.9;
      const nG = ctx.createGain();
      this.env(nG.gain, t, o.gain * 0.22 * o.bright, 0.002, 0.12);
      n.connect(bp).connect(nG).connect(out);
      n.start(t); n.stop(t + 0.35);
    },

    /** 임팩트 직전까지 차오르는 리저 */
    riser(t, dur, cfg) {
      const ctx = this.ctx;
      const n = ctx.createBufferSource();
      n.buffer = this.noise(ctx, dur + 0.3);
      const bp = ctx.createBiquadFilter();
      bp.type = "bandpass";
      bp.Q.value = cfg.q;
      bp.frequency.setValueAtTime(cfg.from, t);
      bp.frequency.exponentialRampToValueAtTime(cfg.to, t + dur);
      const g = ctx.createGain();
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(cfg.peak, t + dur * 0.92);
      g.gain.exponentialRampToValueAtTime(0.0001, t + dur + 0.06);
      n.connect(bp).connect(g).connect(this.master);
      g.connect(this.rev);
      n.start(t); n.stop(t + dur + 0.3);
    },

    /** 흩어지는 잔향 — 리저와 반대로 빠르게 열렸다가 길게 사그라든다 */
    whoosh(t, dur, cfg) {
      const ctx = this.ctx;
      const n = ctx.createBufferSource();
      n.buffer = this.noise(ctx, dur + 0.3);
      const bp = ctx.createBiquadFilter();
      bp.type = "bandpass";
      bp.Q.value = cfg.q;
      bp.frequency.setValueAtTime(cfg.from, t);
      bp.frequency.exponentialRampToValueAtTime(cfg.to, t + dur);
      const g = ctx.createGain();
      this.env(g.gain, t, cfg.peak, 0.05, dur);
      n.connect(bp).connect(g).connect(this.master);
      g.connect(this.rev);
      n.start(t); n.stop(t + dur + 0.3);
    },

    /** 파란 조각이 튈 때 드문드문 터지는 높은 불꽃 소리 */
    sparkle(t, cfg) {
      const ctx = this.ctx;
      for (let i = 0; i < cfg.count; i++) {
        const tt = t + Math.random() * cfg.spread;
        const f = cfg.from + Math.random() * (cfg.to - cfg.from);
        const o = ctx.createOscillator();
        o.type = "triangle";
        o.frequency.setValueAtTime(f, tt);
        o.frequency.exponentialRampToValueAtTime(f * 0.62, tt + 0.25);
        const g = ctx.createGain();
        this.env(g.gain, tt, cfg.gain * (0.6 + Math.random() * 0.6), 0.004, 0.22);
        o.connect(g);
        g.connect(this.master);
        g.connect(this.rev);
        o.start(tt); o.stop(tt + 0.45);
      }
    },

    /** 타임라인대로 전부 예약. 소리가 막혀 있으면 false 를 준다. */
    play() {
      const ctx = this.init();
      // suspended 인 채로 예약하면 나중에 resume 될 때 한꺼번에 터진다 → 건너뛴다
      if (ctx.state !== "running") return false;

      const t0 = ctx.currentTime + 0.06;
      this.riser(t0, T.hit1 / 1000, PRESET.riser);
      this.boom(t0 + T.hit1 / 1000, PRESET.hits[0]);  // "두"
      this.boom(t0 + T.hit2 / 1000, PRESET.hits[1]);  // "둥"
      this.whoosh(t0 + T.hit2 / 1000 + PRESET.tail.delay, PRESET.tail.dur, PRESET.tail);
      if (CONFIG.blueRatio > 0) this.sparkle(t0 + T.burst / 1000, PRESET.sparks);
      return true;
    },
  };

  /* ── 재생 / 종료 ─────────────────────────────────────────── */

  let timers = [];
  let closed = false;

  const at = (ms, fn) => timers.push(setTimeout(fn, ms));
  const clearTimers = () => { timers.forEach(clearTimeout); timers = []; };

  /** 인트로를 걷어내고 메인 페이지로 넘긴다 */
  function close({ instant = false } = {}) {
    if (closed) return;
    closed = true;
    clearTimers();

    const finish = () => {
      root.remove();                                   // 오버레이를 DOM 에서 완전히 제거
      document.documentElement.classList.remove("nfx-lock");

      const next = root.dataset.next;
      if (next) { location.href = next; return; }      // 스플래시 모드: 다른 페이지로 이동

      // ★ 메인 페이지가 이어받는 지점
      document.dispatchEvent(new CustomEvent("nfx:done"));
    };

    if (instant) return finish();
    root.classList.add("is-closing");
    setTimeout(finish, 800);                           // intro.css 의 페이드 시간과 맞춘다
  }

  function play() {
    closed = false;
    clearTimers();
    root.hidden = false;
    root.classList.remove("is-playing", "is-impact", "is-burst", "is-closing");
    document.documentElement.classList.add("nfx-lock");  // 인트로 동안 스크롤 잠금

    buildSlices();
    void root.offsetWidth;   // 클래스를 뗐다 붙이는 것만으로는 애니메이션이 재시작되지 않는다

    const withSound = sound.play();
    if (soundBtn) soundBtn.hidden = withSound;          // 소리가 막혔을 때만 버튼을 보여준다

    root.classList.add("is-playing");

    const bang = () => {
      flash.classList.remove("fire");
      void flash.offsetWidth;
      flash.classList.add("fire");
    };

    at(T.hit1, () => { root.classList.add("is-impact"); bang(); });  // "두"
    at(T.hit2, bang);                                                // "둥"
    at(T.burst, () => root.classList.add("is-burst"));               // 분해 시작
    at(T.close, () => close());
  }

  /* ── 입력 ────────────────────────────────────────────────── */

  if (skipBtn) skipBtn.addEventListener("click", () => close({ instant: true }));

  // 소리가 막혔을 때: 클릭이 곧 사용자 조작이라 여기서 오디오가 풀린다
  if (soundBtn) {
    soundBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      const ctx = sound.init();
      if (ctx.state === "running") play();
      else ctx.resume().then(play).catch(play);
    });
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !closed) close({ instant: true });
  });

  /* ── 시작 ────────────────────────────────────────────────── */

  const ONCE_KEY = "nfx-intro-played";

  function boot() {
    // 모션 최소화를 켠 사용자에게는 인트로를 재생하지 않는다
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return close({ instant: true });

    // data-once="session" 이면 세션당 한 번만
    if (root.dataset.once === "session" && sessionStorage.getItem(ONCE_KEY)) {
      return close({ instant: true });
    }
    sessionStorage.setItem(ONCE_KEY, "1");

    setTimeout(play, 200);   // 첫 페인트가 안정된 뒤 시작
  }

  if (document.readyState === "complete") boot();
  else window.addEventListener("load", boot);

  return { play, close };
})();
