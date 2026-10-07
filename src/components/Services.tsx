import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { playTick } from '../utils/audio';
import { services, type ServiceGroup, type ServiceMeta } from '../data/services';

/* ════════════════════════════════════════════════════════════════
   SERVICES — light, modern counterpoint section directly under Hero.
   Each card links to its dedicated, SEO-optimized service page.

   The cards are split into the two halves of the business — software
   (websites, digital menus) and film (weddings, drone, social) — each
   under a quiet label. A flat grid of every offer read as a list of
   unrelated things; two labelled rows let a café owner and a couple
   planning a wedding each find their row at a glance and skip the
   other. Cards come straight from src/data/services.ts, so a service
   is added in one place and lands here, in the nav and on its page.
   ════════════════════════════════════════════════════════════════ */

const groups: { id: ServiceGroup; labelKey: string }[] = [
  { id: 'software', labelKey: 'services_group_software' },
  { id: 'film', labelKey: 'services_group_film' },
];

function ServiceCard({ service, index }: { service: ServiceMeta; index: number }) {
  const { t } = useTranslation();
  const Icon = service.icon;

  /* A card used to have its opacity, y and scale driven continuously by
     scroll position (useScroll + useTransform, offset ["0 1", "1.2 1"]).
     That meant a card was only fully opaque while the page sat inside a
     narrow scroll window: land past it, restore a scroll position, or
     scroll faster than the smooth-scroll wrapper settles, and the card
     stayed at opacity 0 — visibly a blank gap where the service grid
     should be.

     A one-shot `whileInView` reveal latches on first sight and then stays
     put, which is both sturdier and quieter. */
  return (
    <motion.div
      className="service-card-cell"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15, margin: '0px 0px -40px 0px' }}
      transition={{ duration: 0.6, delay: Math.min(index, 3) * 0.07, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link
        to={`/${service.slug}`}
        onMouseEnter={playTick}
        className="service-card-light"
      >
        <div className="service-card-body-light">
          <div className="service-icon-wrapper-light">
            <Icon size={24} strokeWidth={1.6} />
          </div>

          <h4 className="service-card-title-light">
            {t(service.titleKey)}
          </h4>
          <p className="service-card-desc-light">
            {t(service.descKey)}
          </p>

          <div className="service-card-tags-light">
            {service.tags.map((tag) => (
              <span key={tag} className="service-tag-light">{tag}</span>
            ))}
          </div>

          <span className="service-card-cta-light">
            {t('svc_view_details')} <ArrowUpRight size={14} />
          </span>
        </div>
      </Link>
    </motion.div>
  );
}

export default function Services() {
  const { t } = useTranslation();

  return (
    <section id="services" className="services-section services-light">
      <motion.div
        className="services-header"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <span className="services-overline">{t('services_overline')}</span>
        <h2 className="services-title">
          {t('services_title')}
        </h2>
        <p className="services-subtitle">{t('services_subtitle')}</p>
      </motion.div>

      {groups.map((group) => {
        const items = services.filter((s) => s.group === group.id);
        return (
          <div key={group.id} className="services-group">
            <h3 className="services-group-label">{t(group.labelKey)}</h3>
            <div className={`services-grid services-grid-${items.length}`}>
              {items.map((service, i) => (
                <ServiceCard key={service.slug} service={service} index={i} />
              ))}
            </div>
          </div>
        );
      })}
    </section>
  );
}
