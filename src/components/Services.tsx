import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight, MessageCircle } from 'lucide-react';
import ServiceGlyph from './ServiceGlyph';
import { playClick, playTick } from '../utils/audio';
import { requestContactTopic } from '../utils/contactTopic';
import { services, type ServiceMeta } from '../data/services';
import { useLocalizedPath } from '../utils/localePath';
import './Services.css';

/* ════════════════════════════════════════════════════════════════
   SERVICES — the six things the studio sells, as the page's anchor.

   They come straight after the client marquee and the facts, so "what
   do you do?" is answered before anything else. "Phi" language (Nov
   2026): a ruled grid of tiles on paper, each led by its own geometric
   sign (ServiceGlyph) instead of a photo, its title in the display serif.
   The photos live on the service pages, where there is room to read them.

   Motion, in order of what it tells the visitor:
   - tiles rise in one after another as the grid enters the screen;
   - on hover (or keyboard focus) the tile inverts to ink and its sign
     turns a quarter — the spiral's own move — "this is clickable"
     without a label. Colour and a transform only; reduced motion keeps
     the inversion and drops the turn.

   Two ways out of every tile: the whole tile opens the service page (a
   stretched link on the title), and a separate "Request a quote" button
   jumps straight to the form with the service's topic chosen — a visitor
   who already knows what they want skips a page.

   Tiles come straight from src/data/services.ts, so a service is added
   in one place and lands here, in the nav and on its own page.
   ════════════════════════════════════════════════════════════════ */

function ServiceTile({ service, index }: { service: ServiceMeta; index: number }) {
  const { t } = useTranslation();
  // Without localize() a visitor on /de/ landed on the English service page.
  const { localize } = useLocalizedPath();
  const title = t(service.titleKey);

  return (
    <motion.li
      className={`svc-cell svc-cell-${service.group}`}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
    >
      <article className="svc-tile" onMouseEnter={playTick}>
        <div className="svc-head">
          <ServiceGlyph slug={service.slug} />
          <span className="svc-num" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
        </div>
        <div className="svc-body">
          <h3 className="svc-title">
            {/* Stretched over the whole tile by .svc-link::after. */}
            <Link to={localize(`/${service.slug}`)} className="svc-link">
              {title}
            </Link>
          </h3>
          <p className="svc-desc">{t(service.descKey)}</p>
          <div className="svc-tags">
            {service.tags.map((tag) => (
              <span key={tag} className="svc-tag">{tag}</span>
            ))}
          </div>
          <div className="svc-actions">
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
          </div>
        </div>
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
