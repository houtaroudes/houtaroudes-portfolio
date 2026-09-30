import { useEffect, useRef } from "react";

// Slow coloured pixel drift, layered above the background. Particle count is
// derived from the viewport area so phones do not pay for a desktop field.
export default function PixelRain() {
  const ref = useRef(null);
  useEffect(() => {
    const c = ref.current; if (!c) return;
    const ctx = c.getContext("2d"); let a, p = [];
    function rs() { c.width = window.innerWidth; c.height = window.innerHeight; }
    rs();
    function init() {
      p = []; const ct = Math.floor((c.width * c.height) / 8000); const cl = ["#3fe6ff", "#ff3f9c", "#ffd166", "#a29bfe", "#fff", "#ff6b6b"];
      for (let j = 0; j < ct; j++)p.push({ x: Math.random() * c.width, y: Math.random() * c.height, s: Math.random() * 2 + 0.5, sy: Math.random() * 0.6 + 0.05, sx: (Math.random() - 0.5) * 0.3, cl: cl[Math.floor(Math.random() * cl.length)], op: Math.random() * 0.4 + 0.1 });
    }
    init();
    function anim() {
      ctx.clearRect(0, 0, c.width, c.height);
      for (const q of p) { q.y += q.sy; q.x += q.sx; if (q.y > c.height) { q.y = -q.s; q.x = Math.random() * c.width; } ctx.globalAlpha = q.op; ctx.fillStyle = q.cl; ctx.fillRect(q.x, q.y, q.s, q.s); }
      ctx.globalAlpha = 1; a = requestAnimationFrame(anim);
    }
    a = requestAnimationFrame(anim);
    const w = () => { rs(); init(); }; window.addEventListener("resize", w);
    return () => { cancelAnimationFrame(a); window.removeEventListener("resize", w); };
  }, []);
  return <canvas ref={ref} style={{ position: "fixed", inset: 0, zIndex: 1, pointerEvents: "none", opacity: 0.15 }} aria-hidden="true" />;
}
