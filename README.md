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

## Project Structure

```
houtaroudes-portfolio/
├── index.html          # HTML entry point
├── src/
│   ├── main.jsx         # React app entry
│   └── App.jsx          # Main portfolio component (all sections + data)
├── vite.config.js       # Vite configuration
├── package.json
└── package-lock.json
```

## Projects Featured

The Project Catalog pulls from a small curated list of my own repos, including:

- **Motion Website** — a front-end inspiration hub for layout and animation ideas
- **PixelPodWeb** — a photobooth web app with a PHP + MySQL backend
- **Houtarou Cafe** — a minimalist concept café site with ordering and reservation flows
- **Learning WebDev Hub** — a gamified learning hub with 26+ live-preview coding exercises

## License

No license specified.

---

Built and maintained by [@houtaroudes](https://github.com/houtaroudes).
