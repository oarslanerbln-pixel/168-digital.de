import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { animate, useInView } from 'framer-motion';
import { services } from '../data/services';
import { projects } from '../data/works';
import './FactsStrip.css';

/* ════════════════════════════════════════════════════════════════
   FACTS STRIP — four numbers that count up as they scroll in.

   Only numbers the site can back up, and most of them derived from
   the data rather than typed in: the service count from services.ts,
   the project count from works.ts. "3 languages" and "24 h" are the
   commitments already stated in the hero. No invented client counts
   or satisfaction rates (CLAUDE.md, "no number we cannot back up").

   The prerendered HTML carries the final values, so crawlers and the
   first paint read the real numbers; the count-up only starts once the
   strip is on screen, and is skipped for reduced motion.
   ════════════════════════════════════════════════════════════════ */

function CountUp({ to }: { to: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const [value, setValue] = useState(to);

  useEffect(() => {
    if (!inView) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const controls = animate(0, to, {
      duration: 1.4,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setValue(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, to]);

  return <span ref={ref}>{value}</span>;
}

export default function FactsStrip() {
  const { t } = useTranslation();
  const facts = [
    { value: services.length, suffix: '', label: t('facts_services') },
    { value: projects.length, suffix: '', label: t('facts_projects') },
    { value: 3, suffix: '', label: t('facts_languages') },
    { value: 24, suffix: ' h', label: t('facts_reply') },
  ];

  return (
    <section className="facts-strip" aria-label={t('facts_label')}>
      <dl className="facts-grid">
        {facts.map((f) => (
          <div key={f.label} className="fact">
            <dt className="fact-label">{f.label}</dt>
            <dd className="fact-value">
              <CountUp to={f.value} />
              {f.suffix}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
