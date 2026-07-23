# 🌟 HoutarouDes — Portfolio

> Full-stack developer portfolio with a retro pixel-art theme. Built with React, Vite, and hand-crafted pixel icons.

[![Vercel](https://img.shields.io/badge/deployed%20on-Vercel-000?logo=vercel)]()
[![React](https://img.shields.io/badge/React-18-61dafb?logo=react)]()
[![Vite](https://img.shields.io/badge/Vite-6-646cff?logo=vite)]()

🌐 **Live site:** [houtaroudes-portfolio.vercel.app](https://houtaroudes-portfolio.vercel.app)

---

## ⚡ Features

### 🎨 Pixel Art Icon System
Hand-crafted pixel SVG icons for every section — stars, diamonds, bolts, trophies, and more. Each icon is built from raw coordinate data with no external dependencies.

### 🌙 Dark / Light Mode
Toggle between dark (void) and light themes. Preference persists via localStorage.

### 🔢 Animated Count-Up Stats
Hero statistics (projects, technologies, exercises) animate from 0 to their target values on scroll using `requestAnimationFrame` with ease-out timing.

### 🪟 Project Detail Modal
Click "Details" on any project card to open a full modal with ESC close, backdrop blur, scale-in animation, and body scroll lock.

### 🎬 Scroll Reveal System
Sections animate in as you scroll — supporting up, left, right, scale, and fade variants with staggered child animations.

### 🎯 Active Nav Highlighting
The navigation bar automatically highlights the current section based on scroll position using `IntersectionObserver`.

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| **React 18** | UI framework |
| **Vite 6** | Build tool & dev server |
| **CSS** | Styling with custom properties |
| **Canvas API** | Animated pixel backgrounds (starfield, rain) |
| **IntersectionObserver** | Scroll-reveal animations |

## 🧩 Pixel Icon System

The `PIXEL_ART` object contains 20+ hand-crafted pixel icons:
- ⭐ `star` · `diamond` · `bolt` · `trophy` · `sword`
- 🎨 `palette` · `sparkle` · `eye` · `search` · `close`
- 📁 `file` · `note` · `flag` · `link` · `expand`
- ✏️ `pencil` · `wrench` · `bulb` · `play` · `reset` · `seedling`
- ⛰️ `mountain` · `cloud` · `check`

Each icon is defined as a grid of pixel coordinates rendered as SVG `<rect>` elements.

## 🎨 Design

- **Theme:** Retro pixel-art with neon accents
- **Colors:** Cyan (`#3fe6ff`), magenta (`#ff3f9c`), gold (`#ffd166`)
- **Fonts:** Press Start 2P (display), Space Grotesk (body), JetBrains Mono (code)
- **Background:** Fixed canvas starfield + pixel rain + mountain parallax
- **Easing:** Custom cubic-bezier curves (`--ease-out`, `--wobble`)

## 🚀 Getting Started

```bash
# Clone the repo
git clone https://github.com/houtaroudes/houtaroudes-portfolio.git
cd houtaroudes-portfolio

# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build
```

## 📁 Project Structure

```
portfolio/
├── src/
│   ├── App.jsx          # Main React component (all-in-one)
│   └── main.jsx         # Entry point
├── index.html           # HTML template
├── package.json         # Dependencies
├── vite.config.js       # Vite configuration
└── vercel.json          # Vercel deployment config
```

## 📊 Stats

- **Projects:** 4 (Motion Website, PixelPodWeb, Houtarou Cafe, Learning WebDev Hub)
- **Technologies:** 8 (HTML5, CSS3, JS, React, PHP, MySQL, Git, Vite)
- **Icons:** 20+ hand-crafted pixel SVGs
- **Sections:** Hero with typewriter effect, projects with filter, skills grid, featured project, contact

## 👤 Author

**HoutarouDes** — Full-stack developer building pixel-perfect worlds, one commit at a time.

---

<p align="center">
  <sub>Built with React, Vite, and pixel art</sub>
</p>
