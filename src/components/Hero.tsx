import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { playClick, playTick } from '../utils/audio';
import { ArrowRight, Check } from 'lucide-react';
import { heroImage, srcSet } from '../data/homeContent';
import './Hero.css';

/* ════════════════════════════════════════════════════════════════
   HERO — outcome first, product visible, one obvious next step.

   The previous hero led with a manifesto ("where image and code become
   one") and a full-width showreel. Beautiful, but a restaurant owner or
   a Mittelstand manager arriving from Instagram could not tell within
   five seconds what they would get or what to do next. This version
   answers both on the first screen:

   - the headline names the result (customers won, hours saved), with
     the blue-to-gold shimmer kept on exactly those two words — still the
     only colour gradient on the site (CLAUDE.md rule 7);
   - a product photo on the right shows the kind of system we build —
     a dashboard and a guest-facing menu in a real café — kept in the
     page's monochrome with the one blue accent, so it supports the
     shimmer instead of competing with it;
   - one solid CTA goes straight to the inquiry form, WhatsApp sits next
     to it for people who would rather message, and three short trust
     lines answer the usual "but…" before it is asked.

   The showreel moved down next to the film services, where it proves
   the film half of the business instead of competing with the software
   half for the first impression.
   ════════════════════════════════════════════════════════════════ */

const ease = [0.16, 1, 0.3, 1] as const;

/** Staggered reveal — one shared definition instead of per-element delays. */
const rise = (delay: number) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.85, ease },
});

const trustKeys = ['hero_trust_1', 'hero_trust_2', 'hero_trust_3'];

export default function Hero() {
  const { t } = useTranslation();

  const scrollToContact = () => {
    playClick();
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="hero-section">
      <div className="hero-inner">
        <div className="hero-main">
          <motion.span className="hero-eyebrow" {...rise(0.05)}>
            <span className="hero-eyebrow-dot" aria-hidden="true" />
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
              {t('hero_whatsapp', 'WhatsApp')}
            </a>
          </motion.div>

          <motion.ul className="hero-trust" {...rise(0.4)}>
            {trustKeys.map((key) => (
              <li key={key}>
                <Check size={15} strokeWidth={2.2} aria-hidden="true" />
                {t(key)}
              </li>
            ))}
          </motion.ul>
        </div>

        <motion.div
          className="hero-visual"
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 1, ease }}
        >
          {/* The likely LCP element: eager, high priority, and sized by
              srcset so a phone takes the 640 px file (about 24 kB). The
              copy beside it says what it shows, hence the empty alt. */}
          <img
            className="hero-photo"
            src={`${heroImage.stem}-1080.webp`}
            srcSet={srcSet(heroImage)}
            sizes="(max-width: 900px) 92vw, 540px"
            width={heroImage.width}
            height={heroImage.height}
            alt=""
            // Lower-case on purpose: React 18 does not know the
            // camel-cased prop yet and would warn instead of passing it.
            {...{ fetchpriority: 'high' }}
            decoding="async"
          />
        </motion.div>
      </div>
    </section>
  );
}
