import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { X, ExternalLink } from 'lucide-react';
import { playClick, playTick } from '../utils/audio';
import { useEscapeToClose } from '../hooks/useEscapeToClose';

interface Project {
  id: string;
  url: string;
  titleKey: string;
  descKey: string;
  image?: string;
  color?: string;
}

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: Project | null;
}

export default function ProjectModal({ isOpen, onClose, project }: ProjectModalProps) {
  const { t } = useTranslation();
  useEscapeToClose(isOpen && !!project, onClose);

  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className="modal-overlay"
          onClick={() => { playClick(); onClose(); }}
        >
          <motion.div
            initial={{ scale: 0.95, y: 30, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.95, y: 30, opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-modal-title"
            style={project.color ? { ['--card-glow' as string]: project.color } : undefined}
          >
            <button
              onClick={() => { playClick(); onClose(); }}
              onMouseEnter={playTick}
              className="glass-panel modal-close-btn"
              aria-label={t('works_close_modal')}
            >
              <X size={24} />
            </button>

            {project.image && (
              <div className="modal-media">
                <img src={project.image} alt="" className="modal-media-img" />
              </div>
            )}

            <h2 id="project-modal-title" className="display-h modal-title">
              <span className="text-silver modal-title-text">
                {t(project.titleKey)}
              </span>
            </h2>
            
            <p className="modal-description">
              {t(project.descKey)}
            </p>

            <div className="modal-actions">
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={playTick}
                onClick={playClick}
                className="premium-button premium-button-silver"
              >
                {t('works_visit_platform')} <ExternalLink size={20} />
              </a>

              <button
                onClick={() => { playClick(); onClose(); }}
                onMouseEnter={playTick}
                className="premium-button premium-button-glass"
              >
                {t('works_return_gallery')}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
