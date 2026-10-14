// Prozeduraler Sound: Motor mit Gängen, Wind, Drift, Sirene, Crash, Musik-Sequenzer.
// Keine externen Dateien. API bleibt kompatibel zu game.js / ui.js.
export class GameAudio{
  constructor(){
    this.ctx=null; this.muted=false;
    this.gear=0; this.rpm=0.2; this.shiftDip=0;
    this.backfireT=0; this.musicTimer=null; this.step=0; this.nextT=0;
  }
  init(){
    if(this.ctx) return;
    const AC=window.AudioContext||window.webkitAudioContext; if(!AC) return;
    const ctx=this.ctx=new AC();
    this.master=ctx.createGain(); this.master.gain.value=0.55; this.master.connect(ctx.destination);

    // --- Rausch-Buffer (wiederverwendet) ---
    const len=ctx.sampleRate; const buf=ctx.createBuffer(1,len,ctx.sampleRate);
    const d=buf.getChannelData(0); for(let i=0;i<len;i++) d[i]=Math.random()*2-1;
    this.noiseBuf=buf;

    // --- Motor: 4 Schichten ---
    this.engFilter=ctx.createBiquadFilter(); this.engFilter.type='lowpass'; this.engFilter.frequency.value=900; this.engFilter.Q.value=2;
    this.engGain=ctx.createGain(); this.engGain.gain.value=0;
    this.engFilter.connect(this.engGain); this.engGain.connect(this.master);
    const mk=(type,f)=>{ const o=ctx.createOscillator(); o.type=type; o.frequency.value=f; o.connect(this.engFilter); o.start(); return o; };
    this.oscLow=mk('sawtooth',70); this.oscLow2=mk('square',35);
    this.oscSub=ctx.createOscillator(); this.oscSub.type='sine'; this.oscSub.frequency.value=35;
    this.subGain=ctx.createGain(); this.subGain.gain.value=0.5;
    this.oscSub.connect(this.subGain); this.subGain.connect(this.engGain); this.oscSub.start();
    // Kreisch-Anteil (obenrum)
    this.oscHigh=ctx.createOscillator(); this.oscHigh.type='sawtooth'; this.oscHigh.frequency.value=300;
    this.highGain=ctx.createGain(); this.highGain.gain.value=0;
    this.oscHigh.connect(this.highGain); this.highGain.connect(this.engGain); this.oscHigh.start();
    // Auspuff-Knistern
    const ex=ctx.createBufferSource(); ex.buffer=buf; ex.loop=true;
    this.exFilter=ctx.createBiquadFilter(); this.exFilter.type='lowpass'; this.exFilter.frequency.value=500;
    this.exGain=ctx.createGain(); this.exGain.gain.value=0;
    ex.connect(this.exFilter); this.exFilter.connect(this.exGain); this.exGain.connect(this.master); ex.start();

    // --- Fahrtwind ---
    const w=ctx.createBufferSource(); w.buffer=buf; w.loop=true; w.playbackRate.value=0.7;
    this.windFilter=ctx.createBiquadFilter(); this.windFilter.type='lowpass'; this.windFilter.frequency.value=400;
    this.windGain=ctx.createGain(); this.windGain.gain.value=0;
    w.connect(this.windFilter); this.windFilter.connect(this.windGain); this.windGain.connect(this.master); w.start();

    // --- Reifen-Quiet­sch (Tonhöhe folgt Slip) ---
    const sk=ctx.createBufferSource(); sk.buffer=buf; sk.loop=true;
    this.skidFilter=ctx.createBiquadFilter(); this.skidFilter.type='bandpass'; this.skidFilter.frequency.value=900; this.skidFilter.Q.value=2.5;
    this.skidGain=ctx.createGain(); this.skidGain.gain.value=0;
    sk.connect(this.skidFilter); this.skidFilter.connect(this.skidGain); this.skidGain.connect(this.master); sk.start();

    // --- Polizei-Sirene: echte Wail-Heulung (LFO auf Tonhöhe) ---
    this.sirOsc=ctx.createOscillator(); this.sirOsc.type='triangle'; this.sirOsc.frequency.value=800;
    this.sirenGain=ctx.createGain(); this.sirenGain.gain.value=0;
    this.sirOsc.connect(this.sirenGain); this.sirenGain.connect(this.master); this.sirOsc.start();
    this.sirLFO=ctx.createOscillator(); this.sirLFO.type='sine'; this.sirLFO.frequency.value=0.35;
    this.sirDepth=ctx.createGain(); this.sirDepth.gain.value=320;
    this.sirLFO.connect(this.sirDepth); this.sirDepth.connect(this.sirOsc.frequency); this.sirLFO.start();

    // --- Musik-Bus ---
    this.musicGain=ctx.createGain(); this.musicGain.gain.value=0.5; this.musicGain.connect(this.master);
  }
  resume(){ try{ if(this.ctx&&this.ctx.state==='suspended') this.ctx.resume(); }catch{} }
  setMuted(m){ this.muted=m; if(this.master) this.master.gain.value=m?0:0.55; }

  // Motor mit 6 Gängen: Drehzahl steigt pro Gang, Schalt-Dip + Klick.
  engine(speed01, throttle, nitro, speedMps){
    if(!this.ctx) return;
    const t=this.ctx.currentTime;
    const v=(speedMps==null? speed01*65 : Math.max(0,speedMps));
    const top=65;
    const gFloat=Math.min(5.999,(v/top)*6);
    const gear=Math.floor(gFloat), inGear=gFloat-gear;
    if(gear!==this.gear){ // Schalten!
      if(v>3){ this.shiftDip=0.09; this.shiftClick(); }
      this.gear=gear;
    }
    const rpmT=0.22+0.78*inGear+(throttle?0.04:0);
    this.rpm+=(rpmT-this.rpm)*(throttle?0.25:0.12);
    if(this.shiftDip>0) this.shiftDip-=1/60;
    const dip=this.shiftDip>0?0.35:1;
    const base=42+this.rpm*175+(nitro?38:0);
    this.oscLow.frequency.setTargetAtTime(base,t,0.03);
    this.oscLow2.frequency.setTargetAtTime(base*0.5+2.5,t,0.03);
    this.oscSub.frequency.setTargetAtTime(base*0.5,t,0.04);
    this.oscHigh.frequency.setTargetAtTime(base*2.03+5,t,0.03);
    this.engFilter.frequency.setTargetAtTime(500+this.rpm*3400+(nitro?1600:0)+(throttle?600:0),t,0.06);
    const load=throttle?1:0.35;
    this.engGain.gain.setTargetAtTime((0.045+this.rpm*0.075)*load*dip,t,0.05);
    this.highGain.gain.setTargetAtTime(Math.pow(this.rpm,2.5)*0.5*dip,t,0.06);
    this.subGain.gain.setTargetAtTime(0.35+this.rpm*0.5,t,0.08);
    // Auspuff-Blubbern im Schubbetrieb bei Drehzahl
    const lift=!throttle&&this.rpm>0.55&&v>8;
    this.exGain.gain.setTargetAtTime(lift?0.05+this.rpm*0.06:(throttle?0.02:0.004),t,0.09);
    if(lift&&t>this.backfireT){ this.backfireT=t+0.06+Math.random()*0.22; this.pop(); }
    // Fahrtwind wächst quadratisch mit Tempo
    this.windFilter.frequency.setTargetAtTime(300+speed01*2600,t,0.15);
    this.windGain.gain.setTargetAtTime(speed01*speed01*0.16,t,0.15);
  }
  skid(amount,pitch=1){
    if(!this.ctx) return;
    const t=this.ctx.currentTime;
    this.skidGain.gain.setTargetAtTime(this.muted?0:Math.min(0.22,amount*0.22),t,0.05);
    this.skidFilter.frequency.setTargetAtTime((700+Math.random()*120)*pitch+amount*500,t,0.08);
  }
  pop(){ // Auspuff-Knallen
    if(!this.ctx||this.muted) return;
    const t=this.ctx.currentTime;
    const s=this.ctx.createBufferSource(); s.buffer=this.noiseBuf;
    const f=this.ctx.createBiquadFilter(); f.type='lowpass'; f.frequency.value=900+Math.random()*800;
    const g=this.ctx.createGain(); g.gain.setValueAtTime(0.12+Math.random()*0.1,t);
    g.gain.exponentialRampToValueAtTime(0.001,t+0.05+Math.random()*0.05);
    s.connect(f); f.connect(g); g.connect(this.master); s.start(t,Math.random()*0.5,0.12);
  }
  shiftClick(){
    if(!this.ctx||this.muted) return;
    this.beep(180,0.05,'square',0.08);
  }
  beep(freq=440,dur=0.12,type='square',vol=0.25,when=0){
    if(!this.ctx||this.muted) return;
    const t=this.ctx.currentTime+when;
    const o=this.ctx.createOscillator(),g=this.ctx.createGain();
    o.type=type; o.frequency.value=freq; g.gain.setValueAtTime(vol,t);
    g.gain.exponentialRampToValueAtTime(0.001,t+dur);
    o.connect(g); g.connect(this.master); o.start(t); o.stop(t+dur+0.02);
  }
  uiClick(){ this.beep(1150,0.05,'square',0.10); this.beep(1720,0.04,'sine',0.07,0.02); }
  lapJingle(){ [523,659,784].forEach((f,i)=>this.beep(f,0.14,'triangle',0.20,i*0.09)); }
  finishFanfare(win){
    if(win) [523,659,784,1047,1319].forEach((f,i)=>this.beep(f,0.22,'triangle',0.22,i*0.11));
    else [392,330,262].forEach((f,i)=>this.beep(f,0.3,'sawtooth',0.14,i*0.16));
  }
  nitroWhoosh(){
    // Druckvoller: Rausch-Sweep + Sub-Drop + Zischen
    if(!this.ctx||this.muted) return;
    const t=this.ctx.currentTime;
    const s=this.ctx.createBufferSource(); s.buffer=this.noiseBuf;
    const f=this.ctx.createBiquadFilter(); f.type='bandpass'; f.Q.value=1.4;
    f.frequency.setValueAtTime(500,t); f.frequency.exponentialRampToValueAtTime(6500,t+0.55);
    const g=this.ctx.createGain(); g.gain.setValueAtTime(0.28,t);
    g.gain.exponentialRampToValueAtTime(0.001,t+0.7);
    s.connect(f); f.connect(g); g.connect(this.master); s.start(t,Math.random(),0.75);
    const o=this.ctx.createOscillator(); o.type='sine';
    o.frequency.setValueAtTime(280,t); o.frequency.exponentialRampToValueAtTime(55,t+0.5);
    const og=this.ctx.createGain(); og.gain.setValueAtTime(0.25,t);
    og.gain.exponentialRampToValueAtTime(0.001,t+0.55);
    o.connect(og); og.connect(this.master); o.start(t); o.stop(t+0.6);
  }
  crash(intensity=1){
    if(!this.ctx||this.muted) return;
    const t=this.ctx.currentTime, k=Math.min(1.5,0.4+intensity);
    // Dumpfer Einschlag
    const o=this.ctx.createOscillator(); o.type='sine';
    o.frequency.setValueAtTime(110,t); o.frequency.exponentialRampToValueAtTime(34,t+0.28);
    const og=this.ctx.createGain(); og.gain.setValueAtTime(0.5*k,t);
    og.gain.exponentialRampToValueAtTime(0.001,t+0.32);
    o.connect(og); og.connect(this.master); o.start(t); o.stop(t+0.35);
    // Blech-Crunch
    const s=this.ctx.createBufferSource(); s.buffer=this.noiseBuf;
    const f=this.ctx.createBiquadFilter(); f.type='lowpass'; f.frequency.setValueAtTime(2600*k,t);
    f.frequency.exponentialRampToValueAtTime(300,t+0.3);
    const g=this.ctx.createGain(); g.gain.setValueAtTime(0.35*k,t);
    g.gain.exponentialRampToValueAtTime(0.001,t+0.34);
    s.connect(f); f.connect(g); g.connect(this.master); s.start(t,Math.random()*0.6,0.4);
    this.beep(82,0.25,'sawtooth',0.18*k);
  }
  // Kompatibilität: altes siren(cop) -> volle Lautstärke kurz anheben
  siren(){ if(this.ctx) this.sirenGain.gain.setTargetAtTime(0.05,this.ctx.currentTime,0.4); }
  // Neue Steuerung: 0 = keine Polizei in der Nähe, 1 = direkt am Stoßfänger
  sirenLevel(x,heat=1){
    if(!this.ctx) return;
    const t=this.ctx.currentTime;
    this.sirenGain.gain.setTargetAtTime(this.muted?0:Math.pow(Math.max(0,x),1.5)*0.11,t,0.3);
    this.sirLFO.frequency.setTargetAtTime(0.28+heat*0.09,t,0.5);
    this.sirDepth.gain.setTargetAtTime(280+heat*60,t,0.5);
  }

  // --- Synthwave-Sequenzer: 4 Akkorde, Bass/Arp/Pad/Drums, 8-taktige Variation ---
  startMusic(){
    if(!this.ctx||this.musicTimer) return;
    const CH=[
      {root:55.0,  tones:[110,130.8,164.8]},  // Am
      {root:43.65, tones:[87.3,110,130.8]},  // F
      {root:65.4,  tones:[130.8,164.8,196]}, // C
      {root:49.0,  tones:[98,123.5,146.8]},  // G
    ];
    const stepDur=60/132/4; this.step=0; this.nextT=this.ctx.currentTime+0.1;
    this.musicTimer=setInterval(()=>{
      if(!this.ctx||this.muted){ this.nextT=Math.max(this.nextT,this.ctx?this.ctx.currentTime+0.1:0); return; }
      while(this.nextT<this.ctx.currentTime+0.2){
        const s=this.step, bar=Math.floor(s/16)%4, st=s%16, bar8=Math.floor(s/16)%8;
        const ch=CH[bar], t=this.nextT-this.ctx.currentTime;
        // Kick four-on-floor (Bars 0-5,7; Break in Bar 6)
        if(st%4===0&&bar8!==6) this.kick(t);
        // Snare 2 & 4
        if((st===4||st===12)&&bar8!==6) this.snare(t);
        // Hats: Offbeat + 16tel-Geflirr in geraden Bars
        if(st%4===2) this.hat(t,0.05);
        if(bar8%2===0&&st%2===1) this.hat(t,0.025);
        // Bass-Achtel mit Oktavsprüngen
        if(st%2===0){ const oct=(st===6||st===14)?2:1; this.pluck(ch.root*oct,t,0.16,'sawtooth',0.11); }
        // Arp-Sechzehntel, aufsteigend, jede 2. Bar eine Oktave höher
        const arp=ch.tones[(st)%3]*(st%6<3?2:(bar8%2?4:2));
        this.pluck(arp,t,0.09,'square',bar8===7?0.05:0.032);
        // Pad-Akkord am Taktanfang
        if(st===0) ch.tones.forEach(f=>this.pluck(f/2,t,stepDur*15,'sawtooth',0.035));
        // Fill am Ende von Bar 7
        if(bar8===7&&st>=12) this.hat(t,0.04+ (st-12)*0.01);
        this.nextT+=stepDur; this.step++;
      }
    },60);
  }
  stopMusic(){ if(this.musicTimer){ clearInterval(this.musicTimer); this.musicTimer=null; } }
  kick(when){
    const t=this.ctx.currentTime+when;
    const o=this.ctx.createOscillator(),g=this.ctx.createGain();
    o.type='sine'; o.frequency.setValueAtTime(130,t); o.frequency.exponentialRampToValueAtTime(38,t+0.12);
    g.gain.setValueAtTime(0.5,t); g.gain.exponentialRampToValueAtTime(0.001,t+0.14);
    o.connect(g); g.connect(this.musicGain); o.start(t); o.stop(t+0.16);
  }
  snare(when){
    const t=this.ctx.currentTime+when;
    const s=this.ctx.createBufferSource(); s.buffer=this.noiseBuf;
    const f=this.ctx.createBiquadFilter(); f.type='bandpass'; f.frequency.value=1900; f.Q.value=0.8;
    const g=this.ctx.createGain(); g.gain.setValueAtTime(0.22,t); g.gain.exponentialRampToValueAtTime(0.001,t+0.16);
    s.connect(f); f.connect(g); g.connect(this.musicGain); s.start(t,Math.random()*0.5,0.2);
    const o=this.ctx.createOscillator(),og=this.ctx.createGain();
    o.type='triangle'; o.frequency.value=190;
    og.gain.setValueAtTime(0.12,t); og.gain.exponentialRampToValueAtTime(0.001,t+0.09);
    o.connect(og); og.connect(this.musicGain); o.start(t); o.stop(t+0.1);
  }
  hat(when,vol){
    const t=this.ctx.currentTime+when;
    const s=this.ctx.createBufferSource(); s.buffer=this.noiseBuf;
    const f=this.ctx.createBiquadFilter(); f.type='highpass'; f.frequency.value=7500;
    const g=this.ctx.createGain(); g.gain.setValueAtTime(vol,t); g.gain.exponentialRampToValueAtTime(0.001,t+0.04);
    s.connect(f); f.connect(g); g.connect(this.musicGain); s.start(t,Math.random()*0.8,0.06);
  }
  pluck(freq,when,dur,type,vol){
    const t=this.ctx.currentTime+when;
    const o=this.ctx.createOscillator(),g=this.ctx.createGain(),f=this.ctx.createBiquadFilter();
    o.type=type; o.frequency.value=freq*(1+(Math.random()-0.5)*0.004);
    f.type='lowpass'; f.frequency.setValueAtTime(3200,t); f.frequency.exponentialRampToValueAtTime(700,t+dur);
    g.gain.setValueAtTime(vol,t); g.gain.exponentialRampToValueAtTime(0.001,t+dur);
    o.connect(f); f.connect(g); g.connect(this.musicGain); o.start(t); o.stop(t+dur+0.02);
  }
}
