import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { buildGoldenSpiral } from '../utils/goldenSpiral';
import './Preloader.css';

interface PreloaderProps {
  onComplete: () => void;
}

const SIZE = 440;
const SPIRAL = buildGoldenSpiral(SIZE, 195, 3.75, 280);
const DRAW_DURATION = 1.3;
const DRAW_EASE = [0.5, 0, 0.3, 1] as const;

export default function Preloader({ onComplete }: PreloaderProps) {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 1450); // reveal wordmark
    const t2 = setTimeout(() => setPhase(2), 2350); // open shutters
    const t3 = setTimeout(() => onComplete(), 2950); // unmount

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onComplete]);

  // Let visitors skip the intro instead of being captive for its full
  // duration — click/tap anywhere, press Escape, or use the explicit button.
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onComplete();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
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
      style={{ pointerEvents: isLoaded ? 'none' : 'all' }}
      className="preloader-overlay-p"
      onClick={onComplete}
    >
      <button
        type="button"
        className="pl-skip-btn"
        aria-label="Skip intro"
        onClick={(e) => { e.stopPropagation(); onComplete(); }}
      >
        Skip
      </button>

      {/* ── Cinematic shutters ── */}
      <motion.div
        className="pl-shutter-top"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: isLoaded ? 0 : 1 }}
        style={{ transformOrigin: 'top' }}
        transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
      />
      <motion.div
        className="pl-shutter-bottom"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: isLoaded ? 0 : 1 }}
        style={{ transformOrigin: 'bottom' }}
        transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
      />

      {/* ── Stage ── */}
      <motion.div
        className="pl-stage"
        animate={{
          opacity: isLoaded ? 0 : 1,
          scale: isLoaded ? 1.06 : 1,
          filter: isLoaded ? 'blur(10px)' : 'blur(0px)',
        }}
        transition={{ duration: 0.8, ease: 'easeIn' }}
      >
        {/* Pen-drawn golden spiral */}
        <motion.div
          className="pl-spiral-wrap"
          animate={{
            opacity: showSpiral ? 1 : 0,
            scale: showBrand ? 1.08 : 1,
            rotate: showBrand ? 6 : 0,
            filter: showBrand ? 'blur(2px)' : 'blur(0px)',
          }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          style={{ opacity: showBrand ? 0.25 : 1 }}
        >
          {/* Pen-drawn spiral, single clean stroke */}
          <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="pl-svg pl-svg-core" aria-hidden="true">
            <motion.path
              d={SPIRAL}
              fill="none"
              stroke="var(--accent-cyan)"
              strokeWidth={2.5}
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: DRAW_DURATION, ease: DRAW_EASE }}
            />
          </svg>
        </motion.div>

        {/* Brand wordmark (centered over the fading spiral) */}
        <AnimatePresence>
          {showBrand && (
            <motion.div
              key="brand"
              className="pl-brand-block"
              initial={{ scale: 0.9, opacity: 0, filter: 'blur(16px)' }}
              animate={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, scale: 1.12, filter: 'blur(10px)' }}
              transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="pl-brand-name">1618 DIGITAL</div>
              <motion.div
                className="pl-brand-line"
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              />
              <motion.div
                className="pl-brand-sub"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.7 }}
              >
                DIGITAL STUDIO · BERLIN
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
