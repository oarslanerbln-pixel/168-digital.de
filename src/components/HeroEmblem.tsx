import { useRef, MouseEvent } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { buildGoldenSpiral } from '../utils/goldenSpiral';
import './HeroEmblem.css';

const SIZE = 400;
const SPIRAL = buildGoldenSpiral(SIZE, 165, 3.75);

const DUST = [
  { x: '18%', y: '20%', s: 4, d: 0 },
  { x: '82%', y: '26%', s: 3, d: 1.2 },
  { x: '74%', y: '78%', s: 5, d: 0.5 },
  { x: '22%', y: '72%', s: 3, d: 1.7 },
  { x: '60%', y: '12%', s: 2, d: 0.9 },
  { x: '40%', y: '86%', s: 3, d: 1.4 },
];

/**
 * HeroEmblem — lightweight 2D replacement for the former 3D glass "1618".
 * Golden-ratio spiral + shining "1618" numerals, mouse-parallax, gold dust.
 * No three.js / no external assets.
 */
export default function HeroEmblem() {
  const ref = useRef<HTMLDivElement>(null);
  const clicks = useRef(0);

  // Pointer parallax
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [12, -12]), { stiffness: 120, damping: 20 });
  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [-12, 12]), { stiffness: 120, damping: 20 });

  const handleMove = (e: MouseEvent) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    px.set((e.clientX - (r.left + r.width / 2)) / r.width);
    py.set((e.clientY - (r.top + r.height / 2)) / r.height);
  };

  const reset = () => { px.set(0); py.set(0); };

  // Triple-click opens the hidden dev console (parity with old 3D scene)
  const handleClick = () => {
    clicks.current += 1;
    if (clicks.current >= 3) {
      window.dispatchEvent(new CustomEvent('open-dev-console'));
      clicks.current = 0;
    }
    setTimeout(() => { clicks.current = 0; }, 2000);
  };

  return (
    <div
      ref={ref}
      className="hero-emblem"
      onMouseMove={handleMove}
      onMouseLeave={reset}
      onClick={handleClick}
    >
      <motion.div
        className="hero-emblem-inner"
        style={{ rotateX, rotateY }}
      >
        {/* Rotating golden spiral + rings */}
        <motion.svg
          viewBox={`0 0 ${SIZE} ${SIZE}`}
          className="hero-emblem-svg"
          aria-hidden="true"
          animate={{ rotate: 360 }}
          transition={{ duration: 90, repeat: Infinity, ease: 'linear' }}
        >
          <defs>
            <linearGradient id="he-gold" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#e8c078" />
              <stop offset="50%" stopColor="#c9973f" />
              <stop offset="100%" stopColor="#8a6a3f" />
            </linearGradient>
          </defs>
          <circle cx={SIZE / 2} cy={SIZE / 2} r={SIZE / 2 - 14} className="he-ring" />
          <circle cx={SIZE / 2} cy={SIZE / 2} r={SIZE / 2 - 40} className="he-ring he-ring-inner" />
          <path d={SPIRAL} className="he-spiral-glow" />
          <path d={SPIRAL} className="he-spiral" stroke="url(#he-gold)" />
        </motion.svg>

        {/* Corner HUD brackets */}
        <span className="he-bracket he-tl" />
        <span className="he-bracket he-tr" />
        <span className="he-bracket he-bl" />
        <span className="he-bracket he-br" />

        {/* Shining numerals */}
        <div className="hero-emblem-numerals">
          <span className="he-1618">1618</span>
          <span className="he-caption">φ · GOLDEN RATIO</span>
        </div>

        {/* Floating gold dust */}
        {DUST.map((p, i) => (
          <motion.span
            key={i}
            className="he-dust"
            style={{ left: p.x, top: p.y, width: p.s, height: p.s }}
            animate={{ opacity: [0.15, 0.7, 0.15], y: [0, -8, 0] }}
            transition={{ duration: 4.5, delay: p.d, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}
      </motion.div>
    </div>
  );
}
