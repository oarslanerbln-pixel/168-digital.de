import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { playClick, playTick } from '../utils/audio';
import { ArrowRight, ArrowDown } from 'lucide-react';
import Reel from './Reel';
import './Hero.css';

/* ════════════════════════════════════════════════════════════════
   HERO — one statement, one action, one picture.

   The previous hero split the first screen into a statement column and
   a numbered rail of all five services plus three labelled facts. The
   rail repeated the Services section that follows a scroll later, and
   on a phone it pushed the page's first real choice below the fold.
   Now the first screen asks for exactly one thing — get in touch — with
   WhatsApp beside it, and the facts shrink to a single quiet line.

   The only colour stays the blue-to-gold shimmer in the headline. The
   background picture sits to the right and fades into the paper under a
   mask (not a colour gradient), so the text always reads ink on paper
   and the shimmer is still the focal point.
   ════════════════════════════════════════════════════════════════ */

const ease = [0.16, 1, 0.3, 1] as const;

/* Background picture, self-hosted WebP (see scripts/optimize-images.mjs).
   null renders the hero without a picture — keep it null until a final
   image is in public/hero/, so the page never requests a missing file. */
const HERO_IMAGE: { src: string; srcMobile: string } | null = null;

/** Staggered reveal — one shared definition instead of per-element delays. */
const rise = (delay: number) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.85, ease },
});

export default function Hero() {
  const { t } = useTranslation();

  const scrollToContact = () => {
    playClick();
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="hero-section">
      <div className={`hero-stage${HERO_IMAGE ? ' hero-stage-has-image' : ''}`}>
        {HERO_IMAGE && (
          <picture className="hero-bg" aria-hidden="true">
            <source media="(max-width: 700px)" srcSet={HERO_IMAGE.srcMobile} />
            {/* The hero picture is the largest thing on the first screen,
                so it loads eagerly and first rather than lazily. */}
            <img src={HERO_IMAGE.src} alt="" fetchPriority="high" decoding="async" />
          </picture>
        )}

        <div className="hero-main">
          <motion.span className="hero-eyebrow" {...rise(0.05)}>
            {t('hero_eyebrow')}
          </motion.span>

          <motion.h1 className="hero-headline" {...rise(0.12)}>
            {t('hero_title_pre')}
            <span className="hero-title-word hero-title-word-blue">{t('hero_title_word1')}</span>
            {t('hero_title_mid')}
            <span className="hero-title-word hero-title-word-gold">{t('hero_title_word2')}</span>
            {t('hero_title_post')}
          </motion.h1>

          <motion.p className="hero-subtitle" {...rise(0.22)}>
            {t('hero_subtitle')}
          </motion.p>

          <motion.div className="hero-actions" {...rise(0.32)}>
            <button
              type="button"
              className="hero-cta"
              onMouseEnter={playTick}
              onClick={scrollToContact}
            >
              {t('hero_cta_contact')}
              <ArrowRight size={16} strokeWidth={2} aria-hidden="true" />
            </button>

            <a
              className="hero-cta-ghost"
              href="https://wa.me/491787277867"
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={playTick}
              onClick={playClick}
            >
              WhatsApp
            </a>
          </motion.div>

          {/* The three questions a prospect has before writing in — where,
              which language, how fast — answered in one line instead of
              three labelled rows. */}
          <motion.p className="hero-meta" {...rise(0.42)}>
            {t('hero_fact_based_value')} · {t('hero_fact_langs_value')} · {t('hero_meta_reply')}
          </motion.p>
        </div>
      </div>

      {/* ── Showreel ── */}
      <motion.div
        className="hero-reel-container"
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 1.1, ease }}
      >
        <div className="hero-reel-label">
          <ArrowDown size={13} strokeWidth={1.75} aria-hidden="true" />
          <span>{t('hero_reel_label', 'SHOWREEL')}</span>
        </div>
        <Reel />
      </motion.div>
    </section>
  );
}
