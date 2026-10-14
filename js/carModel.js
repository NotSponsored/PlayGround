import * as THREE from 'three';

// Prozedurales Arcade-Auto aus Boxen + Zylindern (keine externen Modelle)
export function buildCar({ paint=0x00e5ff, neon=0x00e5ff, vinyl='stripe', spoiler='sport', police=false }={}){
  const g=new THREE.Group();
  const paintMat=new THREE.MeshStandardMaterial({ color:police?0x0d1526:paint, metalness:0.35, roughness:0.35, emissive:police?0x000000:paint, emissiveIntensity:0.22 });
  const darkMat=new THREE.MeshStandardMaterial({ color:0x0a0d14, metalness:0.2, roughness:0.7 });
  const glassMat=new THREE.MeshStandardMaterial({ color:0x18283f, metalness:0.3, roughness:0.12, emissive:0x0a1626, emissiveIntensity:0.5 });
  const chromeMat=new THREE.MeshStandardMaterial({ color:0xcfd8e3, metalness:0.6, roughness:0.3, emissive:0x222a36, emissiveIntensity:0.35 });

  // Karosserie unten
  const bodyGeo=new THREE.BoxGeometry(2.0,0.55,4.4);
  // leicht keilförmig skalieren
  const pos=bodyGeo.attributes.position;
  for(let i=0;i<pos.count;i++){
    const z=pos.getZ(i);
    if(z>1.2){ pos.setX(i,pos.getX(i)*0.86); } // Front schmaler
  }
  bodyGeo.computeVertexNormals();
  const body=new THREE.Mesh(bodyGeo,paintMat);
  body.position.y=0.62; body.castShadow=true; g.add(body);

  // Kabine
  const cab=new THREE.Mesh(new THREE.BoxGeometry(1.55,0.5,2.0),glassMat);
  cab.position.set(0,1.12,-0.2); cab.castShadow=true; g.add(cab);
  // Dach
  const roof=new THREE.Mesh(new THREE.BoxGeometry(1.5,0.08,1.1),paintMat);
  roof.position.set(0,1.4,-0.2); g.add(roof);

  // Frontstoßstange / Splitter
  const split=new THREE.Mesh(new THREE.BoxGeometry(2.02,0.22,0.5),darkMat);
  split.position.set(0,0.34,2.05); g.add(split);

  // Scheinwerfer
  const hlGeo=new THREE.BoxGeometry(0.42,0.16,0.08);
  const hlMat=new THREE.MeshStandardMaterial({ color:0xffffff, emissive:0xcfefff, emissiveIntensity:2.6 });
  const hlL=new THREE.Mesh(hlGeo,hlMat); hlL.position.set(-0.62,0.72,2.2); g.add(hlL);
  const hlR=hlL.clone(); hlR.position.x=0.62; g.add(hlR);
  // Rücklichter (Neon-Rot)
  const tlMat=new THREE.MeshStandardMaterial({ color:0x330000, emissive:0xff1744, emissiveIntensity:2.2 });
  const tl=new THREE.Mesh(new THREE.BoxGeometry(1.7,0.14,0.08),tlMat);
  tl.position.set(0,0.78,-2.2); g.add(tl);

  // Vinyls
  if(vinyl==='stripe'&&!police){
    const sMat=new THREE.MeshStandardMaterial({ color:0xffffff, metalness:0.6, roughness:0.4 });
    const s1=new THREE.Mesh(new THREE.BoxGeometry(0.32,0.02,4.42),sMat); s1.position.set(-0.22,0.91,0); g.add(s1);
    const s2=s1.clone(); s2.position.x=0.22; g.add(s2);
  } else if(vinyl==='flame'){
    const fMat=new THREE.MeshStandardMaterial({ color:0xff7a00, emissive:0xff3d00, emissiveIntensity:0.7, metalness:0.5, roughness:0.4 });
    const f=new THREE.Mesh(new THREE.BoxGeometry(2.02,0.2,1.2),fMat); f.position.set(0,0.6,1.3); g.add(f);
  } else if(vinyl==='carbon'){
    const cMat=new THREE.MeshStandardMaterial({ color:0x111318, metalness:0.7, roughness:0.5 });
    const c=new THREE.Mesh(new THREE.BoxGeometry(2.03,0.35,2.2),cMat); c.position.set(0,0.6,-0.6); g.add(c);
  }
  if(police){
    const wMat=new THREE.MeshStandardMaterial({ color:0xffffff, roughness:0.5 });
    const door=new THREE.Mesh(new THREE.BoxGeometry(2.03,0.3,1.6),wMat); door.position.set(0,0.62,0.2); g.add(door);
    const txt=CopDecal(); txt.position.set(0,0.63,0.2); g.add(txt);
    // Lichtbalken
    const bar=new THREE.Mesh(new THREE.BoxGeometry(1.2,0.14,0.3),darkMat); bar.position.set(0,1.5,-0.2); g.add(bar);
    const rL=new THREE.Mesh(new THREE.BoxGeometry(0.5,0.16,0.32),new THREE.MeshStandardMaterial({color:0x220000,emissive:0xff0000,emissiveIntensity:3}));
    rL.position.set(-0.3,1.5,-0.2); g.add(rL);
    const bL=new THREE.Mesh(new THREE.BoxGeometry(0.5,0.16,0.32),new THREE.MeshStandardMaterial({color:0x000022,emissive:0x0044ff,emissiveIntensity:3}));
    bL.position.set(0.3,1.5,-0.2); g.add(bL);
    g.userData.copLights=[rL,bL];
  }

  // Spoiler
  if(spoiler!=='none'){
    const spMat=paintMat;
    const b1=new THREE.Mesh(new THREE.BoxGeometry(0.12,0.4,0.3),darkMat); b1.position.set(-0.7,1.0,-1.95); g.add(b1);
    const b2=b1.clone(); b2.position.x=0.7; g.add(b2);
    const w=spoiler==='gt'?2.2:1.8;
    const wing=new THREE.Mesh(new THREE.BoxGeometry(w,0.09,0.45),spMat); wing.position.set(0,1.24,-1.95); wing.castShadow=true; g.add(wing);
    if(spoiler==='gt'){
      const plate=new THREE.Mesh(new THREE.BoxGeometry(w,0.28,0.06),darkMat); plate.position.set(0,1.42,-2.1); g.add(plate);
    }
  }

  // Räder
  const wheels=[];
  const tireGeo=new THREE.CylinderGeometry(0.38,0.38,0.32,18); tireGeo.rotateZ(Math.PI/2);
  const rimGeo=new THREE.CylinderGeometry(0.2,0.2,0.34,8); rimGeo.rotateZ(Math.PI/2);
  const tireMat=new THREE.MeshStandardMaterial({ color:0x0a0a0a, roughness:0.9 });
  const rimMat=new THREE.MeshStandardMaterial({ color:0xb8c4d4, metalness:1, roughness:0.25 });
  const wpos=[[-0.95,0.38,1.45],[0.95,0.38,1.45],[-0.95,0.38,-1.45],[0.95,0.38,-1.45]];
  for(const [x,y,z] of wpos){
    const wg=new THREE.Group();
    const t=new THREE.Mesh(tireGeo,tireMat); t.castShadow=true; wg.add(t);
    const r=new THREE.Mesh(rimGeo,rimMat); wg.add(r);
    wg.position.set(x,y,z); g.add(wg); wheels.push(wg);
  }

  // Neon-Unterboden
  const neonMat=new THREE.MeshBasicMaterial({ color:neon, transparent:true, opacity:0.85 });
  const under=new THREE.Mesh(new THREE.PlaneGeometry(2.3,4.6),neonMat);
  under.rotation.x=-Math.PI/2; under.position.y=0.06; g.add(under);
  const glow=new THREE.PointLight(neon, 12, 9, 1.8); glow.position.set(0,0.4,0); g.add(glow);

  // Scheinwerfer-Lichtkegel
  const head=new THREE.SpotLight(0xbfe9ff, 60, 60, 0.5, 0.5, 1.2);
  head.position.set(0,1.0,2.0);
  const tgt=new THREE.Object3D(); tgt.position.set(0,0,20); g.add(tgt); head.target=tgt; g.add(head);

  // Nitro-Flamme
  const flameMat=new THREE.MeshBasicMaterial({ color:0x66d9ff, transparent:true, opacity:0 });
  const flame=new THREE.Mesh(new THREE.ConeGeometry(0.35,2.4,10),flameMat);
  flame.rotation.x=Math.PI/2; flame.position.set(0,0.55,-3.3); g.add(flame);
  const flameLight=new THREE.PointLight(0x33ccff,0,14,1.8); flameLight.position.set(0,0.7,-2.8); g.add(flameLight);

  g.userData={ wheels, neonMat, glow, flame, flameMat, flameLight, head, paintMat, neonColor:neon };
  return g;
}

function CopDecal(){
  const c=document.createElement('canvas'); c.width=256; c.height=64;
  const x=c.getContext('2d'); x.fillStyle='rgba(0,0,0,0)'; x.fillRect(0,0,256,64);
  x.font='900 36px Arial'; x.textAlign='center'; x.fillStyle='#0a1626'; x.fillText('POLICE',128,44);
  const t=new THREE.CanvasTexture(c);
  const m=new THREE.Mesh(new THREE.PlaneGeometry(1.6,0.4),new THREE.MeshBasicMaterial({map:t,transparent:true}));
  m.rotation.y=0; return m;
}

export function setNitroVisual(car, on, intensity=1){
  const u=car.userData;
  u.flameMat.opacity=on?0.55+0.4*Math.random()*intensity:0;
  u.flame.scale.set(1,0.7+Math.random()*0.8,1);
  u.flameLight.intensity=on?30*intensity:0;
}
export function setCopFlash(car, t){
  const l=car.userData.copLights; if(!l) return;
  const p=Math.sin(t*14)>0;
  l[0].material.emissiveIntensity=p?4:0.4;
  l[1].material.emissiveIntensity=p?0.4:4;
}
