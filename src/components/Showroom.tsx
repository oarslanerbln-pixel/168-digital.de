import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { playTick } from '../utils/audio';
import { showroomDemos } from '../data/showroom';
import './Showroom.css';

/* ════════════════════════════════════════════════════════════════
   SHOWROOM — six of the studio's own 3D product-stage demos, shown as
   still posters that open the live demo in a new tab.

   Stills rather than embedded demos: each stage runs WebGL with glass
   refraction and bloom, which is the wrong thing to start six times on
   a phone on mobile data, and an iframe would load the demo domain
   before the visitor asked for it. The poster says "this is the level
   of craft"; the live demo is one tap away for anyone who wants proof.

   On desktop the six posters close a 3×2 grid. On phones they become a
   swipeable rail in its own scroll container, so the section costs one
   card's height instead of six and never widens the page.
   ════════════════════════════════════════════════════════════════ */

export default function Showroom() {
  const { t } = useTranslation();

  return (
    <section id="showroom" className="showroom-section">
      <motion.div
        className="services-header showroom-header"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <span className="services-overline showroom-overline">{t('showroom_overline')}</span>
        <h2 className="services-title showroom-title">{t('showroom_title')}</h2>
        <p className="services-subtitle">{t('showroom_subtitle')}</p>
      </motion.div>

      <ul className="showroom-rail">
        {showroomDemos.map((demo) => (
          <li key={demo.id} className="showroom-item">
            <a
              href={demo.url}
              target="_blank"
              rel="noopener noreferrer"
              className="showroom-card"
              onMouseEnter={playTick}
              aria-label={`${demo.name} — ${t(demo.categoryKey)} · ${t('showroom_live')}`}
            >
              <span className="showroom-media">
                <img
                  src={demo.image}
                  alt=""
                  width={960}
                  height={600}
                  loading="lazy"
                  decoding="async"
                />
                <span className="showroom-badge">{t('showroom_badge')}</span>
              </span>
              <span className="showroom-caption">
                <span className="showroom-name">{demo.name}</span>
                <span className="showroom-cat">{t(demo.categoryKey)}</span>
                <span className="showroom-live">
                  {t('showroom_live')} <ArrowUpRight size={14} aria-hidden="true" />
                </span>
              </span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
