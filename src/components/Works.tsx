import React, { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { playClick, playTick } from '../utils/audio';
import ProjectModal from './ProjectModal';
import { projects, WorkProject } from '../data/works';

// ⚡ Bolt Optimization: Extracted ProjectCard into a separate component wrapped in React.memo
// This prevents unnecessary re-renders of the entire project list when a single project is selected
// and the parent `Works` component's state updates.
interface ProjectCardProps {
  project: WorkProject;
  index: number;
  totalProjects: number;
  onClick: (project: WorkProject) => void;
  title: string;
  desc: string;
}

const ProjectCard = React.memo(({ project, index, totalProjects, onClick, title, desc }: ProjectCardProps) => {
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
          {String(index + 1).padStart(2, '0')} / {String(totalProjects).padStart(2, '0')}
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
          {title}
        </h3>
        <p className="project-card-desc">
          {desc}
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
  const [selectedProject, setSelectedProject] = useState<WorkProject | null>(null);

  // ⚡ Bolt Optimization: Stable callback to prevent ProjectCard re-renders
  const handleProjectSelect = useCallback((project: WorkProject) => {
    playClick();
    setSelectedProject(project);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedProject(null);
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
              totalProjects={projects.length}
              onClick={handleProjectSelect}
              title={t(project.titleKey)}
              desc={t(project.descKey)}
            />
          ))}
        </div>
      </section>

      <ProjectModal 
        isOpen={!!selectedProject} 
        onClose={handleCloseModal}
        project={selectedProject} 
      />
    </>
  );
}
