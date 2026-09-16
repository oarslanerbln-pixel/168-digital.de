import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ArrowUpRight, PlayCircle } from 'lucide-react';
import { playClick, playTick } from '../utils/audio';
import ProjectModal from './ProjectModal';
import { projects } from '../data/works';

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

  /*
   * The first card spans two of the three columns. That only closes the grid
   * when the column units divide by three — with the span, n projects occupy
   * n + 1 units. It worked at five projects and broke silently at six: the
   * last card was left alone in a row two thirds empty.
   *
   * So the emphasis is applied only when it costs nothing. At six projects
   * the grid is a clean 3 x 2; at five or eight the featured card comes back.
   */
  const featuredSpans = (projects.length + 1) % 3 === 0;

  return (
    <>
      <section id="works" className="section-container">
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

        <div className="works-grid">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              onClick={() => { playClick(); setSelectedProject(project); }}
              onMouseEnter={playTick}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  playClick();
                  setSelectedProject(project);
                }
              }}
              role="button"
              tabIndex={0}
              aria-label={t(project.titleKey)}
              /* `glow-card` is gone: it painted a conic-gradient border
                 spinning on a permanent 6s loop behind every card, and
                 `glass-panel-silver` brought a competing background and
                 its own hover lift. Hover is now handled entirely in CSS
                 (one transform + shadow), and no project colour is
                 injected — see the .project-card note in index.css. */
              className={`project-card${featuredSpans && index === 0 ? ' project-card-featured' : ''}`}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15, margin: '0px 0px -40px 0px' }}
              transition={{ duration: 0.6, delay: Math.min(index, 3) * 0.07, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Live-site capture, shown as shot — the photograph is the only
                  colour on the card.

                  Work without a capture yet used to render no media block at
                  all. That left one card in the grid as a bare slab of text
                  among five photographs, and it was the last one — the grid
                  fell apart exactly where a portfolio should close strongest.
                  It now keeps the same silhouette as its neighbours and says
                  plainly that the capture is still to come. */}
              <div className="project-card-media">
                {project.image ? (
                  <img
                    src={project.image}
                    alt=""
                    loading="lazy"
                    className="project-card-media-img"
                  />
                ) : (
                  <div className="project-card-media-placeholder" aria-hidden="true">
                    <span className="project-card-monogram">{monogram(t(project.titleKey))}</span>
                  </div>
                )}
              </div>

              {/* Project Number Header */}
              <div className="project-card-header">
                <span className="project-card-number">
                  {String(index + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
                </span>
                <ArrowUpRight className="project-card-arrow" size={18} strokeWidth={1.5} aria-hidden="true" />
              </div>

              {/* Content */}
              <div className="project-card-content">
                <h3 className="project-card-title">
                  {t(project.titleKey)}
                  {project.beta && (
                    <span className="project-card-beta">{t('works_beta_badge')}</span>
                  )}
                </h3>
                <p className="project-card-desc">
                  {t(project.descKey)}
                </p>
              </div>

              {/* Tags */}
              <div className="project-card-tags">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="project-tag"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
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
