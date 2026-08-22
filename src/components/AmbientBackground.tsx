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

    interface P { x: number; y: number; z: number; vx: number; vy: number; r: number; a: number; }
    let particles: P[] = [];

    const build = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(90, Math.round((w * h) / 22000));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        z: Math.random(),
        vx: (Math.random() - 0.5) * 0.14,
        vy: (Math.random() - 0.5) * 0.14,
        r: Math.random() * 1.6 + 0.4,
        a: Math.random() * 0.4 + 0.1,
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (const p of particles) {
        p.x += p.vx * (0.4 + p.z);
        p.y += p.vy * (0.4 + p.z);
        if (p.x < -5) p.x = w + 5; else if (p.x > w + 5) p.x = -5;
        if (p.y < -5) p.y = h + 5; else if (p.y > h + 5) p.y = -5;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * (0.6 + p.z), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(163, 118, 60, ${p.a * (0.6 + p.z * 0.5)})`;
        ctx.fill();
      }
    };

    const startLoop = () => {
      if (!raf && !reduced) {
        const loop = () => { draw(); raf = requestAnimationFrame(loop); };
        raf = requestAnimationFrame(loop);
      }
    };

    const stopLoop = () => {
      if (raf) {
        cancelAnimationFrame(raf);
        raf = 0;
      }
    };

    build();

    if (reduced) {
      draw();
    } else {
      startLoop();
    }

    const onVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        stopLoop();
      } else {
        startLoop();
      }
    };

    document.addEventListener('visibilitychange', onVisibilityChange);

    const onResize = () => {
      build();
      if (reduced || document.visibilityState === 'hidden') draw();
    };
    window.addEventListener('resize', onResize);

    return () => {
      stopLoop();
      window.removeEventListener('resize', onResize);
      document.removeEventListener('visibilitychange', onVisibilityChange);
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
