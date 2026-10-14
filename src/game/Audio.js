// Prozedurales WebAudio: SFX + düsterer Ambient-Drone. Keine Assets nötig.
export class GameAudio {
  constructor() {
    this.ctx = null;
    this.master = null;
    this.muted = false;
    this.ambientNodes = [];
  }

  init() {
    if (this.ctx) {
      if (this.ctx.state === 'suspended') this.ctx.resume();
      return;
    }
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return;
    this.ctx = new AC();
    this.master = this.ctx.createGain();
    this.master.gain.value = 0.55;
    this.master.connect(this.ctx.destination);
    this.startAmbient();
  }

  toggleMute() {
    this.muted = !this.muted;
    if (this.master) this.master.gain.value = this.muted ? 0 : 0.55;
    return this.muted;
  }

  now() { return this.ctx ? this.ctx.currentTime : 0; }

  // Kurzer gefilterter Noise-Burst
  noise(dur, { freq = 2000, q = 1, gain = 0.5, type = 'bandpass', slideTo = null } = {}) {
    if (!this.ctx || this.muted) return;
    const t = this.now();
    const len = Math.max(1, Math.floor(this.ctx.sampleRate * dur));
    const buf = this.ctx.createBuffer(1, len, this.ctx.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / len);
    const src = this.ctx.createBufferSource();
    src.buffer = buf;
    const f = this.ctx.createBiquadFilter();
    f.type = type; f.frequency.setValueAtTime(freq, t); f.Q.value = q;
    if (slideTo) f.frequency.exponentialRampToValueAtTime(Math.max(30, slideTo), t + dur);
    const g = this.ctx.createGain();
    g.gain.setValueAtTime(gain, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + dur);
    src.connect(f); f.connect(g); g.connect(this.master);
    src.start(t);
  }

  tone(freq, dur, { type = 'sawtooth', gain = 0.3, slideTo = null, delay = 0 } = {}) {
    if (!this.ctx || this.muted) return;
    const t = this.now() + delay;
    const o = this.ctx.createOscillator();
    o.type = type;
    o.frequency.setValueAtTime(freq, t);
    if (slideTo) o.frequency.exponentialRampToValueAtTime(Math.max(20, slideTo), t + dur);
    const g = this.ctx.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(gain, t + 0.012);
    g.gain.exponentialRampToValueAtTime(0.001, t + dur);
    o.connect(g); g.connect(this.master);
    o.start(t); o.stop(t + dur + 0.05);
  }

  swing() { this.noise(0.18, { freq: 3200, q: 2, gain: 0.35, slideTo: 500 }); }
  swingHeavy() { this.noise(0.3, { freq: 1800, q: 1.5, gain: 0.5, slideTo: 220 }); }
  gun() {
    this.noise(0.12, { freq: 2500, q: 0.8, gain: 0.55, slideTo: 300 });
    this.tone(160, 0.1, { type: 'square', gain: 0.28, slideTo: 60 });
  }
  hit() {
    this.noise(0.12, { freq: 700, q: 1, gain: 0.5, slideTo: 150 });
    this.tone(110, 0.14, { type: 'sine', gain: 0.5, slideTo: 45 });
  }
  launch() {
    this.tone(180, 0.35, { type: 'sawtooth', gain: 0.3, slideTo: 700 });
    this.noise(0.25, { freq: 1200, q: 1, gain: 0.3, slideTo: 4000 });
  }
  explosion() {
    this.noise(0.8, { freq: 900, q: 0.6, gain: 0.8, slideTo: 60, type: 'lowpass' });
    this.tone(70, 0.7, { type: 'sine', gain: 0.7, slideTo: 28 });
    this.tone(1400, 0.4, { type: 'sawtooth', gain: 0.12, slideTo: 200 });
  }
  dash() { this.noise(0.22, { freq: 900, q: 1, gain: 0.3, slideTo: 3800 }); }
  jump() { this.tone(300, 0.15, { type: 'sine', gain: 0.2, slideTo: 620 }); }
  hurt() {
    this.tone(220, 0.25, { type: 'sawtooth', gain: 0.35, slideTo: 70 });
    this.noise(0.2, { freq: 500, gain: 0.4, slideTo: 120 });
  }
  die() {
    this.tone(400, 0.6, { type: 'sawtooth', gain: 0.3, slideTo: 60 });
    this.noise(0.5, { freq: 2000, gain: 0.4, slideTo: 100 });
  }
  horn() {
    this.tone(65, 1.4, { type: 'sawtooth', gain: 0.4, slideTo: 62 });
    this.tone(98, 1.4, { type: 'sawtooth', gain: 0.3, slideTo: 92 });
    this.tone(130, 1.2, { type: 'sawtooth', gain: 0.2, slideTo: 124, delay: 0.05 });
  }
  ui() { this.tone(660, 0.08, { type: 'triangle', gain: 0.2 }); }
  soul() { this.tone(880, 0.3, { type: 'sine', gain: 0.15, slideTo: 1760 }); }

  startAmbient() {
    const ctx = this.ctx;
    // Tiefer Drone: zwei verstimmte Sägen durch Tiefpass + LFO
    const g = ctx.createGain(); g.gain.value = 0.05;
    const f = ctx.createBiquadFilter(); f.type = 'lowpass'; f.frequency.value = 220;
    const o1 = ctx.createOscillator(); o1.type = 'sawtooth'; o1.frequency.value = 55;
    const o2 = ctx.createOscillator(); o2.type = 'sawtooth'; o2.frequency.value = 55.7;
    const o3 = ctx.createOscillator(); o3.type = 'sine'; o3.frequency.value = 110.3;
    const lfo = ctx.createOscillator(); lfo.frequency.value = 0.07;
    const lfoG = ctx.createGain(); lfoG.gain.value = 120;
    lfo.connect(lfoG); lfoG.connect(f.frequency);
    o1.connect(f); o2.connect(f); o3.connect(f); f.connect(g); g.connect(this.master);
    o1.start(); o2.start(); o3.start(); lfo.start();
    // Wind: gelooptes Noise durch Bandpass mit wanderndem LFO
    const len = ctx.sampleRate * 3;
    const buf = ctx.createBuffer(1, len, ctx.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
    const src = ctx.createBufferSource(); src.buffer = buf; src.loop = true;
    const bf = ctx.createBiquadFilter(); bf.type = 'bandpass'; bf.frequency.value = 400; bf.Q.value = 0.6;
    const bg = ctx.createGain(); bg.gain.value = 0.02;
    const wlfo = ctx.createOscillator(); wlfo.frequency.value = 0.11;
    const wg = ctx.createGain(); wg.gain.value = 250;
    wlfo.connect(wg); wg.connect(bf.frequency);
    src.connect(bf); bf.connect(bg); bg.connect(this.master);
    src.start(); wlfo.start();
    this.ambientNodes = [o1, o2, o3, lfo, src, wlfo];
  }
}
