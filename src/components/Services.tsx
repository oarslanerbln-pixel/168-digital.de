import type { PointerEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight, MessageCircle } from 'lucide-react';
import { playClick, playTick } from '../utils/audio';
import { requestContactTopic } from '../utils/contactTopic';
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
   - on hover the tile lifts, an aurora rim (gold → ember → violet)
     lights up around its edge and a warm light follows the pointer —
     "this is clickable" without a label (Nov 2026: the band used to be
     strictly monochrome and read as classical; the owner asked for more
     life, so the aurora lights it, but only where the visitor points).
   Everything is CSS-driven from two custom properties (--mx/--my) set
   on pointer move, so there is no animation loop and nothing runs while
   the visitor is not touching a tile. Reduced motion keeps the colour
   change and drops the movement.

   Two ways out of every tile: the whole card opens the service page
   (a stretched link on the title), and a separate "Request a quote"
   button jumps straight to the form with the service's topic chosen —
   a visitor who already knows what they want skips a page.

   Cards come straight from src/data/services.ts, so a service is added
   in one place and lands here, in the nav and on its own page.
   ════════════════════════════════════════════════════════════════ */

function trackPointer(e: PointerEvent<HTMLElement>) {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`);
}

function ServiceTile({ service, index }: { service: ServiceMeta; index: number }) {
  const { t } = useTranslation();
  // Without localize() a visitor on /de/ landed on the English service page.
  const { localize } = useLocalizedPath();
  const title = t(service.titleKey);

  return (
    <motion.li
      className={`svc-cell svc-cell-${service.group}`}
      initial={{ opacity: 0, y: 36, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
    >
      <article className="svc-tile" onPointerMove={trackPointer} onMouseEnter={playTick}>
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
          <h3 className="svc-title">
            {/* Stretched over the whole tile by .svc-link::after. */}
            <Link to={localize(`/${service.slug}`)} className="svc-link">
              {title}
            </Link>
          </h3>
          <p className="svc-desc">{t(service.descKey)}</p>
          <span className="svc-tags">
            {service.tags.map((tag) => (
              <span key={tag} className="svc-tag">{tag}</span>
            ))}
          </span>
          <span className="svc-actions">
            <span className="svc-cta" aria-hidden="true">
              {t('svc_view_details')} <ArrowUpRight size={16} />
            </span>
            <button
              type="button"
              className="svc-request"
              aria-label={`${t('svc_request')}: ${title}`}
              onClick={() => {
                playClick();
                requestContactTopic(service.contactTopic);
              }}
            >
              <MessageCircle size={15} strokeWidth={2} aria-hidden="true" />
              {t('svc_request')}
            </button>
          </span>
        </span>
      </article>
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
