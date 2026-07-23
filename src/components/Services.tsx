import { useTranslation } from 'react-i18next';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Globe, Box, Mic, Video, Smartphone, Camera, Film, ArrowUpRight } from 'lucide-react';
import { playTick } from '../utils/audio';
import { useRef } from 'react';

/* ════════════════════════════════════════════════════════════════
   SERVICES — Premium Project-Card Style (matches Works)
   Each card links to its dedicated, SEO-optimized service page.
   ════════════════════════════════════════════════════════════════ */

const cards = [
  {
    icon: Globe,
    titleKey: 'service_web_title',
    descKey: 'service_web_desc',
    glowColor: '#38bdf8',
    tags: ['Websites', 'Landing Pages', 'Web Apps'],
    slug: 'web-saas-development',
  },
  {
    icon: Box,
    titleKey: 'service_saas_title',
    descKey: 'service_saas_desc',
    glowColor: '#00ff87',
    tags: ['SaaS', 'React', 'Firebase'],
    slug: 'web-saas-development',
  },
  {
    icon: Mic,
    titleKey: 'service_ai_title',
    descKey: 'service_ai_desc',
    glowColor: '#8b5cf6',
    tags: ['GPT', 'Automation', 'NLP'],
    slug: 'ai-voice-agents',
  },
  {
    icon: Video,
    titleKey: 'service_media_title',
    descKey: 'service_media_desc',
    glowColor: '#f59e0b',
    tags: ['Videography', '3D', 'Motion'],
    slug: 'video-drone-production',
  },
  {
    icon: Smartphone,
    titleKey: 'service_social_title',
    descKey: 'service_social_desc',
    glowColor: '#06b6d4',
    tags: ['Strategy', 'Content', 'Growth'],
    slug: 'social-media-marketing',
  },
  {
    icon: Camera,
    titleKey: 'service_event_title',
    descKey: 'service_event_desc',
    glowColor: '#f43f5e',
    tags: ['Events', 'Weddings', 'Cinematic'],
    slug: 'wedding-event-films',
  },
  {
    icon: Film,
    titleKey: 'service_trailer_title',
    descKey: 'service_trailer_desc',
    glowColor: '#ec4899',
    tags: ['Trailers', 'Ads', 'Storytelling'],
    slug: 'video-drone-production',
  },
];

function ServiceCard({ card, index }: { card: any, index: number }) {
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
      style={{ y, opacity, scale }}
    >
      <Link
        to={`/${card.slug}`}
        onMouseEnter={playTick}
        className="glass-panel-silver glow-card project-card service-card-link"
        style={{ ['--card-glow' as string]: card.glowColor }}
      >
        <div className="project-card-header">
          <span className="project-card-number">
            {String(index + 1).padStart(2, '0')} / {String(cards.length).padStart(2, '0')}
          </span>
          <Icon size={24} color="var(--accent-silver)" strokeWidth={1.5} />
        </div>

        <div className="project-card-divider" />

        <div className="project-card-content">
          <h3 className="text-silver project-card-title">
            {t(card.titleKey)}
          </h3>
          <p className="project-card-desc">
            {t(card.descKey)}
          </p>
        </div>

        <div className="project-card-tags">
          {card.tags.map((tag: string) => (
            <span key={tag} className="project-tag">{tag}</span>
          ))}
        </div>

        <span className="service-card-cta">
          {t('svc_view_details')} <ArrowUpRight size={14} />
        </span>
      </Link>
    </motion.div>
  );
}

export default function Services() {
  const { t } = useTranslation();
  const containerRef = useRef(null);

  return (
    <section id="services" className="services-section" ref={containerRef}>
      <motion.div
        className="services-header"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <span className="services-overline">{t('services_overline')}</span>
        <h2 className="services-title text-silver">
          {t('services_title')}
        </h2>
        <p className="services-subtitle">{t('services_subtitle')}</p>
      </motion.div>

      <div className="works-grid">
        {cards.map((card, index) => (
          <ServiceCard key={card.titleKey} card={card} index={index} />
        ))}
      </div>
    </section>
  );
}
