import { useEffect, useRef } from 'react';
import './PixelTrail.css';

export default function PixelTrail({
  gridSize = 50,
  trailSize = 0.1,
  maxAge = 250,
  color = '#3fe6ff',
  className = ''
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationId;
    let points = [];
    let mouse = { x: -1000, y: -1000 };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const onMouseMove = (e) => {
      mouse = { x: e.clientX, y: e.clientY };
      const now = Date.now();
      points.push({ x: mouse.x, y: mouse.y, time: now });
    };

    const onTouchMove = (e) => {
      const touch = e.touches[0];
      if (touch) {
        mouse = { x: touch.clientX, y: touch.clientY };
        const now = Date.now();
        points.push({ x: mouse.x, y: mouse.y, time: now });
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('touchmove', onTouchMove);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const now = Date.now();
      // Remove old points
      points = points.filter(p => now - p.time < maxAge);

      const cellSize = Math.max(canvas.width, canvas.height) / gridSize;

      // Draw pixel trail
      for (let i = 0; i < points.length; i++) {
        const p = points[i];
        const age = (now - p.time) / maxAge;
        const alpha = Math.max(0, 1 - age);

        // Convert to grid position
        const col = Math.floor(p.x / cellSize);
        const row = Math.floor(p.y / cellSize);

        const size = cellSize * trailSize * 8;
        ctx.fillStyle = color;
        ctx.globalAlpha = alpha * 0.6;
        ctx.fillRect(
          col * cellSize + (cellSize - size) / 2,
          row * cellSize + (cellSize - size) / 2,
          size,
          size
        );
      }

      ctx.globalAlpha = 1;
      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('touchmove', onTouchMove);
      cancelAnimationFrame(animationId);
    };
  }, [gridSize, trailSize, maxAge, color]);

  return (
    <canvas
      ref={canvasRef}
      className={`pixel-canvas ${className}`}
    />
  );
}
