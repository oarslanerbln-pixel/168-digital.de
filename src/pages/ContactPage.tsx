import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ChevronRight, Mail, Phone, MapPin, MessageCircle, Instagram } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import Contact from '../components/Contact';
import '../components/ServicePage.css';

const SITE_URL = 'https://1618-digital.de';

export default function ContactPage() {
  const { t } = useTranslation();

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'ContactPage',
      name: t('contact_page_meta_title'),
      url: `${SITE_URL}/contact`,
      about: { '@id': `${SITE_URL}/#business` },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: t('svc_breadcrumb_home'), item: `${SITE_URL}/` },
        { '@type': 'ListItem', position: 2, name: t('contact_title'), item: `${SITE_URL}/contact` },
      ],
    },
  ];

  return (
    <>
      <SEOHead
        path="/contact"
        title={t('contact_page_meta_title')}
        description={t('contact_page_meta_description')}
        jsonLd={jsonLd}
      />

      <section className="service-page section-container">
        <nav className="service-breadcrumb" aria-label="Breadcrumb">
          <Link to="/">{t('svc_breadcrumb_home')}</Link>
          <ChevronRight size={12} />
          <span className="current">{t('contact_title')}</span>
        </nav>

        <div className="service-hero">
          <span className="service-overline">{t('contact_page_overline')}</span>
          <h1 className="service-h1 text-silver">{t('contact_title')}</h1>
          <div className="service-intro">
            <p>{t('contact_page_intro')}</p>
          </div>
        </div>

        <div className="service-features-grid" style={{ marginBottom: '2rem' }}>
          <a href="tel:+491787277867" className="glass-panel-silver glow-card service-feature-card service-card-link">
            <Phone size={20} color="var(--accent-silver)" strokeWidth={1.5} />
            <h3 className="text-silver service-feature-title">+49 178 7277867</h3>
            <p className="service-feature-desc">Phone / Telefon</p>
          </a>
          <a
            href={`https://wa.me/491787277867?text=${encodeURIComponent(t('wa_message'))}`}
            target="_blank"
            rel="noopener noreferrer"
            className="glass-panel-silver glow-card service-feature-card service-card-link"
          >
            <MessageCircle size={20} color="var(--accent-silver)" strokeWidth={1.5} />
            <h3 className="text-silver service-feature-title">WhatsApp</h3>
            <p className="service-feature-desc">{t('wa_tap_to_chat')}</p>
          </a>
          <a href="mailto:info.1618digital@gmail.com" className="glass-panel-silver glow-card service-feature-card service-card-link">
            <Mail size={20} color="var(--accent-silver)" strokeWidth={1.5} />
            <h3 className="text-silver service-feature-title">info.1618digital@gmail.com</h3>
            <p className="service-feature-desc">Email / E-Mail</p>
          </a>
          <div className="glass-panel-silver glow-card service-feature-card">
            <MapPin size={20} color="var(--accent-silver)" strokeWidth={1.5} />
            <h3 className="text-silver service-feature-title">Berlin</h3>
            <p className="service-feature-desc">Wirmerzeile 4, 13627 Berlin</p>
          </div>
          <a
            href="https://www.instagram.com/1618cinema/"
            target="_blank"
            rel="noopener noreferrer"
            className="glass-panel-silver glow-card service-feature-card service-card-link"
          >
            <Instagram size={20} color="var(--accent-silver)" strokeWidth={1.5} />
            <h3 className="text-silver service-feature-title">@1618cinema</h3>
            <p className="service-feature-desc">Instagram</p>
          </a>
        </div>
      </section>

      <Contact />
    </>
  );
}
