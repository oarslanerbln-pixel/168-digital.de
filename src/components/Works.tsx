import { useState, useCallback, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { playClick, playTick } from '../utils/audio';
import ProjectModal from './ProjectModal';
import { projects } from '../data/works';

interface ProjectCardProps {
  project: typeof projects[0];
  index: number;
  projectsLength: number;
  onClick: (project: typeof projects[0]) => void;
  t: (key: string) => string;
}

// ⚡ Bolt: Wrapped in React.memo to prevent unnecessary re-renders of the entire
// list when a single project is clicked to open the modal.
// Impact: Reduces O(N) re-renders to O(1) when selecting a project.
const ProjectCard = memo(function ProjectCard({ project, index, projectsLength, onClick, t }: ProjectCardProps) {
  return (
    <motion.div
      onClick={() => onClick(project)}
      onMouseEnter={playTick}
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
      {/* Project Number Header */}
      <div className="project-card-header">
        <span className="project-card-number">
          {String(index + 1).padStart(2, '0')} / {String(projectsLength).padStart(2, '0')}
        </span>
        <motion.div
          whileHover={{ rotate: 45, scale: 1.2 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <ArrowUpRight size={24} color="var(--accent-silver)" />
        </motion.div>
      </div>

      {/* Accent top line */}
      <div className="project-card-divider" />

      {/* Content */}
      <div className="project-card-content">
        <h3 className="text-silver project-card-title">
          {t(project.titleKey)}
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
  );
});

export default function Works() {
  const { t } = useTranslation();
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

  const handleProjectClick = useCallback((project: typeof projects[0]) => {
    playClick();
    setSelectedProject(project);
  }, []);

  return (
    <>
      <section id="works" className="section-container">
        <h2 className="works-headline">
          <span className="text-silver">{t('works_title')}</span>
        </h2>

        <div className="works-grid">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              projectsLength={projects.length}
              onClick={handleProjectClick}
              t={t}
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
