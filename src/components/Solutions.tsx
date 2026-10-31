import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';
import { playTick, playClick } from '../utils/audio';
import { getHomeContent, solutionImages, srcSet, type SolutionId } from '../data/homeContent';
import { requestContactTopic, type ContactTopic } from '../utils/contactTopic';
import './HomeSections.css';

/* ════════════════════════════════════════════════════════════════
   SOLUTIONS — "what would you build for *my* business?"

   The service list answers "what do you do?" in the studio's terms
   (web, menus, film). Business owners think in problems: too many
   phone bookings, a menu that is out of date, orders in five
   spreadsheets, inquiries nobody answers. Each card names one of those
   problems, shows the system that fixes it in use, says who it
   suits, and ends in a button that opens the inquiry form with the
   right topic already selected — one tap from "that's me" to a lead.

   On wide screens the four systems are told as one scroll story: a
   device frame stays pinned on the left and changes screen as each
   system's text passes the middle of the viewport, with a 01/04 counter
   under it. Watching the product change while reading about it does
   more for "they could build this for me" than four cards side by side.
   Below 900px there is no room to pin anything, so every step carries
   its own photo instead and the page reads as a plain list. The pinned
   frame is decorative (the photos already sit in each step), hence
   aria-hidden; lazy images inside whichever version is display:none are
   never fetched, so each width downloads one set.
   ════════════════════════════════════════════════════════════════ */

const TOPIC_FOR: Record<SolutionId, ContactTopic> = {
  booking: 'software',
  ordering: 'menu',
  dashboard: 'software',
  automation: 'software',
};

const pad = (n: number) => String(n).padStart(2, '0');

export default function Solutions() {
  const { t, i18n } = useTranslation();
  const { solutions } = getHomeContent(i18n.language);
  const [active, setActive] = useState(0);
  const stepRefs = useRef<(HTMLElement | null)[]>([]);

  // The step crossing the middle band of the viewport is the active one.
  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(Number((entry.target as HTMLElement).dataset.index));
        }
      },
      { rootMargin: '-45% 0px -45% 0px' }
    );
    stepRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, [solutions.length]);

  const image = (id: SolutionId, sizes: string) => (
    <img
      src={`${solutionImages[id].stem}-640.webp`}
      srcSet={srcSet(solutionImages[id])}
      sizes={sizes}
      width={solutionImages[id].width}
      height={solutionImages[id].height}
      alt=""
      loading="lazy"
      decoding="async"
    />
  );

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

      <div className="solutions-story">
        <div className="solutions-stage" aria-hidden="true">
          <div className="solutions-frame">
            <div className="solutions-frame-bar">
              <span /><span /><span />
            </div>
            <div className="solutions-frame-screen">
              {solutions.map((s, i) => (
                <div key={s.id} className={`solutions-shot${i === active ? ' is-active' : ''}`}>
                  {image(s.id, '(max-width: 1240px) 52vw, 640px')}
                </div>
              ))}
            </div>
          </div>
          <div className="solutions-progress">
            <span className="solutions-count">{pad(active + 1)}</span>
            <span className="solutions-track">
              <span style={{ transform: `scaleX(${(active + 1) / solutions.length})` }} />
            </span>
            <span>{pad(solutions.length)}</span>
          </div>
        </div>

        <div className="solutions-steps">
          {solutions.map((s, i) => (
            <article
              key={s.id}
              ref={(el) => (stepRefs.current[i] = el)}
              data-index={i}
              className={`solution-step${i === active ? ' is-active' : ''}`}
            >
              <div className="solution-step-media">{image(s.id, '92vw')}</div>
              <span className="solution-step-index" aria-hidden="true">{pad(i + 1)}</span>
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
            </article>
          ))}
        </div>
      </div>

      <p className="solutions-note">{t('solutions_note')}</p>
    </section>
  );
}
