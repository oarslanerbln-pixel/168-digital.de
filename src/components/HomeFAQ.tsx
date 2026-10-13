import { useTranslation } from 'react-i18next';
import { Plus } from 'lucide-react';
import { getHomeContent } from '../data/homeContent';
import './HomeSections.css';

/* ════════════════════════════════════════════════════════════════
   FAQ — the last objections, answered right above the form.

   Native <details>/<summary>: keyboard- and screen-reader-operable with
   no script, and the answers stay in the DOM, so crawlers and AI
   assistants can read them even while collapsed. Each answer leads
   with the direct answer in its first sentence — that is the passage
   answer engines lift — and Home.tsx publishes the same items as
   FAQPage JSON-LD.
   ════════════════════════════════════════════════════════════════ */

export default function HomeFAQ() {
  const { t, i18n } = useTranslation();
  const { faq } = getHomeContent(i18n.language);

  return (
    <section id="faq" className="home-section faq-section">
      <header className="home-section-header">
        <span className="home-overline">{t('faq_overline')}</span>
        <h2 className="home-title">{t('faq_title')}</h2>
        <p className="home-subtitle">{t('faq_subtitle')}</p>
      </header>

      <div className="faq-list">
        {faq.map((item) => (
          <details key={item.q} className="faq-item">
            <summary>
              <h3>{item.q}</h3>
              <Plus size={18} className="faq-icon" aria-hidden="true" />
            </summary>
            <p>{item.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
