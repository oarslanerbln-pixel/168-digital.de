import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { playTick } from '../utils/audio';
import './HomeOutro.css';

/* ════════════════════════════════════════════════════════════════
   HOME OUTRO — two hairline doorways to the sections that moved off
   the homepage (philosophy, and the 50-concept design library).

   These keep both pages one click away and internally linked for
   crawlers, without spending another 5,000px of homepage height on
   content most first-time visitors never scroll to.
   ════════════════════════════════════════════════════════════════ */

const doors = [
  {
    to: '/about',
    numeral: '01',
    titleKey: 'outro_about_title',
    titleFallback: 'Philosophy',
    descKey: 'outro_about_desc',
    descFallback: 'The ratio, the ethics and the people behind the studio.',
  },
  {
    to: '/concepts',
    numeral: '02',
    titleKey: 'outro_concepts_title',
    titleFallback: '50 Web Concepts',
    descKey: 'outro_concepts_desc',
    descFallback: 'Our full design library — browse every direction we build in.',
  },
];

export default function HomeOutro() {
  const { t } = useTranslation();

  return (
    <section className="home-outro" aria-label={t('outro_label', 'More')}>
      <div className="home-outro-inner">
        {doors.map((door) => (
          <Link
            key={door.to}
            to={door.to}
            className="home-outro-door"
            onMouseEnter={playTick}
          >
            <span className="home-outro-num">{door.numeral}</span>
            <span className="home-outro-body">
              <span className="home-outro-title">{t(door.titleKey, door.titleFallback)}</span>
              <span className="home-outro-desc">{t(door.descKey, door.descFallback)}</span>
            </span>
            <ArrowUpRight className="home-outro-arrow" size={18} strokeWidth={1.5} aria-hidden="true" />
          </Link>
        ))}
      </div>
    </section>
  );
}
