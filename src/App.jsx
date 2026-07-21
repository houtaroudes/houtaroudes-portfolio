import React from "react";

/*
  =====================================================
  HoutarouDes Portfolio — React version
  =====================================================
  Converted from my old plain HTML/CSS/JS file into one
  React component. I kept the same "retro game" vibe
  (stage select, loadout, lobby lol) but now everything
  is broken into small pieces + data arrays so I'm not
  copy-pasting the same card markup 4 times.

  Icons: I wanted to use the actual reicon-react package
  (from reicon.dev) but this sandbox only allows a fixed
  list of npm packages and reicon-react isn't on it, so
  I just redrew the icons myself using the same style
  reicon uses (24x24 box, 1.5px stroke, rounded corners).
  If you paste this into a real project with reicon-react
  installed, you can literally delete the icon components
  below and swap in the real import, e.g.:
    import { Html5, Palette, Bolt, Database } from "reicon-react";
*/

/* -----------------------------------------------------
   ICONS
   Simple outline icons, all 24x24, stroke-based, no fill.
   Basically doing what reicon does but by hand since I
   can't npm install here.
----------------------------------------------------- */
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

// </> tag icon, for HTML
function IconCode({ size = 22, color = "currentColor" }) {
  return (
    <svg {...iconProps(size, color)}>
      <path d="M8.5 7L3.5 12l5 5" />
      <path d="M15.5 7l5 5-5 5" />
      <path d="M13.5 4.5l-3 15" />
    </svg>
  );
}

// paint swatch, for CSS
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

// lightning bolt, for JavaScript
function IconBolt({ size = 22, color = "currentColor" }) {
  return (
    <svg {...iconProps(size, color)}>
      <path d="M13 3L5 13.5h5.5L11 21l8-11h-6l0-7z" />
    </svg>
  );
}

// server rack, for PHP (backend)
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

// db cylinder, for MySQL
function IconDatabase({ size = 22, color = "currentColor" }) {
  return (
    <svg {...iconProps(size, color)}>
      <ellipse cx="12" cy="5.5" rx="7.5" ry="2.5" />
      <path d="M4.5 5.5v13c0 1.4 3.4 2.5 7.5 2.5s7.5-1.1 7.5-2.5v-13" />
      <path d="M4.5 12c0 1.4 3.4 2.5 7.5 2.5s7.5-1.1 7.5-2.5" />
    </svg>
  );
}

// branching path, for Git & GitHub
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

// blueprint / grid, for System Design
function IconLayout({ size = 22, color = "currentColor" }) {
  return (
    <svg {...iconProps(size, color)}>
      <rect x="3.5" y="4" width="17" height="16" rx="1.5" />
      <path d="M3.5 9.5h17" />
      <path d="M9 9.5V20" />
    </svg>
  );
}

// phone outline, for Responsive UI
function IconDevice({ size = 22, color = "currentColor" }) {
  return (
    <svg {...iconProps(size, color)}>
      <rect x="7" y="2.5" width="10" height="19" rx="2" />
      <path d="M11 19h2" />
    </svg>
  );
}

// github mark (kept simple/outline, not the real logo shape exactly)
function IconGithub({ size = 20, color = "currentColor" }) {
  return (
    <svg {...iconProps(size, color)}>
      <path d="M9 19c-4 1.2-4-2.1-5.5-2.5M17 22v-3.2c0-.9-.3-1.5-.6-1.8 2.1-.2 4.3-1 4.3-4.7 0-1-.4-1.9-1-2.6.1-.3.4-1.3-.1-2.7 0 0-.9-.3-2.9 1a10 10 0 00-5.4 0c-2-1.3-2.9-1-2.9-1-.5 1.4-.2 2.4-.1 2.7-.6.7-1 1.6-1 2.6 0 3.7 2.2 4.5 4.3 4.7-.3.3-.5.7-.6 1.4V22" />
    </svg>
  );
}

// envelope, for contact / email
function IconMail({ size = 20, color = "currentColor" }) {
  return (
    <svg {...iconProps(size, color)}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3.5 6.5L12 13l8.5-6.5" />
    </svg>
  );
}

// play triangle, for demo buttons
function IconPlay({ size = 16, color = "currentColor" }) {
  return (
    <svg {...iconProps(size, color)}>
      <path d="M7 4.5v15l13-7.5-13-7.5z" strokeLinejoin="round" />
    </svg>
  );
}

// diagonal arrow, for outbound links
function IconArrowUpRight({ size = 14, color = "currentColor" }) {
  return (
    <svg {...iconProps(size, color)}>
      <path d="M7 17L17 7" />
      <path d="M8 7h9v9" />
    </svg>
  );
}

// game controller, used for the little brand badge instead of "HD" text
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

/* -----------------------------------------------------
   DATA
   Putting the content in arrays so the JSX below is just
   a .map() instead of me hand-typing 4 near-identical
   <article> blocks like in the old HTML file.
----------------------------------------------------- */
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
    // no demo link for this one, only code
    code: "https://github.com/houtaroudes/houtarou-cafe",
  },
  {
    stage: "STAGE 04 — IN PROGRESS",
    title: "Random Learning WebDev",
    desc: "My ongoing training grounds — CSS spacing drills, JS nested-loop practice, and a POS system prototype for a café thesis project.",
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

const hud = [
  { label: "Class", value: "Web Dev" },
  { label: "Status", value: "Student" },
  { label: "Repos Cleared", value: "4" },
  { label: "Party", value: "Open to Work" },
];

/* -----------------------------------------------------
   MAIN COMPONENT
----------------------------------------------------- */
export default function HoutarouDesPortfolio() {
  return (
    <>
      <style>{CSS}</style>

      <div id="page">
        {/* background layers, just decoration, no content in here */}
        <div className="stars" aria-hidden="true" />
        <div className="stars2" aria-hidden="true" />
        <div className="vignette" aria-hidden="true" />
        <div className="crt" aria-hidden="true" />

        {/* ---------- NAV ---------- */}
        <nav>
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

        {/* ---------- HERO ---------- */}
        <header className="hero">
          <div className="hero-tag">PLAYER FILE — SLOT 01</div>
          <h1 className="hero-title">
            HOUTAROU<span className="accent">DES</span>
          </h1>
          <p className="hero-sub">
            <span className="type">
              Full-Stack Developer — building pixel-perfect worlds, one commit at a time
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

        {/* ---------- HUD STAT BAR ---------- */}
        <div className="hud">
          {hud.map((item) => (
            <div className="hud-cell" key={item.label}>
              <div className="hud-label">{item.label}</div>
              <div className="hud-value">{item.value}</div>
            </div>
          ))}
        </div>

        {/* ---------- STAGE SELECT (projects) ---------- */}
        <section className="section" id="stages">
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
                    <span className="tag" key={t}>
                      {t}
                    </span>
                  ))}
                </div>

                <div className="cart-stats">
                  {p.stats.map((s) => (
                    <span key={s}>{s}</span>
                  ))}
                </div>

                <div className="cart-actions">
                  {p.demo && (
                    <a
                      className="primary"
                      href={p.demo}
                      target="_blank"
                      rel="noopener"
                    >
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
        </section>

        {/* ---------- LOADOUT (skills) ---------- */}
        <section className="section" id="loadout">
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
        </section>

        {/* ---------- LOBBY (contact) ---------- */}
        <section className="section" id="lobby">
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
        </section>

        {/* ---------- FOOTER ---------- */}
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

/* -----------------------------------------------------
   CSS
   Basically the exact same styles from my old <style>
   tag, just moved into a template string and injected
   with a <style> element up in the JSX. Didn't rename
   any classes so it was easier to copy over without
   breaking anything.
----------------------------------------------------- */
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

  #page *{ box-sizing:border-box; }
  #page h1, #page h2, #page h3, #page p{ margin:0; }
  #page{ scroll-behavior:smooth; }

  /* ambient starfield, just css gradients moving in a loop */
  #page .stars, #page .stars2{
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
  #page .stars2{ background-size: 900px 900px; animation-duration:140s; opacity:0.4; }
  @keyframes drift{ from{ background-position:0 0; } to{ background-position:-1000px 500px; } }

  /* scanline / crt overlay, gives it that old monitor look */
  #page .crt{
    position:fixed; inset:0; z-index:40; pointer-events:none; mix-blend-mode:overlay;
    background: repeating-linear-gradient( to bottom, rgba(255,255,255,0.035) 0px, rgba(255,255,255,0.035) 1px, transparent 1px, transparent 3px);
    opacity:0.5;
  }
  #page .vignette{
    position:fixed; inset:0; z-index:39; pointer-events:none;
    background: radial-gradient(120% 90% at 50% 40%, transparent 55%, rgba(3,4,12,0.75) 100%);
  }

  #page section, #page header, #page footer{ position:relative; z-index:1; }

  #page a{ color:inherit; text-decoration:none; }
  #page .eyebrow{
    font-family:var(--font-mono); font-size:0.72rem; letter-spacing:0.22em; text-transform:uppercase;
    color:var(--cyan); opacity:0.85;
  }

  /* ---------- NAV ---------- */
  #page nav{
    position:fixed; top:0; left:0; right:0; z-index:30;
    display:flex; align-items:center; justify-content:space-between;
    padding:16px clamp(20px,4vw,56px);
    background:rgba(7,9,17,0.72); backdrop-filter:blur(10px);
    border-bottom:1px solid var(--line);
  }
  #page .brand{ display:flex; align-items:center; gap:12px; }
  #page .brand-badge{
    width:34px; height:34px; display:grid; place-items:center;
    background:var(--panel-2); border:2px solid var(--cyan); box-shadow:0 0 12px var(--cyan-dim);
  }
  #page .brand-name{ font-family:var(--font-display); font-size:0.78rem; letter-spacing:0.03em; }
  #page .brand-name span{ color:var(--magenta); }
  #page .nav-links{ display:flex; gap:28px; font-family:var(--font-mono); font-size:0.82rem; color:var(--dim); }
  #page .nav-links a{ position:relative; padding:4px 0; transition:color 0.2s; }
  #page .nav-links a:hover, #page .nav-links a:focus-visible{ color:var(--cyan); }
  #page .nav-links a::before{ content:'> '; color:var(--magenta); opacity:0; transition:opacity .2s; }
  #page .nav-links a:hover::before, #page .nav-links a:focus-visible::before{ opacity:1; }
  @media (max-width:720px){ #page .nav-links{ display:none; } }

  /* ---------- HERO ---------- */
  #page .hero{
    min-height:100svh; display:flex; flex-direction:column; align-items:center; justify-content:center;
    text-align:center; padding:140px 20px 80px; gap:26px;
  }
  #page .hero-tag{
    font-family:var(--font-mono); font-size:0.78rem; color:var(--gold); letter-spacing:0.15em;
    border:1px solid rgba(255,209,102,0.4); padding:6px 14px; background:rgba(255,209,102,0.06);
  }
  #page .hero-title{
    font-family:var(--font-display); line-height:1.5; letter-spacing:0.02em;
    font-size:clamp(1.6rem, 5.4vw, 3.4rem);
    text-shadow: 0 0 14px var(--cyan-dim), 0 0 40px rgba(255,63,156,0.25);
    animation: flicker 5.5s infinite;
  }
  #page .hero-title .accent{ color:var(--magenta); }
  @keyframes flicker{
    0%, 92%, 100%{ opacity:1; }
    93%{ opacity:0.75; }
    94%{ opacity:1; }
    95%{ opacity:0.6; }
    96%{ opacity:1; }
  }
  @media (prefers-reduced-motion:reduce){
    #page .hero-title{ animation:none; }
    #page .stars, #page .stars2{ animation:none; }
  }

  #page .hero-sub{
    font-family:var(--font-mono); color:var(--dim); font-size:clamp(0.95rem,2vw,1.15rem);
    max-width:560px;
  }
  #page .hero-sub .type{ color:var(--cyan); border-right:2px solid var(--cyan); padding-right:4px; }

  #page .hero-ctas{ display:flex; gap:16px; flex-wrap:wrap; justify-content:center; margin-top:10px; }
  #page .btn{
    font-family:var(--font-mono); font-weight:700; font-size:0.85rem; letter-spacing:0.04em;
    padding:14px 26px; border:2px solid var(--cyan); background:transparent; color:var(--cyan);
    cursor:pointer; text-transform:uppercase; transition:all .18s ease; display:inline-flex; align-items:center; gap:10px;
  }
  #page .btn:hover, #page .btn:focus-visible{ background:var(--cyan); color:var(--void); box-shadow:0 0 22px var(--cyan-dim); transform:translateY(-2px); }
  #page .btn.solid{ background:var(--magenta); border-color:var(--magenta); color:var(--void); box-shadow:0 0 18px rgba(255,63,156,0.35); }
  #page .btn.solid:hover{ background:transparent; color:var(--magenta); box-shadow:0 0 22px rgba(255,63,156,0.35); }

  #page .press-start{ font-family:var(--font-mono); font-size:0.75rem; color:var(--dimmer); margin-top:36px; animation:blink 1.4s steps(2) infinite; }
  @keyframes blink{ 50%{ opacity:0.15; } }

  /* ---------- HUD STAT BAR ---------- */
  #page .hud{
    display:grid; grid-template-columns:repeat(4,1fr); max-width:960px; margin:0 auto;
    border:1px solid var(--line); background:linear-gradient(180deg, var(--panel), var(--panel-2));
  }
  #page .hud-cell{ padding:20px; text-align:center; border-right:1px solid var(--line); }
  #page .hud-cell:last-child{ border-right:none; }
  #page .hud-label{ font-family:var(--font-mono); font-size:0.65rem; letter-spacing:0.18em; color:var(--dim); text-transform:uppercase; }
  #page .hud-value{ font-family:var(--font-display); font-size:1rem; color:var(--gold); margin-top:10px; }
  @media (max-width:640px){
    #page .hud{ grid-template-columns:repeat(2,1fr); }
    #page .hud-cell:nth-child(2){ border-right:none; }
    #page .hud-cell{ border-bottom:1px solid var(--line); }
  }

  /* ---------- SECTION SHELL ---------- */
  #page .section{ padding:110px clamp(20px,5vw,64px); max-width:1180px; margin:0 auto; }
  #page .section-head{ text-align:center; margin-bottom:56px; }
  #page .section-title{ font-family:var(--font-display); font-size:clamp(1.1rem,2.6vw,1.7rem); margin-top:14px; }
  #page .section-title .accent{ color:var(--cyan); }
  #page .section-desc{ color:var(--dim); max-width:600px; margin:16px auto 0; font-size:0.98rem; }

  /* ---------- STAGE SELECT (projects) ---------- */
  #page .cart-grid{ display:grid; grid-template-columns:repeat(2,1fr); gap:28px; }
  @media (max-width:820px){ #page .cart-grid{ grid-template-columns:1fr; } }

  #page .cart{
    background:linear-gradient(160deg, var(--panel) 0%, #0c0f24 100%);
    border:1px solid var(--line); padding:26px 24px 24px; position:relative;
    transition:transform .25s ease, box-shadow .25s ease, border-color .25s ease;
  }
  #page .cart::before{
    content:''; position:absolute; top:-9px; left:24px; width:46px; height:9px;
    background:var(--panel-2); border:1px solid var(--line); border-bottom:none;
  }
  #page .cart:hover, #page .cart:focus-within{
    transform:translateY(-6px); border-color:var(--cyan); box-shadow:0 14px 34px rgba(63,230,255,0.14);
  }
  #page .cart-num{ font-family:var(--font-mono); font-size:0.7rem; color:var(--magenta); letter-spacing:0.1em; }
  #page .cart-title{ font-family:var(--font-display); font-size:1rem; margin:12px 0 12px; color:var(--text); }
  #page .cart-desc{ color:var(--dim); font-size:0.92rem; margin-bottom:16px; min-height:66px; }
  #page .cart-tags{ display:flex; flex-wrap:wrap; gap:8px; margin-bottom:20px; }
  #page .tag{
    font-family:var(--font-mono); font-size:0.68rem; padding:4px 9px; border:1px solid var(--line);
    color:var(--cyan); background:rgba(63,230,255,0.05); letter-spacing:0.02em;
  }
  #page .cart-stats{ display:flex; gap:18px; font-family:var(--font-mono); font-size:0.72rem; color:var(--dimmer); margin-bottom:18px; }
  #page .cart-actions{ display:flex; gap:12px; flex-wrap:wrap; }
  #page .cart-actions a{
    font-family:var(--font-mono); font-size:0.72rem; padding:9px 14px; border:1px solid var(--dim);
    color:var(--dim); transition:all .2s; display:inline-flex; align-items:center; gap:6px;
  }
  #page .cart-actions a.primary{ border-color:var(--gold); color:var(--gold); }
  #page .cart-actions a:hover{ border-color:var(--cyan); color:var(--cyan); background:rgba(63,230,255,0.06); }

  /* ---------- LOADOUT (skills) ---------- */
  #page .loadout-grid{ display:grid; grid-template-columns:repeat(auto-fill,minmax(140px,1fr)); gap:16px; }
  #page .slot{
    aspect-ratio:1; border:1px solid var(--line); background:var(--panel);
    display:flex; flex-direction:column; align-items:center; justify-content:center; gap:8px;
    transition:all .2s;
  }
  #page .slot:hover{ border-color:var(--gold); background:rgba(255,209,102,0.05); transform:scale(1.03); }
  #page .slot-icon{ display:flex; align-items:center; justify-content:center; }
  #page .slot-label{ font-family:var(--font-mono); font-size:0.72rem; color:var(--dim); text-align:center; padding:0 6px; }

  /* ---------- LOBBY (contact) ---------- */
  #page .lobby{
    background:linear-gradient(160deg, var(--panel-2), var(--panel));
    border:1px solid var(--line); padding:48px clamp(20px,5vw,56px); text-align:center;
  }
  #page .lobby-title{ font-family:var(--font-display); font-size:1.1rem; margin-bottom:16px; }
  #page .lobby-sub{ color:var(--dim); max-width:520px; margin:0 auto 32px; }
  #page .lobby-actions{ display:flex; gap:16px; justify-content:center; flex-wrap:wrap; }

  /* ---------- FOOTER ---------- */
  #page footer{ padding:50px 20px 60px; text-align:center; border-top:1px solid var(--line); }
  #page .credits{ font-family:var(--font-mono); font-size:0.72rem; color:var(--dimmer); letter-spacing:0.05em; }
  #page .credits .hi{ color:var(--magenta); }

  #page :focus-visible{ outline:2px solid var(--gold); outline-offset:3px; }
`;
