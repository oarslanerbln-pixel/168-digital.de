import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import { blogPosts } from '../data/blogContent';
import type { Lang } from '../data/serviceContent';
import './BlogPage.css';

const SITE_URL = 'https://1618-digital.de';

export default function BlogPage() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language.substring(0, 2).toLowerCase() as Lang;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: t('blog_meta_title'),
    url: `${SITE_URL}/blog`,
  };

  return (
    <>
      <SEOHead
        path="/blog"
        title={t('blog_meta_title')}
        description={t('blog_meta_description')}
        jsonLd={jsonLd}
      />

      <section className="service-page section-container blog-index">
        <nav className="service-breadcrumb" aria-label="Breadcrumb">
          <Link to="/">{t('svc_breadcrumb_home')}</Link>
        </nav>

        <div className="service-hero">
          <span className="service-overline">{t('blog_overline')}</span>
          <h1 className="service-h1 text-silver">{t('blog_title')}</h1>
          <div className="service-intro">
            <p>{t('blog_subtitle')}</p>
          </div>
        </div>

        <div className="blog-list">
          {blogPosts.map((post, index) => {
            const content = post.content[lang] ?? post.content.en;
            return (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
              >
                <Link
                  to={`/blog/${post.slug}`}
                  className="glass-panel-silver glow-card blog-list-card"
                  style={{ ['--card-glow' as string]: post.glowColor }}
                >
                  <span className="blog-list-meta">
                    {new Date(post.publishedAt).toLocaleDateString(lang === 'en' ? 'en-GB' : lang, { year: 'numeric', month: 'long', day: 'numeric' })}
                    {' · '}
                    {content.readingTime}
                  </span>
                  <h2 className="text-silver blog-list-title">{content.title}</h2>
                  <p className="blog-list-excerpt">{content.excerpt}</p>
                  <span className="blog-list-cta">
                    {t('blog_read_more')} <ArrowUpRight size={14} />
                  </span>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </section>
    </>
  );
}
