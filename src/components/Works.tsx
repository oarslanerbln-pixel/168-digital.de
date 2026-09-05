import { useState, useCallback, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ArrowUpRight, PlayCircle } from 'lucide-react';
import { playClick, playTick } from '../utils/audio';
import ProjectModal from './ProjectModal';
import { projects } from '../data/works';

// ⚡ BOLT OPTIMIZATION:
// Extracted project card into a memoized component.
// This prevents all cards in the grid from re-rendering when the user
// clicks one to open the modal (which updates the `selectedProject` state).
const ProjectCardItem = memo(({ project, index, totalProjects, t, onSelect }: { project: typeof projects[0], index: number, totalProjects: number, t: any, onSelect: (project: typeof projects[0]) => void }) => {
  return (
    <motion.div
      /* `glow-card` is gone: it painted a conic-gradient border
         spinning on a permanent 6s loop behind every card, and
         `glass-panel-silver` brought a competing background and
         its own hover lift. Hover is now handled entirely in CSS
         (one transform + shadow), and no project colour is
         injected — see the .project-card note in index.css. */
      onClick={() => { playClick(); onSelect(project); }}
      onMouseEnter={playTick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          playClick();
          onSelect(project);
        }
      }}
      role="button"
      tabIndex={0}
      aria-label={t(project.titleKey)}
      className={`project-card${index === 0 ? ' project-card-featured' : ''}`}
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15, margin: '0px 0px -40px 0px' }}
      transition={{ duration: 0.6, delay: Math.min(index, 3) * 0.07, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Live-site capture, shown as shot — the photograph is the
          only colour on the card. */}
      <div className="project-card-media">
        <img
          src={project.image}
          alt=""
          loading="lazy"
          className="project-card-media-img"
        />
      </div>

      {/* Project Number Header */}
      <div className="project-card-header">
        <span className="project-card-number">
          {String(index + 1).padStart(2, '0')} / {String(totalProjects).padStart(2, '0')}
        </span>
        <ArrowUpRight className="project-card-arrow" size={18} strokeWidth={1.5} aria-hidden="true" />
      </div>

      {/* Content */}
      <div className="project-card-content">
        <h3 className="project-card-title">
          {t(project.titleKey)}
        </h3>
        <p className="project-card-desc">
          {t(project.descKey)}
        </p>
      </div>

      {/* Tags */}
      <div className="project-card-tags">
        {project.tags.map((tag: string) => (
          <span key={tag} className="project-tag">
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  );
});

export default function Works() {
  const { t } = useTranslation();
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

  const handleSelectProject = useCallback((project: typeof projects[0]) => {
    setSelectedProject(project);
  }, []);

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
            <ProjectCardItem
              key={project.id}
              project={project}
              index={index}
              totalProjects={projects.length}
              t={t}
              onSelect={handleSelectProject}
            />
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
