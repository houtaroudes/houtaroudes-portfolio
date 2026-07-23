
#  HoutarouDes — Portfolio

> Full-stack developer portfolio with a retro pixel-art theme. Built with React, Vite, and hand-crafted pixel icons.

[![Vercel](https://img.shields.io/badge/deployed%20on-Vercel-000?logo=vercel)]()
[![React](https://img.shields.io/badge/React-18-61dafb?logo=react)]()
[![Vite](https://img.shields.io/badge/Vite-6-646cff?logo=vite)]()

 **Live site:** [houtaroudes-portfolio.vercel.app](https://houtaroudes-portfolio.vercel.app)

---

##  Features

###  Pixel Art Icon System
Hand-crafted pixel SVG icons for every section — stars, diamonds, bolts, trophies, and more. Each icon is built from raw coordinate data with no external dependencies.

###  Dark / Light Mode
Toggle between dark (void) and light themes. Preference persists via localStorage.

###  Animated Count-Up Stats
Hero statistics (projects, technologies, exercises) animate from 0 to their target values on scroll using `requestAnimationFrame` with ease-out timing.

###  Project Detail Modal
Click "Details" on any project card to open a full modal with ESC close, backdrop blur, scale-in animation, and body scroll lock.

###  Scroll Reveal System
Sections animate in as you scroll — supporting up, left, right, scale, and fade variants with staggered child animations.

###  Active Nav Highlighting
The navigation bar automatically highlights the current section based on scroll position using `IntersectionObserver`.

##  Tech Stack

| Technology | Purpose |
|---|---|
| **React 18** | UI framework |
| **Vite 6** | Build tool & dev server |
| **CSS** | Styling with custom properties |
| **Canvas API** | Animated pixel backgrounds (starfield, rain) |
| **IntersectionObserver** | Scroll-reveal animations |

##  Pixel Icon System

The `PIXEL_ART` object contains 20+ hand-crafted pixel icons:
-  `star` · `diamond` · `bolt` · `trophy` · `sword`
-  `palette` · `sparkle` · `eye` · `search` · `close`
-  `file` · `note` · `flag` · `link` · `expand`
-  `pencil` · `wrench` · `bulb` · `play` · `reset` · `seedling`
-  `mountain` · `cloud` · `check`

Each icon is defined as a grid of pixel coordinates rendered as SVG `<rect>` elements.

##  Design

- **Theme:** Retro pixel-art with neon accents
- **Colors:** Cyan (`#3fe6ff`), magenta (`#ff3f9c`), gold (`#ffd166`)
- **Fonts:** Press Start 2P (display), Space Grotesk (body), JetBrains Mono (code)
- **Background:** Fixed canvas starfield + pixel rain + mountain parallax
- **Easing:** Custom cubic-bezier curves (`--ease-out`, `--wobble`)

##  Getting Started

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

##  Project Structure

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

##  Stats

- **Projects:** 4 (Motion Website, PixelPodWeb, Houtarou Cafe, Learning WebDev Hub)
- **Technologies:** 8 (HTML5, CSS3, JS, React, PHP, MySQL, Git, Vite)
- **Icons:** 20+ hand-crafted pixel SVGs
- **Sections:** Hero with typewriter effect, projects with filter, skills grid, featured project, contact

##  Author

**HoutarouDes** — Full-stack developer building pixel-perfect worlds, one commit at a time.

---

<p align="center">
  <sub>Built with React, Vite, and pixel art</sub>
</p>
=======
# HOUTAROUDES — Portfolio

> A retro-futuristic, pixel-accented developer portfolio built with React + Vite.

**Live site:** [houtaroudes-portfolio.vercel.app](https://houtaroudes-portfolio.vercel.app)

---

## About

This is my first full version of my personal developer portfolio — a single-page React app with a retro-arcade visual language: pixel-style icons, glowing accent colors, animated particle backgrounds, scroll-reveal sections, and a typewriter hero intro. It showcases my projects in a filterable "Project Catalog," lists my tools as an "Equipment Loadout," and ends with a contact section, all wrapped in a dark/light theme toggle.

## Features

- **Retro-arcade aesthetic** — pixel icons, gradient accents, and an animated canvas particle background
- **Typewriter hero intro** with staggered entrance animations
- **Project Catalog** — filterable by category (All / Full Stack / Frontend), pulling in real project links and repos
- **Equipment Loadout** — animated skill badges for the tools and languages I use
- **Dark / light theme toggle**, persisted via `localStorage`
- **Scroll-based reveal animations** using `IntersectionObserver`
- **Animated stat counters** that count up into view
- **Scroll-to-top button** that appears after scrolling
- Responsive, single-page layout

## Tech Stack

| Layer      | Technology                      |
|------------|----------------------------------|
| Framework  | [React 18](https://react.dev/)  |
| Build tool | [Vite 6](https://vitejs.dev/)   |
| Plugin     | `@vitejs/plugin-react`          |
| Language   | JavaScript (JSX)                |
| Icons      | Custom hand-rolled inline SVG icon set |

## Getting Started

Clone the repo and install dependencies:

```bash
git clone https://github.com/houtaroudes/houtaroudes-portfolio.git
cd houtaroudes-portfolio
npm install
```

Run the local dev server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## Projects Featured

The Project Catalog pulls from a small curated list of my own repos, including:

- **Motion Website** — a front-end inspiration hub for layout and animation ideas
- **PixelPodWeb** — a photobooth web app with a PHP + MySQL backend
- **Houtarou Cafe** — a minimalist concept café site with ordering and reservation flows
- **Learning WebDev Hub** — a gamified learning hub with 26+ live-preview coding exercises
