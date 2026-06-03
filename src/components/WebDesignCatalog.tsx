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
        <div className="flex flex-col md:flex-row justify-between items-end mb-16">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-[1px] w-8 bg-[#c9a96e]"></div>
              <span className="text-[#c9a96e] font-mono text-[10px] uppercase tracking-[0.2em]">Design Library</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-serif text-[#f0ede8]">
              50 Premium Web <em className="text-transparent" style={{ WebkitTextStroke: '1px #c9a96e' }}>Concepts</em>
            </h2>
          </div>
          <p className="text-[#8a8a94] font-sans text-sm max-w-sm mt-6 md:mt-0 leading-relaxed">
            A curated collection of highly aesthetic, conversion-optimized design archetypes crafted for forward-thinking brands.
          </p>
        </div>

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
              className="group relative z-10 px-8 md:px-10 py-4 bg-[#c9a96e] text-[#0a0800] rounded-full font-mono text-[11px] md:text-[12px] font-bold tracking-[0.2em] uppercase transition-all duration-300 flex items-center gap-4 shadow-[0_0_20px_rgba(201,169,110,0.3)] hover:shadow-[0_0_45px_rgba(201,169,110,0.6)] hover:scale-105 hover:bg-[#e8c97a]"
            >
              <span>Explore All 50 Concepts</span>
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0a0800] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#0a0800]"></span>
              </span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
