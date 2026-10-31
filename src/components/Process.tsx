import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, useScroll } from 'framer-motion';
import { ArrowRight, MessagesSquare, FileText, ShieldCheck, Smartphone } from 'lucide-react';
import { playTick, playClick } from '../utils/audio';
import { getHomeContent } from '../data/homeContent';
import { requestContactTopic } from '../utils/contactTopic';
import './HomeSections.css';

/* ════════════════════════════════════════════════════════════════
   PROCESS — takes the risk out of the first message.

   For a small business, commissioning software feels like a leap:
   how long, how much, and will I understand any of it? Four numbered
   steps with a rough duration, followed by four commitments, answer
   that before it becomes a reason not to write. The section ends in
   the page's mid-point call to action, so a visitor who is convinced
   here does not have to scroll through the rest to act on it.

   On wide screens a hairline above the four steps draws itself as the
   steps scroll through the screen — the project moving from first
   message to launch while the visitor reads it. It is tied to scroll
   position, so it never runs ahead of the reader (hidden in CSS below
   four columns and for reduced motion).
   ════════════════════════════════════════════════════════════════ */

const PROMISE_ICONS = [MessagesSquare, FileText, ShieldCheck, Smartphone];

export default function Process() {
  const { t, i18n } = useTranslation();
  const { process, promises } = getHomeContent(i18n.language);
  const stepsRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: drawn } = useScroll({ target: stepsRef, offset: ['start 85%', 'end 55%'] });

  return (
    <section id="process" className="home-section process-section">
      <motion.header
        className="home-section-header"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <span className="home-overline">{t('process_overline')}</span>
        <h2 className="home-title">{t('process_title')}</h2>
        <p className="home-subtitle">{t('process_subtitle')}</p>
      </motion.header>

      <div ref={stepsRef} className="process-track">
        <motion.span className="process-line" style={{ scaleX: drawn }} aria-hidden="true" />
        <ol className="process-steps">
          {process.map((step, i) => (
            <motion.li
              key={step.title}
              className="process-step"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="process-num" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
              <span className="process-time">{step.time}</span>
              <h3 className="process-step-title">{step.title}</h3>
              <p className="process-step-desc">{step.desc}</p>
            </motion.li>
          ))}
        </ol>
      </div>

      <div className="promises">
        <h3 className="promises-title">{t('process_promises_title')}</h3>
        <ul className="promises-grid">
          {promises.map((p, i) => {
            const Icon = PROMISE_ICONS[i % PROMISE_ICONS.length];
            return (
              <li key={p.title} className="promise">
                <span className="promise-icon" aria-hidden="true"><Icon size={18} strokeWidth={1.8} /></span>
                <strong>{p.title}</strong>
                <span>{p.desc}</span>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="cta-band">
        <div className="cta-band-copy">
          <h3>{t('process_cta_title')}</h3>
          <p>{t('process_cta_text')}</p>
        </div>
        <button
          type="button"
          className="cta-band-button"
          onMouseEnter={playTick}
          onClick={() => {
            playClick();
            requestContactTopic();
          }}
        >
          {t('process_cta_button')}
          <ArrowRight size={16} aria-hidden="true" />
        </button>
      </div>
    </section>
  );
}
