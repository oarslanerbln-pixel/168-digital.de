import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PenTool } from 'lucide-react';
import './Preloader.css';

interface PreloaderProps {
  onComplete: () => void;
}

/* ── Golden ratio (φ = 1.618) logarithmic spiral, drawn by the pen ──
   Built in a 1-unit-per-pixel coordinate space (SIZE×SIZE) so the SVG
   stroke and the CSS offset-path pen share the exact same geometry. */
const SIZE = 260;
const CENTER = SIZE / 2;

function buildGoldenSpiral(): string {
  const PHI = 1.618;
  const b = Math.log(PHI) / (Math.PI / 2); // radius ×φ every quarter turn
  const thetaEnd = 3.5 * Math.PI;
  const maxR = 116;
  const r0 = maxR / Math.exp(b * thetaEnd);
  const steps = 240;
  let d = '';
  for (let i = 0; i <= steps; i++) {
    const theta = (i / steps) * thetaEnd;
    const r = r0 * Math.exp(b * theta);
    const a = theta - Math.PI / 2; // rotate opening upward
    const x = CENTER + r * Math.cos(a);
    const y = CENTER + r * Math.sin(a);
    d += i === 0 ? `M ${x.toFixed(2)} ${y.toFixed(2)}` : ` L ${x.toFixed(2)} ${y.toFixed(2)}`;
  }
  return d;
}

const SPIRAL = buildGoldenSpiral();
const DRAW_DURATION = 2.2;
const DRAW_EASE = [0.6, 0, 0.35, 1] as const;

export default function Preloader({ onComplete }: PreloaderProps) {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 2500); // reveal wordmark
    const t2 = setTimeout(() => setPhase(2), 4200); // open shutters
    const t3 = setTimeout(() => onComplete(), 5400); // unmount

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onComplete]);

  const isLoaded = phase >= 2;
  const showSpiral = phase <= 1;
  const showBrand = phase === 1;

  return (
    <motion.div
      key="preloader-wrapper"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: 'easeInOut' }}
      style={{ pointerEvents: isLoaded ? 'none' : 'all', background: '#050505' }}
      className="preloader-overlay-p"
    >
      {/* ── Cinematic black shutters ── */}
      <motion.div
        className="pl-shutter-top"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: isLoaded ? 0 : 1 }}
        style={{ transformOrigin: 'top', background: '#050505' }}
        transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
      />
      <motion.div
        className="pl-shutter-bottom"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: isLoaded ? 0 : 1 }}
        style={{ transformOrigin: 'bottom', background: '#050505' }}
        transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
      />

      {/* ── Stage ── */}
      <motion.div
        className="pl-stage"
        animate={{
          opacity: isLoaded ? 0 : 1,
          scale: isLoaded ? 1.05 : 1,
          filter: isLoaded ? 'blur(10px)' : 'blur(0px)',
        }}
        transition={{ duration: 0.8, ease: 'easeIn' }}
      >
        {/* Pen-drawn golden spiral */}
        <motion.div
          className="pl-spiral-wrap"
          animate={{ opacity: showSpiral ? (showBrand ? 0.28 : 1) : 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
        >
          <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="pl-spiral-svg" aria-hidden="true">
            <defs>
              <linearGradient id="pl-gold" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#fff4d6" />
                <stop offset="45%" stopColor="#e5c185" />
                <stop offset="100%" stopColor="#c5a073" />
              </linearGradient>
            </defs>
            <motion.path
              d={SPIRAL}
              fill="none"
              stroke="url(#pl-gold)"
              strokeWidth={1.6}
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0, opacity: 0.9 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: DRAW_DURATION, ease: DRAW_EASE }}
            />
          </svg>

          {/* Pen nib that rides the tip of the stroke */}
          {phase === 0 && (
            <motion.div
              className="pl-pen"
              style={{
                offsetPath: `path('${SPIRAL}')`,
                offsetRotate: 'auto',
                offsetAnchor: '14% 86%',
              }}
              initial={{ offsetDistance: '0%' }}
              animate={{ offsetDistance: '100%' }}
              transition={{ duration: DRAW_DURATION, ease: DRAW_EASE }}
            >
              <span className="pl-pen-tip" />
              <PenTool size={26} strokeWidth={1.4} className="pl-pen-icon" />
            </motion.div>
          )}
        </motion.div>

        {/* Caption fades in as the spiral completes */}
        <AnimatePresence>
          {phase === 0 && (
            <motion.div
              key="phi"
              className="pl-phi"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: DRAW_DURATION * 0.72, duration: 0.7 }}
            >
              φ · 1.618
            </motion.div>
          )}
        </AnimatePresence>

        {/* Brand wordmark */}
        <AnimatePresence mode="wait">
          {showBrand && (
            <motion.div
              key="brand"
              className="pl-brand-block"
              initial={{ scale: 0.86, opacity: 0, filter: 'blur(18px)' }}
              animate={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, scale: 1.15, filter: 'blur(10px)' }}
              transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="pl-brand-name">1618 DIGITAL</div>
              <motion.div
                className="pl-brand-line"
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
