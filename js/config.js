// Zentrale Konfiguration: Autos, Strecken, Tuning
export const CARS = [
  { id:'falcon', name:'FALCON S', desc:'Balanced Coupe', topspeed:58, accel:22, grip:7.2, nitro:100, color:0x00e5ff,
    stats:{ speed:0.65, accel:0.7, grip:0.7 } },
  { id:'ryusei', name:'RYUSEI GT', desc:'JDM Tuner • Drift', topspeed:55, accel:24, grip:6.2, nitro:115, color:0xff2d78,
    stats:{ speed:0.6, accel:0.8, grip:0.55 } },
  { id:'wraith', name:'WRAITH V8', desc:'Muscle • Top-Speed', topspeed:64, accel:19, grip:6.6, nitro:90, color:0xff7a00,
    stats:{ speed:0.85, accel:0.55, grip:0.6 } },
];

export const PAINTS = [0x00e5ff,0xff2d78,0xb6ff00,0xff7a00,0x7c4dff,0xffffff,0x111318,0xffd600,0x00ff9d,0xff1744];
export const NEONS = [0x00e5ff,0xff2d78,0xb6ff00,0x7c4dff,0xff7a00,0xffffff];

export const TRACKS = {
  city:    { name:'City Loop',      theme:'city',    lengthLabel:'2.1 km', laps:3 },
  highway: { name:'Highway Ring',   theme:'highway', lengthLabel:'3.4 km', laps:2 },
  canyon:  { name:'Red Rock Canyon',theme:'canyon',  lengthLabel:'2.8 km', laps:2 },
};

export const MODES = {
  sprint:  { name:'NEON SPRINT', cops:false, traffic:false, laps:3, ai:3, track:'city', desc:'Underground-Style Nachtrennen' },
  pursuit: { name:'POLIZEI-JAGD', cops:true, traffic:true, laps:99, ai:2, track:'highway', timeLimit:180, desc:'Most-Wanted-Style Verfolgung' },
  canyon:  { name:'CANYON-DUELL', cops:false, traffic:false, laps:2, ai:1, track:'canyon', desc:'Carbon-Style Duell' },
};

export function getBest(){ try{ return JSON.parse(localStorage.getItem('neonpursuit_best')||'{}'); }catch{ return {}; } }
export function setBest(key,val){
  try{
    const b=getBest(); if(!b[key]||val< b[key]){ b[key]=val; localStorage.setItem('neonpursuit_best',JSON.stringify(b)); return true; }
  }catch{}
  return false;
}
export function fmtTime(t){
  if(t==null||!isFinite(t)) return '—';
  const m=Math.floor(t/60), s=t-m*60;
  return `${m}:${s.toFixed(1).padStart(4,'0')}`;
}
