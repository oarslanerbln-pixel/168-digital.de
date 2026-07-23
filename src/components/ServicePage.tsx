import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ChevronRight, ArrowUpRight } from 'lucide-react';
import SEOHead from './SEOHead';
import Contact from './Contact';
import { getServiceBySlug, services } from '../data/services';
import { serviceContent, type Lang } from '../data/serviceContent';
import { getProjectById } from '../data/works';
import './ServicePage.css';

const SITE_URL = 'https://168-digital.de';

export default function ServicePage() {
  const { slug } = useParams<{ slug: string }>();
  const { t, i18n } = useTranslation();
  const lang = i18n.language.substring(0, 2).toLowerCase() as Lang;

  const service = slug ? getServiceBySlug(slug) : undefined;
  const content = slug ? serviceContent[slug]?.[lang] ?? serviceContent[slug]?.en : undefined;

  if (!service || !content) {
    return (
      <div className="service-not-found section-container">
        <h1 className="text-silver">{t('svc_not_found_title')}</h1>
        <p>{t('svc_not_found_text')}</p>
        <Link to="/" className="premium-button premium-button-silver">
          {t('svc_not_found_cta')}
        </Link>
      </div>
    );
  }

  const Icon = service.icon;
  const relatedServices = services.filter((s) => s.slug !== service.slug);
  const relatedWork = content.relatedWorkIds.map(getProjectById).filter(Boolean);

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: content.h1,
      description: content.metaDescription,
      provider: { '@id': `${SITE_URL}/#business` },
      areaServed: { '@type': 'City', name: 'Berlin' },
      url: `${SITE_URL}/${service.slug}`,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: t('svc_breadcrumb_home'), item: `${SITE_URL}/` },
        { '@type': 'ListItem', position: 2, name: content.h1, item: `${SITE_URL}/${service.slug}` },
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
          <Link to="/">{t('svc_breadcrumb_home')}</Link>
          <ChevronRight size={12} />
          <span className="current">{t(service.titleKey)}</span>
        </nav>

        <motion.div
          className="service-hero"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="service-overline">{content.overline}</span>
          <h1 className="service-h1 text-silver">{content.h1}</h1>
          <div className="service-intro">
            {content.intro.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </motion.div>

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
              <Link key={s.slug} to={`/${s.slug}`} className="service-related-link">
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
