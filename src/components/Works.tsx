import { useLayoutEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight, PlayCircle } from 'lucide-react';
import { playClick, playTick } from '../utils/audio';
import ProjectModal from './ProjectModal';
import { projects } from '../data/works';
import { useMediaQuery } from '../hooks/useMediaQuery';
import './Works.css';

/* ════════════════════════════════════════════════════════════════
   WORKS — the projects as one camera pan.

   On a wide screen with motion allowed, the section pins and vertical
   scrolling moves the row of projects sideways, the way a camera pans
   across a set; the photos drift slightly against the pan for depth,
   and a hairline under the row shows how far along it is. The pinned
   block is exactly as tall as the row is wide, so scrolling stays 1:1
   and nothing is skipped.

   Everywhere else — phones, tablets, reduced motion, and the
   prerendered HTML — the same row is a native swipe rail with scroll
   snap. It scrolls inside its own container, so it can never widen the
   page (CLAUDE.md rule 2).

   Each card is a real <button> that opens the project modal; it used
   to be a <div role="button"> with its own key handling (rule 5).
   ════════════════════════════════════════════════════════════════ */

/**
 * Two letters from the project name, for cards that have no capture yet.
 *
 * Splits on spaces and hyphens, and also inside a name that runs two words
 * together in camel case — "MediSade" is M and S, not M and E.
 */
function monogram(title: string): string {
  const parts = title
    .trim()
    .split(/[\s-]+/)
    .flatMap(word => word.split(/(?<=[a-zà-ÿ])(?=[A-ZÀ-Þ])/))
    .filter(Boolean);

  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
  return title.replace(/[^A-Za-zÀ-ÿ]/g, '').slice(0, 2).toUpperCase();
}

export default function Works() {
  const { t } = useTranslation();
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);
  const pan = useMediaQuery('(min-width: 1024px) and (prefers-reduced-motion: no-preference)');

  const scrollerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  // How far the row must travel: its width minus the visible width.
  const [distance, setDistance] = useState(0);

  useLayoutEffect(() => {
    if (!pan || !trackRef.current) return;
    const track = trackRef.current;
    const measure = () => setDistance(Math.max(0, track.scrollWidth - window.innerWidth));
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(track);
    window.addEventListener('resize', measure);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, [pan]);

  const { scrollYProgress } = useScroll({ target: scrollerRef, offset: ['start start', 'end end'] });
  const x = useTransform(scrollYProgress, (p) => -p * distance);
  const drift = useTransform(scrollYProgress, (p) => `${(0.5 - p) * 8}%`);

  return (
    <>
      <section id="works" className="works-section">
        <div className="section-container works-intro">
          <span className="works-overline">{t('works_overline', 'Selected work')}</span>
          <h2 className="works-headline">{t('works_title')}</h2>
          <p className="works-subtitle">{t('works_subtitle')}</p>

          <button
            type="button"
            className="works-reel-link"
            onMouseEnter={playTick}
            onClick={() => {
              playClick();
              document.getElementById('reel-card')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }}
          >
            <PlayCircle size={16} strokeWidth={1.75} />
            {t('works_reel_cta')}
          </button>
        </div>

        <div
          ref={scrollerRef}
          className={`works-scroller${pan ? ' is-panning' : ''}`}
          style={pan ? { height: `calc(100vh + ${distance}px)` } : undefined}
        >
          <div className="works-sticky">
            <motion.div
              ref={trackRef}
              className="works-track"
              style={pan ? { x, '--drift': drift } as never : undefined}
            >
              {projects.map((project, index) => (
                <button
                  key={project.id}
                  type="button"
                  className="project-card"
                  onClick={() => { playClick(); setSelectedProject(project); }}
                  onMouseEnter={playTick}
                >
                  {/* Live-site capture, shown as shot — the photograph is the
                      only colour on the card. Work without a capture yet keeps
                      the same silhouette and says plainly that it is coming. */}
                  <span className="project-card-media">
                    {project.image ? (
                      <img
                        src={project.image}
                        alt=""
                        loading="lazy"
                        className="project-card-media-img"
                      />
                    ) : (
                      <span className="project-card-media-placeholder" aria-hidden="true">
                        <span className="project-card-monogram">{monogram(t(project.titleKey))}</span>
                      </span>
                    )}
                  </span>

                  <span className="project-card-header">
                    <span className="project-card-number">
                      {String(index + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
                    </span>
                    <ArrowUpRight className="project-card-arrow" size={18} strokeWidth={1.5} aria-hidden="true" />
                  </span>

                  <span className="project-card-content">
                    <span className="project-card-title">
                      {t(project.titleKey)}
                      {project.beta && (
                        <span className="project-card-beta">{t('works_beta_badge')}</span>
                      )}
                    </span>
                    <span className="project-card-desc">{t(project.descKey)}</span>
                  </span>

                  <span className="project-card-tags">
                    {project.tags.map((tag) => (
                      <span key={tag} className="project-tag">{tag}</span>
                    ))}
                  </span>
                </button>
              ))}
            </motion.div>

            {pan && (
              <div className="works-progress" aria-hidden="true">
                <motion.span style={{ scaleX: scrollYProgress }} />
              </div>
            )}
          </div>
        </div>
      </section>

      <ProjectModal
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
        project={selectedProject}
      />
    </>
  );
}
