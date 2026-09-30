// Everything the page renders as content rather than layout. Keeping it here
// means adding a project is a one-line edit to a list, not a trip through the
// page component.

export const projects = [
  { id: 1, title: "Motion Website", desc: "A front-end inspiration hub for exploring layout and animation ideas.", tags: ["HTML", "CSS", "JS"], shot: "/shots/motion.png", demo: "https://motion-website-des.vercel.app", code: "https://github.com/houtaroudes/motion-website", type: "Full Stack", year: "2025" },
  { id: 8, title: "St. Joseph Village", desc: "A cinematic subdivision landing page: a generated 3D village you fly through on scroll, an interactive 68-lot site plan, and a real Pag-IBIG vs bank financing calculator.", tags: ["React", "Vite", "Three.js"], shot: "/shots/st-joseph.png", demo: "https://st-joseph-village.vercel.app", code: "https://github.com/houtaroudes/st-joseph-village", type: "Full Stack", year: "2026", featured: true },
  { id: 2, title: "PixelPodWeb", desc: "A photobooth web app with PHP + MySQL backend, built solo as a school project.", tags: ["PHP", "MySQL", "CSS", "JS"], code: "https://github.com/houtaroudes/PixelPodWeb", type: "Full Stack", year: "2025" },
  { id: 3, title: "Houtarou Cafe", desc: "A concept cafe site with minimalist design: ordering flow and reservation system.", tags: ["HTML", "CSS", "JS"], code: "https://github.com/houtaroudes/houtarou-cafe", type: "Frontend", year: "2026" },
  { id: 4, title: "Learning WebDev Hub", desc: "My gamified learning hub with 26+ exercises, live previews, and code challenges!", tags: ["React", "Vite", "HTML", "CSS"], shot: "/shots/learning.png", demo: "https://random-learning-webdev-site.vercel.app", code: "https://github.com/houtaroudes/Random-Learning-WebDev", type: "Full Stack", year: "2026", flag: true, featured: true },
  { id: 5, title: "Modern Filipino Homes", desc: "MONO-inspired architecture landing page with word-by-word scroll reveals, house carousel, and phase-built gallery, a premium Filipino housing showcase.", tags: ["React", "Vite", "Framer Motion"], shot: "/shots/mfh-landing.png", demo: "https://modern-filipino-homes.vercel.app", code: "https://github.com/houtaroudes/Modern-Filipino-Homes", type: "Full Stack", year: "2026", featured: true },
  { id: 6, title: "Modern Filipino Homes Platform", desc: "A secure proptech platform: property showcase, interactive financing calculator, climate resilience matrix, AI chat assistant, and secure lead capture. Sustainable homes for the modern Filipino.", tags: ["React", "Vite", "tRPC", "MySQL", "Tailwind"], shot: "/shots/mfh-platform.png", demo: "https://modern-fil-homes.vercel.app", type: "Full Stack", year: "2026", featured: true },
  { id: 7, title: "MediQueue", desc: "Campus clinic appointment booking and walk-in queueing system with a live NOW SERVING board that updates in real time, role-based dashboards for students/staff/admin, and a 38-check smoke test. Built in 15 modified-waterfall phases.", tags: ["PHP", "MySQL", "JS", "CSS"], code: "https://github.com/houtaroudes/mediqueue", type: "Full Stack", year: "2026", featured: true },
];

export const skillBadges = [
  { name: "HTML5", icon: "diamond", color: "#e34f26" }, { name: "CSS3", icon: "diamond", color: "#1572b6" }, { name: "JS", icon: "diamond", color: "#f7df1e" }, { name: "React", icon: "diamond", color: "#61dafb" }, { name: "PHP", icon: "diamond", color: "#777bb3" }, { name: "MySQL", icon: "diamond", color: "#4479a1" }, { name: "Git", icon: "diamond", color: "#f05032" }, { name: "Vite", icon: "diamond", color: "#a29bfe" }, { name: "C#", icon: "diamond", color: "#68217a" }, { name: "C++", icon: "diamond", color: "#00599c" },
];

export const categories = [
  { id: "all", label: "All Projects", icon: "star", color: "var(--gold)" }, { id: "fullstack", label: "Full Stack", icon: "bolt", color: "var(--cyan)" }, { id: "frontend", label: "Frontend", icon: "palette", color: "var(--magenta)" },
];
