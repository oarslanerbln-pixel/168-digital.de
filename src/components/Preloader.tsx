import { useState, useEffect, type CSSProperties } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import './Preloader.css';

interface PreloaderProps {
  onComplete: () => void;
}

/* ════════════════════════════════════════════════════════════════
   INTRO — "the golden section", drawn once, then opened.

   The studio is named after φ ≈ 1.618, so the intro does not show a
   logo animation, it shows the proportion itself:

   1. a phi grid draws in — four hairlines at 38.2 % and 61.8 % of the
      screen, the composition grid photographers frame with, which is
      the film half of the business in one gesture;
   2. the four digits 1·6·1·8 rise out of their masks one after another,
      "Digital" follows in Playfair italic gold — the same voice the
      hero's key words use, so the intro and the first screen read as
      one piece;
   3. the lower hairline turns gold from the grid point outward, and the
      screen opens along exactly that line: the upper 61.8 % lifts, the
      lower 38.2 % drops. The page is revealed along the golden section.

   The previous intro (pen-drawn spiral, wordmark, two equal shutters)
   relied on blur filters and took ~3 s. This one animates transform and
   opacity only (CLAUDE.md rule 7), is done in ~2.4 s and stays
   skippable: click/tap anywhere, Escape, or the button. App.tsx keeps
   the gating (once per 24 h, never for reduced motion, never in the
   prerendered HTML), so this component only has to play.
   ════════════════════════════════════════════════════════════════ */

const DIGITS = ['1', '6', '1', '8'];
const EASE = [0.16, 1, 0.3, 1] as const;
const EASE_OPEN = [0.76, 0, 0.24, 1] as const;

/** When the screen starts to open, and when the page takes over. */
const OPEN_AT_MS = 1750;
const COMPLETE_AT_MS = 2350;

export default function Preloader({ onComplete }: PreloaderProps) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setOpen(true), OPEN_AT_MS);
    // The hero starts its entrance while the panels are still parting,
    // so the reveal and the headline read as one movement.
    const t2 = setTimeout(() => onComplete(), COMPLETE_AT_MS);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [onComplete]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onComplete();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onComplete]);

  return (
    <motion.div
      key="preloader-wrapper"
      className={`preloader-overlay-p${open ? ' is-open' : ''}`}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      style={{ pointerEvents: open ? 'none' : 'auto' }}
      onClick={onComplete}
    >
      {/* The two halves of the screen, cut at the golden section. */}
      <motion.div
        className="pl-panel pl-panel-top"
        aria-hidden="true"
        initial={{ y: '0%' }}
        animate={{ y: open ? '-101%' : '0%' }}
        transition={{ duration: 0.95, ease: EASE_OPEN }}
      />
      <motion.div
        className="pl-panel pl-panel-bottom"
        aria-hidden="true"
        initial={{ y: '0%' }}
        animate={{ y: open ? '101%' : '0%' }}
        transition={{ duration: 0.95, ease: EASE_OPEN }}
      />

      {/* Phi grid: hairlines drawn by scaling, never by layout. */}
      <motion.div
        className="pl-grid"
        aria-hidden="true"
        animate={{ opacity: open ? 0 : 1 }}
        transition={{ duration: 0.3 }}
      >
        <span className="pl-line pl-line-h pl-line-h1" style={{ '--d': '0s' } as CSSProperties} />
        <span className="pl-line pl-line-h pl-line-h2" style={{ '--d': '0.08s' } as CSSProperties} />
        <span className="pl-line pl-line-v pl-line-v1" style={{ '--d': '0.16s' } as CSSProperties} />
        <span className="pl-line pl-line-v pl-line-v2" style={{ '--d': '0.24s' } as CSSProperties} />
        <span className="pl-seam" />
        <span className="pl-point" />
      </motion.div>

      <motion.div
        className="pl-stage"
        aria-hidden="true"
        animate={{ opacity: open ? 0 : 1, y: open ? -14 : 0 }}
        transition={{ duration: 0.35, ease: 'easeIn' }}
      >
        <div className="pl-wordmark">
          <span className="pl-digits">
            {DIGITS.map((digit, i) => (
              <span key={i} className="pl-mask">
                <motion.span
                  className="pl-digit"
                  initial={{ y: '105%' }}
                  animate={{ y: '0%' }}
                  transition={{ duration: 0.8, delay: 0.3 + i * 0.07, ease: EASE }}
                >
                  {digit}
                </motion.span>
              </span>
            ))}
          </span>
          <span className="pl-mask pl-mask-word">
            <motion.span
              className="pl-word"
              initial={{ y: '105%' }}
              animate={{ y: '0%' }}
              transition={{ duration: 0.85, delay: 0.62, ease: EASE }}
            >
              Digital
            </motion.span>
          </span>
        </div>
        <motion.span
          className="pl-tagline"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.0, ease: EASE }}
        >
          {t('intro_tagline')}
        </motion.span>
      </motion.div>

      <button
        type="button"
        className="pl-skip-btn"
        onClick={(e) => {
          e.stopPropagation();
          onComplete();
        }}
      >
        {t('intro_skip')}
      </button>
    </motion.div>
  );
}
