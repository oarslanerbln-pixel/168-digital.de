import type { PointerEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { playTick } from '../utils/audio';
import { services, type ServiceMeta } from '../data/services';
import { useLocalizedPath } from '../utils/localePath';
import './Services.css';

/* ════════════════════════════════════════════════════════════════
   SERVICES — the six things the studio sells, as the page's anchor.

   The section is a dark band on the light page (Nov 2026): the one
   place the gallery-white site drops into night, so the offer reads as
   the page's anchor instead of six interchangeable white boxes. Every
   tile leads with a real photo — product shots for the software, frames
   from the studio's own showreel for film — because "what will I get"
   is answered faster by a picture than by an icon.

   Services used to sit two-thirds down the page as quiet light cards;
   a visitor had to read hero, solutions, work and process before
   learning what the studio actually offers. They now come straight
   after the client marquee, as a bento grid of large dark tiles: the
   two software services wide on the first row (the business the site
   leads with), the four film services below.

   Motion, in order of what it tells the visitor:
   - tiles rise in one after another as the grid enters the screen;
   - on hover the tile lifts slightly, its hairline border firms up and
     a thin accent rule draws in along the top — "this is clickable"
     without a label, and without the neon of a game card;
   - a faint neutral light follows the pointer across the surface.
   Everything is CSS-driven from two custom properties (--mx/--my) set
   on pointer move, so there is no animation loop and nothing runs while
   the visitor is not touching a tile. Reduced motion keeps the colour
   change and drops the movement.

   Cards come straight from src/data/services.ts, so a service is added
   in one place and lands here, in the nav and on its own page.
   ════════════════════════════════════════════════════════════════ */

function trackPointer(e: PointerEvent<HTMLAnchorElement>) {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`);
}

function ServiceTile({ service, index }: { service: ServiceMeta; index: number }) {
  const { t } = useTranslation();
  // Without localize() a visitor on /de/ landed on the English service page.
  const { localize } = useLocalizedPath();

  return (
    <motion.li
      className={`svc-cell svc-cell-${service.group}`}
      initial={{ opacity: 0, y: 36, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link
        to={localize(`/${service.slug}`)}
        className="svc-tile"
        onPointerMove={trackPointer}
        onMouseEnter={playTick}
      >
        <span className={`svc-media${service.imageFrame === 'phone' ? ' svc-media-phone' : ''}`}>
          <img
            src={service.image}
            alt=""
            loading="lazy"
            decoding="async"
            className="svc-img"
          />
        </span>
        <span className="svc-body">
        <span className="svc-num" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
        <h3 className="svc-title">{t(service.titleKey)}</h3>
        <p className="svc-desc">{t(service.descKey)}</p>
        <span className="svc-tags">
          {service.tags.map((tag) => (
            <span key={tag} className="svc-tag">{tag}</span>
          ))}
        </span>
        <span className="svc-cta">
          {t('svc_view_details')} <ArrowUpRight size={16} aria-hidden="true" />
        </span>
        </span>
      </Link>
    </motion.li>
  );
}

export default function Services() {
  const { t } = useTranslation();

  return (
    <section id="services" className="svc-band">
     <div className="svc-section">
      <motion.header
        className="home-section-header"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <span className="home-overline">{t('services_overline')}</span>
        <h2 className="home-title svc-heading">{t('services_title')}</h2>
        <p className="home-subtitle">{t('services_subtitle')}</p>
      </motion.header>

      <ul className="svc-grid">
        {services.map((service, i) => (
          <ServiceTile key={service.slug} service={service} index={i} />
        ))}
      </ul>
     </div>
    </section>
  );
}
