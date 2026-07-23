import React, { useEffect, useState, useRef, useCallback } from "react";
import { motion, AnimatePresence, useScroll, useInView } from "framer-motion";
import PixelTransition from "./components/PixelTransition";
import "./components/PixelTransition.css";
import PixelTrail from "./components/PixelTrail";
import "./components/PixelTrail.css";

/* =============================================================
   🎨 Pixel icons — all hand-drawn by me
   ============================================================= */
const PIXEL_ART = {
  star     :{c:"#ffd166",w:12,h:12,p:[2,0,3,0,1,1,2,1,3,1,4,1,0,2,1,2,2,2,3,2,4,2,5,2,0,3,1,3,2,3,3,3,4,3,5,3,1,4,2,4,3,4,4,4,2,5,3,5]},
  palette  :{c:"#3fe6ff",w:12,h:10,p:[1,0,2,0,3,0,4,0,5,0,6,0,0,1,2,1,4,1,5,1,7,1,0,2,7,2,0,3,7,3,1,4,2,4,3,4,4,4,5,4,6,4,3,5,4,5,3,6,4,6,2,7,3,7,4,7,5,7]},
  sparkle  :{c:"#ff3f9c",w:14,h:14,p:[5,2,7,2,4,3,5,3,6,3,7,3,8,3,2,4,3,4,4,4,5,4,6,4,7,4,8,4,9,4,10,4,1,5,2,5,3,5,4,5,5,5,6,5,7,5,8,5,9,5,10,5,11,5,0,6,1,6,2,6,3,6,4,6,5,6,6,6,7,6,8,6,9,6,10,6,11,6,12,6,1,7,2,7,3,7,4,7,5,7,6,7,7,7,8,7,9,7,10,7,11,7,2,8,3,8,4,8,5,8,6,8,7,8,8,8,9,8,10,8,4,9,5,9,6,9,7,9,8,9,5,10,7,10]},
  bolt     :{c:"#a29bfe",w:10,h:12,p:[3,0,4,0,3,1,4,1,2,2,3,2,4,2,5,2,1,3,2,3,3,3,4,3,5,3,0,4,1,4,2,4,3,4,4,4,1,5,2,5,3,5,4,5,5,5,1,6,2,6,3,6,4,6,2,7,3,7,4,7,2,8,3,8]},
  sword    :{c:"#ff6b6b",w:10,h:12,p:[4,0,3,1,4,1,5,1,3,2,4,2,5,2,3,3,4,3,5,3,4,4,2,5,4,5,6,5,1,6,3,6,5,6,7,6,0,7,2,7,4,7,6,7,8,7]},
  trophy   :{c:"#ffd166",w:12,h:12,p:[1,0,2,0,3,0,4,0,5,0,6,0,7,0,8,0,9,0,0,1,10,1,0,2,3,2,4,2,5,2,6,2,10,2,0,3,10,3,0,4,10,4,1,5,2,5,3,5,4,5,5,5,6,5,7,5,8,5,9,5,3,6,4,6,5,6,6,6,7,6,4,7,5,7,6,7,4,8,5,8,6,8]},
  check    :{c:"#4ade80",w:12,h:10,p:[7,0,6,1,7,1,5,2,7,2,4,3,7,3,3,4,7,4,2,5,6,5,7,5,1,6,5,6,0,7,4,7,0,8,1,8,2,8]},
  wrench   :{c:"#ff9a56",w:12,h:12,p:[5,0,6,0,4,1,5,1,6,1,7,1,4,2,5,2,6,2,7,2,5,3,6,3,5,4,6,4,4,5,5,5,6,5,7,5,3,6,4,6,5,6,6,6,7,6,8,6,2,7,3,7,4,7,5,7,6,7,7,7,8,7,9,7,1,8,2,8,3,8,4,8,5,8,6,8,7,8,8,8,0,9,1,9,2,9,3,9,4,9,5,9,6,9,0,10,1,10,2,10]},
  file     :{c:"#8489bd",w:10,h:12,p:[1,0,2,0,3,0,4,0,5,0,6,0,0,1,7,1,0,2,7,2,0,3,7,3,0,4,7,4,0,5,3,5,7,5,0,6,3,6,7,6,0,7,3,7,7,7,0,8,7,8,0,9,7,9,0,10,7,10,1,11,2,11,3,11,4,11,5,11,6,11]},
  eye      :{c:"#3fe6ff",w:14,h:10,p:[0,3,1,3,2,3,3,3,4,3,5,3,6,3,7,3,8,3,9,3,10,3,11,3,12,3,13,3,1,4,2,4,3,4,4,4,5,4,6,4,7,4,8,4,9,4,10,4,11,4,12,4,2,5,3,5,4,5,5,5,6,5,7,5,8,5,9,5,10,5,11,5,1,6,2,6,3,6,4,6,5,6,6,6,7,6,8,6,9,6,10,6,11,6,12,6,0,7,1,7,2,7,3,7,4,7,5,7,6,7,7,7,8,7,9,7,10,7,11,7,12,7,13,7]},
  pencil   :{c:"#ffd166",w:8,h:12,p:[3,0,2,1,3,1,4,1,2,2,3,2,4,2,1,3,2,3,3,3,4,3,5,3,1,4,2,4,3,4,4,4,5,4,0,5,1,5,2,5,3,5,4,5,5,5,6,5,0,6,1,6,2,6,3,6,4,6,5,6,6,6,0,7,1,7,2,7,3,7,4,7,5,7,6,7,0,8,1,8,2,8,6,8,1,9,5,9,1,10,5,10,2,11,3,11,4,11]},
  bulb     :{c:"#ffd166",w:10,h:14,p:[1,0,2,0,3,0,4,0,5,0,6,0,7,0,0,1,1,1,2,1,3,1,4,1,5,1,6,1,7,1,8,1,0,2,1,2,2,2,3,2,4,2,5,2,6,2,7,2,8,2,0,3,1,3,2,3,3,3,4,3,5,3,6,3,7,3,8,3,1,4,2,4,3,4,4,4,5,4,6,4,7,4,2,5,3,5,4,5,5,5,6,5,2,6,3,6,4,6,5,6,6,6,2,7,3,7,4,7,5,7,6,7,3,8,4,8,5,8,3,9,4,9,5,9,4,10,4,11]},
  reset    :{c:"#3fe6ff",w:12,h:12,p:[6,0,7,0,5,1,6,1,7,1,8,1,4,2,5,2,8,2,9,2,3,3,4,3,9,3,10,3,3,4,10,4,3,5,9,5,4,6,8,6,4,7,5,7,6,7,7,7,8,7,5,8,6,8,7,8,7,9,6,10,5,11]},
  seedling :{c:"#4ade80",w:10,h:12,p:[3,0,4,0,5,0,2,1,3,1,4,1,5,1,6,1,1,2,2,2,4,2,5,2,6,2,7,2,2,3,3,3,4,3,5,3,6,3,3,4,4,4,5,4,4,5,4,6,3,7,4,7,5,7,3,8,4,8,5,8,3,9,4,9,5,9,2,10,3,10,4,10,5,10,6,10]},
  search   :{c:"#8489bd",w:12,h:12,p:[2,0,3,0,4,0,5,0,1,1,2,1,3,1,4,1,5,1,6,1,0,2,1,2,2,2,3,2,4,2,5,2,6,2,7,2,0,3,1,3,2,3,3,3,4,3,5,3,6,3,7,3,0,4,1,4,2,4,3,4,4,4,5,4,6,4,7,4,1,5,2,5,3,5,4,5,5,5,6,5,2,6,3,6,4,6,5,6,3,7,4,7,5,8,6,8,5,9,6,9,7,10,8,10,7,11,8,11]},
  close    :{c:"#8489bd",w:10,h:10,p:[1,0,7,0,0,1,2,1,6,1,8,1,0,2,3,2,5,2,8,2,0,3,4,3,2,4,2,5,1,6,4,6,0,7,3,7,5,7,8,7,0,8,2,8,6,8,8,8,1,9,7,9]},
  play     :{c:"#3fe6ff",w:10,h:12,p:[3,0,2,1,3,1,1,2,2,2,3,2,0,3,1,3,2,3,3,3,0,4,1,4,2,4,3,4,0,5,1,5,2,5,3,5,0,6,1,6,2,6,3,6,1,7,2,7,3,7,2,8,3,8,3,9]},
  link     :{c:"#3fe6ff",w:12,h:10,p:[4,0,5,0,6,0,7,0,3,1,4,1,5,1,6,1,7,1,8,1,2,2,3,2,4,2,5,2,6,2,7,2,8,2,9,2,1,3,2,3,3,3,4,3,5,3,6,3,7,3,8,3,9,3,10,3,0,4,1,4,10,4,0,5,1,5,10,5,1,6,2,6,9,6,2,7,3,7,8,7,3,8,4,8,5,8,6,8,7,8,2,9,3,9,4,9,5,9,6,9,7,9,8,9]},
  diamond  :{c:"#3fe6ff",w:10,h:10,p:[4,0,5,0,3,1,4,1,5,1,6,1,2,2,3,2,4,2,5,2,6,2,7,2,1,3,2,3,3,3,4,3,5,3,6,3,7,3,8,3,0,4,1,4,2,4,3,4,4,4,5,4,6,4,7,4,8,4,9,4,0,5,1,5,2,5,3,5,4,5,5,5,6,5,7,5,8,5,9,5,1,6,2,6,3,6,4,6,5,6,6,6,7,6,8,6,2,7,3,7,4,7,5,7,6,7,7,7,3,8,4,8,5,8,6,8,4,9,5,9]},
  flag     :{c:"#ff3f9c",w:10,h:12,p:[1,0,1,1,2,1,3,1,1,2,2,2,3,2,4,2,1,3,2,3,4,3,1,4,2,4,3,4,1,5,2,5,3,5,4,5,5,5,1,6,2,6,3,6,4,6,5,6,6,6,1,7,1,8,1,9,1,10,1,11]},
  note     :{c:"#ffd166",w:10,h:12,p:[2,0,3,0,4,0,1,1,2,1,3,1,4,1,5,1,0,2,1,2,2,2,3,2,4,2,5,2,6,2,0,3,1,3,2,3,3,3,5,3,0,4,1,4,2,4,3,4,5,4,0,5,1,5,2,5,3,5,4,5,1,6,2,6,3,6,4,6,2,7,3,7,2,8,3,8,2,9,3,9]},
  mountain :{c:"#4ade80",w:16,h:12,p:[0,9,1,8,9,10,10,9,2,7,3,6,8,8,9,7,10,8,4,5,5,4,6,5,7,6,8,7,3,5,7,5,2,6,8,6,0,10,1,9,2,8,3,7,4,6,5,5,6,6,7,7,8,8,9,9,10,10,11,9,12,8,13,7,14,6,15,5,11,8,12,7,13,6,14,5,15,4,11,9,12,8,13,7,14,6,15,5,14,4,15,3]},
  cloud    :{c:"#8489bd",w:16,h:10,p:[2,3,3,3,4,3,5,3,6,3,1,4,2,4,3,4,4,4,5,4,6,4,7,4,0,5,1,5,2,5,3,5,4,5,5,5,6,5,7,5,8,5,1,6,2,6,3,6,4,6,5,6,6,6,7,6,2,7,3,7,4,7,5,7,6,7,10,4,11,4,12,4,13,4,9,5,10,5,11,5,12,5,13,5,14,5,10,6,11,6,12,6,13,6,11,7,12,7]},
  expand   :{c:"#3fe6ff",w:10,h:10,p:[0,0,1,0,2,0,0,1,0,2,7,0,8,0,9,0,9,1,9,2,0,7,0,8,0,9,1,9,2,9,7,9,8,9,9,9,9,8,9,7]},
  compass  :{c:"#3fe6ff",w:12,h:12,p:[5,0,6,0,4,1,5,1,6,1,7,1,3,2,7,2,2,3,3,3,7,3,8,3,1,4,2,4,3,4,4,4,5,4,6,4,7,4,8,4,9,4,0,5,1,5,9,5,10,5,0,6,1,6,9,6,10,6,1,7,2,7,8,7,9,7,2,8,3,8,7,8,8,8,3,9,4,9,5,9,6,9,7,9,4,10,5,10,6,10]},
  clock    :{c:"#ffd166",w:12,h:12,p:[5,0,6,0,4,1,5,1,6,1,7,1,3,2,7,2,2,3,3,3,7,3,8,3,1,4,2,4,8,4,9,4,0,5,1,5,5,5,9,5,10,5,0,6,1,6,5,6,9,6,10,6,1,7,2,7,5,7,8,7,9,7,2,8,3,8,7,8,8,8,3,9,4,9,5,9,6,9,7,9,4,10,5,10,6,10]},
};

const PS = 2;
function PxIcon({name,size=18,color}) {
  const art=PIXEL_ART[name]; if(!art) return null;
  const vw=art.w*PS,vh=art.h*PS,c=color||art.c;
  const rects=[];
  for(let i=0;i<art.p.length;i+=2) rects.push(<rect key={i/2} x={art.p[i]*PS} y={art.p[i+1]*PS} width={PS} height={PS} fill={c} shapeRendering="crispEdges" />);
  return <svg width={size} height={size} viewBox={`0 0 ${vw} ${vh}`} style={{display:'inline-block',verticalAlign:'middle',flexShrink:0}} aria-hidden="true">{rects}</svg>;
}

/* =============================================================
   📦 Extra icons (GitHub, Mail)
   ============================================================= */
const iconProps = (s,c) => ({width:s,height:s,viewBox:"0 0 24 24",fill:"none",stroke:c,strokeWidth:1.5,strokeLinecap:"round",strokeLinejoin:"round"});
function IconGithub({s=18,c="currentColor"}){return <svg {...iconProps(s,c)}><path d="M9 19c-4 1.2-4-2.1-5.5-2.5M17 22v-3.2c0-.9-.3-1.5-.6-1.8 2.1-.2 4.3-1 4.3-4.7 0-1-.4-1.9-1-2.6.1-.3.4-1.3-.1-2.7 0 0-.9-.3-2.9 1a10 10 0 00-5.4 0c-2-1.3-2.9-1-2.9-1-.5 1.4-.2 2.4-.1 2.7-.6.7-1 1.6-1 2.6 0 3.7 2.2 4.5 4.3 4.7-.3.3-.5.7-.6 1.4V22"/></svg>}
function IconMail({s=18,c="currentColor"}){return <svg {...iconProps(s,c)}><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3.5 6.5L12 13l8.5-6.5"/></svg>}

/* =============================================================
   🌌 Stars, mountains & clouds on canvas
   ============================================================= */
function PixelBackground() {
  const ref=useRef(null);
  useEffect(()=>{
    const canvas=ref.current; if(!canvas) return;
    const ctx=canvas.getContext('2d'); let anim,w,h,stars=[],clouds=[],offset=0;
    function resize(){w=canvas.width=window.innerWidth; h=canvas.height=window.innerHeight;}
    resize();
    function init(){
      stars=[]; for(let i=0;i<80;i++) stars.push({x:Math.random()*w,y:Math.random()*h*0.4,s:Math.random()*2+1,a:Math.random()*0.7+0.3,sp:Math.random()*0.3+0.05,phase:Math.random()*Math.PI*2});
      clouds=[]; for(let i=0;i<4;i++) clouds.push({x:Math.random()*w,y:40+Math.random()*(h*0.25),w2:60+Math.random()*120,h2:14+Math.random()*8,sp:0.15+Math.random()*0.3});
    }
    init();
    function drawMountain(ox,oy,mw,mh,color){ctx.fillStyle=color;ctx.beginPath();ctx.moveTo(ox,oy+mh);ctx.lineTo(ox+mw/2,oy);ctx.lineTo(ox+mw,oy+mh);ctx.closePath();ctx.fill();}
    function animate(time){
      ctx.clearRect(0,0,w,h);
      for(const s of stars){const tw=0.5+0.5*Math.sin(time*0.002+s.phase);ctx.globalAlpha=s.a*tw;ctx.fillStyle='#eef0ff';ctx.fillRect(Math.floor(s.x),Math.floor(s.y),s.s,s.s);s.y+=s.sp*0.1;if(s.y>h*0.4){s.y=0;s.x=Math.random()*w;}}
      ctx.globalAlpha=1;
      const mc=['#0f1535','#151b45','#1c2355']; for(let i=0;i<3;i++){const mw=w*0.8,mh=50+i*20,mx=(w-mw)/2+Math.sin(offset*0.005+i)*20;drawMountain(mx,h-80-i*15,mw,mh,mc[i]);drawMountain(mx-mw*0.3,h-80-i*15,mw*0.5,mh*0.6,mc[i]);drawMountain(mx+mw*0.5,h-80-i*15,mw*0.6,mh*0.7,mc[i]);}
      for(const c of clouds){ctx.fillStyle='rgba(132,137,189,0.12)';const cx=Math.floor(c.x),cy=Math.floor(c.y);const cw=c.w2,ch=c.h2;ctx.fillRect(cx-cw/2,cy-ch/2,cw,ch);ctx.fillRect(cx-cw/2+10,cy-ch/2-4,cw-20,ch-2);ctx.fillRect(cx-cw/2+20,cy-ch/2-8,cw-40,ch-4);c.x+=c.sp;if(c.x>w+cw)c.x=-cw;}
      ctx.fillStyle='#070911';ctx.fillRect(0,h-16,w,16);ctx.fillStyle='rgba(63,230,255,0.03)';ctx.fillRect(0,h-16,w,1);
      offset++; anim=requestAnimationFrame(animate);
    }
    anim=requestAnimationFrame(animate);
    const onResize=()=>{resize();init();};
    window.addEventListener('resize',onResize);
    return ()=>{cancelAnimationFrame(anim);window.removeEventListener('resize',onResize);};
  },[]);
  return <canvas ref={ref} style={{position:'fixed',inset:0,zIndex:0,pointerEvents:'none',opacity:0.3}} aria-hidden="true" />;
}

/* =============================================================
   🌧️ Falling pixel rain effect
   ============================================================= */
function PixelRain() {
  const ref=useRef(null);
  useEffect(()=>{
    const c=ref.current; if(!c) return;
    const ctx=c.getContext("2d"); let a,p=[];
    function rs(){c.width=window.innerWidth;c.height=window.innerHeight;}
    rs();
    function init(){
      p=[]; const ct=Math.floor((c.width*c.height)/8000); const cl=["#3fe6ff","#ff3f9c","#ffd166","#a29bfe","#fff","#ff6b6b"];
      for(let j=0;j<ct;j++)p.push({x:Math.random()*c.width,y:Math.random()*c.height,s:Math.random()*2+0.5,sy:Math.random()*0.6+0.05,sx:(Math.random()-0.5)*0.3,cl:cl[Math.floor(Math.random()*cl.length)],op:Math.random()*0.4+0.1});
    }
    init();
    function anim(t){
      ctx.clearRect(0,0,c.width,c.height);
      for(const q of p){q.y+=q.sy;q.x+=q.sx;if(q.y>c.height){q.y=-q.s;q.x=Math.random()*c.width;}ctx.globalAlpha=q.op;ctx.fillStyle=q.cl;ctx.fillRect(q.x,q.y,q.s,q.s);}
      ctx.globalAlpha=1;a=requestAnimationFrame(anim);
    }
    a=requestAnimationFrame(anim);
    const w=()=>{rs();init();}; window.addEventListener("resize",w);
    return()=>{cancelAnimationFrame(a);window.removeEventListener("resize",w);};
  },[]);
  return <canvas ref={ref} style={{position:"fixed",inset:0,zIndex:1,pointerEvents:"none",opacity:0.15}} aria-hidden="true" />;
}

/* =============================================================
   🕐 Live clock — updates every second
   ============================================================= */
function RealtimeClock({className=""}) {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);
  return (
    <div className={`clock-display ${className}`}>
      <PxIcon name="clock" size={10} color="var(--cyan)" />
      <span>{time.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })}</span>
    </div>
  );
}

/* =============================================================
   🎬 Intro splash — name starts center then slides left
   ============================================================= */
function IntroOverlay({onDone}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="intro-overlay"
    >
      <motion.div
        layoutId="main-title"
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="intro-title font-display"
      >
        <span className="glitch" data-text="HOUTAROU">HOUTAROU</span>
        <span className="glitch accent-glow" data-text="DES">DES</span>
      </motion.div>
    </motion.div>
  );
}

/* =============================================================
   📌 Sidebar — shows up when you scroll down
   ============================================================= */
function ScrollSidebar({scrolled, darkMode, setDarkMode, activeSection, scrolledDeep}) {
  const navItems = [
    {id:"hero", label:"Home", icon:"star"},
    {id:"projects", label:"Projects", icon:"note"},
    {id:"skills", label:"Skills", icon:"wrench"},
    {id:"contact", label:"Contact", icon:"link"},
  ];

  return (
    <motion.aside
      className={`scroll-sidebar ${scrolledDeep ? 'visible' : ''}`}
      initial={{ opacity: 0, x: -80 }}
      animate={scrolledDeep ? { opacity: 1, x: 0 } : { opacity: 0, x: -80 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="sidebar-inner">
        {/* Mini logo */}
        <div className="sidebar-logo">
          <PxIcon name="compass" size={16} color="var(--cyan)" />
        </div>

        {/* Nav */}
        <nav className="sidebar-nav">
          {navItems.map(item => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`sidebar-nav-item ${activeSection === item.id ? 'active' : ''}`}
              title={item.label}
            >
              <PxIcon name={item.icon} size={14} color={activeSection === item.id ? "var(--cyan)" : undefined} />
              <span className="sidebar-nav-label">{item.label}</span>
            </a>
          ))}
        </nav>

        {/* Bottom section */}
        <div className="sidebar-bottom">
          <RealtimeClock className="sidebar-clock" />
          
          <button
            className="sidebar-theme-btn"
            onClick={() => setDarkMode(!darkMode)}
            title={darkMode ? "Light Mode" : "Dark Mode"}
          >
            <motion.svg
              width="16" height="16" viewBox="0 0 24 24"
              fill="none" stroke="currentColor" strokeWidth="2"
              animate={{ rotate: darkMode ? 0 : 180 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              {darkMode
                ? <><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></>
                : <><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></>}
            </motion.svg>
          </button>
        </div>
      </div>
    </motion.aside>
  );
}

/* =============================================================
   📊 Progress bar at the top
   ============================================================= */
function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  return (
    <motion.div
      className="scroll-progress-bar"
      style={{ scaleX: scrollYProgress }}
    />
  );
}

/* =============================================================
   📁 Projects, skills & filter data
   ============================================================= */
const projects = [
  {id:1,title:"Motion Website",desc:"A front-end inspiration hub for exploring layout and animation ideas.",tags:["HTML","CSS","JS"],demo:"https://motion-website-des.vercel.app",code:"https://github.com/houtaroudes/motion-website",type:"Full Stack",year:"2025"},
  {id:2,title:"PixelPodWeb",desc:"A photobooth web app with PHP + MySQL backend — built solo as a school project.",tags:["PHP","MySQL","CSS","JS"],demo:"https://pixelpodweb.vercel.app",code:"https://github.com/houtaroudes/PixelPodWeb",type:"Full Stack",year:"2025"},
  {id:3,title:"Houtarou Cafe",desc:"A concept cafe site with minimalist design — ordering flow and reservation system.",tags:["HTML","CSS","JS"],code:"https://github.com/houtaroudes/houtarou-cafe",type:"Frontend",year:"2026"},
  {id:4,title:"Learning WebDev Hub",desc:"My gamified learning hub with 26+ exercises, live previews, and code challenges!",tags:["React","Vite","HTML","CSS"],demo:"https://random-learning-webdev-site.vercel.app",code:"https://github.com/houtaroudes/random-learning-webdev-site",type:"Full Stack",year:"2026",featured:true},
];
const skillBadges = [
  {name:"HTML5",icon:"diamond",color:"#e34f26"},{name:"CSS3",icon:"diamond",color:"#1572b6"},{name:"JS",icon:"diamond",color:"#f7df1e"},{name:"React",icon:"diamond",color:"#61dafb"},{name:"PHP",icon:"diamond",color:"#777bb3"},{name:"MySQL",icon:"diamond",color:"#4479a1"},{name:"Git",icon:"diamond",color:"#f05032"},{name:"Vite",icon:"diamond",color:"#a29bfe"},
];
const categories = [
  {id:"all",label:"All Projects",icon:"star",color:"var(--gold)"},{id:"fullstack",label:"Full Stack",icon:"bolt",color:"var(--cyan)"},{id:"frontend",label:"Frontend",icon:"palette",color:"var(--magenta)"},
];

/* =============================================================
   🪝 Custom React hooks
   ============================================================= */
function useReveal(t=0.1, deps=[]){const r=useRef(null);const[v,s]=useState(false);useEffect(()=>{const e=r.current;if(!e)return;const o=new IntersectionObserver(([n])=>{if(n.isIntersecting){s(true);o.unobserve(e);}},{threshold:t});o.observe(e);return()=>o.disconnect();},[t,...deps]);return[r,v];}
function RS({children,className="",variant="up",...p}){const[r,v]=useReveal(0.08);return <section ref={r} className={`reveal-section reveal-${variant} ${v?"revealed":""} ${className}`} {...p}>{children}</section>;}
function useActiveSection(ids){const[a,set]=useState(ids[0]||"");useEffect(()=>{const o=new IntersectionObserver((e)=>{for(const n of e){if(n.isIntersecting){set(n.target.id);break;}}},{rootMargin:"-40% 0px -55% 0px",threshold:0});ids.forEach(id=>{const el=document.getElementById(id);if(el)o.observe(el);});return()=>o.disconnect();},[ids]);return a;}
/* =============================================================
   🔢 Animated number counter
   ============================================================= */
function CountUpValue({target,suffix='',duration=1500,delay=300}){
  const[c,set]=useState(0);const[r,setR]=useState(false);const ref=useRef(null);
  useEffect(()=>{const e=ref.current;if(!e)return;const o=new IntersectionObserver(([n])=>{if(n.isIntersecting){setR(true);o.unobserve(e);}},{threshold:0.3});o.observe(e);return()=>o.disconnect();},[]);
  useEffect(()=>{if(!r)return;let t,aid;const a=(time)=>{if(!t)t=time;const e=time-t,p=Math.min(e/duration,1),v=1-Math.pow(1-p,3);set(Math.floor(v*target));if(p<1)aid=requestAnimationFrame(a);};const s=setTimeout(()=>{aid=requestAnimationFrame(a);},delay);return()=>{clearTimeout(s);if(aid)cancelAnimationFrame(aid);};},[r,target,duration,delay]);
  return <span ref={ref}>{c}{suffix}</span>;
}

/* =============================================================
   🪟 Project detail popup modal
   ============================================================= */
function ProjectModal({project,onClose}){
  const closeRef=useRef(onClose);closeRef.current=onClose;
  useEffect(()=>{const h=e=>{if(e.key==='Escape')closeRef.current();};window.addEventListener('keydown',h);return()=>window.removeEventListener('keydown',h);},[]);
  useEffect(()=>{document.body.style.overflow='hidden';return()=>{document.body.style.overflow='';};},[]);
  if(!project)return null;
  return <motion.div className="modal-overlay" onClick={onClose}
    initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration:0.2}}
  >
    <motion.div className="modal-content" onClick={e=>e.stopPropagation()}
      initial={{opacity:0,scale:0.9,y:20}} animate={{opacity:1,scale:1,y:0}}
      transition={{duration:0.35,ease:[0.34,1.56,0.64,1]}}
    >
      <button className="modal-close-btn" onClick={onClose} aria-label="Close modal"><PxIcon name="close" size={14} /></button>
      <div className="modal-header">
        <span className="modal-year">{project.year}</span>
        <span className="card-badge" style={{background:project.featured?"var(--gold)":"var(--cyan)",color:"var(--void)"}}>{project.type}</span>
      </div>
      <h3 className="modal-title">{project.title}</h3>
      {project.featured && <div className="modal-featured-badge"><PxIcon name="trophy" size={10} color="var(--gold)" /> MAIN QUEST</div>}
      <p className="modal-desc">{project.desc}</p>
      <div className="modal-section">
        <h4 className="modal-section-title">Technologies</h4>
        <div className="modal-tags">{project.tags.map(t=><span className="tag" key={t}>{t}</span>)}</div>
      </div>
      <div className="modal-actions">
        {project.demo&&<a href={project.demo} target="_blank" rel="noopener" className="btn primary"><PxIcon name="play" size={12} color="var(--void)" /> Live Demo</a>}
        <a href={project.code} target="_blank" rel="noopener" className="btn"><PxIcon name="file" size={12} /> View Code</a>
      </div>
    </motion.div>
  </motion.div>;
}

/* =============================================================
   ➕ Pixel-art section divider
   ============================================================= */
function PixelDivider(){return <div className="pixel-divider" aria-hidden="true"><div className="divider-glow-track"><span className="divider-glow-dot" /></div><span>+</span><span>+</span><span>+</span><span>+</span><span>+</span></div>;}

/* =============================================================
   ⬆️ Floating back-to-top button
   ============================================================= */
function ScrollToTop(){const[v,s]=useState(false);useEffect(()=>{const h=()=>s(window.scrollY>400);window.addEventListener('scroll',h,{passive:true});return()=>window.removeEventListener('scroll',h);},[]);return <motion.button className={`scroll-top-btn ${v?'visible':''}`} onClick={()=>window.scrollTo({top:0,behavior:'smooth'})} aria-label="Scroll to top"
  animate={{scale:v?1:0,opacity:v?1:0}} transition={{duration:0.3,ease:"backOut"}}
><PxIcon name="star" size={16} /></motion.button>;}

/* =============================================================
   🔁 Multi-stage typewriter — cycles through identities
   ============================================================= */
const PHRASES = [
  "I am a Full-Stack Developer",
  "I'm a college student with a passion for coding",
  "I build pixel-perfect web experiences",
  "Turning ideas into interactive realities",
];
function CycleTypewriter() {
  const [text, setText] = useState("");
  const [idx, setIdx] = useState(0);
  const [char, setChar] = useState(0);
  const [dir, setDir] = useState(1); // 1 = typing, -1 = deleting

  useEffect(() => {
    const current = PHRASES[idx];
    const speed = dir === 1 ? 45 : 20;
    const pause = dir === 1 && char === current.length ? 2500 :
                  dir === -1 && char === 0 ? 600 : 0;

    if (pause > 0) {
      const t = setTimeout(() => {
        if (dir === -1) {
          setIdx((idx + 1) % PHRASES.length);
          setChar(0);
        }
        setDir(d => d === 1 ? -1 : 1);
      }, pause);
      return () => clearTimeout(t);
    }

    const t = setTimeout(() => {
      setChar(c => c + dir);
      setText(current.slice(0, char + dir));
    }, speed);
    return () => clearTimeout(t);
  }, [idx, char, dir]);

  return <>{text}</>;
}

/* =============================================================
   👀 Scroll-triggered reveal animation
   ============================================================= */
function AttentionGrabber({children, className="", delay=0}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  return (
    <div ref={ref} className={`attention-grabber ${className}`}>
      <motion.div
        initial={{ opacity: 0, y: 60, scale: 0.9 }}
        animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
        transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.div>
    </div>
  );
}

/* =============================================================
   🏠 Main Portfolio component — everything comes together
   ============================================================= */
export default function Portfolio() {
  const[activeCat,setActiveCat]=useState("all");
  const[scrolled,setScrolled]=useState(false);
  const[scrolledDeep,setScrolledDeep]=useState(false);
  const[hovered,setHovered]=useState(null);
  const[darkMode,setDarkMode]=useState(()=>localStorage.getItem("theme")!=="light");
  const[modalProject,setModalProject]=useState(null);
  const[introDone,setIntroDone]=useState(()=>{
    try { return localStorage.getItem("introPlayed") === "true"; } catch { return false; }
  });
  const[showContent,setShowContent]=useState(introDone);
  const activeSection=useActiveSection(["hero","projects","skills","contact"]);

  useEffect(()=>{
    document.documentElement.setAttribute("data-theme",darkMode?"dark":"light");
    localStorage.setItem("theme",darkMode?"dark":"light");
    // Dispatch custom event for smooth theme transitions
    window.dispatchEvent(new CustomEvent('themechange', {detail: {theme: darkMode ? 'dark' : 'light'}}));
  },[darkMode]);

  useEffect(()=>{
    const o=()=>{
      const y=window.scrollY;
      setScrolled(y>50);
      setScrolledDeep(y>200);
    };
    window.addEventListener("scroll",o,{passive:true});
    return()=>window.removeEventListener("scroll",o);
  },[]);

  // Intro animation sequence
  useEffect(()=>{
    if(introDone) return;
    const t1 = setTimeout(() => {
      setShowContent(true);
      const t2 = setTimeout(() => {
        setIntroDone(true);
        try { localStorage.setItem("introPlayed", "true"); } catch {}
      }, 1000);
      return () => clearTimeout(t2);
    }, 1200);
    return () => clearTimeout(t1);
  },[introDone]);

  const filtered=activeCat==="all"?projects:projects.filter(p=>p.type?.toLowerCase().replace(" ","")===activeCat);
  const feat=projects.find(p=>p.featured);

  const handleThemeToggle = useCallback(() => {
    setDarkMode(prev => !prev);
  }, []);

  return (<>
    <style>{CSS}</style>
    <div id="app">
      <PixelBackground/>
      <PixelRain/>
      <div className="vignette"/>
      <div className="scanlines"/>
      <ScrollProgress />

      {/* 🖱️ Pixel mouse trail */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 1, pointerEvents: 'none' }}>
        <PixelTrail
          gridSize={50}
          trailSize={0.05}
          maxAge={200}
          interpolate={5}
          color="#3fe6ff"
        />
      </div>

      {/* 🎬 Intro splash screen */}
      <AnimatePresence>
        {!introDone && (
          <IntroOverlay onDone={() => {}} />
        )}
      </AnimatePresence>

      {/* 📌 Sidebar that fades in on scroll */}
      <ScrollSidebar
        scrolled={scrolled}
        scrolledDeep={scrolledDeep}
        darkMode={darkMode}
        setDarkMode={handleThemeToggle}
        activeSection={activeSection}
      />

      {/* NAV */}
      <motion.nav
        className={scrolled ? "scrolled" : ""}
        initial={{ y: introDone ? 0 : -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, delay: introDone ? 0 : 1.4, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="nav-inner">
          <a href="#" className="logo">
            <PxIcon name="star" size={20} />
            <span className="logo-text">Houtarou<span className="accent">Des</span></span>
          </a>
          <div className="nav-links">
            {[
              {id:"projects",label:"Projects"},
              {id:"skills",label:"Skills"},
              {id:"contact",label:"Contact"},
            ].map(n=><a key={n.id} href={`#${n.id}`} className={activeSection===n.id?"nav-active":""}>{n.label}</a>)}
          </div>
          <div className="nav-right">
            <RealtimeClock className="nav-clock" />
            <motion.button
              className="theme-toggle-btn"
              onClick={()=>setDarkMode(!darkMode)}
              title={darkMode?"Light Mode":"Dark Mode"}
              whileHover={{ rotate: 15 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{display:'block'}}>
                {darkMode
                  ? <><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></>
                  : <><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></>}
              </svg>
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* HERO */}
      <header className="hero" id="hero">
        <div className="hero-scan" aria-hidden="true"/>
        <div className="hero-content">
          <>
            {/* Left side — Name flies here from center after intro */}
            <motion.div className="hero-left"
              layoutId="main-title"
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              style={{ opacity: showContent ? 1 : 0 }}
            >
              <h1 className="hero-name">
                HOUTAROU<span className="gradient-accent">DES</span>
              </h1>
            </motion.div>

            {/* Right side — About info + typing */}
            <motion.div className="hero-right"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: showContent ? 1 : 0, x: showContent ? 0 : 40 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              {showContent && (
                <>
                  <div className="hero-badge"><PxIcon name="star" size={12} /> Player File — Slot 01</div>

                  <p className="hero-tagline"><CycleTypewriter /><span className="cursor-blink">|</span></p>

                  <div className="hero-stats">
                    <div className="hero-stat"><PxIcon name="bolt" size={20} /><div><div className="hero-stat-value"><CountUpValue target={4} duration={1600} delay={400} /></div><div className="hero-stat-label">Projects</div></div></div>
                    <div className="hero-stat"><PxIcon name="diamond" size={20} color="#ffd166" /><div><div className="hero-stat-value"><CountUpValue target={8} duration={1600} delay={500} /></div><div className="hero-stat-label">Technologies</div></div></div>
                    <div className="hero-stat"><PxIcon name="star" size={20} /><div><div className="hero-stat-value"><CountUpValue target={26} suffix="+" duration={1800} delay={600} /></div><div className="hero-stat-label">Exercises</div></div></div>
                    <div className="hero-stat"><PxIcon name="diamond" size={20} color="#3fe6ff" /><div><div className="hero-stat-value">Open</div><div className="hero-stat-label">To Work</div></div></div>
                  </div>

                  <div className="hero-actions">
                    <a href="#projects" className="btn primary">View Projects</a>
                    <a href="https://github.com/houtaroudes" target="_blank" rel="noopener" className="btn"><IconGithub s={15}/> GitHub</a>
                  </div>
                </>
              )}
            </motion.div>
          </>
        </div>
        <motion.div
          className="scroll-hint"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          aria-hidden="true"
        >
          <motion.span
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            SCROLL
          </motion.span>
        </motion.div>
      </header>

      {/* XP BAR */}
      <div className="xp-bar">
        <div className="xp-inner">
          <div className="xp-info"><span className="xp-level">Lv. 3</span><span className="xp-label">Full-Stack Developer</span></div>
          <div className="xp-track"><motion.div className="xp-fill" initial={{width:0}} whileInView={{width:"65%"}} viewport={{once:true}} transition={{duration:1.5,ease:"easeOut"}}/><span className="xp-text">4 / 6 projects shipped</span></div>
        </div>
      </div>

      <PixelDivider />

      {/* PROJECTS */}
      <RS className="section" id="projects" variant="up">
        <div className="section-head">
          <div className="eyebrow"><PxIcon name="note" size={14} /> Cartridge Library</div>
          <h2 className="section-title">Project <span className="accent">Catalog</span></h2>
          <p className="section-desc">Real builds from my GitHub — click to see the code or play a live demo.</p>
        </div>
        <div className="filter-bar">
          {categories.map(c=><button key={c.id} className={`filter-btn ${activeCat===c.id?"active":""}`} onClick={()=>setActiveCat(c.id)} style={activeCat===c.id?{borderColor:c.color,color:c.color}:{}}><PxIcon name={c.icon} size={14} /><span>{c.label}</span></button>)}
        </div>
        <motion.div className="project-grid stagger-children" layout>
          {filtered.map((p,i)=>(
            <motion.article
              layout
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className={`project-card ${p.featured?"featured":""}`} key={p.id}
              onMouseEnter={()=>setHovered(p.id)} onMouseLeave={()=>setHovered(null)}
            >
              <div className="card-glow" style={{opacity:hovered===p.id?1:0,
                background:`radial-gradient(400px circle at 50% 50%,${p.featured?"rgba(255,209,102,0.08)":"rgba(63,230,255,0.06)"},transparent)`}}/>
              <div className="card-top">
                <span className="card-year">{p.year}</span>
                <span className="card-badge" style={{background:p.featured?"var(--gold)":"var(--cyan)",color:"var(--void)"}}>{p.type}</span>
              </div>
              <h3 className="card-title">{p.title}</h3>
              <p className="card-desc">{p.desc}</p>
              <div className="card-tags">{p.tags.map(t=><span className="tag" key={t}>{t}</span>)}</div>
              <div className="card-actions">
                <button className="card-link details-link" onClick={()=>setModalProject(p)}><PxIcon name="expand" size={12} /> Details</button>
                {p.demo&&<a href={p.demo} target="_blank" rel="noopener" className="card-link demo-link"><PxIcon name="play" size={12} color="#ffd166" /> Live Demo</a>}
                <a href={p.code} target="_blank" rel="noopener" className="card-link"><PxIcon name="file" size={12} /> View Code</a>
              </div>
            </motion.article>
          ))}
        </motion.div>
        {filtered.length===0&&<div className="empty-state"><PxIcon name="search" size={24} /><p>No projects in this category yet.</p></div>}
      </RS>

      <PixelDivider />

      {/* SKILLS */}
      <RS className="section" id="skills" variant="scale">
        <div className="section-head"><div className="eyebrow"><PxIcon name="wrench" size={14} /> Equipment Loadout</div><h2 className="section-title">Skills & <span className="accent">Tools</span></h2><p className="section-desc">Technologies I use to build stuff.</p></div>
        <div className="skills-grid stagger-children">{skillBadges.map((s,i)=><motion.div
          className="skill-badge" key={s.name}
          whileHover={{ scale: 1.1, y: -4 }}
          transition={{ type: "spring", stiffness: 300 }}
          style={{"--badge-color":s.color}}
        ><PxIcon name="diamond" size={14} color={s.color} /><span className="skill-name">{s.name}</span></motion.div>)}</div>
      </RS>

      <PixelDivider />

      {/* FEATURED */}
      {feat && (
        <RS className="section" variant="scale">
          <PixelTransition
            firstContent={
              <div className="featured-card">
                <div className="featured-glow"/>
                <div className="featured-badge"><PxIcon name="trophy" size={10} /> MAIN QUEST <PxIcon name="trophy" size={10} /></div>
                <h3 className="featured-title">{feat.title}</h3>
                <p className="featured-desc">{feat.desc}</p>
                <div className="featured-tags">{feat.tags.map(t=><span className="tag featured-tag" key={t}>{t}</span>)}</div>
                <div className="featured-actions">
                  <a href={feat.demo} target="_blank" rel="noopener" className="btn primary"><PxIcon name="play" size={12} /> Explore the Hub</a>
                  <a href={feat.code} target="_blank" rel="noopener" className="btn"><PxIcon name="file" size={12} /> View Code</a>
                </div>
              </div>
            }
            secondContent={
              <div className="featured-card" style={{display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:'16px', padding:'32px', background:'linear-gradient(160deg, rgba(255,209,102,0.12), rgba(255,209,102,0.04))'}}>
                <div className="featured-badge"><PxIcon name="trophy" size={10} color="var(--gold)" /> PIXEL OVERRIDE</div>
                <p style={{color:'var(--dim)', fontSize:'0.85rem', fontFamily:'var(--font-mono)', maxWidth:'360px', textAlign:'center'}}>Hover back or click to return</p>
              </div>
            }
            gridSize={10}
            pixelColor="var(--gold)"
            animationStepDuration={0.5}
            aspectRatio="30%"
            className="featured-pixel-card"
            style={{ width: '100%', maxWidth: '100%', border: '1px solid rgba(255,209,102,0.25)', borderRadius: '20px', overflow: 'hidden', minHeight: '340px' }}
          />
        </RS>
      )}

      <PixelDivider />

      {/* CONTACT */}
      <RS className="section" id="contact" variant="right">
        <div className="contact-card">
          <div className="eyebrow" style={{textAlign:"center"}}><PxIcon name="link" size={14} /> Multiplayer Lobby</div>
          <h2 className="section-title" style={{textAlign:"center"}}>Let's Build Something <span className="accent">Together</span></h2>
          <p className="section-desc" style={{textAlign:"center",marginBottom:24}}>Open for freelance gigs, school projects, or just talking shop about pixel art and web dev.</p>
          <div className="hero-actions" style={{justifyContent:"center"}}>
            <a href="https://github.com/houtaroudes" target="_blank" rel="noopener" className="btn primary"><IconGithub s={15}/> GitHub Profile</a>
            <a href="mailto:houtaroudes@gmail.com" className="btn"><IconMail s={15}/> Send Email</a>
          </div>
        </div>
      </RS>

      {/* FOOTER */}
      <footer>
        <div className="footer-inner">
          <div className="pixel-footer-art" aria-hidden="true"><PxIcon name="star" size={10} /><PxIcon name="star" size={10} /><PxIcon name="star" size={10} /></div>
          <p className="footer-credits"><strong>HoutarouDes</strong> — Full-Stack Developer &copy; 2026</p>
          <p className="footer-sub">4 projects &middot; 26+ exercises &middot; infinite curiosity</p>
        </div>
      </footer>
    </div>
    <AnimatePresence>
      {modalProject && <ProjectModal project={modalProject} onClose={()=>setModalProject(null)} />}
    </AnimatePresence>
    <ScrollToTop />
  </>);
}

/* =============================================================
   🎨 All styles in one place
   ============================================================= */
const CSS = `
#app{
--void:#070911; --panel:#10142e; --panel-2:#171c40; --border:rgba(80,225,255,0.2);
--cyan:#3fe6ff; --cyan-dim:rgba(63,230,255,0.3); --magenta:#ff3f9c; --gold:#ffd166;
--text:#eef0ff; --dim:#8489bd; --dimmer:#5a5f8c;
--font-display:'Press Start 2P',monospace; --font-body:'Space Grotesk',sans-serif; --font-mono:'JetBrains Mono',monospace;
--ease-out:cubic-bezier(0.22,1,0.36,1); --ease-in-out:cubic-bezier(0.65,0,0.35,1);
--sidebar-width:64px;
--transition-theme: background-color 0.5s ease, color 0.5s ease, border-color 0.5s ease, box-shadow 0.5s ease;
background:var(--void); color:var(--text); font-family:var(--font-body); line-height:1.6; overflow-x:hidden; position:relative; min-height:100vh;
transition: var(--transition-theme);
}
[data-theme="light"] #app{
--void:#f4f4f8; --panel:#ffffff; --panel-2:#e8ecf4; --border:rgba(0,0,0,0.08);
--cyan:#0891b2; --cyan-dim:rgba(8,145,178,0.2); --magenta:#db2777; --gold:#d97706;
--text:#1e293b; --dim:#64748b; --dimmer:#94a3b8;
}
[data-theme="light"] #app .hero-scan{display:none}
[data-theme="light"] #app .scanlines{opacity:0.1}

*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}html{scroll-behavior:smooth}::selection{background:var(--cyan);color:var(--void)}
a{color:inherit;text-decoration:none}

/* ===== 🌓 Theme switch smoothness ===== */
#app {
  transition: var(--transition-theme);
}
.nav-inner, .project-card, .skill-badge, .featured-card, .contact-card, footer, .xp-bar, .filter-btn, .btn, .scroll-sidebar, .modal-content, .theme-toggle-btn {
  transition: background-color 0.5s ease, color 0.5s ease, border-color 0.5s ease, box-shadow 0.5s ease;
}

/* ===== 🎬 Fullscreen intro overlay ===== */
.intro-overlay {
  position: fixed;
  inset: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--void);
  pointer-events: none;
  transition: background-color 0.5s ease;
}
.intro-title {
  font-family: var(--font-display);
  font-size: clamp(2.5rem, 8vw, 6rem);
  letter-spacing: -1px;
  white-space: nowrap;
  color: var(--foreground);
  text-shadow: 0 0 15px rgba(255,255,255,0.2);
}
[data-theme="light"] .intro-title {
  color: var(--text);
}
.accent-glow {
  color: var(--magenta) !important;
  text-shadow: 0 0 15px rgba(255,77,242,0.6) !important;
}

/* ===== 📊 Top progress bar ===== */
.scroll-progress-bar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, var(--cyan), var(--magenta), var(--gold));
  transform-origin: 0%;
  z-index: 60;
}

/* ===== 📌 Sidebar styles ===== */
.scroll-sidebar {
  position: fixed;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 40;
  pointer-events: none;
  opacity: 0;
}
.scroll-sidebar.visible {
  pointer-events: auto;
}
.sidebar-inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 36px;
  padding: 28px 18px;
  background: var(--panel);
  border: 1px solid var(--border);
  border-radius: 14px;
  backdrop-filter: blur(12px);
  box-shadow: 4px 0 20px rgba(0,0,0,0.3);
  max-height: 85vh;
  overflow-y: auto;
}
.sidebar-logo {
  padding: 8px;
  background: rgba(63,230,255,0.1);
  border-radius: 8px;
}
.sidebar-nav {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.sidebar-nav-item {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 16px 14px;
  border-radius: 10px;
  color: var(--dim);
  transition: all 0.3s var(--ease-out);
  text-decoration: none;
  position: relative;
  overflow: hidden;
}
.sidebar-nav-item:hover {
  color: var(--text);
  background: rgba(255,255,255,0.05);
}
.sidebar-nav-item.active {
  color: var(--cyan);
  background: rgba(63,230,255,0.08);
}
.sidebar-nav-item.active::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 3px;
  height: 60%;
  background: var(--cyan);
  border-radius: 0 3px 3px 0;
  box-shadow: 0 0 8px var(--cyan);
}
.sidebar-nav-label {
  display: none;
  font-family: var(--font-body);
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.5px;
  white-space: nowrap;
}
@media (min-width: 900px) {
  .sidebar-nav-label {
    display: inline;
  }
  .sidebar-inner {
    padding: 32px 20px;
    gap: 40px;
  }
  .sidebar-nav {
    gap: 12px;
  }
  .sidebar-nav-item {
    padding: 16px 18px;
  }
}
.sidebar-bottom {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}
.sidebar-clock {
  font-family: var(--font-mono);
  font-size: 0.6rem;
  color: var(--dimmer);
  display: flex;
  align-items: center;
  gap: 4px;
}
.sidebar-theme-btn {
  background: none;
  border: 1px solid var(--border);
  color: var(--dim);
  width: 32px;
  height: 32px;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s var(--ease-out);
}
.sidebar-theme-btn:hover {
  color: var(--cyan);
  border-color: var(--cyan);
  background: rgba(63,230,255,0.08);
}

/* ===== 🕐 Clock in the nav bar ===== */
.nav-clock {
  font-family: var(--font-mono);
  font-size: 0.65rem;
  color: var(--dimmer);
  display: flex;
  align-items: center;
  gap: 4px;
  margin-right: 8px;
  padding: 4px 8px;
  border: 1px solid var(--border);
  border-radius: 6px;
  background: rgba(255,255,255,0.03);
}
.nav-right {
  display: flex;
  align-items: center;
  gap: 4px;
}

/* Theme Toggle */
.theme-toggle-btn{background:rgba(255,255,255,0.06);border:none;color:var(--dim);width:36px;height:36px;border-radius:50%;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all .3s var(--ease-out);flex-shrink:0}
.theme-toggle-btn:hover{background:rgba(255,255,255,0.12);color:var(--cyan)}
[data-theme="light"] .theme-toggle-btn{background:rgba(0,0,0,0.04);color:var(--dim)}
[data-theme="light"] .theme-toggle-btn:hover{background:rgba(0,0,0,0.08);color:var(--cyan)}

/* ===== NAV ===== */
nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 50;
  padding: 12px 0;
  transition: all 0.4s var(--ease-out);
}
nav.scrolled {
  background: rgba(7,9,17,0.85);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-bottom: 1px solid var(--border);
  padding: 8px 0;
}
[data-theme="light"] nav.scrolled {
  background: rgba(244,244,248,0.9);
}
.nav-inner {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.logo {
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  color: var(--text);
}
.logo-text {
  font-family: var(--font-display);
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
.nav-links {
  display: flex;
  gap: 24px;
}
.nav-links a {
  font-family: var(--font-body);
  font-size: 0.85rem;
  font-weight: 500;
  color: var(--dim);
  text-decoration: none;
  position: relative;
  transition: color 0.3s var(--ease-out);
}
.nav-links a::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 50%;
  width: 0;
  height: 2px;
  background: var(--cyan);
  border-radius: 2px;
  transition: all 0.3s var(--ease-out);
  transform: translateX(-50%);
}
.nav-links a:hover::after,
.nav-links a.nav-active::after { width: 80%; }
.nav-links a.nav-active { color: var(--cyan); }
.nav-links a:hover { color: var(--text); }

/* ===== 👁️ Scroll reveal & stagger ===== */
.reveal-section{opacity:0;transition:opacity .8s var(--ease-out),transform .8s var(--ease-out);will-change:opacity,transform}
.reveal-up{transform:translateY(40px)}
.reveal-left{transform:translateX(-40px)}
.reveal-right{transform:translateX(40px)}
.reveal-scale{transform:scale(0.92)}
.reveal-fade{transform:none}
.reveal-section.revealed{opacity:1;transform:translate(0) scale(1)}
.stagger-children > *{opacity:0;transform:translateY(20px);transition:opacity .6s var(--ease-out),transform .6s var(--ease-out);transition-delay:calc(var(--stagger-i,0) * 0.07s)}
.revealed .stagger-children > *,
.reveal-section.revealed .stagger-children > *{opacity:1;transform:translateY(0)}

/* ===== ➕ Pixel divider ===== */
.pixel-divider{display:flex;align-items:center;justify-content:center;gap:12px;padding:20px 16px;position:relative;overflow:hidden}
.pixel-divider>span{color:var(--cyan);font-size:14px;font-family:var(--font-mono);opacity:0.3;animation:pulse 2s var(--ease-in-out) infinite}
.pixel-divider>span:nth-child(2){animation-delay:0s}
.pixel-divider>span:nth-child(3){animation-delay:0.15s}
.pixel-divider>span:nth-child(4){animation-delay:0.3s}
.pixel-divider>span:nth-child(5){animation-delay:0.45s}
.pixel-divider>span:nth-child(6){animation-delay:0.6s}
.divider-glow-track{position:absolute;inset:0;pointer-events:none}
.divider-glow-dot{position:absolute;left:-4px;top:50%;width:8px;height:8px;border-radius:50%;background:var(--cyan);box-shadow:0 0 12px var(--cyan),0 0 24px rgba(63,230,255,0.4);animation:dividerGlide 3s var(--ease-in-out) infinite}
@keyframes dividerGlide{0%{left:-4px;opacity:0}10%{opacity:1}90%{opacity:1}100%{left:calc(100% + 4px);opacity:0}}
@keyframes pulse{0%,100%{opacity:0.3}50%{opacity:1}}

/* ===== 📐 Section layout ===== */
.section{padding:80px 24px;max-width:1100px;margin:0 auto;position:relative;z-index:2}
.section-head{text-align:center;margin-bottom:36px}
.eyebrow{display:inline-flex;align-items:center;gap:6px;font-family:var(--font-display);font-size:10px;letter-spacing:2px;text-transform:uppercase;color:var(--dim);margin-bottom:12px;padding:6px 14px;border:1px solid var(--border);border-radius:100px}
.section-title{font-family:var(--font-display);font-size:22px;letter-spacing:-0.5px;margin-bottom:8px;line-height:1.3;text-transform:uppercase}
.accent{color:var(--cyan)}
.section-desc{color:var(--dim);font-size:.9rem;max-width:560px;margin:0 auto}

/* Filter Bar */
.filter-bar{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;margin-bottom:24px}
.filter-btn{display:inline-flex;align-items:center;gap:6px;padding:10px 18px;border-radius:10px;border:1px solid var(--border);background:var(--panel);color:var(--dim);cursor:pointer;font-family:var(--font-body);font-size:.8rem;transition:all .3s var(--ease-out)}
.filter-btn:hover{border-color:var(--cyan);color:var(--cyan);transform:translateY(-2px)}
.filter-btn.active{background:rgba(63,230,255,0.08)}

/* Project Grid */
.project-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(340px,1fr));gap:16px}
@media(max-width:400px){.project-grid{grid-template-columns:1fr}}
.project-card{background:var(--panel);border:1px solid var(--border);border-radius:14px;padding:22px 20px 18px;position:relative;overflow:hidden;transition:all .4s var(--ease-out)}
.project-card.featured{border-color:rgba(255,209,102,0.25);background:linear-gradient(160deg,var(--panel) 0%,var(--panel-2) 100%)}
.project-card:hover{transform:translateY(-4px);border-color:var(--cyan);box-shadow:0 8px 30px rgba(63,230,255,0.08)}
.project-card.featured:hover{border-color:var(--gold);box-shadow:0 8px 30px rgba(255,209,102,0.1)}
.card-glow{position:absolute;inset:0;border-radius:14px;transition:opacity .3s;pointer-events:none}
.card-top{display:flex;justify-content:space-between;align-items:center;margin-bottom:12px}
.card-year{font-family:var(--font-mono);font-size:.65rem;color:var(--dimmer)}
.card-badge{font-family:var(--font-display);font-size:8px;letter-spacing:1px;text-transform:uppercase;padding:3px 10px;border-radius:6px}
.card-title{font-family:var(--font-display);font-size:13px;margin-bottom:8px;line-height:1.4}
.card-desc{color:var(--dim);font-size:.85rem;line-height:1.5;margin-bottom:16px;flex:1}
.card-tags{display:flex;gap:6px;flex-wrap:wrap;margin-bottom:14px}
.tag{padding:3px 10px;border-radius:6px;background:rgba(255,255,255,0.04);border:1px solid var(--border);font-size:.75rem;color:var(--dimmer);font-family:var(--font-mono)}
.card-actions{display:flex;gap:12px;flex-wrap:wrap;margin-top:auto}
.card-link{display:inline-flex;align-items:center;gap:5px;font-size:.8rem;color:var(--dim);cursor:pointer;background:none;border:none;font-family:var(--font-body);transition:color .3s var(--ease-out)}
.card-link:hover{color:var(--cyan)}
.demo-link{color:var(--gold)!important}
.details-link{color:var(--cyan)!important;cursor:pointer;background:none;border:none;font-family:var(--font-body);display:inline-flex;align-items:center;gap:5px;font-size:.8rem;transition:color .3s var(--ease-out)}
.details-link:hover{color:var(--magenta)!important}

/* Scroll to top */
.scroll-top-btn{position:fixed;bottom:24px;right:24px;z-index:50;width:44px;height:44px;border-radius:50%;border:1px solid var(--border);background:var(--panel);color:var(--dim);cursor:pointer;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 16px rgba(0,0,0,0.3)}
.scroll-top-btn:hover{border-color:var(--cyan);color:var(--cyan);box-shadow:0 4px 24px rgba(63,230,255,0.15)}

/* Empty state */
.empty-state{text-align:center;padding:48px 24px;color:var(--dimmer);display:flex;flex-direction:column;align-items:center;gap:12px}
.empty-state p{font-size:.9rem}

/* ===== MODAL ===== */
.modal-overlay{position:fixed;inset:0;z-index:200;display:flex;align-items:center;justify-content:center;padding:24px;
background:rgba(7,9,17,0.85);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);}
[data-theme="light"] .modal-overlay{background:rgba(0,0,0,0.3)}
.modal-content{background:var(--panel);border:1px solid var(--cyan);border-radius:16px;padding:32px 28px;max-width:520px;width:100%;position:relative;
box-shadow:0 0 40px rgba(63,230,255,0.1),0 20px 60px rgba(0,0,0,0.4);max-height:85vh;overflow-y:auto}
.modal-close-btn{position:absolute;top:14px;right:14px;width:32px;height:32px;border-radius:8px;border:1px solid var(--border);
background:var(--void);color:var(--dim);cursor:pointer;display:flex;align-items:center;justify-content:center;
transition:all .3s var(--ease-out)}
.modal-close-btn:hover{background:var(--magenta);color:var(--void);border-color:var(--magenta);transform:rotate(90deg)}
.modal-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:16px}
.modal-year{font-family:var(--font-mono);font-size:.75rem;color:var(--dimmer)}
.modal-title{font-family:var(--font-display);font-size:18px;margin-bottom:12px;line-height:1.4;padding-right:32px}
.modal-featured-badge{display:inline-flex;align-items:center;gap:6px;font-family:var(--font-display);font-size:8px;letter-spacing:2px;color:var(--gold);border:1px solid rgba(255,209,102,0.3);background:rgba(255,209,102,0.06);padding:4px 12px;border-radius:100px;margin-bottom:12px}
.modal-desc{color:var(--dim);font-size:.9rem;line-height:1.7;margin-bottom:20px}
.modal-section{margin-bottom:20px}
.modal-section-title{font-family:var(--font-display);font-size:9px;letter-spacing:1px;text-transform:uppercase;color:var(--dimmer);margin-bottom:8px}
.modal-tags{display:flex;gap:6px;flex-wrap:wrap}
.modal-actions{display:flex;gap:10px;flex-wrap:wrap;margin-top:4px}

/* Featured */
.featured-card{position:relative;overflow:hidden;background:linear-gradient(160deg,var(--panel-2) 0%,var(--panel) 100%);border:1px solid rgba(255,209,102,0.25);border-radius:20px;padding:48px 32px;text-align:center;display:flex;flex-direction:column;align-items:center}
.featured-glow{position:absolute;inset:0;background:radial-gradient(800px circle at 50% 50%,rgba(255,209,102,0.06),transparent);pointer-events:none}
.featured-badge{font-family:var(--font-display);font-size:9px;letter-spacing:2px;text-transform:uppercase;color:var(--gold);border:1px solid rgba(255,209,102,0.3);background:rgba(255,209,102,0.06);padding:6px 16px;border-radius:100px;margin-bottom:14px;position:relative;z-index:1;display:inline-flex;align-items:center;gap:6px}
.featured-title{font-family:var(--font-display);font-size:20px;margin-bottom:12px;position:relative;z-index:1}
.featured-desc{color:var(--dim);font-size:.9rem;max-width:500px;margin-bottom:16px;position:relative;z-index:1}
.featured-tags{display:flex;gap:6px;flex-wrap:wrap;justify-content:center;position:relative;z-index:1}
.featured-tag{background:rgba(255,209,102,0.08);border-color:rgba(255,209,102,0.2);color:var(--gold)}
.featured-actions{display:flex;gap:12px;margin-top:24px;flex-wrap:wrap;justify-content:center;position:relative;z-index:1}

/* Contact */
.contact-card{background:var(--panel);border:1px solid var(--border);border-radius:20px;padding:48px 32px;max-width:600px;margin:0 auto}
.btn{display:inline-flex;align-items:center;gap:8px;padding:12px 24px;border-radius:10px;font-family:var(--font-body);font-size:.85rem;font-weight:600;cursor:pointer;border:1px solid var(--border);background:var(--panel-2);color:var(--text);text-decoration:none;transition:all .3s var(--ease-out)}
.btn:hover{transform:translateY(-2px);border-color:var(--cyan);color:var(--cyan);box-shadow:0 4px 16px rgba(63,230,255,0.1)}
.btn.primary{background:var(--cyan);color:var(--void);border-color:var(--cyan)}
.btn.primary:hover{background:rgba(63,230,255,0.8);box-shadow:0 4px 20px rgba(63,230,255,0.25)}

/* Footer */
footer{padding:40px 24px;border-top:1px solid var(--border);margin-top:40px}
.footer-inner{max-width:1100px;margin:0 auto;text-align:center}
.pixel-footer-art{display:flex;gap:8px;justify-content:center;margin-bottom:12px}
.footer-credits{font-family:var(--font-body);font-size:.85rem;color:var(--text);margin-bottom:4px}
.footer-sub{font-size:.75rem;color:var(--dimmer);font-family:var(--font-mono)}

/* ===== HERO SECTION ===== */
.hero {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 2;
  padding: 80px 24px;
}
.hero-scan {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: repeating-linear-gradient(
    0deg,
    transparent,
    transparent 2px,
    rgba(63,230,255,0.015) 2px,
    rgba(63,230,255,0.015) 4px
  );
}
.hero-content {
  max-width: 1100px;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: center;
  position: relative;
  z-index: 2;
  padding: 0 24px;
}
.hero-left {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  text-align: right;
}
.hero-name {
  font-family: var(--font-display);
  font-size: clamp(2rem, 5vw, 4rem);
  letter-spacing: -2px;
  line-height: 1.1;
  color: var(--text);
  text-transform: uppercase;
}
.hero-right {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
}
.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-family: var(--font-display);
  font-size: 10px;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: var(--cyan);
  padding: 8px 16px;
  border: 1px solid var(--cyan-dim);
  border-radius: 100px;
  margin-bottom: 24px;
  background: rgba(63,230,255,0.04);
}
.hero-tagline {
  font-family: var(--font-body);
  font-size: clamp(1.1rem, 2vw, 1.6rem);
  font-weight: 600;
  line-height: 1.4;
  margin-bottom: 20px;
  color: var(--text);
  min-height: 0;
}
.gradient-accent {
  background: linear-gradient(135deg, var(--magenta), var(--cyan));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
.hero-sub {
  font-family: var(--font-body);
  font-size: clamp(0.9rem, 2vw, 1.2rem);
  color: var(--dim);
  max-width: 600px;
  margin: 0 auto 36px;
  line-height: 1.6;
}
.cursor-blink {
  animation: blink 1s step-end infinite;
  color: var(--cyan);
  font-weight: 100;
}
@keyframes blink { 50% { opacity: 0; } }
.hero-stats {
  display: flex;
  gap: 32px;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 32px;
}
.hero-stat {
  display: flex;
  align-items: center;
  gap: 10px;
  text-align: left;
}
.hero-stat-value {
  font-family: var(--font-display);
  font-size: 18px;
  color: var(--text);
}
.hero-stat-label {
  font-size: 0.7rem;
  color: var(--dimmer);
  font-family: var(--font-mono);
  text-transform: uppercase;
  letter-spacing: 1px;
}
.hero-actions {
  display: flex;
  gap: 12px;
  justify-content: center;
  flex-wrap: wrap;
}
.scroll-hint {
  position: absolute;
  bottom: 32px;
  left: 50%;
  transform: translateX(-50%);
  font-family: var(--font-display);
  font-size: 9px;
  letter-spacing: 3px;
  color: var(--dimmer);
}

/* ===== XP BAR ===== */
.xp-bar {
  padding: 16px 24px;
  position: relative;
  z-index: 2;
}
.xp-inner {
  max-width: 1100px;
  margin: 0 auto;
}
.xp-info {
  display: flex;
  gap: 16px;
  align-items: center;
  margin-bottom: 8px;
}
.xp-level {
  font-family: var(--font-display);
  font-size: 10px;
  color: var(--cyan);
  letter-spacing: 1px;
}
.xp-label {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--dimmer);
}
.xp-track {
  width: 100%;
  height: 8px;
  background: rgba(255,255,255,0.05);
  border-radius: 4px;
  overflow: hidden;
  position: relative;
}
.xp-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--cyan), var(--magenta));
  border-radius: 4px;
  box-shadow: 0 0 12px rgba(63,230,255,0.3);
}
.xp-text {
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  font-family: var(--font-mono);
  font-size: 0.6rem;
  color: var(--text);
}

/* ===== SKILLS ===== */
.skills-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: center;
}
.skill-badge {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 18px;
  border-radius: 12px;
  border: 1px solid var(--border);
  background: var(--panel);
  cursor: default;
  transition: all 0.3s var(--ease-out);
}
.skill-badge:hover {
  border-color: var(--badge-color, var(--cyan));
  box-shadow: 0 4px 20px rgba(var(--badge-color, 63,230,255), 0.1);
}
.skill-name {
  font-family: var(--font-body);
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--text);
}

/* ===== ⚡ Glitch text effect ===== */
.glitch {
  position: relative;
}
.glitch::before,
.glitch::after {
  content: attr(data-text);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0.8;
}
.glitch::before {
  color: var(--cyan);
  z-index: -1;
  animation: glitch-anim-1 2s infinite linear alternate-reverse;
}
.glitch::after {
  color: var(--magenta);
  z-index: -2;
  animation: glitch-anim-2 3s infinite linear alternate-reverse;
}
@keyframes glitch-anim-1 {
  0% { clip-path: inset(20% 0 80% 0); transform: translate(-2px, 1px); }
  20% { clip-path: inset(60% 0 10% 0); transform: translate(2px, -1px); }
  40% { clip-path: inset(40% 0 50% 0); transform: translate(-2px, 2px); }
  60% { clip-path: inset(80% 0 5% 0); transform: translate(2px, -2px); }
  80% { clip-path: inset(10% 0 70% 0); transform: translate(-1px, 1px); }
  100% { clip-path: inset(30% 0 50% 0); transform: translate(1px, -1px); }
}
@keyframes glitch-anim-2 {
  0% { clip-path: inset(10% 0 60% 0); transform: translate(2px, 1px); }
  20% { clip-path: inset(30% 0 20% 0); transform: translate(-2px, -1px); }
  40% { clip-path: inset(70% 0 10% 0); transform: translate(2px, 2px); }
  60% { clip-path: inset(20% 0 50% 0); transform: translate(-2px, -2px); }
  80% { clip-path: inset(50% 0 30% 0); transform: translate(1px, 1px); }
  100% { clip-path: inset(5% 0 80% 0); transform: translate(-1px, -1px); }
}

/* ===== 🎞️ CRT vignette + scanlines ===== */
.vignette {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 3;
  background: radial-gradient(ellipse at center, transparent 60%, rgba(7,9,17,0.6) 100%);
}
.scanlines {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 4;
  background: repeating-linear-gradient(
    0deg,
    transparent,
    transparent 2px,
    rgba(0,0,0,0.08) 2px,
    rgba(0,0,0,0.08) 4px
  );
  opacity: 0.3;
}

/* ===== 📱 Mobile fixes ===== */
@media (max-width: 768px) {
  .nav-links { display: none; }
  .sidebar-nav-label { display: none; }
  .scroll-sidebar { display: none; }
  .nav-clock { display: none; }
  .hero-content {
    grid-template-columns: 1fr;
    gap: 30px;
    text-align: center;
    padding: 0 16px;
  }
  .hero-left {
    align-items: center;
    text-align: center;
  }
  .hero-right {
    align-items: center;
  }
  .hero-stats { gap: 20px; }
  .hero-stat-value { font-size: 16px; }
}
`;
