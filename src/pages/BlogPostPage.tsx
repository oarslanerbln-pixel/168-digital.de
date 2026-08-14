import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ChevronRight, ArrowUpRight } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import Contact from '../components/Contact';
import { getBlogPostBySlug } from '../data/blogContent';
import type { Lang } from '../data/serviceContent';
import { getServiceBySlug } from '../data/services';
import './BlogPage.css';

const SITE_URL = 'https://1618-digital.de';

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const { t, i18n } = useTranslation();
  const lang = i18n.language.substring(0, 2).toLowerCase() as Lang;

  const post = slug ? getBlogPostBySlug(slug) : undefined;
  const content = post ? post.content[lang] ?? post.content.en : undefined;

  if (!post || !content) {
    return (
      <div className="service-not-found section-container">
        <h1 className="text-silver">{t('svc_not_found_title')}</h1>
        <p>{t('svc_not_found_text')}</p>
        <Link to="/blog" className="premium-button premium-button-silver">
          {t('blog_back_to_blog')}
        </Link>
      </div>
    );
  }

  const relatedService = getServiceBySlug(post.relatedServiceSlug);

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: content.title,
      description: content.metaDescription,
      datePublished: post.publishedAt,
      dateModified: post.publishedAt,
      author: { '@type': 'Person', name: 'Ömer Arslaner' },
      publisher: { '@id': `${SITE_URL}/#business` },
      url: `${SITE_URL}/blog/${post.slug}`,
      inLanguage: lang,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: t('svc_breadcrumb_home'), item: `${SITE_URL}/` },
        { '@type': 'ListItem', position: 2, name: t('blog_title'), item: `${SITE_URL}/blog` },
        { '@type': 'ListItem', position: 3, name: content.title, item: `${SITE_URL}/blog/${post.slug}` },
      ],
    },
  ];

  return (
    <>
      <SEOHead
        path={`/blog/${post.slug}`}
        title={content.metaTitle}
        description={content.metaDescription}
        jsonLd={jsonLd}
      />

      <article
        className="service-page section-container blog-post"
        style={{ ['--card-glow' as string]: post.glowColor }}
      >
        <nav className="service-breadcrumb" aria-label="Breadcrumb">
          <Link to="/">{t('svc_breadcrumb_home')}</Link>
          <ChevronRight size={12} />
          <Link to="/blog">{t('blog_title')}</Link>
          <ChevronRight size={12} />
          <span className="current">{content.title}</span>
        </nav>

        <motion.div
          className="service-hero"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="service-overline blog-post-meta">
            {new Date(post.publishedAt).toLocaleDateString(lang === 'en' ? 'en-GB' : lang, { year: 'numeric', month: 'long', day: 'numeric' })}
            {' · '}
            {content.readingTime}
          </span>
          <h1 className="service-h1 text-silver">{content.title}</h1>
        </motion.div>

        <div className="blog-post-body">
          {content.body.map((block, i) => {
            if (block.type === 'h2') {
              return <h2 key={i} className="text-silver blog-post-h2">{block.text}</h2>;
            }
            if (block.type === 'list') {
              return (
                <ul key={i} className="blog-post-list">
                  {block.items.map((item, j) => <li key={j}>{item}</li>)}
                </ul>
              );
            }
            return (
              <p key={i}>
                {block.lead && <strong>{block.lead} </strong>}
                {block.text}
              </p>
            );
          })}
        </div>

        {relatedService && (
          <div className="service-related blog-post-related">
            <h2 className="service-section-heading">{t('svc_related_services_heading')}</h2>
            <div className="service-related-links">
              <Link to={`/${relatedService.slug}`} className="service-related-link">
                {t(relatedService.titleKey)} <ArrowUpRight size={14} />
              </Link>
              <Link to="/blog" className="service-related-link">
                {t('blog_back_to_blog')} <ArrowUpRight size={14} />
              </Link>
            </div>
          </div>
        )}
      </article>

      <div className="section-divider" />

      <Contact />
    </>
  );
}
