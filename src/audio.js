// Minimaler WebAudio-Synth: SFX + Ambient-Pad. Keine Copyright-Sounds.
export class SoundFX {
  constructor(){ this.ctx=null; this.muted=false; this.padNodes=[]; }
  ensure(){ if(!this.ctx){ const AC=window.AudioContext||window.webkitAudioContext; if(!AC) return false; this.ctx=new AC(); } if(this.ctx.state==='suspended') this.ctx.resume(); return true; }
  toggle(){ this.muted=!this.muted; if(this.muted) this.stopPad(); else this.startPad(); return this.muted; }
  blip(freq=440,dur=0.12,type='square',vol=0.12,slide=0){
    if(this.muted||!this.ensure()) return;
    const t=this.ctx.currentTime, o=this.ctx.createOscillator(), g=this.ctx.createGain();
    o.type=type; o.frequency.setValueAtTime(freq,t);
    if(slide) o.frequency.exponentialRampToValueAtTime(Math.max(40,freq+slide),t+dur);
    g.gain.setValueAtTime(vol,t); g.gain.exponentialRampToValueAtTime(0.001,t+dur);
    o.connect(g).connect(this.ctx.destination); o.start(t); o.stop(t+dur+0.02);
  }
  swing(){ this.blip(300+Math.random()*300,0.12,'sawtooth',0.07,-180); }
  hit(){ this.blip(160,0.15,'square',0.16,-80); }
  fire(){ this.blip(220,0.35,'sawtooth',0.14,440); }
  ice(){ this.blip(880,0.3,'sine',0.12,-400); }
  bolt(){ this.blip(1400,0.18,'square',0.1,-900); }
  cure(){ [523,659,784].forEach((f,i)=>setTimeout(()=>this.blip(f,0.25,'sine',0.1),i*90)); }
  pickup(){ this.blip(990,0.09,'sine',0.08,300); }
  hurt(){ this.blip(200,0.2,'sawtooth',0.14,-120); }
  drive(){ [330,415,494,659,880].forEach((f,i)=>setTimeout(()=>this.blip(f,0.3,'triangle',0.12),i*70)); }
  ui(){ this.blip(660,0.07,'sine',0.08); }
  wave(){ [392,523,659].forEach((f,i)=>setTimeout(()=>this.blip(f,0.4,'triangle',0.1),i*120)); }
  startPad(){
    if(this.muted||!this.ensure()||this.padNodes.length) return;
    const freqs=[110,164.8,220,277.2];
    freqs.forEach(f=>{
      const o=this.ctx.createOscillator(), g=this.ctx.createGain(), fl=this.ctx.createBiquadFilter();
      o.type='sawtooth'; o.frequency.value=f; fl.type='lowpass'; fl.frequency.value=500;
      g.gain.value=0.015; o.connect(fl).connect(g).connect(this.ctx.destination); o.start();
      this.padNodes.push({o,g});
      const lfo=this.ctx.createOscillator(), lg=this.ctx.createGain();
      lfo.frequency.value=0.1+Math.random()*0.15; lg.gain.value=0.008;
      lfo.connect(lg).connect(g.gain); lfo.start(); this.padNodes.push({o:lfo,g:lg});
    });
  }
  stopPad(){ this.padNodes.forEach(n=>{ try{n.o.stop()}catch{} }); this.padNodes=[]; }
}
