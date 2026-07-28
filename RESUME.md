# 🎮 Resume Guide — HoutarouDes Portfolio

To resume: Launch Freebuff and say **"Continue from my RESUME.md"**.

---

## 📋 Project

| Project | Local Path | Repo | Live URL |
|---------|-----------|------|----------|
| **v1 — Game Portfolio** | `C:\Users\brysa\portfolio-clone` | `houtaroudes/houtaroudes-portfolio` | [houtaroudes-game-portfolio.vercel.app](https://houtaroudes-game-portfolio.vercel.app) |
| **v2 — Simple Portfolio** | `C:\Users\brysa\houtaroudes-portfolio-v2` | `houtaroudes/houtaroudes-portfolio-v2` | [houtaroudes-myportfolio.vercel.app](https://houtaroudes-myportfolio.vercel.app) |
| **Learning Hub** | `C:\Users\brysa\Random-Learning-WebDev` | `houtaroudes/Random-Learning-WebDev` | [random-learning-webdev-site.vercel.app](https://random-learning-webdev-site.vercel.app) |
| **Modern Filipino Homes** | `C:\Users\brysa\Modern-Filipino-Homes` | — | [modern-filipino-homes.vercel.app](https://modern-filipino-homes.vercel.app) |

---

## ✅ Full Change History

### Session 1 — Initial Build & Animation Overhaul
- Full pixel icon system (PIXEL_ART dictionary with 20+ icons: star, palette, sparkle, bolt, sword, trophy, check, wrench, file, eye, pencil, bulb, reset, seedling, search, close, play, link, diamond, flag, note, mountain, cloud, expand, compass, clock, mail)
- `PxIcon` component for rendering pixel art SVGs
- Dark mode toggle with localStorage persistence + smooth CSS transitions
- `PixelBackground` — canvas starfield + mountains + clouds
- `PixelRain` — falling colored pixel rain
- `ScrollProgress` — top progress bar synced to scroll
- `ScrollToTop` — floating back-to-top button
- `RealtimeClock` — live HH:MM:SS clock in nav
- `CountUpValue` — animated counters (IntersectionObserver + requestAnimationFrame)
- `ProjectModal` — project detail popup with ESC close + backdrop click
- `CycleTypewriter` — multi-phrase typing/deleting animation
- `AttentionGrabber` — scroll-triggered reveal
- `useReveal` / `RS` — scroll reveal section components
- `useActiveSection` — nav link highlighting
- `PixelDivider` — animated pixel-art section divider
- Skill badges, project cards, filter bar
- XP bar / level system
- Intro overlay with stacked name animation
- framer-motion layout animations, stagger children, scroll reveals
- Dark/light theme with CSS custom properties

### Session 2 — Intro Loading Screen
- `PixelLoader` — canvas-based intro with 8×8 grid fill animation
- Two-phase animation: grid fill → name reveal ("HOUTAROUDES")
- Progress bar with percentage
- Boot text with typewriter effect
- `IntroOverlay` — stacked name "HOUTAROU / DES" with letter animations
- Clean intro flow: PixelLoader → IntroOverlay → Hero content

### Session 3 — PixelTrail Cursor Effect
- Integrated `<PixelTrail />` from React Bits (three.js + @react-three/fiber)
- Mouse-following pixel trail with gooey filter
- Customizable grid size, trail age, color

### Session 4 — Major Fixes & Tweaks
- Removed sidebar (user didn't like it)
- Fixed hero text positioning: name left, typewriter right
- Changed name to stacked layout — HOUTAROU on top, DES below
- Made intro play on every page load (removed localStorage caching)
- Reduced intro timing (grid 800ms, name 500ms, post-load 600ms)
- Switched pixel fill from random colors → single-cyan scanline (left-to-right)
- Pixel font (Press Start 2P) properly loaded via Google Fonts @import

### Session 5 — Email, Chat & Formspree
- Email button shows actual email: houtaroudes@gmail.com
- Multiplayer Lobby (contact) section with Formspree AJAX form
- Inline thank-you message on successful submission ("MESSAGE DELIVERED!")
- Form fields: name, email, message
- Hover sound on project cards (Web Audio API square wave)

### Session 6 — Intro Polish
- Faster intro timings (total ~1500ms from ~2700ms)
- 8×8 minimal pixel grid instead of larger grid
- Brighter progress bar with radial glow behind it
- Animated scanline sweep across the progress bar fill
- Retro startup sound: C5→E5→G5→C6 square wave arpeggio
- Font import for 'Press Start 2P' (pixel font)

### Session 7 — Intro Play Limit
- Intro now only plays 3 times per day per browser
- Uses localStorage (`_introCount` + `_introDate`)
- Resets at midnight (daily)
- After 3 plays, site loads directly into hero section

---

## 🎨 Design Tokens

| Token | Value | Usage |
|-------|-------|-------|
| `--void` | `#070911` | Dark background |
| `--cyan` | `#3fe6ff` | Primary accent |
| `--gold` | `#ffd166` | Featured/highlight |
| `--magenta` | `#ff3f9c` | Secondary accent |
| `--font-display` | `'Press Start 2P', monospace` | Pixel headings |
| `--font-body` | `'Space Grotesk', sans-serif` | Body text |
| `--font-mono` | `'JetBrains Mono', monospace` | Code/UI text |

---

## 🐛 Known Quirks
- Hover sound might not play on first interaction (browser autoplay policy)
- Press Start 2P font can look a bit chunky on small sizes — intentional retro vibe

---

## 💡 Ideas for Next Time
1. Add confetti burst when form is submitted
2. Keyboard shortcuts (`d` for dark mode, etc.)
3. Resume/CV download button
4. Project screenshot thumbnails in cards
5. Animated skill progress bars

---

### Session 8 — Created v2 Portfolio (houtaroudes-myportfolio)
- Created new React + Vite project `houtaroudes-portfolio-v2`
- Clean, light, minimalist design inspired by renlenon.vercel.app
- Profile picture with hover crossfade effect (pfp-default.jpg / pfp-hover.jpg)
- Hero layout: profile pic left, text right
- Mobile responsive stacking
- Installed `reicon-react` for icons (Sun, Moon, ArrowUp, Envelope, Link)
- Integrated `PixelTransition` from React Bits with gsap — 12×12 grid pixel animation
- HD favicon with dark rounded square + white "H"
- Title: `HoutarouDes | Portfolio` (pipe symbol instead of em dash)
- Dark/light theme toggle with localStorage persistence
- Default theme: light mode
- Dark theme: pure charcoal (#0a0a0a) with soft purple accent
- Footer: "Designed & built by HoutarouDes" (no copyright/heart)
- Version switch buttons: "Pixel Portfolio" on v2 → v1, "Simple Portfolio" on v1 → v2
- Pixel button in v1 uses `PxIcon name="sparkle"` (proper pixel art, not emoji)
- Clean commits with no RESUME.md traces

### Session 9 — v2 Polish & Fixes
- Replaced emoji section icons (⚡, 📁, 📬) with clean inline SVG diamonds
- Extracted `EyebrowIcon` component for DRY code
- Fixed version button style in v2 nav — no border, underline hover matching nav-links
- Removed duplicate `IconGithubOld` component
- Updated footer tagline: "Built with passion, powered by curiosity — no templates, just code."
- Removed copyright symbols (©) from both portfolios
- V1 footer: removed `&copy; 2026` — now just shows developer name

### Session 10 — Domain Renaming
- Vercel project renamed: `houtaroudes-portfolio-v2` → `houtaroudes-myportfolio`
- New URL: **https://houtaroudes-myportfolio.vercel.app**
- Vercel project renamed: `houtaroudes-portfolio` / `portfolio-clone` → `houtaroudes-game-portfolio`
- New URL: **https://houtaroudes-game-portfolio.vercel.app**
- All cross-version links updated accordingly

---

### Session 11 — Workspace Organization (Jul 28)
- All projects moved from `C:\WINDOWS\system32\` to `C:\Users\brysa\`
- Duplicate `random-learning-webdev-site` removed from system32
- v2 portfolio copied to `D:\Personal Build Code\` as backup
- RESUME.md updated with local paths for all projects
- New workflow: save projects in `C:\Users\brysa\` → copy to `D:\Personal Build Code\` when polished

### Session 12 — Modern Filipino Homes: Initial Build (Jul 28)
- Created `C:\Users\brysa\Modern-Filipino-Homes` — Vite + React project
- MONO-inspired split-text hero with word animations
- 3 house models: Tulay (₱2.85M), Silang (₱4.95M), Dakila (₱8.5M)
- 8 SVG architectural gallery illustrations (front facade, rooms, garden, community)
- Architecture section with floating words, detail cards, and spec meters
- Scroll progress bar, parallax scrolling, animated scroll reveals
- Dark theme with terracotta/gold Filipino-inspired palette

### Session 13 — MONO Refinements + Premium Effects (Jul 28)
- Replaced emoji icons with custom SVG icon system (sun, leaf, umbrella, zap, home, lock, mail, github, phone, mapPin, diamond)
- Magnetic buttons (cursor-following), 3D tilt cards on model cards
- Firefly particle background (canvas-based)
- Glass-morphism effects on nav, feature cards, model cards
- Construction reveal animation on gallery SVGs (clip-path build from ground up)
- Phase counter badge on gallery items ("Phase 1/5 → Complete")
- Hero accent highlights (top line, corner squares, side gradient line)
- Footer with email (houtaroudes@gmail.com) + GitHub link + developer credit
- Testimonials carousel with auto-rotate, AnimatePresence transitions, dot indicators

### Session 14 — MONO Editorial Style Alignment (Jul 28)
- **Word-by-word ScrollingText component** — MONO's signature scroll-reveal effect (words appear one at a time with rotateX animation)
- **Bold statement sections** — "Sustainable Architecture. Built for the Modern Filipino." and "Eco-Responsible. Tropical. Designed for Life."
- **Surface Options pricing** — Simplified 3-column pricing cards matching MONO's minimal style (no tilt, no specs overload, just name, desc, price + Inquire CTA button)
- **MONO-style closing statement** — "A home that combines contemporary design with Filipino heritage..."
- Removed particle background (too busy for MONO style)
- Removed 3D tilt cards (not aligned with MONO's clean aesthetic)
- Cleaned up dead CSS (old model-card styles, gallery-placeholder, duplicate footer, tilt-card, magnetic-btn)
- Removed unused `useCallback` import

### Session 15 — Hero House Carousel + Final Polish (Jul 28)
- Auto-rotating hero house carousel with Front Facade, Living Room, Terrace, Garden SVGs
- AnimatePresence transitions, dot indicators, view labels
- Surface Options CTA buttons ("Inquire →")
- All emoji icons replaced with SVGs
- Minimalist nav font (weight 400, size 0.7rem, letter-spacing 2px)
- MONO-style mobile menu with backdrop-filter blur
- Responsive hero layout
- Deployed to Vercel, pushed to GitHub

### Session 15.5 — `pv()` Helper Refactor (Jul 28)
- Extracted 8 duplicated `const pv = (p) => phaseAnim(p, phase)` wrapper functions into a single shared `phaseAnim(p, phase, options?)` utility
- All 8 gallery SVGs now call `phaseAnim(N, phase)` directly — 0 boilerplate wrappers remaining
- 40 direct calls across 8 SVGs × 5 phases
- FrontFacadeSVG uses custom animation params via optional 3rd argument
- Added Modern Filipino Homes to both v1 (game-portfolio) and v2 (my-portfolio) project showcases
- **Hero house carousel** — Auto-rotating gallery showing Front Facade, Living Room, Terrace, Garden SVGs with AnimatePresence transitions, dot indicators, and view labels
- Left text / right house visual layout (responsive 2-column grid)
- **Surface Options CTA buttons** — Added "Inquire →" buttons back to each pricing card (user reported they were missing)
- **All emoji icons replaced** — Contact section 📍📞✉️🙏 → SVG icons (mapPin, phone, mail, checkmark)
- **Minimalist nav font** — Reduced weight (700→400), smaller size (0.8rem→0.7rem), more uppercase letter-spacing (2px)
- **MONO-style mobile menu** — Full overlay with backdrop-filter blur, hover with increased letter-spacing animation
- Responsive hero layout (stacks on mobile)
- Deployed to Vercel: [modern-filipino-homes.vercel.app](https://modern-filipino-homes.vercel.app)
- GitHub: [houtaroudes/Modern-Filipino-Homes](https://github.com/houtaroudes/Modern-Filipino-Homes)

---

*Last session: July 28, 2026 — Modern Filipino Homes fully MONO-aligned 🏛️*

> ⚠️ This file is local-only. Not tracked by git.
