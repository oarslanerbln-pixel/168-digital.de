import { useState, memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ArrowUpRight, PlayCircle } from 'lucide-react';
import { playClick, playTick } from '../utils/audio';
import ProjectModal from './ProjectModal';
import { projects } from '../data/works';


const ProjectCard = memo(({ project, index, onSelect }: { project: typeof projects[0]; index: number; onSelect: (project: typeof projects[0]) => void }) => {
  const { t } = useTranslation();
  return (
    <motion.div
      onClick={() => onSelect(project)}
      onMouseEnter={playTick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect(project);
        }
      }}
      role="button"
      tabIndex={0}
      aria-label={t(project.titleKey)}
      className="glass-panel-silver glow-card project-card"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -12, scale: 1.01 }}
      style={{
        ['--card-glow' as string]: project.color,
      }}
    >
      <div className="project-card-media">
        <img
          src={project.image}
          alt=""
          loading="lazy"
          className="project-card-media-img"
        />
      </div>

      <div className="project-card-header">
        <span className="project-card-number">
          {String(index + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
        </span>
        <motion.div
          whileHover={{ rotate: 45, scale: 1.2 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <ArrowUpRight size={24} color="var(--card-glow)" />
        </motion.div>
      </div>

      <div className="project-card-divider" />

      <div className="project-card-content">
        <h3 className="text-silver project-card-title">
          {t(project.titleKey)}
        </h3>
        <p className="project-card-desc">
          {t(project.descKey)}
        </p>
      </div>

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
  );
});

export default function Works() {

  const { t } = useTranslation();
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

  const handleProjectSelect = useCallback((project: typeof projects[0]) => {
    playClick();
    setSelectedProject(project);
  }, []);

  return (
    <>
      <section id="works" className="section-container">
        <h2 className="works-headline">
          <span className="text-silver">{t('works_title')}</span>
        </h2>
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
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              onSelect={handleProjectSelect}
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
