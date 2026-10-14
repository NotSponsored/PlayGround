import * as THREE from 'three';
import { World } from './world.js';
import { buildCar, setNitroVisual, setCopFlash } from './carModel.js';
import { Racer, aiInput } from './physics.js';
import { clamp, lerp } from './utils.js';
import { fmtTime } from './config.js';

export class Game{
  constructor(canvas, audio){
    this.canvas=canvas; this.audio=audio;
    this.renderer=new THREE.WebGLRenderer({canvas, antialias:true});
    this.renderer.setPixelRatio(Math.min(devicePixelRatio,2));
    this.renderer.setSize(innerWidth,innerHeight);
    this.renderer.shadowMap.enabled=true;
    this.renderer.shadowMap.type=THREE.PCFSoftShadowMap;
    this.scene=new THREE.Scene();
    this.camera=new THREE.PerspectiveCamera(68,innerWidth/innerHeight,0.1,3000);
    this.camera.position.set(0,4,-8);
    addEventListener('resize',()=>{
      this.camera.aspect=innerWidth/innerHeight; this.camera.updateProjectionMatrix();
      this.renderer.setSize(innerWidth,innerHeight);
    });
    this.keys={};
    addEventListener('keydown',e=>{
      if(['ArrowUp','ArrowDown','ArrowLeft','ArrowRight','Space'].includes(e.code)) e.preventDefault();
      this.keys[e.code]=true;
      if(e.code==='KeyC'&&this.state==='racing') this.camMode=(this.camMode+1)%3;
      if(e.code==='KeyM'){ this.audio.init(); this.audio.setMuted(!this.audio.muted); this.onMute?.(this.audio.muted); }
      if(e.code==='KeyR'&&(this.state==='racing'||this.state==='countdown')) this.resetToTrack(this.player);
      if(e.code==='KeyP'||e.code==='Escape'){
        if(this.state==='racing'||this.state==='paused') this.togglePause();
        return;
      }
      if(e.code==='Enter'){
        if(this.state==='paused'||this.state==='finished') this.restartRace();
        return;
      }
      if(e.code==='KeyQ'){
        if(this.state==='paused'||this.state==='finished') this.quitToMenu();
        return;
      }
    });
    addEventListener('keyup',e=>{ this.keys[e.code]=false; });
    this.camMode=0; this.state='menu';
    this.clock=new THREE.Clock();
    this.demoMode=true;
  }

  playerInput(){
    const k=this.keys;
    const up=k['KeyW']||k['ArrowUp'], down=k['KeyS']||k['ArrowDown'];
    const left=k['KeyA']||k['ArrowLeft'], right=k['KeyD']||k['ArrowRight'];
    return {
      throttle: up?1:(down?-1:0),
      steer: (left?1:0)+(right?-1:0), // links = + (wegen heading-Vorzeichen)
      handbrake: !!k['Space']||!!k['KeyB'],
      nitro: !!(k['ShiftLeft']||k['ShiftRight']||k['KeyN']||k['KeyF']),
    };
  }

  async newRace({ track='city', laps=3, aiCount=3, mode='sprint', playerSetup, onHud, onMsg, onFinish, onMute, onQuitToMenu }){
    this.onHud=onHud; this.onMsg=onMsg; this.onFinish=onFinish; this.onMute=onMute; this.onQuitToMenu=onQuitToMenu;
    this.raceCfg={track,laps,aiCount,mode};
    this.racePlayerSetup=playerSetup;
    this.cfg={track,laps,aiCount,mode};
    this.demoMode=false;
    // Welt neu
    if(this.world){ this.world.dispose(this.scene); }
    // Szene leeren (Autos entfernen)
    for(const r of (this.racers||[])) this.scene.remove(r.mesh);
    this.scene.clear();
    this.scene.add(this.camera);
    this.world=new World(this.scene, track);
    this.time=0; this.countdownT=0; this.state='countdown';
    this.racers=[]; this.cops=[]; this.traffic=[];
    this.totalLaps=laps; this.mode=mode;
    this.playerSetup=playerSetup;
    this.heat=1; this.heatT=0; this.busted=0; this.escapeT=0; this.surviveT=0;
    this.timeLimit=mode==='pursuit'?180:Infinity;
    this.msgT=0;

    const start= this.world.pointAt(0,0);
    const yaw=Math.atan2(start.tan.x,start.tan.z);
    // Spieler
    const pMesh=buildCar(playerSetup);
    this.scene.add(pMesh);
    const topBonus=(playerSetup.tune?.motor||2)*1.6;
    const gripBonus=(playerSetup.tune?.grip||2)*0.25;
    this.player=new Racer({
      isPlayer:true, mesh:pMesh, name:'DU',
      topSpeed:playerSetup.car.topspeed+topBonus,
      accel:playerSetup.car.accel+(playerSetup.tune?.motor||2)*0.9,
      grip:playerSetup.car.grip+gripBonus,
      nitroMax:playerSetup.car.nitro+(playerSetup.tune?.nitro||2)*14,
    });
    // Startaufstellung versetzt
    const gridSlots=[{u:-0.004,lat:2.5},{u:-0.008,lat:-2.5},{u:-0.012,lat:2.5},{u:-0.016,lat:-2.5},{u:-0.02,lat:2.5},{u:-0.024,lat:-2.5}];
    const pSlot=gridSlots[0];
    const pp=this.world.pointAt(frac(pSlot.u),pSlot.lat);
    this.player.placeAt(pp.pos.clone().setY(pp.pos.y), Math.atan2(pp.tan.x,pp.tan.z));
    this.player.trackIdx=this.world.locate(this.player.pos,0,200).idx;
    this.player.startIdx=this.player.trackIdx; this.player.dist=0; this.player.progress=this.player.startIdx;
    this.racers.push(this.player);

    // KI-Gegner
    const names=['RYO','NINA','DIESEL','KAI','SOPHIA','VOLT'];
    const cols=[0xffd600,0x7c4dff,0x00ff9d,0xff1744,0xffffff,0xb6ff00];
    const nAI = mode==='canyon'?Math.min(1,aiCount):aiCount;
    for(let i=0;i<nAI;i++){
      const slot=gridSlots[(i+1)%gridSlots.length];
      const mesh=buildCar({paint:cols[i%cols.length],neon:cols[(i+2)%cols.length],vinyl:['stripe','flame','carbon','none'][i%4],spoiler:i%2?'gt':'sport'});
      this.scene.add(mesh);
      const skill=0.72+Math.random()*0.22;
      const r=new Racer({ mesh, name:names[i%names.length],
        topSpeed:52+Math.random()*8+(mode==='pursuit'?2:0),
        accel:20+Math.random()*4, grip:6.2+Math.random()*1.1, nitroMax:100,
        aiOffset:(i%2?2.8:-2.8), aiSkill:skill });
      const q=this.world.pointAt(frac(slot.u),slot.lat);
      r.placeAt(q.pos,Math.atan2(q.tan.x,q.tan.z));
      r.trackIdx=this.world.locate(r.pos,0,200).idx;
      r.startIdx=r.trackIdx; r.dist=0; r.progress=r.startIdx;
      this.racers.push(r);
    }
    // Polizei (Most Wanted)
    if(mode==='pursuit'){
      this.spawnCops(2);
    }
    // Verkehr (Highway)
    if(track==='highway'||mode==='pursuit'){
      for(let i=0;i<6;i++){
        const mesh=buildCar({paint:[0x2a3348,0x3a2a33,0x22332a][i%3],neon:0x8899ff,vinyl:'none',spoiler:'none'});
        mesh.scale.setScalar(0.95); this.scene.add(mesh);
        const r=new Racer({mesh,name:'TRAFFIC',topSpeed:20+Math.random()*6,accel:10,grip:7,nitroMax:0,aiOffset:(Math.random()<0.5?3:-3),aiSkill:0.5});
        const u=Math.random();
        const q=this.world.pointAt(u,r.aiOffset);
        r.placeAt(q.pos,Math.atan2(q.tan.x,q.tan.z));
        r.trackIdx=this.world.locate(r.pos,0,400).idx;
        r.isTraffic=true; r.progOffset=0;
        this.traffic.push(r); this.scene.add(r.mesh); this.racers.push(r);
      }
    }
    this.lapStart=0; this.lastLap=null; this.bestLap=null;
    this.positions=[...this.racers];
    this.countdownT=3.6;
    this.cdLast=4;
    this.audio.init(); this.audio.resume(); this.audio.startMusic();
  }

  spawnCops(n){
    for(let i=0;i<n;i++){
      const mesh=buildCar({police:true});
      this.scene.add(mesh);
      const r=new Racer({mesh,name:'COP',isCop:true,topSpeed:56+this.heat*1.6,accel:24,grip:7.4,nitroMax:100,aiSkill:0.9});
      // hinter Spieler spawnen
      const u=frac(this.player.trackIdx/this.world.N - 0.02 - i*0.01);
      const q=this.world.pointAt(u, i%2?3:-3);
      r.placeAt(q.pos,Math.atan2(q.tan.x,q.tan.z));
      r.trackIdx=this.world.locate(r.pos,0,300).idx;
      this.cops.push(r); this.racers.push(r);
    }
  }

  showMsg(t,dur=2){ this.msg=t; this.msgT=dur; this.onMsg?.(t); }

  resetToTrack(r){
    if(!r||!this.world) return;
    const loc=this.world.locate(r.pos,r.trackIdx,80);
    const s=loc.sample;
    r.pos.copy(s.pos); r.speed*=0.25; r.slip=0;
    r.heading=Math.atan2(s.tan.x,s.tan.z);
    r.syncMesh();
  }

  togglePause(){
    if(this.state==='racing'){ this.state='paused'; }
    else if(this.state==='paused'){ this.state='racing'; this.clock.getDelta(); }
  }

  async restartRace(){
    if(!this.raceCfg) return;
    this.audio.stopMusic(); this.audio.skid(0); this.audio.sirenLevel(0);
    await this.newRace({ ...this.raceCfg, playerSetup:this.racePlayerSetup,
      onHud:this.onHud, onMsg:this.onMsg, onFinish:this.onFinish, onMute:this.onMute,
      onQuitToMenu:this.onQuitToMenu });
  }

  quitToMenu(){
    this.state='menu';
    this.audio.stopMusic(); this.audio.skid(0); this.audio.sirenLevel(0);
    this.onQuitToMenu?.();
  }

  startDemo(){
    // Menü-Hintergrund: reines KI-Rennen in City
    this.demoMode=true; this.state='demo';
    this.scene.clear(); this.scene.add(this.camera);
    this.world=new World(this.scene,'city');
    this.racers=[];
    for(let i=0;i<4;i++){
      const mesh=buildCar({paint:[0x00e5ff,0xff2d78,0xb6ff00,0xff7a00][i],neon:[0x00e5ff,0xff2d78,0xb6ff00,0x7c4dff][i],vinyl:'stripe',spoiler:'sport'});
      this.scene.add(mesh);
      const r=new Racer({mesh,name:'DEMO'+i,topSpeed:54,accel:22,grip:6.8,nitroMax:100,aiOffset:i%2?2.5:-2.5,aiSkill:0.85});
      const q=this.world.pointAt(frac(-i*0.01),r.aiOffset);
      r.placeAt(q.pos,Math.atan2(q.tan.x,q.tan.z));
      r.trackIdx=this.world.locate(r.pos,0,300).idx;
      this.racers.push(r);
    }
    this.demoCamT=0;
  }

  update(){
    const dt=Math.min(this.clock.getDelta(),0.05);
    if(this.state==='demo'){
      for(const r of this.racers){
        const inp=aiInput(r,this.world,dt,{rubber:0});
        r.step(dt,inp,this.world,null);
        setNitroVisual(r.mesh,inp.nitro,0.7);
      }
      // Kino-Kamera
      this.demoCamT+=dt;
      const lead=this.racers[0];
      const back=lead.pos.clone().add(new THREE.Vector3(Math.sin(lead.heading+0.5)*-14,6,Math.cos(lead.heading+0.5)*-14));
      this.camera.position.lerp(back,1-Math.pow(0.001,dt));
      this.camera.lookAt(lead.pos.x,lead.pos.y+1.5,lead.pos.z);
      this.renderer.render(this.scene,this.camera);
      return;
    }
    if(this.state==='countdown'){
      this.countdownT-=dt;
      const c=Math.ceil(this.countdownT);
      if(c!==this.cdLast&&c>=0){ this.cdLast=c; this.audio.beep(c===0?880:440,0.18); }
      this.onHud?.({countdown:this.countdownT});
      // Verfolger-Kamera hinter dem Spieler (kein Orbit durch die Gantry)
      const p=this.player;
      const dx=Math.sin(p.heading), dz=Math.cos(p.heading);
      this.camera.position.set(p.pos.x-dx*10,p.pos.y+4.2,p.pos.z-dz*10);
      this.camera.lookAt(p.pos.x+dx*6,p.pos.y+1.2,p.pos.z+dz*6);
      for(const r of this.racers) r.syncMesh();
      this.renderer.render(this.scene,this.camera);
      if(this.countdownT<=0){ this.state='racing'; this.lapStart=performance.now()/1000; this.audio.beep(880,0.4);
        this.showMsg(this.mode==='pursuit'?'ENTKOMME DER POLIZEI!':this.mode==='canyon'?'CANYON-DUELL — BLEIB VORN!':'GO!',1.6); }
      return;
    }
    if(this.state==='paused'){
      this.onHud?.({paused:true});
      this.renderer.render(this.scene,this.camera);
      return;
    }
    if(this.state!=='racing') return;
    this.time+=dt;
    const k=this.keys;

    // --- Heat-Logik (Most Wanted)
    if(this.mode==='pursuit'){
      this.heatT+=dt;
      const newHeat=Math.min(5,1+Math.floor(this.heatT/35));
      if(newHeat!==this.heat){ this.heat=newHeat; this.showMsg(`HEAT-STUFE ${newHeat} — VERSTÄRKUNG!`,2); this.spawnCops(1); for(const c of this.cops){ c.topSpeed=56+this.heat*1.6; } }
      this.surviveT+=dt;
      // Busted / Escape
      let nearest=Infinity;
      for(const c of this.cops) nearest=Math.min(nearest,c.pos.distanceTo(this.player.pos));
      this.audio.sirenLevel(clamp(1-nearest/130,0,1),this.heat);
      const spd=Math.abs(this.player.speed);
      if(nearest<10&&spd<11) this.busted+=dt*(1.2+this.heat*0.25);
      else this.busted=Math.max(0,this.busted-dt*0.8);
      if(nearest>45) this.escapeT+=dt; else this.escapeT=0;
      if(this.busted>=6){ return this.finish('BUSTED — FESTGENOMMEN!',false); }
      if(this.surviveT>=this.timeLimit||this.escapeT>12){ return this.finish('ENTKOMMEN! — RESPEKT +2500',true); }
    }

    // --- Spieler-Physik
    const pin=this.playerInput();
    const nitroOn=this.player.step(dt,pin,this.world,this.audio,true);
    setNitroVisual(this.player.mesh,nitroOn,1);
    this.audio.engine(clamp(Math.abs(this.player.speed)/70,0,1),pin.throttle>0,nitroOn,this.player.speed);
    this.audio.skid(this.player.drifting?0.9:(Math.abs(this.player.slip)*0.4));

    // --- KI + Cops + Verkehr
    const rubberBase=this.rubberOf(this.player);
    for(const r of this.racers){
      if(r===this.player||r.isTraffic) continue;
      if(r.isCop){
        const inp=aiInput(r,this.world,dt,{copChase:true,chasePos:this.player.pos});
        r.step(dt,inp,this.world,null);
        setNitroVisual(r.mesh,inp.nitro,0.6);
        setCopFlash(r.mesh,performance.now()*0.001);
        continue;
      }
      if(r.finished) continue;
      // Gummiband: zurückliegende KI wird schneller
      const gap=r.progress-this.player.progress;
      const inp=aiInput(r,this.world,dt,{rubber:clamp(-gap*0.02,-1.5,1.5)});
      r.step(dt,inp,this.world,null);
      setNitroVisual(r.mesh,inp.nitro,0.6);
    }
    for(const t of this.traffic){
      const inp=aiInput(t,this.world,dt,{rubber:0});
      inp.throttle=0.6; inp.nitro=false;
      t.step(dt,inp,this.world,null);
    }

    // --- Kollisionen Auto/Auto (einfach)
    this.carCollisions(dt);

    // --- Runden / Checkpoints / Platzierung
    this.updateRaceLogic(dt);

    // --- Kamera
    this.updateCamera(dt,nitroOn);

    // --- Minimap + HUD
    this.onHud?.({
      speed:this.player.kmh, nitro:this.player.nitro/this.player.nitroMax,
      lap:this.player.lap+1, laps:this.totalLaps, time:this.time,
      last:this.lastLap, pos:this.playerPosition(), count:this.racers.filter(r=>!r.isCop&&!r.isTraffic).length,
      heat:this.heat, busted:this.busted/6, escape:this.escapeT, survive:this.surviveT, timeLeft:this.timeLimit-this.surviveT,
      mode:this.mode, drift:this.player.driftChain, driftTotal:this.player.driftPts,
      paused:false,
    });
    if(this.msgT>0){ this.msgT-=dt; if(this.msgT<=0) this.onMsg?.(''); }
    // Nitro-Screen-Flash
    const nf=document.getElementById('nitro-flash');
    if(nf) nf.style.opacity=nitroOn?0.9:Math.max(0,(parseFloat(nf.style.opacity)||0)-dt*3);

    this.renderer.render(this.scene,this.camera);
  }

  rubberOf(p){ return 0; }

  carCollisions(dt){
    const all=this.racers;
    for(let i=0;i<all.length;i++) for(let j=i+1;j<all.length;j++){
      const a=all[i],b=all[j];
      const d=a.pos.distanceTo(b.pos);
      if(d<3.2&&d>0.01){
        const nx=(b.pos.x-a.pos.x)/d, nz=(b.pos.z-a.pos.z)/d;
        const overlap=3.2-d;
        const aIsP=a===this.player, bIsP=b===this.player;
        // wegschieben
        if(!a.isTraffic){ a.pos.x-=nx*overlap*0.5; a.pos.z-=nz*overlap*0.5; }
        if(!b.isTraffic){ b.pos.x+=nx*overlap*0.5; b.pos.z+=nz*overlap*0.5; }
        // Speed-Austausch + Crash bei hoher Differenz
        const rel=Math.abs(a.speed-b.speed);
        if(rel>10){
          if(aIsP||bIsP) this.audio.crash(Math.min(1.5,rel/22));
          const m=(a.speed+b.speed)*0.5;
          a.speed=m*0.92; b.speed=m*0.92;
          if(a.isCop||b.isCop){ // PIT-Manöver bremst Spieler
            if(aIsP) a.speed*=0.9; if(bIsP) b.speed*=0.9;
          }
        }
      }
    }
  }

  updateRaceLogic(dt){
    // Runden aus der fortlaufenden Distanz (wird in Racer.step gepflegt).
    const N=this.world.N;
    for(const r of this.racers){
      if(r.isCop||r.isTraffic) continue;
      const toLine=N-(r.startIdx||0); // Restweg bis zur ersten Zieldurchfahrt
      let lap=0;
      if((r.dist||0)>=toLine) lap=Math.floor((r.dist-toLine)/N);
      if(lap>r.lap){
        r.lap=lap;
        if(r===this.player){
          const now=performance.now()/1000;
          const lapT=now-this.lapStart; this.lapStart=now;
          this.lastLap=lapT;
          if(!this.bestLap||lapT<this.bestLap) this.bestLap=lapT;
          if(lap>=this.totalLaps){ this.finishRacePositions(); return; }
          else { this.showMsg(`RUNDE ${lap+1}/${this.totalLaps}`,1.6); this.audio.lapJingle(); }
        } else if(lap>=this.totalLaps&&!r.finished){ r.finished=true; r.finishTime=this.time; }
      }
    }
  }

  playerPosition(){
    const contenders=this.racers.filter(r=>!r.isCop&&!r.isTraffic);
    const sorted=[...contenders].sort((a,b)=>b.progress-a.progress);
    return sorted.indexOf(this.player)+1;
  }

  finishRacePositions(){
    this.player.finished=true; this.player.finishTime=this.time;
    // KI-Positionen anhand progress sortieren, fehlende Runden schätzen
    const contenders=this.racers.filter(r=>!r.isCop&&!r.isTraffic);
    const sorted=[...contenders].sort((a,b)=>b.progress-a.progress);
    const pos=sorted.indexOf(this.player)+1;
    const win=pos===1;
    this.finish(win?`SIEG! — PLATZ 1/${sorted.length}`:`ZIEL — PLATZ ${pos}/${sorted.length}`,win,sorted);
  }

  finish(title,win,order){
    if(this.state!=='racing') return;
    this.state='finished';
    this.audio.stopMusic(); this.audio.skid(0);
    this.audio.sirenLevel(0); this.audio.finishFanfare(win);
    this.onFinish?.({title,win,order:order||[...this.racers.filter(r=>!r.isCop&&!r.isTraffic)].sort((a,b)=>b.progress-a.progress),
      time:this.time,last:this.lastLap,best:this.bestLap,mode:this.mode,heat:this.heat,drift:this.player.driftPts,escape:this.escapeT,survive:this.surviveT});
  }

  updateCamera(dt,nitroOn){
    const p=this.player;
    const back={0:8.5,1:11.5,2:0.5}[this.camMode];
    const h={0:3.2,1:4.5,2:1.35}[this.camMode];
    const dirX=Math.sin(p.heading), dirZ=Math.cos(p.heading);
    let des;
    if(this.camMode===2){
      des=new THREE.Vector3(p.pos.x+dirX*0.2,p.pos.y+h,p.pos.z+dirZ*0.2);
      this.camera.position.lerp(des,1-Math.pow(0.0001,dt));
      const look=new THREE.Vector3(p.pos.x+dirX*20,p.pos.y+1.2,p.pos.z+dirZ*20);
      this.camera.lookAt(look);
    } else {
      des=new THREE.Vector3(p.pos.x-dirX*back-Math.cos(p.heading)*this.player.slip*2,p.pos.y+h,p.pos.z-dirZ*back+Math.sin(p.heading)*this.player.slip*2);
      this.camera.position.lerp(des,1-Math.pow(0.0005,dt));
      const look=new THREE.Vector3(p.pos.x+dirX*8,p.pos.y+1.4,p.pos.z+dirZ*8);
      this.camera.lookAt(look);
    }
    const targetFov=nitroOn?78:68;
    this.camera.fov+=(targetFov-this.camera.fov)*Math.min(1,dt*5);
    this.camera.updateProjectionMatrix();
    // Shake bei Crash / Offroad / Highspeed
    const now=performance.now();
    if(now-this.player.lastCrash<400||(this.player.offroad&&Math.abs(this.player.speed)>15)){
      this.camera.position.x+=(Math.random()-0.5)*0.25;
      this.camera.position.y+=(Math.random()-0.5)*0.2;
    }
  }
}
function frac(x){ return ((x%1)+1)%1; }
