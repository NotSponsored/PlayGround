import * as THREE from 'three';
import { buildingTexture, neonSignTexture, roadTexture, groundTexture } from './utils.js';

export function trackPoints(theme){
  if(theme==='city'){
    return [[0,0,-160],[90,0,-150],[150,0,-100],[160,0,-20],[130,0,60],[140,0,140],[60,0,170],[-30,0,160],[-110,0,140],[-160,0,70],[-150,0,-30],[-110,0,-110]].map(p=>new THREE.Vector3(p[0],0,p[2]));
  }
  if(theme==='highway'){
    return [[0,0,-230],[140,0,-210],[250,0,-120],[270,0,20],[220,0,150],[230,0,260],[80,0,300],[-80,0,290],[-220,0,230],[-280,0,80],[-250,0,-90],[-130,0,-180]].map(p=>new THREE.Vector3(p[0],0,p[2]));
  }
  // canyon: eng, kurvig
  return [[0,0,-200],[70,0,-170],[40,0,-110],[-40,0,-90],[10,0,-20],[-60,0,30],[-20,0,110],[60,0,130],[30,0,200],[-60,0,190],[-110,0,110],[-90,0,10],[-130,0,-80],[-70,0,-160]].map(p=>new THREE.Vector3(p[0],0,p[2]));
}

export class World{
  constructor(scene, theme='city'){
    this.theme=theme;
    this.roadHalf = theme==='canyon'?6.5 : theme==='highway'?9 : 8;
    this.group=new THREE.Group(); scene.add(this.group);
    this.buildSky(scene);
    this.buildTrack();
    if(theme==='city') this.buildCity();
    else if(theme==='highway') this.buildHighway();
    else this.buildCanyon();
    this.buildLights();
  }

  buildSky(scene){
    scene.background=new THREE.Color(this.theme==='canyon'?0x0b1026:0x04060d);
    scene.fog=new THREE.Fog(0x04060d, 120, this.theme==='canyon'?700:900);
    // Sterne
    const n=900, pos=new Float32Array(n*3);
    for(let i=0;i<n;i++){
      const r=1400, th=Math.random()*Math.PI*2, ph=Math.random()*Math.PI*0.48;
      pos[i*3]=r*Math.sin(ph)*Math.cos(th); pos[i*3+1]=r*Math.cos(ph)+20; pos[i*3+2]=r*Math.sin(ph)*Math.sin(th);
    }
    const g=new THREE.BufferGeometry(); g.setAttribute('position',new THREE.BufferAttribute(pos,3));
    const m=new THREE.PointsMaterial({color:0xaacdff,size:2.2,sizeAttenuation:false,transparent:true,opacity:0.85});
    this.group.add(new THREE.Points(g,m));
    // Mond
    const moon=new THREE.Mesh(new THREE.SphereGeometry(30,16,16),new THREE.MeshBasicMaterial({color:0xdceeff}));
    moon.position.set(-500,420,-700); this.group.add(moon);
    // Boden
    const gc=this.theme==='canyon'? '#141020' : '#070b14';
    const gt=groundTexture(gc); gt.wrapS=gt.wrapT=THREE.RepeatWrapping; gt.repeat.set(40,40);
    const ground=new THREE.Mesh(new THREE.PlaneGeometry(4000,4000),new THREE.MeshStandardMaterial({map:gt,roughness:1}));
    ground.rotation.x=-Math.PI/2; ground.position.y=-0.15; ground.receiveShadow=true; this.group.add(ground);
  }

  buildTrack(){
    const pts=trackPoints(this.theme);
    this.curve=new THREE.CatmullRomCurve3(pts,true,'catmullrom',0.6);
    const N=1400;
    this.samples=[];
    for(let i=0;i<N;i++){
      const u=i/N;
      const p=this.curve.getPointAt(u);
      const t=this.curve.getTangentAt(u); t.y=0; t.normalize();
      const left=new THREE.Vector3(-t.z,0,t.x); // links
      // Steigung im Canyon leicht
      let y=0;
      if(this.theme==='canyon') y=Math.sin(u*Math.PI*4)*3.5;
      p.y=y;
      this.samples.push({pos:p,tan:t.clone(),left:left.clone(),u});
    }
    this.N=N;
    // Straßenband
    const hw=this.roadHalf;
    const verts=[],uvs=[],idx=[];
    for(let i=0;i<=N;i++){
      const s=this.samples[i%N];
      const L=s.pos.clone().addScaledVector(s.left,hw+1.6);
      const R=s.pos.clone().addScaledVector(s.left,-(hw+1.6));
      verts.push(L.x,s.pos.y+0.02,L.z, R.x,s.pos.y+0.02,R.z);
      uvs.push(0,i*0.35, 1,i*0.35);
      if(i<N){ const a=i*2; idx.push(a,a+1,a+2, a+1,a+3,a+2); }
    }
    // korrigiere x/z (oben schon gesetzt, aber sauber)
    const geo=new THREE.BufferGeometry();
    geo.setAttribute('position',new THREE.Float32BufferAttribute(verts,3));
    geo.setAttribute('uv',new THREE.Float32BufferAttribute(uvs,2));
    geo.setIndex(idx); geo.computeVertexNormals();
    const rt=roadTexture(); rt.wrapS=rt.wrapT=THREE.RepeatWrapping;
    const roadMat=new THREE.MeshStandardMaterial({map:rt,roughness:0.85,metalness:0.1,side:THREE.DoubleSide,color:0xbfc6d4});
    const road=new THREE.Mesh(geo,roadMat); road.receiveShadow=true; this.group.add(road);
    this.roadMesh=road;

    // Leitplanken (zwei Linien als Box-Streifen)
    for(const side of [1,-1]){
      const wverts=[],widx=[];
      for(let i=0;i<=N;i+=4){
        const s=this.samples[i%N];
        const p=s.pos.clone().addScaledVector(s.left,side*(hw+1.7));
        wverts.push(p.x,p.y+0.55,p.z);
        if(i>0){ const a=(i/4)*2; /* Linien */ }
      }
      // Pfosten + durchgehende Planke via InstancedMesh Boxen
      const postGeo=new THREE.BoxGeometry(0.25,1.1,0.25);
      const postMat=new THREE.MeshStandardMaterial({color:0x8a93a6,metalness:0.7,roughness:0.4});
      const count=Math.floor(N/6);
      const posts=new THREE.InstancedMesh(postGeo,postMat,count*2);
      const m4=new THREE.Matrix4(); let k=0;
      for(let i=0;i<N;i+=6){
        for(const sd of [1,-1]){
          const s=this.samples[i];
          const p=s.pos.clone().addScaledVector(s.left,sd*(hw+1.9));
          m4.makeTranslation(p.x,p.y+0.55,p.z);
          posts.setMatrixAt(k++,m4);
        }
      }
      posts.count=k; posts.instanceMatrix.needsUpdate=true; this.group.add(posts);
      // Neon-Planke: lange dünne Boxen alle 8 Samples
      const railMat=new THREE.MeshStandardMaterial({
        color:0x0a0f1c, emissive: side>0?0x00e5ff:0xff2d78, emissiveIntensity:this.theme==='canyon'?0.4:1.4,
        roughness:0.5 });
      const railGeo=new THREE.BoxGeometry(0.18,0.18,1);
      const rails=new THREE.InstancedMesh(railGeo,railMat,Math.floor(N/2));
      let r=0;
      for(let i=0;i<N;i+=2){
        const s=this.samples[i];
        const p=s.pos.clone().addScaledVector(s.left,side*(hw+1.9)); p.y+=1.05;
        const nxt=this.samples[(i+2)%N].pos.clone().addScaledVector(this.samples[(i+2)%N].left,side*(hw+1.9)); nxt.y=this.samples[(i+2)%N].pos.y+1.05;
        const mid=p.clone().add(nxt).multiplyScalar(0.5);
        const len=p.distanceTo(nxt)+0.15;
        const yaw=Math.atan2(nxt.x-p.x,nxt.z-p.z);
        m4.makeRotationY(yaw); m4.scale(new THREE.Vector3(1,1,len)); m4.setPosition(mid.x,mid.y,mid.z);
        rails.setMatrixAt(r++,m4);
      }
      rails.count=r; rails.instanceMatrix.needsUpdate=true; this.group.add(rails);
    }

    // Start-Gantry
    const s0=this.samples[0];
    const gantry=new THREE.Group();
    const pilMat=new THREE.MeshStandardMaterial({color:0x141c30,metalness:0.8,roughness:0.3});
    for(const sd of [1,-1]){
      const pil=new THREE.Mesh(new THREE.BoxGeometry(0.8,9,0.8),pilMat);
      const p=s0.pos.clone().addScaledVector(s0.left,sd*(hw+2.6));
      pil.position.set(p.x,p.y+4.5,p.z); gantry.add(pil);
    }
    const beam=new THREE.Mesh(new THREE.BoxGeometry((hw+2.6)*2,1.4,1.0),
      new THREE.MeshStandardMaterial({color:0x05070f,emissive:0x00e5ff,emissiveIntensity:1.2}));
    beam.position.set(s0.pos.x,s0.pos.y+8.4,s0.pos.z);
    beam.rotation.y=Math.atan2(s0.tan.x,s0.tan.z)+Math.PI/2;
    // orientiere korrekt: setze quaternion über lookAt
    gantry.add(beam);
    // Banner-Text
    const banner=new THREE.Mesh(new THREE.PlaneGeometry((hw+2.6)*2-1,1.1),
      new THREE.MeshBasicMaterial({map:neonSignTexture('NEON PURSUIT','#00e5ff')}));
    banner.position.copy(beam.position); banner.position.y-=0.1;
    banner.rotation.y=Math.atan2(s0.tan.x,s0.tan.z);
    gantry.add(banner);
    this.group.add(gantry);
    // Startlinie
    const lineGeo=new THREE.PlaneGeometry((hw)*2,2.4);
    const line=new THREE.Mesh(lineGeo,new THREE.MeshBasicMaterial({color:0xffffff}));
    line.rotation.x=-Math.PI/2; line.rotation.z=Math.atan2(s0.tan.x,s0.tan.z);
    line.position.copy(s0.pos); line.position.y+=0.02; this.group.add(line);
  }

  // Nächster Sample-Index (fensterförmige Suche für Performance)
  locate(pos, lastIdx=0, window=60){
    let best=lastIdx, bd=Infinity;
    for(let k=-window;k<window;k++){
      const i=((lastIdx+k)%this.N+this.N)%this.N;
      const s=this.samples[i];
      const dx=pos.x-s.pos.x, dz=pos.z-s.pos.z;
      const d=dx*dx+dz*dz;
      if(d<bd){ bd=d; best=i; }
    }
    const s=this.samples[best];
    const rx=pos.x-s.pos.x, rz=pos.z-s.pos.z;
    const lat=rx*s.left.x+rz*s.left.z;
    const fw=rx*s.tan.x+rz*s.tan.z;
    return { idx:best, lat, fw, dist:Math.sqrt(bd), sample:s };
  }
  pointAt(u, lat=0){
    u=((u%1)+1)%1;
    const f=u*this.N, i=Math.floor(f)%this.N, t=f-Math.floor(f);
    const a=this.samples[i], b=this.samples[(i+1)%this.N];
    const p=a.pos.clone().lerp(b.pos,t);
    const tan=a.tan.clone().lerp(b.tan,t).normalize();
    const left=new THREE.Vector3(-tan.z,0,tan.x);
    p.addScaledVector(left,lat);
    return {pos:p,tan,left};
  }
  curvatureAt(idx){
    const a=this.samples[(idx-8+this.N)%this.N].tan;
    const b=this.samples[(idx+8)%this.N].tan;
    const ang=Math.acos(THREE.MathUtils.clamp(a.dot(b),-1,1));
    return ang; // 0 gerade, >0.2 Kurve
  }

  buildLights(){
    this.group.add(new THREE.HemisphereLight(0x5a6d95,0x0a0e1a,1.15));
    this.group.add(new THREE.AmbientLight(0x33415e,0.7));
    const moon=new THREE.DirectionalLight(0x8fb4ff,0.55);
    moon.position.set(-300,400,-400); this.group.add(moon);
    // Straßenlaternen entlang der Strecke
    const poleGeo=new THREE.CylinderGeometry(0.12,0.12,7,6);
    const poleMat=new THREE.MeshStandardMaterial({color:0x1a2338,roughness:0.6});
    const headGeo=new THREE.SphereGeometry(0.3,8,8);
    const warm=[0xffd9a0,0x9fd8ff,0xff9fd0];
    const step=this.theme==='highway'?28:20;
    for(let i=0;i<this.N;i+=step){
      const s=this.samples[i];
      const side=(i/step)%2===0?1:-1;
      const p=s.pos.clone().addScaledVector(s.left,side*(this.roadHalf+3.2));
      const pole=new THREE.Mesh(poleGeo,poleMat); pole.position.set(p.x,p.y+3.5,p.z); this.group.add(pole);
      const col=warm[i%3];
      const bulb=new THREE.Mesh(headGeo,new THREE.MeshBasicMaterial({color:col}));
      bulb.position.set(p.x,p.y+7,p.z); this.group.add(bulb);
      if(i% (step*8)===0){
        const pl=new THREE.PointLight(col,60,42,1.9);
        pl.position.set(p.x,p.y+6.6,p.z); this.group.add(pl);
      }
    }
  }

  buildCity(){
    // Gebäude links/rechts mit Abstand, Neon-Schilder, Tunnel-ähnliche Überführung
    const texA=buildingTexture('#0b1226','#9fd8ff');
    const texB=buildingTexture('#140b22','#ffb3dd');
    for(let i=0;i<this.N;i+=14){
      const s=this.samples[i];
      for(const sd of [1,-1]){
        if(Math.random()<0.25) continue;
        const dist=this.roadHalf+16+Math.random()*40;
        const p=s.pos.clone().addScaledVector(s.left,sd*dist);
        const w=10+Math.random()*14, h=18+Math.random()*55, d=10+Math.random()*14;
        const tex=Math.random()<0.5?texA:texB;
        const m=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),
          new THREE.MeshStandardMaterial({map:tex,emissive:0xffffff,emissiveMap:tex,emissiveIntensity:0.9,roughness:0.9}));
        m.position.set(p.x,h/2-0.2,p.z);
        m.rotation.y=Math.atan2(s.tan.x,s.tan.z)+(Math.random()-0.5)*0.4;
        this.group.add(m);
        // Dach-Neon
        if(Math.random()<0.3){
          const nc=[0x00e5ff,0xff2d78,0xb6ff00,0x7c4dff][Math.floor(Math.random()*4)];
          const strip=new THREE.Mesh(new THREE.BoxGeometry(w+0.4,0.5,d+0.4),
            new THREE.MeshStandardMaterial({color:0x000000,emissive:nc,emissiveIntensity:2}));
          strip.position.set(p.x,h+0.1,p.z); strip.rotation.y=m.rotation.y; this.group.add(strip);
        }
      }
    }
    // Neon-Werbung nahe Strecke
    const words=['TURBO','NITRO','NEON','DRIFT','MIDNIGHT','OVERDRIVE','APEX','GARAGE'];
    for(let k=0;k<26;k++){
      const i=Math.floor(Math.random()*this.N);
      const s=this.samples[i];
      const sd=Math.random()<0.5?1:-1;
      const p=s.pos.clone().addScaledVector(s.left,sd*(this.roadHalf+6));
      const col=['#ff2d78','#00e5ff','#b6ff00','#7c4dff'][k%4];
      const sign=new THREE.Mesh(new THREE.PlaneGeometry(10,2.5),
        new THREE.MeshBasicMaterial({map:neonSignTexture(words[k%words.length],col),transparent:false,side:THREE.DoubleSide}));
      sign.position.set(p.x,p.y+5.5,p.z);
      sign.rotation.y=Math.atan2(s.tan.x,s.tan.z)+Math.PI/2;
      this.group.add(sign);
    }
  }

  buildHighway(){
    // offene Highway-Umgebung: wenige Gebäude, viele Lichter, Brückenpfeiler, Tribünen-ähnliche Wände
    for(let i=0;i<this.N;i+=30){
      const s=this.samples[i];
      for(const sd of [1,-1]){
        if(Math.random()<0.5) continue;
        const dist=this.roadHalf+26+Math.random()*60;
        const p=s.pos.clone().addScaledVector(s.left,sd*dist);
        const h=10+Math.random()*25;
        const m=new THREE.Mesh(new THREE.BoxGeometry(18,h,12),
          new THREE.MeshStandardMaterial({map:buildingTexture(),emissive:0xffffff,emissiveMap:buildingTexture(),emissiveIntensity:0.5,roughness:1}));
        m.position.set(p.x,h/2,p.z); this.group.add(m);
      }
    }
    // Überführung
    const i0=Math.floor(this.N*0.3), s=this.samples[i0];
    const bridge=new THREE.Mesh(new THREE.BoxGeometry((this.roadHalf+6)*2,1.2,10),
      new THREE.MeshStandardMaterial({color:0x1a2338,roughness:0.7}));
    bridge.position.set(s.pos.x,s.pos.y+7.5,s.pos.z);
    bridge.rotation.y=Math.atan2(s.tan.x,s.tan.z)+Math.PI/2;
    this.group.add(bridge);
  }

  buildCanyon(){
    // Felswände beidseitig + Kakteen/Felsen + enge Schlucht-Atmosphäre
    const rockMat=new THREE.MeshStandardMaterial({color:0x4a2c1e,roughness:1});
    const rockMat2=new THREE.MeshStandardMaterial({color:0x6b3a24,roughness:1});
    for(let i=0;i<this.N;i+=6){
      const s=this.samples[i];
      for(const sd of [1,-1]){
        const dist=this.roadHalf+14+Math.random()*10;
        const p=s.pos.clone().addScaledVector(s.left,sd*dist);
        const h=9+Math.random()*22;
        const rock=new THREE.Mesh(new THREE.ConeGeometry(5+Math.random()*5,h,5),Math.random()<0.5?rockMat:rockMat2);
        rock.position.set(p.x+(Math.random()-0.5)*6,h/2-1+p.y,p.z+(Math.random()-0.5)*6);
        rock.rotation.y=Math.random()*Math.PI;
        this.group.add(rock);
      }
    }
    // rote Nebel-Lichter / Fackeln
    for(let i=0;i<this.N;i+=40){
      const s=this.samples[i];
      const p=s.pos.clone().addScaledVector(s.left,this.roadHalf+2.6);
      const t=new THREE.Mesh(new THREE.SphereGeometry(0.25,8,8),new THREE.MeshBasicMaterial({color:0xff9a3c}));
      t.position.set(p.x,p.y+2.4,p.z); this.group.add(t);
      if(i%120===0){ const pl=new THREE.PointLight(0xff7a00,40,30,1.8); pl.position.copy(t.position); this.group.add(pl); }
    }
  }

  dispose(scene){ scene.remove(this.group); }
}
