import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { playClick, playTick } from '../utils/audio';
import { ArrowRight, ArrowDown } from 'lucide-react';
import Reel from './Reel';
import './Hero.css';

/* ════════════════════════════════════════════════════════════════
   HERO — editorial, left-aligned, one accent.

   Reworked from the previous centred layout: the headline is now flush
   left at editorial scale, with the service list moved into a numbered
   rail on the right. That rail replaces the old four-across chip grid,
   which had a hard 150px-per-column floor and was the main cause of the
   page overflowing its own viewport on phones.

   The only colour in the section is the blue-to-gold shimmer sweeping
   through the two headline words. Everything else — mark, rules, meta,
   buttons — is ink on paper, so the sweep is unmistakably the focal
   point rather than one effect competing with five others.
   ════════════════════════════════════════════════════════════════ */

const ease = [0.16, 1, 0.3, 1] as const;

/** Staggered reveal — one shared definition instead of per-element delays. */
const rise = (delay: number) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.85, ease },
});

const serviceLinks = [
  { slug: 'web-saas-development', key: 'chip_web' },
  { slug: 'video-drone-production', key: 'chip_video' },
  { slug: 'wedding-event-films', key: 'chip_event' },
  { slug: 'social-media-marketing', key: 'chip_social' },
];

export default function Hero() {
  const { t } = useTranslation();

  const scrollToServices = () => {
    playClick();
    document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="hero-section">
      <div className="hero-inner">
        {/* ── Left: the statement ── */}
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
              onClick={scrollToServices}
            >
              {t('hero_button')}
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
        </div>

        {/* ── Right: numbered service rail. A vertical list rather than a
             four-across grid, so it can never force the page wider than
             the screen the way the old chip row did. ── */}
        <motion.aside className="hero-side" {...rise(0.42)}>
          <nav className="hero-rail" aria-label={t('services_title')}>
            {serviceLinks.map((item, i) => (
              <Link
                key={item.slug}
                to={`/${item.slug}`}
                className="hero-rail-item"
                onMouseEnter={playTick}
              >
                <span className="hero-rail-num">{String(i + 1).padStart(2, '0')}</span>
                <span className="hero-rail-label">{t(item.key)}</span>
                <ArrowRight className="hero-rail-arrow" size={14} strokeWidth={1.75} aria-hidden="true" />
              </Link>
            ))}
          </nav>

          {/* Three facts that answer the questions a prospect actually has
              before they write in. They also close the tall gap the rail
              used to leave under itself on wide screens. */}
          <dl className="hero-facts">
            <div className="hero-fact">
              <dt>{t('hero_fact_based_label', 'Based in')}</dt>
              <dd>{t('hero_fact_based_value', 'Berlin, Germany')}</dd>
            </div>
            <div className="hero-fact">
              <dt>{t('hero_fact_langs_label', 'We work in')}</dt>
              <dd>{t('hero_fact_langs_value', 'German · English · Turkish')}</dd>
            </div>
            <div className="hero-fact">
              <dt>{t('hero_fact_reply_label', 'Reply time')}</dt>
              <dd>{t('hero_fact_reply_value', 'Within 24 hours')}</dd>
            </div>
          </dl>
        </motion.aside>
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
