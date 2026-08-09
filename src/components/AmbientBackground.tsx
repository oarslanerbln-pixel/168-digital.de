import { useEffect, useRef } from 'react';
import './AmbientBackground.css';

/**
 * AmbientBackground — lightweight fixed backdrop replacing the three.js globe.
 * A slow drifting bronze-gold particle field on a 2D canvas over CSS aurora
 * gradients, on a light parchment backdrop. No WebGL, no external assets.
 */
export default function AmbientBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let raf = 0;
    let w = 0, h = 0, dpr = 1;

    interface P { x: number; y: number; vx: number; vy: number; r: number; color: string; }
    let particles: P[] = [];

    const build = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(90, Math.round((w * h) / 22000));
      particles = Array.from({ length: count }, () => {
        const z = Math.random();
        const a = Math.random() * 0.4 + 0.1;
        const scale = 0.4 + z;
        const radiusScale = 0.6 + z;
        return {
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.14 * scale,
          vy: (Math.random() - 0.5) * 0.14 * scale,
          r: (Math.random() * 1.6 + 0.4) * radiusScale,
          color: `rgba(163, 118, 60, ${a * (0.6 + z * 0.5)})`,
        };
      });
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < -5) p.x = w + 5; else if (p.x > w + 5) p.x = -5;
        if (p.y < -5) p.y = h + 5; else if (p.y > h + 5) p.y = -5;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
      }
    };

    build();
    if (reduced) {
      draw();
    } else {
      const loop = () => { draw(); raf = requestAnimationFrame(loop); };
      raf = requestAnimationFrame(loop);
    }

    const onResize = () => { build(); if (reduced) draw(); };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <div className="ambient-bg" aria-hidden="true">
      <div className="ambient-aurora" />
      <canvas ref={canvasRef} className="ambient-canvas" />
      <div className="ambient-vignette" />
    </div>
  );
}
