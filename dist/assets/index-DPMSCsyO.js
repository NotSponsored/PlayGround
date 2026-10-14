(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function t(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(s){if(s.ep)return;s.ep=!0;const r=t(s);fetch(s.href,r)}})();/**
 * @license
 * Copyright 2010-2023 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const ra="160",xc=0,Da=1,vc=2,ul=1,fl=2,yn=3,Gn=0,Gt=1,fn=2,Bn=0,Ui=1,An=2,Ua=3,Ia=4,Mc=5,ii=100,Sc=101,yc=102,Na=103,Fa=104,Ec=200,Tc=201,bc=202,wc=203,$r=204,Kr=205,Ac=206,Rc=207,Cc=208,Lc=209,Pc=210,Dc=211,Uc=212,Ic=213,Nc=214,Fc=0,Oc=1,Bc=2,Ws=3,zc=4,Hc=5,Gc=6,kc=7,dl=0,Vc=1,Wc=2,zn=0,Xc=1,qc=2,Yc=3,$c=4,Kc=5,jc=6,pl=300,Fi=301,Oi=302,jr=303,Zr=304,er=306,Jr=1e3,rn=1001,Qr=1002,Ot=1003,Oa=1004,fr=1005,jt=1006,Zc=1007,es=1008,Hn=1009,Jc=1010,Qc=1011,aa=1012,ml=1013,In=1014,Nn=1015,ts=1016,gl=1017,_l=1018,ri=1020,eh=1021,an=1023,th=1024,nh=1025,ai=1026,Bi=1027,ih=1028,xl=1029,sh=1030,vl=1031,Ml=1033,dr=33776,pr=33777,mr=33778,gr=33779,Ba=35840,za=35841,Ha=35842,Ga=35843,Sl=36196,ka=37492,Va=37496,Wa=37808,Xa=37809,qa=37810,Ya=37811,$a=37812,Ka=37813,ja=37814,Za=37815,Ja=37816,Qa=37817,eo=37818,to=37819,no=37820,io=37821,_r=36492,so=36494,ro=36495,rh=36283,ao=36284,oo=36285,lo=36286,yl=3e3,oi=3001,ah=3200,oh=3201,El=0,lh=1,Zt="",At="srgb",Rn="srgb-linear",oa="display-p3",tr="display-p3-linear",Xs="linear",ot="srgb",qs="rec709",Ys="p3",pi=7680,co=519,ch=512,hh=513,uh=514,Tl=515,fh=516,dh=517,ph=518,mh=519,ho=35044,uo="300 es",ea=1035,Tn=2e3,$s=2001;class Gi{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;const i=this._listeners;return i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;const s=this._listeners[e];if(s!==void 0){const r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const i=this._listeners[e.type];if(i!==void 0){e.target=this;const s=i.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,e);e.target=null}}}const Lt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],xr=Math.PI/180,ta=180/Math.PI;function rs(){const n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Lt[n&255]+Lt[n>>8&255]+Lt[n>>16&255]+Lt[n>>24&255]+"-"+Lt[e&255]+Lt[e>>8&255]+"-"+Lt[e>>16&15|64]+Lt[e>>24&255]+"-"+Lt[t&63|128]+Lt[t>>8&255]+"-"+Lt[t>>16&255]+Lt[t>>24&255]+Lt[i&255]+Lt[i>>8&255]+Lt[i>>16&255]+Lt[i>>24&255]).toLowerCase()}function zt(n,e,t){return Math.max(e,Math.min(t,n))}function gh(n,e){return(n%e+e)%e}function vr(n,e,t){return(1-t)*n+t*e}function fo(n){return(n&n-1)===0&&n!==0}function na(n){return Math.pow(2,Math.floor(Math.log(n)/Math.LN2))}function qi(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function Bt(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("Invalid component type.")}}class Ye{constructor(e=0,t=0){Ye.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,i=this.y,s=e.elements;return this.x=s[0]*t+s[3]*i+s[6],this.y=s[1]*t+s[4]*i+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(zt(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const i=Math.cos(t),s=Math.sin(t),r=this.x-e.x,a=this.y-e.y;return this.x=r*i-a*s+e.x,this.y=r*s+a*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Ve{constructor(e,t,i,s,r,a,o,l,c){Ve.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,s,r,a,o,l,c)}set(e,t,i,s,r,a,o,l,c){const h=this.elements;return h[0]=e,h[1]=s,h[2]=o,h[3]=t,h[4]=r,h[5]=l,h[6]=i,h[7]=a,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,s=t.elements,r=this.elements,a=i[0],o=i[3],l=i[6],c=i[1],h=i[4],u=i[7],p=i[2],g=i[5],_=i[8],x=s[0],m=s[3],f=s[6],E=s[1],M=s[4],w=s[7],P=s[2],A=s[5],R=s[8];return r[0]=a*x+o*E+l*P,r[3]=a*m+o*M+l*A,r[6]=a*f+o*w+l*R,r[1]=c*x+h*E+u*P,r[4]=c*m+h*M+u*A,r[7]=c*f+h*w+u*R,r[2]=p*x+g*E+_*P,r[5]=p*m+g*M+_*A,r[8]=p*f+g*w+_*R,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8];return t*a*h-t*o*c-i*r*h+i*o*l+s*r*c-s*a*l}invert(){const e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8],u=h*a-o*c,p=o*l-h*r,g=c*r-a*l,_=t*u+i*p+s*g;if(_===0)return this.set(0,0,0,0,0,0,0,0,0);const x=1/_;return e[0]=u*x,e[1]=(s*c-h*i)*x,e[2]=(o*i-s*a)*x,e[3]=p*x,e[4]=(h*t-s*l)*x,e[5]=(s*r-o*t)*x,e[6]=g*x,e[7]=(i*l-c*t)*x,e[8]=(a*t-i*r)*x,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,s,r,a,o){const l=Math.cos(r),c=Math.sin(r);return this.set(i*l,i*c,-i*(l*a+c*o)+a+e,-s*c,s*l,-s*(-c*a+l*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(Mr.makeScale(e,t)),this}rotate(e){return this.premultiply(Mr.makeRotation(-e)),this}translate(e,t){return this.premultiply(Mr.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,i=e.elements;for(let s=0;s<9;s++)if(t[s]!==i[s])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const Mr=new Ve;function bl(n){for(let e=n.length-1;e>=0;--e)if(n[e]>=65535)return!0;return!1}function Ks(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function _h(){const n=Ks("canvas");return n.style.display="block",n}const po={};function Ji(n){n in po||(po[n]=!0,console.warn(n))}const mo=new Ve().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),go=new Ve().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),gs={[Rn]:{transfer:Xs,primaries:qs,toReference:n=>n,fromReference:n=>n},[At]:{transfer:ot,primaries:qs,toReference:n=>n.convertSRGBToLinear(),fromReference:n=>n.convertLinearToSRGB()},[tr]:{transfer:Xs,primaries:Ys,toReference:n=>n.applyMatrix3(go),fromReference:n=>n.applyMatrix3(mo)},[oa]:{transfer:ot,primaries:Ys,toReference:n=>n.convertSRGBToLinear().applyMatrix3(go),fromReference:n=>n.applyMatrix3(mo).convertLinearToSRGB()}},xh=new Set([Rn,tr]),Qe={enabled:!0,_workingColorSpace:Rn,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(n){if(!xh.has(n))throw new Error(`Unsupported working color space, "${n}".`);this._workingColorSpace=n},convert:function(n,e,t){if(this.enabled===!1||e===t||!e||!t)return n;const i=gs[e].toReference,s=gs[t].fromReference;return s(i(n))},fromWorkingColorSpace:function(n,e){return this.convert(n,this._workingColorSpace,e)},toWorkingColorSpace:function(n,e){return this.convert(n,e,this._workingColorSpace)},getPrimaries:function(n){return gs[n].primaries},getTransfer:function(n){return n===Zt?Xs:gs[n].transfer}};function Ii(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function Sr(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}let mi;class wl{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{mi===void 0&&(mi=Ks("canvas")),mi.width=e.width,mi.height=e.height;const i=mi.getContext("2d");e instanceof ImageData?i.putImageData(e,0,0):i.drawImage(e,0,0,e.width,e.height),t=mi}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=Ks("canvas");t.width=e.width,t.height=e.height;const i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const s=i.getImageData(0,0,e.width,e.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=Ii(r[a]/255)*255;return i.putImageData(s,0,0),t}else if(e.data){const t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(Ii(t[i]/255)*255):t[i]=Ii(t[i]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let vh=0;class Al{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:vh++}),this.uuid=rs(),this.data=e,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(yr(s[a].image)):r.push(yr(s[a]))}else r=yr(s);i.url=r}return t||(e.images[this.uuid]=i),i}}function yr(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?wl.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Mh=0;class qt extends Gi{constructor(e=qt.DEFAULT_IMAGE,t=qt.DEFAULT_MAPPING,i=rn,s=rn,r=jt,a=es,o=an,l=Hn,c=qt.DEFAULT_ANISOTROPY,h=Zt){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Mh++}),this.uuid=rs(),this.name="",this.source=new Al(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new Ye(0,0),this.repeat=new Ye(1,1),this.center=new Ye(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ve,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,typeof h=="string"?this.colorSpace=h:(Ji("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=h===oi?At:Zt),this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.needsPMREMUpdate=!1}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==pl)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Jr:e.x=e.x-Math.floor(e.x);break;case rn:e.x=e.x<0?0:1;break;case Qr:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Jr:e.y=e.y-Math.floor(e.y);break;case rn:e.y=e.y<0?0:1;break;case Qr:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}get encoding(){return Ji("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace===At?oi:yl}set encoding(e){Ji("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=e===oi?At:Zt}}qt.DEFAULT_IMAGE=null;qt.DEFAULT_MAPPING=pl;qt.DEFAULT_ANISOTROPY=1;class ct{constructor(e=0,t=0,i=0,s=1){ct.prototype.isVector4=!0,this.x=e,this.y=t,this.z=i,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,s){return this.x=e,this.y=t,this.z=i,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,i=this.y,s=this.z,r=this.w,a=e.elements;return this.x=a[0]*t+a[4]*i+a[8]*s+a[12]*r,this.y=a[1]*t+a[5]*i+a[9]*s+a[13]*r,this.z=a[2]*t+a[6]*i+a[10]*s+a[14]*r,this.w=a[3]*t+a[7]*i+a[11]*s+a[15]*r,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,s,r;const l=e.elements,c=l[0],h=l[4],u=l[8],p=l[1],g=l[5],_=l[9],x=l[2],m=l[6],f=l[10];if(Math.abs(h-p)<.01&&Math.abs(u-x)<.01&&Math.abs(_-m)<.01){if(Math.abs(h+p)<.1&&Math.abs(u+x)<.1&&Math.abs(_+m)<.1&&Math.abs(c+g+f-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const M=(c+1)/2,w=(g+1)/2,P=(f+1)/2,A=(h+p)/4,R=(u+x)/4,H=(_+m)/4;return M>w&&M>P?M<.01?(i=0,s=.707106781,r=.707106781):(i=Math.sqrt(M),s=A/i,r=R/i):w>P?w<.01?(i=.707106781,s=0,r=.707106781):(s=Math.sqrt(w),i=A/s,r=H/s):P<.01?(i=.707106781,s=.707106781,r=0):(r=Math.sqrt(P),i=R/r,s=H/r),this.set(i,s,r,t),this}let E=Math.sqrt((m-_)*(m-_)+(u-x)*(u-x)+(p-h)*(p-h));return Math.abs(E)<.001&&(E=1),this.x=(m-_)/E,this.y=(u-x)/E,this.z=(p-h)/E,this.w=Math.acos((c+g+f-1)/2),this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Sh extends Gi{constructor(e=1,t=1,i={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new ct(0,0,e,t),this.scissorTest=!1,this.viewport=new ct(0,0,e,t);const s={width:e,height:t,depth:1};i.encoding!==void 0&&(Ji("THREE.WebGLRenderTarget: option.encoding has been replaced by option.colorSpace."),i.colorSpace=i.encoding===oi?At:Zt),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:jt,depthBuffer:!0,stencilBuffer:!1,depthTexture:null,samples:0},i),this.texture=new qt(s,i.mapping,i.wrapS,i.wrapT,i.magFilter,i.minFilter,i.format,i.type,i.anisotropy,i.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.flipY=!1,this.texture.generateMipmaps=i.generateMipmaps,this.texture.internalFormat=i.internalFormat,this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.depthTexture=i.depthTexture,this.samples=i.samples}setSize(e,t,i=1){(this.width!==e||this.height!==t||this.depth!==i)&&(this.width=e,this.height=t,this.depth=i,this.texture.image.width=e,this.texture.image.height=t,this.texture.image.depth=i,this.dispose()),this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.texture=e.texture.clone(),this.texture.isRenderTargetTexture=!0;const t=Object.assign({},e.texture.image);return this.texture.source=new Al(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class li extends Sh{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}}class Rl extends qt{constructor(e=null,t=1,i=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:s},this.magFilter=Ot,this.minFilter=Ot,this.wrapR=rn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class yh extends qt{constructor(e=null,t=1,i=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:s},this.magFilter=Ot,this.minFilter=Ot,this.wrapR=rn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class as{constructor(e=0,t=0,i=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=s}static slerpFlat(e,t,i,s,r,a,o){let l=i[s+0],c=i[s+1],h=i[s+2],u=i[s+3];const p=r[a+0],g=r[a+1],_=r[a+2],x=r[a+3];if(o===0){e[t+0]=l,e[t+1]=c,e[t+2]=h,e[t+3]=u;return}if(o===1){e[t+0]=p,e[t+1]=g,e[t+2]=_,e[t+3]=x;return}if(u!==x||l!==p||c!==g||h!==_){let m=1-o;const f=l*p+c*g+h*_+u*x,E=f>=0?1:-1,M=1-f*f;if(M>Number.EPSILON){const P=Math.sqrt(M),A=Math.atan2(P,f*E);m=Math.sin(m*A)/P,o=Math.sin(o*A)/P}const w=o*E;if(l=l*m+p*w,c=c*m+g*w,h=h*m+_*w,u=u*m+x*w,m===1-o){const P=1/Math.sqrt(l*l+c*c+h*h+u*u);l*=P,c*=P,h*=P,u*=P}}e[t]=l,e[t+1]=c,e[t+2]=h,e[t+3]=u}static multiplyQuaternionsFlat(e,t,i,s,r,a){const o=i[s],l=i[s+1],c=i[s+2],h=i[s+3],u=r[a],p=r[a+1],g=r[a+2],_=r[a+3];return e[t]=o*_+h*u+l*g-c*p,e[t+1]=l*_+h*p+c*u-o*g,e[t+2]=c*_+h*g+o*p-l*u,e[t+3]=h*_-o*u-l*p-c*g,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,s){return this._x=e,this._y=t,this._z=i,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const i=e._x,s=e._y,r=e._z,a=e._order,o=Math.cos,l=Math.sin,c=o(i/2),h=o(s/2),u=o(r/2),p=l(i/2),g=l(s/2),_=l(r/2);switch(a){case"XYZ":this._x=p*h*u+c*g*_,this._y=c*g*u-p*h*_,this._z=c*h*_+p*g*u,this._w=c*h*u-p*g*_;break;case"YXZ":this._x=p*h*u+c*g*_,this._y=c*g*u-p*h*_,this._z=c*h*_-p*g*u,this._w=c*h*u+p*g*_;break;case"ZXY":this._x=p*h*u-c*g*_,this._y=c*g*u+p*h*_,this._z=c*h*_+p*g*u,this._w=c*h*u-p*g*_;break;case"ZYX":this._x=p*h*u-c*g*_,this._y=c*g*u+p*h*_,this._z=c*h*_-p*g*u,this._w=c*h*u+p*g*_;break;case"YZX":this._x=p*h*u+c*g*_,this._y=c*g*u+p*h*_,this._z=c*h*_-p*g*u,this._w=c*h*u-p*g*_;break;case"XZY":this._x=p*h*u-c*g*_,this._y=c*g*u-p*h*_,this._z=c*h*_+p*g*u,this._w=c*h*u+p*g*_;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const i=t/2,s=Math.sin(i);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,i=t[0],s=t[4],r=t[8],a=t[1],o=t[5],l=t[9],c=t[2],h=t[6],u=t[10],p=i+o+u;if(p>0){const g=.5/Math.sqrt(p+1);this._w=.25/g,this._x=(h-l)*g,this._y=(r-c)*g,this._z=(a-s)*g}else if(i>o&&i>u){const g=2*Math.sqrt(1+i-o-u);this._w=(h-l)/g,this._x=.25*g,this._y=(s+a)/g,this._z=(r+c)/g}else if(o>u){const g=2*Math.sqrt(1+o-i-u);this._w=(r-c)/g,this._x=(s+a)/g,this._y=.25*g,this._z=(l+h)/g}else{const g=2*Math.sqrt(1+u-i-o);this._w=(a-s)/g,this._x=(r+c)/g,this._y=(l+h)/g,this._z=.25*g}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<Number.EPSILON?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(zt(this.dot(e),-1,1)))}rotateTowards(e,t){const i=this.angleTo(e);if(i===0)return this;const s=Math.min(1,t/i);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const i=e._x,s=e._y,r=e._z,a=e._w,o=t._x,l=t._y,c=t._z,h=t._w;return this._x=i*h+a*o+s*c-r*l,this._y=s*h+a*l+r*o-i*c,this._z=r*h+a*c+i*l-s*o,this._w=a*h-i*o-s*l-r*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const i=this._x,s=this._y,r=this._z,a=this._w;let o=a*e._w+i*e._x+s*e._y+r*e._z;if(o<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,o=-o):this.copy(e),o>=1)return this._w=a,this._x=i,this._y=s,this._z=r,this;const l=1-o*o;if(l<=Number.EPSILON){const g=1-t;return this._w=g*a+t*this._w,this._x=g*i+t*this._x,this._y=g*s+t*this._y,this._z=g*r+t*this._z,this.normalize(),this}const c=Math.sqrt(l),h=Math.atan2(c,o),u=Math.sin((1-t)*h)/c,p=Math.sin(t*h)/c;return this._w=a*u+this._w*p,this._x=i*u+this._x*p,this._y=s*u+this._y*p,this._z=r*u+this._z*p,this._onChangeCallback(),this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){const e=Math.random(),t=Math.sqrt(1-e),i=Math.sqrt(e),s=2*Math.PI*Math.random(),r=2*Math.PI*Math.random();return this.set(t*Math.cos(s),i*Math.sin(r),i*Math.cos(r),t*Math.sin(s))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class C{constructor(e=0,t=0,i=0){C.prototype.isVector3=!0,this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(_o.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(_o.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,i=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*i+r[6]*s,this.y=r[1]*t+r[4]*i+r[7]*s,this.z=r[2]*t+r[5]*i+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,i=this.y,s=this.z,r=e.elements,a=1/(r[3]*t+r[7]*i+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*i+r[8]*s+r[12])*a,this.y=(r[1]*t+r[5]*i+r[9]*s+r[13])*a,this.z=(r[2]*t+r[6]*i+r[10]*s+r[14])*a,this}applyQuaternion(e){const t=this.x,i=this.y,s=this.z,r=e.x,a=e.y,o=e.z,l=e.w,c=2*(a*s-o*i),h=2*(o*t-r*s),u=2*(r*i-a*t);return this.x=t+l*c+a*u-o*h,this.y=i+l*h+o*c-r*u,this.z=s+l*u+r*h-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,i=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*i+r[8]*s,this.y=r[1]*t+r[5]*i+r[9]*s,this.z=r[2]*t+r[6]*i+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const i=e.x,s=e.y,r=e.z,a=t.x,o=t.y,l=t.z;return this.x=s*l-r*o,this.y=r*a-i*l,this.z=i*o-s*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return Er.copy(this).projectOnVector(e),this.sub(Er)}reflect(e){return this.sub(Er.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(zt(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y,s=this.z-e.z;return t*t+i*i+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){const s=Math.sin(t)*e;return this.x=s*Math.sin(i),this.y=Math.cos(t)*e,this.z=s*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=(Math.random()-.5)*2,t=Math.random()*Math.PI*2,i=Math.sqrt(1-e**2);return this.x=i*Math.cos(t),this.y=i*Math.sin(t),this.z=e,this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Er=new C,_o=new as;class os{constructor(e=new C(1/0,1/0,1/0),t=new C(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(en.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(en.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const i=en.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const r=i.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,en):en.fromBufferAttribute(r,a),en.applyMatrix4(e.matrixWorld),this.expandByPoint(en);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),_s.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),_s.copy(i.boundingBox)),_s.applyMatrix4(e.matrixWorld),this.union(_s)}const s=e.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return!(e.x<this.min.x||e.x>this.max.x||e.y<this.min.y||e.y>this.max.y||e.z<this.min.z||e.z>this.max.z)}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return!(e.max.x<this.min.x||e.min.x>this.max.x||e.max.y<this.min.y||e.min.y>this.max.y||e.max.z<this.min.z||e.min.z>this.max.z)}intersectsSphere(e){return this.clampPoint(e.center,en),en.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Yi),xs.subVectors(this.max,Yi),gi.subVectors(e.a,Yi),_i.subVectors(e.b,Yi),xi.subVectors(e.c,Yi),Cn.subVectors(_i,gi),Ln.subVectors(xi,_i),Zn.subVectors(gi,xi);let t=[0,-Cn.z,Cn.y,0,-Ln.z,Ln.y,0,-Zn.z,Zn.y,Cn.z,0,-Cn.x,Ln.z,0,-Ln.x,Zn.z,0,-Zn.x,-Cn.y,Cn.x,0,-Ln.y,Ln.x,0,-Zn.y,Zn.x,0];return!Tr(t,gi,_i,xi,xs)||(t=[1,0,0,0,1,0,0,0,1],!Tr(t,gi,_i,xi,xs))?!1:(vs.crossVectors(Cn,Ln),t=[vs.x,vs.y,vs.z],Tr(t,gi,_i,xi,xs))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,en).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(en).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(_n[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),_n[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),_n[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),_n[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),_n[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),_n[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),_n[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),_n[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(_n),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const _n=[new C,new C,new C,new C,new C,new C,new C,new C],en=new C,_s=new os,gi=new C,_i=new C,xi=new C,Cn=new C,Ln=new C,Zn=new C,Yi=new C,xs=new C,vs=new C,Jn=new C;function Tr(n,e,t,i,s){for(let r=0,a=n.length-3;r<=a;r+=3){Jn.fromArray(n,r);const o=s.x*Math.abs(Jn.x)+s.y*Math.abs(Jn.y)+s.z*Math.abs(Jn.z),l=e.dot(Jn),c=t.dot(Jn),h=i.dot(Jn);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>o)return!1}return!0}const Eh=new os,$i=new C,br=new C;class ls{constructor(e=new C,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const i=this.center;t!==void 0?i.copy(t):Eh.setFromPoints(e).getCenter(i);let s=0;for(let r=0,a=e.length;r<a;r++)s=Math.max(s,i.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;$i.subVectors(e,this.center);const t=$i.lengthSq();if(t>this.radius*this.radius){const i=Math.sqrt(t),s=(i-this.radius)*.5;this.center.addScaledVector($i,s/i),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(br.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint($i.copy(e.center).add(br)),this.expandByPoint($i.copy(e.center).sub(br))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const xn=new C,wr=new C,Ms=new C,Pn=new C,Ar=new C,Ss=new C,Rr=new C;class la{constructor(e=new C,t=new C(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,xn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=xn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(xn.copy(this.origin).addScaledVector(this.direction,t),xn.distanceToSquared(e))}distanceSqToSegment(e,t,i,s){wr.copy(e).add(t).multiplyScalar(.5),Ms.copy(t).sub(e).normalize(),Pn.copy(this.origin).sub(wr);const r=e.distanceTo(t)*.5,a=-this.direction.dot(Ms),o=Pn.dot(this.direction),l=-Pn.dot(Ms),c=Pn.lengthSq(),h=Math.abs(1-a*a);let u,p,g,_;if(h>0)if(u=a*l-o,p=a*o-l,_=r*h,u>=0)if(p>=-_)if(p<=_){const x=1/h;u*=x,p*=x,g=u*(u+a*p+2*o)+p*(a*u+p+2*l)+c}else p=r,u=Math.max(0,-(a*p+o)),g=-u*u+p*(p+2*l)+c;else p=-r,u=Math.max(0,-(a*p+o)),g=-u*u+p*(p+2*l)+c;else p<=-_?(u=Math.max(0,-(-a*r+o)),p=u>0?-r:Math.min(Math.max(-r,-l),r),g=-u*u+p*(p+2*l)+c):p<=_?(u=0,p=Math.min(Math.max(-r,-l),r),g=p*(p+2*l)+c):(u=Math.max(0,-(a*r+o)),p=u>0?r:Math.min(Math.max(-r,-l),r),g=-u*u+p*(p+2*l)+c);else p=a>0?-r:r,u=Math.max(0,-(a*p+o)),g=-u*u+p*(p+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,u),s&&s.copy(wr).addScaledVector(Ms,p),g}intersectSphere(e,t){xn.subVectors(e.center,this.origin);const i=xn.dot(this.direction),s=xn.dot(xn)-i*i,r=e.radius*e.radius;if(s>r)return null;const a=Math.sqrt(r-s),o=i-a,l=i+a;return l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){const i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,s,r,a,o,l;const c=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,p=this.origin;return c>=0?(i=(e.min.x-p.x)*c,s=(e.max.x-p.x)*c):(i=(e.max.x-p.x)*c,s=(e.min.x-p.x)*c),h>=0?(r=(e.min.y-p.y)*h,a=(e.max.y-p.y)*h):(r=(e.max.y-p.y)*h,a=(e.min.y-p.y)*h),i>a||r>s||((r>i||isNaN(i))&&(i=r),(a<s||isNaN(s))&&(s=a),u>=0?(o=(e.min.z-p.z)*u,l=(e.max.z-p.z)*u):(o=(e.max.z-p.z)*u,l=(e.min.z-p.z)*u),i>l||o>s)||((o>i||i!==i)&&(i=o),(l<s||s!==s)&&(s=l),s<0)?null:this.at(i>=0?i:s,t)}intersectsBox(e){return this.intersectBox(e,xn)!==null}intersectTriangle(e,t,i,s,r){Ar.subVectors(t,e),Ss.subVectors(i,e),Rr.crossVectors(Ar,Ss);let a=this.direction.dot(Rr),o;if(a>0){if(s)return null;o=1}else if(a<0)o=-1,a=-a;else return null;Pn.subVectors(this.origin,e);const l=o*this.direction.dot(Ss.crossVectors(Pn,Ss));if(l<0)return null;const c=o*this.direction.dot(Ar.cross(Pn));if(c<0||l+c>a)return null;const h=-o*Pn.dot(Rr);return h<0?null:this.at(h/a,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class mt{constructor(e,t,i,s,r,a,o,l,c,h,u,p,g,_,x,m){mt.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,s,r,a,o,l,c,h,u,p,g,_,x,m)}set(e,t,i,s,r,a,o,l,c,h,u,p,g,_,x,m){const f=this.elements;return f[0]=e,f[4]=t,f[8]=i,f[12]=s,f[1]=r,f[5]=a,f[9]=o,f[13]=l,f[2]=c,f[6]=h,f[10]=u,f[14]=p,f[3]=g,f[7]=_,f[11]=x,f[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new mt().fromArray(this.elements)}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){const t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,i=e.elements,s=1/vi.setFromMatrixColumn(e,0).length(),r=1/vi.setFromMatrixColumn(e,1).length(),a=1/vi.setFromMatrixColumn(e,2).length();return t[0]=i[0]*s,t[1]=i[1]*s,t[2]=i[2]*s,t[3]=0,t[4]=i[4]*r,t[5]=i[5]*r,t[6]=i[6]*r,t[7]=0,t[8]=i[8]*a,t[9]=i[9]*a,t[10]=i[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,i=e.x,s=e.y,r=e.z,a=Math.cos(i),o=Math.sin(i),l=Math.cos(s),c=Math.sin(s),h=Math.cos(r),u=Math.sin(r);if(e.order==="XYZ"){const p=a*h,g=a*u,_=o*h,x=o*u;t[0]=l*h,t[4]=-l*u,t[8]=c,t[1]=g+_*c,t[5]=p-x*c,t[9]=-o*l,t[2]=x-p*c,t[6]=_+g*c,t[10]=a*l}else if(e.order==="YXZ"){const p=l*h,g=l*u,_=c*h,x=c*u;t[0]=p+x*o,t[4]=_*o-g,t[8]=a*c,t[1]=a*u,t[5]=a*h,t[9]=-o,t[2]=g*o-_,t[6]=x+p*o,t[10]=a*l}else if(e.order==="ZXY"){const p=l*h,g=l*u,_=c*h,x=c*u;t[0]=p-x*o,t[4]=-a*u,t[8]=_+g*o,t[1]=g+_*o,t[5]=a*h,t[9]=x-p*o,t[2]=-a*c,t[6]=o,t[10]=a*l}else if(e.order==="ZYX"){const p=a*h,g=a*u,_=o*h,x=o*u;t[0]=l*h,t[4]=_*c-g,t[8]=p*c+x,t[1]=l*u,t[5]=x*c+p,t[9]=g*c-_,t[2]=-c,t[6]=o*l,t[10]=a*l}else if(e.order==="YZX"){const p=a*l,g=a*c,_=o*l,x=o*c;t[0]=l*h,t[4]=x-p*u,t[8]=_*u+g,t[1]=u,t[5]=a*h,t[9]=-o*h,t[2]=-c*h,t[6]=g*u+_,t[10]=p-x*u}else if(e.order==="XZY"){const p=a*l,g=a*c,_=o*l,x=o*c;t[0]=l*h,t[4]=-u,t[8]=c*h,t[1]=p*u+x,t[5]=a*h,t[9]=g*u-_,t[2]=_*u-g,t[6]=o*h,t[10]=x*u+p}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Th,e,bh)}lookAt(e,t,i){const s=this.elements;return Vt.subVectors(e,t),Vt.lengthSq()===0&&(Vt.z=1),Vt.normalize(),Dn.crossVectors(i,Vt),Dn.lengthSq()===0&&(Math.abs(i.z)===1?Vt.x+=1e-4:Vt.z+=1e-4,Vt.normalize(),Dn.crossVectors(i,Vt)),Dn.normalize(),ys.crossVectors(Vt,Dn),s[0]=Dn.x,s[4]=ys.x,s[8]=Vt.x,s[1]=Dn.y,s[5]=ys.y,s[9]=Vt.y,s[2]=Dn.z,s[6]=ys.z,s[10]=Vt.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,s=t.elements,r=this.elements,a=i[0],o=i[4],l=i[8],c=i[12],h=i[1],u=i[5],p=i[9],g=i[13],_=i[2],x=i[6],m=i[10],f=i[14],E=i[3],M=i[7],w=i[11],P=i[15],A=s[0],R=s[4],H=s[8],S=s[12],b=s[1],G=s[5],k=s[9],ee=s[13],D=s[2],B=s[6],W=s[10],Y=s[14],X=s[3],q=s[7],$=s[11],te=s[15];return r[0]=a*A+o*b+l*D+c*X,r[4]=a*R+o*G+l*B+c*q,r[8]=a*H+o*k+l*W+c*$,r[12]=a*S+o*ee+l*Y+c*te,r[1]=h*A+u*b+p*D+g*X,r[5]=h*R+u*G+p*B+g*q,r[9]=h*H+u*k+p*W+g*$,r[13]=h*S+u*ee+p*Y+g*te,r[2]=_*A+x*b+m*D+f*X,r[6]=_*R+x*G+m*B+f*q,r[10]=_*H+x*k+m*W+f*$,r[14]=_*S+x*ee+m*Y+f*te,r[3]=E*A+M*b+w*D+P*X,r[7]=E*R+M*G+w*B+P*q,r[11]=E*H+M*k+w*W+P*$,r[15]=E*S+M*ee+w*Y+P*te,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[4],s=e[8],r=e[12],a=e[1],o=e[5],l=e[9],c=e[13],h=e[2],u=e[6],p=e[10],g=e[14],_=e[3],x=e[7],m=e[11],f=e[15];return _*(+r*l*u-s*c*u-r*o*p+i*c*p+s*o*g-i*l*g)+x*(+t*l*g-t*c*p+r*a*p-s*a*g+s*c*h-r*l*h)+m*(+t*c*u-t*o*g-r*a*u+i*a*g+r*o*h-i*c*h)+f*(-s*o*h-t*l*u+t*o*p+s*a*u-i*a*p+i*l*h)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){const s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=i),this}invert(){const e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8],u=e[9],p=e[10],g=e[11],_=e[12],x=e[13],m=e[14],f=e[15],E=u*m*c-x*p*c+x*l*g-o*m*g-u*l*f+o*p*f,M=_*p*c-h*m*c-_*l*g+a*m*g+h*l*f-a*p*f,w=h*x*c-_*u*c+_*o*g-a*x*g-h*o*f+a*u*f,P=_*u*l-h*x*l-_*o*p+a*x*p+h*o*m-a*u*m,A=t*E+i*M+s*w+r*P;if(A===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const R=1/A;return e[0]=E*R,e[1]=(x*p*r-u*m*r-x*s*g+i*m*g+u*s*f-i*p*f)*R,e[2]=(o*m*r-x*l*r+x*s*c-i*m*c-o*s*f+i*l*f)*R,e[3]=(u*l*r-o*p*r-u*s*c+i*p*c+o*s*g-i*l*g)*R,e[4]=M*R,e[5]=(h*m*r-_*p*r+_*s*g-t*m*g-h*s*f+t*p*f)*R,e[6]=(_*l*r-a*m*r-_*s*c+t*m*c+a*s*f-t*l*f)*R,e[7]=(a*p*r-h*l*r+h*s*c-t*p*c-a*s*g+t*l*g)*R,e[8]=w*R,e[9]=(_*u*r-h*x*r-_*i*g+t*x*g+h*i*f-t*u*f)*R,e[10]=(a*x*r-_*o*r+_*i*c-t*x*c-a*i*f+t*o*f)*R,e[11]=(h*o*r-a*u*r-h*i*c+t*u*c+a*i*g-t*o*g)*R,e[12]=P*R,e[13]=(h*x*s-_*u*s+_*i*p-t*x*p-h*i*m+t*u*m)*R,e[14]=(_*o*s-a*x*s-_*i*l+t*x*l+a*i*m-t*o*m)*R,e[15]=(a*u*s-h*o*s+h*i*l-t*u*l-a*i*p+t*o*p)*R,this}scale(e){const t=this.elements,i=e.x,s=e.y,r=e.z;return t[0]*=i,t[4]*=s,t[8]*=r,t[1]*=i,t[5]*=s,t[9]*=r,t[2]*=i,t[6]*=s,t[10]*=r,t[3]*=i,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,s))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const i=Math.cos(t),s=Math.sin(t),r=1-i,a=e.x,o=e.y,l=e.z,c=r*a,h=r*o;return this.set(c*a+i,c*o-s*l,c*l+s*o,0,c*o+s*l,h*o+i,h*l-s*a,0,c*l-s*o,h*l+s*a,r*l*l+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,s,r,a){return this.set(1,i,r,0,e,1,a,0,t,s,1,0,0,0,0,1),this}compose(e,t,i){const s=this.elements,r=t._x,a=t._y,o=t._z,l=t._w,c=r+r,h=a+a,u=o+o,p=r*c,g=r*h,_=r*u,x=a*h,m=a*u,f=o*u,E=l*c,M=l*h,w=l*u,P=i.x,A=i.y,R=i.z;return s[0]=(1-(x+f))*P,s[1]=(g+w)*P,s[2]=(_-M)*P,s[3]=0,s[4]=(g-w)*A,s[5]=(1-(p+f))*A,s[6]=(m+E)*A,s[7]=0,s[8]=(_+M)*R,s[9]=(m-E)*R,s[10]=(1-(p+x))*R,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,i){const s=this.elements;let r=vi.set(s[0],s[1],s[2]).length();const a=vi.set(s[4],s[5],s[6]).length(),o=vi.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),e.x=s[12],e.y=s[13],e.z=s[14],tn.copy(this);const c=1/r,h=1/a,u=1/o;return tn.elements[0]*=c,tn.elements[1]*=c,tn.elements[2]*=c,tn.elements[4]*=h,tn.elements[5]*=h,tn.elements[6]*=h,tn.elements[8]*=u,tn.elements[9]*=u,tn.elements[10]*=u,t.setFromRotationMatrix(tn),i.x=r,i.y=a,i.z=o,this}makePerspective(e,t,i,s,r,a,o=Tn){const l=this.elements,c=2*r/(t-e),h=2*r/(i-s),u=(t+e)/(t-e),p=(i+s)/(i-s);let g,_;if(o===Tn)g=-(a+r)/(a-r),_=-2*a*r/(a-r);else if(o===$s)g=-a/(a-r),_=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=c,l[4]=0,l[8]=u,l[12]=0,l[1]=0,l[5]=h,l[9]=p,l[13]=0,l[2]=0,l[6]=0,l[10]=g,l[14]=_,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,i,s,r,a,o=Tn){const l=this.elements,c=1/(t-e),h=1/(i-s),u=1/(a-r),p=(t+e)*c,g=(i+s)*h;let _,x;if(o===Tn)_=(a+r)*u,x=-2*u;else if(o===$s)_=r*u,x=-1*u;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-p,l[1]=0,l[5]=2*h,l[9]=0,l[13]=-g,l[2]=0,l[6]=0,l[10]=x,l[14]=-_,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const t=this.elements,i=e.elements;for(let s=0;s<16;s++)if(t[s]!==i[s])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}}const vi=new C,tn=new mt,Th=new C(0,0,0),bh=new C(1,1,1),Dn=new C,ys=new C,Vt=new C,xo=new mt,vo=new as;class nr{constructor(e=0,t=0,i=0,s=nr.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,s=this._order){return this._x=e,this._y=t,this._z=i,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){const s=e.elements,r=s[0],a=s[4],o=s[8],l=s[1],c=s[5],h=s[9],u=s[2],p=s[6],g=s[10];switch(t){case"XYZ":this._y=Math.asin(zt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,g),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(p,c),this._z=0);break;case"YXZ":this._x=Math.asin(-zt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,g),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(zt(p,-1,1)),Math.abs(p)<.9999999?(this._y=Math.atan2(-u,g),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-zt(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(p,g),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(zt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(o,g));break;case"XZY":this._z=Math.asin(-zt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(p,c),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-h,g),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return xo.makeRotationFromQuaternion(e),this.setFromRotationMatrix(xo,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return vo.setFromEuler(this),this.setFromQuaternion(vo,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}nr.DEFAULT_ORDER="XYZ";class Cl{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let wh=0;const Mo=new C,Mi=new as,vn=new mt,Es=new C,Ki=new C,Ah=new C,Rh=new as,So=new C(1,0,0),yo=new C(0,1,0),Eo=new C(0,0,1),Ch={type:"added"},Lh={type:"removed"};class Mt extends Gi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:wh++}),this.uuid=rs(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Mt.DEFAULT_UP.clone();const e=new C,t=new nr,i=new as,s=new C(1,1,1);function r(){i.setFromEuler(t,!1)}function a(){t.setFromQuaternion(i,void 0,!1)}t._onChange(r),i._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new mt},normalMatrix:{value:new Ve}}),this.matrix=new mt,this.matrixWorld=new mt,this.matrixAutoUpdate=Mt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Mt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Cl,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Mi.setFromAxisAngle(e,t),this.quaternion.multiply(Mi),this}rotateOnWorldAxis(e,t){return Mi.setFromAxisAngle(e,t),this.quaternion.premultiply(Mi),this}rotateX(e){return this.rotateOnAxis(So,e)}rotateY(e){return this.rotateOnAxis(yo,e)}rotateZ(e){return this.rotateOnAxis(Eo,e)}translateOnAxis(e,t){return Mo.copy(e).applyQuaternion(this.quaternion),this.position.add(Mo.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(So,e)}translateY(e){return this.translateOnAxis(yo,e)}translateZ(e){return this.translateOnAxis(Eo,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(vn.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?Es.copy(e):Es.set(e,t,i);const s=this.parent;this.updateWorldMatrix(!0,!1),Ki.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?vn.lookAt(Ki,Es,this.up):vn.lookAt(Es,Ki,this.up),this.quaternion.setFromRotationMatrix(vn),s&&(vn.extractRotation(s.matrixWorld),Mi.setFromRotationMatrix(vn),this.quaternion.premultiply(Mi.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.parent!==null&&e.parent.remove(e),e.parent=this,this.children.push(e),e.dispatchEvent(Ch)):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Lh)),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),vn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),vn.multiply(e.parent.matrixWorld)),e.applyMatrix4(vn),this.add(e),e.updateWorldMatrix(!1,!0),this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,s=this.children.length;i<s;i++){const a=this.children[i].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,i=[]){this[e]===t&&i.push(this);const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(e,t,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ki,e,Ah),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ki,Rh,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let i=0,s=t.length;i<s;i++){const r=t[i];(r.matrixWorldAutoUpdate===!0||e===!0)&&r.updateMatrixWorld(e)}}updateWorldMatrix(e,t){const i=this.parent;if(e===!0&&i!==null&&i.matrixWorldAutoUpdate===!0&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),t===!0){const s=this.children;for(let r=0,a=s.length;r<a;r++){const o=s[r];o.matrixWorldAutoUpdate===!0&&o.updateWorldMatrix(!1,!0)}}}toJSON(e){const t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.visibility=this._visibility,s.active=this._active,s.bounds=this._bounds.map(o=>({boxInitialized:o.boxInitialized,boxMin:o.box.min.toArray(),boxMax:o.box.max.toArray(),sphereInitialized:o.sphereInitialized,sphereRadius:o.sphere.radius,sphereCenter:o.sphere.center.toArray()})),s.maxGeometryCount=this._maxGeometryCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.geometryCount=this._geometryCount,s.matricesTexture=this._matricesTexture.toJSON(e),this.boundingSphere!==null&&(s.boundingSphere={center:s.boundingSphere.center.toArray(),radius:s.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:s.boundingBox.min.toArray(),max:s.boundingBox.max.toArray()}));function r(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){const u=l[c];r(e.shapes,u)}else r(e.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(r(e.materials,this.material[l]));s.material=o}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];s.animations.push(r(e.animations,l))}}if(t){const o=a(e.geometries),l=a(e.materials),c=a(e.textures),h=a(e.images),u=a(e.shapes),p=a(e.skeletons),g=a(e.animations),_=a(e.nodes);o.length>0&&(i.geometries=o),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),h.length>0&&(i.images=h),u.length>0&&(i.shapes=u),p.length>0&&(i.skeletons=p),g.length>0&&(i.animations=g),_.length>0&&(i.nodes=_)}return i.object=s,i;function a(o){const l=[];for(const c in o){const h=o[c];delete h.metadata,l.push(h)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){const s=e.children[i];this.add(s.clone())}return this}}Mt.DEFAULT_UP=new C(0,1,0);Mt.DEFAULT_MATRIX_AUTO_UPDATE=!0;Mt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const nn=new C,Mn=new C,Cr=new C,Sn=new C,Si=new C,yi=new C,To=new C,Lr=new C,Pr=new C,Dr=new C;let Ts=!1;class sn{constructor(e=new C,t=new C,i=new C){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,s){s.subVectors(i,t),nn.subVectors(e,t),s.cross(nn);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,i,s,r){nn.subVectors(s,t),Mn.subVectors(i,t),Cr.subVectors(e,t);const a=nn.dot(nn),o=nn.dot(Mn),l=nn.dot(Cr),c=Mn.dot(Mn),h=Mn.dot(Cr),u=a*c-o*o;if(u===0)return r.set(0,0,0),null;const p=1/u,g=(c*l-o*h)*p,_=(a*h-o*l)*p;return r.set(1-g-_,_,g)}static containsPoint(e,t,i,s){return this.getBarycoord(e,t,i,s,Sn)===null?!1:Sn.x>=0&&Sn.y>=0&&Sn.x+Sn.y<=1}static getUV(e,t,i,s,r,a,o,l){return Ts===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),Ts=!0),this.getInterpolation(e,t,i,s,r,a,o,l)}static getInterpolation(e,t,i,s,r,a,o,l){return this.getBarycoord(e,t,i,s,Sn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,Sn.x),l.addScaledVector(a,Sn.y),l.addScaledVector(o,Sn.z),l)}static isFrontFacing(e,t,i,s){return nn.subVectors(i,t),Mn.subVectors(e,t),nn.cross(Mn).dot(s)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,s){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,i,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return nn.subVectors(this.c,this.b),Mn.subVectors(this.a,this.b),nn.cross(Mn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return sn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return sn.getBarycoord(e,this.a,this.b,this.c,t)}getUV(e,t,i,s,r){return Ts===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),Ts=!0),sn.getInterpolation(e,this.a,this.b,this.c,t,i,s,r)}getInterpolation(e,t,i,s,r){return sn.getInterpolation(e,this.a,this.b,this.c,t,i,s,r)}containsPoint(e){return sn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return sn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const i=this.a,s=this.b,r=this.c;let a,o;Si.subVectors(s,i),yi.subVectors(r,i),Lr.subVectors(e,i);const l=Si.dot(Lr),c=yi.dot(Lr);if(l<=0&&c<=0)return t.copy(i);Pr.subVectors(e,s);const h=Si.dot(Pr),u=yi.dot(Pr);if(h>=0&&u<=h)return t.copy(s);const p=l*u-h*c;if(p<=0&&l>=0&&h<=0)return a=l/(l-h),t.copy(i).addScaledVector(Si,a);Dr.subVectors(e,r);const g=Si.dot(Dr),_=yi.dot(Dr);if(_>=0&&g<=_)return t.copy(r);const x=g*c-l*_;if(x<=0&&c>=0&&_<=0)return o=c/(c-_),t.copy(i).addScaledVector(yi,o);const m=h*_-g*u;if(m<=0&&u-h>=0&&g-_>=0)return To.subVectors(r,s),o=(u-h)/(u-h+(g-_)),t.copy(s).addScaledVector(To,o);const f=1/(m+x+p);return a=x*f,o=p*f,t.copy(i).addScaledVector(Si,a).addScaledVector(yi,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const Ll={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Un={h:0,s:0,l:0},bs={h:0,s:0,l:0};function Ur(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+(e-n)*6*t:t<1/2?e:t<2/3?n+(e-n)*6*(2/3-t):n}class We{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){const s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=At){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Qe.toWorkingColorSpace(this,t),this}setRGB(e,t,i,s=Qe.workingColorSpace){return this.r=e,this.g=t,this.b=i,Qe.toWorkingColorSpace(this,s),this}setHSL(e,t,i,s=Qe.workingColorSpace){if(e=gh(e,1),t=zt(t,0,1),i=zt(i,0,1),t===0)this.r=this.g=this.b=i;else{const r=i<=.5?i*(1+t):i+t-i*t,a=2*i-r;this.r=Ur(a,r,e+1/3),this.g=Ur(a,r,e),this.b=Ur(a,r,e-1/3)}return Qe.toWorkingColorSpace(this,s),this}setStyle(e,t=At){function i(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r;const a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){const r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(r,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=At){const i=Ll[e.toLowerCase()];return i!==void 0?this.setHex(i,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Ii(e.r),this.g=Ii(e.g),this.b=Ii(e.b),this}copyLinearToSRGB(e){return this.r=Sr(e.r),this.g=Sr(e.g),this.b=Sr(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=At){return Qe.fromWorkingColorSpace(Pt.copy(this),e),Math.round(zt(Pt.r*255,0,255))*65536+Math.round(zt(Pt.g*255,0,255))*256+Math.round(zt(Pt.b*255,0,255))}getHexString(e=At){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Qe.workingColorSpace){Qe.fromWorkingColorSpace(Pt.copy(this),t);const i=Pt.r,s=Pt.g,r=Pt.b,a=Math.max(i,s,r),o=Math.min(i,s,r);let l,c;const h=(o+a)/2;if(o===a)l=0,c=0;else{const u=a-o;switch(c=h<=.5?u/(a+o):u/(2-a-o),a){case i:l=(s-r)/u+(s<r?6:0);break;case s:l=(r-i)/u+2;break;case r:l=(i-s)/u+4;break}l/=6}return e.h=l,e.s=c,e.l=h,e}getRGB(e,t=Qe.workingColorSpace){return Qe.fromWorkingColorSpace(Pt.copy(this),t),e.r=Pt.r,e.g=Pt.g,e.b=Pt.b,e}getStyle(e=At){Qe.fromWorkingColorSpace(Pt.copy(this),e);const t=Pt.r,i=Pt.g,s=Pt.b;return e!==At?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(s*255)})`}offsetHSL(e,t,i){return this.getHSL(Un),this.setHSL(Un.h+e,Un.s+t,Un.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(Un),e.getHSL(bs);const i=vr(Un.h,bs.h,t),s=vr(Un.s,bs.s,t),r=vr(Un.l,bs.l,t);return this.setHSL(i,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,i=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*i+r[6]*s,this.g=r[1]*t+r[4]*i+r[7]*s,this.b=r[2]*t+r[5]*i+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Pt=new We;We.NAMES=Ll;let Ph=0;class fi extends Gi{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Ph++}),this.uuid=rs(),this.name="",this.type="Material",this.blending=Ui,this.side=Gn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=$r,this.blendDst=Kr,this.blendEquation=ii,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new We(0,0,0),this.blendAlpha=0,this.depthFunc=Ws,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=co,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=pi,this.stencilZFail=pi,this.stencilZPass=pi,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const i=e[t];if(i===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(i):s&&s.isVector3&&i&&i.isVector3?s.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const i={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==Ui&&(i.blending=this.blending),this.side!==Gn&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==$r&&(i.blendSrc=this.blendSrc),this.blendDst!==Kr&&(i.blendDst=this.blendDst),this.blendEquation!==ii&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==Ws&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==co&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==pi&&(i.stencilFail=this.stencilFail),this.stencilZFail!==pi&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==pi&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function s(r){const a=[];for(const o in r){const l=r[o];delete l.metadata,a.push(l)}return a}if(t){const r=s(e.textures),a=s(e.images);r.length>0&&(i.textures=r),a.length>0&&(i.images=a)}return i}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let i=null;if(t!==null){const s=t.length;i=new Array(s);for(let r=0;r!==s;++r)i[r]=t[r].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class at extends fi{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new We(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=dl,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const _t=new C,ws=new Ye;class pn{constructor(e,t,i=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=ho,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.gpuType=Nn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return console.warn("THREE.BufferAttribute: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[i+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)ws.fromBufferAttribute(this,t),ws.applyMatrix3(e),this.setXY(t,ws.x,ws.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)_t.fromBufferAttribute(this,t),_t.applyMatrix3(e),this.setXYZ(t,_t.x,_t.y,_t.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)_t.fromBufferAttribute(this,t),_t.applyMatrix4(e),this.setXYZ(t,_t.x,_t.y,_t.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)_t.fromBufferAttribute(this,t),_t.applyNormalMatrix(e),this.setXYZ(t,_t.x,_t.y,_t.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)_t.fromBufferAttribute(this,t),_t.transformDirection(e),this.setXYZ(t,_t.x,_t.y,_t.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=qi(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=Bt(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=qi(t,this.array)),t}setX(e,t){return this.normalized&&(t=Bt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=qi(t,this.array)),t}setY(e,t){return this.normalized&&(t=Bt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=qi(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Bt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=qi(t,this.array)),t}setW(e,t){return this.normalized&&(t=Bt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=Bt(t,this.array),i=Bt(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,s){return e*=this.itemSize,this.normalized&&(t=Bt(t,this.array),i=Bt(i,this.array),s=Bt(s,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=s,this}setXYZW(e,t,i,s,r){return e*=this.itemSize,this.normalized&&(t=Bt(t,this.array),i=Bt(i,this.array),s=Bt(s,this.array),r=Bt(r,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==ho&&(e.usage=this.usage),e}}class Pl extends pn{constructor(e,t,i){super(new Uint16Array(e),t,i)}}class Dl extends pn{constructor(e,t,i){super(new Uint32Array(e),t,i)}}class nt extends pn{constructor(e,t,i){super(new Float32Array(e),t,i)}}let Dh=0;const Kt=new mt,Ir=new Mt,Ei=new C,Wt=new os,ji=new os,bt=new C;class Dt extends Gi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Dh++}),this.uuid=rs(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(bl(e)?Dl:Pl)(e,1):this.index=e,this}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const r=new Ve().getNormalMatrix(e);i.applyNormalMatrix(r),i.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Kt.makeRotationFromQuaternion(e),this.applyMatrix4(Kt),this}rotateX(e){return Kt.makeRotationX(e),this.applyMatrix4(Kt),this}rotateY(e){return Kt.makeRotationY(e),this.applyMatrix4(Kt),this}rotateZ(e){return Kt.makeRotationZ(e),this.applyMatrix4(Kt),this}translate(e,t,i){return Kt.makeTranslation(e,t,i),this.applyMatrix4(Kt),this}scale(e,t,i){return Kt.makeScale(e,t,i),this.applyMatrix4(Kt),this}lookAt(e){return Ir.lookAt(e),Ir.updateMatrix(),this.applyMatrix4(Ir.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ei).negate(),this.translate(Ei.x,Ei.y,Ei.z),this}setFromPoints(e){const t=[];for(let i=0,s=e.length;i<s;i++){const r=e[i];t.push(r.x,r.y,r.z||0)}return this.setAttribute("position",new nt(t,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new os);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingBox.set(new C(-1/0,-1/0,-1/0),new C(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,s=t.length;i<s;i++){const r=t[i];Wt.setFromBufferAttribute(r),this.morphTargetsRelative?(bt.addVectors(this.boundingBox.min,Wt.min),this.boundingBox.expandByPoint(bt),bt.addVectors(this.boundingBox.max,Wt.max),this.boundingBox.expandByPoint(bt)):(this.boundingBox.expandByPoint(Wt.min),this.boundingBox.expandByPoint(Wt.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new ls);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingSphere.set(new C,1/0);return}if(e){const i=this.boundingSphere.center;if(Wt.setFromBufferAttribute(e),t)for(let r=0,a=t.length;r<a;r++){const o=t[r];ji.setFromBufferAttribute(o),this.morphTargetsRelative?(bt.addVectors(Wt.min,ji.min),Wt.expandByPoint(bt),bt.addVectors(Wt.max,ji.max),Wt.expandByPoint(bt)):(Wt.expandByPoint(ji.min),Wt.expandByPoint(ji.max))}Wt.getCenter(i);let s=0;for(let r=0,a=e.count;r<a;r++)bt.fromBufferAttribute(e,r),s=Math.max(s,i.distanceToSquared(bt));if(t)for(let r=0,a=t.length;r<a;r++){const o=t[r],l=this.morphTargetsRelative;for(let c=0,h=o.count;c<h;c++)bt.fromBufferAttribute(o,c),l&&(Ei.fromBufferAttribute(e,c),bt.add(Ei)),s=Math.max(s,i.distanceToSquared(bt))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=e.array,s=t.position.array,r=t.normal.array,a=t.uv.array,o=s.length/3;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new pn(new Float32Array(4*o),4));const l=this.getAttribute("tangent").array,c=[],h=[];for(let b=0;b<o;b++)c[b]=new C,h[b]=new C;const u=new C,p=new C,g=new C,_=new Ye,x=new Ye,m=new Ye,f=new C,E=new C;function M(b,G,k){u.fromArray(s,b*3),p.fromArray(s,G*3),g.fromArray(s,k*3),_.fromArray(a,b*2),x.fromArray(a,G*2),m.fromArray(a,k*2),p.sub(u),g.sub(u),x.sub(_),m.sub(_);const ee=1/(x.x*m.y-m.x*x.y);isFinite(ee)&&(f.copy(p).multiplyScalar(m.y).addScaledVector(g,-x.y).multiplyScalar(ee),E.copy(g).multiplyScalar(x.x).addScaledVector(p,-m.x).multiplyScalar(ee),c[b].add(f),c[G].add(f),c[k].add(f),h[b].add(E),h[G].add(E),h[k].add(E))}let w=this.groups;w.length===0&&(w=[{start:0,count:i.length}]);for(let b=0,G=w.length;b<G;++b){const k=w[b],ee=k.start,D=k.count;for(let B=ee,W=ee+D;B<W;B+=3)M(i[B+0],i[B+1],i[B+2])}const P=new C,A=new C,R=new C,H=new C;function S(b){R.fromArray(r,b*3),H.copy(R);const G=c[b];P.copy(G),P.sub(R.multiplyScalar(R.dot(G))).normalize(),A.crossVectors(H,G);const ee=A.dot(h[b])<0?-1:1;l[b*4]=P.x,l[b*4+1]=P.y,l[b*4+2]=P.z,l[b*4+3]=ee}for(let b=0,G=w.length;b<G;++b){const k=w[b],ee=k.start,D=k.count;for(let B=ee,W=ee+D;B<W;B+=3)S(i[B+0]),S(i[B+1]),S(i[B+2])}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new pn(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let p=0,g=i.count;p<g;p++)i.setXYZ(p,0,0,0);const s=new C,r=new C,a=new C,o=new C,l=new C,c=new C,h=new C,u=new C;if(e)for(let p=0,g=e.count;p<g;p+=3){const _=e.getX(p+0),x=e.getX(p+1),m=e.getX(p+2);s.fromBufferAttribute(t,_),r.fromBufferAttribute(t,x),a.fromBufferAttribute(t,m),h.subVectors(a,r),u.subVectors(s,r),h.cross(u),o.fromBufferAttribute(i,_),l.fromBufferAttribute(i,x),c.fromBufferAttribute(i,m),o.add(h),l.add(h),c.add(h),i.setXYZ(_,o.x,o.y,o.z),i.setXYZ(x,l.x,l.y,l.z),i.setXYZ(m,c.x,c.y,c.z)}else for(let p=0,g=t.count;p<g;p+=3)s.fromBufferAttribute(t,p+0),r.fromBufferAttribute(t,p+1),a.fromBufferAttribute(t,p+2),h.subVectors(a,r),u.subVectors(s,r),h.cross(u),i.setXYZ(p+0,h.x,h.y,h.z),i.setXYZ(p+1,h.x,h.y,h.z),i.setXYZ(p+2,h.x,h.y,h.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)bt.fromBufferAttribute(e,t),bt.normalize(),e.setXYZ(t,bt.x,bt.y,bt.z)}toNonIndexed(){function e(o,l){const c=o.array,h=o.itemSize,u=o.normalized,p=new c.constructor(l.length*h);let g=0,_=0;for(let x=0,m=l.length;x<m;x++){o.isInterleavedBufferAttribute?g=l[x]*o.data.stride+o.offset:g=l[x]*h;for(let f=0;f<h;f++)p[_++]=c[g++]}return new pn(p,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new Dt,i=this.index.array,s=this.attributes;for(const o in s){const l=s[o],c=e(l,i);t.setAttribute(o,c)}const r=this.morphAttributes;for(const o in r){const l=[],c=r[o];for(let h=0,u=c.length;h<u;h++){const p=c[h],g=e(p,i);l.push(g)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const c=a[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const i=this.attributes;for(const l in i){const c=i[l];e.data.attributes[l]=c.toJSON(e.data)}const s={};let r=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],h=[];for(let u=0,p=c.length;u<p;u++){const g=c[u];h.push(g.toJSON(e.data))}h.length>0&&(s[l]=h,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone(t));const s=e.attributes;for(const c in s){const h=s[c];this.setAttribute(c,h.clone(t))}const r=e.morphAttributes;for(const c in r){const h=[],u=r[c];for(let p=0,g=u.length;p<g;p++)h.push(u[p].clone(t));this.morphAttributes[c]=h}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let c=0,h=a.length;c<h;c++){const u=a[c];this.addGroup(u.start,u.count,u.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const bo=new mt,Qn=new la,As=new ls,wo=new C,Ti=new C,bi=new C,wi=new C,Nr=new C,Rs=new C,Cs=new Ye,Ls=new Ye,Ps=new Ye,Ao=new C,Ro=new C,Co=new C,Ds=new C,Us=new C;class Ie extends Mt{constructor(e=new Dt,t=new at){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const s=t[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(e,t){const i=this.geometry,s=i.attributes.position,r=i.morphAttributes.position,a=i.morphTargetsRelative;t.fromBufferAttribute(s,e);const o=this.morphTargetInfluences;if(r&&o){Rs.set(0,0,0);for(let l=0,c=r.length;l<c;l++){const h=o[l],u=r[l];h!==0&&(Nr.fromBufferAttribute(u,e),a?Rs.addScaledVector(Nr,h):Rs.addScaledVector(Nr.sub(t),h))}t.add(Rs)}return t}raycast(e,t){const i=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),As.copy(i.boundingSphere),As.applyMatrix4(r),Qn.copy(e.ray).recast(e.near),!(As.containsPoint(Qn.origin)===!1&&(Qn.intersectSphere(As,wo)===null||Qn.origin.distanceToSquared(wo)>(e.far-e.near)**2))&&(bo.copy(r).invert(),Qn.copy(e.ray).applyMatrix4(bo),!(i.boundingBox!==null&&Qn.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,Qn)))}_computeIntersections(e,t,i){let s;const r=this.geometry,a=this.material,o=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,p=r.groups,g=r.drawRange;if(o!==null)if(Array.isArray(a))for(let _=0,x=p.length;_<x;_++){const m=p[_],f=a[m.materialIndex],E=Math.max(m.start,g.start),M=Math.min(o.count,Math.min(m.start+m.count,g.start+g.count));for(let w=E,P=M;w<P;w+=3){const A=o.getX(w),R=o.getX(w+1),H=o.getX(w+2);s=Is(this,f,e,i,c,h,u,A,R,H),s&&(s.faceIndex=Math.floor(w/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{const _=Math.max(0,g.start),x=Math.min(o.count,g.start+g.count);for(let m=_,f=x;m<f;m+=3){const E=o.getX(m),M=o.getX(m+1),w=o.getX(m+2);s=Is(this,a,e,i,c,h,u,E,M,w),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}else if(l!==void 0)if(Array.isArray(a))for(let _=0,x=p.length;_<x;_++){const m=p[_],f=a[m.materialIndex],E=Math.max(m.start,g.start),M=Math.min(l.count,Math.min(m.start+m.count,g.start+g.count));for(let w=E,P=M;w<P;w+=3){const A=w,R=w+1,H=w+2;s=Is(this,f,e,i,c,h,u,A,R,H),s&&(s.faceIndex=Math.floor(w/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{const _=Math.max(0,g.start),x=Math.min(l.count,g.start+g.count);for(let m=_,f=x;m<f;m+=3){const E=m,M=m+1,w=m+2;s=Is(this,a,e,i,c,h,u,E,M,w),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}}}function Uh(n,e,t,i,s,r,a,o){let l;if(e.side===Gt?l=i.intersectTriangle(a,r,s,!0,o):l=i.intersectTriangle(s,r,a,e.side===Gn,o),l===null)return null;Us.copy(o),Us.applyMatrix4(n.matrixWorld);const c=t.ray.origin.distanceTo(Us);return c<t.near||c>t.far?null:{distance:c,point:Us.clone(),object:n}}function Is(n,e,t,i,s,r,a,o,l,c){n.getVertexPosition(o,Ti),n.getVertexPosition(l,bi),n.getVertexPosition(c,wi);const h=Uh(n,e,t,i,Ti,bi,wi,Ds);if(h){s&&(Cs.fromBufferAttribute(s,o),Ls.fromBufferAttribute(s,l),Ps.fromBufferAttribute(s,c),h.uv=sn.getInterpolation(Ds,Ti,bi,wi,Cs,Ls,Ps,new Ye)),r&&(Cs.fromBufferAttribute(r,o),Ls.fromBufferAttribute(r,l),Ps.fromBufferAttribute(r,c),h.uv1=sn.getInterpolation(Ds,Ti,bi,wi,Cs,Ls,Ps,new Ye),h.uv2=h.uv1),a&&(Ao.fromBufferAttribute(a,o),Ro.fromBufferAttribute(a,l),Co.fromBufferAttribute(a,c),h.normal=sn.getInterpolation(Ds,Ti,bi,wi,Ao,Ro,Co,new C),h.normal.dot(i.direction)>0&&h.normal.multiplyScalar(-1));const u={a:o,b:l,c,normal:new C,materialIndex:0};sn.getNormal(Ti,bi,wi,u.normal),h.face=u}return h}class lt extends Dt{constructor(e=1,t=1,i=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:s,heightSegments:r,depthSegments:a};const o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);const l=[],c=[],h=[],u=[];let p=0,g=0;_("z","y","x",-1,-1,i,t,e,a,r,0),_("z","y","x",1,-1,i,t,-e,a,r,1),_("x","z","y",1,1,e,i,t,s,a,2),_("x","z","y",1,-1,e,i,-t,s,a,3),_("x","y","z",1,-1,e,t,i,s,r,4),_("x","y","z",-1,-1,e,t,-i,s,r,5),this.setIndex(l),this.setAttribute("position",new nt(c,3)),this.setAttribute("normal",new nt(h,3)),this.setAttribute("uv",new nt(u,2));function _(x,m,f,E,M,w,P,A,R,H,S){const b=w/R,G=P/H,k=w/2,ee=P/2,D=A/2,B=R+1,W=H+1;let Y=0,X=0;const q=new C;for(let $=0;$<W;$++){const te=$*G-ee;for(let ne=0;ne<B;ne++){const V=ne*b-k;q[x]=V*E,q[m]=te*M,q[f]=D,c.push(q.x,q.y,q.z),q[x]=0,q[m]=0,q[f]=A>0?1:-1,h.push(q.x,q.y,q.z),u.push(ne/R),u.push(1-$/H),Y+=1}}for(let $=0;$<H;$++)for(let te=0;te<R;te++){const ne=p+te+B*$,V=p+te+B*($+1),K=p+(te+1)+B*($+1),le=p+(te+1)+B*$;l.push(ne,V,le),l.push(V,K,le),X+=6}o.addGroup(g,X,S),g+=X,p+=Y}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new lt(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function zi(n){const e={};for(const t in n){e[t]={};for(const i in n[t]){const s=n[t][i];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=s.clone():Array.isArray(s)?e[t][i]=s.slice():e[t][i]=s}}return e}function Ft(n){const e={};for(let t=0;t<n.length;t++){const i=zi(n[t]);for(const s in i)e[s]=i[s]}return e}function Ih(n){const e=[];for(let t=0;t<n.length;t++)e.push(n[t].clone());return e}function Ul(n){return n.getRenderTarget()===null?n.outputColorSpace:Qe.workingColorSpace}const Nh={clone:zi,merge:Ft};var Fh=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Oh=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class ci extends fi{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Fh,this.fragmentShader=Oh,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={derivatives:!1,fragDepth:!1,drawBuffers:!1,shaderTextureLOD:!1,clipCullDistance:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=zi(e.uniforms),this.uniformsGroups=Ih(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const s in this.uniforms){const a=this.uniforms[s].value;a&&a.isTexture?t.uniforms[s]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[s]={type:"m4",value:a.toArray()}:t.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const i={};for(const s in this.extensions)this.extensions[s]===!0&&(i[s]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}}class Il extends Mt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new mt,this.projectionMatrix=new mt,this.projectionMatrixInverse=new mt,this.coordinateSystem=Tn}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}class Xt extends Il{constructor(e=50,t=1,i=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=ta*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(xr*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return ta*2*Math.atan(Math.tan(xr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}setViewOffset(e,t,i,s,r,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(xr*.5*this.fov)/this.zoom,i=2*t,s=this.aspect*i,r=-.5*s;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,c=a.fullHeight;r+=a.offsetX*s/l,t-=a.offsetY*i/c,s*=a.width/l,i*=a.height/c}const o=this.filmOffset;o!==0&&(r+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-i,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const Ai=-90,Ri=1;class Bh extends Mt{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new Xt(Ai,Ri,e,t);s.layers=this.layers,this.add(s);const r=new Xt(Ai,Ri,e,t);r.layers=this.layers,this.add(r);const a=new Xt(Ai,Ri,e,t);a.layers=this.layers,this.add(a);const o=new Xt(Ai,Ri,e,t);o.layers=this.layers,this.add(o);const l=new Xt(Ai,Ri,e,t);l.layers=this.layers,this.add(l);const c=new Xt(Ai,Ri,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[i,s,r,a,o,l]=t;for(const c of t)this.remove(c);if(e===Tn)i.up.set(0,1,0),i.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===$s)i.up.set(0,-1,0),i.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[r,a,o,l,c,h]=this.children,u=e.getRenderTarget(),p=e.getActiveCubeFace(),g=e.getActiveMipmapLevel(),_=e.xr.enabled;e.xr.enabled=!1;const x=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,e.setRenderTarget(i,0,s),e.render(t,r),e.setRenderTarget(i,1,s),e.render(t,a),e.setRenderTarget(i,2,s),e.render(t,o),e.setRenderTarget(i,3,s),e.render(t,l),e.setRenderTarget(i,4,s),e.render(t,c),i.texture.generateMipmaps=x,e.setRenderTarget(i,5,s),e.render(t,h),e.setRenderTarget(u,p,g),e.xr.enabled=_,i.texture.needsPMREMUpdate=!0}}class Nl extends qt{constructor(e,t,i,s,r,a,o,l,c,h){e=e!==void 0?e:[],t=t!==void 0?t:Fi,super(e,t,i,s,r,a,o,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class zh extends li{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},s=[i,i,i,i,i,i];t.encoding!==void 0&&(Ji("THREE.WebGLCubeRenderTarget: option.encoding has been replaced by option.colorSpace."),t.colorSpace=t.encoding===oi?At:Zt),this.texture=new Nl(s,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:jt}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new lt(5,5,5),r=new ci({name:"CubemapFromEquirect",uniforms:zi(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:Gt,blending:Bn});r.uniforms.tEquirect.value=t;const a=new Ie(s,r),o=t.minFilter;return t.minFilter===es&&(t.minFilter=jt),new Bh(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t,i,s){const r=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,i,s);e.setRenderTarget(r)}}const Fr=new C,Hh=new C,Gh=new Ve;class ti{constructor(e=new C(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,s){return this.normal.set(e,t,i),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){const s=Fr.subVectors(i,t).cross(Hh.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const i=e.delta(Fr),s=this.normal.dot(i);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const r=-(e.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:t.copy(e.start).addScaledVector(i,r)}intersectsLine(e){const t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const i=t||Gh.getNormalMatrix(e),s=this.coplanarPoint(Fr).applyMatrix4(e),r=this.normal.applyMatrix3(i).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const ei=new ls,Ns=new C;class ca{constructor(e=new ti,t=new ti,i=new ti,s=new ti,r=new ti,a=new ti){this.planes=[e,t,i,s,r,a]}set(e,t,i,s,r,a){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(i),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(e){const t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=Tn){const i=this.planes,s=e.elements,r=s[0],a=s[1],o=s[2],l=s[3],c=s[4],h=s[5],u=s[6],p=s[7],g=s[8],_=s[9],x=s[10],m=s[11],f=s[12],E=s[13],M=s[14],w=s[15];if(i[0].setComponents(l-r,p-c,m-g,w-f).normalize(),i[1].setComponents(l+r,p+c,m+g,w+f).normalize(),i[2].setComponents(l+a,p+h,m+_,w+E).normalize(),i[3].setComponents(l-a,p-h,m-_,w-E).normalize(),i[4].setComponents(l-o,p-u,m-x,w-M).normalize(),t===Tn)i[5].setComponents(l+o,p+u,m+x,w+M).normalize();else if(t===$s)i[5].setComponents(o,u,x,M).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),ei.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),ei.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(ei)}intersectsSprite(e){return ei.center.set(0,0,0),ei.radius=.7071067811865476,ei.applyMatrix4(e.matrixWorld),this.intersectsSphere(ei)}intersectsSphere(e){const t=this.planes,i=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(i)<s)return!1;return!0}intersectsBox(e){const t=this.planes;for(let i=0;i<6;i++){const s=t[i];if(Ns.x=s.normal.x>0?e.max.x:e.min.x,Ns.y=s.normal.y>0?e.max.y:e.min.y,Ns.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(Ns)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function Fl(){let n=null,e=!1,t=null,i=null;function s(r,a){t(r,a),i=n.requestAnimationFrame(s)}return{start:function(){e!==!0&&t!==null&&(i=n.requestAnimationFrame(s),e=!0)},stop:function(){n.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){n=r}}}function kh(n,e){const t=e.isWebGL2,i=new WeakMap;function s(c,h){const u=c.array,p=c.usage,g=u.byteLength,_=n.createBuffer();n.bindBuffer(h,_),n.bufferData(h,u,p),c.onUploadCallback();let x;if(u instanceof Float32Array)x=n.FLOAT;else if(u instanceof Uint16Array)if(c.isFloat16BufferAttribute)if(t)x=n.HALF_FLOAT;else throw new Error("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.");else x=n.UNSIGNED_SHORT;else if(u instanceof Int16Array)x=n.SHORT;else if(u instanceof Uint32Array)x=n.UNSIGNED_INT;else if(u instanceof Int32Array)x=n.INT;else if(u instanceof Int8Array)x=n.BYTE;else if(u instanceof Uint8Array)x=n.UNSIGNED_BYTE;else if(u instanceof Uint8ClampedArray)x=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+u);return{buffer:_,type:x,bytesPerElement:u.BYTES_PER_ELEMENT,version:c.version,size:g}}function r(c,h,u){const p=h.array,g=h._updateRange,_=h.updateRanges;if(n.bindBuffer(u,c),g.count===-1&&_.length===0&&n.bufferSubData(u,0,p),_.length!==0){for(let x=0,m=_.length;x<m;x++){const f=_[x];t?n.bufferSubData(u,f.start*p.BYTES_PER_ELEMENT,p,f.start,f.count):n.bufferSubData(u,f.start*p.BYTES_PER_ELEMENT,p.subarray(f.start,f.start+f.count))}h.clearUpdateRanges()}g.count!==-1&&(t?n.bufferSubData(u,g.offset*p.BYTES_PER_ELEMENT,p,g.offset,g.count):n.bufferSubData(u,g.offset*p.BYTES_PER_ELEMENT,p.subarray(g.offset,g.offset+g.count)),g.count=-1),h.onUploadCallback()}function a(c){return c.isInterleavedBufferAttribute&&(c=c.data),i.get(c)}function o(c){c.isInterleavedBufferAttribute&&(c=c.data);const h=i.get(c);h&&(n.deleteBuffer(h.buffer),i.delete(c))}function l(c,h){if(c.isGLBufferAttribute){const p=i.get(c);(!p||p.version<c.version)&&i.set(c,{buffer:c.buffer,type:c.type,bytesPerElement:c.elementSize,version:c.version});return}c.isInterleavedBufferAttribute&&(c=c.data);const u=i.get(c);if(u===void 0)i.set(c,s(c,h));else if(u.version<c.version){if(u.size!==c.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");r(u.buffer,c,h),u.version=c.version}}return{get:a,remove:o,update:l}}class hi extends Dt{constructor(e=1,t=1,i=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:s};const r=e/2,a=t/2,o=Math.floor(i),l=Math.floor(s),c=o+1,h=l+1,u=e/o,p=t/l,g=[],_=[],x=[],m=[];for(let f=0;f<h;f++){const E=f*p-a;for(let M=0;M<c;M++){const w=M*u-r;_.push(w,-E,0),x.push(0,0,1),m.push(M/o),m.push(1-f/l)}}for(let f=0;f<l;f++)for(let E=0;E<o;E++){const M=E+c*f,w=E+c*(f+1),P=E+1+c*(f+1),A=E+1+c*f;g.push(M,w,A),g.push(w,P,A)}this.setIndex(g),this.setAttribute("position",new nt(_,3)),this.setAttribute("normal",new nt(x,3)),this.setAttribute("uv",new nt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new hi(e.width,e.height,e.widthSegments,e.heightSegments)}}var Vh=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Wh=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Xh=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,qh=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Yh=`#ifdef USE_ALPHATEST
	if ( diffuseColor.a < alphaTest ) discard;
#endif`,$h=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Kh=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,jh=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Zh=`#ifdef USE_BATCHING
	attribute float batchId;
	uniform highp sampler2D batchingTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Jh=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( batchId );
#endif`,Qh=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,eu=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,tu=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,nu=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,iu=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,su=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#pragma unroll_loop_start
	for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
		plane = clippingPlanes[ i ];
		if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
	}
	#pragma unroll_loop_end
	#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
		bool clipped = true;
		#pragma unroll_loop_start
		for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
		}
		#pragma unroll_loop_end
		if ( clipped ) discard;
	#endif
#endif`,ru=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,au=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,ou=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,lu=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,cu=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,hu=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,uu=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,fu=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
float luminance( const in vec3 rgb ) {
	const vec3 weights = vec3( 0.2126729, 0.7151522, 0.0721750 );
	return dot( weights, rgb );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,du=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,pu=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,mu=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,gu=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,_u=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,xu=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,vu="gl_FragColor = linearToOutputTexel( gl_FragColor );",Mu=`
const mat3 LINEAR_SRGB_TO_LINEAR_DISPLAY_P3 = mat3(
	vec3( 0.8224621, 0.177538, 0.0 ),
	vec3( 0.0331941, 0.9668058, 0.0 ),
	vec3( 0.0170827, 0.0723974, 0.9105199 )
);
const mat3 LINEAR_DISPLAY_P3_TO_LINEAR_SRGB = mat3(
	vec3( 1.2249401, - 0.2249404, 0.0 ),
	vec3( - 0.0420569, 1.0420571, 0.0 ),
	vec3( - 0.0196376, - 0.0786361, 1.0982735 )
);
vec4 LinearSRGBToLinearDisplayP3( in vec4 value ) {
	return vec4( value.rgb * LINEAR_SRGB_TO_LINEAR_DISPLAY_P3, value.a );
}
vec4 LinearDisplayP3ToLinearSRGB( in vec4 value ) {
	return vec4( value.rgb * LINEAR_DISPLAY_P3_TO_LINEAR_SRGB, value.a );
}
vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}
vec4 LinearToLinear( in vec4 value ) {
	return value;
}
vec4 LinearTosRGB( in vec4 value ) {
	return sRGBTransferOETF( value );
}`,Su=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,yu=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Eu=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,Tu=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,bu=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,wu=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Au=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Ru=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Cu=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Lu=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,Pu=`#ifdef USE_LIGHTMAP
	vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
	reflectedLight.indirectDiffuse += lightMapIrradiance;
#endif`,Du=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Uu=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Iu=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Nu=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	#if defined ( LEGACY_LIGHTS )
		if ( cutoffDistance > 0.0 && decayExponent > 0.0 ) {
			return pow( saturate( - lightDistance / cutoffDistance + 1.0 ), decayExponent );
		}
		return 1.0;
	#else
		float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
		if ( cutoffDistance > 0.0 ) {
			distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
		}
		return distanceFalloff;
	#endif
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,Fu=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,Ou=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Bu=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,zu=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Hu=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Gu=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,ku=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Vu=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Wu=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Xu=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,qu=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	gl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Yu=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,$u=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		varying float vFragDepth;
		varying float vIsPerspective;
	#else
		uniform float logDepthBufFC;
	#endif
#endif`,Ku=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		vFragDepth = 1.0 + gl_Position.w;
		vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
	#else
		if ( isPerspectiveMatrix( projectionMatrix ) ) {
			gl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;
			gl_Position.z *= gl_Position.w;
		}
	#endif
#endif`,ju=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Zu=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Ju=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Qu=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,ef=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,tf=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,nf=`#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,sf=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		objectNormal += morphNormal0 * morphTargetInfluences[ 0 ];
		objectNormal += morphNormal1 * morphTargetInfluences[ 1 ];
		objectNormal += morphNormal2 * morphTargetInfluences[ 2 ];
		objectNormal += morphNormal3 * morphTargetInfluences[ 3 ];
	#endif
#endif`,rf=`#ifdef USE_MORPHTARGETS
	uniform float morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
		uniform sampler2DArray morphTargetsTexture;
		uniform ivec2 morphTargetsTextureSize;
		vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
			int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
			int y = texelIndex / morphTargetsTextureSize.x;
			int x = texelIndex - y * morphTargetsTextureSize.x;
			ivec3 morphUV = ivec3( x, y, morphTargetIndex );
			return texelFetch( morphTargetsTexture, morphUV, 0 );
		}
	#else
		#ifndef USE_MORPHNORMALS
			uniform float morphTargetInfluences[ 8 ];
		#else
			uniform float morphTargetInfluences[ 4 ];
		#endif
	#endif
#endif`,af=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		transformed += morphTarget0 * morphTargetInfluences[ 0 ];
		transformed += morphTarget1 * morphTargetInfluences[ 1 ];
		transformed += morphTarget2 * morphTargetInfluences[ 2 ];
		transformed += morphTarget3 * morphTargetInfluences[ 3 ];
		#ifndef USE_MORPHNORMALS
			transformed += morphTarget4 * morphTargetInfluences[ 4 ];
			transformed += morphTarget5 * morphTargetInfluences[ 5 ];
			transformed += morphTarget6 * morphTargetInfluences[ 6 ];
			transformed += morphTarget7 * morphTargetInfluences[ 7 ];
		#endif
	#endif
#endif`,of=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,lf=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,cf=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,hf=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,uf=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,ff=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,df=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,pf=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,mf=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,gf=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,_f=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,xf=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;
const vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256., 256. );
const vec4 UnpackFactors = UnpackDownscale / vec4( PackFactors, 1. );
const float ShiftRight8 = 1. / 256.;
vec4 packDepthToRGBA( const in float v ) {
	vec4 r = vec4( fract( v * PackFactors ), v );
	r.yzw -= r.xyz * ShiftRight8;	return r * PackUpscale;
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors );
}
vec2 packDepthToRG( in highp float v ) {
	return packDepthToRGBA( v ).yx;
}
float unpackRGToDepth( const in highp vec2 v ) {
	return unpackRGBAToDepth( vec4( v.xy, 0.0, 0.0 ) );
}
vec4 pack2HalfToRGBA( vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,vf=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Mf=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Sf=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,yf=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Ef=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Tf=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,bf=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return shadow;
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
		vec3 lightToPosition = shadowCoord.xyz;
		float dp = ( length( lightToPosition ) - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );		dp += shadowBias;
		vec3 bd3D = normalize( lightToPosition );
		#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
			vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
			return (
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
			) * ( 1.0 / 9.0 );
		#else
			return texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
		#endif
	}
#endif`,wf=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,Af=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,Rf=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,Cf=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Lf=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Pf=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Df=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,Uf=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,If=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Nf=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Ff=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 OptimizedCineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color *= toneMappingExposure;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	return color;
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,Of=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Bf=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
		vec3 refractedRayExit = position + transmissionRay;
		vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
		vec2 refractionCoords = ndcPos.xy / ndcPos.w;
		refractionCoords += 1.0;
		refractionCoords /= 2.0;
		vec4 transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
		vec3 transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,zf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Hf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Gf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,kf=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Vf=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Wf=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Xf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,qf=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Yf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,$f=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Kf=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,jf=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#endif
}`,Zf=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,Jf=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,Qf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,ed=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,td=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,nd=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,id=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,sd=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,rd=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,ad=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,od=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,ld=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,cd=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,hd=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), opacity );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,ud=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,fd=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,dd=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,pd=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,md=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,gd=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,_d=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,xd=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,vd=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Md=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Sd=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );
	vec2 scale;
	scale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );
	scale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,yd=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Oe={alphahash_fragment:Vh,alphahash_pars_fragment:Wh,alphamap_fragment:Xh,alphamap_pars_fragment:qh,alphatest_fragment:Yh,alphatest_pars_fragment:$h,aomap_fragment:Kh,aomap_pars_fragment:jh,batching_pars_vertex:Zh,batching_vertex:Jh,begin_vertex:Qh,beginnormal_vertex:eu,bsdfs:tu,iridescence_fragment:nu,bumpmap_pars_fragment:iu,clipping_planes_fragment:su,clipping_planes_pars_fragment:ru,clipping_planes_pars_vertex:au,clipping_planes_vertex:ou,color_fragment:lu,color_pars_fragment:cu,color_pars_vertex:hu,color_vertex:uu,common:fu,cube_uv_reflection_fragment:du,defaultnormal_vertex:pu,displacementmap_pars_vertex:mu,displacementmap_vertex:gu,emissivemap_fragment:_u,emissivemap_pars_fragment:xu,colorspace_fragment:vu,colorspace_pars_fragment:Mu,envmap_fragment:Su,envmap_common_pars_fragment:yu,envmap_pars_fragment:Eu,envmap_pars_vertex:Tu,envmap_physical_pars_fragment:Fu,envmap_vertex:bu,fog_vertex:wu,fog_pars_vertex:Au,fog_fragment:Ru,fog_pars_fragment:Cu,gradientmap_pars_fragment:Lu,lightmap_fragment:Pu,lightmap_pars_fragment:Du,lights_lambert_fragment:Uu,lights_lambert_pars_fragment:Iu,lights_pars_begin:Nu,lights_toon_fragment:Ou,lights_toon_pars_fragment:Bu,lights_phong_fragment:zu,lights_phong_pars_fragment:Hu,lights_physical_fragment:Gu,lights_physical_pars_fragment:ku,lights_fragment_begin:Vu,lights_fragment_maps:Wu,lights_fragment_end:Xu,logdepthbuf_fragment:qu,logdepthbuf_pars_fragment:Yu,logdepthbuf_pars_vertex:$u,logdepthbuf_vertex:Ku,map_fragment:ju,map_pars_fragment:Zu,map_particle_fragment:Ju,map_particle_pars_fragment:Qu,metalnessmap_fragment:ef,metalnessmap_pars_fragment:tf,morphcolor_vertex:nf,morphnormal_vertex:sf,morphtarget_pars_vertex:rf,morphtarget_vertex:af,normal_fragment_begin:of,normal_fragment_maps:lf,normal_pars_fragment:cf,normal_pars_vertex:hf,normal_vertex:uf,normalmap_pars_fragment:ff,clearcoat_normal_fragment_begin:df,clearcoat_normal_fragment_maps:pf,clearcoat_pars_fragment:mf,iridescence_pars_fragment:gf,opaque_fragment:_f,packing:xf,premultiplied_alpha_fragment:vf,project_vertex:Mf,dithering_fragment:Sf,dithering_pars_fragment:yf,roughnessmap_fragment:Ef,roughnessmap_pars_fragment:Tf,shadowmap_pars_fragment:bf,shadowmap_pars_vertex:wf,shadowmap_vertex:Af,shadowmask_pars_fragment:Rf,skinbase_vertex:Cf,skinning_pars_vertex:Lf,skinning_vertex:Pf,skinnormal_vertex:Df,specularmap_fragment:Uf,specularmap_pars_fragment:If,tonemapping_fragment:Nf,tonemapping_pars_fragment:Ff,transmission_fragment:Of,transmission_pars_fragment:Bf,uv_pars_fragment:zf,uv_pars_vertex:Hf,uv_vertex:Gf,worldpos_vertex:kf,background_vert:Vf,background_frag:Wf,backgroundCube_vert:Xf,backgroundCube_frag:qf,cube_vert:Yf,cube_frag:$f,depth_vert:Kf,depth_frag:jf,distanceRGBA_vert:Zf,distanceRGBA_frag:Jf,equirect_vert:Qf,equirect_frag:ed,linedashed_vert:td,linedashed_frag:nd,meshbasic_vert:id,meshbasic_frag:sd,meshlambert_vert:rd,meshlambert_frag:ad,meshmatcap_vert:od,meshmatcap_frag:ld,meshnormal_vert:cd,meshnormal_frag:hd,meshphong_vert:ud,meshphong_frag:fd,meshphysical_vert:dd,meshphysical_frag:pd,meshtoon_vert:md,meshtoon_frag:gd,points_vert:_d,points_frag:xd,shadow_vert:vd,shadow_frag:Md,sprite_vert:Sd,sprite_frag:yd},se={common:{diffuse:{value:new We(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ve},alphaMap:{value:null},alphaMapTransform:{value:new Ve},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ve}},envmap:{envMap:{value:null},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ve}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ve}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ve},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ve},normalScale:{value:new Ye(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ve},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ve}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ve}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ve}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new We(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new We(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ve},alphaTest:{value:0},uvTransform:{value:new Ve}},sprite:{diffuse:{value:new We(16777215)},opacity:{value:1},center:{value:new Ye(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ve},alphaMap:{value:null},alphaMapTransform:{value:new Ve},alphaTest:{value:0}}},hn={basic:{uniforms:Ft([se.common,se.specularmap,se.envmap,se.aomap,se.lightmap,se.fog]),vertexShader:Oe.meshbasic_vert,fragmentShader:Oe.meshbasic_frag},lambert:{uniforms:Ft([se.common,se.specularmap,se.envmap,se.aomap,se.lightmap,se.emissivemap,se.bumpmap,se.normalmap,se.displacementmap,se.fog,se.lights,{emissive:{value:new We(0)}}]),vertexShader:Oe.meshlambert_vert,fragmentShader:Oe.meshlambert_frag},phong:{uniforms:Ft([se.common,se.specularmap,se.envmap,se.aomap,se.lightmap,se.emissivemap,se.bumpmap,se.normalmap,se.displacementmap,se.fog,se.lights,{emissive:{value:new We(0)},specular:{value:new We(1118481)},shininess:{value:30}}]),vertexShader:Oe.meshphong_vert,fragmentShader:Oe.meshphong_frag},standard:{uniforms:Ft([se.common,se.envmap,se.aomap,se.lightmap,se.emissivemap,se.bumpmap,se.normalmap,se.displacementmap,se.roughnessmap,se.metalnessmap,se.fog,se.lights,{emissive:{value:new We(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Oe.meshphysical_vert,fragmentShader:Oe.meshphysical_frag},toon:{uniforms:Ft([se.common,se.aomap,se.lightmap,se.emissivemap,se.bumpmap,se.normalmap,se.displacementmap,se.gradientmap,se.fog,se.lights,{emissive:{value:new We(0)}}]),vertexShader:Oe.meshtoon_vert,fragmentShader:Oe.meshtoon_frag},matcap:{uniforms:Ft([se.common,se.bumpmap,se.normalmap,se.displacementmap,se.fog,{matcap:{value:null}}]),vertexShader:Oe.meshmatcap_vert,fragmentShader:Oe.meshmatcap_frag},points:{uniforms:Ft([se.points,se.fog]),vertexShader:Oe.points_vert,fragmentShader:Oe.points_frag},dashed:{uniforms:Ft([se.common,se.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Oe.linedashed_vert,fragmentShader:Oe.linedashed_frag},depth:{uniforms:Ft([se.common,se.displacementmap]),vertexShader:Oe.depth_vert,fragmentShader:Oe.depth_frag},normal:{uniforms:Ft([se.common,se.bumpmap,se.normalmap,se.displacementmap,{opacity:{value:1}}]),vertexShader:Oe.meshnormal_vert,fragmentShader:Oe.meshnormal_frag},sprite:{uniforms:Ft([se.sprite,se.fog]),vertexShader:Oe.sprite_vert,fragmentShader:Oe.sprite_frag},background:{uniforms:{uvTransform:{value:new Ve},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Oe.background_vert,fragmentShader:Oe.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1}},vertexShader:Oe.backgroundCube_vert,fragmentShader:Oe.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Oe.cube_vert,fragmentShader:Oe.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Oe.equirect_vert,fragmentShader:Oe.equirect_frag},distanceRGBA:{uniforms:Ft([se.common,se.displacementmap,{referencePosition:{value:new C},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Oe.distanceRGBA_vert,fragmentShader:Oe.distanceRGBA_frag},shadow:{uniforms:Ft([se.lights,se.fog,{color:{value:new We(0)},opacity:{value:1}}]),vertexShader:Oe.shadow_vert,fragmentShader:Oe.shadow_frag}};hn.physical={uniforms:Ft([hn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ve},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ve},clearcoatNormalScale:{value:new Ye(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ve},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ve},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ve},sheen:{value:0},sheenColor:{value:new We(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ve},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ve},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ve},transmissionSamplerSize:{value:new Ye},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ve},attenuationDistance:{value:0},attenuationColor:{value:new We(0)},specularColor:{value:new We(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ve},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ve},anisotropyVector:{value:new Ye},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ve}}]),vertexShader:Oe.meshphysical_vert,fragmentShader:Oe.meshphysical_frag};const Fs={r:0,b:0,g:0};function Ed(n,e,t,i,s,r,a){const o=new We(0);let l=r===!0?0:1,c,h,u=null,p=0,g=null;function _(m,f){let E=!1,M=f.isScene===!0?f.background:null;M&&M.isTexture&&(M=(f.backgroundBlurriness>0?t:e).get(M)),M===null?x(o,l):M&&M.isColor&&(x(M,1),E=!0);const w=n.xr.getEnvironmentBlendMode();w==="additive"?i.buffers.color.setClear(0,0,0,1,a):w==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,a),(n.autoClear||E)&&n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil),M&&(M.isCubeTexture||M.mapping===er)?(h===void 0&&(h=new Ie(new lt(1,1,1),new ci({name:"BackgroundCubeMaterial",uniforms:zi(hn.backgroundCube.uniforms),vertexShader:hn.backgroundCube.vertexShader,fragmentShader:hn.backgroundCube.fragmentShader,side:Gt,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(P,A,R){this.matrixWorld.copyPosition(R.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(h)),h.material.uniforms.envMap.value=M,h.material.uniforms.flipEnvMap.value=M.isCubeTexture&&M.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=f.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=f.backgroundIntensity,h.material.toneMapped=Qe.getTransfer(M.colorSpace)!==ot,(u!==M||p!==M.version||g!==n.toneMapping)&&(h.material.needsUpdate=!0,u=M,p=M.version,g=n.toneMapping),h.layers.enableAll(),m.unshift(h,h.geometry,h.material,0,0,null)):M&&M.isTexture&&(c===void 0&&(c=new Ie(new hi(2,2),new ci({name:"BackgroundMaterial",uniforms:zi(hn.background.uniforms),vertexShader:hn.background.vertexShader,fragmentShader:hn.background.fragmentShader,side:Gn,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(c)),c.material.uniforms.t2D.value=M,c.material.uniforms.backgroundIntensity.value=f.backgroundIntensity,c.material.toneMapped=Qe.getTransfer(M.colorSpace)!==ot,M.matrixAutoUpdate===!0&&M.updateMatrix(),c.material.uniforms.uvTransform.value.copy(M.matrix),(u!==M||p!==M.version||g!==n.toneMapping)&&(c.material.needsUpdate=!0,u=M,p=M.version,g=n.toneMapping),c.layers.enableAll(),m.unshift(c,c.geometry,c.material,0,0,null))}function x(m,f){m.getRGB(Fs,Ul(n)),i.buffers.color.setClear(Fs.r,Fs.g,Fs.b,f,a)}return{getClearColor:function(){return o},setClearColor:function(m,f=1){o.set(m),l=f,x(o,l)},getClearAlpha:function(){return l},setClearAlpha:function(m){l=m,x(o,l)},render:_}}function Td(n,e,t,i){const s=n.getParameter(n.MAX_VERTEX_ATTRIBS),r=i.isWebGL2?null:e.get("OES_vertex_array_object"),a=i.isWebGL2||r!==null,o={},l=m(null);let c=l,h=!1;function u(D,B,W,Y,X){let q=!1;if(a){const $=x(Y,W,B);c!==$&&(c=$,g(c.object)),q=f(D,Y,W,X),q&&E(D,Y,W,X)}else{const $=B.wireframe===!0;(c.geometry!==Y.id||c.program!==W.id||c.wireframe!==$)&&(c.geometry=Y.id,c.program=W.id,c.wireframe=$,q=!0)}X!==null&&t.update(X,n.ELEMENT_ARRAY_BUFFER),(q||h)&&(h=!1,H(D,B,W,Y),X!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,t.get(X).buffer))}function p(){return i.isWebGL2?n.createVertexArray():r.createVertexArrayOES()}function g(D){return i.isWebGL2?n.bindVertexArray(D):r.bindVertexArrayOES(D)}function _(D){return i.isWebGL2?n.deleteVertexArray(D):r.deleteVertexArrayOES(D)}function x(D,B,W){const Y=W.wireframe===!0;let X=o[D.id];X===void 0&&(X={},o[D.id]=X);let q=X[B.id];q===void 0&&(q={},X[B.id]=q);let $=q[Y];return $===void 0&&($=m(p()),q[Y]=$),$}function m(D){const B=[],W=[],Y=[];for(let X=0;X<s;X++)B[X]=0,W[X]=0,Y[X]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:B,enabledAttributes:W,attributeDivisors:Y,object:D,attributes:{},index:null}}function f(D,B,W,Y){const X=c.attributes,q=B.attributes;let $=0;const te=W.getAttributes();for(const ne in te)if(te[ne].location>=0){const K=X[ne];let le=q[ne];if(le===void 0&&(ne==="instanceMatrix"&&D.instanceMatrix&&(le=D.instanceMatrix),ne==="instanceColor"&&D.instanceColor&&(le=D.instanceColor)),K===void 0||K.attribute!==le||le&&K.data!==le.data)return!0;$++}return c.attributesNum!==$||c.index!==Y}function E(D,B,W,Y){const X={},q=B.attributes;let $=0;const te=W.getAttributes();for(const ne in te)if(te[ne].location>=0){let K=q[ne];K===void 0&&(ne==="instanceMatrix"&&D.instanceMatrix&&(K=D.instanceMatrix),ne==="instanceColor"&&D.instanceColor&&(K=D.instanceColor));const le={};le.attribute=K,K&&K.data&&(le.data=K.data),X[ne]=le,$++}c.attributes=X,c.attributesNum=$,c.index=Y}function M(){const D=c.newAttributes;for(let B=0,W=D.length;B<W;B++)D[B]=0}function w(D){P(D,0)}function P(D,B){const W=c.newAttributes,Y=c.enabledAttributes,X=c.attributeDivisors;W[D]=1,Y[D]===0&&(n.enableVertexAttribArray(D),Y[D]=1),X[D]!==B&&((i.isWebGL2?n:e.get("ANGLE_instanced_arrays"))[i.isWebGL2?"vertexAttribDivisor":"vertexAttribDivisorANGLE"](D,B),X[D]=B)}function A(){const D=c.newAttributes,B=c.enabledAttributes;for(let W=0,Y=B.length;W<Y;W++)B[W]!==D[W]&&(n.disableVertexAttribArray(W),B[W]=0)}function R(D,B,W,Y,X,q,$){$===!0?n.vertexAttribIPointer(D,B,W,X,q):n.vertexAttribPointer(D,B,W,Y,X,q)}function H(D,B,W,Y){if(i.isWebGL2===!1&&(D.isInstancedMesh||Y.isInstancedBufferGeometry)&&e.get("ANGLE_instanced_arrays")===null)return;M();const X=Y.attributes,q=W.getAttributes(),$=B.defaultAttributeValues;for(const te in q){const ne=q[te];if(ne.location>=0){let V=X[te];if(V===void 0&&(te==="instanceMatrix"&&D.instanceMatrix&&(V=D.instanceMatrix),te==="instanceColor"&&D.instanceColor&&(V=D.instanceColor)),V!==void 0){const K=V.normalized,le=V.itemSize,xe=t.get(V);if(xe===void 0)continue;const _e=xe.buffer,De=xe.type,Ne=xe.bytesPerElement,we=i.isWebGL2===!0&&(De===n.INT||De===n.UNSIGNED_INT||V.gpuType===ml);if(V.isInterleavedBufferAttribute){const $e=V.data,I=$e.stride,Ut=V.offset;if($e.isInstancedInterleavedBuffer){for(let ye=0;ye<ne.locationSize;ye++)P(ne.location+ye,$e.meshPerAttribute);D.isInstancedMesh!==!0&&Y._maxInstanceCount===void 0&&(Y._maxInstanceCount=$e.meshPerAttribute*$e.count)}else for(let ye=0;ye<ne.locationSize;ye++)w(ne.location+ye);n.bindBuffer(n.ARRAY_BUFFER,_e);for(let ye=0;ye<ne.locationSize;ye++)R(ne.location+ye,le/ne.locationSize,De,K,I*Ne,(Ut+le/ne.locationSize*ye)*Ne,we)}else{if(V.isInstancedBufferAttribute){for(let $e=0;$e<ne.locationSize;$e++)P(ne.location+$e,V.meshPerAttribute);D.isInstancedMesh!==!0&&Y._maxInstanceCount===void 0&&(Y._maxInstanceCount=V.meshPerAttribute*V.count)}else for(let $e=0;$e<ne.locationSize;$e++)w(ne.location+$e);n.bindBuffer(n.ARRAY_BUFFER,_e);for(let $e=0;$e<ne.locationSize;$e++)R(ne.location+$e,le/ne.locationSize,De,K,le*Ne,le/ne.locationSize*$e*Ne,we)}}else if($!==void 0){const K=$[te];if(K!==void 0)switch(K.length){case 2:n.vertexAttrib2fv(ne.location,K);break;case 3:n.vertexAttrib3fv(ne.location,K);break;case 4:n.vertexAttrib4fv(ne.location,K);break;default:n.vertexAttrib1fv(ne.location,K)}}}}A()}function S(){k();for(const D in o){const B=o[D];for(const W in B){const Y=B[W];for(const X in Y)_(Y[X].object),delete Y[X];delete B[W]}delete o[D]}}function b(D){if(o[D.id]===void 0)return;const B=o[D.id];for(const W in B){const Y=B[W];for(const X in Y)_(Y[X].object),delete Y[X];delete B[W]}delete o[D.id]}function G(D){for(const B in o){const W=o[B];if(W[D.id]===void 0)continue;const Y=W[D.id];for(const X in Y)_(Y[X].object),delete Y[X];delete W[D.id]}}function k(){ee(),h=!0,c!==l&&(c=l,g(c.object))}function ee(){l.geometry=null,l.program=null,l.wireframe=!1}return{setup:u,reset:k,resetDefaultState:ee,dispose:S,releaseStatesOfGeometry:b,releaseStatesOfProgram:G,initAttributes:M,enableAttribute:w,disableUnusedAttributes:A}}function bd(n,e,t,i){const s=i.isWebGL2;let r;function a(h){r=h}function o(h,u){n.drawArrays(r,h,u),t.update(u,r,1)}function l(h,u,p){if(p===0)return;let g,_;if(s)g=n,_="drawArraysInstanced";else if(g=e.get("ANGLE_instanced_arrays"),_="drawArraysInstancedANGLE",g===null){console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}g[_](r,h,u,p),t.update(u,r,p)}function c(h,u,p){if(p===0)return;const g=e.get("WEBGL_multi_draw");if(g===null)for(let _=0;_<p;_++)this.render(h[_],u[_]);else{g.multiDrawArraysWEBGL(r,h,0,u,0,p);let _=0;for(let x=0;x<p;x++)_+=u[x];t.update(_,r,1)}}this.setMode=a,this.render=o,this.renderInstances=l,this.renderMultiDraw=c}function wd(n,e,t){let i;function s(){if(i!==void 0)return i;if(e.has("EXT_texture_filter_anisotropic")===!0){const R=e.get("EXT_texture_filter_anisotropic");i=n.getParameter(R.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function r(R){if(R==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";R="mediump"}return R==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}const a=typeof WebGL2RenderingContext<"u"&&n.constructor.name==="WebGL2RenderingContext";let o=t.precision!==void 0?t.precision:"highp";const l=r(o);l!==o&&(console.warn("THREE.WebGLRenderer:",o,"not supported, using",l,"instead."),o=l);const c=a||e.has("WEBGL_draw_buffers"),h=t.logarithmicDepthBuffer===!0,u=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),p=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),g=n.getParameter(n.MAX_TEXTURE_SIZE),_=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),x=n.getParameter(n.MAX_VERTEX_ATTRIBS),m=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),f=n.getParameter(n.MAX_VARYING_VECTORS),E=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),M=p>0,w=a||e.has("OES_texture_float"),P=M&&w,A=a?n.getParameter(n.MAX_SAMPLES):0;return{isWebGL2:a,drawBuffers:c,getMaxAnisotropy:s,getMaxPrecision:r,precision:o,logarithmicDepthBuffer:h,maxTextures:u,maxVertexTextures:p,maxTextureSize:g,maxCubemapSize:_,maxAttributes:x,maxVertexUniforms:m,maxVaryings:f,maxFragmentUniforms:E,vertexTextures:M,floatFragmentTextures:w,floatVertexTextures:P,maxSamples:A}}function Ad(n){const e=this;let t=null,i=0,s=!1,r=!1;const a=new ti,o=new Ve,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,p){const g=u.length!==0||p||i!==0||s;return s=p,i=u.length,g},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,p){t=h(u,p,0)},this.setState=function(u,p,g){const _=u.clippingPlanes,x=u.clipIntersection,m=u.clipShadows,f=n.get(u);if(!s||_===null||_.length===0||r&&!m)r?h(null):c();else{const E=r?0:i,M=E*4;let w=f.clippingState||null;l.value=w,w=h(_,p,M,g);for(let P=0;P!==M;++P)w[P]=t[P];f.clippingState=w,this.numIntersection=x?this.numPlanes:0,this.numPlanes+=E}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function h(u,p,g,_){const x=u!==null?u.length:0;let m=null;if(x!==0){if(m=l.value,_!==!0||m===null){const f=g+x*4,E=p.matrixWorldInverse;o.getNormalMatrix(E),(m===null||m.length<f)&&(m=new Float32Array(f));for(let M=0,w=g;M!==x;++M,w+=4)a.copy(u[M]).applyMatrix4(E,o),a.normal.toArray(m,w),m[w+3]=a.constant}l.value=m,l.needsUpdate=!0}return e.numPlanes=x,e.numIntersection=0,m}}function Rd(n){let e=new WeakMap;function t(a,o){return o===jr?a.mapping=Fi:o===Zr&&(a.mapping=Oi),a}function i(a){if(a&&a.isTexture){const o=a.mapping;if(o===jr||o===Zr)if(e.has(a)){const l=e.get(a).texture;return t(l,a.mapping)}else{const l=a.image;if(l&&l.height>0){const c=new zh(l.height/2);return c.fromEquirectangularTexture(n,a),e.set(a,c),a.addEventListener("dispose",s),t(c.texture,a.mapping)}else return null}}return a}function s(a){const o=a.target;o.removeEventListener("dispose",s);const l=e.get(o);l!==void 0&&(e.delete(o),l.dispose())}function r(){e=new WeakMap}return{get:i,dispose:r}}class Ol extends Il{constructor(e=-1,t=1,i=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=i-e,a=i+e,o=s+t,l=s-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,a=r+c*this.view.width,o-=h*this.view.offsetY,l=o-h*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}const Pi=4,Lo=[.125,.215,.35,.446,.526,.582],si=20,Or=new Ol,Po=new We;let Br=null,zr=0,Hr=0;const ni=(1+Math.sqrt(5))/2,Ci=1/ni,Do=[new C(1,1,1),new C(-1,1,1),new C(1,1,-1),new C(-1,1,-1),new C(0,ni,Ci),new C(0,ni,-Ci),new C(Ci,0,ni),new C(-Ci,0,ni),new C(ni,Ci,0),new C(-ni,Ci,0)];class Uo{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,i=.1,s=100){Br=this._renderer.getRenderTarget(),zr=this._renderer.getActiveCubeFace(),Hr=this._renderer.getActiveMipmapLevel(),this._setSize(256);const r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(e,i,s,r),t>0&&this._blur(r,0,0,t),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Fo(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=No(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(Br,zr,Hr),e.scissorTest=!1,Os(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Fi||e.mapping===Oi?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Br=this._renderer.getRenderTarget(),zr=this._renderer.getActiveCubeFace(),Hr=this._renderer.getActiveMipmapLevel();const i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:jt,minFilter:jt,generateMipmaps:!1,type:ts,format:an,colorSpace:Rn,depthBuffer:!1},s=Io(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Io(e,t,i);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Cd(r)),this._blurMaterial=Ld(r,e,t)}return s}_compileMaterial(e){const t=new Ie(this._lodPlanes[0],e);this._renderer.compile(t,Or)}_sceneToCubeUV(e,t,i,s){const o=new Xt(90,1,t,i),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],h=this._renderer,u=h.autoClear,p=h.toneMapping;h.getClearColor(Po),h.toneMapping=zn,h.autoClear=!1;const g=new at({name:"PMREM.Background",side:Gt,depthWrite:!1,depthTest:!1}),_=new Ie(new lt,g);let x=!1;const m=e.background;m?m.isColor&&(g.color.copy(m),e.background=null,x=!0):(g.color.copy(Po),x=!0);for(let f=0;f<6;f++){const E=f%3;E===0?(o.up.set(0,l[f],0),o.lookAt(c[f],0,0)):E===1?(o.up.set(0,0,l[f]),o.lookAt(0,c[f],0)):(o.up.set(0,l[f],0),o.lookAt(0,0,c[f]));const M=this._cubeSize;Os(s,E*M,f>2?M:0,M,M),h.setRenderTarget(s),x&&h.render(_,o),h.render(e,o)}_.geometry.dispose(),_.material.dispose(),h.toneMapping=p,h.autoClear=u,e.background=m}_textureToCubeUV(e,t){const i=this._renderer,s=e.mapping===Fi||e.mapping===Oi;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Fo()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=No());const r=s?this._cubemapMaterial:this._equirectMaterial,a=new Ie(this._lodPlanes[0],r),o=r.uniforms;o.envMap.value=e;const l=this._cubeSize;Os(t,0,0,3*l,2*l),i.setRenderTarget(t),i.render(a,Or)}_applyPMREM(e){const t=this._renderer,i=t.autoClear;t.autoClear=!1;for(let s=1;s<this._lodPlanes.length;s++){const r=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),a=Do[(s-1)%Do.length];this._blur(e,s-1,s,r,a)}t.autoClear=i}_blur(e,t,i,s,r){const a=this._pingPongRenderTarget;this._halfBlur(e,a,t,i,s,"latitudinal",r),this._halfBlur(a,e,i,i,s,"longitudinal",r)}_halfBlur(e,t,i,s,r,a,o){const l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,u=new Ie(this._lodPlanes[s],c),p=c.uniforms,g=this._sizeLods[i]-1,_=isFinite(r)?Math.PI/(2*g):2*Math.PI/(2*si-1),x=r/_,m=isFinite(r)?1+Math.floor(h*x):si;m>si&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${si}`);const f=[];let E=0;for(let R=0;R<si;++R){const H=R/x,S=Math.exp(-H*H/2);f.push(S),R===0?E+=S:R<m&&(E+=2*S)}for(let R=0;R<f.length;R++)f[R]=f[R]/E;p.envMap.value=e.texture,p.samples.value=m,p.weights.value=f,p.latitudinal.value=a==="latitudinal",o&&(p.poleAxis.value=o);const{_lodMax:M}=this;p.dTheta.value=_,p.mipInt.value=M-i;const w=this._sizeLods[s],P=3*w*(s>M-Pi?s-M+Pi:0),A=4*(this._cubeSize-w);Os(t,P,A,3*w,2*w),l.setRenderTarget(t),l.render(u,Or)}}function Cd(n){const e=[],t=[],i=[];let s=n;const r=n-Pi+1+Lo.length;for(let a=0;a<r;a++){const o=Math.pow(2,s);t.push(o);let l=1/o;a>n-Pi?l=Lo[a-n+Pi-1]:a===0&&(l=0),i.push(l);const c=1/(o-2),h=-c,u=1+c,p=[h,h,u,h,u,u,h,h,u,u,h,u],g=6,_=6,x=3,m=2,f=1,E=new Float32Array(x*_*g),M=new Float32Array(m*_*g),w=new Float32Array(f*_*g);for(let A=0;A<g;A++){const R=A%3*2/3-1,H=A>2?0:-1,S=[R,H,0,R+2/3,H,0,R+2/3,H+1,0,R,H,0,R+2/3,H+1,0,R,H+1,0];E.set(S,x*_*A),M.set(p,m*_*A);const b=[A,A,A,A,A,A];w.set(b,f*_*A)}const P=new Dt;P.setAttribute("position",new pn(E,x)),P.setAttribute("uv",new pn(M,m)),P.setAttribute("faceIndex",new pn(w,f)),e.push(P),s>Pi&&s--}return{lodPlanes:e,sizeLods:t,sigmas:i}}function Io(n,e,t){const i=new li(n,e,t);return i.texture.mapping=er,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function Os(n,e,t,i,s){n.viewport.set(e,t,i,s),n.scissor.set(e,t,i,s)}function Ld(n,e,t){const i=new Float32Array(si),s=new C(0,1,0);return new ci({name:"SphericalGaussianBlur",defines:{n:si,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:ha(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Bn,depthTest:!1,depthWrite:!1})}function No(){return new ci({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:ha(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Bn,depthTest:!1,depthWrite:!1})}function Fo(){return new ci({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:ha(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Bn,depthTest:!1,depthWrite:!1})}function ha(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function Pd(n){let e=new WeakMap,t=null;function i(o){if(o&&o.isTexture){const l=o.mapping,c=l===jr||l===Zr,h=l===Fi||l===Oi;if(c||h)if(o.isRenderTargetTexture&&o.needsPMREMUpdate===!0){o.needsPMREMUpdate=!1;let u=e.get(o);return t===null&&(t=new Uo(n)),u=c?t.fromEquirectangular(o,u):t.fromCubemap(o,u),e.set(o,u),u.texture}else{if(e.has(o))return e.get(o).texture;{const u=o.image;if(c&&u&&u.height>0||h&&u&&s(u)){t===null&&(t=new Uo(n));const p=c?t.fromEquirectangular(o):t.fromCubemap(o);return e.set(o,p),o.addEventListener("dispose",r),p.texture}else return null}}}return o}function s(o){let l=0;const c=6;for(let h=0;h<c;h++)o[h]!==void 0&&l++;return l===c}function r(o){const l=o.target;l.removeEventListener("dispose",r);const c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function a(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:i,dispose:a}}function Dd(n){const e={};function t(i){if(e[i]!==void 0)return e[i];let s;switch(i){case"WEBGL_depth_texture":s=n.getExtension("WEBGL_depth_texture")||n.getExtension("MOZ_WEBGL_depth_texture")||n.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=n.getExtension("EXT_texture_filter_anisotropic")||n.getExtension("MOZ_EXT_texture_filter_anisotropic")||n.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=n.getExtension("WEBGL_compressed_texture_s3tc")||n.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=n.getExtension("WEBGL_compressed_texture_pvrtc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=n.getExtension(i)}return e[i]=s,s}return{has:function(i){return t(i)!==null},init:function(i){i.isWebGL2?(t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance")):(t("WEBGL_depth_texture"),t("OES_texture_float"),t("OES_texture_half_float"),t("OES_texture_half_float_linear"),t("OES_standard_derivatives"),t("OES_element_index_uint"),t("OES_vertex_array_object"),t("ANGLE_instanced_arrays")),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture")},get:function(i){const s=t(i);return s===null&&console.warn("THREE.WebGLRenderer: "+i+" extension not supported."),s}}}function Ud(n,e,t,i){const s={},r=new WeakMap;function a(u){const p=u.target;p.index!==null&&e.remove(p.index);for(const _ in p.attributes)e.remove(p.attributes[_]);for(const _ in p.morphAttributes){const x=p.morphAttributes[_];for(let m=0,f=x.length;m<f;m++)e.remove(x[m])}p.removeEventListener("dispose",a),delete s[p.id];const g=r.get(p);g&&(e.remove(g),r.delete(p)),i.releaseStatesOfGeometry(p),p.isInstancedBufferGeometry===!0&&delete p._maxInstanceCount,t.memory.geometries--}function o(u,p){return s[p.id]===!0||(p.addEventListener("dispose",a),s[p.id]=!0,t.memory.geometries++),p}function l(u){const p=u.attributes;for(const _ in p)e.update(p[_],n.ARRAY_BUFFER);const g=u.morphAttributes;for(const _ in g){const x=g[_];for(let m=0,f=x.length;m<f;m++)e.update(x[m],n.ARRAY_BUFFER)}}function c(u){const p=[],g=u.index,_=u.attributes.position;let x=0;if(g!==null){const E=g.array;x=g.version;for(let M=0,w=E.length;M<w;M+=3){const P=E[M+0],A=E[M+1],R=E[M+2];p.push(P,A,A,R,R,P)}}else if(_!==void 0){const E=_.array;x=_.version;for(let M=0,w=E.length/3-1;M<w;M+=3){const P=M+0,A=M+1,R=M+2;p.push(P,A,A,R,R,P)}}else return;const m=new(bl(p)?Dl:Pl)(p,1);m.version=x;const f=r.get(u);f&&e.remove(f),r.set(u,m)}function h(u){const p=r.get(u);if(p){const g=u.index;g!==null&&p.version<g.version&&c(u)}else c(u);return r.get(u)}return{get:o,update:l,getWireframeAttribute:h}}function Id(n,e,t,i){const s=i.isWebGL2;let r;function a(g){r=g}let o,l;function c(g){o=g.type,l=g.bytesPerElement}function h(g,_){n.drawElements(r,_,o,g*l),t.update(_,r,1)}function u(g,_,x){if(x===0)return;let m,f;if(s)m=n,f="drawElementsInstanced";else if(m=e.get("ANGLE_instanced_arrays"),f="drawElementsInstancedANGLE",m===null){console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}m[f](r,_,o,g*l,x),t.update(_,r,x)}function p(g,_,x){if(x===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let f=0;f<x;f++)this.render(g[f]/l,_[f]);else{m.multiDrawElementsWEBGL(r,_,0,o,g,0,x);let f=0;for(let E=0;E<x;E++)f+=_[E];t.update(f,r,1)}}this.setMode=a,this.setIndex=c,this.render=h,this.renderInstances=u,this.renderMultiDraw=p}function Nd(n){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(r,a,o){switch(t.calls++,a){case n.TRIANGLES:t.triangles+=o*(r/3);break;case n.LINES:t.lines+=o*(r/2);break;case n.LINE_STRIP:t.lines+=o*(r-1);break;case n.LINE_LOOP:t.lines+=o*r;break;case n.POINTS:t.points+=o*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:i}}function Fd(n,e){return n[0]-e[0]}function Od(n,e){return Math.abs(e[1])-Math.abs(n[1])}function Bd(n,e,t){const i={},s=new Float32Array(8),r=new WeakMap,a=new ct,o=[];for(let c=0;c<8;c++)o[c]=[c,0];function l(c,h,u){const p=c.morphTargetInfluences;if(e.isWebGL2===!0){const _=h.morphAttributes.position||h.morphAttributes.normal||h.morphAttributes.color,x=_!==void 0?_.length:0;let m=r.get(h);if(m===void 0||m.count!==x){let B=function(){ee.dispose(),r.delete(h),h.removeEventListener("dispose",B)};var g=B;m!==void 0&&m.texture.dispose();const M=h.morphAttributes.position!==void 0,w=h.morphAttributes.normal!==void 0,P=h.morphAttributes.color!==void 0,A=h.morphAttributes.position||[],R=h.morphAttributes.normal||[],H=h.morphAttributes.color||[];let S=0;M===!0&&(S=1),w===!0&&(S=2),P===!0&&(S=3);let b=h.attributes.position.count*S,G=1;b>e.maxTextureSize&&(G=Math.ceil(b/e.maxTextureSize),b=e.maxTextureSize);const k=new Float32Array(b*G*4*x),ee=new Rl(k,b,G,x);ee.type=Nn,ee.needsUpdate=!0;const D=S*4;for(let W=0;W<x;W++){const Y=A[W],X=R[W],q=H[W],$=b*G*4*W;for(let te=0;te<Y.count;te++){const ne=te*D;M===!0&&(a.fromBufferAttribute(Y,te),k[$+ne+0]=a.x,k[$+ne+1]=a.y,k[$+ne+2]=a.z,k[$+ne+3]=0),w===!0&&(a.fromBufferAttribute(X,te),k[$+ne+4]=a.x,k[$+ne+5]=a.y,k[$+ne+6]=a.z,k[$+ne+7]=0),P===!0&&(a.fromBufferAttribute(q,te),k[$+ne+8]=a.x,k[$+ne+9]=a.y,k[$+ne+10]=a.z,k[$+ne+11]=q.itemSize===4?a.w:1)}}m={count:x,texture:ee,size:new Ye(b,G)},r.set(h,m),h.addEventListener("dispose",B)}let f=0;for(let M=0;M<p.length;M++)f+=p[M];const E=h.morphTargetsRelative?1:1-f;u.getUniforms().setValue(n,"morphTargetBaseInfluence",E),u.getUniforms().setValue(n,"morphTargetInfluences",p),u.getUniforms().setValue(n,"morphTargetsTexture",m.texture,t),u.getUniforms().setValue(n,"morphTargetsTextureSize",m.size)}else{const _=p===void 0?0:p.length;let x=i[h.id];if(x===void 0||x.length!==_){x=[];for(let w=0;w<_;w++)x[w]=[w,0];i[h.id]=x}for(let w=0;w<_;w++){const P=x[w];P[0]=w,P[1]=p[w]}x.sort(Od);for(let w=0;w<8;w++)w<_&&x[w][1]?(o[w][0]=x[w][0],o[w][1]=x[w][1]):(o[w][0]=Number.MAX_SAFE_INTEGER,o[w][1]=0);o.sort(Fd);const m=h.morphAttributes.position,f=h.morphAttributes.normal;let E=0;for(let w=0;w<8;w++){const P=o[w],A=P[0],R=P[1];A!==Number.MAX_SAFE_INTEGER&&R?(m&&h.getAttribute("morphTarget"+w)!==m[A]&&h.setAttribute("morphTarget"+w,m[A]),f&&h.getAttribute("morphNormal"+w)!==f[A]&&h.setAttribute("morphNormal"+w,f[A]),s[w]=R,E+=R):(m&&h.hasAttribute("morphTarget"+w)===!0&&h.deleteAttribute("morphTarget"+w),f&&h.hasAttribute("morphNormal"+w)===!0&&h.deleteAttribute("morphNormal"+w),s[w]=0)}const M=h.morphTargetsRelative?1:1-E;u.getUniforms().setValue(n,"morphTargetBaseInfluence",M),u.getUniforms().setValue(n,"morphTargetInfluences",s)}}return{update:l}}function zd(n,e,t,i){let s=new WeakMap;function r(l){const c=i.render.frame,h=l.geometry,u=e.get(l,h);if(s.get(u)!==c&&(e.update(u),s.set(u,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",o)===!1&&l.addEventListener("dispose",o),s.get(l)!==c&&(t.update(l.instanceMatrix,n.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,n.ARRAY_BUFFER),s.set(l,c))),l.isSkinnedMesh){const p=l.skeleton;s.get(p)!==c&&(p.update(),s.set(p,c))}return u}function a(){s=new WeakMap}function o(l){const c=l.target;c.removeEventListener("dispose",o),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:r,dispose:a}}class Bl extends qt{constructor(e,t,i,s,r,a,o,l,c,h){if(h=h!==void 0?h:ai,h!==ai&&h!==Bi)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");i===void 0&&h===ai&&(i=In),i===void 0&&h===Bi&&(i=ri),super(null,s,r,a,o,l,h,i,c),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=o!==void 0?o:Ot,this.minFilter=l!==void 0?l:Ot,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}const zl=new qt,Hl=new Bl(1,1);Hl.compareFunction=Tl;const Gl=new Rl,kl=new yh,Vl=new Nl,Oo=[],Bo=[],zo=new Float32Array(16),Ho=new Float32Array(9),Go=new Float32Array(4);function ki(n,e,t){const i=n[0];if(i<=0||i>0)return n;const s=e*t;let r=Oo[s];if(r===void 0&&(r=new Float32Array(s),Oo[s]=r),e!==0){i.toArray(r,0);for(let a=1,o=0;a!==e;++a)o+=t,n[a].toArray(r,o)}return r}function St(n,e){if(n.length!==e.length)return!1;for(let t=0,i=n.length;t<i;t++)if(n[t]!==e[t])return!1;return!0}function yt(n,e){for(let t=0,i=e.length;t<i;t++)n[t]=e[t]}function ir(n,e){let t=Bo[e];t===void 0&&(t=new Int32Array(e),Bo[e]=t);for(let i=0;i!==e;++i)t[i]=n.allocateTextureUnit();return t}function Hd(n,e){const t=this.cache;t[0]!==e&&(n.uniform1f(this.addr,e),t[0]=e)}function Gd(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(St(t,e))return;n.uniform2fv(this.addr,e),yt(t,e)}}function kd(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(St(t,e))return;n.uniform3fv(this.addr,e),yt(t,e)}}function Vd(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(St(t,e))return;n.uniform4fv(this.addr,e),yt(t,e)}}function Wd(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(St(t,e))return;n.uniformMatrix2fv(this.addr,!1,e),yt(t,e)}else{if(St(t,i))return;Go.set(i),n.uniformMatrix2fv(this.addr,!1,Go),yt(t,i)}}function Xd(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(St(t,e))return;n.uniformMatrix3fv(this.addr,!1,e),yt(t,e)}else{if(St(t,i))return;Ho.set(i),n.uniformMatrix3fv(this.addr,!1,Ho),yt(t,i)}}function qd(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(St(t,e))return;n.uniformMatrix4fv(this.addr,!1,e),yt(t,e)}else{if(St(t,i))return;zo.set(i),n.uniformMatrix4fv(this.addr,!1,zo),yt(t,i)}}function Yd(n,e){const t=this.cache;t[0]!==e&&(n.uniform1i(this.addr,e),t[0]=e)}function $d(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(St(t,e))return;n.uniform2iv(this.addr,e),yt(t,e)}}function Kd(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(St(t,e))return;n.uniform3iv(this.addr,e),yt(t,e)}}function jd(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(St(t,e))return;n.uniform4iv(this.addr,e),yt(t,e)}}function Zd(n,e){const t=this.cache;t[0]!==e&&(n.uniform1ui(this.addr,e),t[0]=e)}function Jd(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(St(t,e))return;n.uniform2uiv(this.addr,e),yt(t,e)}}function Qd(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(St(t,e))return;n.uniform3uiv(this.addr,e),yt(t,e)}}function ep(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(St(t,e))return;n.uniform4uiv(this.addr,e),yt(t,e)}}function tp(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s);const r=this.type===n.SAMPLER_2D_SHADOW?Hl:zl;t.setTexture2D(e||r,s)}function np(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTexture3D(e||kl,s)}function ip(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTextureCube(e||Vl,s)}function sp(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTexture2DArray(e||Gl,s)}function rp(n){switch(n){case 5126:return Hd;case 35664:return Gd;case 35665:return kd;case 35666:return Vd;case 35674:return Wd;case 35675:return Xd;case 35676:return qd;case 5124:case 35670:return Yd;case 35667:case 35671:return $d;case 35668:case 35672:return Kd;case 35669:case 35673:return jd;case 5125:return Zd;case 36294:return Jd;case 36295:return Qd;case 36296:return ep;case 35678:case 36198:case 36298:case 36306:case 35682:return tp;case 35679:case 36299:case 36307:return np;case 35680:case 36300:case 36308:case 36293:return ip;case 36289:case 36303:case 36311:case 36292:return sp}}function ap(n,e){n.uniform1fv(this.addr,e)}function op(n,e){const t=ki(e,this.size,2);n.uniform2fv(this.addr,t)}function lp(n,e){const t=ki(e,this.size,3);n.uniform3fv(this.addr,t)}function cp(n,e){const t=ki(e,this.size,4);n.uniform4fv(this.addr,t)}function hp(n,e){const t=ki(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,t)}function up(n,e){const t=ki(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,t)}function fp(n,e){const t=ki(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,t)}function dp(n,e){n.uniform1iv(this.addr,e)}function pp(n,e){n.uniform2iv(this.addr,e)}function mp(n,e){n.uniform3iv(this.addr,e)}function gp(n,e){n.uniform4iv(this.addr,e)}function _p(n,e){n.uniform1uiv(this.addr,e)}function xp(n,e){n.uniform2uiv(this.addr,e)}function vp(n,e){n.uniform3uiv(this.addr,e)}function Mp(n,e){n.uniform4uiv(this.addr,e)}function Sp(n,e,t){const i=this.cache,s=e.length,r=ir(t,s);St(i,r)||(n.uniform1iv(this.addr,r),yt(i,r));for(let a=0;a!==s;++a)t.setTexture2D(e[a]||zl,r[a])}function yp(n,e,t){const i=this.cache,s=e.length,r=ir(t,s);St(i,r)||(n.uniform1iv(this.addr,r),yt(i,r));for(let a=0;a!==s;++a)t.setTexture3D(e[a]||kl,r[a])}function Ep(n,e,t){const i=this.cache,s=e.length,r=ir(t,s);St(i,r)||(n.uniform1iv(this.addr,r),yt(i,r));for(let a=0;a!==s;++a)t.setTextureCube(e[a]||Vl,r[a])}function Tp(n,e,t){const i=this.cache,s=e.length,r=ir(t,s);St(i,r)||(n.uniform1iv(this.addr,r),yt(i,r));for(let a=0;a!==s;++a)t.setTexture2DArray(e[a]||Gl,r[a])}function bp(n){switch(n){case 5126:return ap;case 35664:return op;case 35665:return lp;case 35666:return cp;case 35674:return hp;case 35675:return up;case 35676:return fp;case 5124:case 35670:return dp;case 35667:case 35671:return pp;case 35668:case 35672:return mp;case 35669:case 35673:return gp;case 5125:return _p;case 36294:return xp;case 36295:return vp;case 36296:return Mp;case 35678:case 36198:case 36298:case 36306:case 35682:return Sp;case 35679:case 36299:case 36307:return yp;case 35680:case 36300:case 36308:case 36293:return Ep;case 36289:case 36303:case 36311:case 36292:return Tp}}class wp{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=rp(t.type)}}class Ap{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=bp(t.type)}}class Rp{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){const s=this.seq;for(let r=0,a=s.length;r!==a;++r){const o=s[r];o.setValue(e,t[o.id],i)}}}const Gr=/(\w+)(\])?(\[|\.)?/g;function ko(n,e){n.seq.push(e),n.map[e.id]=e}function Cp(n,e,t){const i=n.name,s=i.length;for(Gr.lastIndex=0;;){const r=Gr.exec(i),a=Gr.lastIndex;let o=r[1];const l=r[2]==="]",c=r[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===s){ko(t,c===void 0?new wp(o,n,e):new Ap(o,n,e));break}else{let u=t.map[o];u===void 0&&(u=new Rp(o),ko(t,u)),t=u}}}class ks{constructor(e,t){this.seq=[],this.map={};const i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let s=0;s<i;++s){const r=e.getActiveUniform(t,s),a=e.getUniformLocation(t,r.name);Cp(r,a,this)}}setValue(e,t,i,s){const r=this.map[t];r!==void 0&&r.setValue(e,i,s)}setOptional(e,t,i){const s=t[i];s!==void 0&&this.setValue(e,i,s)}static upload(e,t,i,s){for(let r=0,a=t.length;r!==a;++r){const o=t[r],l=i[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,s)}}static seqWithValue(e,t){const i=[];for(let s=0,r=e.length;s!==r;++s){const a=e[s];a.id in t&&i.push(a)}return i}}function Vo(n,e,t){const i=n.createShader(e);return n.shaderSource(i,t),n.compileShader(i),i}const Lp=37297;let Pp=0;function Dp(n,e){const t=n.split(`
`),i=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let a=s;a<r;a++){const o=a+1;i.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return i.join(`
`)}function Up(n){const e=Qe.getPrimaries(Qe.workingColorSpace),t=Qe.getPrimaries(n);let i;switch(e===t?i="":e===Ys&&t===qs?i="LinearDisplayP3ToLinearSRGB":e===qs&&t===Ys&&(i="LinearSRGBToLinearDisplayP3"),n){case Rn:case tr:return[i,"LinearTransferOETF"];case At:case oa:return[i,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",n),[i,"LinearTransferOETF"]}}function Wo(n,e,t){const i=n.getShaderParameter(e,n.COMPILE_STATUS),s=n.getShaderInfoLog(e).trim();if(i&&s==="")return"";const r=/ERROR: 0:(\d+)/.exec(s);if(r){const a=parseInt(r[1]);return t.toUpperCase()+`

`+s+`

`+Dp(n.getShaderSource(e),a)}else return s}function Ip(n,e){const t=Up(e);return`vec4 ${n}( vec4 value ) { return ${t[0]}( ${t[1]}( value ) ); }`}function Np(n,e){let t;switch(e){case Xc:t="Linear";break;case qc:t="Reinhard";break;case Yc:t="OptimizedCineon";break;case $c:t="ACESFilmic";break;case jc:t="AgX";break;case Kc:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+n+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}function Fp(n){return[n.extensionDerivatives||n.envMapCubeUVHeight||n.bumpMap||n.normalMapTangentSpace||n.clearcoatNormalMap||n.flatShading||n.shaderID==="physical"?"#extension GL_OES_standard_derivatives : enable":"",(n.extensionFragDepth||n.logarithmicDepthBuffer)&&n.rendererExtensionFragDepth?"#extension GL_EXT_frag_depth : enable":"",n.extensionDrawBuffers&&n.rendererExtensionDrawBuffers?"#extension GL_EXT_draw_buffers : require":"",(n.extensionShaderTextureLOD||n.envMap||n.transmission)&&n.rendererExtensionShaderTextureLod?"#extension GL_EXT_shader_texture_lod : enable":""].filter(Di).join(`
`)}function Op(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":""].filter(Di).join(`
`)}function Bp(n){const e=[];for(const t in n){const i=n[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function zp(n,e){const t={},i=n.getProgramParameter(e,n.ACTIVE_ATTRIBUTES);for(let s=0;s<i;s++){const r=n.getActiveAttrib(e,s),a=r.name;let o=1;r.type===n.FLOAT_MAT2&&(o=2),r.type===n.FLOAT_MAT3&&(o=3),r.type===n.FLOAT_MAT4&&(o=4),t[a]={type:r.type,location:n.getAttribLocation(e,a),locationSize:o}}return t}function Di(n){return n!==""}function Xo(n,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function qo(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const Hp=/^[ \t]*#include +<([\w\d./]+)>/gm;function ia(n){return n.replace(Hp,kp)}const Gp=new Map([["encodings_fragment","colorspace_fragment"],["encodings_pars_fragment","colorspace_pars_fragment"],["output_fragment","opaque_fragment"]]);function kp(n,e){let t=Oe[e];if(t===void 0){const i=Gp.get(e);if(i!==void 0)t=Oe[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("Can not resolve #include <"+e+">")}return ia(t)}const Vp=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Yo(n){return n.replace(Vp,Wp)}function Wp(n,e,t,i){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=i.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function $o(n){let e="precision "+n.precision+` float;
precision `+n.precision+" int;";return n.precision==="highp"?e+=`
#define HIGH_PRECISION`:n.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:n.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function Xp(n){let e="SHADOWMAP_TYPE_BASIC";return n.shadowMapType===ul?e="SHADOWMAP_TYPE_PCF":n.shadowMapType===fl?e="SHADOWMAP_TYPE_PCF_SOFT":n.shadowMapType===yn&&(e="SHADOWMAP_TYPE_VSM"),e}function qp(n){let e="ENVMAP_TYPE_CUBE";if(n.envMap)switch(n.envMapMode){case Fi:case Oi:e="ENVMAP_TYPE_CUBE";break;case er:e="ENVMAP_TYPE_CUBE_UV";break}return e}function Yp(n){let e="ENVMAP_MODE_REFLECTION";if(n.envMap)switch(n.envMapMode){case Oi:e="ENVMAP_MODE_REFRACTION";break}return e}function $p(n){let e="ENVMAP_BLENDING_NONE";if(n.envMap)switch(n.combine){case dl:e="ENVMAP_BLENDING_MULTIPLY";break;case Vc:e="ENVMAP_BLENDING_MIX";break;case Wc:e="ENVMAP_BLENDING_ADD";break}return e}function Kp(n){const e=n.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:i,maxMip:t}}function jp(n,e,t,i){const s=n.getContext(),r=t.defines;let a=t.vertexShader,o=t.fragmentShader;const l=Xp(t),c=qp(t),h=Yp(t),u=$p(t),p=Kp(t),g=t.isWebGL2?"":Fp(t),_=Op(t),x=Bp(r),m=s.createProgram();let f,E,M=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(f=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,x].filter(Di).join(`
`),f.length>0&&(f+=`
`),E=[g,"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,x].filter(Di).join(`
`),E.length>0&&(E+=`
`)):(f=[$o(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,x,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors&&t.isWebGL2?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Di).join(`
`),E=[g,$o(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,x,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+h:"",t.envMap?"#define "+u:"",p?"#define CUBEUV_TEXEL_WIDTH "+p.texelWidth:"",p?"#define CUBEUV_TEXEL_HEIGHT "+p.texelHeight:"",p?"#define CUBEUV_MAX_MIP "+p.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==zn?"#define TONE_MAPPING":"",t.toneMapping!==zn?Oe.tonemapping_pars_fragment:"",t.toneMapping!==zn?Np("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Oe.colorspace_pars_fragment,Ip("linearToOutputTexel",t.outputColorSpace),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Di).join(`
`)),a=ia(a),a=Xo(a,t),a=qo(a,t),o=ia(o),o=Xo(o,t),o=qo(o,t),a=Yo(a),o=Yo(o),t.isWebGL2&&t.isRawShaderMaterial!==!0&&(M=`#version 300 es
`,f=[_,"precision mediump sampler2DArray;","#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+f,E=["precision mediump sampler2DArray;","#define varying in",t.glslVersion===uo?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===uo?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+E);const w=M+f+a,P=M+E+o,A=Vo(s,s.VERTEX_SHADER,w),R=Vo(s,s.FRAGMENT_SHADER,P);s.attachShader(m,A),s.attachShader(m,R),t.index0AttributeName!==void 0?s.bindAttribLocation(m,0,t.index0AttributeName):t.morphTargets===!0&&s.bindAttribLocation(m,0,"position"),s.linkProgram(m);function H(k){if(n.debug.checkShaderErrors){const ee=s.getProgramInfoLog(m).trim(),D=s.getShaderInfoLog(A).trim(),B=s.getShaderInfoLog(R).trim();let W=!0,Y=!0;if(s.getProgramParameter(m,s.LINK_STATUS)===!1)if(W=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(s,m,A,R);else{const X=Wo(s,A,"vertex"),q=Wo(s,R,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(m,s.VALIDATE_STATUS)+`

Program Info Log: `+ee+`
`+X+`
`+q)}else ee!==""?console.warn("THREE.WebGLProgram: Program Info Log:",ee):(D===""||B==="")&&(Y=!1);Y&&(k.diagnostics={runnable:W,programLog:ee,vertexShader:{log:D,prefix:f},fragmentShader:{log:B,prefix:E}})}s.deleteShader(A),s.deleteShader(R),S=new ks(s,m),b=zp(s,m)}let S;this.getUniforms=function(){return S===void 0&&H(this),S};let b;this.getAttributes=function(){return b===void 0&&H(this),b};let G=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return G===!1&&(G=s.getProgramParameter(m,Lp)),G},this.destroy=function(){i.releaseStatesOfProgram(this),s.deleteProgram(m),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=Pp++,this.cacheKey=e,this.usedTimes=1,this.program=m,this.vertexShader=A,this.fragmentShader=R,this}let Zp=0;class Jp{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,i=e.fragmentShader,s=this._getShaderStage(t),r=this._getShaderStage(i),a=this._getShaderCacheForMaterial(e);return a.has(s)===!1&&(a.add(s),s.usedTimes++),a.has(r)===!1&&(a.add(r),r.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){const t=this.shaderCache;let i=t.get(e);return i===void 0&&(i=new Qp(e),t.set(e,i)),i}}class Qp{constructor(e){this.id=Zp++,this.code=e,this.usedTimes=0}}function em(n,e,t,i,s,r,a){const o=new Cl,l=new Jp,c=[],h=s.isWebGL2,u=s.logarithmicDepthBuffer,p=s.vertexTextures;let g=s.precision;const _={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function x(S){return S===0?"uv":`uv${S}`}function m(S,b,G,k,ee){const D=k.fog,B=ee.geometry,W=S.isMeshStandardMaterial?k.environment:null,Y=(S.isMeshStandardMaterial?t:e).get(S.envMap||W),X=Y&&Y.mapping===er?Y.image.height:null,q=_[S.type];S.precision!==null&&(g=s.getMaxPrecision(S.precision),g!==S.precision&&console.warn("THREE.WebGLProgram.getParameters:",S.precision,"not supported, using",g,"instead."));const $=B.morphAttributes.position||B.morphAttributes.normal||B.morphAttributes.color,te=$!==void 0?$.length:0;let ne=0;B.morphAttributes.position!==void 0&&(ne=1),B.morphAttributes.normal!==void 0&&(ne=2),B.morphAttributes.color!==void 0&&(ne=3);let V,K,le,xe;if(q){const It=hn[q];V=It.vertexShader,K=It.fragmentShader}else V=S.vertexShader,K=S.fragmentShader,l.update(S),le=l.getVertexShaderID(S),xe=l.getFragmentShaderID(S);const _e=n.getRenderTarget(),De=ee.isInstancedMesh===!0,Ne=ee.isBatchedMesh===!0,we=!!S.map,$e=!!S.matcap,I=!!Y,Ut=!!S.aoMap,ye=!!S.lightMap,Le=!!S.bumpMap,pe=!!S.normalMap,ut=!!S.displacementMap,Be=!!S.emissiveMap,T=!!S.metalnessMap,v=!!S.roughnessMap,F=S.anisotropy>0,J=S.clearcoat>0,Z=S.iridescence>0,Q=S.sheen>0,me=S.transmission>0,oe=F&&!!S.anisotropyMap,ue=J&&!!S.clearcoatMap,be=J&&!!S.clearcoatNormalMap,ze=J&&!!S.clearcoatRoughnessMap,j=Z&&!!S.iridescenceMap,Je=Z&&!!S.iridescenceThicknessMap,qe=Q&&!!S.sheenColorMap,Ce=Q&&!!S.sheenRoughnessMap,Me=!!S.specularMap,fe=!!S.specularColorMap,Fe=!!S.specularIntensityMap,Ze=me&&!!S.transmissionMap,dt=me&&!!S.thicknessMap,Ge=!!S.gradientMap,ie=!!S.alphaMap,L=S.alphaTest>0,re=!!S.alphaHash,ae=!!S.extensions,Ae=!!B.attributes.uv1,Ee=!!B.attributes.uv2,it=!!B.attributes.uv3;let st=zn;return S.toneMapped&&(_e===null||_e.isXRRenderTarget===!0)&&(st=n.toneMapping),{isWebGL2:h,shaderID:q,shaderType:S.type,shaderName:S.name,vertexShader:V,fragmentShader:K,defines:S.defines,customVertexShaderID:le,customFragmentShaderID:xe,isRawShaderMaterial:S.isRawShaderMaterial===!0,glslVersion:S.glslVersion,precision:g,batching:Ne,instancing:De,instancingColor:De&&ee.instanceColor!==null,supportsVertexTextures:p,outputColorSpace:_e===null?n.outputColorSpace:_e.isXRRenderTarget===!0?_e.texture.colorSpace:Rn,map:we,matcap:$e,envMap:I,envMapMode:I&&Y.mapping,envMapCubeUVHeight:X,aoMap:Ut,lightMap:ye,bumpMap:Le,normalMap:pe,displacementMap:p&&ut,emissiveMap:Be,normalMapObjectSpace:pe&&S.normalMapType===lh,normalMapTangentSpace:pe&&S.normalMapType===El,metalnessMap:T,roughnessMap:v,anisotropy:F,anisotropyMap:oe,clearcoat:J,clearcoatMap:ue,clearcoatNormalMap:be,clearcoatRoughnessMap:ze,iridescence:Z,iridescenceMap:j,iridescenceThicknessMap:Je,sheen:Q,sheenColorMap:qe,sheenRoughnessMap:Ce,specularMap:Me,specularColorMap:fe,specularIntensityMap:Fe,transmission:me,transmissionMap:Ze,thicknessMap:dt,gradientMap:Ge,opaque:S.transparent===!1&&S.blending===Ui,alphaMap:ie,alphaTest:L,alphaHash:re,combine:S.combine,mapUv:we&&x(S.map.channel),aoMapUv:Ut&&x(S.aoMap.channel),lightMapUv:ye&&x(S.lightMap.channel),bumpMapUv:Le&&x(S.bumpMap.channel),normalMapUv:pe&&x(S.normalMap.channel),displacementMapUv:ut&&x(S.displacementMap.channel),emissiveMapUv:Be&&x(S.emissiveMap.channel),metalnessMapUv:T&&x(S.metalnessMap.channel),roughnessMapUv:v&&x(S.roughnessMap.channel),anisotropyMapUv:oe&&x(S.anisotropyMap.channel),clearcoatMapUv:ue&&x(S.clearcoatMap.channel),clearcoatNormalMapUv:be&&x(S.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ze&&x(S.clearcoatRoughnessMap.channel),iridescenceMapUv:j&&x(S.iridescenceMap.channel),iridescenceThicknessMapUv:Je&&x(S.iridescenceThicknessMap.channel),sheenColorMapUv:qe&&x(S.sheenColorMap.channel),sheenRoughnessMapUv:Ce&&x(S.sheenRoughnessMap.channel),specularMapUv:Me&&x(S.specularMap.channel),specularColorMapUv:fe&&x(S.specularColorMap.channel),specularIntensityMapUv:Fe&&x(S.specularIntensityMap.channel),transmissionMapUv:Ze&&x(S.transmissionMap.channel),thicknessMapUv:dt&&x(S.thicknessMap.channel),alphaMapUv:ie&&x(S.alphaMap.channel),vertexTangents:!!B.attributes.tangent&&(pe||F),vertexColors:S.vertexColors,vertexAlphas:S.vertexColors===!0&&!!B.attributes.color&&B.attributes.color.itemSize===4,vertexUv1s:Ae,vertexUv2s:Ee,vertexUv3s:it,pointsUvs:ee.isPoints===!0&&!!B.attributes.uv&&(we||ie),fog:!!D,useFog:S.fog===!0,fogExp2:D&&D.isFogExp2,flatShading:S.flatShading===!0,sizeAttenuation:S.sizeAttenuation===!0,logarithmicDepthBuffer:u,skinning:ee.isSkinnedMesh===!0,morphTargets:B.morphAttributes.position!==void 0,morphNormals:B.morphAttributes.normal!==void 0,morphColors:B.morphAttributes.color!==void 0,morphTargetsCount:te,morphTextureStride:ne,numDirLights:b.directional.length,numPointLights:b.point.length,numSpotLights:b.spot.length,numSpotLightMaps:b.spotLightMap.length,numRectAreaLights:b.rectArea.length,numHemiLights:b.hemi.length,numDirLightShadows:b.directionalShadowMap.length,numPointLightShadows:b.pointShadowMap.length,numSpotLightShadows:b.spotShadowMap.length,numSpotLightShadowsWithMaps:b.numSpotLightShadowsWithMaps,numLightProbes:b.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:S.dithering,shadowMapEnabled:n.shadowMap.enabled&&G.length>0,shadowMapType:n.shadowMap.type,toneMapping:st,useLegacyLights:n._useLegacyLights,decodeVideoTexture:we&&S.map.isVideoTexture===!0&&Qe.getTransfer(S.map.colorSpace)===ot,premultipliedAlpha:S.premultipliedAlpha,doubleSided:S.side===fn,flipSided:S.side===Gt,useDepthPacking:S.depthPacking>=0,depthPacking:S.depthPacking||0,index0AttributeName:S.index0AttributeName,extensionDerivatives:ae&&S.extensions.derivatives===!0,extensionFragDepth:ae&&S.extensions.fragDepth===!0,extensionDrawBuffers:ae&&S.extensions.drawBuffers===!0,extensionShaderTextureLOD:ae&&S.extensions.shaderTextureLOD===!0,extensionClipCullDistance:ae&&S.extensions.clipCullDistance&&i.has("WEBGL_clip_cull_distance"),rendererExtensionFragDepth:h||i.has("EXT_frag_depth"),rendererExtensionDrawBuffers:h||i.has("WEBGL_draw_buffers"),rendererExtensionShaderTextureLod:h||i.has("EXT_shader_texture_lod"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:S.customProgramCacheKey()}}function f(S){const b=[];if(S.shaderID?b.push(S.shaderID):(b.push(S.customVertexShaderID),b.push(S.customFragmentShaderID)),S.defines!==void 0)for(const G in S.defines)b.push(G),b.push(S.defines[G]);return S.isRawShaderMaterial===!1&&(E(b,S),M(b,S),b.push(n.outputColorSpace)),b.push(S.customProgramCacheKey),b.join()}function E(S,b){S.push(b.precision),S.push(b.outputColorSpace),S.push(b.envMapMode),S.push(b.envMapCubeUVHeight),S.push(b.mapUv),S.push(b.alphaMapUv),S.push(b.lightMapUv),S.push(b.aoMapUv),S.push(b.bumpMapUv),S.push(b.normalMapUv),S.push(b.displacementMapUv),S.push(b.emissiveMapUv),S.push(b.metalnessMapUv),S.push(b.roughnessMapUv),S.push(b.anisotropyMapUv),S.push(b.clearcoatMapUv),S.push(b.clearcoatNormalMapUv),S.push(b.clearcoatRoughnessMapUv),S.push(b.iridescenceMapUv),S.push(b.iridescenceThicknessMapUv),S.push(b.sheenColorMapUv),S.push(b.sheenRoughnessMapUv),S.push(b.specularMapUv),S.push(b.specularColorMapUv),S.push(b.specularIntensityMapUv),S.push(b.transmissionMapUv),S.push(b.thicknessMapUv),S.push(b.combine),S.push(b.fogExp2),S.push(b.sizeAttenuation),S.push(b.morphTargetsCount),S.push(b.morphAttributeCount),S.push(b.numDirLights),S.push(b.numPointLights),S.push(b.numSpotLights),S.push(b.numSpotLightMaps),S.push(b.numHemiLights),S.push(b.numRectAreaLights),S.push(b.numDirLightShadows),S.push(b.numPointLightShadows),S.push(b.numSpotLightShadows),S.push(b.numSpotLightShadowsWithMaps),S.push(b.numLightProbes),S.push(b.shadowMapType),S.push(b.toneMapping),S.push(b.numClippingPlanes),S.push(b.numClipIntersection),S.push(b.depthPacking)}function M(S,b){o.disableAll(),b.isWebGL2&&o.enable(0),b.supportsVertexTextures&&o.enable(1),b.instancing&&o.enable(2),b.instancingColor&&o.enable(3),b.matcap&&o.enable(4),b.envMap&&o.enable(5),b.normalMapObjectSpace&&o.enable(6),b.normalMapTangentSpace&&o.enable(7),b.clearcoat&&o.enable(8),b.iridescence&&o.enable(9),b.alphaTest&&o.enable(10),b.vertexColors&&o.enable(11),b.vertexAlphas&&o.enable(12),b.vertexUv1s&&o.enable(13),b.vertexUv2s&&o.enable(14),b.vertexUv3s&&o.enable(15),b.vertexTangents&&o.enable(16),b.anisotropy&&o.enable(17),b.alphaHash&&o.enable(18),b.batching&&o.enable(19),S.push(o.mask),o.disableAll(),b.fog&&o.enable(0),b.useFog&&o.enable(1),b.flatShading&&o.enable(2),b.logarithmicDepthBuffer&&o.enable(3),b.skinning&&o.enable(4),b.morphTargets&&o.enable(5),b.morphNormals&&o.enable(6),b.morphColors&&o.enable(7),b.premultipliedAlpha&&o.enable(8),b.shadowMapEnabled&&o.enable(9),b.useLegacyLights&&o.enable(10),b.doubleSided&&o.enable(11),b.flipSided&&o.enable(12),b.useDepthPacking&&o.enable(13),b.dithering&&o.enable(14),b.transmission&&o.enable(15),b.sheen&&o.enable(16),b.opaque&&o.enable(17),b.pointsUvs&&o.enable(18),b.decodeVideoTexture&&o.enable(19),S.push(o.mask)}function w(S){const b=_[S.type];let G;if(b){const k=hn[b];G=Nh.clone(k.uniforms)}else G=S.uniforms;return G}function P(S,b){let G;for(let k=0,ee=c.length;k<ee;k++){const D=c[k];if(D.cacheKey===b){G=D,++G.usedTimes;break}}return G===void 0&&(G=new jp(n,b,S,r),c.push(G)),G}function A(S){if(--S.usedTimes===0){const b=c.indexOf(S);c[b]=c[c.length-1],c.pop(),S.destroy()}}function R(S){l.remove(S)}function H(){l.dispose()}return{getParameters:m,getProgramCacheKey:f,getUniforms:w,acquireProgram:P,releaseProgram:A,releaseShaderCache:R,programs:c,dispose:H}}function tm(){let n=new WeakMap;function e(r){let a=n.get(r);return a===void 0&&(a={},n.set(r,a)),a}function t(r){n.delete(r)}function i(r,a,o){n.get(r)[a]=o}function s(){n=new WeakMap}return{get:e,remove:t,update:i,dispose:s}}function nm(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.z!==e.z?n.z-e.z:n.id-e.id}function Ko(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function jo(){const n=[];let e=0;const t=[],i=[],s=[];function r(){e=0,t.length=0,i.length=0,s.length=0}function a(u,p,g,_,x,m){let f=n[e];return f===void 0?(f={id:u.id,object:u,geometry:p,material:g,groupOrder:_,renderOrder:u.renderOrder,z:x,group:m},n[e]=f):(f.id=u.id,f.object=u,f.geometry=p,f.material=g,f.groupOrder=_,f.renderOrder=u.renderOrder,f.z=x,f.group=m),e++,f}function o(u,p,g,_,x,m){const f=a(u,p,g,_,x,m);g.transmission>0?i.push(f):g.transparent===!0?s.push(f):t.push(f)}function l(u,p,g,_,x,m){const f=a(u,p,g,_,x,m);g.transmission>0?i.unshift(f):g.transparent===!0?s.unshift(f):t.unshift(f)}function c(u,p){t.length>1&&t.sort(u||nm),i.length>1&&i.sort(p||Ko),s.length>1&&s.sort(p||Ko)}function h(){for(let u=e,p=n.length;u<p;u++){const g=n[u];if(g.id===null)break;g.id=null,g.object=null,g.geometry=null,g.material=null,g.group=null}}return{opaque:t,transmissive:i,transparent:s,init:r,push:o,unshift:l,finish:h,sort:c}}function im(){let n=new WeakMap;function e(i,s){const r=n.get(i);let a;return r===void 0?(a=new jo,n.set(i,[a])):s>=r.length?(a=new jo,r.push(a)):a=r[s],a}function t(){n=new WeakMap}return{get:e,dispose:t}}function sm(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new C,color:new We};break;case"SpotLight":t={position:new C,direction:new C,color:new We,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new C,color:new We,distance:0,decay:0};break;case"HemisphereLight":t={direction:new C,skyColor:new We,groundColor:new We};break;case"RectAreaLight":t={color:new We,position:new C,halfWidth:new C,halfHeight:new C};break}return n[e.id]=t,t}}}function rm(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ye};break;case"SpotLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ye};break;case"PointLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ye,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=t,t}}}let am=0;function om(n,e){return(e.castShadow?2:0)-(n.castShadow?2:0)+(e.map?1:0)-(n.map?1:0)}function lm(n,e){const t=new sm,i=rm(),s={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let h=0;h<9;h++)s.probe.push(new C);const r=new C,a=new mt,o=new mt;function l(h,u){let p=0,g=0,_=0;for(let k=0;k<9;k++)s.probe[k].set(0,0,0);let x=0,m=0,f=0,E=0,M=0,w=0,P=0,A=0,R=0,H=0,S=0;h.sort(om);const b=u===!0?Math.PI:1;for(let k=0,ee=h.length;k<ee;k++){const D=h[k],B=D.color,W=D.intensity,Y=D.distance,X=D.shadow&&D.shadow.map?D.shadow.map.texture:null;if(D.isAmbientLight)p+=B.r*W*b,g+=B.g*W*b,_+=B.b*W*b;else if(D.isLightProbe){for(let q=0;q<9;q++)s.probe[q].addScaledVector(D.sh.coefficients[q],W);S++}else if(D.isDirectionalLight){const q=t.get(D);if(q.color.copy(D.color).multiplyScalar(D.intensity*b),D.castShadow){const $=D.shadow,te=i.get(D);te.shadowBias=$.bias,te.shadowNormalBias=$.normalBias,te.shadowRadius=$.radius,te.shadowMapSize=$.mapSize,s.directionalShadow[x]=te,s.directionalShadowMap[x]=X,s.directionalShadowMatrix[x]=D.shadow.matrix,w++}s.directional[x]=q,x++}else if(D.isSpotLight){const q=t.get(D);q.position.setFromMatrixPosition(D.matrixWorld),q.color.copy(B).multiplyScalar(W*b),q.distance=Y,q.coneCos=Math.cos(D.angle),q.penumbraCos=Math.cos(D.angle*(1-D.penumbra)),q.decay=D.decay,s.spot[f]=q;const $=D.shadow;if(D.map&&(s.spotLightMap[R]=D.map,R++,$.updateMatrices(D),D.castShadow&&H++),s.spotLightMatrix[f]=$.matrix,D.castShadow){const te=i.get(D);te.shadowBias=$.bias,te.shadowNormalBias=$.normalBias,te.shadowRadius=$.radius,te.shadowMapSize=$.mapSize,s.spotShadow[f]=te,s.spotShadowMap[f]=X,A++}f++}else if(D.isRectAreaLight){const q=t.get(D);q.color.copy(B).multiplyScalar(W),q.halfWidth.set(D.width*.5,0,0),q.halfHeight.set(0,D.height*.5,0),s.rectArea[E]=q,E++}else if(D.isPointLight){const q=t.get(D);if(q.color.copy(D.color).multiplyScalar(D.intensity*b),q.distance=D.distance,q.decay=D.decay,D.castShadow){const $=D.shadow,te=i.get(D);te.shadowBias=$.bias,te.shadowNormalBias=$.normalBias,te.shadowRadius=$.radius,te.shadowMapSize=$.mapSize,te.shadowCameraNear=$.camera.near,te.shadowCameraFar=$.camera.far,s.pointShadow[m]=te,s.pointShadowMap[m]=X,s.pointShadowMatrix[m]=D.shadow.matrix,P++}s.point[m]=q,m++}else if(D.isHemisphereLight){const q=t.get(D);q.skyColor.copy(D.color).multiplyScalar(W*b),q.groundColor.copy(D.groundColor).multiplyScalar(W*b),s.hemi[M]=q,M++}}E>0&&(e.isWebGL2?n.has("OES_texture_float_linear")===!0?(s.rectAreaLTC1=se.LTC_FLOAT_1,s.rectAreaLTC2=se.LTC_FLOAT_2):(s.rectAreaLTC1=se.LTC_HALF_1,s.rectAreaLTC2=se.LTC_HALF_2):n.has("OES_texture_float_linear")===!0?(s.rectAreaLTC1=se.LTC_FLOAT_1,s.rectAreaLTC2=se.LTC_FLOAT_2):n.has("OES_texture_half_float_linear")===!0?(s.rectAreaLTC1=se.LTC_HALF_1,s.rectAreaLTC2=se.LTC_HALF_2):console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.")),s.ambient[0]=p,s.ambient[1]=g,s.ambient[2]=_;const G=s.hash;(G.directionalLength!==x||G.pointLength!==m||G.spotLength!==f||G.rectAreaLength!==E||G.hemiLength!==M||G.numDirectionalShadows!==w||G.numPointShadows!==P||G.numSpotShadows!==A||G.numSpotMaps!==R||G.numLightProbes!==S)&&(s.directional.length=x,s.spot.length=f,s.rectArea.length=E,s.point.length=m,s.hemi.length=M,s.directionalShadow.length=w,s.directionalShadowMap.length=w,s.pointShadow.length=P,s.pointShadowMap.length=P,s.spotShadow.length=A,s.spotShadowMap.length=A,s.directionalShadowMatrix.length=w,s.pointShadowMatrix.length=P,s.spotLightMatrix.length=A+R-H,s.spotLightMap.length=R,s.numSpotLightShadowsWithMaps=H,s.numLightProbes=S,G.directionalLength=x,G.pointLength=m,G.spotLength=f,G.rectAreaLength=E,G.hemiLength=M,G.numDirectionalShadows=w,G.numPointShadows=P,G.numSpotShadows=A,G.numSpotMaps=R,G.numLightProbes=S,s.version=am++)}function c(h,u){let p=0,g=0,_=0,x=0,m=0;const f=u.matrixWorldInverse;for(let E=0,M=h.length;E<M;E++){const w=h[E];if(w.isDirectionalLight){const P=s.directional[p];P.direction.setFromMatrixPosition(w.matrixWorld),r.setFromMatrixPosition(w.target.matrixWorld),P.direction.sub(r),P.direction.transformDirection(f),p++}else if(w.isSpotLight){const P=s.spot[_];P.position.setFromMatrixPosition(w.matrixWorld),P.position.applyMatrix4(f),P.direction.setFromMatrixPosition(w.matrixWorld),r.setFromMatrixPosition(w.target.matrixWorld),P.direction.sub(r),P.direction.transformDirection(f),_++}else if(w.isRectAreaLight){const P=s.rectArea[x];P.position.setFromMatrixPosition(w.matrixWorld),P.position.applyMatrix4(f),o.identity(),a.copy(w.matrixWorld),a.premultiply(f),o.extractRotation(a),P.halfWidth.set(w.width*.5,0,0),P.halfHeight.set(0,w.height*.5,0),P.halfWidth.applyMatrix4(o),P.halfHeight.applyMatrix4(o),x++}else if(w.isPointLight){const P=s.point[g];P.position.setFromMatrixPosition(w.matrixWorld),P.position.applyMatrix4(f),g++}else if(w.isHemisphereLight){const P=s.hemi[m];P.direction.setFromMatrixPosition(w.matrixWorld),P.direction.transformDirection(f),m++}}}return{setup:l,setupView:c,state:s}}function Zo(n,e){const t=new lm(n,e),i=[],s=[];function r(){i.length=0,s.length=0}function a(u){i.push(u)}function o(u){s.push(u)}function l(u){t.setup(i,u)}function c(u){t.setupView(i,u)}return{init:r,state:{lightsArray:i,shadowsArray:s,lights:t},setupLights:l,setupLightsView:c,pushLight:a,pushShadow:o}}function cm(n,e){let t=new WeakMap;function i(r,a=0){const o=t.get(r);let l;return o===void 0?(l=new Zo(n,e),t.set(r,[l])):a>=o.length?(l=new Zo(n,e),o.push(l)):l=o[a],l}function s(){t=new WeakMap}return{get:i,dispose:s}}class hm extends fi{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=ah,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class um extends fi{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const fm=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,dm=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function pm(n,e,t){let i=new ca;const s=new Ye,r=new Ye,a=new ct,o=new hm({depthPacking:oh}),l=new um,c={},h=t.maxTextureSize,u={[Gn]:Gt,[Gt]:Gn,[fn]:fn},p=new ci({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Ye},radius:{value:4}},vertexShader:fm,fragmentShader:dm}),g=p.clone();g.defines.HORIZONTAL_PASS=1;const _=new Dt;_.setAttribute("position",new pn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const x=new Ie(_,p),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=ul;let f=this.type;this.render=function(A,R,H){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||A.length===0)return;const S=n.getRenderTarget(),b=n.getActiveCubeFace(),G=n.getActiveMipmapLevel(),k=n.state;k.setBlending(Bn),k.buffers.color.setClear(1,1,1,1),k.buffers.depth.setTest(!0),k.setScissorTest(!1);const ee=f!==yn&&this.type===yn,D=f===yn&&this.type!==yn;for(let B=0,W=A.length;B<W;B++){const Y=A[B],X=Y.shadow;if(X===void 0){console.warn("THREE.WebGLShadowMap:",Y,"has no shadow.");continue}if(X.autoUpdate===!1&&X.needsUpdate===!1)continue;s.copy(X.mapSize);const q=X.getFrameExtents();if(s.multiply(q),r.copy(X.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/q.x),s.x=r.x*q.x,X.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/q.y),s.y=r.y*q.y,X.mapSize.y=r.y)),X.map===null||ee===!0||D===!0){const te=this.type!==yn?{minFilter:Ot,magFilter:Ot}:{};X.map!==null&&X.map.dispose(),X.map=new li(s.x,s.y,te),X.map.texture.name=Y.name+".shadowMap",X.camera.updateProjectionMatrix()}n.setRenderTarget(X.map),n.clear();const $=X.getViewportCount();for(let te=0;te<$;te++){const ne=X.getViewport(te);a.set(r.x*ne.x,r.y*ne.y,r.x*ne.z,r.y*ne.w),k.viewport(a),X.updateMatrices(Y,te),i=X.getFrustum(),w(R,H,X.camera,Y,this.type)}X.isPointLightShadow!==!0&&this.type===yn&&E(X,H),X.needsUpdate=!1}f=this.type,m.needsUpdate=!1,n.setRenderTarget(S,b,G)};function E(A,R){const H=e.update(x);p.defines.VSM_SAMPLES!==A.blurSamples&&(p.defines.VSM_SAMPLES=A.blurSamples,g.defines.VSM_SAMPLES=A.blurSamples,p.needsUpdate=!0,g.needsUpdate=!0),A.mapPass===null&&(A.mapPass=new li(s.x,s.y)),p.uniforms.shadow_pass.value=A.map.texture,p.uniforms.resolution.value=A.mapSize,p.uniforms.radius.value=A.radius,n.setRenderTarget(A.mapPass),n.clear(),n.renderBufferDirect(R,null,H,p,x,null),g.uniforms.shadow_pass.value=A.mapPass.texture,g.uniforms.resolution.value=A.mapSize,g.uniforms.radius.value=A.radius,n.setRenderTarget(A.map),n.clear(),n.renderBufferDirect(R,null,H,g,x,null)}function M(A,R,H,S){let b=null;const G=H.isPointLight===!0?A.customDistanceMaterial:A.customDepthMaterial;if(G!==void 0)b=G;else if(b=H.isPointLight===!0?l:o,n.localClippingEnabled&&R.clipShadows===!0&&Array.isArray(R.clippingPlanes)&&R.clippingPlanes.length!==0||R.displacementMap&&R.displacementScale!==0||R.alphaMap&&R.alphaTest>0||R.map&&R.alphaTest>0){const k=b.uuid,ee=R.uuid;let D=c[k];D===void 0&&(D={},c[k]=D);let B=D[ee];B===void 0&&(B=b.clone(),D[ee]=B,R.addEventListener("dispose",P)),b=B}if(b.visible=R.visible,b.wireframe=R.wireframe,S===yn?b.side=R.shadowSide!==null?R.shadowSide:R.side:b.side=R.shadowSide!==null?R.shadowSide:u[R.side],b.alphaMap=R.alphaMap,b.alphaTest=R.alphaTest,b.map=R.map,b.clipShadows=R.clipShadows,b.clippingPlanes=R.clippingPlanes,b.clipIntersection=R.clipIntersection,b.displacementMap=R.displacementMap,b.displacementScale=R.displacementScale,b.displacementBias=R.displacementBias,b.wireframeLinewidth=R.wireframeLinewidth,b.linewidth=R.linewidth,H.isPointLight===!0&&b.isMeshDistanceMaterial===!0){const k=n.properties.get(b);k.light=H}return b}function w(A,R,H,S,b){if(A.visible===!1)return;if(A.layers.test(R.layers)&&(A.isMesh||A.isLine||A.isPoints)&&(A.castShadow||A.receiveShadow&&b===yn)&&(!A.frustumCulled||i.intersectsObject(A))){A.modelViewMatrix.multiplyMatrices(H.matrixWorldInverse,A.matrixWorld);const ee=e.update(A),D=A.material;if(Array.isArray(D)){const B=ee.groups;for(let W=0,Y=B.length;W<Y;W++){const X=B[W],q=D[X.materialIndex];if(q&&q.visible){const $=M(A,q,S,b);A.onBeforeShadow(n,A,R,H,ee,$,X),n.renderBufferDirect(H,null,ee,$,A,X),A.onAfterShadow(n,A,R,H,ee,$,X)}}}else if(D.visible){const B=M(A,D,S,b);A.onBeforeShadow(n,A,R,H,ee,B,null),n.renderBufferDirect(H,null,ee,B,A,null),A.onAfterShadow(n,A,R,H,ee,B,null)}}const k=A.children;for(let ee=0,D=k.length;ee<D;ee++)w(k[ee],R,H,S,b)}function P(A){A.target.removeEventListener("dispose",P);for(const H in c){const S=c[H],b=A.target.uuid;b in S&&(S[b].dispose(),delete S[b])}}}function mm(n,e,t){const i=t.isWebGL2;function s(){let L=!1;const re=new ct;let ae=null;const Ae=new ct(0,0,0,0);return{setMask:function(Ee){ae!==Ee&&!L&&(n.colorMask(Ee,Ee,Ee,Ee),ae=Ee)},setLocked:function(Ee){L=Ee},setClear:function(Ee,it,st,Et,It){It===!0&&(Ee*=Et,it*=Et,st*=Et),re.set(Ee,it,st,Et),Ae.equals(re)===!1&&(n.clearColor(Ee,it,st,Et),Ae.copy(re))},reset:function(){L=!1,ae=null,Ae.set(-1,0,0,0)}}}function r(){let L=!1,re=null,ae=null,Ae=null;return{setTest:function(Ee){Ee?Ne(n.DEPTH_TEST):we(n.DEPTH_TEST)},setMask:function(Ee){re!==Ee&&!L&&(n.depthMask(Ee),re=Ee)},setFunc:function(Ee){if(ae!==Ee){switch(Ee){case Fc:n.depthFunc(n.NEVER);break;case Oc:n.depthFunc(n.ALWAYS);break;case Bc:n.depthFunc(n.LESS);break;case Ws:n.depthFunc(n.LEQUAL);break;case zc:n.depthFunc(n.EQUAL);break;case Hc:n.depthFunc(n.GEQUAL);break;case Gc:n.depthFunc(n.GREATER);break;case kc:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}ae=Ee}},setLocked:function(Ee){L=Ee},setClear:function(Ee){Ae!==Ee&&(n.clearDepth(Ee),Ae=Ee)},reset:function(){L=!1,re=null,ae=null,Ae=null}}}function a(){let L=!1,re=null,ae=null,Ae=null,Ee=null,it=null,st=null,Et=null,It=null;return{setTest:function(rt){L||(rt?Ne(n.STENCIL_TEST):we(n.STENCIL_TEST))},setMask:function(rt){re!==rt&&!L&&(n.stencilMask(rt),re=rt)},setFunc:function(rt,Nt,cn){(ae!==rt||Ae!==Nt||Ee!==cn)&&(n.stencilFunc(rt,Nt,cn),ae=rt,Ae=Nt,Ee=cn)},setOp:function(rt,Nt,cn){(it!==rt||st!==Nt||Et!==cn)&&(n.stencilOp(rt,Nt,cn),it=rt,st=Nt,Et=cn)},setLocked:function(rt){L=rt},setClear:function(rt){It!==rt&&(n.clearStencil(rt),It=rt)},reset:function(){L=!1,re=null,ae=null,Ae=null,Ee=null,it=null,st=null,Et=null,It=null}}}const o=new s,l=new r,c=new a,h=new WeakMap,u=new WeakMap;let p={},g={},_=new WeakMap,x=[],m=null,f=!1,E=null,M=null,w=null,P=null,A=null,R=null,H=null,S=new We(0,0,0),b=0,G=!1,k=null,ee=null,D=null,B=null,W=null;const Y=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let X=!1,q=0;const $=n.getParameter(n.VERSION);$.indexOf("WebGL")!==-1?(q=parseFloat(/^WebGL (\d)/.exec($)[1]),X=q>=1):$.indexOf("OpenGL ES")!==-1&&(q=parseFloat(/^OpenGL ES (\d)/.exec($)[1]),X=q>=2);let te=null,ne={};const V=n.getParameter(n.SCISSOR_BOX),K=n.getParameter(n.VIEWPORT),le=new ct().fromArray(V),xe=new ct().fromArray(K);function _e(L,re,ae,Ae){const Ee=new Uint8Array(4),it=n.createTexture();n.bindTexture(L,it),n.texParameteri(L,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(L,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let st=0;st<ae;st++)i&&(L===n.TEXTURE_3D||L===n.TEXTURE_2D_ARRAY)?n.texImage3D(re,0,n.RGBA,1,1,Ae,0,n.RGBA,n.UNSIGNED_BYTE,Ee):n.texImage2D(re+st,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,Ee);return it}const De={};De[n.TEXTURE_2D]=_e(n.TEXTURE_2D,n.TEXTURE_2D,1),De[n.TEXTURE_CUBE_MAP]=_e(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),i&&(De[n.TEXTURE_2D_ARRAY]=_e(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),De[n.TEXTURE_3D]=_e(n.TEXTURE_3D,n.TEXTURE_3D,1,1)),o.setClear(0,0,0,1),l.setClear(1),c.setClear(0),Ne(n.DEPTH_TEST),l.setFunc(Ws),Be(!1),T(Da),Ne(n.CULL_FACE),pe(Bn);function Ne(L){p[L]!==!0&&(n.enable(L),p[L]=!0)}function we(L){p[L]!==!1&&(n.disable(L),p[L]=!1)}function $e(L,re){return g[L]!==re?(n.bindFramebuffer(L,re),g[L]=re,i&&(L===n.DRAW_FRAMEBUFFER&&(g[n.FRAMEBUFFER]=re),L===n.FRAMEBUFFER&&(g[n.DRAW_FRAMEBUFFER]=re)),!0):!1}function I(L,re){let ae=x,Ae=!1;if(L)if(ae=_.get(re),ae===void 0&&(ae=[],_.set(re,ae)),L.isWebGLMultipleRenderTargets){const Ee=L.texture;if(ae.length!==Ee.length||ae[0]!==n.COLOR_ATTACHMENT0){for(let it=0,st=Ee.length;it<st;it++)ae[it]=n.COLOR_ATTACHMENT0+it;ae.length=Ee.length,Ae=!0}}else ae[0]!==n.COLOR_ATTACHMENT0&&(ae[0]=n.COLOR_ATTACHMENT0,Ae=!0);else ae[0]!==n.BACK&&(ae[0]=n.BACK,Ae=!0);Ae&&(t.isWebGL2?n.drawBuffers(ae):e.get("WEBGL_draw_buffers").drawBuffersWEBGL(ae))}function Ut(L){return m!==L?(n.useProgram(L),m=L,!0):!1}const ye={[ii]:n.FUNC_ADD,[Sc]:n.FUNC_SUBTRACT,[yc]:n.FUNC_REVERSE_SUBTRACT};if(i)ye[Na]=n.MIN,ye[Fa]=n.MAX;else{const L=e.get("EXT_blend_minmax");L!==null&&(ye[Na]=L.MIN_EXT,ye[Fa]=L.MAX_EXT)}const Le={[Ec]:n.ZERO,[Tc]:n.ONE,[bc]:n.SRC_COLOR,[$r]:n.SRC_ALPHA,[Pc]:n.SRC_ALPHA_SATURATE,[Cc]:n.DST_COLOR,[Ac]:n.DST_ALPHA,[wc]:n.ONE_MINUS_SRC_COLOR,[Kr]:n.ONE_MINUS_SRC_ALPHA,[Lc]:n.ONE_MINUS_DST_COLOR,[Rc]:n.ONE_MINUS_DST_ALPHA,[Dc]:n.CONSTANT_COLOR,[Uc]:n.ONE_MINUS_CONSTANT_COLOR,[Ic]:n.CONSTANT_ALPHA,[Nc]:n.ONE_MINUS_CONSTANT_ALPHA};function pe(L,re,ae,Ae,Ee,it,st,Et,It,rt){if(L===Bn){f===!0&&(we(n.BLEND),f=!1);return}if(f===!1&&(Ne(n.BLEND),f=!0),L!==Mc){if(L!==E||rt!==G){if((M!==ii||A!==ii)&&(n.blendEquation(n.FUNC_ADD),M=ii,A=ii),rt)switch(L){case Ui:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case An:n.blendFunc(n.ONE,n.ONE);break;case Ua:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case Ia:n.blendFuncSeparate(n.ZERO,n.SRC_COLOR,n.ZERO,n.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",L);break}else switch(L){case Ui:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case An:n.blendFunc(n.SRC_ALPHA,n.ONE);break;case Ua:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case Ia:n.blendFunc(n.ZERO,n.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",L);break}w=null,P=null,R=null,H=null,S.set(0,0,0),b=0,E=L,G=rt}return}Ee=Ee||re,it=it||ae,st=st||Ae,(re!==M||Ee!==A)&&(n.blendEquationSeparate(ye[re],ye[Ee]),M=re,A=Ee),(ae!==w||Ae!==P||it!==R||st!==H)&&(n.blendFuncSeparate(Le[ae],Le[Ae],Le[it],Le[st]),w=ae,P=Ae,R=it,H=st),(Et.equals(S)===!1||It!==b)&&(n.blendColor(Et.r,Et.g,Et.b,It),S.copy(Et),b=It),E=L,G=!1}function ut(L,re){L.side===fn?we(n.CULL_FACE):Ne(n.CULL_FACE);let ae=L.side===Gt;re&&(ae=!ae),Be(ae),L.blending===Ui&&L.transparent===!1?pe(Bn):pe(L.blending,L.blendEquation,L.blendSrc,L.blendDst,L.blendEquationAlpha,L.blendSrcAlpha,L.blendDstAlpha,L.blendColor,L.blendAlpha,L.premultipliedAlpha),l.setFunc(L.depthFunc),l.setTest(L.depthTest),l.setMask(L.depthWrite),o.setMask(L.colorWrite);const Ae=L.stencilWrite;c.setTest(Ae),Ae&&(c.setMask(L.stencilWriteMask),c.setFunc(L.stencilFunc,L.stencilRef,L.stencilFuncMask),c.setOp(L.stencilFail,L.stencilZFail,L.stencilZPass)),F(L.polygonOffset,L.polygonOffsetFactor,L.polygonOffsetUnits),L.alphaToCoverage===!0?Ne(n.SAMPLE_ALPHA_TO_COVERAGE):we(n.SAMPLE_ALPHA_TO_COVERAGE)}function Be(L){k!==L&&(L?n.frontFace(n.CW):n.frontFace(n.CCW),k=L)}function T(L){L!==xc?(Ne(n.CULL_FACE),L!==ee&&(L===Da?n.cullFace(n.BACK):L===vc?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):we(n.CULL_FACE),ee=L}function v(L){L!==D&&(X&&n.lineWidth(L),D=L)}function F(L,re,ae){L?(Ne(n.POLYGON_OFFSET_FILL),(B!==re||W!==ae)&&(n.polygonOffset(re,ae),B=re,W=ae)):we(n.POLYGON_OFFSET_FILL)}function J(L){L?Ne(n.SCISSOR_TEST):we(n.SCISSOR_TEST)}function Z(L){L===void 0&&(L=n.TEXTURE0+Y-1),te!==L&&(n.activeTexture(L),te=L)}function Q(L,re,ae){ae===void 0&&(te===null?ae=n.TEXTURE0+Y-1:ae=te);let Ae=ne[ae];Ae===void 0&&(Ae={type:void 0,texture:void 0},ne[ae]=Ae),(Ae.type!==L||Ae.texture!==re)&&(te!==ae&&(n.activeTexture(ae),te=ae),n.bindTexture(L,re||De[L]),Ae.type=L,Ae.texture=re)}function me(){const L=ne[te];L!==void 0&&L.type!==void 0&&(n.bindTexture(L.type,null),L.type=void 0,L.texture=void 0)}function oe(){try{n.compressedTexImage2D.apply(n,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function ue(){try{n.compressedTexImage3D.apply(n,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function be(){try{n.texSubImage2D.apply(n,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function ze(){try{n.texSubImage3D.apply(n,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function j(){try{n.compressedTexSubImage2D.apply(n,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function Je(){try{n.compressedTexSubImage3D.apply(n,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function qe(){try{n.texStorage2D.apply(n,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function Ce(){try{n.texStorage3D.apply(n,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function Me(){try{n.texImage2D.apply(n,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function fe(){try{n.texImage3D.apply(n,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function Fe(L){le.equals(L)===!1&&(n.scissor(L.x,L.y,L.z,L.w),le.copy(L))}function Ze(L){xe.equals(L)===!1&&(n.viewport(L.x,L.y,L.z,L.w),xe.copy(L))}function dt(L,re){let ae=u.get(re);ae===void 0&&(ae=new WeakMap,u.set(re,ae));let Ae=ae.get(L);Ae===void 0&&(Ae=n.getUniformBlockIndex(re,L.name),ae.set(L,Ae))}function Ge(L,re){const Ae=u.get(re).get(L);h.get(re)!==Ae&&(n.uniformBlockBinding(re,Ae,L.__bindingPointIndex),h.set(re,Ae))}function ie(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),i===!0&&(n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null)),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),p={},te=null,ne={},g={},_=new WeakMap,x=[],m=null,f=!1,E=null,M=null,w=null,P=null,A=null,R=null,H=null,S=new We(0,0,0),b=0,G=!1,k=null,ee=null,D=null,B=null,W=null,le.set(0,0,n.canvas.width,n.canvas.height),xe.set(0,0,n.canvas.width,n.canvas.height),o.reset(),l.reset(),c.reset()}return{buffers:{color:o,depth:l,stencil:c},enable:Ne,disable:we,bindFramebuffer:$e,drawBuffers:I,useProgram:Ut,setBlending:pe,setMaterial:ut,setFlipSided:Be,setCullFace:T,setLineWidth:v,setPolygonOffset:F,setScissorTest:J,activeTexture:Z,bindTexture:Q,unbindTexture:me,compressedTexImage2D:oe,compressedTexImage3D:ue,texImage2D:Me,texImage3D:fe,updateUBOMapping:dt,uniformBlockBinding:Ge,texStorage2D:qe,texStorage3D:Ce,texSubImage2D:be,texSubImage3D:ze,compressedTexSubImage2D:j,compressedTexSubImage3D:Je,scissor:Fe,viewport:Ze,reset:ie}}function gm(n,e,t,i,s,r,a){const o=s.isWebGL2,l=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),h=new WeakMap;let u;const p=new WeakMap;let g=!1;try{g=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function _(T,v){return g?new OffscreenCanvas(T,v):Ks("canvas")}function x(T,v,F,J){let Z=1;if((T.width>J||T.height>J)&&(Z=J/Math.max(T.width,T.height)),Z<1||v===!0)if(typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&T instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&T instanceof ImageBitmap){const Q=v?na:Math.floor,me=Q(Z*T.width),oe=Q(Z*T.height);u===void 0&&(u=_(me,oe));const ue=F?_(me,oe):u;return ue.width=me,ue.height=oe,ue.getContext("2d").drawImage(T,0,0,me,oe),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+T.width+"x"+T.height+") to ("+me+"x"+oe+")."),ue}else return"data"in T&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+T.width+"x"+T.height+")."),T;return T}function m(T){return fo(T.width)&&fo(T.height)}function f(T){return o?!1:T.wrapS!==rn||T.wrapT!==rn||T.minFilter!==Ot&&T.minFilter!==jt}function E(T,v){return T.generateMipmaps&&v&&T.minFilter!==Ot&&T.minFilter!==jt}function M(T){n.generateMipmap(T)}function w(T,v,F,J,Z=!1){if(o===!1)return v;if(T!==null){if(n[T]!==void 0)return n[T];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+T+"'")}let Q=v;if(v===n.RED&&(F===n.FLOAT&&(Q=n.R32F),F===n.HALF_FLOAT&&(Q=n.R16F),F===n.UNSIGNED_BYTE&&(Q=n.R8)),v===n.RED_INTEGER&&(F===n.UNSIGNED_BYTE&&(Q=n.R8UI),F===n.UNSIGNED_SHORT&&(Q=n.R16UI),F===n.UNSIGNED_INT&&(Q=n.R32UI),F===n.BYTE&&(Q=n.R8I),F===n.SHORT&&(Q=n.R16I),F===n.INT&&(Q=n.R32I)),v===n.RG&&(F===n.FLOAT&&(Q=n.RG32F),F===n.HALF_FLOAT&&(Q=n.RG16F),F===n.UNSIGNED_BYTE&&(Q=n.RG8)),v===n.RGBA){const me=Z?Xs:Qe.getTransfer(J);F===n.FLOAT&&(Q=n.RGBA32F),F===n.HALF_FLOAT&&(Q=n.RGBA16F),F===n.UNSIGNED_BYTE&&(Q=me===ot?n.SRGB8_ALPHA8:n.RGBA8),F===n.UNSIGNED_SHORT_4_4_4_4&&(Q=n.RGBA4),F===n.UNSIGNED_SHORT_5_5_5_1&&(Q=n.RGB5_A1)}return(Q===n.R16F||Q===n.R32F||Q===n.RG16F||Q===n.RG32F||Q===n.RGBA16F||Q===n.RGBA32F)&&e.get("EXT_color_buffer_float"),Q}function P(T,v,F){return E(T,F)===!0||T.isFramebufferTexture&&T.minFilter!==Ot&&T.minFilter!==jt?Math.log2(Math.max(v.width,v.height))+1:T.mipmaps!==void 0&&T.mipmaps.length>0?T.mipmaps.length:T.isCompressedTexture&&Array.isArray(T.image)?v.mipmaps.length:1}function A(T){return T===Ot||T===Oa||T===fr?n.NEAREST:n.LINEAR}function R(T){const v=T.target;v.removeEventListener("dispose",R),S(v),v.isVideoTexture&&h.delete(v)}function H(T){const v=T.target;v.removeEventListener("dispose",H),G(v)}function S(T){const v=i.get(T);if(v.__webglInit===void 0)return;const F=T.source,J=p.get(F);if(J){const Z=J[v.__cacheKey];Z.usedTimes--,Z.usedTimes===0&&b(T),Object.keys(J).length===0&&p.delete(F)}i.remove(T)}function b(T){const v=i.get(T);n.deleteTexture(v.__webglTexture);const F=T.source,J=p.get(F);delete J[v.__cacheKey],a.memory.textures--}function G(T){const v=T.texture,F=i.get(T),J=i.get(v);if(J.__webglTexture!==void 0&&(n.deleteTexture(J.__webglTexture),a.memory.textures--),T.depthTexture&&T.depthTexture.dispose(),T.isWebGLCubeRenderTarget)for(let Z=0;Z<6;Z++){if(Array.isArray(F.__webglFramebuffer[Z]))for(let Q=0;Q<F.__webglFramebuffer[Z].length;Q++)n.deleteFramebuffer(F.__webglFramebuffer[Z][Q]);else n.deleteFramebuffer(F.__webglFramebuffer[Z]);F.__webglDepthbuffer&&n.deleteRenderbuffer(F.__webglDepthbuffer[Z])}else{if(Array.isArray(F.__webglFramebuffer))for(let Z=0;Z<F.__webglFramebuffer.length;Z++)n.deleteFramebuffer(F.__webglFramebuffer[Z]);else n.deleteFramebuffer(F.__webglFramebuffer);if(F.__webglDepthbuffer&&n.deleteRenderbuffer(F.__webglDepthbuffer),F.__webglMultisampledFramebuffer&&n.deleteFramebuffer(F.__webglMultisampledFramebuffer),F.__webglColorRenderbuffer)for(let Z=0;Z<F.__webglColorRenderbuffer.length;Z++)F.__webglColorRenderbuffer[Z]&&n.deleteRenderbuffer(F.__webglColorRenderbuffer[Z]);F.__webglDepthRenderbuffer&&n.deleteRenderbuffer(F.__webglDepthRenderbuffer)}if(T.isWebGLMultipleRenderTargets)for(let Z=0,Q=v.length;Z<Q;Z++){const me=i.get(v[Z]);me.__webglTexture&&(n.deleteTexture(me.__webglTexture),a.memory.textures--),i.remove(v[Z])}i.remove(v),i.remove(T)}let k=0;function ee(){k=0}function D(){const T=k;return T>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+T+" texture units while this GPU supports only "+s.maxTextures),k+=1,T}function B(T){const v=[];return v.push(T.wrapS),v.push(T.wrapT),v.push(T.wrapR||0),v.push(T.magFilter),v.push(T.minFilter),v.push(T.anisotropy),v.push(T.internalFormat),v.push(T.format),v.push(T.type),v.push(T.generateMipmaps),v.push(T.premultiplyAlpha),v.push(T.flipY),v.push(T.unpackAlignment),v.push(T.colorSpace),v.join()}function W(T,v){const F=i.get(T);if(T.isVideoTexture&&ut(T),T.isRenderTargetTexture===!1&&T.version>0&&F.__version!==T.version){const J=T.image;if(J===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(J.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{le(F,T,v);return}}t.bindTexture(n.TEXTURE_2D,F.__webglTexture,n.TEXTURE0+v)}function Y(T,v){const F=i.get(T);if(T.version>0&&F.__version!==T.version){le(F,T,v);return}t.bindTexture(n.TEXTURE_2D_ARRAY,F.__webglTexture,n.TEXTURE0+v)}function X(T,v){const F=i.get(T);if(T.version>0&&F.__version!==T.version){le(F,T,v);return}t.bindTexture(n.TEXTURE_3D,F.__webglTexture,n.TEXTURE0+v)}function q(T,v){const F=i.get(T);if(T.version>0&&F.__version!==T.version){xe(F,T,v);return}t.bindTexture(n.TEXTURE_CUBE_MAP,F.__webglTexture,n.TEXTURE0+v)}const $={[Jr]:n.REPEAT,[rn]:n.CLAMP_TO_EDGE,[Qr]:n.MIRRORED_REPEAT},te={[Ot]:n.NEAREST,[Oa]:n.NEAREST_MIPMAP_NEAREST,[fr]:n.NEAREST_MIPMAP_LINEAR,[jt]:n.LINEAR,[Zc]:n.LINEAR_MIPMAP_NEAREST,[es]:n.LINEAR_MIPMAP_LINEAR},ne={[ch]:n.NEVER,[mh]:n.ALWAYS,[hh]:n.LESS,[Tl]:n.LEQUAL,[uh]:n.EQUAL,[ph]:n.GEQUAL,[fh]:n.GREATER,[dh]:n.NOTEQUAL};function V(T,v,F){if(F?(n.texParameteri(T,n.TEXTURE_WRAP_S,$[v.wrapS]),n.texParameteri(T,n.TEXTURE_WRAP_T,$[v.wrapT]),(T===n.TEXTURE_3D||T===n.TEXTURE_2D_ARRAY)&&n.texParameteri(T,n.TEXTURE_WRAP_R,$[v.wrapR]),n.texParameteri(T,n.TEXTURE_MAG_FILTER,te[v.magFilter]),n.texParameteri(T,n.TEXTURE_MIN_FILTER,te[v.minFilter])):(n.texParameteri(T,n.TEXTURE_WRAP_S,n.CLAMP_TO_EDGE),n.texParameteri(T,n.TEXTURE_WRAP_T,n.CLAMP_TO_EDGE),(T===n.TEXTURE_3D||T===n.TEXTURE_2D_ARRAY)&&n.texParameteri(T,n.TEXTURE_WRAP_R,n.CLAMP_TO_EDGE),(v.wrapS!==rn||v.wrapT!==rn)&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."),n.texParameteri(T,n.TEXTURE_MAG_FILTER,A(v.magFilter)),n.texParameteri(T,n.TEXTURE_MIN_FILTER,A(v.minFilter)),v.minFilter!==Ot&&v.minFilter!==jt&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")),v.compareFunction&&(n.texParameteri(T,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(T,n.TEXTURE_COMPARE_FUNC,ne[v.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){const J=e.get("EXT_texture_filter_anisotropic");if(v.magFilter===Ot||v.minFilter!==fr&&v.minFilter!==es||v.type===Nn&&e.has("OES_texture_float_linear")===!1||o===!1&&v.type===ts&&e.has("OES_texture_half_float_linear")===!1)return;(v.anisotropy>1||i.get(v).__currentAnisotropy)&&(n.texParameterf(T,J.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(v.anisotropy,s.getMaxAnisotropy())),i.get(v).__currentAnisotropy=v.anisotropy)}}function K(T,v){let F=!1;T.__webglInit===void 0&&(T.__webglInit=!0,v.addEventListener("dispose",R));const J=v.source;let Z=p.get(J);Z===void 0&&(Z={},p.set(J,Z));const Q=B(v);if(Q!==T.__cacheKey){Z[Q]===void 0&&(Z[Q]={texture:n.createTexture(),usedTimes:0},a.memory.textures++,F=!0),Z[Q].usedTimes++;const me=Z[T.__cacheKey];me!==void 0&&(Z[T.__cacheKey].usedTimes--,me.usedTimes===0&&b(v)),T.__cacheKey=Q,T.__webglTexture=Z[Q].texture}return F}function le(T,v,F){let J=n.TEXTURE_2D;(v.isDataArrayTexture||v.isCompressedArrayTexture)&&(J=n.TEXTURE_2D_ARRAY),v.isData3DTexture&&(J=n.TEXTURE_3D);const Z=K(T,v),Q=v.source;t.bindTexture(J,T.__webglTexture,n.TEXTURE0+F);const me=i.get(Q);if(Q.version!==me.__version||Z===!0){t.activeTexture(n.TEXTURE0+F);const oe=Qe.getPrimaries(Qe.workingColorSpace),ue=v.colorSpace===Zt?null:Qe.getPrimaries(v.colorSpace),be=v.colorSpace===Zt||oe===ue?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,v.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,v.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,be);const ze=f(v)&&m(v.image)===!1;let j=x(v.image,ze,!1,s.maxTextureSize);j=Be(v,j);const Je=m(j)||o,qe=r.convert(v.format,v.colorSpace);let Ce=r.convert(v.type),Me=w(v.internalFormat,qe,Ce,v.colorSpace,v.isVideoTexture);V(J,v,Je);let fe;const Fe=v.mipmaps,Ze=o&&v.isVideoTexture!==!0&&Me!==Sl,dt=me.__version===void 0||Z===!0,Ge=P(v,j,Je);if(v.isDepthTexture)Me=n.DEPTH_COMPONENT,o?v.type===Nn?Me=n.DEPTH_COMPONENT32F:v.type===In?Me=n.DEPTH_COMPONENT24:v.type===ri?Me=n.DEPTH24_STENCIL8:Me=n.DEPTH_COMPONENT16:v.type===Nn&&console.error("WebGLRenderer: Floating point depth texture requires WebGL2."),v.format===ai&&Me===n.DEPTH_COMPONENT&&v.type!==aa&&v.type!==In&&(console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."),v.type=In,Ce=r.convert(v.type)),v.format===Bi&&Me===n.DEPTH_COMPONENT&&(Me=n.DEPTH_STENCIL,v.type!==ri&&(console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."),v.type=ri,Ce=r.convert(v.type))),dt&&(Ze?t.texStorage2D(n.TEXTURE_2D,1,Me,j.width,j.height):t.texImage2D(n.TEXTURE_2D,0,Me,j.width,j.height,0,qe,Ce,null));else if(v.isDataTexture)if(Fe.length>0&&Je){Ze&&dt&&t.texStorage2D(n.TEXTURE_2D,Ge,Me,Fe[0].width,Fe[0].height);for(let ie=0,L=Fe.length;ie<L;ie++)fe=Fe[ie],Ze?t.texSubImage2D(n.TEXTURE_2D,ie,0,0,fe.width,fe.height,qe,Ce,fe.data):t.texImage2D(n.TEXTURE_2D,ie,Me,fe.width,fe.height,0,qe,Ce,fe.data);v.generateMipmaps=!1}else Ze?(dt&&t.texStorage2D(n.TEXTURE_2D,Ge,Me,j.width,j.height),t.texSubImage2D(n.TEXTURE_2D,0,0,0,j.width,j.height,qe,Ce,j.data)):t.texImage2D(n.TEXTURE_2D,0,Me,j.width,j.height,0,qe,Ce,j.data);else if(v.isCompressedTexture)if(v.isCompressedArrayTexture){Ze&&dt&&t.texStorage3D(n.TEXTURE_2D_ARRAY,Ge,Me,Fe[0].width,Fe[0].height,j.depth);for(let ie=0,L=Fe.length;ie<L;ie++)fe=Fe[ie],v.format!==an?qe!==null?Ze?t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,ie,0,0,0,fe.width,fe.height,j.depth,qe,fe.data,0,0):t.compressedTexImage3D(n.TEXTURE_2D_ARRAY,ie,Me,fe.width,fe.height,j.depth,0,fe.data,0,0):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ze?t.texSubImage3D(n.TEXTURE_2D_ARRAY,ie,0,0,0,fe.width,fe.height,j.depth,qe,Ce,fe.data):t.texImage3D(n.TEXTURE_2D_ARRAY,ie,Me,fe.width,fe.height,j.depth,0,qe,Ce,fe.data)}else{Ze&&dt&&t.texStorage2D(n.TEXTURE_2D,Ge,Me,Fe[0].width,Fe[0].height);for(let ie=0,L=Fe.length;ie<L;ie++)fe=Fe[ie],v.format!==an?qe!==null?Ze?t.compressedTexSubImage2D(n.TEXTURE_2D,ie,0,0,fe.width,fe.height,qe,fe.data):t.compressedTexImage2D(n.TEXTURE_2D,ie,Me,fe.width,fe.height,0,fe.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ze?t.texSubImage2D(n.TEXTURE_2D,ie,0,0,fe.width,fe.height,qe,Ce,fe.data):t.texImage2D(n.TEXTURE_2D,ie,Me,fe.width,fe.height,0,qe,Ce,fe.data)}else if(v.isDataArrayTexture)Ze?(dt&&t.texStorage3D(n.TEXTURE_2D_ARRAY,Ge,Me,j.width,j.height,j.depth),t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,j.width,j.height,j.depth,qe,Ce,j.data)):t.texImage3D(n.TEXTURE_2D_ARRAY,0,Me,j.width,j.height,j.depth,0,qe,Ce,j.data);else if(v.isData3DTexture)Ze?(dt&&t.texStorage3D(n.TEXTURE_3D,Ge,Me,j.width,j.height,j.depth),t.texSubImage3D(n.TEXTURE_3D,0,0,0,0,j.width,j.height,j.depth,qe,Ce,j.data)):t.texImage3D(n.TEXTURE_3D,0,Me,j.width,j.height,j.depth,0,qe,Ce,j.data);else if(v.isFramebufferTexture){if(dt)if(Ze)t.texStorage2D(n.TEXTURE_2D,Ge,Me,j.width,j.height);else{let ie=j.width,L=j.height;for(let re=0;re<Ge;re++)t.texImage2D(n.TEXTURE_2D,re,Me,ie,L,0,qe,Ce,null),ie>>=1,L>>=1}}else if(Fe.length>0&&Je){Ze&&dt&&t.texStorage2D(n.TEXTURE_2D,Ge,Me,Fe[0].width,Fe[0].height);for(let ie=0,L=Fe.length;ie<L;ie++)fe=Fe[ie],Ze?t.texSubImage2D(n.TEXTURE_2D,ie,0,0,qe,Ce,fe):t.texImage2D(n.TEXTURE_2D,ie,Me,qe,Ce,fe);v.generateMipmaps=!1}else Ze?(dt&&t.texStorage2D(n.TEXTURE_2D,Ge,Me,j.width,j.height),t.texSubImage2D(n.TEXTURE_2D,0,0,0,qe,Ce,j)):t.texImage2D(n.TEXTURE_2D,0,Me,qe,Ce,j);E(v,Je)&&M(J),me.__version=Q.version,v.onUpdate&&v.onUpdate(v)}T.__version=v.version}function xe(T,v,F){if(v.image.length!==6)return;const J=K(T,v),Z=v.source;t.bindTexture(n.TEXTURE_CUBE_MAP,T.__webglTexture,n.TEXTURE0+F);const Q=i.get(Z);if(Z.version!==Q.__version||J===!0){t.activeTexture(n.TEXTURE0+F);const me=Qe.getPrimaries(Qe.workingColorSpace),oe=v.colorSpace===Zt?null:Qe.getPrimaries(v.colorSpace),ue=v.colorSpace===Zt||me===oe?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,v.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,v.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,ue);const be=v.isCompressedTexture||v.image[0].isCompressedTexture,ze=v.image[0]&&v.image[0].isDataTexture,j=[];for(let ie=0;ie<6;ie++)!be&&!ze?j[ie]=x(v.image[ie],!1,!0,s.maxCubemapSize):j[ie]=ze?v.image[ie].image:v.image[ie],j[ie]=Be(v,j[ie]);const Je=j[0],qe=m(Je)||o,Ce=r.convert(v.format,v.colorSpace),Me=r.convert(v.type),fe=w(v.internalFormat,Ce,Me,v.colorSpace),Fe=o&&v.isVideoTexture!==!0,Ze=Q.__version===void 0||J===!0;let dt=P(v,Je,qe);V(n.TEXTURE_CUBE_MAP,v,qe);let Ge;if(be){Fe&&Ze&&t.texStorage2D(n.TEXTURE_CUBE_MAP,dt,fe,Je.width,Je.height);for(let ie=0;ie<6;ie++){Ge=j[ie].mipmaps;for(let L=0;L<Ge.length;L++){const re=Ge[L];v.format!==an?Ce!==null?Fe?t.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ie,L,0,0,re.width,re.height,Ce,re.data):t.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ie,L,fe,re.width,re.height,0,re.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Fe?t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ie,L,0,0,re.width,re.height,Ce,Me,re.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ie,L,fe,re.width,re.height,0,Ce,Me,re.data)}}}else{Ge=v.mipmaps,Fe&&Ze&&(Ge.length>0&&dt++,t.texStorage2D(n.TEXTURE_CUBE_MAP,dt,fe,j[0].width,j[0].height));for(let ie=0;ie<6;ie++)if(ze){Fe?t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ie,0,0,0,j[ie].width,j[ie].height,Ce,Me,j[ie].data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ie,0,fe,j[ie].width,j[ie].height,0,Ce,Me,j[ie].data);for(let L=0;L<Ge.length;L++){const ae=Ge[L].image[ie].image;Fe?t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ie,L+1,0,0,ae.width,ae.height,Ce,Me,ae.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ie,L+1,fe,ae.width,ae.height,0,Ce,Me,ae.data)}}else{Fe?t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ie,0,0,0,Ce,Me,j[ie]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ie,0,fe,Ce,Me,j[ie]);for(let L=0;L<Ge.length;L++){const re=Ge[L];Fe?t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ie,L+1,0,0,Ce,Me,re.image[ie]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ie,L+1,fe,Ce,Me,re.image[ie])}}}E(v,qe)&&M(n.TEXTURE_CUBE_MAP),Q.__version=Z.version,v.onUpdate&&v.onUpdate(v)}T.__version=v.version}function _e(T,v,F,J,Z,Q){const me=r.convert(F.format,F.colorSpace),oe=r.convert(F.type),ue=w(F.internalFormat,me,oe,F.colorSpace);if(!i.get(v).__hasExternalTextures){const ze=Math.max(1,v.width>>Q),j=Math.max(1,v.height>>Q);Z===n.TEXTURE_3D||Z===n.TEXTURE_2D_ARRAY?t.texImage3D(Z,Q,ue,ze,j,v.depth,0,me,oe,null):t.texImage2D(Z,Q,ue,ze,j,0,me,oe,null)}t.bindFramebuffer(n.FRAMEBUFFER,T),pe(v)?l.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,J,Z,i.get(F).__webglTexture,0,Le(v)):(Z===n.TEXTURE_2D||Z>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&Z<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,J,Z,i.get(F).__webglTexture,Q),t.bindFramebuffer(n.FRAMEBUFFER,null)}function De(T,v,F){if(n.bindRenderbuffer(n.RENDERBUFFER,T),v.depthBuffer&&!v.stencilBuffer){let J=o===!0?n.DEPTH_COMPONENT24:n.DEPTH_COMPONENT16;if(F||pe(v)){const Z=v.depthTexture;Z&&Z.isDepthTexture&&(Z.type===Nn?J=n.DEPTH_COMPONENT32F:Z.type===In&&(J=n.DEPTH_COMPONENT24));const Q=Le(v);pe(v)?l.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,Q,J,v.width,v.height):n.renderbufferStorageMultisample(n.RENDERBUFFER,Q,J,v.width,v.height)}else n.renderbufferStorage(n.RENDERBUFFER,J,v.width,v.height);n.framebufferRenderbuffer(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.RENDERBUFFER,T)}else if(v.depthBuffer&&v.stencilBuffer){const J=Le(v);F&&pe(v)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,J,n.DEPTH24_STENCIL8,v.width,v.height):pe(v)?l.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,J,n.DEPTH24_STENCIL8,v.width,v.height):n.renderbufferStorage(n.RENDERBUFFER,n.DEPTH_STENCIL,v.width,v.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.RENDERBUFFER,T)}else{const J=v.isWebGLMultipleRenderTargets===!0?v.texture:[v.texture];for(let Z=0;Z<J.length;Z++){const Q=J[Z],me=r.convert(Q.format,Q.colorSpace),oe=r.convert(Q.type),ue=w(Q.internalFormat,me,oe,Q.colorSpace),be=Le(v);F&&pe(v)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,be,ue,v.width,v.height):pe(v)?l.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,be,ue,v.width,v.height):n.renderbufferStorage(n.RENDERBUFFER,ue,v.width,v.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function Ne(T,v){if(v&&v.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(n.FRAMEBUFFER,T),!(v.depthTexture&&v.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!i.get(v.depthTexture).__webglTexture||v.depthTexture.image.width!==v.width||v.depthTexture.image.height!==v.height)&&(v.depthTexture.image.width=v.width,v.depthTexture.image.height=v.height,v.depthTexture.needsUpdate=!0),W(v.depthTexture,0);const J=i.get(v.depthTexture).__webglTexture,Z=Le(v);if(v.depthTexture.format===ai)pe(v)?l.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,J,0,Z):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,J,0);else if(v.depthTexture.format===Bi)pe(v)?l.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,J,0,Z):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,J,0);else throw new Error("Unknown depthTexture format")}function we(T){const v=i.get(T),F=T.isWebGLCubeRenderTarget===!0;if(T.depthTexture&&!v.__autoAllocateDepthBuffer){if(F)throw new Error("target.depthTexture not supported in Cube render targets");Ne(v.__webglFramebuffer,T)}else if(F){v.__webglDepthbuffer=[];for(let J=0;J<6;J++)t.bindFramebuffer(n.FRAMEBUFFER,v.__webglFramebuffer[J]),v.__webglDepthbuffer[J]=n.createRenderbuffer(),De(v.__webglDepthbuffer[J],T,!1)}else t.bindFramebuffer(n.FRAMEBUFFER,v.__webglFramebuffer),v.__webglDepthbuffer=n.createRenderbuffer(),De(v.__webglDepthbuffer,T,!1);t.bindFramebuffer(n.FRAMEBUFFER,null)}function $e(T,v,F){const J=i.get(T);v!==void 0&&_e(J.__webglFramebuffer,T,T.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),F!==void 0&&we(T)}function I(T){const v=T.texture,F=i.get(T),J=i.get(v);T.addEventListener("dispose",H),T.isWebGLMultipleRenderTargets!==!0&&(J.__webglTexture===void 0&&(J.__webglTexture=n.createTexture()),J.__version=v.version,a.memory.textures++);const Z=T.isWebGLCubeRenderTarget===!0,Q=T.isWebGLMultipleRenderTargets===!0,me=m(T)||o;if(Z){F.__webglFramebuffer=[];for(let oe=0;oe<6;oe++)if(o&&v.mipmaps&&v.mipmaps.length>0){F.__webglFramebuffer[oe]=[];for(let ue=0;ue<v.mipmaps.length;ue++)F.__webglFramebuffer[oe][ue]=n.createFramebuffer()}else F.__webglFramebuffer[oe]=n.createFramebuffer()}else{if(o&&v.mipmaps&&v.mipmaps.length>0){F.__webglFramebuffer=[];for(let oe=0;oe<v.mipmaps.length;oe++)F.__webglFramebuffer[oe]=n.createFramebuffer()}else F.__webglFramebuffer=n.createFramebuffer();if(Q)if(s.drawBuffers){const oe=T.texture;for(let ue=0,be=oe.length;ue<be;ue++){const ze=i.get(oe[ue]);ze.__webglTexture===void 0&&(ze.__webglTexture=n.createTexture(),a.memory.textures++)}}else console.warn("THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.");if(o&&T.samples>0&&pe(T)===!1){const oe=Q?v:[v];F.__webglMultisampledFramebuffer=n.createFramebuffer(),F.__webglColorRenderbuffer=[],t.bindFramebuffer(n.FRAMEBUFFER,F.__webglMultisampledFramebuffer);for(let ue=0;ue<oe.length;ue++){const be=oe[ue];F.__webglColorRenderbuffer[ue]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,F.__webglColorRenderbuffer[ue]);const ze=r.convert(be.format,be.colorSpace),j=r.convert(be.type),Je=w(be.internalFormat,ze,j,be.colorSpace,T.isXRRenderTarget===!0),qe=Le(T);n.renderbufferStorageMultisample(n.RENDERBUFFER,qe,Je,T.width,T.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+ue,n.RENDERBUFFER,F.__webglColorRenderbuffer[ue])}n.bindRenderbuffer(n.RENDERBUFFER,null),T.depthBuffer&&(F.__webglDepthRenderbuffer=n.createRenderbuffer(),De(F.__webglDepthRenderbuffer,T,!0)),t.bindFramebuffer(n.FRAMEBUFFER,null)}}if(Z){t.bindTexture(n.TEXTURE_CUBE_MAP,J.__webglTexture),V(n.TEXTURE_CUBE_MAP,v,me);for(let oe=0;oe<6;oe++)if(o&&v.mipmaps&&v.mipmaps.length>0)for(let ue=0;ue<v.mipmaps.length;ue++)_e(F.__webglFramebuffer[oe][ue],T,v,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+oe,ue);else _e(F.__webglFramebuffer[oe],T,v,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+oe,0);E(v,me)&&M(n.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Q){const oe=T.texture;for(let ue=0,be=oe.length;ue<be;ue++){const ze=oe[ue],j=i.get(ze);t.bindTexture(n.TEXTURE_2D,j.__webglTexture),V(n.TEXTURE_2D,ze,me),_e(F.__webglFramebuffer,T,ze,n.COLOR_ATTACHMENT0+ue,n.TEXTURE_2D,0),E(ze,me)&&M(n.TEXTURE_2D)}t.unbindTexture()}else{let oe=n.TEXTURE_2D;if((T.isWebGL3DRenderTarget||T.isWebGLArrayRenderTarget)&&(o?oe=T.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY:console.error("THREE.WebGLTextures: THREE.Data3DTexture and THREE.DataArrayTexture only supported with WebGL2.")),t.bindTexture(oe,J.__webglTexture),V(oe,v,me),o&&v.mipmaps&&v.mipmaps.length>0)for(let ue=0;ue<v.mipmaps.length;ue++)_e(F.__webglFramebuffer[ue],T,v,n.COLOR_ATTACHMENT0,oe,ue);else _e(F.__webglFramebuffer,T,v,n.COLOR_ATTACHMENT0,oe,0);E(v,me)&&M(oe),t.unbindTexture()}T.depthBuffer&&we(T)}function Ut(T){const v=m(T)||o,F=T.isWebGLMultipleRenderTargets===!0?T.texture:[T.texture];for(let J=0,Z=F.length;J<Z;J++){const Q=F[J];if(E(Q,v)){const me=T.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:n.TEXTURE_2D,oe=i.get(Q).__webglTexture;t.bindTexture(me,oe),M(me),t.unbindTexture()}}}function ye(T){if(o&&T.samples>0&&pe(T)===!1){const v=T.isWebGLMultipleRenderTargets?T.texture:[T.texture],F=T.width,J=T.height;let Z=n.COLOR_BUFFER_BIT;const Q=[],me=T.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,oe=i.get(T),ue=T.isWebGLMultipleRenderTargets===!0;if(ue)for(let be=0;be<v.length;be++)t.bindFramebuffer(n.FRAMEBUFFER,oe.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+be,n.RENDERBUFFER,null),t.bindFramebuffer(n.FRAMEBUFFER,oe.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+be,n.TEXTURE_2D,null,0);t.bindFramebuffer(n.READ_FRAMEBUFFER,oe.__webglMultisampledFramebuffer),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,oe.__webglFramebuffer);for(let be=0;be<v.length;be++){Q.push(n.COLOR_ATTACHMENT0+be),T.depthBuffer&&Q.push(me);const ze=oe.__ignoreDepthValues!==void 0?oe.__ignoreDepthValues:!1;if(ze===!1&&(T.depthBuffer&&(Z|=n.DEPTH_BUFFER_BIT),T.stencilBuffer&&(Z|=n.STENCIL_BUFFER_BIT)),ue&&n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,oe.__webglColorRenderbuffer[be]),ze===!0&&(n.invalidateFramebuffer(n.READ_FRAMEBUFFER,[me]),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[me])),ue){const j=i.get(v[be]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,j,0)}n.blitFramebuffer(0,0,F,J,0,0,F,J,Z,n.NEAREST),c&&n.invalidateFramebuffer(n.READ_FRAMEBUFFER,Q)}if(t.bindFramebuffer(n.READ_FRAMEBUFFER,null),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),ue)for(let be=0;be<v.length;be++){t.bindFramebuffer(n.FRAMEBUFFER,oe.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+be,n.RENDERBUFFER,oe.__webglColorRenderbuffer[be]);const ze=i.get(v[be]).__webglTexture;t.bindFramebuffer(n.FRAMEBUFFER,oe.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+be,n.TEXTURE_2D,ze,0)}t.bindFramebuffer(n.DRAW_FRAMEBUFFER,oe.__webglMultisampledFramebuffer)}}function Le(T){return Math.min(s.maxSamples,T.samples)}function pe(T){const v=i.get(T);return o&&T.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&v.__useRenderToTexture!==!1}function ut(T){const v=a.render.frame;h.get(T)!==v&&(h.set(T,v),T.update())}function Be(T,v){const F=T.colorSpace,J=T.format,Z=T.type;return T.isCompressedTexture===!0||T.isVideoTexture===!0||T.format===ea||F!==Rn&&F!==Zt&&(Qe.getTransfer(F)===ot?o===!1?e.has("EXT_sRGB")===!0&&J===an?(T.format=ea,T.minFilter=jt,T.generateMipmaps=!1):v=wl.sRGBToLinear(v):(J!==an||Z!==Hn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",F)),v}this.allocateTextureUnit=D,this.resetTextureUnits=ee,this.setTexture2D=W,this.setTexture2DArray=Y,this.setTexture3D=X,this.setTextureCube=q,this.rebindTextures=$e,this.setupRenderTarget=I,this.updateRenderTargetMipmap=Ut,this.updateMultisampleRenderTarget=ye,this.setupDepthRenderbuffer=we,this.setupFrameBufferTexture=_e,this.useMultisampledRTT=pe}function _m(n,e,t){const i=t.isWebGL2;function s(r,a=Zt){let o;const l=Qe.getTransfer(a);if(r===Hn)return n.UNSIGNED_BYTE;if(r===gl)return n.UNSIGNED_SHORT_4_4_4_4;if(r===_l)return n.UNSIGNED_SHORT_5_5_5_1;if(r===Jc)return n.BYTE;if(r===Qc)return n.SHORT;if(r===aa)return n.UNSIGNED_SHORT;if(r===ml)return n.INT;if(r===In)return n.UNSIGNED_INT;if(r===Nn)return n.FLOAT;if(r===ts)return i?n.HALF_FLOAT:(o=e.get("OES_texture_half_float"),o!==null?o.HALF_FLOAT_OES:null);if(r===eh)return n.ALPHA;if(r===an)return n.RGBA;if(r===th)return n.LUMINANCE;if(r===nh)return n.LUMINANCE_ALPHA;if(r===ai)return n.DEPTH_COMPONENT;if(r===Bi)return n.DEPTH_STENCIL;if(r===ea)return o=e.get("EXT_sRGB"),o!==null?o.SRGB_ALPHA_EXT:null;if(r===ih)return n.RED;if(r===xl)return n.RED_INTEGER;if(r===sh)return n.RG;if(r===vl)return n.RG_INTEGER;if(r===Ml)return n.RGBA_INTEGER;if(r===dr||r===pr||r===mr||r===gr)if(l===ot)if(o=e.get("WEBGL_compressed_texture_s3tc_srgb"),o!==null){if(r===dr)return o.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(r===pr)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(r===mr)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(r===gr)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(o=e.get("WEBGL_compressed_texture_s3tc"),o!==null){if(r===dr)return o.COMPRESSED_RGB_S3TC_DXT1_EXT;if(r===pr)return o.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(r===mr)return o.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(r===gr)return o.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(r===Ba||r===za||r===Ha||r===Ga)if(o=e.get("WEBGL_compressed_texture_pvrtc"),o!==null){if(r===Ba)return o.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(r===za)return o.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(r===Ha)return o.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(r===Ga)return o.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(r===Sl)return o=e.get("WEBGL_compressed_texture_etc1"),o!==null?o.COMPRESSED_RGB_ETC1_WEBGL:null;if(r===ka||r===Va)if(o=e.get("WEBGL_compressed_texture_etc"),o!==null){if(r===ka)return l===ot?o.COMPRESSED_SRGB8_ETC2:o.COMPRESSED_RGB8_ETC2;if(r===Va)return l===ot?o.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:o.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(r===Wa||r===Xa||r===qa||r===Ya||r===$a||r===Ka||r===ja||r===Za||r===Ja||r===Qa||r===eo||r===to||r===no||r===io)if(o=e.get("WEBGL_compressed_texture_astc"),o!==null){if(r===Wa)return l===ot?o.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:o.COMPRESSED_RGBA_ASTC_4x4_KHR;if(r===Xa)return l===ot?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:o.COMPRESSED_RGBA_ASTC_5x4_KHR;if(r===qa)return l===ot?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:o.COMPRESSED_RGBA_ASTC_5x5_KHR;if(r===Ya)return l===ot?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:o.COMPRESSED_RGBA_ASTC_6x5_KHR;if(r===$a)return l===ot?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:o.COMPRESSED_RGBA_ASTC_6x6_KHR;if(r===Ka)return l===ot?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:o.COMPRESSED_RGBA_ASTC_8x5_KHR;if(r===ja)return l===ot?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:o.COMPRESSED_RGBA_ASTC_8x6_KHR;if(r===Za)return l===ot?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:o.COMPRESSED_RGBA_ASTC_8x8_KHR;if(r===Ja)return l===ot?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:o.COMPRESSED_RGBA_ASTC_10x5_KHR;if(r===Qa)return l===ot?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:o.COMPRESSED_RGBA_ASTC_10x6_KHR;if(r===eo)return l===ot?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:o.COMPRESSED_RGBA_ASTC_10x8_KHR;if(r===to)return l===ot?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:o.COMPRESSED_RGBA_ASTC_10x10_KHR;if(r===no)return l===ot?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:o.COMPRESSED_RGBA_ASTC_12x10_KHR;if(r===io)return l===ot?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:o.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(r===_r||r===so||r===ro)if(o=e.get("EXT_texture_compression_bptc"),o!==null){if(r===_r)return l===ot?o.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:o.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(r===so)return o.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(r===ro)return o.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(r===rh||r===ao||r===oo||r===lo)if(o=e.get("EXT_texture_compression_rgtc"),o!==null){if(r===_r)return o.COMPRESSED_RED_RGTC1_EXT;if(r===ao)return o.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(r===oo)return o.COMPRESSED_RED_GREEN_RGTC2_EXT;if(r===lo)return o.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return r===ri?i?n.UNSIGNED_INT_24_8:(o=e.get("WEBGL_depth_texture"),o!==null?o.UNSIGNED_INT_24_8_WEBGL:null):n[r]!==void 0?n[r]:null}return{convert:s}}class xm extends Xt{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class Ht extends Mt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const vm={type:"move"};class kr{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Ht,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Ht,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new C,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new C),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Ht,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new C,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new C),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let s=null,r=null,a=null;const o=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){a=!0;for(const x of e.hand.values()){const m=t.getJointPose(x,i),f=this._getHandJoint(c,x);m!==null&&(f.matrix.fromArray(m.transform.matrix),f.matrix.decompose(f.position,f.rotation,f.scale),f.matrixWorldNeedsUpdate=!0,f.jointRadius=m.radius),f.visible=m!==null}const h=c.joints["index-finger-tip"],u=c.joints["thumb-tip"],p=h.position.distanceTo(u.position),g=.02,_=.005;c.inputState.pinching&&p>g+_?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&p<=g-_&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,i),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(s=t.getPose(e.targetRaySpace,i),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(vm)))}return o!==null&&(o.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const i=new Ht;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}}class Mm extends Gi{constructor(e,t){super();const i=this;let s=null,r=1,a=null,o="local-floor",l=1,c=null,h=null,u=null,p=null,g=null,_=null;const x=t.getContextAttributes();let m=null,f=null;const E=[],M=[],w=new Ye;let P=null;const A=new Xt;A.layers.enable(1),A.viewport=new ct;const R=new Xt;R.layers.enable(2),R.viewport=new ct;const H=[A,R],S=new xm;S.layers.enable(1),S.layers.enable(2);let b=null,G=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(V){let K=E[V];return K===void 0&&(K=new kr,E[V]=K),K.getTargetRaySpace()},this.getControllerGrip=function(V){let K=E[V];return K===void 0&&(K=new kr,E[V]=K),K.getGripSpace()},this.getHand=function(V){let K=E[V];return K===void 0&&(K=new kr,E[V]=K),K.getHandSpace()};function k(V){const K=M.indexOf(V.inputSource);if(K===-1)return;const le=E[K];le!==void 0&&(le.update(V.inputSource,V.frame,c||a),le.dispatchEvent({type:V.type,data:V.inputSource}))}function ee(){s.removeEventListener("select",k),s.removeEventListener("selectstart",k),s.removeEventListener("selectend",k),s.removeEventListener("squeeze",k),s.removeEventListener("squeezestart",k),s.removeEventListener("squeezeend",k),s.removeEventListener("end",ee),s.removeEventListener("inputsourceschange",D);for(let V=0;V<E.length;V++){const K=M[V];K!==null&&(M[V]=null,E[V].disconnect(K))}b=null,G=null,e.setRenderTarget(m),g=null,p=null,u=null,s=null,f=null,ne.stop(),i.isPresenting=!1,e.setPixelRatio(P),e.setSize(w.width,w.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(V){r=V,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(V){o=V,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(V){c=V},this.getBaseLayer=function(){return p!==null?p:g},this.getBinding=function(){return u},this.getFrame=function(){return _},this.getSession=function(){return s},this.setSession=async function(V){if(s=V,s!==null){if(m=e.getRenderTarget(),s.addEventListener("select",k),s.addEventListener("selectstart",k),s.addEventListener("selectend",k),s.addEventListener("squeeze",k),s.addEventListener("squeezestart",k),s.addEventListener("squeezeend",k),s.addEventListener("end",ee),s.addEventListener("inputsourceschange",D),x.xrCompatible!==!0&&await t.makeXRCompatible(),P=e.getPixelRatio(),e.getSize(w),s.renderState.layers===void 0||e.capabilities.isWebGL2===!1){const K={antialias:s.renderState.layers===void 0?x.antialias:!0,alpha:!0,depth:x.depth,stencil:x.stencil,framebufferScaleFactor:r};g=new XRWebGLLayer(s,t,K),s.updateRenderState({baseLayer:g}),e.setPixelRatio(1),e.setSize(g.framebufferWidth,g.framebufferHeight,!1),f=new li(g.framebufferWidth,g.framebufferHeight,{format:an,type:Hn,colorSpace:e.outputColorSpace,stencilBuffer:x.stencil})}else{let K=null,le=null,xe=null;x.depth&&(xe=x.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,K=x.stencil?Bi:ai,le=x.stencil?ri:In);const _e={colorFormat:t.RGBA8,depthFormat:xe,scaleFactor:r};u=new XRWebGLBinding(s,t),p=u.createProjectionLayer(_e),s.updateRenderState({layers:[p]}),e.setPixelRatio(1),e.setSize(p.textureWidth,p.textureHeight,!1),f=new li(p.textureWidth,p.textureHeight,{format:an,type:Hn,depthTexture:new Bl(p.textureWidth,p.textureHeight,le,void 0,void 0,void 0,void 0,void 0,void 0,K),stencilBuffer:x.stencil,colorSpace:e.outputColorSpace,samples:x.antialias?4:0});const De=e.properties.get(f);De.__ignoreDepthValues=p.ignoreDepthValues}f.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await s.requestReferenceSpace(o),ne.setContext(s),ne.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode};function D(V){for(let K=0;K<V.removed.length;K++){const le=V.removed[K],xe=M.indexOf(le);xe>=0&&(M[xe]=null,E[xe].disconnect(le))}for(let K=0;K<V.added.length;K++){const le=V.added[K];let xe=M.indexOf(le);if(xe===-1){for(let De=0;De<E.length;De++)if(De>=M.length){M.push(le),xe=De;break}else if(M[De]===null){M[De]=le,xe=De;break}if(xe===-1)break}const _e=E[xe];_e&&_e.connect(le)}}const B=new C,W=new C;function Y(V,K,le){B.setFromMatrixPosition(K.matrixWorld),W.setFromMatrixPosition(le.matrixWorld);const xe=B.distanceTo(W),_e=K.projectionMatrix.elements,De=le.projectionMatrix.elements,Ne=_e[14]/(_e[10]-1),we=_e[14]/(_e[10]+1),$e=(_e[9]+1)/_e[5],I=(_e[9]-1)/_e[5],Ut=(_e[8]-1)/_e[0],ye=(De[8]+1)/De[0],Le=Ne*Ut,pe=Ne*ye,ut=xe/(-Ut+ye),Be=ut*-Ut;K.matrixWorld.decompose(V.position,V.quaternion,V.scale),V.translateX(Be),V.translateZ(ut),V.matrixWorld.compose(V.position,V.quaternion,V.scale),V.matrixWorldInverse.copy(V.matrixWorld).invert();const T=Ne+ut,v=we+ut,F=Le-Be,J=pe+(xe-Be),Z=$e*we/v*T,Q=I*we/v*T;V.projectionMatrix.makePerspective(F,J,Z,Q,T,v),V.projectionMatrixInverse.copy(V.projectionMatrix).invert()}function X(V,K){K===null?V.matrixWorld.copy(V.matrix):V.matrixWorld.multiplyMatrices(K.matrixWorld,V.matrix),V.matrixWorldInverse.copy(V.matrixWorld).invert()}this.updateCamera=function(V){if(s===null)return;S.near=R.near=A.near=V.near,S.far=R.far=A.far=V.far,(b!==S.near||G!==S.far)&&(s.updateRenderState({depthNear:S.near,depthFar:S.far}),b=S.near,G=S.far);const K=V.parent,le=S.cameras;X(S,K);for(let xe=0;xe<le.length;xe++)X(le[xe],K);le.length===2?Y(S,A,R):S.projectionMatrix.copy(A.projectionMatrix),q(V,S,K)};function q(V,K,le){le===null?V.matrix.copy(K.matrixWorld):(V.matrix.copy(le.matrixWorld),V.matrix.invert(),V.matrix.multiply(K.matrixWorld)),V.matrix.decompose(V.position,V.quaternion,V.scale),V.updateMatrixWorld(!0),V.projectionMatrix.copy(K.projectionMatrix),V.projectionMatrixInverse.copy(K.projectionMatrixInverse),V.isPerspectiveCamera&&(V.fov=ta*2*Math.atan(1/V.projectionMatrix.elements[5]),V.zoom=1)}this.getCamera=function(){return S},this.getFoveation=function(){if(!(p===null&&g===null))return l},this.setFoveation=function(V){l=V,p!==null&&(p.fixedFoveation=V),g!==null&&g.fixedFoveation!==void 0&&(g.fixedFoveation=V)};let $=null;function te(V,K){if(h=K.getViewerPose(c||a),_=K,h!==null){const le=h.views;g!==null&&(e.setRenderTargetFramebuffer(f,g.framebuffer),e.setRenderTarget(f));let xe=!1;le.length!==S.cameras.length&&(S.cameras.length=0,xe=!0);for(let _e=0;_e<le.length;_e++){const De=le[_e];let Ne=null;if(g!==null)Ne=g.getViewport(De);else{const $e=u.getViewSubImage(p,De);Ne=$e.viewport,_e===0&&(e.setRenderTargetTextures(f,$e.colorTexture,p.ignoreDepthValues?void 0:$e.depthStencilTexture),e.setRenderTarget(f))}let we=H[_e];we===void 0&&(we=new Xt,we.layers.enable(_e),we.viewport=new ct,H[_e]=we),we.matrix.fromArray(De.transform.matrix),we.matrix.decompose(we.position,we.quaternion,we.scale),we.projectionMatrix.fromArray(De.projectionMatrix),we.projectionMatrixInverse.copy(we.projectionMatrix).invert(),we.viewport.set(Ne.x,Ne.y,Ne.width,Ne.height),_e===0&&(S.matrix.copy(we.matrix),S.matrix.decompose(S.position,S.quaternion,S.scale)),xe===!0&&S.cameras.push(we)}}for(let le=0;le<E.length;le++){const xe=M[le],_e=E[le];xe!==null&&_e!==void 0&&_e.update(xe,K,c||a)}$&&$(V,K),K.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:K}),_=null}const ne=new Fl;ne.setAnimationLoop(te),this.setAnimationLoop=function(V){$=V},this.dispose=function(){}}}function Sm(n,e){function t(m,f){m.matrixAutoUpdate===!0&&m.updateMatrix(),f.value.copy(m.matrix)}function i(m,f){f.color.getRGB(m.fogColor.value,Ul(n)),f.isFog?(m.fogNear.value=f.near,m.fogFar.value=f.far):f.isFogExp2&&(m.fogDensity.value=f.density)}function s(m,f,E,M,w){f.isMeshBasicMaterial||f.isMeshLambertMaterial?r(m,f):f.isMeshToonMaterial?(r(m,f),u(m,f)):f.isMeshPhongMaterial?(r(m,f),h(m,f)):f.isMeshStandardMaterial?(r(m,f),p(m,f),f.isMeshPhysicalMaterial&&g(m,f,w)):f.isMeshMatcapMaterial?(r(m,f),_(m,f)):f.isMeshDepthMaterial?r(m,f):f.isMeshDistanceMaterial?(r(m,f),x(m,f)):f.isMeshNormalMaterial?r(m,f):f.isLineBasicMaterial?(a(m,f),f.isLineDashedMaterial&&o(m,f)):f.isPointsMaterial?l(m,f,E,M):f.isSpriteMaterial?c(m,f):f.isShadowMaterial?(m.color.value.copy(f.color),m.opacity.value=f.opacity):f.isShaderMaterial&&(f.uniformsNeedUpdate=!1)}function r(m,f){m.opacity.value=f.opacity,f.color&&m.diffuse.value.copy(f.color),f.emissive&&m.emissive.value.copy(f.emissive).multiplyScalar(f.emissiveIntensity),f.map&&(m.map.value=f.map,t(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,t(f.alphaMap,m.alphaMapTransform)),f.bumpMap&&(m.bumpMap.value=f.bumpMap,t(f.bumpMap,m.bumpMapTransform),m.bumpScale.value=f.bumpScale,f.side===Gt&&(m.bumpScale.value*=-1)),f.normalMap&&(m.normalMap.value=f.normalMap,t(f.normalMap,m.normalMapTransform),m.normalScale.value.copy(f.normalScale),f.side===Gt&&m.normalScale.value.negate()),f.displacementMap&&(m.displacementMap.value=f.displacementMap,t(f.displacementMap,m.displacementMapTransform),m.displacementScale.value=f.displacementScale,m.displacementBias.value=f.displacementBias),f.emissiveMap&&(m.emissiveMap.value=f.emissiveMap,t(f.emissiveMap,m.emissiveMapTransform)),f.specularMap&&(m.specularMap.value=f.specularMap,t(f.specularMap,m.specularMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest);const E=e.get(f).envMap;if(E&&(m.envMap.value=E,m.flipEnvMap.value=E.isCubeTexture&&E.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=f.reflectivity,m.ior.value=f.ior,m.refractionRatio.value=f.refractionRatio),f.lightMap){m.lightMap.value=f.lightMap;const M=n._useLegacyLights===!0?Math.PI:1;m.lightMapIntensity.value=f.lightMapIntensity*M,t(f.lightMap,m.lightMapTransform)}f.aoMap&&(m.aoMap.value=f.aoMap,m.aoMapIntensity.value=f.aoMapIntensity,t(f.aoMap,m.aoMapTransform))}function a(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,f.map&&(m.map.value=f.map,t(f.map,m.mapTransform))}function o(m,f){m.dashSize.value=f.dashSize,m.totalSize.value=f.dashSize+f.gapSize,m.scale.value=f.scale}function l(m,f,E,M){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.size.value=f.size*E,m.scale.value=M*.5,f.map&&(m.map.value=f.map,t(f.map,m.uvTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,t(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function c(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.rotation.value=f.rotation,f.map&&(m.map.value=f.map,t(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,t(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function h(m,f){m.specular.value.copy(f.specular),m.shininess.value=Math.max(f.shininess,1e-4)}function u(m,f){f.gradientMap&&(m.gradientMap.value=f.gradientMap)}function p(m,f){m.metalness.value=f.metalness,f.metalnessMap&&(m.metalnessMap.value=f.metalnessMap,t(f.metalnessMap,m.metalnessMapTransform)),m.roughness.value=f.roughness,f.roughnessMap&&(m.roughnessMap.value=f.roughnessMap,t(f.roughnessMap,m.roughnessMapTransform)),e.get(f).envMap&&(m.envMapIntensity.value=f.envMapIntensity)}function g(m,f,E){m.ior.value=f.ior,f.sheen>0&&(m.sheenColor.value.copy(f.sheenColor).multiplyScalar(f.sheen),m.sheenRoughness.value=f.sheenRoughness,f.sheenColorMap&&(m.sheenColorMap.value=f.sheenColorMap,t(f.sheenColorMap,m.sheenColorMapTransform)),f.sheenRoughnessMap&&(m.sheenRoughnessMap.value=f.sheenRoughnessMap,t(f.sheenRoughnessMap,m.sheenRoughnessMapTransform))),f.clearcoat>0&&(m.clearcoat.value=f.clearcoat,m.clearcoatRoughness.value=f.clearcoatRoughness,f.clearcoatMap&&(m.clearcoatMap.value=f.clearcoatMap,t(f.clearcoatMap,m.clearcoatMapTransform)),f.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=f.clearcoatRoughnessMap,t(f.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),f.clearcoatNormalMap&&(m.clearcoatNormalMap.value=f.clearcoatNormalMap,t(f.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(f.clearcoatNormalScale),f.side===Gt&&m.clearcoatNormalScale.value.negate())),f.iridescence>0&&(m.iridescence.value=f.iridescence,m.iridescenceIOR.value=f.iridescenceIOR,m.iridescenceThicknessMinimum.value=f.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=f.iridescenceThicknessRange[1],f.iridescenceMap&&(m.iridescenceMap.value=f.iridescenceMap,t(f.iridescenceMap,m.iridescenceMapTransform)),f.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=f.iridescenceThicknessMap,t(f.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),f.transmission>0&&(m.transmission.value=f.transmission,m.transmissionSamplerMap.value=E.texture,m.transmissionSamplerSize.value.set(E.width,E.height),f.transmissionMap&&(m.transmissionMap.value=f.transmissionMap,t(f.transmissionMap,m.transmissionMapTransform)),m.thickness.value=f.thickness,f.thicknessMap&&(m.thicknessMap.value=f.thicknessMap,t(f.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=f.attenuationDistance,m.attenuationColor.value.copy(f.attenuationColor)),f.anisotropy>0&&(m.anisotropyVector.value.set(f.anisotropy*Math.cos(f.anisotropyRotation),f.anisotropy*Math.sin(f.anisotropyRotation)),f.anisotropyMap&&(m.anisotropyMap.value=f.anisotropyMap,t(f.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=f.specularIntensity,m.specularColor.value.copy(f.specularColor),f.specularColorMap&&(m.specularColorMap.value=f.specularColorMap,t(f.specularColorMap,m.specularColorMapTransform)),f.specularIntensityMap&&(m.specularIntensityMap.value=f.specularIntensityMap,t(f.specularIntensityMap,m.specularIntensityMapTransform))}function _(m,f){f.matcap&&(m.matcap.value=f.matcap)}function x(m,f){const E=e.get(f).light;m.referencePosition.value.setFromMatrixPosition(E.matrixWorld),m.nearDistance.value=E.shadow.camera.near,m.farDistance.value=E.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:s}}function ym(n,e,t,i){let s={},r={},a=[];const o=t.isWebGL2?n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS):0;function l(E,M){const w=M.program;i.uniformBlockBinding(E,w)}function c(E,M){let w=s[E.id];w===void 0&&(_(E),w=h(E),s[E.id]=w,E.addEventListener("dispose",m));const P=M.program;i.updateUBOMapping(E,P);const A=e.render.frame;r[E.id]!==A&&(p(E),r[E.id]=A)}function h(E){const M=u();E.__bindingPointIndex=M;const w=n.createBuffer(),P=E.__size,A=E.usage;return n.bindBuffer(n.UNIFORM_BUFFER,w),n.bufferData(n.UNIFORM_BUFFER,P,A),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,M,w),w}function u(){for(let E=0;E<o;E++)if(a.indexOf(E)===-1)return a.push(E),E;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function p(E){const M=s[E.id],w=E.uniforms,P=E.__cache;n.bindBuffer(n.UNIFORM_BUFFER,M);for(let A=0,R=w.length;A<R;A++){const H=Array.isArray(w[A])?w[A]:[w[A]];for(let S=0,b=H.length;S<b;S++){const G=H[S];if(g(G,A,S,P)===!0){const k=G.__offset,ee=Array.isArray(G.value)?G.value:[G.value];let D=0;for(let B=0;B<ee.length;B++){const W=ee[B],Y=x(W);typeof W=="number"||typeof W=="boolean"?(G.__data[0]=W,n.bufferSubData(n.UNIFORM_BUFFER,k+D,G.__data)):W.isMatrix3?(G.__data[0]=W.elements[0],G.__data[1]=W.elements[1],G.__data[2]=W.elements[2],G.__data[3]=0,G.__data[4]=W.elements[3],G.__data[5]=W.elements[4],G.__data[6]=W.elements[5],G.__data[7]=0,G.__data[8]=W.elements[6],G.__data[9]=W.elements[7],G.__data[10]=W.elements[8],G.__data[11]=0):(W.toArray(G.__data,D),D+=Y.storage/Float32Array.BYTES_PER_ELEMENT)}n.bufferSubData(n.UNIFORM_BUFFER,k,G.__data)}}}n.bindBuffer(n.UNIFORM_BUFFER,null)}function g(E,M,w,P){const A=E.value,R=M+"_"+w;if(P[R]===void 0)return typeof A=="number"||typeof A=="boolean"?P[R]=A:P[R]=A.clone(),!0;{const H=P[R];if(typeof A=="number"||typeof A=="boolean"){if(H!==A)return P[R]=A,!0}else if(H.equals(A)===!1)return H.copy(A),!0}return!1}function _(E){const M=E.uniforms;let w=0;const P=16;for(let R=0,H=M.length;R<H;R++){const S=Array.isArray(M[R])?M[R]:[M[R]];for(let b=0,G=S.length;b<G;b++){const k=S[b],ee=Array.isArray(k.value)?k.value:[k.value];for(let D=0,B=ee.length;D<B;D++){const W=ee[D],Y=x(W),X=w%P;X!==0&&P-X<Y.boundary&&(w+=P-X),k.__data=new Float32Array(Y.storage/Float32Array.BYTES_PER_ELEMENT),k.__offset=w,w+=Y.storage}}}const A=w%P;return A>0&&(w+=P-A),E.__size=w,E.__cache={},this}function x(E){const M={boundary:0,storage:0};return typeof E=="number"||typeof E=="boolean"?(M.boundary=4,M.storage=4):E.isVector2?(M.boundary=8,M.storage=8):E.isVector3||E.isColor?(M.boundary=16,M.storage=12):E.isVector4?(M.boundary=16,M.storage=16):E.isMatrix3?(M.boundary=48,M.storage=48):E.isMatrix4?(M.boundary=64,M.storage=64):E.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",E),M}function m(E){const M=E.target;M.removeEventListener("dispose",m);const w=a.indexOf(M.__bindingPointIndex);a.splice(w,1),n.deleteBuffer(s[M.id]),delete s[M.id],delete r[M.id]}function f(){for(const E in s)n.deleteBuffer(s[E]);a=[],s={},r={}}return{bind:l,update:c,dispose:f}}class Wl{constructor(e={}){const{canvas:t=_h(),context:i=null,depth:s=!0,stencil:r=!0,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1}=e;this.isWebGLRenderer=!0;let p;i!==null?p=i.getContextAttributes().alpha:p=a;const g=new Uint32Array(4),_=new Int32Array(4);let x=null,m=null;const f=[],E=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=At,this._useLegacyLights=!1,this.toneMapping=zn,this.toneMappingExposure=1;const M=this;let w=!1,P=0,A=0,R=null,H=-1,S=null;const b=new ct,G=new ct;let k=null;const ee=new We(0);let D=0,B=t.width,W=t.height,Y=1,X=null,q=null;const $=new ct(0,0,B,W),te=new ct(0,0,B,W);let ne=!1;const V=new ca;let K=!1,le=!1,xe=null;const _e=new mt,De=new Ye,Ne=new C,we={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function $e(){return R===null?Y:1}let I=i;function Ut(y,U){for(let O=0;O<y.length;O++){const z=y[O],N=t.getContext(z,U);if(N!==null)return N}return null}try{const y={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${ra}`),t.addEventListener("webglcontextlost",ie,!1),t.addEventListener("webglcontextrestored",L,!1),t.addEventListener("webglcontextcreationerror",re,!1),I===null){const U=["webgl2","webgl","experimental-webgl"];if(M.isWebGL1Renderer===!0&&U.shift(),I=Ut(U,y),I===null)throw Ut(U)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}typeof WebGLRenderingContext<"u"&&I instanceof WebGLRenderingContext&&console.warn("THREE.WebGLRenderer: WebGL 1 support was deprecated in r153 and will be removed in r163."),I.getShaderPrecisionFormat===void 0&&(I.getShaderPrecisionFormat=function(){return{rangeMin:1,rangeMax:1,precision:1}})}catch(y){throw console.error("THREE.WebGLRenderer: "+y.message),y}let ye,Le,pe,ut,Be,T,v,F,J,Z,Q,me,oe,ue,be,ze,j,Je,qe,Ce,Me,fe,Fe,Ze;function dt(){ye=new Dd(I),Le=new wd(I,ye,e),ye.init(Le),fe=new _m(I,ye,Le),pe=new mm(I,ye,Le),ut=new Nd(I),Be=new tm,T=new gm(I,ye,pe,Be,Le,fe,ut),v=new Rd(M),F=new Pd(M),J=new kh(I,Le),Fe=new Td(I,ye,J,Le),Z=new Ud(I,J,ut,Fe),Q=new zd(I,Z,J,ut),qe=new Bd(I,Le,T),ze=new Ad(Be),me=new em(M,v,F,ye,Le,Fe,ze),oe=new Sm(M,Be),ue=new im,be=new cm(ye,Le),Je=new Ed(M,v,F,pe,Q,p,l),j=new pm(M,Q,Le),Ze=new ym(I,ut,Le,pe),Ce=new bd(I,ye,ut,Le),Me=new Id(I,ye,ut,Le),ut.programs=me.programs,M.capabilities=Le,M.extensions=ye,M.properties=Be,M.renderLists=ue,M.shadowMap=j,M.state=pe,M.info=ut}dt();const Ge=new Mm(M,I);this.xr=Ge,this.getContext=function(){return I},this.getContextAttributes=function(){return I.getContextAttributes()},this.forceContextLoss=function(){const y=ye.get("WEBGL_lose_context");y&&y.loseContext()},this.forceContextRestore=function(){const y=ye.get("WEBGL_lose_context");y&&y.restoreContext()},this.getPixelRatio=function(){return Y},this.setPixelRatio=function(y){y!==void 0&&(Y=y,this.setSize(B,W,!1))},this.getSize=function(y){return y.set(B,W)},this.setSize=function(y,U,O=!0){if(Ge.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}B=y,W=U,t.width=Math.floor(y*Y),t.height=Math.floor(U*Y),O===!0&&(t.style.width=y+"px",t.style.height=U+"px"),this.setViewport(0,0,y,U)},this.getDrawingBufferSize=function(y){return y.set(B*Y,W*Y).floor()},this.setDrawingBufferSize=function(y,U,O){B=y,W=U,Y=O,t.width=Math.floor(y*O),t.height=Math.floor(U*O),this.setViewport(0,0,y,U)},this.getCurrentViewport=function(y){return y.copy(b)},this.getViewport=function(y){return y.copy($)},this.setViewport=function(y,U,O,z){y.isVector4?$.set(y.x,y.y,y.z,y.w):$.set(y,U,O,z),pe.viewport(b.copy($).multiplyScalar(Y).floor())},this.getScissor=function(y){return y.copy(te)},this.setScissor=function(y,U,O,z){y.isVector4?te.set(y.x,y.y,y.z,y.w):te.set(y,U,O,z),pe.scissor(G.copy(te).multiplyScalar(Y).floor())},this.getScissorTest=function(){return ne},this.setScissorTest=function(y){pe.setScissorTest(ne=y)},this.setOpaqueSort=function(y){X=y},this.setTransparentSort=function(y){q=y},this.getClearColor=function(y){return y.copy(Je.getClearColor())},this.setClearColor=function(){Je.setClearColor.apply(Je,arguments)},this.getClearAlpha=function(){return Je.getClearAlpha()},this.setClearAlpha=function(){Je.setClearAlpha.apply(Je,arguments)},this.clear=function(y=!0,U=!0,O=!0){let z=0;if(y){let N=!1;if(R!==null){const ce=R.texture.format;N=ce===Ml||ce===vl||ce===xl}if(N){const ce=R.texture.type,ge=ce===Hn||ce===In||ce===aa||ce===ri||ce===gl||ce===_l,Te=Je.getClearColor(),Re=Je.getClearAlpha(),He=Te.r,Pe=Te.g,Ue=Te.b;ge?(g[0]=He,g[1]=Pe,g[2]=Ue,g[3]=Re,I.clearBufferuiv(I.COLOR,0,g)):(_[0]=He,_[1]=Pe,_[2]=Ue,_[3]=Re,I.clearBufferiv(I.COLOR,0,_))}else z|=I.COLOR_BUFFER_BIT}U&&(z|=I.DEPTH_BUFFER_BIT),O&&(z|=I.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),I.clear(z)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",ie,!1),t.removeEventListener("webglcontextrestored",L,!1),t.removeEventListener("webglcontextcreationerror",re,!1),ue.dispose(),be.dispose(),Be.dispose(),v.dispose(),F.dispose(),Q.dispose(),Fe.dispose(),Ze.dispose(),me.dispose(),Ge.dispose(),Ge.removeEventListener("sessionstart",It),Ge.removeEventListener("sessionend",rt),xe&&(xe.dispose(),xe=null),Nt.stop()};function ie(y){y.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),w=!0}function L(){console.log("THREE.WebGLRenderer: Context Restored."),w=!1;const y=ut.autoReset,U=j.enabled,O=j.autoUpdate,z=j.needsUpdate,N=j.type;dt(),ut.autoReset=y,j.enabled=U,j.autoUpdate=O,j.needsUpdate=z,j.type=N}function re(y){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",y.statusMessage)}function ae(y){const U=y.target;U.removeEventListener("dispose",ae),Ae(U)}function Ae(y){Ee(y),Be.remove(y)}function Ee(y){const U=Be.get(y).programs;U!==void 0&&(U.forEach(function(O){me.releaseProgram(O)}),y.isShaderMaterial&&me.releaseShaderCache(y))}this.renderBufferDirect=function(y,U,O,z,N,ce){U===null&&(U=we);const ge=N.isMesh&&N.matrixWorld.determinant()<0,Te=pc(y,U,O,z,N);pe.setMaterial(z,ge);let Re=O.index,He=1;if(z.wireframe===!0){if(Re=Z.getWireframeAttribute(O),Re===void 0)return;He=2}const Pe=O.drawRange,Ue=O.attributes.position;let gt=Pe.start*He,kt=(Pe.start+Pe.count)*He;ce!==null&&(gt=Math.max(gt,ce.start*He),kt=Math.min(kt,(ce.start+ce.count)*He)),Re!==null?(gt=Math.max(gt,0),kt=Math.min(kt,Re.count)):Ue!=null&&(gt=Math.max(gt,0),kt=Math.min(kt,Ue.count));const Tt=kt-gt;if(Tt<0||Tt===1/0)return;Fe.setup(N,z,Te,O,Re);let gn,ft=Ce;if(Re!==null&&(gn=J.get(Re),ft=Me,ft.setIndex(gn)),N.isMesh)z.wireframe===!0?(pe.setLineWidth(z.wireframeLinewidth*$e()),ft.setMode(I.LINES)):ft.setMode(I.TRIANGLES);else if(N.isLine){let ke=z.linewidth;ke===void 0&&(ke=1),pe.setLineWidth(ke*$e()),N.isLineSegments?ft.setMode(I.LINES):N.isLineLoop?ft.setMode(I.LINE_LOOP):ft.setMode(I.LINE_STRIP)}else N.isPoints?ft.setMode(I.POINTS):N.isSprite&&ft.setMode(I.TRIANGLES);if(N.isBatchedMesh)ft.renderMultiDraw(N._multiDrawStarts,N._multiDrawCounts,N._multiDrawCount);else if(N.isInstancedMesh)ft.renderInstances(gt,Tt,N.count);else if(O.isInstancedBufferGeometry){const ke=O._maxInstanceCount!==void 0?O._maxInstanceCount:1/0,lr=Math.min(O.instanceCount,ke);ft.renderInstances(gt,Tt,lr)}else ft.render(gt,Tt)};function it(y,U,O){y.transparent===!0&&y.side===fn&&y.forceSinglePass===!1?(y.side=Gt,y.needsUpdate=!0,ms(y,U,O),y.side=Gn,y.needsUpdate=!0,ms(y,U,O),y.side=fn):ms(y,U,O)}this.compile=function(y,U,O=null){O===null&&(O=y),m=be.get(O),m.init(),E.push(m),O.traverseVisible(function(N){N.isLight&&N.layers.test(U.layers)&&(m.pushLight(N),N.castShadow&&m.pushShadow(N))}),y!==O&&y.traverseVisible(function(N){N.isLight&&N.layers.test(U.layers)&&(m.pushLight(N),N.castShadow&&m.pushShadow(N))}),m.setupLights(M._useLegacyLights);const z=new Set;return y.traverse(function(N){const ce=N.material;if(ce)if(Array.isArray(ce))for(let ge=0;ge<ce.length;ge++){const Te=ce[ge];it(Te,O,N),z.add(Te)}else it(ce,O,N),z.add(ce)}),E.pop(),m=null,z},this.compileAsync=function(y,U,O=null){const z=this.compile(y,U,O);return new Promise(N=>{function ce(){if(z.forEach(function(ge){Be.get(ge).currentProgram.isReady()&&z.delete(ge)}),z.size===0){N(y);return}setTimeout(ce,10)}ye.get("KHR_parallel_shader_compile")!==null?ce():setTimeout(ce,10)})};let st=null;function Et(y){st&&st(y)}function It(){Nt.stop()}function rt(){Nt.start()}const Nt=new Fl;Nt.setAnimationLoop(Et),typeof self<"u"&&Nt.setContext(self),this.setAnimationLoop=function(y){st=y,Ge.setAnimationLoop(y),y===null?Nt.stop():Nt.start()},Ge.addEventListener("sessionstart",It),Ge.addEventListener("sessionend",rt),this.render=function(y,U){if(U!==void 0&&U.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(w===!0)return;y.matrixWorldAutoUpdate===!0&&y.updateMatrixWorld(),U.parent===null&&U.matrixWorldAutoUpdate===!0&&U.updateMatrixWorld(),Ge.enabled===!0&&Ge.isPresenting===!0&&(Ge.cameraAutoUpdate===!0&&Ge.updateCamera(U),U=Ge.getCamera()),y.isScene===!0&&y.onBeforeRender(M,y,U,R),m=be.get(y,E.length),m.init(),E.push(m),_e.multiplyMatrices(U.projectionMatrix,U.matrixWorldInverse),V.setFromProjectionMatrix(_e),le=this.localClippingEnabled,K=ze.init(this.clippingPlanes,le),x=ue.get(y,f.length),x.init(),f.push(x),cn(y,U,0,M.sortObjects),x.finish(),M.sortObjects===!0&&x.sort(X,q),this.info.render.frame++,K===!0&&ze.beginShadows();const O=m.state.shadowsArray;if(j.render(O,y,U),K===!0&&ze.endShadows(),this.info.autoReset===!0&&this.info.reset(),Je.render(x,y),m.setupLights(M._useLegacyLights),U.isArrayCamera){const z=U.cameras;for(let N=0,ce=z.length;N<ce;N++){const ge=z[N];wa(x,y,ge,ge.viewport)}}else wa(x,y,U);R!==null&&(T.updateMultisampleRenderTarget(R),T.updateRenderTargetMipmap(R)),y.isScene===!0&&y.onAfterRender(M,y,U),Fe.resetDefaultState(),H=-1,S=null,E.pop(),E.length>0?m=E[E.length-1]:m=null,f.pop(),f.length>0?x=f[f.length-1]:x=null};function cn(y,U,O,z){if(y.visible===!1)return;if(y.layers.test(U.layers)){if(y.isGroup)O=y.renderOrder;else if(y.isLOD)y.autoUpdate===!0&&y.update(U);else if(y.isLight)m.pushLight(y),y.castShadow&&m.pushShadow(y);else if(y.isSprite){if(!y.frustumCulled||V.intersectsSprite(y)){z&&Ne.setFromMatrixPosition(y.matrixWorld).applyMatrix4(_e);const ge=Q.update(y),Te=y.material;Te.visible&&x.push(y,ge,Te,O,Ne.z,null)}}else if((y.isMesh||y.isLine||y.isPoints)&&(!y.frustumCulled||V.intersectsObject(y))){const ge=Q.update(y),Te=y.material;if(z&&(y.boundingSphere!==void 0?(y.boundingSphere===null&&y.computeBoundingSphere(),Ne.copy(y.boundingSphere.center)):(ge.boundingSphere===null&&ge.computeBoundingSphere(),Ne.copy(ge.boundingSphere.center)),Ne.applyMatrix4(y.matrixWorld).applyMatrix4(_e)),Array.isArray(Te)){const Re=ge.groups;for(let He=0,Pe=Re.length;He<Pe;He++){const Ue=Re[He],gt=Te[Ue.materialIndex];gt&&gt.visible&&x.push(y,ge,gt,O,Ne.z,Ue)}}else Te.visible&&x.push(y,ge,Te,O,Ne.z,null)}}const ce=y.children;for(let ge=0,Te=ce.length;ge<Te;ge++)cn(ce[ge],U,O,z)}function wa(y,U,O,z){const N=y.opaque,ce=y.transmissive,ge=y.transparent;m.setupLightsView(O),K===!0&&ze.setGlobalState(M.clippingPlanes,O),ce.length>0&&dc(N,ce,U,O),z&&pe.viewport(b.copy(z)),N.length>0&&ps(N,U,O),ce.length>0&&ps(ce,U,O),ge.length>0&&ps(ge,U,O),pe.buffers.depth.setTest(!0),pe.buffers.depth.setMask(!0),pe.buffers.color.setMask(!0),pe.setPolygonOffset(!1)}function dc(y,U,O,z){if((O.isScene===!0?O.overrideMaterial:null)!==null)return;const ce=Le.isWebGL2;xe===null&&(xe=new li(1,1,{generateMipmaps:!0,type:ye.has("EXT_color_buffer_half_float")?ts:Hn,minFilter:es,samples:ce?4:0})),M.getDrawingBufferSize(De),ce?xe.setSize(De.x,De.y):xe.setSize(na(De.x),na(De.y));const ge=M.getRenderTarget();M.setRenderTarget(xe),M.getClearColor(ee),D=M.getClearAlpha(),D<1&&M.setClearColor(16777215,.5),M.clear();const Te=M.toneMapping;M.toneMapping=zn,ps(y,O,z),T.updateMultisampleRenderTarget(xe),T.updateRenderTargetMipmap(xe);let Re=!1;for(let He=0,Pe=U.length;He<Pe;He++){const Ue=U[He],gt=Ue.object,kt=Ue.geometry,Tt=Ue.material,gn=Ue.group;if(Tt.side===fn&&gt.layers.test(z.layers)){const ft=Tt.side;Tt.side=Gt,Tt.needsUpdate=!0,Aa(gt,O,z,kt,Tt,gn),Tt.side=ft,Tt.needsUpdate=!0,Re=!0}}Re===!0&&(T.updateMultisampleRenderTarget(xe),T.updateRenderTargetMipmap(xe)),M.setRenderTarget(ge),M.setClearColor(ee,D),M.toneMapping=Te}function ps(y,U,O){const z=U.isScene===!0?U.overrideMaterial:null;for(let N=0,ce=y.length;N<ce;N++){const ge=y[N],Te=ge.object,Re=ge.geometry,He=z===null?ge.material:z,Pe=ge.group;Te.layers.test(O.layers)&&Aa(Te,U,O,Re,He,Pe)}}function Aa(y,U,O,z,N,ce){y.onBeforeRender(M,U,O,z,N,ce),y.modelViewMatrix.multiplyMatrices(O.matrixWorldInverse,y.matrixWorld),y.normalMatrix.getNormalMatrix(y.modelViewMatrix),N.onBeforeRender(M,U,O,z,y,ce),N.transparent===!0&&N.side===fn&&N.forceSinglePass===!1?(N.side=Gt,N.needsUpdate=!0,M.renderBufferDirect(O,U,z,N,y,ce),N.side=Gn,N.needsUpdate=!0,M.renderBufferDirect(O,U,z,N,y,ce),N.side=fn):M.renderBufferDirect(O,U,z,N,y,ce),y.onAfterRender(M,U,O,z,N,ce)}function ms(y,U,O){U.isScene!==!0&&(U=we);const z=Be.get(y),N=m.state.lights,ce=m.state.shadowsArray,ge=N.state.version,Te=me.getParameters(y,N.state,ce,U,O),Re=me.getProgramCacheKey(Te);let He=z.programs;z.environment=y.isMeshStandardMaterial?U.environment:null,z.fog=U.fog,z.envMap=(y.isMeshStandardMaterial?F:v).get(y.envMap||z.environment),He===void 0&&(y.addEventListener("dispose",ae),He=new Map,z.programs=He);let Pe=He.get(Re);if(Pe!==void 0){if(z.currentProgram===Pe&&z.lightsStateVersion===ge)return Ca(y,Te),Pe}else Te.uniforms=me.getUniforms(y),y.onBuild(O,Te,M),y.onBeforeCompile(Te,M),Pe=me.acquireProgram(Te,Re),He.set(Re,Pe),z.uniforms=Te.uniforms;const Ue=z.uniforms;return(!y.isShaderMaterial&&!y.isRawShaderMaterial||y.clipping===!0)&&(Ue.clippingPlanes=ze.uniform),Ca(y,Te),z.needsLights=gc(y),z.lightsStateVersion=ge,z.needsLights&&(Ue.ambientLightColor.value=N.state.ambient,Ue.lightProbe.value=N.state.probe,Ue.directionalLights.value=N.state.directional,Ue.directionalLightShadows.value=N.state.directionalShadow,Ue.spotLights.value=N.state.spot,Ue.spotLightShadows.value=N.state.spotShadow,Ue.rectAreaLights.value=N.state.rectArea,Ue.ltc_1.value=N.state.rectAreaLTC1,Ue.ltc_2.value=N.state.rectAreaLTC2,Ue.pointLights.value=N.state.point,Ue.pointLightShadows.value=N.state.pointShadow,Ue.hemisphereLights.value=N.state.hemi,Ue.directionalShadowMap.value=N.state.directionalShadowMap,Ue.directionalShadowMatrix.value=N.state.directionalShadowMatrix,Ue.spotShadowMap.value=N.state.spotShadowMap,Ue.spotLightMatrix.value=N.state.spotLightMatrix,Ue.spotLightMap.value=N.state.spotLightMap,Ue.pointShadowMap.value=N.state.pointShadowMap,Ue.pointShadowMatrix.value=N.state.pointShadowMatrix),z.currentProgram=Pe,z.uniformsList=null,Pe}function Ra(y){if(y.uniformsList===null){const U=y.currentProgram.getUniforms();y.uniformsList=ks.seqWithValue(U.seq,y.uniforms)}return y.uniformsList}function Ca(y,U){const O=Be.get(y);O.outputColorSpace=U.outputColorSpace,O.batching=U.batching,O.instancing=U.instancing,O.instancingColor=U.instancingColor,O.skinning=U.skinning,O.morphTargets=U.morphTargets,O.morphNormals=U.morphNormals,O.morphColors=U.morphColors,O.morphTargetsCount=U.morphTargetsCount,O.numClippingPlanes=U.numClippingPlanes,O.numIntersection=U.numClipIntersection,O.vertexAlphas=U.vertexAlphas,O.vertexTangents=U.vertexTangents,O.toneMapping=U.toneMapping}function pc(y,U,O,z,N){U.isScene!==!0&&(U=we),T.resetTextureUnits();const ce=U.fog,ge=z.isMeshStandardMaterial?U.environment:null,Te=R===null?M.outputColorSpace:R.isXRRenderTarget===!0?R.texture.colorSpace:Rn,Re=(z.isMeshStandardMaterial?F:v).get(z.envMap||ge),He=z.vertexColors===!0&&!!O.attributes.color&&O.attributes.color.itemSize===4,Pe=!!O.attributes.tangent&&(!!z.normalMap||z.anisotropy>0),Ue=!!O.morphAttributes.position,gt=!!O.morphAttributes.normal,kt=!!O.morphAttributes.color;let Tt=zn;z.toneMapped&&(R===null||R.isXRRenderTarget===!0)&&(Tt=M.toneMapping);const gn=O.morphAttributes.position||O.morphAttributes.normal||O.morphAttributes.color,ft=gn!==void 0?gn.length:0,ke=Be.get(z),lr=m.state.lights;if(K===!0&&(le===!0||y!==S)){const $t=y===S&&z.id===H;ze.setState(z,y,$t)}let pt=!1;z.version===ke.__version?(ke.needsLights&&ke.lightsStateVersion!==lr.state.version||ke.outputColorSpace!==Te||N.isBatchedMesh&&ke.batching===!1||!N.isBatchedMesh&&ke.batching===!0||N.isInstancedMesh&&ke.instancing===!1||!N.isInstancedMesh&&ke.instancing===!0||N.isSkinnedMesh&&ke.skinning===!1||!N.isSkinnedMesh&&ke.skinning===!0||N.isInstancedMesh&&ke.instancingColor===!0&&N.instanceColor===null||N.isInstancedMesh&&ke.instancingColor===!1&&N.instanceColor!==null||ke.envMap!==Re||z.fog===!0&&ke.fog!==ce||ke.numClippingPlanes!==void 0&&(ke.numClippingPlanes!==ze.numPlanes||ke.numIntersection!==ze.numIntersection)||ke.vertexAlphas!==He||ke.vertexTangents!==Pe||ke.morphTargets!==Ue||ke.morphNormals!==gt||ke.morphColors!==kt||ke.toneMapping!==Tt||Le.isWebGL2===!0&&ke.morphTargetsCount!==ft)&&(pt=!0):(pt=!0,ke.__version=z.version);let Kn=ke.currentProgram;pt===!0&&(Kn=ms(z,U,N));let La=!1,Xi=!1,cr=!1;const Ct=Kn.getUniforms(),jn=ke.uniforms;if(pe.useProgram(Kn.program)&&(La=!0,Xi=!0,cr=!0),z.id!==H&&(H=z.id,Xi=!0),La||S!==y){Ct.setValue(I,"projectionMatrix",y.projectionMatrix),Ct.setValue(I,"viewMatrix",y.matrixWorldInverse);const $t=Ct.map.cameraPosition;$t!==void 0&&$t.setValue(I,Ne.setFromMatrixPosition(y.matrixWorld)),Le.logarithmicDepthBuffer&&Ct.setValue(I,"logDepthBufFC",2/(Math.log(y.far+1)/Math.LN2)),(z.isMeshPhongMaterial||z.isMeshToonMaterial||z.isMeshLambertMaterial||z.isMeshBasicMaterial||z.isMeshStandardMaterial||z.isShaderMaterial)&&Ct.setValue(I,"isOrthographic",y.isOrthographicCamera===!0),S!==y&&(S=y,Xi=!0,cr=!0)}if(N.isSkinnedMesh){Ct.setOptional(I,N,"bindMatrix"),Ct.setOptional(I,N,"bindMatrixInverse");const $t=N.skeleton;$t&&(Le.floatVertexTextures?($t.boneTexture===null&&$t.computeBoneTexture(),Ct.setValue(I,"boneTexture",$t.boneTexture,T)):console.warn("THREE.WebGLRenderer: SkinnedMesh can only be used with WebGL 2. With WebGL 1 OES_texture_float and vertex textures support is required."))}N.isBatchedMesh&&(Ct.setOptional(I,N,"batchingTexture"),Ct.setValue(I,"batchingTexture",N._matricesTexture,T));const hr=O.morphAttributes;if((hr.position!==void 0||hr.normal!==void 0||hr.color!==void 0&&Le.isWebGL2===!0)&&qe.update(N,O,Kn),(Xi||ke.receiveShadow!==N.receiveShadow)&&(ke.receiveShadow=N.receiveShadow,Ct.setValue(I,"receiveShadow",N.receiveShadow)),z.isMeshGouraudMaterial&&z.envMap!==null&&(jn.envMap.value=Re,jn.flipEnvMap.value=Re.isCubeTexture&&Re.isRenderTargetTexture===!1?-1:1),Xi&&(Ct.setValue(I,"toneMappingExposure",M.toneMappingExposure),ke.needsLights&&mc(jn,cr),ce&&z.fog===!0&&oe.refreshFogUniforms(jn,ce),oe.refreshMaterialUniforms(jn,z,Y,W,xe),ks.upload(I,Ra(ke),jn,T)),z.isShaderMaterial&&z.uniformsNeedUpdate===!0&&(ks.upload(I,Ra(ke),jn,T),z.uniformsNeedUpdate=!1),z.isSpriteMaterial&&Ct.setValue(I,"center",N.center),Ct.setValue(I,"modelViewMatrix",N.modelViewMatrix),Ct.setValue(I,"normalMatrix",N.normalMatrix),Ct.setValue(I,"modelMatrix",N.matrixWorld),z.isShaderMaterial||z.isRawShaderMaterial){const $t=z.uniformsGroups;for(let ur=0,_c=$t.length;ur<_c;ur++)if(Le.isWebGL2){const Pa=$t[ur];Ze.update(Pa,Kn),Ze.bind(Pa,Kn)}else console.warn("THREE.WebGLRenderer: Uniform Buffer Objects can only be used with WebGL 2.")}return Kn}function mc(y,U){y.ambientLightColor.needsUpdate=U,y.lightProbe.needsUpdate=U,y.directionalLights.needsUpdate=U,y.directionalLightShadows.needsUpdate=U,y.pointLights.needsUpdate=U,y.pointLightShadows.needsUpdate=U,y.spotLights.needsUpdate=U,y.spotLightShadows.needsUpdate=U,y.rectAreaLights.needsUpdate=U,y.hemisphereLights.needsUpdate=U}function gc(y){return y.isMeshLambertMaterial||y.isMeshToonMaterial||y.isMeshPhongMaterial||y.isMeshStandardMaterial||y.isShadowMaterial||y.isShaderMaterial&&y.lights===!0}this.getActiveCubeFace=function(){return P},this.getActiveMipmapLevel=function(){return A},this.getRenderTarget=function(){return R},this.setRenderTargetTextures=function(y,U,O){Be.get(y.texture).__webglTexture=U,Be.get(y.depthTexture).__webglTexture=O;const z=Be.get(y);z.__hasExternalTextures=!0,z.__hasExternalTextures&&(z.__autoAllocateDepthBuffer=O===void 0,z.__autoAllocateDepthBuffer||ye.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),z.__useRenderToTexture=!1))},this.setRenderTargetFramebuffer=function(y,U){const O=Be.get(y);O.__webglFramebuffer=U,O.__useDefaultFramebuffer=U===void 0},this.setRenderTarget=function(y,U=0,O=0){R=y,P=U,A=O;let z=!0,N=null,ce=!1,ge=!1;if(y){const Re=Be.get(y);Re.__useDefaultFramebuffer!==void 0?(pe.bindFramebuffer(I.FRAMEBUFFER,null),z=!1):Re.__webglFramebuffer===void 0?T.setupRenderTarget(y):Re.__hasExternalTextures&&T.rebindTextures(y,Be.get(y.texture).__webglTexture,Be.get(y.depthTexture).__webglTexture);const He=y.texture;(He.isData3DTexture||He.isDataArrayTexture||He.isCompressedArrayTexture)&&(ge=!0);const Pe=Be.get(y).__webglFramebuffer;y.isWebGLCubeRenderTarget?(Array.isArray(Pe[U])?N=Pe[U][O]:N=Pe[U],ce=!0):Le.isWebGL2&&y.samples>0&&T.useMultisampledRTT(y)===!1?N=Be.get(y).__webglMultisampledFramebuffer:Array.isArray(Pe)?N=Pe[O]:N=Pe,b.copy(y.viewport),G.copy(y.scissor),k=y.scissorTest}else b.copy($).multiplyScalar(Y).floor(),G.copy(te).multiplyScalar(Y).floor(),k=ne;if(pe.bindFramebuffer(I.FRAMEBUFFER,N)&&Le.drawBuffers&&z&&pe.drawBuffers(y,N),pe.viewport(b),pe.scissor(G),pe.setScissorTest(k),ce){const Re=Be.get(y.texture);I.framebufferTexture2D(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_CUBE_MAP_POSITIVE_X+U,Re.__webglTexture,O)}else if(ge){const Re=Be.get(y.texture),He=U||0;I.framebufferTextureLayer(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0,Re.__webglTexture,O||0,He)}H=-1},this.readRenderTargetPixels=function(y,U,O,z,N,ce,ge){if(!(y&&y.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Te=Be.get(y).__webglFramebuffer;if(y.isWebGLCubeRenderTarget&&ge!==void 0&&(Te=Te[ge]),Te){pe.bindFramebuffer(I.FRAMEBUFFER,Te);try{const Re=y.texture,He=Re.format,Pe=Re.type;if(He!==an&&fe.convert(He)!==I.getParameter(I.IMPLEMENTATION_COLOR_READ_FORMAT)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}const Ue=Pe===ts&&(ye.has("EXT_color_buffer_half_float")||Le.isWebGL2&&ye.has("EXT_color_buffer_float"));if(Pe!==Hn&&fe.convert(Pe)!==I.getParameter(I.IMPLEMENTATION_COLOR_READ_TYPE)&&!(Pe===Nn&&(Le.isWebGL2||ye.has("OES_texture_float")||ye.has("WEBGL_color_buffer_float")))&&!Ue){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}U>=0&&U<=y.width-z&&O>=0&&O<=y.height-N&&I.readPixels(U,O,z,N,fe.convert(He),fe.convert(Pe),ce)}finally{const Re=R!==null?Be.get(R).__webglFramebuffer:null;pe.bindFramebuffer(I.FRAMEBUFFER,Re)}}},this.copyFramebufferToTexture=function(y,U,O=0){const z=Math.pow(2,-O),N=Math.floor(U.image.width*z),ce=Math.floor(U.image.height*z);T.setTexture2D(U,0),I.copyTexSubImage2D(I.TEXTURE_2D,O,0,0,y.x,y.y,N,ce),pe.unbindTexture()},this.copyTextureToTexture=function(y,U,O,z=0){const N=U.image.width,ce=U.image.height,ge=fe.convert(O.format),Te=fe.convert(O.type);T.setTexture2D(O,0),I.pixelStorei(I.UNPACK_FLIP_Y_WEBGL,O.flipY),I.pixelStorei(I.UNPACK_PREMULTIPLY_ALPHA_WEBGL,O.premultiplyAlpha),I.pixelStorei(I.UNPACK_ALIGNMENT,O.unpackAlignment),U.isDataTexture?I.texSubImage2D(I.TEXTURE_2D,z,y.x,y.y,N,ce,ge,Te,U.image.data):U.isCompressedTexture?I.compressedTexSubImage2D(I.TEXTURE_2D,z,y.x,y.y,U.mipmaps[0].width,U.mipmaps[0].height,ge,U.mipmaps[0].data):I.texSubImage2D(I.TEXTURE_2D,z,y.x,y.y,ge,Te,U.image),z===0&&O.generateMipmaps&&I.generateMipmap(I.TEXTURE_2D),pe.unbindTexture()},this.copyTextureToTexture3D=function(y,U,O,z,N=0){if(M.isWebGL1Renderer){console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.");return}const ce=y.max.x-y.min.x+1,ge=y.max.y-y.min.y+1,Te=y.max.z-y.min.z+1,Re=fe.convert(z.format),He=fe.convert(z.type);let Pe;if(z.isData3DTexture)T.setTexture3D(z,0),Pe=I.TEXTURE_3D;else if(z.isDataArrayTexture||z.isCompressedArrayTexture)T.setTexture2DArray(z,0),Pe=I.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}I.pixelStorei(I.UNPACK_FLIP_Y_WEBGL,z.flipY),I.pixelStorei(I.UNPACK_PREMULTIPLY_ALPHA_WEBGL,z.premultiplyAlpha),I.pixelStorei(I.UNPACK_ALIGNMENT,z.unpackAlignment);const Ue=I.getParameter(I.UNPACK_ROW_LENGTH),gt=I.getParameter(I.UNPACK_IMAGE_HEIGHT),kt=I.getParameter(I.UNPACK_SKIP_PIXELS),Tt=I.getParameter(I.UNPACK_SKIP_ROWS),gn=I.getParameter(I.UNPACK_SKIP_IMAGES),ft=O.isCompressedTexture?O.mipmaps[N]:O.image;I.pixelStorei(I.UNPACK_ROW_LENGTH,ft.width),I.pixelStorei(I.UNPACK_IMAGE_HEIGHT,ft.height),I.pixelStorei(I.UNPACK_SKIP_PIXELS,y.min.x),I.pixelStorei(I.UNPACK_SKIP_ROWS,y.min.y),I.pixelStorei(I.UNPACK_SKIP_IMAGES,y.min.z),O.isDataTexture||O.isData3DTexture?I.texSubImage3D(Pe,N,U.x,U.y,U.z,ce,ge,Te,Re,He,ft.data):O.isCompressedArrayTexture?(console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: untested support for compressed srcTexture."),I.compressedTexSubImage3D(Pe,N,U.x,U.y,U.z,ce,ge,Te,Re,ft.data)):I.texSubImage3D(Pe,N,U.x,U.y,U.z,ce,ge,Te,Re,He,ft),I.pixelStorei(I.UNPACK_ROW_LENGTH,Ue),I.pixelStorei(I.UNPACK_IMAGE_HEIGHT,gt),I.pixelStorei(I.UNPACK_SKIP_PIXELS,kt),I.pixelStorei(I.UNPACK_SKIP_ROWS,Tt),I.pixelStorei(I.UNPACK_SKIP_IMAGES,gn),N===0&&z.generateMipmaps&&I.generateMipmap(Pe),pe.unbindTexture()},this.initTexture=function(y){y.isCubeTexture?T.setTextureCube(y,0):y.isData3DTexture?T.setTexture3D(y,0):y.isDataArrayTexture||y.isCompressedArrayTexture?T.setTexture2DArray(y,0):T.setTexture2D(y,0),pe.unbindTexture()},this.resetState=function(){P=0,A=0,R=null,pe.reset(),Fe.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Tn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=e===oa?"display-p3":"srgb",t.unpackColorSpace=Qe.workingColorSpace===tr?"display-p3":"srgb"}get outputEncoding(){return console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace===At?oi:yl}set outputEncoding(e){console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace=e===oi?At:Rn}get useLegacyLights(){return console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights}set useLegacyLights(e){console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights=e}}class Em extends Wl{}Em.prototype.isWebGL1Renderer=!0;class ua{constructor(e,t=25e-5){this.isFogExp2=!0,this.name="",this.color=new We(e),this.density=t}clone(){return new ua(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class Tm extends Mt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t}}class Xl extends fi{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new We(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const Jo=new C,Qo=new C,el=new mt,Vr=new la,Bs=new ls;class bm extends Mt{constructor(e=new Dt,t=new Xl){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,i=[0];for(let s=1,r=t.count;s<r;s++)Jo.fromBufferAttribute(t,s-1),Qo.fromBufferAttribute(t,s),i[s]=i[s-1],i[s]+=Jo.distanceTo(Qo);e.setAttribute("lineDistance",new nt(i,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const i=this.geometry,s=this.matrixWorld,r=e.params.Line.threshold,a=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Bs.copy(i.boundingSphere),Bs.applyMatrix4(s),Bs.radius+=r,e.ray.intersectsSphere(Bs)===!1)return;el.copy(s).invert(),Vr.copy(e.ray).applyMatrix4(el);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=new C,h=new C,u=new C,p=new C,g=this.isLineSegments?2:1,_=i.index,m=i.attributes.position;if(_!==null){const f=Math.max(0,a.start),E=Math.min(_.count,a.start+a.count);for(let M=f,w=E-1;M<w;M+=g){const P=_.getX(M),A=_.getX(M+1);if(c.fromBufferAttribute(m,P),h.fromBufferAttribute(m,A),Vr.distanceSqToSegment(c,h,p,u)>l)continue;p.applyMatrix4(this.matrixWorld);const H=e.ray.origin.distanceTo(p);H<e.near||H>e.far||t.push({distance:H,point:u.clone().applyMatrix4(this.matrixWorld),index:M,face:null,faceIndex:null,object:this})}}else{const f=Math.max(0,a.start),E=Math.min(m.count,a.start+a.count);for(let M=f,w=E-1;M<w;M+=g){if(c.fromBufferAttribute(m,M),h.fromBufferAttribute(m,M+1),Vr.distanceSqToSegment(c,h,p,u)>l)continue;p.applyMatrix4(this.matrixWorld);const A=e.ray.origin.distanceTo(p);A<e.near||A>e.far||t.push({distance:A,point:u.clone().applyMatrix4(this.matrixWorld),index:M,face:null,faceIndex:null,object:this})}}}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const s=t[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}const tl=new C,nl=new C;class wm extends bm{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,i=[];for(let s=0,r=t.count;s<r;s+=2)tl.fromBufferAttribute(t,s),nl.fromBufferAttribute(t,s+1),i[s]=s===0?0:i[s-1],i[s+1]=i[s]+tl.distanceTo(nl);e.setAttribute("lineDistance",new nt(i,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class ql extends fi{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new We(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const il=new mt,sa=new la,zs=new ls,Hs=new C;class Am extends Mt{constructor(e=new Dt,t=new ql){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const i=this.geometry,s=this.matrixWorld,r=e.params.Points.threshold,a=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),zs.copy(i.boundingSphere),zs.applyMatrix4(s),zs.radius+=r,e.ray.intersectsSphere(zs)===!1)return;il.copy(s).invert(),sa.copy(e.ray).applyMatrix4(il);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=i.index,u=i.attributes.position;if(c!==null){const p=Math.max(0,a.start),g=Math.min(c.count,a.start+a.count);for(let _=p,x=g;_<x;_++){const m=c.getX(_);Hs.fromBufferAttribute(u,m),sl(Hs,m,l,s,e,t,this)}}else{const p=Math.max(0,a.start),g=Math.min(u.count,a.start+a.count);for(let _=p,x=g;_<x;_++)Hs.fromBufferAttribute(u,_),sl(Hs,_,l,s,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const s=t[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function sl(n,e,t,i,s,r,a){const o=sa.distanceSqToPoint(n);if(o<t){const l=new C;sa.closestPointToPoint(n,l),l.applyMatrix4(i);const c=s.ray.origin.distanceTo(l);if(c<s.near||c>s.far)return;r.push({distance:c,distanceToRay:Math.sqrt(o),point:l,index:e,face:null,object:a})}}class cs extends Dt{constructor(e=1,t=32,i=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:i,thetaLength:s},t=Math.max(3,t);const r=[],a=[],o=[],l=[],c=new C,h=new Ye;a.push(0,0,0),o.push(0,0,1),l.push(.5,.5);for(let u=0,p=3;u<=t;u++,p+=3){const g=i+u/t*s;c.x=e*Math.cos(g),c.y=e*Math.sin(g),a.push(c.x,c.y,c.z),o.push(0,0,1),h.x=(a[p]/e+1)/2,h.y=(a[p+1]/e+1)/2,l.push(h.x,h.y)}for(let u=1;u<=t;u++)r.push(u,u+1,0);this.setIndex(r),this.setAttribute("position",new nt(a,3)),this.setAttribute("normal",new nt(o,3)),this.setAttribute("uv",new nt(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new cs(e.radius,e.segments,e.thetaStart,e.thetaLength)}}class un extends Dt{constructor(e=1,t=1,i=1,s=32,r=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:i,radialSegments:s,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:l};const c=this;s=Math.floor(s),r=Math.floor(r);const h=[],u=[],p=[],g=[];let _=0;const x=[],m=i/2;let f=0;E(),a===!1&&(e>0&&M(!0),t>0&&M(!1)),this.setIndex(h),this.setAttribute("position",new nt(u,3)),this.setAttribute("normal",new nt(p,3)),this.setAttribute("uv",new nt(g,2));function E(){const w=new C,P=new C;let A=0;const R=(t-e)/i;for(let H=0;H<=r;H++){const S=[],b=H/r,G=b*(t-e)+e;for(let k=0;k<=s;k++){const ee=k/s,D=ee*l+o,B=Math.sin(D),W=Math.cos(D);P.x=G*B,P.y=-b*i+m,P.z=G*W,u.push(P.x,P.y,P.z),w.set(B,R,W).normalize(),p.push(w.x,w.y,w.z),g.push(ee,1-b),S.push(_++)}x.push(S)}for(let H=0;H<s;H++)for(let S=0;S<r;S++){const b=x[S][H],G=x[S+1][H],k=x[S+1][H+1],ee=x[S][H+1];h.push(b,G,ee),h.push(G,k,ee),A+=6}c.addGroup(f,A,0),f+=A}function M(w){const P=_,A=new Ye,R=new C;let H=0;const S=w===!0?e:t,b=w===!0?1:-1;for(let k=1;k<=s;k++)u.push(0,m*b,0),p.push(0,b,0),g.push(.5,.5),_++;const G=_;for(let k=0;k<=s;k++){const D=k/s*l+o,B=Math.cos(D),W=Math.sin(D);R.x=S*W,R.y=m*b,R.z=S*B,u.push(R.x,R.y,R.z),p.push(0,b,0),A.x=B*.5+.5,A.y=W*.5*b+.5,g.push(A.x,A.y),_++}for(let k=0;k<s;k++){const ee=P+k,D=G+k;w===!0?h.push(D,D+1,ee):h.push(D+1,D,ee),H+=3}c.addGroup(f,H,w===!0?1:2),f+=H}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new un(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class sr extends un{constructor(e=1,t=1,i=32,s=1,r=!1,a=0,o=Math.PI*2){super(0,e,t,i,s,r,a,o),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:i,heightSegments:s,openEnded:r,thetaStart:a,thetaLength:o}}static fromJSON(e){return new sr(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class hs extends Dt{constructor(e=[],t=[],i=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:i,detail:s};const r=[],a=[];o(s),c(i),h(),this.setAttribute("position",new nt(r,3)),this.setAttribute("normal",new nt(r.slice(),3)),this.setAttribute("uv",new nt(a,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function o(E){const M=new C,w=new C,P=new C;for(let A=0;A<t.length;A+=3)g(t[A+0],M),g(t[A+1],w),g(t[A+2],P),l(M,w,P,E)}function l(E,M,w,P){const A=P+1,R=[];for(let H=0;H<=A;H++){R[H]=[];const S=E.clone().lerp(w,H/A),b=M.clone().lerp(w,H/A),G=A-H;for(let k=0;k<=G;k++)k===0&&H===A?R[H][k]=S:R[H][k]=S.clone().lerp(b,k/G)}for(let H=0;H<A;H++)for(let S=0;S<2*(A-H)-1;S++){const b=Math.floor(S/2);S%2===0?(p(R[H][b+1]),p(R[H+1][b]),p(R[H][b])):(p(R[H][b+1]),p(R[H+1][b+1]),p(R[H+1][b]))}}function c(E){const M=new C;for(let w=0;w<r.length;w+=3)M.x=r[w+0],M.y=r[w+1],M.z=r[w+2],M.normalize().multiplyScalar(E),r[w+0]=M.x,r[w+1]=M.y,r[w+2]=M.z}function h(){const E=new C;for(let M=0;M<r.length;M+=3){E.x=r[M+0],E.y=r[M+1],E.z=r[M+2];const w=m(E)/2/Math.PI+.5,P=f(E)/Math.PI+.5;a.push(w,1-P)}_(),u()}function u(){for(let E=0;E<a.length;E+=6){const M=a[E+0],w=a[E+2],P=a[E+4],A=Math.max(M,w,P),R=Math.min(M,w,P);A>.9&&R<.1&&(M<.2&&(a[E+0]+=1),w<.2&&(a[E+2]+=1),P<.2&&(a[E+4]+=1))}}function p(E){r.push(E.x,E.y,E.z)}function g(E,M){const w=E*3;M.x=e[w+0],M.y=e[w+1],M.z=e[w+2]}function _(){const E=new C,M=new C,w=new C,P=new C,A=new Ye,R=new Ye,H=new Ye;for(let S=0,b=0;S<r.length;S+=9,b+=6){E.set(r[S+0],r[S+1],r[S+2]),M.set(r[S+3],r[S+4],r[S+5]),w.set(r[S+6],r[S+7],r[S+8]),A.set(a[b+0],a[b+1]),R.set(a[b+2],a[b+3]),H.set(a[b+4],a[b+5]),P.copy(E).add(M).add(w).divideScalar(3);const G=m(P);x(A,b+0,E,G),x(R,b+2,M,G),x(H,b+4,w,G)}}function x(E,M,w,P){P<0&&E.x===1&&(a[M]=E.x-1),w.x===0&&w.z===0&&(a[M]=P/2/Math.PI+.5)}function m(E){return Math.atan2(E.z,-E.x)}function f(E){return Math.atan2(-E.y,Math.sqrt(E.x*E.x+E.z*E.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new hs(e.vertices,e.indices,e.radius,e.details)}}class fa extends hs{constructor(e=1,t=0){const i=(1+Math.sqrt(5))/2,s=[-1,i,0,1,i,0,-1,-i,0,1,-i,0,0,-1,i,0,1,i,0,-1,-i,0,1,-i,i,0,-1,i,0,1,-i,0,-1,-i,0,1],r=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(s,r,e,t),this.type="IcosahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new fa(e.radius,e.detail)}}class us extends hs{constructor(e=1,t=0){const i=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],s=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(i,s,e,t),this.type="OctahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new us(e.radius,e.detail)}}class bn extends Dt{constructor(e=1,t=32,i=16,s=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:i,phiStart:s,phiLength:r,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),i=Math.max(2,Math.floor(i));const l=Math.min(a+o,Math.PI);let c=0;const h=[],u=new C,p=new C,g=[],_=[],x=[],m=[];for(let f=0;f<=i;f++){const E=[],M=f/i;let w=0;f===0&&a===0?w=.5/t:f===i&&l===Math.PI&&(w=-.5/t);for(let P=0;P<=t;P++){const A=P/t;u.x=-e*Math.cos(s+A*r)*Math.sin(a+M*o),u.y=e*Math.cos(a+M*o),u.z=e*Math.sin(s+A*r)*Math.sin(a+M*o),_.push(u.x,u.y,u.z),p.copy(u).normalize(),x.push(p.x,p.y,p.z),m.push(A+w,1-M),E.push(c++)}h.push(E)}for(let f=0;f<i;f++)for(let E=0;E<t;E++){const M=h[f][E+1],w=h[f][E],P=h[f+1][E],A=h[f+1][E+1];(f!==0||a>0)&&g.push(M,w,A),(f!==i-1||l<Math.PI)&&g.push(w,P,A)}this.setIndex(g),this.setAttribute("position",new nt(_,3)),this.setAttribute("normal",new nt(x,3)),this.setAttribute("uv",new nt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new bn(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class da extends hs{constructor(e=1,t=0){const i=[1,1,1,-1,-1,1,-1,1,-1,1,-1,-1],s=[2,1,0,0,3,2,1,3,0,2,3,1];super(i,s,e,t),this.type="TetrahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new da(e.radius,e.detail)}}class kn extends Dt{constructor(e=1,t=.4,i=12,s=48,r=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:i,tubularSegments:s,arc:r},i=Math.floor(i),s=Math.floor(s);const a=[],o=[],l=[],c=[],h=new C,u=new C,p=new C;for(let g=0;g<=i;g++)for(let _=0;_<=s;_++){const x=_/s*r,m=g/i*Math.PI*2;u.x=(e+t*Math.cos(m))*Math.cos(x),u.y=(e+t*Math.cos(m))*Math.sin(x),u.z=t*Math.sin(m),o.push(u.x,u.y,u.z),h.x=e*Math.cos(x),h.y=e*Math.sin(x),p.subVectors(u,h).normalize(),l.push(p.x,p.y,p.z),c.push(_/s),c.push(g/i)}for(let g=1;g<=i;g++)for(let _=1;_<=s;_++){const x=(s+1)*g+_-1,m=(s+1)*(g-1)+_-1,f=(s+1)*(g-1)+_,E=(s+1)*g+_;a.push(x,m,E),a.push(m,f,E)}this.setIndex(a),this.setAttribute("position",new nt(o,3)),this.setAttribute("normal",new nt(l,3)),this.setAttribute("uv",new nt(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new kn(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}}class Jt extends fi{constructor(e){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new We(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new We(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=El,this.normalScale=new Ye(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class rr extends Mt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new We(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),t}}class Rm extends rr{constructor(e,t,i){super(e,i),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Mt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new We(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}}const Wr=new mt,rl=new C,al=new C;class Yl{constructor(e){this.camera=e,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Ye(512,512),this.map=null,this.mapPass=null,this.matrix=new mt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new ca,this._frameExtents=new Ye(1,1),this._viewportCount=1,this._viewports=[new ct(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,i=this.matrix;rl.setFromMatrixPosition(e.matrixWorld),t.position.copy(rl),al.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(al),t.updateMatrixWorld(),Wr.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Wr),i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(Wr)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}const ol=new mt,Zi=new C,Xr=new C;class Cm extends Yl{constructor(){super(new Xt(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new Ye(4,2),this._viewportCount=6,this._viewports=[new ct(2,1,1,1),new ct(0,1,1,1),new ct(3,1,1,1),new ct(1,1,1,1),new ct(3,0,1,1),new ct(1,0,1,1)],this._cubeDirections=[new C(1,0,0),new C(-1,0,0),new C(0,0,1),new C(0,0,-1),new C(0,1,0),new C(0,-1,0)],this._cubeUps=[new C(0,1,0),new C(0,1,0),new C(0,1,0),new C(0,1,0),new C(0,0,1),new C(0,0,-1)]}updateMatrices(e,t=0){const i=this.camera,s=this.matrix,r=e.distance||i.far;r!==i.far&&(i.far=r,i.updateProjectionMatrix()),Zi.setFromMatrixPosition(e.matrixWorld),i.position.copy(Zi),Xr.copy(i.position),Xr.add(this._cubeDirections[t]),i.up.copy(this._cubeUps[t]),i.lookAt(Xr),i.updateMatrixWorld(),s.makeTranslation(-Zi.x,-Zi.y,-Zi.z),ol.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),this._frustum.setFromProjectionMatrix(ol)}}class pa extends rr{constructor(e,t,i=0,s=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=i,this.decay=s,this.shadow=new Cm}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}}class Lm extends Yl{constructor(){super(new Ol(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class $l extends rr{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Mt.DEFAULT_UP),this.updateMatrix(),this.target=new Mt,this.shadow=new Lm}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class Pm extends rr{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}class Dm{constructor(e=!0){this.autoStart=e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=ll(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const t=ll();e=(t-this.oldTime)/1e3,this.oldTime=t,this.elapsedTime+=e}return e}}function ll(){return(typeof performance>"u"?Date:performance).now()}class Um extends wm{constructor(e=10,t=10,i=4473924,s=8947848){i=new We(i),s=new We(s);const r=t/2,a=e/t,o=e/2,l=[],c=[];for(let p=0,g=0,_=-o;p<=t;p++,_+=a){l.push(-o,0,_,o,0,_),l.push(_,0,-o,_,0,o);const x=p===r?i:s;x.toArray(c,g),g+=3,x.toArray(c,g),g+=3,x.toArray(c,g),g+=3,x.toArray(c,g),g+=3}const h=new Dt;h.setAttribute("position",new nt(l,3)),h.setAttribute("color",new nt(c,3));const u=new Xl({vertexColors:!0,toneMapped:!1});super(h,u),this.type="GridHelper"}dispose(){this.geometry.dispose(),this.material.dispose()}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:ra}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=ra);const de=n=>document.getElementById(n),ns=de("game"),on=(n,e,t)=>Math.max(e,Math.min(t,n)),Xe=(n,e)=>n+Math.random()*(e-n),ve={ctx:null,master:null,muted:!1,init(){if(!this.ctx)try{this.ctx=new(window.AudioContext||window.webkitAudioContext),this.master=this.ctx.createGain(),this.master.gain.value=.25,this.master.connect(this.ctx.destination)}catch{}},tone(n,e,t="square",i=1,s=0){if(!this.ctx||this.muted)return;const r=this.ctx.currentTime,a=this.ctx.createOscillator(),o=this.ctx.createGain();a.type=t,a.frequency.setValueAtTime(n,r),s&&a.frequency.exponentialRampToValueAtTime(Math.max(20,n+s),r+e),o.gain.setValueAtTime(i,r),o.gain.exponentialRampToValueAtTime(.001,r+e),a.connect(o),o.connect(this.master),a.start(r),a.stop(r+e+.02)},noise(n,e=1,t=400){if(!this.ctx||this.muted)return;const i=this.ctx.currentTime,s=Math.floor(this.ctx.sampleRate*n),r=this.ctx.createBuffer(1,s,this.ctx.sampleRate),a=r.getChannelData(0);for(let h=0;h<s;h++)a[h]=(Math.random()*2-1)*(1-h/s);const o=this.ctx.createBufferSource();o.buffer=r;const l=this.ctx.createBiquadFilter();l.type="lowpass",l.frequency.value=t;const c=this.ctx.createGain();c.gain.value=e,o.connect(l),l.connect(c),c.connect(this.master),o.start(i)},shoot(){this.tone(Xe(700,900),.08,"sawtooth",.35,-500)},shotgun(){this.noise(.18,.8,900),this.tone(150,.15,"square",.4,-80)},hit(){this.tone(Xe(300,380),.06,"square",.3,-120)},boom(){this.noise(.4,1,500),this.tone(90,.35,"sine",.8,-50)},hurt(){this.tone(180,.2,"sawtooth",.6,-100)},pickup(){this.tone(Xe(900,1100),.09,"sine",.4,500)},levelup(){[523,659,784,1046].forEach((n,e)=>setTimeout(()=>this.tone(n,.25,"triangle",.6),e*90))},nova(){this.noise(.5,.9,2e3),this.tone(120,.4,"sawtooth",.5,300)},dash(){this.noise(.15,.5,3e3)},wave(){this.tone(220,.3,"triangle",.5,220),setTimeout(()=>this.tone(330,.3,"triangle",.5,220),150)},boss(){this.tone(70,.8,"sawtooth",.7,-20),this.noise(.6,.6,300)}},Ke=30,ma={pulsar:{name:"PULSAR",title:"Chrono-Stürmerin",ref:"Hommage an Tracer (Overwatch)",hp:90,speed:10.5,dmg:6,fireRate:12,projectiles:1,spread:.03,crit:.15,armor:0,lifesteal:0,pierce:0,abilityMul:1,shotSpeed:85,color:61695,secCD:4,tertCD:12,moveCD:3},aegis:{name:"AEGIS",title:"Schildwache",ref:"Hommage an Reinhardt (Overwatch) / Fernando (Paladins)",hp:220,speed:6.8,dmg:22,fireRate:1.6,projectiles:1,spread:0,crit:.05,armor:.3,lifesteal:0,pierce:0,abilityMul:1,shotSpeed:0,color:16751165,secCD:8,tertCD:14,moveCD:6},meteor:{name:"METEOR",title:"Schwarzmagier",ref:"Hommage an Black Mage (Final Fantasy)",hp:100,speed:7.2,dmg:26,fireRate:1.8,projectiles:1,spread:.01,crit:.1,armor:0,lifesteal:0,pierce:2,abilityMul:1.3,shotSpeed:45,color:11816447,secCD:5,tertCD:14,moveCD:4},ronin:{name:"RONIN",title:"Cyber-Samurai",ref:"Hommage an Genji (Overwatch)",hp:110,speed:9.5,dmg:14,fireRate:3.2,projectiles:1,spread:0,crit:.15,armor:.05,lifesteal:0,pierce:1,abilityMul:1.1,shotSpeed:90,color:10149119,secCD:5,tertCD:10,moveCD:4},doc:{name:"DOC",title:"Frontsanitäter",ref:"Hommage an Soldier 76 (Overwatch) / Lifeline (Apex)",hp:130,speed:8.2,dmg:10,fireRate:6,projectiles:1,spread:.025,crit:.08,armor:.1,lifesteal:0,pierce:0,abilityMul:1,shotSpeed:75,color:5504906,secCD:7,tertCD:15,moveCD:5},dragoon:{name:"DRAGOON",title:"Himmelslanze",ref:"Hommage an Dragoon (Final Fantasy)",hp:150,speed:8.6,dmg:18,fireRate:2.2,projectiles:1,spread:0,crit:.1,armor:.15,lifesteal:0,pierce:1,abilityMul:1.1,shotSpeed:55,color:8368895,secCD:6,tertCD:8,moveCD:7}},ga={pulsar:{primary:{icon:"🔫",name:"Pulsar-Pistolen",key:"LMB"},secondary:{icon:"💠",name:"Scherbenfächer",key:"RMB"},tertiary:{icon:"⏳",name:"Zeitblase",key:"Q"},movement:{icon:"✨",name:"Blink",key:"SHIFT"},ult:{icon:"💣",name:"Pulsbombe",key:"E"}},aegis:{primary:{icon:"🔨",name:"Schlaghammer",key:"LMB"},secondary:{icon:"🔥",name:"Feuerstoß",key:"RMB"},tertiary:{icon:"🛡️",name:"Barriere",key:"Q"},movement:{icon:"🐗",name:"Sturmangriff",key:"SHIFT"},ult:{icon:"🌋",name:"Erdbeben",key:"E"}},meteor:{primary:{icon:"🔥",name:"Feuer",key:"LMB"},secondary:{icon:"⚡",name:"Donner",key:"RMB"},tertiary:{icon:"🔷",name:"Ley-Linien",key:"Q"},movement:{icon:"🌀",name:"Äther-Schritt",key:"SHIFT"},ult:{icon:"☄️",name:"Meteor",key:"E"}},ronin:{primary:{icon:"🗡️",name:"Katana",key:"LMB"},secondary:{icon:"🎯",name:"Shuriken",key:"RMB"},tertiary:{icon:"🌀",name:"Klingenwirbel",key:"Q"},movement:{icon:"⚡",name:"Blitzschnitt",key:"SHIFT"},ult:{icon:"🐉",name:"Drachenklinge",key:"E"}},doc:{primary:{icon:"🔫",name:"Pulsgewehr",key:"LMB"},secondary:{icon:"🚀",name:"Helix-Raketen",key:"RMB"},tertiary:{icon:"💚",name:"Heilfeld",key:"Q"},movement:{icon:"🤸",name:"Hechtsprung",key:"SHIFT"},ult:{icon:"🎯",name:"Visier",key:"E"}},dragoon:{primary:{icon:"🔱",name:"Lanzenstoß",key:"LMB"},secondary:{icon:"🦅",name:"Speerwurf",key:"RMB"},tertiary:{icon:"💨",name:"Ausweichsprung",key:"Q"},movement:{icon:"🦘",name:"Hochsprung",key:"SHIFT"},ult:{icon:"🐲",name:"Drachensturz",key:"E"}}},is={drone:{hp:30,speed:6.5,radius:.9,dmg:10,xp:6,score:50,color:16723285,kind:"melee"},spitter:{hp:45,speed:4.5,radius:.9,dmg:9,xp:9,score:80,color:16742973,kind:"ranged"},brute:{hp:140,speed:3.2,radius:1.4,dmg:22,xp:20,score:150,color:11816447,kind:"melee"},boss:{hp:700,speed:3.8,radius:2.4,dmg:30,xp:120,score:1e3,color:16711731,kind:"boss"}},Im=[{id:"dmg",icon:"🔥",title:"Schaden +20%",desc:"Alle Waffen und Nova machen +20% Schaden."},{id:"rate",icon:"🔫",title:"Feuerrate +15%",desc:"Du schießt 15% schneller."},{id:"hp",icon:"❤️",title:"Max-HP +25",desc:"+25 max. Leben und sofort 50 HP Heilung."},{id:"speed",icon:"👟",title:"Tempo +10%",desc:"Bewege dich 10% schneller."},{id:"crit",icon:"🎯",title:"Crit +10%",desc:"+10% kritische Trefferchance (2× Schaden)."},{id:"multi",icon:"🔱",title:"+1 Projektil",desc:"Ein zusätzliches Projektil pro Schuss."},{id:"pierce",icon:"🏹",title:"Pierce +1",desc:"Projektile durchdringen +1 zusätzlichen Gegner."},{id:"steal",icon:"🧛",title:"Lifesteal +2%",desc:"2% des ausgeteilten Schadens heilt dich."},{id:"armor",icon:"🛡️",title:"Rüstung +8%",desc:"Du nimmst 8% weniger Schaden (max 60%)."},{id:"regen",icon:"💚",title:"Regeneration",desc:"+1.2 HP pro Sekunde."},{id:"magnet",icon:"🧲",title:"Magnet +60%",desc:"XP-Kristalle fliegen aus größerer Distanz zu dir."},{id:"nova",icon:"💥",title:"Ability-Stärke +50%",desc:"Sekundär-, Tertiär- und Ult-Fähigkeiten machen +50% Schaden, Tertiär-CD -1s."},{id:"dash",icon:"💨",title:"Move-Profi",desc:"Move-Cooldown -25%, Move-Reichweite +30%."}],d={state:"menu",classKey:"pulsar",level:1,xp:0,xpNeed:12,pendingLevels:0,score:0,kills:0,wave:0,waveState:"idle",waveTimer:0,spawnQueue:[],spawnTimer:0,time:0,novaCD:0,dashCD:0,secCD:0,dashTime:0,iframes:0,ult:0,sprint:!1,ramTime:0,ramId:0,ramDmg:85,visorT:0,dragonT:0,airSlam:null,heal:null,wpnAnim:null,swingSide:1,shakeT:0,shakeDur:0,shakeMag:0,meteors:[],ley:null,barrier:null,firing:!1,srchold:!1,fireTimer:0,best:parseInt(localStorage.getItem("neonArenaBest")||"0",10),stats:null,player:{pos:new C(0,0,8),vel:new C,yaw:0,pitch:0,hp:100,radius:.8,py:0,vy:0,grounded:!0}};function Nm(n){const e=ma[n];return{...e,maxHp:e.hp,regen:0,magnet:10,novaCDMax:e.tertCD,dashCDMax:e.moveCD,secCDMax:e.secCD,dashPower:26}}function Kl(n){return Math.floor(10+(n-1)*8+Math.pow(n-1,2)*2.5)}const Vi=new Wl({canvas:ns,antialias:!0});Vi.setSize(window.innerWidth,window.innerHeight);Vi.setPixelRatio(Math.min(window.devicePixelRatio,2));Vi.shadowMap.enabled=!0;Vi.shadowMap.type=fl;const tt=new Tm;tt.background=new We(329485);tt.fog=new ua(329485,.011);const je=new Xt(78,window.innerWidth/window.innerHeight,.1,400);je.rotation.order="YXZ";tt.add(je);tt.add(new Rm(8952319,1118498,1));tt.add(new Pm(3359846,.6));const Vn=new $l(12573183,1.1);Vn.position.set(20,34,12);Vn.castShadow=!0;Vn.shadow.mapSize.set(1024,1024);Vn.shadow.camera.left=-40;Vn.shadow.camera.right=40;Vn.shadow.camera.top=40;Vn.shadow.camera.bottom=-40;tt.add(Vn);const jl=new $l(7307216,.45);jl.position.set(-24,18,-14);tt.add(jl);const Zl=new pa(61695,1.2,60);Zl.position.set(0,9,0);tt.add(Zl);{const n=new Ie(new hi(Ke*2+8,Ke*2+8),new Jt({color:922664,roughness:.85,metalness:.15}));n.rotation.x=-Math.PI/2,n.receiveShadow=!0,tt.add(n);const e=new Um(Ke*2,30,61695,666170);e.position.y=.02,tt.add(e);const t=new Dt,i=[];for(let s=0;s<900;s++){const r=Xe(120,300),a=Xe(0,Math.PI*2),o=Xe(.05,Math.PI/2.2);i.push(r*Math.cos(a)*Math.cos(o),r*Math.sin(o),r*Math.sin(a)*Math.cos(o))}t.setAttribute("position",new nt(i,3)),tt.add(new Am(t,new ql({color:8961023,size:.7})))}const qr=4;{const n=new Jt({color:2305877,roughness:.7,metalness:.1,emissive:660528,emissiveIntensity:.7}),e=new at({color:61695}),t=new at({color:58879}),i=new at({color:16723320}),s=(r,a,o,l)=>{const c=new Ie(new lt(r,qr,a),n);c.position.set(o,qr/2,l),c.castShadow=c.receiveShadow=!0,tt.add(c);const h=new Ie(new lt(r===1?1.2:r,.18,a===1?1.2:a),e);h.position.set(o,qr+.1,l),tt.add(h);const u=r>a,p=u?l<0?1:-1:o<0?1:-1,g=u?r:a;[[1.1,t],[2.7,i]].forEach(([_,x])=>{const m=u?new lt(g,.09,.06):new lt(.06,.09,g),f=new Ie(m,x);f.position.set(u?o:o+p*.56,_,u?l+p*.56:l),tt.add(f)})};s(Ke*2+2,1,0,-Ke-.5),s(Ke*2+2,1,0,Ke+.5),s(1,Ke*2+2,-Ke-.5,0),s(1,Ke*2+2,Ke+.5,0)}const ui=[];{const n=[[-12,-10,2.2],[12,-10,2.2],[-12,10,2.2],[12,10,2.2],[0,-18,1.8],[0,18,1.8],[-20,0,1.8],[20,0,1.8],[0,0,2.6]],e=new Jt({color:2766688,roughness:.55,metalness:.2,emissive:1056842,emissiveIntensity:.8}),t=new at({color:16723320});for(const[i,s,r]of n){const a=Xe(4,7),o=new Ie(new un(r*.85,r,a,10),e);o.position.set(i,a/2,s),o.castShadow=o.receiveShadow=!0,tt.add(o);const l=new Ie(new kn(r*.9,.09,8,24),t);l.rotation.x=Math.PI/2,l.position.set(i,a*.72,s),tt.add(l),ui.push({x:i,z:s,r:r*.95})}}{const n=new Ie(new us(1.4),new Jt({color:61695,emissive:61695,emissiveIntensity:1.2,roughness:.2}));n.position.set(0,6.5,-24),n.name="deko-crystal",tt.add(n);const e=new pa(61695,1.5,30);e.position.set(0,6.5,-24),tt.add(e)}const js=new Ht;let wt,mn;const Zs={};function Li(n,e,t){e.visible=!1,js.add(e),Zs[n]={group:e,tip:t,basePos:e.position.clone(),baseRot:e.rotation.clone()}}{const n=new Jt({color:2305877,roughness:.45,metalness:.4}),e=new Jt({color:9413576,roughness:.25,metalness:.9}),t=new at({color:61695}),i=(s,r,a=0,o=0,l=0)=>{const c=new Ie(s,r);return c.position.set(a,o,l),c};{const s=new Ht;for(const[r,a,o]of[[.03,0,0],[-.13,-.05,.1]])s.add(i(new lt(.09,.13,.36),n,r,a,o)),s.add(i(new lt(.095,.03,.2),t,r,a-.05,o-.04));Li("pulsar",s,new C(.03,.02,-.42))}{const s=new Ht,r=new at({color:16751165}),a=i(new un(.035,.042,.95,8),n,.05,-.05,-.25);a.rotation.x=-.45,s.add(a);const o=i(new lt(.4,.24,.24),n,.05,.32,-.5);s.add(o),s.add(i(new lt(.42,.08,.26),r,.05,.32,-.5)),s.add(i(new bn(.06,8,8),e,.05,-.5,-.05)),s.rotation.x=-.3,Li("aegis",s,new C(.05,.32,-.62))}{const s=new Ht,r=new Jt({color:11816447,emissive:11816447,emissiveIntensity:1.6,roughness:.2}),a=i(new un(.028,.036,1.15,8),n,.05,-.05,-.25);a.rotation.x=-.18,s.add(a);const o=i(new us(.11),r,.05,.55,-.36);s.add(o);const l=i(new kn(.07,.015,6,16),e,.05,.38,-.33);l.rotation.x=-.18,s.add(l),Li("meteor",s,new C(.05,.55,-.36))}{const s=new Ht,r=new Jt({color:12577279,roughness:.2,metalness:.95,emissive:2245717,emissiveIntensity:.5}),a=i(new lt(.025,.075,.8),r,.03,.03,-.48);a.rotation.y=.06,s.add(a);const o=i(new un(.06,.06,.025,10),e,.03,0,-.09);o.rotation.x=Math.PI/2,s.add(o);const l=i(new un(.024,.026,.24,8),n,.03,-.02,.03);l.rotation.x=Math.PI/2-.1,s.add(l),s.rotation.x=-.12,s.rotation.y=.35,Li("ronin",s,new C(.03,.04,-.88))}{const s=new Ht,r=new at({color:5504906});s.add(i(new lt(.15,.19,.8),n,0,0,-.2));const a=i(new un(.04,.04,.42,10),n,0,.03,-.78);a.rotation.x=Math.PI/2,s.add(a),s.add(i(new lt(.16,.03,.4),r,0,-.06,-.2)),s.add(i(new lt(.05,.07,.12),n,0,.13,-.15)),s.add(i(new lt(.05,.14,.06),n,0,-.15,.05)),Li("doc",s,new C(0,.03,-1))}{const s=new Ht,r=i(new un(.024,.03,1.5,8),n,0,.01,-.4);r.rotation.x=Math.PI/2,s.add(r);const a=i(new sr(.07,.28,8),e,0,.01,-1.28);a.rotation.x=-Math.PI/2,s.add(a),s.add(i(new lt(.02,.12,.1),e,0,.01,-1.1)),s.add(i(new bn(.045,8,8),n,0,.01,.32)),s.rotation.x=-.06,Li("dragoon",s,new C(0,.01,-1.42))}wt=new Ie(new bn(.09,8,8),new at({color:16777130,transparent:!0,opacity:0})),mn=new pa(6741503,0,12),js.position.set(.32,-.28,-.55),je.add(js)}function Fm(n){for(const[t,i]of Object.entries(Zs))i.group.visible=t===n;const e=Zs[n];e&&(e.group.add(wt),wt.position.copy(e.tip),e.group.add(mn),mn.position.copy(e.tip)),d.wpnAnim=null}function xt(n,e){d.wpnAnim={t:0,dur:e||(n==="recoil"?.14:n==="spin"?.35:.3),kind:n}}function Om(n){const e=Zs[d.classKey];if(!e)return;let t=0,i=0,s=0,r=0,a=0,o=0;const l=d.wpnAnim;if(l){l.t+=n;const c=on(l.t/l.dur,0,1),h=Math.sin(Math.min(1,c)*Math.PI);if(l.kind==="recoil")s+=.13*(1-c),r+=.09*(1-c);else if(l.kind==="cast")i+=.12*h,r-=.2*h;else if(l.kind==="chop")r+=-.9+1.6*c,s-=.12*c,i-=.08*h;else if(l.kind==="slash"){const u=d.swingSide||1;a+=u*(-.5+1*c),o+=u*.3*h,t+=u*.08*(1-2*c)}else l.kind==="thrust"?(s-=.45*h,r-=.06*h):l.kind==="spin"&&(a+=Math.PI*2*c,i+=.06*h);c>=1&&(d.wpnAnim=null)}a+=Math.sin(d.time*1.3)*.02,t+=Math.sin(d.time*.9)*.005,e.group.position.set(e.basePos.x+t,e.basePos.y+i,e.basePos.z+s),e.group.rotation.set(e.baseRot.x+r,e.baseRot.y+a,e.baseRot.z+o)}function Wn(n,e){const t=[];for(let i=0;i<n;i++){const s=e();s.visible=!1,tt.add(s.mesh),t.push(s)}return t}const Wi=Wn(120,()=>({mesh:new Ie(new bn(.12,8,8),new at({color:6750207})),vel:new C,life:0,dmg:0,pierceLeft:0,hits:[],active:!1})),Js=Wn(120,()=>({mesh:new Ie(new bn(.2,8,8),new at({color:16733491})),vel:new C,life:0,dmg:0,pierceLeft:0,hits:[],active:!1})),_a=Wn(260,()=>({mesh:new Ie(new lt(.16,.16,.16),new at({color:16777215,transparent:!0})),vel:new C,life:0,maxLife:1,active:!1})),xa=Wn(160,()=>({mesh:new Ie(new fa(.28,0),new Jt({color:65450,emissive:65450,emissiveIntensity:1.4})),vel:new C,value:0,active:!1})),ar=Wn(24,()=>({mesh:new Ie(new bn(.24,10,10),new Jt({color:3800938,emissive:3800938,emissiveIntensity:1.2})),vel:new C,fuse:0,blastR:6,blastDmg:75,isUlt:!1,stick:null,active:!1})),va=Wn(16,()=>({mesh:new Ie(new lt(1,1,1),new at({color:16777215,transparent:!0,opacity:.9,blending:An,depthWrite:!1})),life:0,maxLife:1,active:!1})),Ma=Wn(8,()=>{const n=new Ie(new kn(1,.12,8,48),new at({color:16777215,transparent:!0,opacity:0,blending:An,depthWrite:!1}));return n.rotation.x=Math.PI/2,{mesh:n,t:0,maxR:10,active:!1}});function Sa(n,e,t=11){for(const i of Ma)if(!i.active){i.active=!0,i.mesh.visible=!0,i.mesh.position.set(n.x,1.2,n.z),i.mesh.material.color.setHex(e),i.mesh.material.opacity=.9,i.t=.001,i.maxR=t;return}}function Jl(n,e,t,i,s){for(const r of va){if(r.active)continue;r.active=!0,r.mesh.visible=!0;const a=n.distanceTo(e);r.mesh.position.copy(n).add(e).multiplyScalar(.5),r.mesh.lookAt(e),r.mesh.scale.set(i,i,a),r.mesh.material.color.setHex(t),r.mesh.material.opacity=.9,r.life=r.maxLife=s;return}}const wn=new Ie(new hi(5,2.8),new at({color:5490943,transparent:!0,opacity:.28,side:fn,depthWrite:!1}));wn.visible=!1;tt.add(wn);const Ni=new Ie(new lt(5.2,.15,.15),new at({color:10149119}));Ni.visible=!1;tt.add(Ni);const Fn=new Ht;{const n=new Ie(new kn(3.5,.12,8,48),new at({color:16765503,transparent:!0,opacity:.9,blending:An,depthWrite:!1}));n.rotation.x=Math.PI/2,n.position.y=.15;const e=new Ie(new cs(3.5,40),new at({color:16765503,transparent:!0,opacity:.1,blending:An,depthWrite:!1}));e.rotation.x=-Math.PI/2,e.position.y=.06,Fn.add(n),Fn.add(e),Fn.visible=!1,tt.add(Fn)}const On=new Ht;{const n=new Ie(new kn(3.5,.12,8,48),new at({color:5504906,transparent:!0,opacity:.9,blending:An,depthWrite:!1}));n.rotation.x=Math.PI/2,n.position.y=.15;const e=new Ie(new cs(3.5,40),new at({color:5504906,transparent:!0,opacity:.1,blending:An,depthWrite:!1}));e.rotation.x=-Math.PI/2,e.position.y=.06,On.add(n),On.add(e),On.visible=!1,tt.add(On)}const En=Wn(6,()=>({mesh:new Ie(new cs(7,32),new at({color:16720418,transparent:!0,opacity:.3,blending:An,depthWrite:!1})),active:!1}));for(const n of En)n.mesh.rotation.x=-Math.PI/2,n.mesh.position.y=.07;function ht(n,e,t=8,i=.7,s=6){let r=0;for(const a of _a)if(!a.active&&(a.active=!0,a.mesh.visible=!0,a.mesh.position.copy(n),a.mesh.material.color.setHex(e),a.mesh.material.opacity=1,a.vel.set(Xe(-1,1),Xe(0,1.4),Xe(-1,1)).normalize().multiplyScalar(Xe(t*.4,t)),a.life=a.maxLife=Xe(i*.6,i),++r>=s))break}function Bm(n,e){for(const t of xa)if(!t.active){t.active=!0,t.mesh.visible=!0,t.mesh.position.set(n.x+Xe(-1,1),.7,n.z+Xe(-1,1)),t.vel.set(Xe(-3,3),Xe(2,5),Xe(-3,3)),t.value=e;return}}function Hi(n,e,t,i,s){for(const r of n)if(!r.active)return r.active=!0,r.mesh.visible=!0,r.mesh.position.copy(e),r.vel.copy(t).multiplyScalar(i),r.life=1.6,r.dmg=s,r.pierceLeft=d.stats?d.stats.pierce:0,r.hits.length=0,r}const et=[];function zm(n){const e=is[n].color,t=new Ht,i=new Jt({color:e,emissive:e,emissiveIntensity:.55,roughness:.4}),s=new Jt({color:2305877,roughness:.5,metalness:.3});let r,a=is[n].radius;if(n==="drone"){r=new Ie(new us(.7),i),r.position.y=1.2;const h=new Ie(new bn(.22,10,10),new at({color:16777215}));h.position.set(0,1.2,.55),t.add(h)}else if(n==="spitter"){r=new Ie(new da(.9),i),r.position.y=1.1;const h=new Ie(new sr(.3,.9,6),s);h.position.y=2,t.add(h)}else if(n==="brute"){r=new Ie(new lt(1.8,2.2,1.8),i),r.position.y=1.4;for(const h of[-1,1]){const u=new Ie(new lt(.7,.7,.7),s);u.position.set(h*1.3,1,.3),t.add(u)}}else{r=new Ie(new lt(3.2,4.2,3.2),i),r.position.y=2.4;const h=new Ie(new kn(1.4,.25,8,8),new at({color:16765503}));h.position.y=4.9,t.add(h)}r.castShadow=!0,t.add(r),t.userData.core=r,t.userData.baseEmissive=.55;const o=new Ie(new hi(a*1.6,.18),new at({color:3342336,depthTest:!1})),l=new Ie(new hi(a*1.6,.18),new at({color:5504906,depthTest:!1})),c=n==="boss"?5.8:n==="brute"?3:2.3;return o.position.y=c,l.position.y=c,l.position.z=.01,t.add(o),t.add(l),t.userData.hpBg=o,t.userData.hpFg=l,t.userData.hpW=a*1.6,t}function Qs(n,e){const t=is[n],i=1+(e-1)*.06+(d.wave>8?(d.wave-8)*.03:0),s=zm(n);let r=0,a=0;for(let c=0;c<12;c++){const h=Math.floor(Xe(0,4)),u=Xe(-Ke+3,Ke-3);h===0?(r=u,a=-Ke+3):h===1?(r=u,a=Ke-3):h===2?(r=-Ke+3,a=u):(r=Ke-3,a=u);const p=r-d.player.pos.x,g=a-d.player.pos.z;if(p*p+g*g>18*18)break}s.position.set(r,0,a),tt.add(s);const o=Math.round(t.hp*i*(n==="boss"?1+e*.12:1)),l={type:n,mesh:s,hp:o,maxHp:o,speed:t.speed*Xe(.9,1.1)*(n==="boss"?1:Math.min(1.35,1+e*.015)),radius:t.radius,dmg:Math.round(t.dmg*(1+e*.04)),xp:t.xp,score:t.score,atkCD:0,shootCD:Xe(1,2.5),summonCD:5,radialCD:3,flash:0,slowT:0,stunT:0,ramId:0,strafeDir:Math.random()<.5?-1:1,strafeT:Xe(1,3),bob:Xe(0,9)};return et.push(l),ht(s.position.clone().setY(1.2),t.color,10,.6,10),l}const Xn=document.createElement("div");Xn.id="bossbar";Xn.style.cssText="position:absolute;top:56px;left:50%;transform:translateX(-50%);width:480px;max-width:70vw;display:none;text-align:center;";Xn.innerHTML='<div style="font-size:12px;letter-spacing:3px;color:#ff6b81;margin-bottom:4px">☠ BOSS ☠</div><div style="height:14px;background:rgba(0,0,0,.6);border:1px solid #ff2d55;border-radius:7px;overflow:hidden"><div id="bossfill" style="height:100%;width:100%;background:linear-gradient(90deg,#ff0033,#ff7a3d)"></div></div>';de("hud").appendChild(Xn);const dn={};let ss=!1;document.addEventListener("keydown",n=>{if(dn[n.code]=!0,n.code==="Space"&&d.state==="playing"&&n.preventDefault(),d.state!=="playing"||n.repeat){n.code==="KeyM"&&!n.repeat&&(ve.muted=!ve.muted,Qt(ve.muted?"🔇 Ton aus":"🔊 Ton an")),d.state==="levelup"&&["Digit1","Digit2","Digit3"].includes(n.code)&&Ea(parseInt(n.code.slice(-1),10)-1),d.state==="gameover"&&n.code==="Enter"&&ya(!1);return}n.code==="Space"&&ic(),n.code==="KeyE"&&oc(),(n.code==="ControlLeft"||n.code==="ControlRight")&&(d.sprint=!d.sprint,Qt(d.sprint?"🏃 Sprint AN":"🚶 Sprint AUS",1200))});document.addEventListener("keyup",n=>{dn[n.code]=!1});document.addEventListener("mousemove",n=>{!ss||d.state!=="playing"||(d.player.yaw-=n.movementX*.0022,d.player.pitch=on(d.player.pitch-n.movementY*.0022,-1.45,1.45))});document.addEventListener("mousedown",n=>{if(d.state==="playing"){if(!ss){fs();return}n.button===0&&(d.firing=!0),n.button===2&&(d.srchold=!0)}});document.addEventListener("mouseup",n=>{n.button===0&&(d.firing=!1),n.button===2&&(d.srchold=!1)});document.addEventListener("contextmenu",n=>n.preventDefault());document.addEventListener("pointerlockchange",()=>{ss=document.pointerLockElement===ns,!ss&&d.state==="playing"&&Hm()});window.addEventListener("resize",()=>{je.aspect=window.innerWidth/window.innerHeight,je.updateProjectionMatrix(),Vi.setSize(window.innerWidth,window.innerHeight)});function fs(){if(ns.requestPointerLock)try{ns.requestPointerLock()}catch{}}let cl=0;function Qt(n,e=2200){const t=de("toast");t.textContent=n,t.classList.remove("hidden"),clearTimeout(cl),cl=setTimeout(()=>t.classList.add("hidden"),e)}function qn(n,e,t=""){const i=n.clone();if(i.y+=1.2,i.project(je),i.z>1)return;const s=document.createElement("div");for(s.className="floater "+t,s.textContent=e,s.style.left=(i.x*.5+.5)*window.innerWidth+"px",s.style.top=(-i.y*.5+.5)*window.innerHeight+"px",de("floaters").appendChild(s),setTimeout(()=>s.remove(),850);de("floaters").children.length>40;)de("floaters").firstChild.remove()}function Rt(n){const e=document.createElement("div");for(e.className="feed",e.textContent=n,de("killfeed").prepend(e),setTimeout(()=>e.remove(),3200);de("killfeed").children.length>5;)de("killfeed").lastChild.remove()}function Yt(n,e=""){de("wave-title").textContent=n,de("wave-sub").textContent=e;const t=de("wave-banner");t.classList.remove("hidden"),t.style.animation="none",t.offsetWidth,t.style.animation="",clearTimeout(Yt.t),Yt.t=setTimeout(()=>t.classList.add("hidden"),2600)}function ds(n){ve.init(),ve.ctx&&ve.ctx.state==="suspended"&&ve.ctx.resume(),d.classKey=n,d.stats=Nm(n),d.player.hp=d.stats.maxHp,d.player.pos.set(0,0,8),d.player.vel.set(0,0,0),d.player.yaw=0,d.player.pitch=0,d.level=1,d.xp=0,d.xpNeed=Kl(1),d.pendingLevels=0,d.score=0,d.kills=0,d.wave=0,d.novaCD=0,d.dashCD=0,d.secCD=0,d.dashTime=0,d.iframes=0,d.ult=0,d.sprint=!1,d.ramTime=0,d.ramDmg=85,d.visorT=0,d.dragonT=0,d.airSlam=null,d.heal=null,d.shakeT=0,d.meteors=[],d.ley=null,d.barrier=null,d.firing=!1,d.srchold=!1,d.fireTimer=0,d.time=0,d.player.py=0,d.player.vy=0,d.player.grounded=!0,document.activeElement&&document.activeElement.blur&&document.activeElement.blur();for(const e of et)tt.remove(e.mesh);et.length=0;for(const e of[Wi,Js,_a,xa,ar,va,Ma,En])for(const t of e)t.active=!1,t.mesh.visible=!1;wn.visible=!1,Ni.visible=!1,Fn.visible=!1,On.visible=!1,de("menu").classList.add("hidden"),de("gameover").classList.add("hidden"),de("pause").classList.add("hidden"),de("levelup").classList.add("hidden"),de("hud").classList.remove("hidden"),de("hud-best").textContent=d.best,Xn.style.display="none",d.state="playing",fs(),E0(),Fm(d.classKey),uc(),Qt(`Klasse ${ma[n].name} — Viel Glück!`,2600),ec()}function Hm(){d.state==="playing"&&(d.state="paused",d.firing=!1,d.srchold=!1,de("pause-stats").innerHTML=`Welle <b>${d.wave}</b> • Level <b>${d.level}</b> • Score <b>${d.score}</b><br>Kills <b>${d.kills}</b> • HP <b>${Math.ceil(d.player.hp)}/${d.stats.maxHp}</b>`,de("pause").classList.remove("hidden"))}function Ql(){d.state!=="paused"&&d.state!=="levelup-wait"||(de("pause").classList.add("hidden"),d.state="playing",fs())}function Gm(){d.state="gameover",d.firing=!1,d.srchold=!1,document.exitPointerLock&&document.exitPointerLock(),ve.boom(),ht(d.player.pos.clone().setY(1.5),16723285,14,1,24);const n=d.score>d.best;n&&(d.best=d.score,localStorage.setItem("neonArenaBest",String(d.best))),de("go-stats").innerHTML=`Level <b>${d.level}</b> • Welle <b>${d.wave}</b> • Kills <b>${d.kills}</b><br>Score <b>${d.score}</b>${n?"<br>🏆 NEUER REKORD!":`<br>Rekord: <b>${d.best}</b>`}`,de("gameover").classList.remove("hidden"),de("hud-best").textContent=d.best}function ya(n=!0){de("gameover").classList.add("hidden"),de("pause").classList.add("hidden"),de("hud").classList.add("hidden"),Xn.style.display="none",d.state="menu",n?de("menu").classList.remove("hidden"):ds(d.classKey)}document.querySelectorAll(".class-card").forEach(n=>{n.addEventListener("click",()=>ds(n.dataset.class))});function km(){for(const n of["pause-classes","go-classes"]){const e=de(n);if(e){e.innerHTML="";for(const[t,i]of Object.entries(ma)){const s=document.createElement("button");s.className="pick-btn",s.innerHTML=`${ga[t].primary.icon} ${i.name}<small>${i.title}</small>`,s.addEventListener("click",()=>ds(t)),e.appendChild(s)}}}}km();de("btn-resume").addEventListener("click",Ql);de("btn-restart2").addEventListener("click",()=>{de("pause").classList.add("hidden"),ds(d.classKey)});de("btn-restart").addEventListener("click",()=>ya(!1));de("btn-tomenu").addEventListener("click",()=>ya(!0));ns.addEventListener("click",()=>{d.state==="paused"?Ql():d.state==="playing"&&!ss&&fs()});function ec(){d.wave++;const n=d.wave%5===0,e=[];if(n){e.push("boss");const t=Math.min(2+d.wave,10);for(let i=0;i<t;i++)e.push(Math.random()<.6?"drone":"spitter");ve.boss(),Yt(`☠ BOSS — WELLE ${d.wave}`,"Besiege den Arena-Champion!"),Rt(`☠ Boss in Welle ${d.wave}!`)}else{const t=Math.min(4+d.wave*2,30);for(let i=0;i<t;i++){const s=Math.random();let r="drone";d.wave>=3&&s<.22?r="brute":d.wave>=2&&s<.55&&(r="spitter"),e.push(r)}e.sort(()=>Math.random()-.5),ve.wave(),Yt(`WELLE ${d.wave}`,`${t} Gegner • Viel Glück`)}d.spawnQueue=e,d.spawnTimer=.5,d.waveState="spawning",de("hud-wave").textContent=d.wave}function Vm(n,e){for(d.xp+=n,e&&qn(e,`+${n} XP`,"xp"),ve.pickup();d.xp>=d.xpNeed;)d.xp-=d.xpNeed,d.level++,d.xpNeed=Kl(d.level),d.pendingLevels++;d.pendingLevels>0&&d.state==="playing"&&tc()}function tc(){d.state="levelup",d.firing=!1,d.srchold=!1,document.exitPointerLock&&document.exitPointerLock(),ve.levelup(),de("lu-level").textContent=d.level;const n=de("lu-cards");n.innerHTML="";const e=[...Im].sort(()=>Math.random()-.5).slice(0,3);d.currentChoices=e,e.forEach((t,i)=>{const s=document.createElement("div");s.className="lu-card",s.innerHTML=`<div class="e">${t.icon}</div><div class="t">${t.title}</div><div class="d">${t.desc}</div><div class="k">[ ${i+1} ] drücken oder klicken</div>`,s.addEventListener("click",()=>Ea(i)),n.appendChild(s)}),de("levelup").classList.remove("hidden"),Yt.t&&clearTimeout(Yt.t)}function Ea(n){if(d.state!=="levelup")return;const e=d.currentChoices&&d.currentChoices[n];if(e){if(Wm(e.id),d.pendingLevels--,Rt(`⬆ ${e.title}`),de("levelup").classList.add("hidden"),d.pendingLevels>0){tc();return}d.state="playing",uc(),Qt("Klick zum Weiterspielen",1800),fs()}}function Wm(n){const e=d.stats;switch(n){case"dmg":e.dmg*=1.2;break;case"rate":e.fireRate*=1.15;break;case"hp":e.maxHp+=25,d.player.hp=Math.min(e.maxHp,d.player.hp+50);break;case"speed":e.speed*=1.1;break;case"crit":e.crit=Math.min(.8,e.crit+.1);break;case"multi":e.projectiles=Math.min(8,e.projectiles+1);break;case"pierce":e.pierce=Math.min(5,e.pierce+1);break;case"steal":e.lifesteal+=.02;break;case"armor":e.armor=Math.min(.6,e.armor+.08);break;case"regen":e.regen+=1.2;break;case"magnet":e.magnet*=1.6;break;case"nova":e.abilityMul*=1.5,e.novaCDMax=Math.max(3,e.novaCDMax-1);break;case"dash":e.dashCDMax*=.75,e.dashPower*=1.3;break}}const Gs=new C;function Ta(){if(d.ley&&d.ley.t>0){const n=d.player.pos.x-d.ley.x,e=d.player.pos.z-d.ley.z;if(n*n+e*e<3.5*3.5)return 1.4}return 1}const ln=()=>d.stats.abilityMul*(1+(d.level-1)*.05)*Ta();function nc(n){d.state!=="playing"||d.ult>=100||(d.ult=Math.min(100,d.ult+n),d.ult>=100&&(Qt("💢 ULT BEREIT — [E] drücken!",2500),ve.wave()))}function or(n,e){d.shakeMag=n,d.shakeDur=e,d.shakeT=e}function ic(){d.state!=="playing"||!d.player.grounded||(d.player.vy=8.5,d.player.grounded=!1,ve.tone(280,.12,"square",.22,250))}function sc(){d.state!=="playing"||d.secCD>0||(d.secCD=d.stats.secCDMax,d.sprint=!1,d.classKey==="pulsar"?Xm():d.classKey==="aegis"?Km():d.classKey==="meteor"?u0():d.classKey==="ronin"?Qm():d.classKey==="doc"?i0():o0())}function rc(){d.state!=="playing"||d.novaCD>0||(d.novaCD=d.stats.novaCDMax,d.sprint=!1,d.classKey==="pulsar"?qm():d.classKey==="aegis"?jm():d.classKey==="meteor"?f0():d.classKey==="ronin"?e0():d.classKey==="doc"?s0():l0())}function ac(){d.state!=="playing"||d.dashCD>0||(d.dashCD=d.stats.dashCDMax,d.classKey==="pulsar"?Ym():d.classKey==="aegis"?Zm():d.classKey==="meteor"?d0():d.classKey==="ronin"?t0():d.classKey==="doc"?r0():c0())}function oc(){if(d.state==="playing"){if(d.ult<100){Qt(`Ult lädt … ${Math.floor(d.ult)}% (Kills & Schaden)`,1500);return}if(et.length===0){Qt("Kein Ziel in der Arena!",1500);return}d.ult=0,d.sprint=!1,d.classKey==="pulsar"?$m():d.classKey==="aegis"?Jm():d.classKey==="meteor"?p0():d.classKey==="ronin"?n0():d.classKey==="doc"?a0():h0()}}function ba(n,e,t,i=16755251,s=12,r=!1){ve.boom(),ht(n.clone().setY(1),i,14,.7,18),ht(n.clone().setY(1),16777215,9,.4,6),Sa(n,i,e),or(.22,.25);for(const a of et){if(a.dead)continue;const o=a.mesh.position.distanceTo(n);o<e+a.radius&&(Se.copy(a.mesh.position).sub(n),Se.y=0,Se.lengthSq()>.001&&(a.knock=Se.normalize().multiplyScalar(s).clone()),$n(a,t*(1-o/(e*2+4)),!1,r))}}function Xm(){je.getWorldDirection(Se),wt.getWorldPosition(vt);const n=30*ln();for(let e=-2;e<=2;e++){he.copy(Se);const t=e*.09,i=Math.cos(t),s=Math.sin(t),r=he.x*i-he.z*s,a=he.x*s+he.z*i;he.x=r,he.z=a,he.normalize();const o=Hi(Wi,vt,he,70,n*Xe(.9,1.1));o&&(o.isCrit=!1)}wt.material.opacity=1,mn.intensity=6,ve.shoot(),Yn(.02),xt("recoil")}function qm(){Gs.copy(d.player.pos);const n=11;Sa(Gs,6740479,n),ht(Gs.clone().setY(1.2),6740479,14,.8,22),ve.nova();let e=0;for(const t of et)t.dead||t.mesh.position.distanceTo(Gs)<n+t.radius&&(t.slowT=4,qn(t.mesh.position,"🐌 SLOW","xp"),$n(t,20*ln(),!1),e++);e>0&&Rt(`⏳ Zeitblase: ${e} verlangsamt!`),xt("cast")}function lc(n){const e=di();e.lengthSq()<.01&&e.set(-Math.sin(d.player.yaw),0,-Math.cos(d.player.yaw)),e.normalize(),ht(d.player.pos.clone().setY(1.2),8019199,10,.5,12);let t=n;for(;t>1;t-=1){const i=d.player.pos.x+e.x*t,s=d.player.pos.z+e.z*t;if(Math.abs(i)>Ke-1.2||Math.abs(s)>Ke-1.2)continue;let r=!1;for(const a of ui){const o=i-a.x,l=s-a.z;if(o*o+l*l<(a.r+.9)*(a.r+.9)){r=!0;break}}if(!r)break}d.player.pos.x+=e.x*t,d.player.pos.z+=e.z*t,d.iframes=Math.max(d.iframes,.3),ve.dash(),ht(d.player.pos.clone().setY(1.2),8019199,10,.5,12)}function Ym(){lc(8*(d.stats.dashPower/26))}function $m(){je.getWorldDirection(Se),wt.getWorldPosition(vt),Yt("💣 PULSBOMBE!","Bleibt kleben. Rennt!"),Rt("💣 Pulsbombe geworfen!");for(const n of ar)if(!n.active){n.active=!0,n.mesh.visible=!0,n.mesh.position.copy(vt),n.mesh.material.color.setHex(16723320),n.mesh.material.emissive.setHex(16723320),n.vel.copy(Se).multiplyScalar(30),n.vel.y+=1,n.fuse=1.2,n.blastR=10,n.blastDmg=300,n.isUlt=!0,n.stick=null;break}ve.tone(500,.15,"square",.4,200),xt("recoil")}const cc={aegis:{range:4.5,dot:.6,color:16751165},ronin:{range:3.6,dot:.5,color:10149119},dragoon:{range:5.5,dot:.75,color:8368895}};function hc(n,e,t,i=1,s=9){const r=d.stats;je.getWorldDirection(Se);let a=(1+(d.level-1)*.05)*Ta()*i;d.dragonT>0&&(a*=2);const o=d.visorT>0?!0:Math.random()<r.crit,l=r.dmg*a*(o?2:1);for(const c of et){if(c.dead)continue;he.set(c.mesh.position.x-d.player.pos.x,0,c.mesh.position.z-d.player.pos.z);const h=he.length();h>n+c.radius||(he.normalize(),he.x*Se.x+he.z*Se.z<e&&h>1.5)||(he.multiplyScalar(s),c.knock=he.clone(),$n(c,l,o),d.dragonT>0&&(d.player.hp=Math.min(r.maxHp,d.player.hp+l*.1)))}for(let c=-2;c<=2;c++){he.copy(Se).multiplyScalar(n*.55);const h=c*.25,u=Math.cos(h),p=Math.sin(h),g=he.x*u-he.z*p,_=he.x*p+he.z*u;ht(new C(d.player.pos.x+g,1.4,d.player.pos.z+_),t,4,.25,1)}ve.noise(.12,.5,1200),Yn(.02),wt.material.opacity=1,mn.intensity=4,d.classKey==="ronin"?(d.swingSide=-(d.swingSide||1),xt("slash",.22)):d.classKey==="dragoon"?xt("thrust",.3):xt("chop",.32)}function Km(){je.getWorldDirection(Se),wt.getWorldPosition(vt);const n=2+d.stats.pierce,e=95*ln(),t=[];for(const s of et){if(s.dead)continue;he.set(s.mesh.position.x,1.3,s.mesh.position.z).sub(vt);const r=he.dot(Se);r<0||r>42||he.lengthSq()-r*r<2.2&&t.push({e:s,along:r})}t.sort((s,r)=>s.along-r.along);const i=vt.clone().addScaledVector(Se,42);t.slice(0,n).forEach(({e:s})=>$n(s,e,!1)),Jl(vt,i,16742973,.7,.35),ve.tone(180,.35,"sawtooth",.5,120),ve.noise(.2,.4,1500),Yn(.03),or(.12,.15),xt("recoil"),t.length>0&&Rt(`🔥 Feuerstoß: ${Math.min(t.length,n)} Treffer!`)}function jm(){if(d.barrier){Qt("Barriere steht bereits!",1200),d.novaCD=0;return}const n=-Math.sin(d.player.yaw),e=-Math.cos(d.player.yaw),t=d.player.pos.x+n*2.6,i=d.player.pos.z+e*2.6;wn.position.set(t,1.5,i),wn.rotation.y=d.player.yaw,wn.visible=!0,d.barrier={x:t,z:i,yaw:d.player.yaw,t:5,hp:150},ve.tone(200,.3,"triangle",.5,100),Qt("🛡️ Barriere errichtet (5s / 150 HP)!",2e3),xt("cast")}function Zm(){const n=di();n.lengthSq()<.01&&n.set(-Math.sin(d.player.yaw),0,-Math.cos(d.player.yaw)),d.ramDir=n.normalize().clone(),d.ramTime=.32,d.ramId++,d.ramDmg=85,d.iframes=Math.max(d.iframes,.4),ve.dash(),ve.tone(120,.25,"sawtooth",.5,60)}function Jm(){je.getWorldDirection(Se),Yt("🌋 ERDBEBEN!","Der Boden bricht auf"),Rt("🌋 Erdbeben!"),ve.boom(),or(.55,.6),Sa(d.player.pos,16751165,16);let n=0;for(const e of et)e.dead||(he.set(e.mesh.position.x-d.player.pos.x,0,e.mesh.position.z-d.player.pos.z),he.length()>16)||(he.normalize(),he.x*Se.x+he.z*Se.z<.6)||(e.stunT=3,qn(e.mesh.position,"💫 BETÄUBT!","crit"),he.multiplyScalar(18),e.knock=he.clone(),$n(e,250*ln(),!1,!0),n++);n>0&&Rt(`🌋 ${n} Gegner betäubt!`),xt("chop",.5)}function Qm(){je.getWorldDirection(Se),wt.getWorldPosition(vt);const n=24*ln();for(let e=-1;e<=1;e++){he.copy(Se);const t=e*.07,i=Math.cos(t),s=Math.sin(t),r=he.x*i-he.z*s,a=he.x*s+he.z*i;he.x=r,he.z=a,he.normalize();const o=Hi(Wi,vt,he,90,n*Xe(.9,1.1));o&&(o.isCrit=Math.random()<d.stats.crit)}wt.material.opacity=1,mn.intensity=5,ve.tone(900,.08,"square",.35,400),Yn(.015),xt("recoil")}function e0(){const n=cc.ronin;hc(5,-1,n.color,1.2,12),xt("spin",.35),ve.tone(600,.2,"sawtooth",.4,300),Rt("🌀 Klingenwirbel!")}function t0(){const n=di();n.lengthSq()<.01&&n.set(-Math.sin(d.player.yaw),0,-Math.cos(d.player.yaw)),d.ramDir=n.normalize().clone(),d.ramTime=.4,d.ramId++,d.ramDmg=70,d.iframes=Math.max(d.iframes,.45),ve.dash(),ve.tone(1e3,.18,"sawtooth",.4,500),ht(d.player.pos.clone().setY(1.2),10149119,10,.5,10)}function n0(){d.dragonT=8,ve.levelup(),Yt("🐉 DRACHENKLINGE!","8s: Doppelter Nahkampfschaden + Lifesteal"),Rt("🐉 Drachenklinge!"),xt("cast"),ht(d.player.pos.clone().setY(1.5),10149119,14,.8,20)}function i0(){je.getWorldDirection(Se),wt.getWorldPosition(vt);for(let n=-1;n<=1;n++)for(const e of ar){if(e.active)continue;e.active=!0,e.mesh.visible=!0,e.mesh.position.copy(vt),e.mesh.material.color.setHex(16757821),e.mesh.material.emissive.setHex(16757821),he.copy(Se);const t=n*.12,i=Math.cos(t),s=Math.sin(t),r=he.x*i-he.z*s,a=he.x*s+he.z*i;he.x=r,he.z=a,he.normalize(),e.vel.copy(he).multiplyScalar(30),e.vel.y+=1.5,e.fuse=.9,e.blastR=3.5,e.blastDmg=50,e.isUlt=!1,e.stick=null;break}ve.tone(400,.2,"square",.45,300),Yn(.03),xt("recoil")}function s0(){d.heal={x:d.player.pos.x,z:d.player.pos.z,t:6},On.position.set(d.heal.x,.06,d.heal.z),On.visible=!0,ve.tone(520,.3,"sine",.5,260),Qt("💚 HEILFELD: +8 HP/s im Kreis (6s)!",2200),xt("cast")}function r0(){const n=di();n.lengthSq()<.01&&n.set(-Math.sin(d.player.yaw),0,-Math.cos(d.player.yaw)),d.dashDir=n.normalize().clone(),d.dashTime=.16,d.player.vy=Math.max(d.player.vy,6),d.player.grounded=!1,d.iframes=Math.max(d.iframes,.3),ve.dash(),ht(d.player.pos.clone().setY(.6),5504906,8,.4,8)}function a0(){d.visorT=6,ve.levelup(),Yt("🎯 VISIER AKTIV!","6s: Jeder Treffer kritisch, +50% Feuerrate"),Rt("🎯 Taktisches Visier!"),xt("cast")}function o0(){je.getWorldDirection(Se),wt.getWorldPosition(vt);const n=Hi(Wi,vt,Se,55,60*ln()*Xe(.9,1.1));n&&(n.isCrit=Math.random()<d.stats.crit,n.mesh.scale.setScalar(1.8),setTimeout(()=>{n.mesh.scale.setScalar(1)},1600)),wt.material.opacity=1,mn.intensity=6,ve.tone(350,.15,"sawtooth",.45,150),Yn(.025),xt("recoil")}function l0(){const n=di();n.lengthSq()<.01&&n.set(-Math.sin(d.player.yaw),0,-Math.cos(d.player.yaw)),d.dashDir=n.normalize().negate().clone(),d.dashTime=.25,d.iframes=Math.max(d.iframes,.5),ve.dash(),ht(d.player.pos.clone().setY(1),8368895,8,.4,8)}function c0(){const n=di();n.lengthSq()<.01&&n.set(-Math.sin(d.player.yaw),0,-Math.cos(d.player.yaw)),n.normalize(),d.player.vy=Math.max(d.player.vy,14),d.player.grounded=!1,d.player.vel.set(n.x*10,0,n.z*10),d.airSlam={r:10,dmg:150,ult:!1},d.iframes=Math.max(d.iframes,.6),ve.tone(180,.3,"sawtooth",.5,300),Rt("🦘 Hochsprung!")}function h0(){let n=null,e=40;for(const t of et){if(t.dead)continue;const i=t.mesh.position.distanceTo(d.player.pos);i<e&&(e=i,n=t)}Se.set(-Math.sin(d.player.yaw),0,-Math.cos(d.player.yaw)),n&&Se.set(n.mesh.position.x-d.player.pos.x,0,n.mesh.position.z-d.player.pos.z).normalize(),d.player.vy=Math.max(d.player.vy,13),d.player.grounded=!1,d.player.vel.set(Se.x*20,0,Se.z*20),d.airSlam={r:14,dmg:350,ult:!0},d.iframes=Math.max(d.iframes,1),Yt("🐲 DRACHENSTURZ!","Der Himmel fällt herab"),Rt("🐲 Drachensturz!"),ve.boss()}function u0(){je.getWorldDirection(Se),wt.getWorldPosition(vt);let n=null,e=.9;for(const a of et){if(a.dead||(he.set(a.mesh.position.x,1.3,a.mesh.position.z).sub(vt),he.length()>30))continue;const l=he.normalize().dot(Se);l>e&&(e=l,n=a)}if(!n){d.secCD=0,Qt("Kein Ziel im Visier!",1200);return}const t=1+d.stats.pierce,i=new Set;let s=70*ln();const r=vt.clone();for(let a=0;a<t&&n;a++){i.add(n);const o=new C(n.mesh.position.x,1.3,n.mesh.position.z);Jl(r.clone(),o,10149119,.4,.3),ht(o,10149119,8,.4,6),$n(n,s,a===0),r.copy(o),s*=.65;let l=null,c=11;for(const h of et){if(h.dead||i.has(h))continue;const u=h.mesh.position.distanceTo(n.mesh.position);u<c&&(c=u,l=h)}n=l}ve.tone(1400,.2,"sawtooth",.45,-900),Yn(.02),xt("recoil")}function f0(){d.ley={x:d.player.pos.x,z:d.player.pos.z,t:6},Fn.position.set(d.ley.x,.06,d.ley.z),Fn.visible=!0,ve.tone(660,.3,"triangle",.5,330),Qt("🔷 LEY-LINIEN: +40% Schaden im Kreis (6s)!",2200),xt("cast")}function d0(){lc(10*(d.stats.dashPower/26))}function p0(){Yt("☄️ METEOR!","Deckung suchen!"),Rt("☄️ Meteor!"),ve.boss(),xt("cast");const n=et.filter(t=>!t.dead);let e=0;for(let t=0;t<5;t++){const i=n.length>0?n[Math.floor(Math.random()*n.length)]:null,s=i?i.mesh.position.x+Xe(-2,2):Xe(-15,15),r=i?i.mesh.position.z+Xe(-2,2):Xe(-15,15);let a=-1;for(let o=0;o<En.length;o++){const l=(e+o)%En.length;if(!En[l].active){a=l,e=l+1;break}}a>=0&&(En[a].active=!0,En[a].mesh.visible=!0,En[a].mesh.position.set(s,.07,r)),d.meteors.push({x:s,z:r,t:1+t*.15,warn:a})}}const Se=new C,he=new C,vt=new C;function m0(n){if(d.fireTimer-=n,!d.firing||d.fireTimer>0)return;const e=d.stats,t=d.visorT>0?1.5:1;d.fireTimer=1/(e.fireRate*t),d.sprint=!1;const i=cc[d.classKey];if(i){hc(i.range,i.dot,i.color,1,9);return}je.getWorldDirection(Se),wt.getWorldPosition(vt);const s=(1+(d.level-1)*.05)*Ta();for(let r=0;r<e.projectiles;r++){he.copy(Se);const a=e.spread*(e.projectiles>1,1);he.x+=Xe(-a,a),he.y+=Xe(-a,a)*.5,he.z+=Xe(-a,a),he.normalize();let o=e.dmg*s*Xe(.9,1.1);const l=d.visorT>0?!0:Math.random()<e.crit;l&&(o*=2);const c=Hi(Wi,vt,he,e.shotSpeed,o);c&&(c.isCrit=l)}wt.material.opacity=1,mn.intensity=6,d.classKey==="meteor"?(ve.tone(300,.12,"sawtooth",.4,-150),ve.noise(.1,.4,800)):ve.shoot(),xt("recoil"),Yn(.008)}let Qi=0;function Yn(n){Qi=Math.min(.06,Qi+n)}function $n(n,e,t,i=!1){if(n.hp<=0)return;n.hp-=e,n.flash=.08,qn(n.mesh.position,`${Math.round(e)}${t?" CRIT!":""}`,t?"crit":""),ve.hit(),ht(n.mesh.position.clone().setY(1.4),is[n.type].color,6,.4,3),d.stats.lifesteal>0&&(d.player.hp=Math.min(d.stats.maxHp,d.player.hp+e*d.stats.lifesteal)),i||nc(e*.04);const s=de("hitmarker");s.classList.remove("show"),s.offsetWidth,s.classList.add("show"),n.hp<=0&&g0(n,i)}function g0(n,e=!1){d.kills++,e||nc(12);const t=1+d.wave*.05;d.score+=Math.round(n.score*t),ht(n.mesh.position.clone().setY(1.5),is[n.type].color,12,.9,14),ht(n.mesh.position.clone().setY(1.5),16777215,8,.5,6),ve.boom();const i=n.type==="boss"?8:n.type==="brute"?4:2,s=Math.max(1,Math.round(n.xp/i));for(let r=0;r<i;r++)Bm(n.mesh.position,s);n.type==="boss"&&(Rt(`☠ Boss besiegt! +${n.score} Punkte`),Yt("BOSS BESIEGT!",`+${n.xp} XP`),Xn.style.display="none",d.player.hp=Math.min(d.stats.maxHp,d.player.hp+30),qn(d.player.pos,"+30 HP","heal")),tt.remove(n.mesh),n.dead=!0,de("hud-score").textContent=d.score}function Vs(n,e){if(d.iframes>0||d.state!=="playing")return;const t=n*(1-d.stats.armor);d.player.hp-=t,d.iframes=.4,ve.hurt(),qn(d.player.pos,`-${Math.round(t)}`,"hurt");const i=de("dmg-vignette");i.style.opacity=.9,setTimeout(()=>{i.style.opacity=0},180),e&&(Se.copy(d.player.pos).sub(e).setY(0).normalize(),d.player.vel.addScaledVector(Se,8)),d.player.hp<=0&&(d.player.hp=0,Gm())}function di(){const n=(dn.KeyW?1:0)-(dn.KeyS?1:0),e=(dn.KeyD?1:0)-(dn.KeyA?1:0),t=-Math.sin(d.player.yaw),i=-Math.cos(d.player.yaw),s=Math.cos(d.player.yaw),r=-Math.sin(d.player.yaw);return Se.set(t*n+s*e,0,i*n+r*e),Se.lengthSq()>1&&Se.normalize(),Se}function _0(n){const e=d.player,t=d.stats;(dn.ShiftLeft||dn.ShiftRight)&&ac(),dn.KeyQ&&rc(),d.srchold&&sc(),d.novaCD=Math.max(0,d.novaCD-n),d.dashCD=Math.max(0,d.dashCD-n),d.secCD=Math.max(0,d.secCD-n),d.iframes=Math.max(0,d.iframes-n);const i=di();let s=t.speed*(d.sprint?1.35:1);if(d.dashTime>0)d.dashTime-=n,e.vel.copy(d.dashDir).multiplyScalar(t.dashPower);else if(d.ramTime>0){d.ramTime-=n,e.vel.copy(d.ramDir).multiplyScalar(t.dashPower*1.15);for(const l of et){if(l.dead||l.ramId===d.ramId)continue;const c=l.mesh.position.x-e.pos.x,h=l.mesh.position.z-e.pos.z;c*c+h*h<2.8*2.8&&(l.ramId=d.ramId,Se.set(c,0,h).normalize(),l.knock=Se.clone().multiplyScalar(20),$n(l,d.ramDmg*ln(),!1))}}else{const l=i.clone().multiplyScalar(s);e.vel.lerp(l,1-Math.pow(1e-4,n))}e.pos.addScaledVector(e.vel,n),e.pos.x=on(e.pos.x,-Ke+1,Ke-1),e.pos.z=on(e.pos.z,-Ke+1,Ke-1);for(const l of ui){const c=e.pos.x-l.x,h=e.pos.z-l.z,u=Math.hypot(c,h),p=l.r+e.radius;u<p&&u>.001&&(e.pos.x=l.x+c/u*p,e.pos.z=l.z+h/u*p)}if(!e.grounded&&(e.vy-=24*n,e.py+=e.vy*n,e.py<=0&&(e.py=0,e.vy=0,e.grounded=!0,ht(e.pos.clone().setY(.3),8952234,4,.3,5),d.airSlam))){const l=d.airSlam;d.airSlam=null,ba(e.pos,l.r,l.dmg*ln(),16765503,18,l.ult),or(.35,.4)}if(d.visorT=Math.max(0,d.visorT-n),d.dragonT=Math.max(0,d.dragonT-n),d.heal)if(d.heal.t-=n,d.heal.t<=0)d.heal=null,On.visible=!1;else{const l=e.pos.x-d.heal.x,c=e.pos.z-d.heal.z;l*l+c*c<3.5*3.5&&(e.hp=Math.min(t.maxHp,e.hp+8*n))}t.regen>0&&(e.hp=Math.min(t.maxHp,e.hp+t.regen*n)),Qi=Math.max(0,Qi-n*.4);let r=0,a=0;if(d.shakeT>0){d.shakeT-=n;const l=Math.max(0,d.shakeT/d.shakeDur)*d.shakeMag;r=Xe(-1,1)*l*.4,a=Xe(-1,1)*l*.4}je.position.set(e.pos.x+r,1.7+e.py+Math.sin(d.time*2)*.03+a,e.pos.z),je.rotation.y=e.yaw,je.rotation.x=e.pitch+Qi;const o=d.dashTime>0||d.ramTime>0?90:78;je.fov+=(o-je.fov)*Math.min(1,n*10),je.updateProjectionMatrix(),js.position.y=-.28+Math.sin(d.time*8)*.008*(i.lengthSq()>.01?1:.3),wt.material.opacity=Math.max(0,wt.material.opacity-n*10),mn.intensity=Math.max(0,mn.intensity-n*60),Om(n),m0(n)}function hl(n,e,t,i,s,r){const a=s-t,o=r-i,l=a*a+o*o;let c=l>0?((n-t)*a+(e-i)*o)/l:0;c=on(c,0,1);const h=t+a*c-n,u=i+o*c-e;return h*h+u*u}function x0(n){for(const e of Wi){if(!e.active)continue;e.life-=n;const t=e.mesh.position,i=t.x,s=t.z;t.addScaledVector(e.vel,n);let r=e.life<=0||Math.abs(t.x)>Ke+1||Math.abs(t.z)>Ke+1||t.y<0||t.y>20;if(!r)for(const a of ui){const o=t.x-a.x,l=t.z-a.z;if(o*o+l*l<a.r*a.r&&t.y<8){r=!0,ht(t,61695,5,.3,3);break}}if(!r)for(const a of et){if(a.dead||e.hits.includes(a))continue;const o=a.radius+.4,l=1.3-t.y;if(Math.abs(l)<2.6&&hl(a.mesh.position.x,a.mesh.position.z,i,s,t.x,t.z)<o*o){e.hits.push(a),$n(a,e.dmg,e.isCrit),e.pierceLeft>0?e.pierceLeft--:r=!0;break}}r&&(e.active=!1,e.mesh.visible=!1)}for(const e of Js){if(!e.active)continue;e.life-=n;const t=e.mesh.position,i=t.x,s=t.z;t.addScaledVector(e.vel,n);let r=e.life<=0||Math.abs(t.x)>Ke+1||Math.abs(t.z)>Ke+1;if(!r){const a=1.2-t.y;Math.abs(a)<2&&hl(d.player.pos.x,d.player.pos.z,i,s,t.x,t.z)<1.2&&(Vs(e.dmg,null),ht(t,16733491,6,.4,5),r=!0)}if(!r)for(const a of ui){const o=t.x-a.x,l=t.z-a.z;if(o*o+l*l<a.r*a.r&&t.y<8){r=!0;break}}if(!r&&d.barrier){const a=d.barrier,o=-Math.sin(a.yaw),l=-Math.cos(a.yaw),c=t.x-a.x,h=t.z-a.z,u=Math.abs(c*o+h*l),p=Math.abs(c*l-h*o);u<.6&&p<2.6&&t.y<3.4&&(r=!0,d.barrier.hp-=e.dmg,ht(t,5490943,6,.4,5),ve.tone(700,.08,"square",.25,-200))}r&&(e.active=!1,e.mesh.visible=!1)}}function v0(n){const e=d.player.pos;for(let t=0;t<et.length;t++){const i=et[t];if(!i.dead)for(let s=t+1;s<et.length;s++){const r=et[s];if(r.dead)continue;const a=r.mesh.position.x-i.mesh.position.x,o=r.mesh.position.z-i.mesh.position.z,l=i.radius+r.radius,c=a*a+o*o;if(c<l*l&&c>1e-4){const h=Math.sqrt(c),u=(l-h)*.5,p=a/h,g=o/h;i.mesh.position.x-=p*u,i.mesh.position.z-=g*u,r.mesh.position.x+=p*u,r.mesh.position.z+=g*u}}}for(const t of et){if(t.dead)continue;const i=t.mesh;Se.copy(e).sub(i.position),Se.y=0;const s=Se.length(),r=s>.001?Se.divideScalar(s):Se.set(0,0,0);t.atkCD-=n,t.shootCD-=n,t.flash=Math.max(0,t.flash-n),t.bob+=n*4,t.slowT=Math.max(0,t.slowT-n);const a=t.stunT>0;a&&(t.stunT-=n),t.knock&&(i.position.addScaledVector(t.knock,n),t.knock.multiplyScalar(Math.max(0,1-n*5)),t.knock.length()<.5&&(t.knock=null));const o=t.speed*(t.slowT>0?.45:1);if(!a){if(t.type==="drone")s>2?i.position.addScaledVector(r,o*n):(he.set(-r.z,0,r.x).multiplyScalar(t.strafeDir*o*.4*n),i.position.add(he)),i.position.y=Math.abs(Math.sin(t.bob))*.25,i.rotation.y+=n*3,s<2.4&&t.atkCD<=0&&d.player.py<.9&&(t.atkCD=1,Vs(t.dmg,i.position));else if(t.type==="spitter")t.strafeT-=n,t.strafeT<=0&&(t.strafeT=Xe(1,2.5),t.strafeDir*=-1),s>16?i.position.addScaledVector(r,o*n):s<9?i.position.addScaledVector(r,-o*n):(he.set(-r.z,0,r.x).multiplyScalar(t.strafeDir*o*.7*n),i.position.add(he)),i.rotation.y=Math.atan2(r.x,r.z),s<26&&t.shootCD<=0&&(t.shootCD=Xe(1.4,2.4),he.copy(e).setY(1.2).sub(i.position.clone().setY(1.2)).normalize(),Hi(Js,i.position.clone().setY(1.3),he,15,t.dmg),ve.tone(440,.12,"square",.25,-200));else if(t.type==="brute")s>3&&i.position.addScaledVector(r,o*n),i.rotation.y=Math.atan2(r.x,r.z),s<3.2&&t.atkCD<=0&&d.player.py<.9&&(t.atkCD=1.6,Vs(t.dmg,i.position),ht(i.position.clone().setY(1),11816447,9,.5,10));else if(t.type==="boss"){const u=t.hp<t.maxHp*.3,p=o*(u?1.5:1);if(s>3.8&&i.position.addScaledVector(r,p*n),i.rotation.y=Math.atan2(r.x,r.z),t.radialCD-=n,t.summonCD-=n,s<4.2&&t.atkCD<=0&&d.player.py<1.4&&(t.atkCD=1.4,Vs(t.dmg,i.position),ht(i.position.clone().setY(1.5),16711731,12,.6,14),ve.boom()),t.radialCD<=0){t.radialCD=u?2.5:4;const g=10;for(let _=0;_<g;_++){const x=_/g*Math.PI*2;Hi(Js,i.position.clone().setY(2),new C(Math.cos(x),-.08,Math.sin(x)).normalize(),11,Math.round(t.dmg*.5))}ve.tone(200,.3,"sawtooth",.5,150),ht(i.position.clone().setY(2.5),16711731,10,.5,12)}t.summonCD<=0&&et.length<24&&(t.summonCD=9,Qs("drone",d.wave),Qs("drone",d.wave),Rt("Boss ruft Verstärkung!")),Xn.style.display="block",de("bossfill").style.width=`${Math.max(0,t.hp/t.maxHp*100)}%`}}for(const u of ui){const p=i.position.x-u.x,g=i.position.z-u.z,_=Math.hypot(p,g),x=u.r+t.radius*.7;_<x&&_>.001&&(i.position.x=u.x+p/_*x,i.position.z=u.z+g/_*x)}i.position.x=on(i.position.x,-Ke+.5,Ke-.5),i.position.z=on(i.position.z,-Ke+.5,Ke-.5);{const u=i.position.x-e.x,p=i.position.z-e.z,g=Math.hypot(u,p),_=t.radius*.7+d.player.radius+.6;g<_&&(g>.001?(i.position.x=e.x+u/g*_,i.position.z=e.z+p/g*_):i.position.x=e.x+_)}const l=i.userData.core;l&&(l.material.emissiveIntensity=t.flash>0?2.2:i.userData.baseEmissive);const c=on(t.hp/t.maxHp,0,1),h=c<1;i.userData.hpBg.visible=h,i.userData.hpFg.visible=h,h&&(i.userData.hpFg.scale.x=Math.max(.001,c),i.userData.hpFg.position.x=-i.userData.hpW*(1-c)/2,i.userData.hpFg.material.color.setHex(c>.5?5504906:c>.25?16765503:16723285),i.userData.hpBg.lookAt(je.position),i.userData.hpFg.lookAt(je.position))}for(let t=et.length-1;t>=0;t--)et[t].dead&&et.splice(t,1)}function M0(n){const e=d.player.pos;for(const t of xa){if(!t.active)continue;Se.copy(e).sub(t.mesh.position),Se.y=0;const i=Se.length();if(i<d.stats.magnet){Se.normalize();const s=26*(1-i/(d.stats.magnet+1))+8;t.mesh.position.addScaledVector(Se,s*n)}else t.vel.y-=12*n,t.mesh.position.addScaledVector(t.vel,n),t.mesh.position.y<.4&&(t.mesh.position.y=.4,t.vel.set(0,0,0));t.mesh.rotation.y+=n*4,i<1.3&&(t.active=!1,t.mesh.visible=!1,Vm(t.value,t.mesh.position))}}function Yr(n){for(const e of _a)if(e.active){if(e.life-=n,e.life<=0){e.active=!1,e.mesh.visible=!1;continue}e.vel.y-=9*n,e.mesh.position.addScaledVector(e.vel,n),e.mesh.material.opacity=e.life/e.maxLife,e.mesh.rotation.x+=n*5,e.mesh.rotation.y+=n*4}for(const e of Ma){if(!e.active)continue;if(e.t+=n*2.2,e.t>=1){e.active=!1,e.mesh.visible=!1;continue}const t=Math.max(.01,e.t*e.maxR);e.mesh.scale.set(t,t,1),e.mesh.material.opacity=.9*(1-e.t)}for(const e of va)if(e.active){if(e.life-=n,e.life<=0){e.active=!1,e.mesh.visible=!1;continue}e.mesh.material.opacity=.9*(e.life/e.maxLife)}}function S0(n){for(const e of ar){if(!e.active)continue;e.fuse-=n;const t=e.mesh.position;e.stick?e.stick.dead?e.stick=null:t.set(e.stick.mesh.position.x,1.4,e.stick.mesh.position.z):(e.vel.y-=18*n,t.addScaledVector(e.vel,n),t.y<.25&&(t.y=.25,e.vel.y*=-.45,e.vel.x*=.7,e.vel.z*=.7));let i=e.fuse<=0||!e.stick&&(Math.abs(t.x)>Ke||Math.abs(t.z)>Ke);if(!i&&!e.stick)for(const s of ui){const r=t.x-s.x,a=t.z-s.z;if(r*r+a*a<s.r*s.r&&t.y<8){i=!0;break}}if(!i&&!e.stick)for(const s of et){if(s.dead)continue;const r=s.mesh.position.x-t.x,a=s.mesh.position.z-t.z;if(r*r+a*a<(s.radius+.5)*(s.radius+.5)&&t.y<3){e.stick=s,ve.tone(880,.15,"square",.4,220),qn(s.mesh.position,"💣 KLEBT!","crit");break}}i&&(e.active=!1,e.mesh.visible=!1,e.stick=null,ba(new C(t.x,0,t.z),e.blastR,e.blastDmg*ln(),16723320,14,e.isUlt))}}function y0(n){if(d.ley&&(d.ley.t-=n,d.ley.t<=0&&(d.ley=null,Fn.visible=!1)),d.barrier&&(d.barrier.t-=n,wn.material.opacity=.15+.13*Math.sin(d.time*6),d.barrier.t<=0||d.barrier.hp<=0?(d.barrier.hp<=0&&(Rt("🛡️ Barriere zerstört!"),ht(wn.position,5490943,10,.5,12)),d.barrier=null,wn.visible=!1,Ni.visible=!1):(Ni.position.set(d.barrier.x,2.95,d.barrier.z),Ni.rotation.y=d.barrier.yaw)),d.meteors.length!==0)for(let e=d.meteors.length-1;e>=0;e--){const t=d.meteors[e];t.t-=n;const i=En[t.warn];i&&(i.mesh.material.opacity=.2+.25*Math.abs(Math.sin(d.time*10))),t.t<=0&&(i&&(i.active=!1,i.mesh.visible=!1),ba(new C(t.x,0,t.z),7,210*ln(),16738877,16,!0),d.meteors.splice(e,1))}}function E0(){const n=ga[d.classKey];de("abilities").innerHTML=`<div class="ab" id="ab-primary"><span class="key">${n.primary.key}</span><span class="name">${n.primary.icon} ${n.primary.name}</span></div><div class="ab" id="ab-sec"><span class="key">${n.secondary.key}</span><span class="name">${n.secondary.icon} ${n.secondary.name}</span><div class="cd" id="cd-sec"></div></div><div class="ab" id="ab-tert"><span class="key">${n.tertiary.key}</span><span class="name">${n.tertiary.icon} ${n.tertiary.name}</span><div class="cd" id="cd-tert"></div></div><div class="ab" id="ab-move"><span class="key">${n.movement.key}</span><span class="name">${n.movement.icon} ${n.movement.name}</span><div class="cd" id="cd-move"></div></div><div class="ab ult" id="ab-ult"><span class="key">${n.ult.key}</span><span class="name" id="ult-name">${n.ult.icon} ${n.ult.name}</span><div class="cd" id="cd-ult"></div></div>`}function T0(){const n=d.player,e=d.stats;if(!e)return;de("hp-fill").style.width=`${on(n.hp/e.maxHp*100,0,100)}%`,de("hp-text").textContent=`${Math.ceil(n.hp)} / ${e.maxHp}`,de("xp-fill").style.width=`${on(d.xp/d.xpNeed*100,0,100)}%`,de("xp-text").textContent=`LV ${d.level} • ${d.xp}/${d.xpNeed} XP`,de("hud-enemies").textContent=et.length+d.spawnQueue.length;const t=(o,l,c)=>{const h=de(o);h&&(h.style.width=`${on(l*100,0,100)}%`)};t("cd-sec",1-d.secCD/e.secCDMax),t("cd-tert",1-d.novaCD/e.novaCDMax),t("cd-move",1-d.dashCD/e.dashCDMax),t("cd-ult",d.ult/100);const i=(o,l)=>{const c=de(o);c&&c.classList.toggle("ready",l)};i("ab-sec",d.secCD<=0),i("ab-tert",d.novaCD<=0),i("ab-move",d.dashCD<=0);const s=de("ab-ult"),r=de("ult-name");s&&s.classList.toggle("charged",d.ult>=100),r&&(r.textContent=d.ult>=100?"💢 ULT BEREIT!":`${ga[d.classKey].ult.icon} Ult ${Math.floor(d.ult)}%`);let a=`<span class="buff ${d.sprint?"gold":"off"}">🏃 SPRINT ${d.sprint?"AN":"AUS"}</span>`;d.visorT>0&&(a+=`<span class="buff gold">🎯 VISIER ${d.visorT.toFixed(0)}s</span>`),d.dragonT>0&&(a+=`<span class="buff gold">🐉 KLINGE ${d.dragonT.toFixed(0)}s</span>`),d.ley&&d.ley.t>0&&(a+=`<span class="buff">🔷 LEY ${d.ley.t.toFixed(0)}s</span>`),d.heal&&d.heal.t>0&&(a+=`<span class="buff">💚 HEILUNG ${d.heal.t.toFixed(0)}s</span>`),de("buffs").innerHTML=a}function uc(){const n=d.stats;n&&(de("stats-mini").innerHTML=`🔥 DMG <b>${Math.round(n.dmg)}</b> ×<b>${n.projectiles}</b> • ${n.fireRate.toFixed(1)}/s<br>🎯 Crit <b>${Math.round(n.crit*100)}%</b> • 🛡 <b>${Math.round(n.armor*100)}%</b><br>🏹 Pierce <b>${n.pierce}</b> • 🧛 <b>${Math.round(n.lifesteal*100)}%</b> • 💚 <b>${n.regen.toFixed(1)}</b>/s • 👟 <b>${n.speed.toFixed(1)}</b>`)}const b0=new Dm;function fc(){requestAnimationFrame(fc);const n=Math.min(b0.getDelta(),.05),e=tt.getObjectByName("deko-crystal");if(e&&(e.rotation.y+=n*.8,e.position.y=6.5+Math.sin(d.time*1.2)*.4),d.state==="playing"){d.time+=n;const t=d.player.pos,i=d.player.vel;if((!isFinite(t.x)||!isFinite(t.z)||!isFinite(i.x)||!isFinite(i.z))&&(t.set(0,0,8),i.set(0,0,0)),_0(n),d.spawnQueue.length>0)d.spawnTimer-=n,d.spawnTimer<=0&&(d.spawnTimer=Math.max(.25,.9-d.wave*.04),Qs(d.spawnQueue.shift(),d.wave)),d.waveState="spawning";else if(et.length===0)if(d.waveState!=="cleared"){d.waveState="cleared";const s=50+d.wave*25;d.score+=s,de("hud-score").textContent=d.score;const r=Math.round(d.stats.maxHp*.2);d.player.hp=Math.min(d.stats.maxHp,d.player.hp+r),qn(d.player.pos,`+${r} HP`,"heal"),Rt(`✔ Welle ${d.wave} geschafft! +${s}`),d.waveTimer=3}else d.waveTimer-=n,d.waveTimer<=0&&ec();v0(n),x0(n),S0(n),y0(n),M0(n),Yr(n),T0()}else if(d.state==="menu"){d.time+=n;const t=d.time*.12;je.position.set(Math.sin(t)*26,12,Math.cos(t)*26),je.lookAt(0,1,0),je.fov!==60&&(je.fov=60,je.updateProjectionMatrix()),Yr(n)}else Yr(n);Vi.render(tt,je)}de("hud-best").textContent=d.best;fc();window.__NEON={G:d,enemies:et,keys:dn,doSecondary:sc,doTertiary:rc,doMovement:ac,doUlt:oc,tryJump:ic,chooseUpgrade:Ea,startGame:ds,spawnEnemy:Qs};
