import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Globe, Box, Video, Smartphone, Camera, ArrowUpRight } from 'lucide-react';
import { playTick } from '../utils/audio';
import { useRef } from 'react';

/* ════════════════════════════════════════════════════════════════
   SERVICES — light, modern counterpoint section directly under Hero.
   Each card links to its dedicated, SEO-optimized service page.
   ════════════════════════════════════════════════════════════════ */

const cards = [
  {
    icon: Globe,
    titleKey: 'service_web_title',
    descKey: 'service_web_desc',
    tags: ['Websites', 'Landing Pages', 'Web Apps'],
    slug: 'web-saas-development',
    // Flagship offering: given a double-width cell on wide screens. Five
    // equal cards in a three-column grid left a hole in the second row;
    // promoting the first card fills the grid exactly (2+1 / 1+1+1) and
    // gives the section a hierarchy instead of five identical boxes.
    featured: true,
  },
  {
    icon: Box,
    titleKey: 'service_saas_title',
    descKey: 'service_saas_desc',
    tags: ['SaaS', 'React', 'Firebase'],
    slug: 'web-saas-development',
  },
  {
    icon: Video,
    titleKey: 'service_media_title',
    descKey: 'service_media_desc',
    tags: ['Drone', 'Color Grading', 'Trailers'],
    slug: 'video-drone-production',
  },
  {
    icon: Smartphone,
    titleKey: 'service_social_title',
    descKey: 'service_social_desc',
    tags: ['Strategy', 'Content', 'Growth'],
    slug: 'social-media-marketing',
  },
  {
    icon: Camera,
    titleKey: 'service_event_title',
    descKey: 'service_event_desc',
    tags: ['Events', 'Weddings', 'Cinematic'],
    slug: 'wedding-event-films',
  },
];

function ServiceCard({ card, index }: { card: any; index: number }) {
  const { t } = useTranslation();
  const Icon = card.icon;
  const ref = useRef(null);

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
      ref={ref}
      className={`service-card-cell${card.featured ? ' service-card-cell-featured' : ''}`}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15, margin: '0px 0px -40px 0px' }}
      transition={{ duration: 0.6, delay: Math.min(index, 3) * 0.07, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link
        to={`/${card.slug}`}
        onMouseEnter={playTick}
        className="service-card-light"
      >
        <div className="service-card-body-light">
          <div className="service-icon-wrapper-light">
            <Icon size={24} strokeWidth={1.6} />
          </div>

          <h3 className="service-card-title-light">
            {t(card.titleKey)}
          </h3>
          <p className="service-card-desc-light">
            {t(card.descKey)}
          </p>

          <div className="service-card-tags-light">
            {card.tags.map((tag: string) => (
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
  const containerRef = useRef(null);

  return (
    <section id="services" className="services-section services-light" ref={containerRef}>
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

      <div className="services-grid">
        {cards.map((card, i) => (
          <ServiceCard key={card.titleKey} card={card} index={i} />
        ))}
      </div>
    </section>
  );
}
