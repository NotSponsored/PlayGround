import * as THREE from 'three';
import { clamp, lerp } from './utils.js';

// Arcade-Fahrzeugzustand (für Spieler, KI, Polizei, Verkehr)
export class Racer{
  constructor(opts){
    this.isPlayer=!!opts.isPlayer;
    this.isCop=!!opts.isCop;
    this.topSpeed=opts.topSpeed||58;      // m/s (~209 km/h)
    this.accel=opts.accel||22;
    this.gripBase=opts.grip||7;
    this.nitroMax=opts.nitroMax||100;
    this.nitro=this.nitroMax*0.7;
    this.mesh=opts.mesh;
    this.pos=new THREE.Vector3();
    this.heading=0;
    this.speed=0;
    this.slip=0;          // Drift-Slide (-1..1)
    this.drifting=false;
    this.wallCooldown=0;
    this.trackIdx=0;
    this.lat=0;
    this.lap=0;
    this.checkpoint=0;
    this.dist=0;
    this.startIdx=0;
    this.progress=0;      // Gesamtfortschritt für Platzierung
    this.finished=false;
    this.finishTime=0;
    this.offroad=false;
    this.nitroActive=false;
    this.steerVis=0;
    this.accelVis=0;
    this.lastCrash=0;
    this.aiOffset=opts.aiOffset||0;
    this.aiSkill=opts.aiSkill??0.85;
    this.name=opts.name||'RACER';
    this.color=opts.color||0xffffff;
    this.driftPts=0; this.driftChain=0;
  }
  placeAt(point, heading){
    this.pos.copy(point); this.heading=heading; this.speed=0; this.slip=0;
    this.syncMesh();
  }
  get kmh(){ return Math.abs(this.speed)*3.6; }
  syncMesh(){
    this.mesh.position.copy(this.pos);
    this.mesh.rotation.y=this.heading;
    // Neigung bei Drift / Lenken
    const targetRoll=-this.steerVis*0.06 - this.slip*0.12;
    const targetPitch=THREE.MathUtils.clamp(-this.accelVis*0.02,-0.03,0.04);
    this.mesh.rotation.z+=(targetRoll-this.mesh.rotation.z)*0.2;
    this.mesh.rotation.x+=(targetPitch-this.mesh.rotation.x)*0.15;
    // Räder
    const w=this.mesh.userData.wheels;
    if(w){
      const spin=this.speed*0.09;
      for(let i=0;i<w.length;i++){
        w[i].children[0].rotation.x+=spin;
        w[i].children[1].rotation.x+=spin;
      }
      // Vorderräder lenken
      w[0].rotation.y=this.steerVis*0.45; w[1].rotation.y=this.steerVis*0.45;
    }
  }
  // input: {throttle:-1..1, steer:-1..1, handbrake:bool, nitro:bool}
  step(dt, input, world, audio, isPlayerRef){
    const wasNitro=this.nitroActive;
    const wantNitro=input.nitro&&this.nitro>1&&input.throttle>0;
    this.nitroActive=wantNitro;
    if(wantNitro){ this.nitro=Math.max(0,this.nitro-dt*28); if(this.isPlayer&&!wasNitro&&audio) audio.nitroWhoosh(); }
    else { this.nitro=Math.min(this.nitroMax,this.nitro+dt*(this.drifting?14:4)); }

    const boost=wantNitro?1.55:1;
    const topEff=this.topSpeed*(wantNitro?1.28:1);
    // Gas / Bremse
    if(input.throttle>0){
      const eff=this.accel*boost*(1-Math.max(0,this.speed)/topEff);
      this.speed+=Math.max(0,eff)*input.throttle*dt;
    } else if(input.throttle<0){
      if(this.speed>1) this.speed-=34*dt;         // bremsen
      else this.speed=Math.max(-12,this.speed-14*dt); // rückwärts
    } else {
      // Rollwiderstand / Motorbremse
      this.speed-=this.speed*0.35*dt;
      if(Math.abs(this.speed)<0.2) this.speed=0;
    }
    // Offroad-Widerstand
    if(this.offroad&&!this.isCop){ this.speed-=this.speed*0.9*dt; }

    // Grip / Drift — Lenkung: +1 = links, -1 = rechts
    const spd=Math.abs(this.speed);
    const hb=input.handbrake?1:0;
    const driftIntent=Math.abs(input.steer)>0.35&&(hb||spd>26);
    this.drifting=driftIntent&&spd>10;
    // Weichere, geschwindigkeitsabhängige Gierrate (ruhig bei Tempo, wendig bei langsam)
    this.steerVis+=(clamp(input.steer,-1,1)-this.steerVis)*Math.min(1,dt*6.5);
    const gripFactor=clamp(this.gripBase/7,0.85,1.15); // Reifen-Tuning bleibt spürbar
    const maxYaw=lerp(2.3,0.95,clamp(spd/60,0,1))*(this.drifting?1.35:1)*gripFactor;
    const authority=clamp(spd/7,0,1)*(this.offroad?0.75:1); // im Stand kaum Einlenken
    const yawRate=this.steerVis*maxYaw*authority;
    this.heading+=yawRate*dt*(this.speed<-0.5?-1:1);
    this.accelVis=input.throttle*this.accel;

    // Slip für Optik + Driftpunkte
    const targetSlip=this.drifting?clamp(input.steer*0.9,-1,1):0;
    this.slip+=(targetSlip-this.slip)*Math.min(1,dt*(this.drifting?6:9));
    if(this.drifting&&spd>14){
      this.driftChain+=dt*spd*0.6;
      this.nitro=Math.min(this.nitroMax,this.nitro+dt*10);
    } else {
      if(this.driftChain>40){ this.driftPts+=Math.round(this.driftChain); }
      this.driftChain=0;
    }

    // Fortbewegung
    const dirX=Math.sin(this.heading), dirZ=Math.cos(this.heading);
    // leichter Slide seitlich beim Driften
    const slideX=Math.cos(this.heading)*this.slip*spd*0.35;
    const slideZ=-Math.sin(this.heading)*this.slip*spd*0.35;
    this.pos.x+=(dirX*this.speed+slideX)*dt;
    this.pos.z+=(dirZ*this.speed+slideZ)*dt;
    if(world){
      // Höhe (Canyon-Wellen)
      const loc=world.locate(this.pos,this.trackIdx,40);
      // Fortlaufende Distanz für Runden + Platzierung (Sprünge = Glitch/Teleport -> ignorieren)
      let dd=loc.idx-this.trackIdx;
      const NN=world.N;
      if(dd<-NN/2) dd+=NN; else if(dd>NN/2) dd-=NN;
      if(Math.abs(dd)<=25){ this.dist=(this.dist||0)+dd; this.progress=(this.startIdx||0)+this.dist; }
      this.trackIdx=loc.idx; this.lat=loc.lat; this._fw=loc.fw;
      const s=loc.sample;
      this.pos.y+=(s.pos.y-this.pos.y)*Math.min(1,dt*8);
      this.offroad=Math.abs(loc.lat)>world.roadHalf+0.4;
      // Wand
      const lim=world.roadHalf+1.5;
      this.wallCooldown=Math.max(0,this.wallCooldown-dt);
      if(Math.abs(loc.lat)>lim){
        const sgn=Math.sign(loc.lat);
        // zurückschieben
        this.pos.x-=s.left.x*(Math.abs(loc.lat)-lim)*sgn;
        this.pos.z-=s.left.z*(Math.abs(loc.lat)-lim)*sgn;
        if(spd>12&&this.wallCooldown<=0){
          this.wallCooldown=0.6;
          this.speed*=0.72;
          this.lastCrash=performance.now();
          if(this.isPlayer&&audio) audio.crash();
        } else this.speed*= (1-1.6*dt);
        this.lat=sgn*lim;
      }
    }
    this.syncMesh();
    return wantNitro;
  }
}

// KI-Steuerung: Pure Pursuit auf Ideallinie
export function aiInput(racer, world, dt, opts={}){
  const lookahead=14+Math.abs(racer.speed)*0.55;
  // Zielpunkt mit seitlichem Offset (Überhol-/Ideallinie)
  let lat=racer.aiOffset;
  // In Kurven innen anfahren
  const curveAhead=world.curvatureAt((racer.trackIdx+Math.floor(lookahead*2))%world.N);
  if(curveAhead>0.12) lat*=0.4;
  const ahead=world.pointAt(frac(racer.trackIdx/world.N + lookahead/trackLength(world)), lat);
  const dx=ahead.pos.x-racer.pos.x, dz=ahead.pos.z-racer.pos.z;
  // Winkel zum Ziel relativ zur Fahrzeugausrichtung
  // heading: 0 = +Z, yaw um Y. dir=(sin h, cos h)
  const targetAng=Math.atan2(dx,dz);
  let diff=((targetAng-racer.heading+Math.PI*3)%(Math.PI*2))-Math.PI;
  const steer=clamp(diff*2.4,-1,1);
  // Zielspeed aus Kurve + Gummiband
  const curve=world.curvatureAt((racer.trackIdx+30)%world.N);
  let vTarget=racer.topSpeed*(curve>0.25?0.55:curve>0.15?0.72:curve>0.07?0.88:1.0);
  vTarget*= (0.82+racer.aiSkill*0.26);
  if(opts.rubber!=null){
    // opts.rubber>0: KI schneller (zurückliegend), <0 langsamer
    vTarget*=clamp(1+opts.rubber*0.12,0.82,1.18);
  }
  if(opts.copChase&&opts.chasePos){
    // Polizei: direkt auf Spieler zielen
    const cx=opts.chasePos.x-racer.pos.x, cz=opts.chasePos.z-racer.pos.z;
    const ca=Math.atan2(cx,cz);
    let cd=((ca-racer.heading+Math.PI*3)%(Math.PI*2))-Math.PI;
    return { throttle: racer.speed<racer.topSpeed*1.05?1:0.2, steer:clamp(cd*3,-1,1), handbrake:Math.abs(cd)>0.9&&Math.abs(racer.speed)>20, nitro:Math.abs(cd)<0.25&&racer.nitro>60 };
  }
  const throttle=racer.speed<vTarget?1:(racer.speed>vTarget+3?-0.6:0.15);
  const needHb=Math.abs(diff)>0.55&&Math.abs(racer.speed)>26;
  const nitro=Math.abs(diff)<0.18&&curve<0.06&&racer.nitro>50&&Math.abs(racer.speed)>20;
  return { throttle, steer, handbrake:needHb, nitro };
}
function frac(x){ return ((x%1)+1)%1; }
function trackLength(world){
  // grobe Länge in Metern aus Samples
  if(world._len) return world._len;
  let L=0;
  for(let i=0;i<world.N;i++){ L+=world.samples[i].pos.distanceTo(world.samples[(i+1)%world.N].pos); }
  world._len=L; return L;
}
