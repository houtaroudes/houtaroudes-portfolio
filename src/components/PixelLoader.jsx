import { useEffect, useRef } from "react";

// Boot screen: a grid fills in, then the name spells itself out, then onDone
// fires once. The whole animation is one rAF loop on a full-screen canvas, so
// this stays a leaf component with no props beyond its exit callback.
export default function PixelLoader({ onDone }) {
  const canvasRef = useRef(null);
  const doneRef = useRef(onDone);
  doneRef.current = onDone;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let w, h;
    const resize = () => { w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight; };
    resize();

    const GRID = 8;
    const total = GRID * GRID;

    const NAME = 'BRYAN SACUEZA';
    const GRID_DUR = 800;
    const NAME_DUR = 500;
    let phase = 'grid';
    let anim;
    let done = false;
    let start = performance.now();

    function draw(time) {
      const elapsed = time - start;
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = '#070911';
      ctx.fillRect(0, 0, w, h);

      if (phase === 'grid') {
        const p = Math.min(elapsed / GRID_DUR, 1);
        const e = 1 - Math.pow(1 - p, 3);
        const show = Math.floor(e * total);
        const cw = w / GRID, ch = h / GRID;

        for (let i = 0; i < show && i < total; i++) {
          const col = Math.floor(i / GRID);
          const row = i % GRID;
          const alpha = 0.12 + (i / total) * 0.6;
          ctx.globalAlpha = alpha;
          const bright = 0.4 + (i / total) * 0.6;
          ctx.fillStyle = `rgba(63,230,255,${bright})`;
          ctx.fillRect(Math.floor(col * cw), Math.floor(row * ch), Math.ceil(cw), Math.ceil(ch));
        }
        ctx.globalAlpha = 1;

        const bootText = '> INITIALIZING PIXEL ENGINE...';
        const chars = Math.floor(p * bootText.length);
        ctx.fillStyle = '#8489bd';
        ctx.font = '11px "JetBrains Mono", monospace';
        ctx.textAlign = 'center';
        ctx.fillText(bootText.slice(0, Math.max(chars, 1)), w / 2, h - 70);
        const barY = h - 55;
        // Background track
        ctx.fillStyle = 'rgba(132,137,189,0.18)';
        ctx.fillRect(w / 2 - 100, barY, 200, 6);
        // Outer glow
        const glow = ctx.createRadialGradient(w / 2, barY + 3, 0, w / 2, barY + 3, 140);
        glow.addColorStop(0, 'rgba(63,230,255,0.2)');
        glow.addColorStop(0.5, 'rgba(63,230,255,0.06)');
        glow.addColorStop(1, 'rgba(63,230,255,0)');
        ctx.fillStyle = glow;
        ctx.fillRect(w / 2 - 140, barY - 10, 280, 26);
        // Fill itself
        ctx.fillStyle = '#3fe6ff';
        ctx.fillRect(w / 2 - 100, barY, 200 * p, 6);
        // Leading-edge highlight (brighter head)
        const fillEnd = (w / 2 - 100) + 200 * p;
        const headGlow = ctx.createRadialGradient(fillEnd, barY + 3, 0, fillEnd, barY + 3, 30);
        headGlow.addColorStop(0, 'rgba(63,230,255,0.5)');
        headGlow.addColorStop(1, 'rgba(63,230,255,0)');
        ctx.fillStyle = headGlow;
        ctx.fillRect(fillEnd - 30, barY - 4, 60, 14);
        // scanline sweep - makes it look cool
        const sweepX = (w / 2 - 100) + (200 * p * (Math.sin(elapsed * 0.008) * 0.5 + 0.5));
        ctx.fillStyle = 'rgba(255,255,255,0.25)';
        ctx.fillRect(sweepX, barY - 1, 3, 8);
        // Percentage text
        ctx.fillStyle = '#eef0ff';
        ctx.font = 'bold 11px "JetBrains Mono", monospace';
        ctx.textAlign = 'left';
        ctx.fillText(`${Math.floor(p * 100)}%`, w / 2 + 105, barY + 5);

        if (p >= 1) { phase = 'name'; start = time; }
        anim = requestAnimationFrame(draw);
        return;
      }

      if (phase === 'name') {
        const p = Math.min(elapsed / NAME_DUR, 1);
        const e = 1 - Math.pow(1 - p, 2);
        const n = Math.floor(e * NAME.length);

        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        for (let i = 0; i < n && i < NAME.length; i++) {
          ctx.font = 'bold 22px "Press Start 2P", monospace';
          ctx.fillStyle = '#3fe6ff';
          ctx.globalAlpha = 0.3 + 0.7 * ((i + 1) / Math.max(n, 1));
          ctx.fillText(NAME[i], w / 2 - (NAME.length * 16) / 2 + i * 16 + 8, h / 2);
        }
        ctx.globalAlpha = 1;

        ctx.fillStyle = '#8489bd';
        ctx.font = '11px "JetBrains Mono", monospace';
        ctx.textAlign = 'center';
        ctx.fillText('> LOADING COMPLETE', w / 2, h - 70);

        if (p >= 1 && !done) {
          done = true;
          setTimeout(() => { if (doneRef.current) doneRef.current(); }, 100);
          return;
        }
        anim = requestAnimationFrame(draw);
      }
    }

    // 🔊 retro startup sound (beep boop)
    try {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (AC) {
        const actx = new AC();
        const now = actx.currentTime;
        // rising arpeggio thingy - c5, e5, g5, c6
        const notes = [523, 659, 784, 1047];
        notes.forEach((freq, i) => {
          const o = actx.createOscillator();
          const g = actx.createGain();
          o.type = 'square';
          o.frequency.setValueAtTime(freq, now + i * 0.09);
          g.gain.setValueAtTime(0.04, now + i * 0.09);
          g.gain.exponentialRampToValueAtTime(0.001, now + i * 0.09 + 0.15);
          o.connect(g).connect(actx.destination);
          o.start(now + i * 0.09);
          o.stop(now + i * 0.09 + 0.15);
        });
        // Cleanup
        setTimeout(() => actx.close(), 1000);
      }
    } catch { }

    anim = requestAnimationFrame(draw);
    window.addEventListener('resize', resize);
    return () => { cancelAnimationFrame(anim); window.removeEventListener('resize', resize); };
  }, []);

  return <canvas ref={canvasRef} style={{ position: 'fixed', inset: 0, zIndex: 200 }} />;
}
