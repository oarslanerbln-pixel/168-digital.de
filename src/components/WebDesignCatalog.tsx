import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { webDesignConcepts } from '../data/webDesignConcepts';
import './WebDesignCatalog.css';

export default function WebDesignCatalog() {
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Show 8 initially
  const displayedConcepts = isExpanded ? webDesignConcepts : webDesignConcepts.slice(0, 8);

  return (
    <section className="relative py-24 z-10 web-design-catalog-container">
      <div className="max-w-[1300px] mx-auto px-6 md:px-12">
        <motion.div 
          className="services-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="services-overline">DESIGN LIBRARY</span>
          <h2 className="services-title text-silver">
            50 Premium Web <em className="text-transparent" style={{ WebkitTextStroke: '1px #c9a96e' }}>Concepts</em>
          </h2>
          <p className="text-silver mt-6" style={{ maxWidth: '500px', margin: '20px auto 0', opacity: 0.7, fontSize: '14px', lineHeight: 1.6 }}>
            A curated collection of highly aesthetic, conversion-optimized design archetypes crafted for forward-thinking brands.
          </p>
        </motion.div>

        <motion.div layout className="wd-grid">
          <AnimatePresence>
            {displayedConcepts.map((concept, i) => (
              <motion.div
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: isExpanded ? (i % 8) * 0.05 : 0 }}
                key={concept.id} 
                className={`card ${concept.theme}`}
              >
                <div className="cn">{concept.category}</div>
                <div className="ct">{concept.title}</div>
                <div className="div"></div>
                <div className="cd">{concept.description}</div>
                <div className="meta">
                  {concept.tags.map(tag => (
                    <div key={tag} className="pill">{tag}</div>
                  ))}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {!isExpanded && (
          <div className="mt-4 flex justify-center relative pt-24 pb-12">
            {/* Smooth gradient mask to fade out the grid gracefully */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent -top-32 pointer-events-none" />
            
            {/* Premium Button */}
            <button 
              onClick={() => setIsExpanded(true)}
              className="group relative z-10 px-10 py-4 bg-black/40 border border-[#c9a96e]/30 text-[#c9a96e] rounded-full font-sans text-xs tracking-[0.2em] uppercase transition-all duration-500 hover:border-[#c9a96e] hover:bg-[#c9a96e]/10 hover:shadow-[0_0_30px_rgba(201,169,110,0.15)] flex items-center gap-4 backdrop-blur-md"
            >
              <span className="opacity-80 group-hover:opacity-100 transition-opacity">Explore All Concepts</span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
