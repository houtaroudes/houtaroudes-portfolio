import { useEffect, useRef } from "react";

// Starry sky with drifting clouds and parallax mountains, painted once into a
// fixed canvas behind everything. Moved out of App.jsx so the page component
// is markup instead of a thousand lines of canvas drawing.
export default function PixelBackground() {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current; if (!canvas) return;
    const ctx = canvas.getContext('2d'); let anim, w, h, stars = [], clouds = [], offset = 0;
    function resize() { w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight; }
    resize();
    function init() {
      stars = []; for (let i = 0; i < 80; i++) stars.push({ x: Math.random() * w, y: Math.random() * h * 0.4, s: Math.random() * 2 + 1, a: Math.random() * 0.7 + 0.3, sp: Math.random() * 0.3 + 0.05, phase: Math.random() * Math.PI * 2 });
      clouds = []; for (let i = 0; i < 4; i++) clouds.push({ x: Math.random() * w, y: 40 + Math.random() * (h * 0.25), w2: 60 + Math.random() * 120, h2: 14 + Math.random() * 8, sp: 0.15 + Math.random() * 0.3 });
    }
    init();
    function drawMountain(ox, oy, mw, mh, color) { ctx.fillStyle = color; ctx.beginPath(); ctx.moveTo(ox, oy + mh); ctx.lineTo(ox + mw / 2, oy); ctx.lineTo(ox + mw, oy + mh); ctx.closePath(); ctx.fill(); }
    function animate(time) {
      ctx.clearRect(0, 0, w, h);
      for (const s of stars) { const tw = 0.5 + 0.5 * Math.sin(time * 0.002 + s.phase); ctx.globalAlpha = s.a * tw; ctx.fillStyle = '#eef0ff'; ctx.fillRect(Math.floor(s.x), Math.floor(s.y), s.s, s.s); s.y += s.sp * 0.1; if (s.y > h * 0.4) { s.y = 0; s.x = Math.random() * w; } }
      ctx.globalAlpha = 1;
      const mc = ['#0f1535', '#151b45', '#1c2355']; for (let i = 0; i < 3; i++) { const mw = w * 0.8, mh = 50 + i * 20, mx = (w - mw) / 2 + Math.sin(offset * 0.005 + i) * 20; drawMountain(mx, h - 80 - i * 15, mw, mh, mc[i]); drawMountain(mx - mw * 0.3, h - 80 - i * 15, mw * 0.5, mh * 0.6, mc[i]); drawMountain(mx + mw * 0.5, h - 80 - i * 15, mw * 0.6, mh * 0.7, mc[i]); }
      for (const c of clouds) { ctx.fillStyle = 'rgba(132,137,189,0.12)'; const cx = Math.floor(c.x), cy = Math.floor(c.y); const cw = c.w2, ch = c.h2; ctx.fillRect(cx - cw / 2, cy - ch / 2, cw, ch); ctx.fillRect(cx - cw / 2 + 10, cy - ch / 2 - 4, cw - 20, ch - 2); ctx.fillRect(cx - cw / 2 + 20, cy - ch / 2 - 8, cw - 40, ch - 4); c.x += c.sp; if (c.x > w + cw) c.x = -cw; }
      ctx.fillStyle = '#070911'; ctx.fillRect(0, h - 16, w, 16); ctx.fillStyle = 'rgba(63,230,255,0.03)'; ctx.fillRect(0, h - 16, w, 1);
      offset++; anim = requestAnimationFrame(animate);
    }
    anim = requestAnimationFrame(animate);
    const onResize = () => { resize(); init(); };
    window.addEventListener('resize', onResize);
    return () => { cancelAnimationFrame(anim); window.removeEventListener('resize', onResize); };
  }, []);
  return <canvas ref={ref} style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none', opacity: 0.3 }} aria-hidden="true" />;
}
