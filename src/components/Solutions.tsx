import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';
import { playTick, playClick } from '../utils/audio';
import { getHomeContent, type SolutionId } from '../data/homeContent';
import { SolutionMockup } from './SystemMockups';
import { requestContactTopic, type ContactTopic } from '../utils/contactTopic';
import './HomeSections.css';

/* ════════════════════════════════════════════════════════════════
   SOLUTIONS — "what would you build for *my* business?"

   The service list answers "what do you do?" in the studio's terms
   (web, menus, film). Business owners think in problems: too many
   phone bookings, a menu that is out of date, orders in five
   spreadsheets, inquiries nobody answers. Each card names one of those
   problems, shows the system that fixes it as a mockup, says who it
   suits, and ends in a button that opens the inquiry form with the
   right topic already selected — one tap from "that's me" to a lead.
   ════════════════════════════════════════════════════════════════ */

const TOPIC_FOR: Record<SolutionId, ContactTopic> = {
  booking: 'software',
  ordering: 'menu',
  dashboard: 'software',
  automation: 'software',
};

export default function Solutions() {
  const { t, i18n } = useTranslation();
  const { solutions, mock } = getHomeContent(i18n.language);

  return (
    <section id="solutions" className="home-section solutions-section">
      <motion.header
        className="home-section-header"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <span className="home-overline">{t('solutions_overline')}</span>
        <h2 className="home-title">{t('solutions_title')}</h2>
        <p className="home-subtitle">{t('solutions_subtitle')}</p>
      </motion.header>

      <div className="solutions-grid">
        {solutions.map((s, i) => (
          <motion.article
            key={s.id}
            className="solution-card"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.6, delay: (i % 2) * 0.08, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="solution-visual">
              <SolutionMockup id={s.id} m={mock} />
            </div>
            <div className="solution-body">
              <h3 className="solution-title">{s.title}</h3>
              <p className="solution-pitch">{s.pitch}</p>
              <ul className="solution-points">
                {s.points.map((p) => (
                  <li key={p}>
                    <Check size={15} strokeWidth={2.2} aria-hidden="true" />
                    {p}
                  </li>
                ))}
              </ul>
              <p className="solution-fit">
                <span>{t('solutions_fit_label')}:</span> {s.fit}
              </p>
              <button
                type="button"
                className="solution-cta"
                onMouseEnter={playTick}
                onClick={() => {
                  playClick();
                  requestContactTopic(TOPIC_FOR[s.id]);
                }}
              >
                {t('solutions_cta')}
                <ArrowRight size={15} aria-hidden="true" />
              </button>
            </div>
          </motion.article>
        ))}
      </div>

      <p className="solutions-note">{t('solutions_note')}</p>
    </section>
  );
}
