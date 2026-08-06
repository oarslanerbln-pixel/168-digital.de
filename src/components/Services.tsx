import { useTranslation } from 'react-i18next';
import { motion, useScroll, useTransform } from 'framer-motion';
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

function ServiceCard({ card }: { card: any }) {
  const { t } = useTranslation();
  const Icon = card.icon;
  const ref = useRef(null);

  // Parallax scroll effect
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["0 1", "1.2 1"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [60, 0]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.95, 1]);

  return (
    <motion.div
      ref={ref}
      className="service-card-cell"
      style={{ y, opacity, scale }}
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
        {cards.map((card) => (
          <ServiceCard key={card.titleKey} card={card} />
        ))}
      </div>
    </section>
  );
}
