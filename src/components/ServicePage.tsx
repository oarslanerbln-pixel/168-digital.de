import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ChevronRight, ArrowUpRight, ArrowRight, Check } from 'lucide-react';
import SEOHead from './SEOHead';
import NotFoundPage from '../pages/NotFoundPage';
import Contact from './Contact';
import { getServiceBySlug, services } from '../data/services';
import { serviceContent, type Lang } from '../data/serviceContent';
import { getProjectById } from '../data/works';
import TvMenuDemo from './TvMenuDemo';
import '../styles/cta.css';
import './ServicePage.css';
import { SITE_URL, useLocalizedPath } from '../utils/localePath';
import { requestContactTopic } from '../utils/contactTopic';
import { LEAD_WHATSAPP_NUMBER } from '../utils/leads';
import { playClick, playTick } from '../utils/audio';

/* ════════════════════════════════════════════════════════════════
   SERVICE PAGE — one landing page per service line.

   The hero used to be text only, with the inquiry form two screens of
   features, process and FAQ further down. A visitor arriving from a
   search for "Hochzeitsfilm Berlin" saw neither the work nor a way to
   ask. Now the first screen carries both:

   - the service's photo (the same one its homepage tile uses), revealed
     by a curtain sliding off it while the image settles from a slight
     zoom — transform only, nothing runs once it has played;
   - a primary button that scrolls to the form with this service's topic
     already selected, and a WhatsApp link whose message already names
     the service, so the lead arrives sorted either way;
   - the three trust lines from the homepage hero.

   The photo also goes into the Service JSON-LD (`image`), with a real
   alt text, so image search and AI answers can show the service with a
   picture of it.
   ════════════════════════════════════════════════════════════════ */

const EASE = [0.16, 1, 0.3, 1] as const;
const trustKeys = ['hero_trust_1', 'hero_trust_2', 'hero_trust_3'];

/** Product photos ship as -640/-1080 pairs; showreel stills as one file. */
function imageSrcSet(src: string): string | undefined {
  if (!src.endsWith('-640.webp')) return undefined;
  return `${src} 640w, ${src.replace('-640.webp', '-1080.webp')} 1080w`;
}


export default function ServicePage() {
  const { slug } = useParams<{ slug: string }>();
  const { t, i18n } = useTranslation();
  const { localize, absolute } = useLocalizedPath();
  const lang = i18n.language.substring(0, 2).toLowerCase() as Lang;

  const service = slug ? getServiceBySlug(slug) : undefined;
  const content = slug ? serviceContent[slug]?.[lang] ?? serviceContent[slug]?.en : undefined;

  // `/:slug` catches every single-segment path, so most mistyped URLs
  // land here rather than on the catch-all route.
  if (!service || !content) {
    return <NotFoundPage />;
  }

  const Icon = service.icon;
  const relatedServices = services.filter((s) => s.slug !== service.slug);
  const relatedWork = content.relatedWorkIds.map(getProjectById).filter(Boolean);

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: content.h1,
      serviceType: t(service.titleKey),
      description: content.metaDescription,
      provider: { '@id': `${SITE_URL}/#business` },
      // Berlin in person, Germany remotely — as the homepage FAQ says.
      areaServed: [
        { '@type': 'City', name: 'Berlin' },
        { '@type': 'Country', name: 'Germany' },
      ],
      image: {
        '@type': 'ImageObject',
        url: `${SITE_URL}${service.image}`,
        caption: t(service.imageAltKey),
      },
      url: absolute(`/${service.slug}`),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: t('svc_breadcrumb_home'), item: absolute('/') },
        { '@type': 'ListItem', position: 2, name: content.h1, item: absolute(`/${service.slug}`) },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: content.faq.map((item) => ({
        '@type': 'Question',
        name: item.q,
        acceptedAnswer: { '@type': 'Answer', text: item.a },
      })),
    },
  ];

  return (
    <>
      <SEOHead
        path={`/${service.slug}`}
        title={content.metaTitle}
        description={content.metaDescription}
        jsonLd={jsonLd}
      />

      <section className="service-page section-container">
        <nav className="service-breadcrumb" aria-label="Breadcrumb">
          <Link to={localize('/')}>{t('svc_breadcrumb_home')}</Link>
          <ChevronRight size={12} />
          <span className="current">{t(service.titleKey)}</span>
        </nav>

        <div className="service-hero">
          <motion.div
            className="service-hero-copy"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <span className="service-overline">{content.overline}</span>
            <h1 className="service-h1 text-silver">{content.h1}</h1>
            <div className="service-intro">
              {content.intro.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            <div className="service-hero-actions">
              <button
                type="button"
                className="hero-cta"
                onMouseEnter={playTick}
                onClick={() => {
                  playClick();
                  requestContactTopic(service.contactTopic);
                }}
              >
                {t('hero_button')}
                <ArrowRight size={16} strokeWidth={2} aria-hidden="true" />
              </button>
              <a
                className="hero-cta-ghost"
                href={`https://wa.me/${LEAD_WHATSAPP_NUMBER}?text=${encodeURIComponent(
                  t('svc_whatsapp_text', { service: t(service.titleKey) })
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={playTick}
                onClick={playClick}
              >
                {t('hero_whatsapp')}
              </a>
            </div>

            <ul className="hero-trust">
              {trustKeys.map((key) => (
                <li key={key}>
                  <Check size={15} strokeWidth={2.2} aria-hidden="true" />
                  {t(key)}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.figure
            className={`service-visual${service.imageFrame === 'phone' ? ' service-visual-phone' : ''}`}
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.15, ease: EASE }}
          >
            <span className="service-visual-frame">
              <motion.img
                className="service-visual-img"
                src={service.image}
                srcSet={imageSrcSet(service.image)}
                sizes="(max-width: 900px) 92vw, 520px"
                alt={t(service.imageAltKey)}
                decoding="async"
                initial={{ scale: 1.14 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1.6, delay: 0.15, ease: EASE }}
              />
              <motion.span
                className="service-visual-curtain"
                aria-hidden="true"
                initial={{ x: '0%' }}
                animate={{ x: '101%' }}
                transition={{ duration: 1.05, delay: 0.25, ease: [0.76, 0, 0.24, 1] }}
              />
            </span>
            <span className="service-visual-tags" aria-hidden="true">
              {service.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </span>
          </motion.figure>
        </div>

        {/* Menu boards are bought on sight: show the screen running before
            listing what is included. */}
        {service.slug === 'digital-menus' && <TvMenuDemo />}

        <h2 className="service-section-heading">{t('svc_features_heading')}</h2>
        <div className="service-features-grid">
          {content.features.map((f, i) => (
            <motion.div
              key={i}
              className="glass-panel-silver glow-card service-feature-card"
              style={{ ['--card-glow' as string]: service.glowColor }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
            >
              <Icon size={20} color="var(--accent-silver)" strokeWidth={1.5} />
              <h3 className="text-silver service-feature-title">{f.title}</h3>
              <p className="service-feature-desc">{f.desc}</p>
            </motion.div>
          ))}
        </div>

        <h2 className="service-section-heading">{t('svc_process_heading')}</h2>
        <div className="service-process">
          {content.process.map((step, i) => (
            <div key={i} className="service-process-step">
              <span className="service-process-num">0{i + 1}</span>
              <h3 className="text-silver service-process-title">{step.title}</h3>
              <p className="service-process-desc">{step.desc}</p>
            </div>
          ))}
        </div>

        {relatedWork.length > 0 && (
          <div className="service-related">
            <h2 className="service-section-heading">{t('svc_related_work_heading')}</h2>
            <div className="service-related-links">
              {relatedWork.map((project) => project && (
                <a
                  key={project.id}
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="service-related-link"
                >
                  {t(project.titleKey)} <ArrowUpRight size={14} />
                </a>
              ))}
            </div>
          </div>
        )}

        <div className="service-faq">
          <h2 className="service-section-heading">{t('svc_faq_heading')}</h2>
          {content.faq.map((item, i) => (
            <div key={i} className="service-faq-item">
              <h3 className="text-silver service-faq-q">{item.q}</h3>
              <p className="service-faq-a">{item.a}</p>
            </div>
          ))}
        </div>

        <div className="service-related">
          <h2 className="service-section-heading">{t('svc_related_services_heading')}</h2>
          <div className="service-related-links">
            {relatedServices.map((s) => (
              <Link key={s.slug} to={localize(`/${s.slug}`)} className="service-related-link">
                {t(s.titleKey)} <ArrowUpRight size={14} />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      <section className="service-cta section-container">
        <h2 className="text-silver display-h service-cta-heading">{content.ctaTitle}</h2>
        <p className="service-cta-text">{content.ctaText}</p>
      </section>

      <Contact />
    </>
  );
}
