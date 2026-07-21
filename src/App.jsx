import React, { useEffect, useState, useRef } from "react";

/* =============================================================
   PIXEL BACKGROUND — animated retro pixel scenery
   ============================================================= */
function PixelBackground() {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let anim, w, h, stars = [], clouds = [], offset = 0;
    function resize() { w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight; }
    resize();
    function init() {
      stars = [];
      for (let i = 0; i < 80; i++) stars.push({
        x: Math.random() * w, y: Math.random() * h * 0.4,
        s: Math.random() * 2 + 1, a: Math.random() * 0.7 + 0.3,
        sp: Math.random() * 0.3 + 0.05, phase: Math.random() * Math.PI * 2
      });
      clouds = [];
      for (let i = 0; i < 4; i++) clouds.push({
        x: Math.random() * w, y: 40 + Math.random() * (h * 0.25),
        w2: 60 + Math.random() * 120, h2: 14 + Math.random() * 8, sp: 0.15 + Math.random() * 0.3
      });
    }
    init();
    function drawMountain(ox, oy, mw, mh, color) {
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.moveTo(ox, oy + mh);
      ctx.lineTo(ox + mw/2, oy);
      ctx.lineTo(ox + mw, oy + mh);
      ctx.closePath();
      ctx.fill();
    }
    function animate(time) {
      ctx.clearRect(0, 0, w, h);
      for (const s of stars) {
        const twinkle = 0.5 + 0.5 * Math.sin(time * 0.002 + s.phase);
        ctx.globalAlpha = s.a * twinkle;
        ctx.fillStyle = '#eef0ff';
        ctx.fillRect(Math.floor(s.x), Math.floor(s.y), s.s, s.s);
        s.y += s.sp * 0.1;
        if (s.y > h * 0.4) { s.y = 0; s.x = Math.random() * w; }
      }
      ctx.globalAlpha = 1;
      const mColors = ['#0f1535', '#151b45', '#1c2355'];
      for (let i = 0; i < 3; i++) {
        const mw = w * 0.8, mh = 50 + i * 20, mx = (w - mw) / 2 + Math.sin(offset * 0.005 + i) * 20;
        drawMountain(mx, h - 80 - i * 15, mw, mh, mColors[i]);
        drawMountain(mx - mw * 0.3, h - 80 - i * 15, mw * 0.5, mh * 0.6, mColors[i]);
        drawMountain(mx + mw * 0.5, h - 80 - i * 15, mw * 0.6, mh * 0.7, mColors[i]);
      }
      for (const c of clouds) {
        ctx.fillStyle = 'rgba(132,137,189,0.12)';
        const cx = Math.floor(c.x), cy = Math.floor(c.y);
        const cw = Math.floor(c.w2), ch = Math.floor(c.h2);
        ctx.fillRect(cx - cw/2, cy - ch/2, cw, ch);
        ctx.fillRect(cx - cw/2 + 10, cy - ch/2 - 4, cw - 20, ch - 2);
        ctx.fillRect(cx - cw/2 + 20, cy - ch/2 - 8, cw - 40, ch - 4);
        c.x += c.sp;
        if (c.x > w + c.w2) c.x = -c.w2;
      }
      ctx.fillStyle = '#070911';
      ctx.fillRect(0, h - 16, w, 16);
      ctx.fillStyle = 'rgba(63,230,255,0.03)';
      ctx.fillRect(0, h - 16, w, 1);
      offset++;
      anim = requestAnimationFrame(animate);
    }
    anim = requestAnimationFrame(animate);
    const onResize = () => { resize(); init(); };
    window.addEventListener('resize', onResize);
    return () => { cancelAnimationFrame(anim); window.removeEventListener('resize', onResize); };
  }, []);
  return <canvas ref={ref} style={{position:'fixed',inset:0,zIndex:0,pointerEvents:'none',opacity:0.3}} aria-hidden="true" />;
}

/* =============================================================
   PIXEL RAIN — particle rain overlay
   ============================================================= */
function PixelRain() {
  const ref=useRef(null);
  useEffect(()=>{
    const c=ref.current;if(!c)return;const ctx=c.getContext("2d");let a,p=[];
    function rs(){c.width=window.innerWidth;c.height=window.innerHeight}rs();
    function init(){p=[];const ct=Math.floor((c.width*c.height)/7000);const cl=["#3fe6ff","#ff3f9c","#ffd166","#a29bfe","#fff"];for(let i=0;i<ct;i++)p.push({x:Math.random()*c.width,y:Math.random()*c.height,size:Math.random()*3+0.5,speedY:Math.random()*0.7+0.05,speedX:(Math.random()-0.5)*0.3,color:cl[Math.floor(Math.random()*cl.length)],opacity:Math.random()*0.5+0.1,twinkle:Math.random()>0.7,twinkleSpeed:Math.random()*0.03+0.01,twinklePhase:Math.random()*Math.PI*2});}
    init();
    function anim(t){ctx.clearRect(0,0,c.width,c.height);for(const pt of p){pt.y+=pt.speedY;pt.x+=pt.speedX;if(pt.y>c.height){pt.y=-pt.size;pt.x=Math.random()*c.width}let op=pt.opacity;if(pt.twinkle)op*=0.5+0.5*Math.sin(t*pt.twinkleSpeed+pt.twinklePhase);ctx.globalAlpha=op;ctx.fillStyle=pt.color;ctx.fillRect(pt.x,pt.y,pt.size,pt.size)}ctx.globalAlpha=1;a=requestAnimationFrame(anim)}
    a=requestAnimationFrame(anim);const rsH=()=>{rs();init()};window.addEventListener("resize",rsH);return()=>{cancelAnimationFrame(a);window.removeEventListener("resize",rsH)};
  },[]);
  return <canvas ref={ref} style={{position:"fixed",inset:0,zIndex:1,pointerEvents:"none",opacity:0.3}} aria-hidden="true"/>;
}

/* =============================================================
   ICON FUNCTIONS
   ============================================================= */
const iconProps = (s,c) => ({width:s,height:s,viewBox:"0 0 24 24",fill:"none",stroke:c,strokeWidth:1.5,strokeLinecap:"round",strokeLinejoin:"round"});
function IconGithub({s=18,c="currentColor"}){return <svg {...iconProps(s,c)}><path d="M9 19c-4 1.2-4-2.1-5.5-2.5M17 22v-3.2c0-.9-.3-1.5-.6-1.8 2.1-.2 4.3-1 4.3-4.7 0-1-.4-1.9-1-2.6.1-.3.4-1.3-.1-2.7 0 0-.9-.3-2.9 1a10 10 0 00-5.4 0c-2-1.3-2.9-1-2.9-1-.5 1.4-.2 2.4-.1 2.7-.6.7-1 1.6-1 2.6 0 3.7 2.2 4.5 4.3 4.7-.3.3-.5.7-.6 1.4V22"/></svg>}
function IconMail({s=18,c="currentColor"}){return <svg {...iconProps(s,c)}><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3.5 6.5L12 13l8.5-6.5"/></svg>}

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
const PIXEL_ART = {
  star: { c:"#ffd166", w:12, h:12, p:[2,0,3,0,1,1,2,1,3,1,4,1,0,2,1,2,2,2,3,2,4,2,5,2,0,3,1,3,2,3,3,3,4,3,5,3,1,4,2,4,3,4,4,4,2,5,3,5] },
  bolt: { c:"#a29bfe", w:10, h:12, p:[3,0,4,0,3,1,4,1,2,2,3,2,4,2,5,2,1,3,2,3,3,3,4,3,5,3,0,4,1,4,2,4,3,4,4,4,1,5,2,5,3,5,4,5,5,5,1,6,2,6,3,6,4,6,2,7,3,7,4,7,2,8,3,8] },
  palette: { c:"#3fe6ff", w:12, h:10, p:[1,0,2,0,3,0,4,0,5,0,6,0,0,1,2,1,4,1,5,1,7,1,0,2,7,2,0,3,7,3,1,4,2,4,3,4,4,4,5,4,6,4,3,5,4,5,3,6,4,6,2,7,3,7,4,7,5,7] },
  diamond: { c:"#3fe6ff", w:10, h:10, p:[4,0,5,0,3,1,4,1,5,1,6,1,2,2,3,2,4,2,5,2,6,2,7,2,1,3,2,3,3,3,4,3,5,3,6,3,7,3,8,3,0,4,1,4,2,4,3,4,4,4,5,4,6,4,7,4,8,4,9,4,0,5,1,5,2,5,3,5,4,5,5,5,6,5,7,5,8,5,9,5,1,6,2,6,3,6,4,6,5,6,6,6,7,6,8,6,2,7,3,7,4,7,5,7,6,7,7,7,3,8,4,8,5,8,6,8,4,9,5,9] },
};
const PS = 2;
function PxIcon({ name, size=18, color }) {
  const art = PIXEL_ART[name];
  if (!art) return null;
  const vw = art.w * PS, vh = art.h * PS;
  const c = color || art.c;
  const rects = [];
  for (let i = 0; i < art.p.length; i += 2)
    rects.push(<rect key={i/2} x={art.p[i]*PS} y={art.p[i+1]*PS} width={PS} height={PS} fill={c} shapeRendering="crispEdges" />);
  return <svg width={size} height={size} viewBox={`0 0 ${vw} ${vh}`} style={{display:'inline-block',verticalAlign:'middle',flexShrink:0}} aria-hidden="true">{rects}</svg>;
}

/* =============================================================
   HOOKS
   ============================================================= */
function useReveal(t=0.1){const r=useRef(null);const[v,set]=useState(false);useEffect(()=>{const el=r.current;if(!el)return;const obs=new IntersectionObserver(([e])=>{if(e.isIntersecting){set(true);obs.unobserve(el)}},{threshold:t});obs.observe(el);return()=>obs.disconnect()},[t]);return[r,v]}
function RS({children,className="",...rest}){const[r,v]=useReveal(0.08);return <section ref={r} className={`reveal-section ${v?"revealed":""} ${className}`} {...rest}>{children}</section>}
function useTypewriter(text,speed=35,delay=600){const[d,set]=useState("");const[s,setS]=useState(false);useEffect(()=>{const t=setTimeout(()=>setS(true),delay);return()=>clearTimeout(t)},[delay]);useEffect(()=>{if(!s)return;let i=0;const iv=setInterval(()=>{i++;set(text.slice(0,i));if(i>=text.length)clearInterval(iv)},speed);return()=>clearInterval(iv)},[s,text,speed]);return d}

/* =============================================================
   MAIN
   ============================================================= */
export default function Portfolio() {
  const [activeCat,setActiveCat]=useState("all");
  const [scrolled,setScrolled]=useState(false);
  const [hovered,setHovered]=useState(null);
  useEffect(()=>{const o=()=>setScrolled(window.scrollY>50);window.addEventListener("scroll",o,{passive:true});return()=>window.removeEventListener("scroll",o)},[]);
  const typed=useTypewriter("Full-Stack Developer building pixel-perfect worlds, one commit at a time",30,800);
  const filtered=activeCat==="all"?projects:projects.filter(p=>p.type?.toLowerCase().replace(" ","")===activeCat);
  const feat=projects.find(p=>p.featured);

  return (<><style>{CSS}</style><div id="page"><PixelBackground/><PixelRain/><div className="vignette"/><div className="scanlines"/>

    {/* NAV */}
    <nav className={scrolled?"scrolled":""}>
      <div className="nav-inner">
        <a href="#" className="logo">
          <PxIcon name="star" size={20} />
          <span className="logo-text">Houtarou<span className="accent">Des</span></span>
        </a>
        <div className="nav-links">
          <a href="#quests">Projects</a>
          <a href="#skills">Skills</a>
          <a href="#contact">Contact</a>
        </div>
      </div>
    </nav>

    {/* HERO */}
    <header className="hero">
      <div className="hero-scan" aria-hidden="true"/>
      <div className="hero-content">
        <div className="hero-badge"><PxIcon name="star" size={12} /> Player File — Slot 01</div>
        <h1 className="hero-title">HOUTAROU<span className="gradient-accent">DES</span></h1>
        <p className="hero-sub">{typed}<span className="cursor-blink">|</span></p>
        <div className="hero-stats">
          <div className="hero-stat"><PxIcon name="bolt" size={20} /><div><div className="hero-stat-value">4</div><div className="hero-stat-label">Projects</div></div></div>
          <div className="hero-stat"><PxIcon name="diamond" size={20} color="#ffd166" /><div><div className="hero-stat-value">8</div><div className="hero-stat-label">Technologies</div></div></div>
          <div className="hero-stat"><PxIcon name="star" size={20} /><div><div className="hero-stat-value">26+</div><div className="hero-stat-label">Exercises</div></div></div>
          <div className="hero-stat"><PxIcon name="diamond" size={20} color="#3fe6ff" /><div><div className="hero-stat-value">Open</div><div className="hero-stat-label">To Work</div></div></div>
        </div>
        <div className="hero-actions">
          <a href="#quests" className="btn primary">View Projects</a>
          <a href="https://github.com/houtaroudes" target="_blank" rel="noopener" className="btn"><IconGithub s={15}/> GitHub</a>
        </div>
      </div>
      <div className="scroll-hint" aria-hidden="true">▸ SCROLL TO EXPLORE ▸</div>
    </header>

    {/* XP BAR */}
    <div className="xp-bar">
      <div className="xp-inner">
        <div className="xp-info"><span className="xp-level">Lv. 3</span><span className="xp-label">Full-Stack Developer</span></div>
        <div className="xp-track"><div className="xp-fill" style={{width:"65%"}}/><span className="xp-text">4 / 6 projects shipped</span></div>
      </div>
    </div>

    {/* PROJECTS */}
    <RS className="section" id="quests">
      <div className="section-head">
        <div className="eyebrow"><PxIcon name="star" size={14} /> Cartridge Library</div>
        <h2 className="section-title">Project <span className="accent">Catalog</span></h2>
        <p className="section-desc">Real builds from my GitHub — click to see the code or play a live demo.</p>
      </div>
      <div className="filter-bar">
        {categories.map(c=><button key={c.id} className={`filter-btn ${activeCat===c.id?"active":""}`} onClick={()=>setActiveCat(c.id)} style={activeCat===c.id?{borderColor:c.color,color:c.color}:{}}><PxIcon name={c.icon} size={14} /><span>{c.label}</span></button>)}
      </div>
      <div className="project-grid">
        {filtered.map((p,i)=>(
          <article className={`project-card ${p.featured?"featured":""}`} key={p.id}
            style={{animationDelay:`${i*0.08}s`}}
            onMouseEnter={()=>setHovered(p.id)} onMouseLeave={()=>setHovered(null)}>
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
              {p.demo&&<a href={p.demo} target="_blank" rel="noopener" className="card-link demo-link"><PxIcon name="star" size={12} color="#ffd166" /> Live Demo</a>}
              <a href={p.code} target="_blank" rel="noopener" className="card-link"><PxIcon name="diamond" size={12} color="#3fe6ff" /> View Code</a>
            </div>
          </article>
        ))}
      </div>
      {filtered.length===0&&<div className="empty-state"><PxIcon name="star" size={24} /><p>No projects in this category yet.</p></div>}
    </RS>

    {/* SKILLS */}
    <RS className="section" id="skills">
      <div className="section-head"><div className="eyebrow"><PxIcon name="diamond" size={14} color="#ffd166" /> Equipment Loadout</div><h2 className="section-title">Skills & <span className="accent">Tools</span></h2><p className="section-desc">Technologies I use to build stuff.</p></div>
      <div className="skills-grid">{skillBadges.map(s=><div className="skill-badge" key={s.name} style={{"--badge-color":s.color}}><PxIcon name="diamond" size={14} color={s.color} /><span className="skill-name">{s.name}</span></div>)}</div>
    </RS>

    {/* FEATURED */}
    {feat && (
      <RS className="section">
        <div className="featured-card">
          <div className="featured-glow"/>
          <div className="featured-badge"><PxIcon name="star" size={10} /> FEATURED QUEST <PxIcon name="star" size={10} /></div>
          <h3 className="featured-title">{feat.title}</h3>
          <p className="featured-desc">{feat.desc}</p>
          <div className="featured-tags">{feat.tags.map(t=><span className="tag featured-tag" key={t}>{t}</span>)}</div>
          <div className="featured-actions" style={{display:"flex",gap:12,marginTop:24,flexWrap:"wrap",justifyContent:"center"}}>
            <a href={feat.demo} target="_blank" rel="noopener" className="btn primary"><PxIcon name="star" size={12} /> Explore the Hub</a>
            <a href={feat.code} target="_blank" rel="noopener" className="btn"><PxIcon name="diamond" size={12} /> View Code</a>
          </div>
        </div>
      </RS>
    )}

    {/* CONTACT */}
    <RS className="section" id="contact">
      <div className="contact-card">
        <div className="eyebrow" style={{textAlign:"center"}}><PxIcon name="diamond" size={14} color="#3fe6ff" /> Multiplayer Lobby</div>
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
        <p className="footer-credits"><strong>HoutarouDes</strong> — Full-Stack Developer &copy; 2026</p>
        <p className="footer-sub">4 projects &middot; 26+ exercises &middot; infinite curiosity</p>
      </div>
    </footer>
  </div></>);
}

const CSS = `
#page{
  --void:#070911; --panel:#10142e; --panel-2:#171c40; --border:rgba(80,225,255,0.2);
  --cyan:#3fe6ff; --cyan-dim:rgba(63,230,255,0.3); --magenta:#ff3f9c; --gold:#ffd166;
  --text:#eef0ff; --dim:#8489bd; --dimmer:#5a5f8c;
  --font-display:'Press Start 2P',monospace; --font-body:'Space Grotesk',sans-serif; --font-mono:'JetBrains Mono',monospace;
  background:var(--void); color:var(--text); font-family:var(--font-body); line-height:1.6; overflow-x:hidden; position:relative; min-height:100vh;
}
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}html{scroll-behavior:smooth}::selection{background:var(--cyan);color:var(--void)}
a{color:inherit;text-decoration:none}
.vignette{position:fixed;inset:0;z-index:2;pointer-events:none;background:radial-gradient(120% 90% at 50% 40%,transparent 50%,rgba(3,4,12,0.85) 100%)}
.scanlines{position:fixed;inset:0;z-index:50;pointer-events:none;background:repeating-linear-gradient(0deg,rgba(255,255,255,0.02) 0px,rgba(255,255,255,0.02) 1px,transparent 1px,transparent 3px);opacity:0.6}
.reveal-section{opacity:0;transform:translateY(30px);transition:opacity .7s cubic-bezier(.16,1,.3,1),transform .7s cubic-bezier(.16,1,.3,1);position:relative;z-index:3}
.reveal-section.revealed{opacity:1;transform:translateY(0)}@media(prefers-reduced-motion:reduce){.reveal-section{opacity:1;transform:none;transition:none}.hero-scan{display:none}}
nav{position:fixed;top:0;left:0;right:0;z-index:30;transition:background .3s;padding:0 24px}
nav.scrolled{background:rgba(7,9,17,0.92);backdrop-filter:blur(12px);box-shadow:0 1px 0 var(--border)}
.nav-inner{max-width:1100px;margin:0 auto;display:flex;align-items:center;justify-content:space-between;height:60px}
.logo{display:flex;align-items:center;gap:8px;font-weight:700;font-size:1.05rem}
.logo-text{font-family:var(--font-display);font-size:.7rem;letter-spacing:.02em}.logo-text .accent{color:var(--magenta)}
.nav-links{display:flex;gap:24px}.nav-links a{font-family:var(--font-mono);font-size:.8rem;color:var(--dim);transition:color .2s;position:relative}
.nav-links a::after{content:'';position:absolute;bottom:-2px;left:0;right:0;height:2px;background:var(--cyan);transform:scaleX(0);transition:transform .2s}
.nav-links a:hover{color:var(--cyan)}.nav-links a:hover::after{transform:scaleX(1)}@media(max-width:640px){.nav-links{display:none}}
.hero{min-height:100vh;display:flex;align-items:center;justify-content:center;padding:120px 24px 80px;position:relative;overflow:hidden;z-index:3}
.hero-scan{position:absolute;inset:0;z-index:0;background:linear-gradient(to bottom,transparent 0%,var(--cyan) 50%,transparent 100%);opacity:0;animation:scanIn 1.2s ease-out forwards;pointer-events:none;mix-blend-mode:overlay}
@keyframes scanIn{0%{opacity:.6;transform:translateY(-100%)}60%{opacity:.3;transform:translateY(20%)}100%{opacity:0;transform:translateY(0%)}}
.hero-content{max-width:720px;text-align:center;display:flex;flex-direction:column;align-items:center;gap:20px;position:relative;z-index:1}
.hero-badge{font-family:var(--font-mono);font-size:.75rem;letter-spacing:.12em;text-transform:uppercase;color:var(--gold);border:1px solid rgba(255,209,102,0.3);background:rgba(255,209,102,0.06);padding:6px 16px;border-radius:100px;display:inline-flex;align-items:center;gap:6px;animation:fadeSlide .8s ease .2s both}
.hero-title{font-family:var(--font-display);font-size:clamp(1.4rem,5vw,3.2rem);line-height:1.5;letter-spacing:.02em;animation:fadeSlide .8s ease .4s both;text-shadow:0 0 14px var(--cyan-dim),0 0 40px rgba(255,63,156,0.15)}
.gradient-accent{background:linear-gradient(135deg,var(--cyan),var(--magenta));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
@keyframes fadeSlide{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
.hero-sub{font-family:var(--font-mono);font-size:clamp(.85rem,1.6vw,1rem);color:var(--dim);max-width:520px;min-height:3rem;animation:fadeSlide .8s ease .6s both}
.cursor-blink{animation:blink .8s steps(2) infinite;color:var(--cyan);margin-left:2px}@keyframes blink{50%{opacity:0}}
.hero-stats{display:flex;gap:12px;flex-wrap:wrap;justify-content:center;animation:fadeSlide .8s ease .8s both;margin-top:4px}
.hero-stat{display:flex;align-items:center;gap:10px;padding:8px 14px;background:var(--panel);border:1px solid var(--border);border-radius:10px;transition:all .2s}
.hero-stat:hover{border-color:var(--gold);transform:translateY(-2px)}
.hero-stat-value{font-family:var(--font-display);font-size:.75rem;color:var(--gold)}.hero-stat-label{font-family:var(--font-mono);font-size:.58rem;color:var(--dimmer);text-transform:uppercase;letter-spacing:.08em}
.hero-actions{display:flex;gap:12px;flex-wrap:wrap;justify-content:center;animation:fadeSlide .8s ease 1s both;margin-top:4px}
.btn{display:inline-flex;align-items:center;gap:8px;padding:12px 24px;border-radius:10px;font-family:var(--font-mono);font-size:.8rem;font-weight:700;border:2px solid var(--cyan);background:transparent;color:var(--cyan);text-transform:uppercase;letter-spacing:.03em;cursor:pointer;transition:all .18s ease}
.btn:hover{background:var(--cyan);color:var(--void);box-shadow:0 0 22px var(--cyan-dim);transform:translateY(-2px)}
.btn.primary{background:var(--magenta);border-color:var(--magenta);color:var(--void);box-shadow:0 0 18px rgba(255,63,156,0.3)}
.btn.primary:hover{background:transparent;color:var(--magenta);box-shadow:0 0 22px rgba(255,63,156,0.3)}
.scroll-hint{position:absolute;bottom:32px;font-family:var(--font-mono);font-size:.65rem;color:var(--dimmer);animation:blink 1.4s steps(2) infinite;letter-spacing:.15em}
.xp-bar{position:relative;z-index:3;max-width:960px;margin:-20px auto 0;padding:0 24px}
.xp-inner{background:var(--panel);border:1px solid var(--border);border-radius:12px;padding:14px 20px;display:flex;align-items:center;gap:14px;flex-wrap:wrap}
.xp-info{display:flex;align-items:center;gap:8px}
.xp-level{font-family:var(--font-display);font-size:.65rem;color:var(--gold)}.xp-label{font-family:var(--font-mono);font-size:.7rem;color:var(--dim)}
.xp-track{flex:1;min-width:140px;height:18px;background:var(--void);border:1px solid var(--border);border-radius:10px;position:relative;overflow:hidden}
.xp-fill{height:100%;background:linear-gradient(90deg,var(--cyan),var(--magenta));border-radius:10px;transition:width .8s ease;position:relative}
.xp-fill::after{content:'';position:absolute;inset:0;background:linear-gradient(90deg,transparent,rgba(255,255,255,0.15),transparent);animation:shimmer 2s ease infinite}
@keyframes shimmer{0%{transform:translateX(-100%)}100%{transform:translateX(100%)}}
.xp-text{font-family:var(--font-mono);font-size:.55rem;color:var(--text);position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);white-space:nowrap}
.section{padding:80px 24px;max-width:1100px;margin:0 auto;position:relative;z-index:3}
.section-head{text-align:center;margin-bottom:36px}
.eyebrow{font-family:var(--font-mono);font-size:.7rem;letter-spacing:.18em;text-transform:uppercase;color:var(--cyan);opacity:.85;margin-bottom:10px;display:inline-flex;align-items:center;gap:6px}
.section-title{font-family:var(--font-display);font-size:clamp(1rem,2.4vw,1.5rem);margin-bottom:10px;line-height:1.4}
.section-title .accent{color:var(--cyan)}.section-desc{color:var(--dim);max-width:520px;margin:0 auto;font-size:.9rem}
.filter-bar{display:flex;gap:8px;justify-content:center;flex-wrap:wrap;margin-bottom:24px}
.filter-btn{display:flex;align-items:center;gap:6px;padding:8px 14px;border-radius:8px;font-family:var(--font-mono);font-size:.72rem;border:1px solid var(--border);background:var(--panel);color:var(--dim);cursor:pointer;transition:all .2s}
.filter-btn:hover{border-color:var(--cyan);color:var(--cyan)}.filter-btn.active{background:rgba(63,230,255,0.06)}
.project-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(340px,1fr));gap:16px}@media(max-width:400px){.project-grid{grid-template-columns:1fr}}
.project-card{background:var(--panel);border:1px solid var(--border);border-radius:14px;padding:22px 20px 18px;position:relative;overflow:hidden;transition:all .25s ease;animation:cardIn .5s ease both}
.project-card.featured{border-color:rgba(255,209,102,0.25);background:linear-gradient(160deg,var(--panel) 0%,#14102a 100%)}
@keyframes cardIn{from{opacity:0;transform:translateY(16px) scale(.98)}to{opacity:1;transform:none}}
.project-card:hover{transform:translateY(-4px);border-color:var(--cyan);box-shadow:0 8px 30px rgba(63,230,255,0.08)}
.project-card.featured:hover{border-color:var(--gold);box-shadow:0 8px 30px rgba(255,209,102,0.1)}
.card-glow{position:absolute;inset:0;border-radius:14px;transition:opacity .3s;pointer-events:none}
.card-top{display:flex;justify-content:space-between;align-items:center;margin-bottom:12px}
.card-year{font-family:var(--font-mono);font-size:.65rem;color:var(--dimmer)}
.card-badge{font-family:var(--font-mono);font-size:.55rem;font-weight:700;padding:2px 10px;border-radius:6px;text-transform:uppercase;letter-spacing:.08em}
.card-title{font-family:var(--font-display);font-size:.78rem;margin-bottom:10px;line-height:1.4}
.card-desc{color:var(--dim);font-size:.85rem;line-height:1.6;margin-bottom:14px;min-height:50px}
.card-tags{display:flex;gap:6px;flex-wrap:wrap;margin-bottom:14px}
.tag{font-family:var(--font-mono);font-size:.6rem;padding:3px 8px;border-radius:5px;background:rgba(63,230,255,0.07);color:var(--cyan);border:1px solid rgba(63,230,255,0.12)}
.card-actions{display:flex;gap:12px;flex-wrap:wrap}
.card-link{display:inline-flex;align-items:center;gap:5px;font-family:var(--font-mono);font-size:.7rem;color:var(--dimmer);transition:color .2s}
.card-link:hover{color:var(--cyan)}.demo-link{color:var(--gold)}.demo-link:hover{color:#fff!important}
.empty-state{text-align:center;padding:40px 20px;color:var(--dimmer);display:flex;flex-direction:column;align-items:center;gap:8px}
.featured-card{position:relative;overflow:hidden;background:linear-gradient(160deg,#14102a 0%,var(--panel) 100%);border:1px solid rgba(255,209,102,0.25);border-radius:20px;padding:48px 32px;text-align:center;display:flex;flex-direction:column;align-items:center}
.featured-glow{position:absolute;inset:0;background:radial-gradient(800px circle at 50% 50%,rgba(255,209,102,0.06),transparent);pointer-events:none}
.featured-badge{font-family:var(--font-display);font-size:.55rem;color:var(--gold);letter-spacing:.12em;border:1px solid rgba(255,209,102,0.3);background:rgba(255,209,102,0.06);padding:6px 16px;border-radius:100px;margin-bottom:14px;position:relative;z-index:1;display:inline-flex;align-items:center;gap:6px}
.featured-title{font-family:var(--font-display);font-size:clamp(.9rem,1.8vw,1.2rem);margin-bottom:10px;position:relative;z-index:1}
.featured-desc{color:var(--dim);max-width:520px;font-size:.88rem;margin-bottom:16px;position:relative;z-index:1}
.featured-tags{display:flex;gap:8px;flex-wrap:wrap;justify-content:center;position:relative;z-index:1}
.featured-tag{background:rgba(255,209,102,0.08);color:var(--gold);border-color:rgba(255,209,102,0.2)}
.skills-grid{display:flex;flex-wrap:wrap;gap:8px;justify-content:center}
.skill-badge{display:flex;align-items:center;gap:6px;padding:8px 16px;border-radius:10px;background:var(--panel);border:1px solid var(--border);transition:all .2s;font-size:.85rem}
.skill-badge:hover{border-color:var(--badge-color,var(--cyan));transform:translateY(-2px);box-shadow:0 4px 12px color-mix(in srgb,var(--badge-color,var(--cyan)) 20%,transparent)}
.skill-name{font-family:var(--font-mono);font-size:.78rem;font-weight:500}
footer{position:relative;z-index:3;padding:40px 24px;border-top:1px solid var(--border);margin-top:40px}
.footer-inner{max-width:1100px;margin:0 auto;text-align:center}
.footer-credits{font-family:var(--font-mono);font-size:.72rem;color:var(--dimmer)}.footer-credits strong{color:var(--text)}
.footer-sub{font-family:var(--font-mono);font-size:.6rem;color:var(--dimmer);margin-top:8px;opacity:.6}
:focus-visible{outline:2px solid var(--gold);outline-offset:3px}
.contact-card{background:var(--panel);border:1px solid var(--border);border-radius:20px;padding:48px 32px;max-width:640px;margin:0 auto}
`;
