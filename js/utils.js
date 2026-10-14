import * as THREE from 'three';

export function clamp(v,a,b){ return Math.max(a,Math.min(b,v)); }
export function lerp(a,b,t){ return a+(b-a)*t; }
export function dampAngle(a,b,t){
  let d=(b-a)%(Math.PI*2);
  if(d>Math.PI)d-=Math.PI*2; if(d<-Math.PI)d+=Math.PI*2;
  return a+d*t;
}
export function makeCanvas(w,h,fn){
  const c=document.createElement('canvas'); c.width=w; c.height=h;
  fn(c.getContext('2d'),w,h); const t=new THREE.CanvasTexture(c);
  t.colorSpace=THREE.SRGBColorSpace; return t;
}
// Fenster-Textur für Gebäude (emissive)
export function buildingTexture(base='#0b1226', lit='#9fd8ff'){
  return makeCanvas(128,256,(g,w,h)=>{
    g.fillStyle=base; g.fillRect(0,0,w,h);
    for(let y=8;y<h-8;y+=16) for(let x=8;x<w-8;x+=16){
      const on=Math.random()<0.55;
      g.fillStyle=on?(Math.random()<0.12?'#ffd37a':lit):'#131c33';
      g.fillRect(x,y,10,8);
    }
  });
}
export function neonSignTexture(text, color='#ff2d78'){
  return makeCanvas(512,128,(g,w,h)=>{
    g.fillStyle='#05070f'; g.fillRect(0,0,w,h);
    g.font='900 64px Arial'; g.textAlign='center'; g.textBaseline='middle';
    g.shadowColor=color; g.shadowBlur=28; g.fillStyle=color;
    g.fillText(text,w/2,h/2);
    g.shadowBlur=0; g.strokeStyle=color; g.lineWidth=4; g.strokeRect(4,4,w-8,h-8);
  });
}
export function roadTexture(){
  return makeCanvas(256,256,(g,w,h)=>{
    g.fillStyle='#181c24'; g.fillRect(0,0,w,h);
    // Asphalt-Noise
    for(let i=0;i<900;i++){ g.fillStyle=`rgba(255,255,255,${Math.random()*0.05})`; g.fillRect(Math.random()*w,Math.random()*h,2,2); }
    // Mittelinie
    g.fillStyle='#e8e8e8'; g.fillRect(w/2-4,0,8,60); g.fillRect(w/2-4,128,8,60);
    // Seitenlinien neon
    g.fillStyle='#00e5ff'; g.fillRect(6,0,5,h); g.fillRect(w-11,0,5,h);
  });
}
export function groundTexture(color='#070b14'){
  return makeCanvas(256,256,(g,w,h)=>{
    g.fillStyle=color; g.fillRect(0,0,w,h);
    for(let i=0;i<400;i++){ g.fillStyle=`rgba(255,255,255,${Math.random()*0.03})`; g.fillRect(Math.random()*w,Math.random()*h,2,2); }
  });
}
