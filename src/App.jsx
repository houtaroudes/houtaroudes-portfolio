import React, { useEffect, useState, useRef } from "react";

/* =============================================================
   🎮 HOUTAROUDES PORTFOLIO — RETRO PIXEL LANDING PAGE
   
   yo this is my portfolio lol i tried to make it look like
   a retro game but also kinda like a legit landing page at
   the same time?? idk if it worked but here we are

   features:
   - canvas pixel rain background (kinda like matrix but cuter)
   - pixel scroll animations (blocks fade in like minecraft lol)
   - crt scanlines for that old monitor feel
   - starfield that drifts in the back
   - flickering neon title like old arcade signs
   - typewriter effect on the subtitle cuz why not
   
   icons: i drew these myself cuz i couldn't install any icon
   package in the sandbox. they're 24x24 outline style. not
   perfect but hey it works
   ============================================================= */

// ---- ICON HELPERS ----
const iconProps = (size, color) => ({
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: color,
  strokeWidth: 1.5,
  strokeLinecap: "round",
  strokeLinejoin: "round",
});

function IconCode({ size = 22, color = "currentColor" }) {
  return (
    <svg {...iconProps(size, color)}>
      <path d="M8.5 7L3.5 12l5 5" />
      <path d="M15.5 7l5 5-5 5" />
      <path d="M13.5 4.5l-3 15" />
    </svg>
  );
}

function IconPalette({ size = 22, color = "currentColor" }) {
  return (
    <svg {...iconProps(size, color)}>
      <path d="M12 3a9 9 0 100 18c1.2 0 1.8-.9 1.8-1.8 0-.5-.2-.9-.5-1.2-.3-.3-.5-.7-.5-1.2 0-.9.7-1.6 1.6-1.6h1.5A3.1 3.1 0 0021 12a9 9 0 00-9-9z" />
      <circle cx="7.3" cy="10.2" r="1.1" />
      <circle cx="9.8" cy="6.6" r="1.1" />
      <circle cx="14.3" cy="6.6" r="1.1" />
      <circle cx="16.8" cy="10.2" r="1.1" />
    </svg>
  );
}

function IconBolt({ size = 22, color = "currentColor" }) {
  return (
    <svg {...iconProps(size, color)}>
      <path d="M13 3L5 13.5h5.5L11 21l8-11h-6l0-7z" />
    </svg>
  );
}

function IconServer({ size = 22, color = "currentColor" }) {
  return (
    <svg {...iconProps(size, color)}>
      <rect x="4" y="4" width="16" height="6" rx="1.5" />
      <rect x="4" y="14" width="16" height="6" rx="1.5" />
      <circle cx="8" cy="7" r="0.8" fill={color} stroke="none" />
      <circle cx="8" cy="17" r="0.8" fill={color} stroke="none" />
    </svg>
  );
}

function IconDatabase({ size = 22, color = "currentColor" }) {
  return (
    <svg {...iconProps(size, color)}>
      <ellipse cx="12" cy="5.5" rx="7.5" ry="2.5" />
      <path d="M4.5 5.5v13c0 1.4 3.4 2.5 7.5 2.5s7.5-1.1 7.5-2.5v-13" />
      <path d="M4.5 12c0 1.4 3.4 2.5 7.5 2.5s7.5-1.1 7.5-2.5" />
    </svg>
  );
}

function IconGitBranch({ size = 22, color = "currentColor" }) {
  return (
    <svg {...iconProps(size, color)}>
      <circle cx="6" cy="5" r="2" />
      <circle cx="6" cy="19" r="2" />
      <circle cx="18" cy="9" r="2" />
      <path d="M6 7v10" />
      <path d="M6 13c0-4 4-4 8-6l2.5-1.3" />
    </svg>
  );
}

function IconLayout({ size = 22, color = "currentColor" }) {
  return (
    <svg {...iconProps(size, color)}>
      <rect x="3.5" y="4" width="17" height="16" rx="1.5" />
      <path d="M3.5 9.5h17" />
      <path d="M9 9.5V20" />
    </svg>
  );
}

function IconDevice({ size = 22, color = "currentColor" }) {
  return (
    <svg {...iconProps(size, color)}>
      <rect x="7" y="2.5" width="10" height="19" rx="2" />
      <path d="M11 19h2" />
    </svg>
  );
}

function IconGithub({ size = 20, color = "currentColor" }) {
  return (
    <svg {...iconProps(size, color)}>
      <path d="M9 19c-4 1.2-4-2.1-5.5-2.5M17 22v-3.2c0-.9-.3-1.5-.6-1.8 2.1-.2 4.3-1 4.3-4.7 0-1-.4-1.9-1-2.6.1-.3.4-1.3-.1-2.7 0 0-.9-.3-2.9 1a10 10 0 00-5.4 0c-2-1.3-2.9-1-2.9-1-.5 1.4-.2 2.4-.1 2.7-.6.7-1 1.6-1 2.6 0 3.7 2.2 4.5 4.3 4.7-.3.3-.5.7-.6 1.4V22" />
    </svg>
  );
}

function IconMail({ size = 20, color = "currentColor" }) {
  return (
    <svg {...iconProps(size, color)}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3.5 6.5L12 13l8.5-6.5" />
    </svg>
  );
}

function IconPlay({ size = 16, color = "currentColor" }) {
  return (
    <svg {...iconProps(size, color)}>
      <path d="M7 4.5v15l13-7.5-13-7.5z" strokeLinejoin="round" />
    </svg>
  );
}

function IconArrowUpRight({ size = 14, color = "currentColor" }) {
  return (
    <svg {...iconProps(size, color)}>
      <path d="M7 17L17 7" />
      <path d="M8 7h9v9" />
    </svg>
  );
}

function IconController({ size = 18, color = "currentColor" }) {
  return (
    <svg {...iconProps(size, color)}>
      <rect x="2.5" y="8" width="19" height="10" rx="4" />
      <path d="M7 11v4M5 13h4" />
      <circle cx="16" cy="11.5" r="0.9" fill={color} stroke="none" />
      <circle cx="18.5" cy="14" r="0.9" fill={color} stroke="none" />
    </svg>
  );
}

// ---- DATA ----
const projects = [
  {
    stage: "STAGE 01 — LIVE",
    title: "Motion Website",
    desc: "A front-end inspiration hub built for beginner developers to explore layout and animation ideas.",
    tags: ["HTML", "CSS", "JavaScript"],
    stats: ["★ 1", "SOLO BUILD"],
    demo: "https://motion-website-des.vercel.app",
    code: "https://github.com/houtaroudes/motion-website",
  },
  {
    stage: "STAGE 02 — LIVE",
    title: "PixelPodWeb",
    desc: "A full client-style school project built solo — a photobooth web app with a PHP + MySQL backend.",
    tags: ["PHP", "MySQL", "CSS", "JS"],
    stats: ["★ 2", "SOLO BUILD"],
    demo: "https://pixelpodweb.vercel.app",
    code: "https://github.com/houtaroudes/PixelPodWeb",
  },
  {
    stage: "STAGE 03",
    title: "Houtarou Cafe",
    desc: "A concept café site with a strict minimalist look — ordering flow, menu layout, and a reservation form.",
    tags: ["HTML", "CSS", "JavaScript"],
    stats: ["PERSONAL PROJECT"],
    code: "https://github.com/houtaroudes/houtarou-cafe",
  },
  {
    stage: "STAGE 04 — IN PROGRESS",
    title: "Random Learning WebDev",
    desc: "My ongoing training grounds — CSS spacing drills, JS nested-loop practice, and a POS system prototype.",
    tags: ["HTML", "CSS", "JS"],
    stats: ["★ 1", "LEARNING SANDBOX"],
    code: "https://github.com/houtaroudes/Random-Learning-WebDev",
  },
];

const loadout = [
  { icon: IconCode, label: "HTML5" },
  { icon: IconPalette, label: "CSS3" },
  { icon: IconBolt, label: "JavaScript" },
  { icon: IconServer, label: "PHP" },
  { icon: IconDatabase, label: "MySQL" },
  { icon: IconGitBranch, label: "Git & GitHub" },
  { icon: IconLayout, label: "System Design" },
  { icon: IconDevice, label: "Responsive UI" },
];

const hudStats = [
  { label: "Class", value: "Web Dev" },
  { label: "Status", value: "Student" },
  { label: "Repos", value: "4" },
  { label: "Party", value: "Open to Work" },
];

/* =============================================================
   PIXEL RAIN CANVAS — animated pixel particles falling down
   like a retro matrix vibe but with colored pixels. this is
   probably overengineered for a portfolio lol but it looks cool
   ============================================================= */
function PixelRain() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId;
    let particles = [];

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();

    function init() {
      particles = [];
      const count = Math.floor((canvas.width * canvas.height) / 8000);
      for (let i = 0; i < count; i++) {
        const colors = ["#3fe6ff", "#ff3f9c", "#ffd166", "rgba(255,255,255,0.6)"];
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2.5 + 1,
          speedY: Math.random() * 0.6 + 0.1,
          speedX: (Math.random() - 0.5) * 0.3,
          color: colors[Math.floor(Math.random() * colors.length)],
          opacity: Math.random() * 0.5 + 0.15,
        });
      }
    }
    init();

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of particles) {
        p.y += p.speedY;
        p.x += p.speedX;
        if (p.y > canvas.height) {
          p.y = -p.size;
          p.x = Math.random() * canvas.width;
        }
        ctx.globalAlpha = p.opacity;
        ctx.fillStyle = p.color;
        ctx.fillRect(p.x, p.y, p.size, p.size);
      }
      ctx.globalAlpha = 1;
      animId = requestAnimationFrame(animate);
    }

    // respect reduced motion — don't animate if user prefers it
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!prefersReduced.matches) {
      animate();
    }

    // re-init on resize
    const onResize = () => { resize(); init(); };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed", inset: 0, zIndex: 0,
        pointerEvents: "none", opacity: 0.6,
      }}
      aria-hidden="true"
    />
  );
}

/* =============================================================
   PIXEL REVEAL HOOK — elements fade in with a pixel-ish effect
   when they scroll into view. i used IntersectionObserver cuz
   that's the "proper" way to do scroll animations apparently
   ============================================================= */
function usePixelReveal(threshold = 0.12) {
  const ref = useRef(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          obs.unobserve(el);
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return [ref, revealed];
}

/* =============================================================
   PIXEL REVEAL WRAPPER — wraps any section with the animation
   ============================================================= */
function PixelSection({ children, className = "", ...rest }) {
  const [ref, revealed] = usePixelReveal(0.08);
  return (
    <section
      ref={ref}
      className={`pixel-section ${revealed ? "pixel-revealed" : ""} ${className}`}
      {...rest}
    >
      {children}
    </section>
  );
}

/* =============================================================
   TYPEWRITER HOOK — types text one character at a time
   cuz every portfolio needs a typewriter effect right?? lol
   ============================================================= */
function useTypewriter(text, speed = 40, startDelay = 500) {
  const [displayed, setDisplayed] = useState("");
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const startTimer = setTimeout(() => setStarted(true), startDelay);
    return () => clearTimeout(startTimer);
  }, [startDelay]);

  useEffect(() => {
    if (!started) return;
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) clearInterval(interval);
    }, speed);
    return () => clearInterval(interval);
  }, [started, text, speed]);

  return displayed;
}

/* =============================================================
   MAIN COMPONENT — the whole shebang
   ============================================================= */
export default function HoutarouDesPortfolio() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const typedText = useTypewriter(
    "Full-Stack Developer — building pixel-perfect worlds, one commit at a time",
    30,
    800
  );

  return (
    <>
      <style>{CSS}</style>

      {/* gotta wrap everything in #page so the CSS variables work */}
      <div id="page">
        {/* animated pixel rain background — my favorite part */}
        <PixelRain />

        {/* static background layers */}
        <div className="stars" aria-hidden="true" />
        <div className="stars2" aria-hidden="true" />
        <div className="vignette" aria-hidden="true" />
        <div className="crt" aria-hidden="true" />

        {/* ---- NAV ---- */}
        <nav className={scrolled ? "scrolled" : ""}>
          <div className="brand">
            <div className="brand-badge">
              <IconController size={17} color="var(--cyan)" />
            </div>
            <div className="brand-name">
              Houtarou<span>Des</span>
            </div>
          </div>
          <div className="nav-links">
            <a href="#stages">Stage Select</a>
            <a href="#loadout">Loadout</a>
            <a href="#lobby">Lobby</a>
          </div>
        </nav>

        {/* ---- HERO / LANDING ---- */}
        <header className="hero">
          <div className="hero-scan" aria-hidden="true" />

          <div className="hero-tag">PLAYER FILE — SLOT 01</div>
          <h1 className="hero-title">
            HOUTAROU<span className="accent">DES</span>
          </h1>
          <p className="hero-sub">
            <span className="type-cursor">
              {typedText}
              <span className="cursor-blink">|</span>
            </span>
          </p>
          <div className="hero-ctas">
            <a className="btn solid" href="#stages">
              View Projects
            </a>
            <a
              className="btn"
              href="https://github.com/houtaroudes"
              target="_blank"
              rel="noopener"
            >
              GitHub Profile <IconArrowUpRight size={13} />
            </a>
          </div>
          <div className="press-start">▸ SCROLL TO CONTINUE ▸</div>
        </header>

        {/* ---- HUD STAT BAR ---- */}
        <div className="hud">
          {hudStats.map((item) => (
            <div className="hud-cell" key={item.label}>
              <div className="hud-label">{item.label}</div>
              <div className="hud-value">{item.value}</div>
            </div>
          ))}
        </div>

        {/* ---- STAGE SELECT (projects) ---- */}
        <PixelSection className="section" id="stages">
          <div className="section-head">
            <div className="eyebrow">Cartridge Library</div>
            <h2 className="section-title">
              Stage <span className="accent">Select</span>
            </h2>
            <p className="section-desc">
              Every project below is a real build from my GitHub — insert a
              cartridge to see the code or play the live build.
            </p>
          </div>

          <div className="cart-grid">
            {projects.map((p) => (
              <article className="cart" key={p.title}>
                <div className="cart-num">{p.stage}</div>
                <h3 className="cart-title">{p.title}</h3>
                <p className="cart-desc">{p.desc}</p>

                <div className="cart-tags">
                  {p.tags.map((t) => (
                    <span className="tag" key={t}>{t}</span>
                  ))}
                </div>

                <div className="cart-stats">
                  {p.stats.map((s) => (
                    <span key={s}>{s}</span>
                  ))}
                </div>

                <div className="cart-actions">
                  {p.demo && (
                    <a className="primary" href={p.demo} target="_blank" rel="noopener">
                      <IconPlay size={13} /> Play Demo
                    </a>
                  )}
                  <a href={p.code} target="_blank" rel="noopener">
                    View Code
                  </a>
                </div>
              </article>
            ))}
          </div>
        </PixelSection>

        {/* ---- LOADOUT (skills) ---- */}
        <PixelSection className="section" id="loadout">
          <div className="section-head">
            <div className="eyebrow">Inventory</div>
            <h2 className="section-title">
              Current <span className="accent">Loadout</span>
            </h2>
            <p className="section-desc">The tools equipped for this run.</p>
          </div>
          <div className="loadout-grid">
            {loadout.map(({ icon: Icon, label }) => (
              <div className="slot" key={label}>
                <div className="slot-icon">
                  <Icon size={26} color="var(--gold)" />
                </div>
                <div className="slot-label">{label}</div>
              </div>
            ))}
          </div>
        </PixelSection>

        {/* ---- LOBBY (contact) ---- */}
        <PixelSection className="section" id="lobby">
          <div className="lobby">
            <div className="eyebrow">Multiplayer Lobby</div>
            <h2 className="lobby-title">Let's Build Something Together</h2>
            <p className="lobby-sub">
              Open for freelance gigs, school group projects, or just talking
              shop about pixel art and web dev.
            </p>
            <div className="lobby-actions">
              <a
                className="btn solid"
                href="https://github.com/houtaroudes"
                target="_blank"
                rel="noopener"
              >
                <IconGithub size={15} /> Join on GitHub
              </a>
              <a className="btn" href="mailto:houtaroudes@gmail.com">
                <IconMail size={15} /> Send a Message
              </a>
            </div>
          </div>
        </PixelSection>

        {/* ---- FOOTER ---- */}
        <footer>
          <p className="credits">
            GAME CREDITS — CODED BY <span className="hi">HOUTAROUDES</span> — 
            © 2026 — THANKS FOR PLAYING
          </p>
        </footer>
      </div>
    </>
  );
}

/* =============================================================
   CSS — ok this is the messy part lol. i just crammed all the
   styles in one template string so i don't have to deal with
   css files. sue me.

   updates from the old version:
   - pixel reveal animation on scroll (blocks slide up)
   - typewriter cursor effect in the hero
   - scan-in effect on page load (feels like an old TV turning on)
   - pixel rain canvas background
   - the "landing page" layout is just sections stacked nicely
   ============================================================= */
const CSS = `
  #page{
    --void:#070911;
    --panel:#10142e;
    --panel-2:#171c40;
    --line: rgba(80,225,255,0.28);
    --cyan:#3fe6ff;
    --cyan-dim: rgba(63,230,255,0.5);
    --magenta:#ff3f9c;
    --gold:#ffd166;
    --text:#eef0ff;
    --dim:#8489bd;
    --dimmer:#5a5f8c;
    --font-display:'Press Start 2P', monospace;
    --font-body:'Space Grotesk', sans-serif;
    --font-mono:'JetBrains Mono', monospace;

    background:var(--void);
    color:var(--text);
    font-family:var(--font-body);
    line-height:1.6;
    overflow-x:hidden;
    position:relative;
  }

  *, *::before, *::after{ box-sizing:border-box; margin:0; padding:0; }
  html{ scroll-behavior:smooth; }
  ::selection{ background:var(--cyan); color:var(--void); }

  /* ---- STARFIELD ---- */
  .stars, .stars2{
    position:fixed; inset:0; z-index:0; pointer-events:none;
    background-image:
      radial-gradient(1.5px 1.5px at 20% 30%, rgba(255,255,255,0.9), transparent),
      radial-gradient(1.5px 1.5px at 65% 15%, rgba(255,255,255,0.7), transparent),
      radial-gradient(1px 1px at 80% 60%, rgba(255,255,255,0.6), transparent),
      radial-gradient(1px 1px at 40% 80%, rgba(255,255,255,0.5), transparent),
      radial-gradient(1.5px 1.5px at 90% 40%, rgba(255,255,255,0.8), transparent),
      radial-gradient(1px 1px at 10% 65%, rgba(255,255,255,0.5), transparent),
      radial-gradient(1.5px 1.5px at 50% 50%, rgba(255,255,255,0.6), transparent);
    background-size: 600px 600px;
    animation: drift 90s linear infinite;
    opacity:0.7;
  }
  .stars2{ background-size: 900px 900px; animation-duration:140s; opacity:0.4; }
  @keyframes drift{ from{ background-position:0 0; } to{ background-position:-1000px 500px; } }

  /* ---- CRT SCANLINES ---- */
  .crt{
    position:fixed; inset:0; z-index:40; pointer-events:none; mix-blend-mode:overlay;
    background: repeating-linear-gradient( to bottom, rgba(255,255,255,0.035) 0px, rgba(255,255,255,0.035) 1px, transparent 1px, transparent 3px);
    opacity:0.5;
  }
  .vignette{
    position:fixed; inset:0; z-index:39; pointer-events:none;
    background: radial-gradient(120% 90% at 50% 40%, transparent 55%, rgba(3,4,12,0.75) 100%);
  }

  section, header, footer{ position:relative; z-index:1; }
  a{ color:inherit; text-decoration:none; }
  .eyebrow{
    font-family:var(--font-mono); font-size:0.72rem; letter-spacing:0.22em; text-transform:uppercase;
    color:var(--cyan); opacity:0.85;
  }

  /* ---- PIXEL SCROLL REVEAL ---- */
  .pixel-section{
    opacity:0;
    transform: translateY(40px) scale(0.97);
    transition: opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
  }
  .pixel-section.pixel-revealed{
    opacity:1;
    transform: translateY(0) scale(1);
  }
  @media (prefers-reduced-motion: reduce){
    .pixel-section{ opacity:1; transform: none; transition: none; }
    #page .hero-title{ animation:none; }
    #page .stars, #page .stars2{ animation:none; }
    .hero-scan{ animation:none; display:none; }
  }

  /* ---- HERO SCAN-IN ---- */
  .hero-scan{
    position:absolute; inset:0; z-index:-1;
    background: linear-gradient(to bottom, transparent 0%, var(--cyan) 50%, transparent 100%);
    opacity:0;
    animation: scanIn 1.2s ease-out forwards;
    pointer-events:none;
    mix-blend-mode:overlay;
  }
  @keyframes scanIn{
    0%{ opacity:0.8; transform:translateY(-100%); }
    60%{ opacity:0.4; transform:translateY(20%); }
    100%{ opacity:0; transform:translateY(0%); }
  }

  /* ---- NAV ---- */
  nav{
    position:fixed; top:0; left:0; right:0; z-index:30;
    display:flex; align-items:center; justify-content:space-between;
    padding:16px clamp(20px,4vw,56px);
    background:rgba(7,9,17,0.72); backdrop-filter:blur(10px);
    border-bottom:1px solid var(--line);
    transition: background 0.3s;
  }
  nav.scrolled{
    background:rgba(7,9,17,0.9);
    box-shadow:0 2px 30px rgba(63,230,255,0.08);
  }
  .brand{ display:flex; align-items:center; gap:12px; }
  .brand-badge{
    width:34px; height:34px; display:grid; place-items:center;
    background:var(--panel-2); border:2px solid var(--cyan); box-shadow:0 0 12px var(--cyan-dim);
  }
  .brand-name{ font-family:var(--font-display); font-size:0.78rem; letter-spacing:0.03em; }
  .brand-name span{ color:var(--magenta); }
  .nav-links{ display:flex; gap:28px; font-family:var(--font-mono); font-size:0.82rem; color:var(--dim); }
  .nav-links a{ position:relative; padding:4px 0; transition:color 0.2s; }
  .nav-links a:hover, .nav-links a:focus-visible{ color:var(--cyan); }
  .nav-links a::before{ content:'> '; color:var(--magenta); opacity:0; transition:opacity .2s; }
  .nav-links a:hover::before, .nav-links a:focus-visible::before{ opacity:1; }
  @media (max-width:720px){ .nav-links{ display:none; } }

  /* ---- HERO / LANDING ---- */
  .hero{
    min-height:100svh; display:flex; flex-direction:column; align-items:center; justify-content:center;
    text-align:center; padding:140px 20px 80px; gap:26px;
    position:relative; overflow:hidden;
  }
  .hero-tag{
    font-family:var(--font-mono); font-size:0.78rem; color:var(--gold); letter-spacing:0.15em;
    border:1px solid rgba(255,209,102,0.4); padding:6px 14px; background:rgba(255,209,102,0.06);
    animation: fadeSlideUp 0.8s ease 0.2s both;
  }
  .hero-title{
    font-family:var(--font-display); line-height:1.5; letter-spacing:0.02em;
    font-size:clamp(1.6rem, 5.4vw, 3.4rem);
    text-shadow: 0 0 14px var(--cyan-dim), 0 0 40px rgba(255,63,156,0.25);
    animation: flicker 5.5s infinite, fadeSlideUp 0.8s ease 0.4s both;
  }
  .hero-title .accent{ color:var(--magenta); }
  @keyframes flicker{
    0%, 92%, 100%{ opacity:1; }
    93%{ opacity:0.75; }
    94%{ opacity:1; }
    95%{ opacity:0.6; }
    96%{ opacity:1; }
  }
  @keyframes fadeSlideUp{
    from{ opacity:0; transform:translateY(30px); }
    to{ opacity:1; transform:translateY(0); }
  }

  .hero-sub{
    font-family:var(--font-mono); color:var(--dim); font-size:clamp(0.95rem,2vw,1.15rem);
    max-width:560px; min-height:3.5rem;
    animation: fadeSlideUp 0.8s ease 0.6s both;
  }
  .type-cursor{ color:var(--cyan); }
  .cursor-blink{
    animation: blink 0.8s steps(2) infinite;
    font-weight:700; margin-left:2px;
  }
  @keyframes blink{ 50%{ opacity:0; } }

  .hero-ctas{
    display:flex; gap:16px; flex-wrap:wrap; justify-content:center; margin-top:10px;
    animation: fadeSlideUp 0.8s ease 0.8s both;
  }
  .btn{
    font-family:var(--font-mono); font-weight:700; font-size:0.85rem; letter-spacing:0.04em;
    padding:14px 26px; border:2px solid var(--cyan); background:transparent; color:var(--cyan);
    cursor:pointer; text-transform:uppercase; transition:all .18s ease; display:inline-flex; align-items:center; gap:10px;
  }
  .btn:hover, .btn:focus-visible{ background:var(--cyan); color:var(--void); box-shadow:0 0 22px var(--cyan-dim); transform:translateY(-2px); }
  .btn.solid{ background:var(--magenta); border-color:var(--magenta); color:var(--void); box-shadow:0 0 18px rgba(255,63,156,0.35); }
  .btn.solid:hover{ background:transparent; color:var(--magenta); box-shadow:0 0 22px rgba(255,63,156,0.35); }

  .press-start{
    font-family:var(--font-mono); font-size:0.75rem; color:var(--dimmer); margin-top:36px;
    animation:blink 1.4s steps(2) infinite, fadeSlideUp 0.8s ease 1s both;
  }

  /* ---- HUD STAT BAR ---- */
  .hud{
    display:grid; grid-template-columns:repeat(4,1fr); max-width:960px; margin:0 auto;
    border:1px solid var(--line); background:linear-gradient(180deg, var(--panel), var(--panel-2));
    position:relative; z-index:1;
  }
  .hud-cell{ padding:20px; text-align:center; border-right:1px solid var(--line); }
  .hud-cell:last-child{ border-right:none; }
  .hud-label{ font-family:var(--font-mono); font-size:0.65rem; letter-spacing:0.18em; color:var(--dim); text-transform:uppercase; }
  .hud-value{ font-family:var(--font-display); font-size:1rem; color:var(--gold); margin-top:10px; }
  @media (max-width:640px){
    .hud{ grid-template-columns:repeat(2,1fr); }
    .hud-cell:nth-child(2){ border-right:none; }
    .hud-cell{ border-bottom:1px solid var(--line); }
  }

  /* ---- SECTION SHELL ---- */
  .section{ padding:110px clamp(20px,5vw,64px); max-width:1180px; margin:0 auto; }
  .section-head{ text-align:center; margin-bottom:56px; }
  .section-title{ font-family:var(--font-display); font-size:clamp(1.1rem,2.6vw,1.7rem); margin-top:14px; }
  .section-title .accent{ color:var(--cyan); }
  .section-desc{ color:var(--dim); max-width:600px; margin:16px auto 0; font-size:0.98rem; }

  /* ---- STAGE SELECT (projects) ---- */
  .cart-grid{ display:grid; grid-template-columns:repeat(2,1fr); gap:28px; }
  @media (max-width:820px){ .cart-grid{ grid-template-columns:1fr; } }

  .cart{
    background:linear-gradient(160deg, var(--panel) 0%, #0c0f24 100%);
    border:1px solid var(--line); padding:26px 24px 24px; position:relative;
    transition:transform .25s ease, box-shadow .25s ease, border-color .25s ease;
  }
  .cart::before{
    content:''; position:absolute; top:-9px; left:24px; width:46px; height:9px;
    background:var(--panel-2); border:1px solid var(--line); border-bottom:none;
  }
  .cart:hover, .cart:focus-within{
    transform:translateY(-6px); border-color:var(--cyan); box-shadow:0 14px 34px rgba(63,230,255,0.14);
  }
  .cart-num{ font-family:var(--font-mono); font-size:0.7rem; color:var(--magenta); letter-spacing:0.1em; }
  .cart-title{ font-family:var(--font-display); font-size:1rem; margin:12px 0 12px; color:var(--text); }
  .cart-desc{ color:var(--dim); font-size:0.92rem; margin-bottom:16px; min-height:66px; }
  .cart-tags{ display:flex; flex-wrap:wrap; gap:8px; margin-bottom:20px; }
  .tag{
    font-family:var(--font-mono); font-size:0.68rem; padding:4px 9px; border:1px solid var(--line);
    color:var(--cyan); background:rgba(63,230,255,0.05); letter-spacing:0.02em;
  }
  .cart-stats{ display:flex; gap:18px; font-family:var(--font-mono); font-size:0.72rem; color:var(--dimmer); margin-bottom:18px; }
  .cart-actions{ display:flex; gap:12px; flex-wrap:wrap; }
  .cart-actions a{
    font-family:var(--font-mono); font-size:0.72rem; padding:9px 14px; border:1px solid var(--dim);
    color:var(--dim); transition:all .2s; display:inline-flex; align-items:center; gap:6px;
  }
  .cart-actions a.primary{ border-color:var(--gold); color:var(--gold); }
  .cart-actions a:hover{ border-color:var(--cyan); color:var(--cyan); background:rgba(63,230,255,0.06); }

  /* ---- LOADOUT (skills) ---- */
  .loadout-grid{ display:grid; grid-template-columns:repeat(auto-fill,minmax(140px,1fr)); gap:16px; }
  .slot{
    aspect-ratio:1; border:1px solid var(--line); background:var(--panel);
    display:flex; flex-direction:column; align-items:center; justify-content:center; gap:8px;
    transition:all .2s;
  }
  .slot:hover{ border-color:var(--gold); background:rgba(255,209,102,0.05); transform:scale(1.03); }
  .slot-icon{ display:flex; align-items:center; justify-content:center; }
  .slot-label{ font-family:var(--font-mono); font-size:0.72rem; color:var(--dim); text-align:center; padding:0 6px; }

  /* ---- LOBBY (contact) ---- */
  .lobby{
    background:linear-gradient(160deg, var(--panel-2), var(--panel));
    border:1px solid var(--line); padding:48px clamp(20px,5vw,56px); text-align:center;
  }
  .lobby-title{ font-family:var(--font-display); font-size:1.1rem; margin-bottom:16px; }
  .lobby-sub{ color:var(--dim); max-width:520px; margin:0 auto 32px; }
  .lobby-actions{ display:flex; gap:16px; justify-content:center; flex-wrap:wrap; }

  /* ---- FOOTER ---- */
  footer{ padding:50px 20px 60px; text-align:center; border-top:1px solid var(--line); position:relative; z-index:1; }
  .credits{ font-family:var(--font-mono); font-size:0.72rem; color:var(--dimmer); letter-spacing:0.05em; }
  .credits .hi{ color:var(--magenta); }

  :focus-visible{ outline:2px solid var(--gold); outline-offset:3px; }
`;
