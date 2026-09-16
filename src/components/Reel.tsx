import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import './Reel.css';

const words = [
  "HOCHZEITSFILME",
  "APP BUILDING",
  "SOFTWARE PRODUCTION",
  "AERIAL DRONE",
  "COLOR GRADING"
];

/**
 * Decide what this visitor should download for the showreel.
 *
 * The clip is decoration: it plays muted and looping at 0.85 opacity behind
 * a heavy vignette with the headline on top of it. Nobody reads the water,
 * so it is encoded far below the panel's pixel size — and for anyone who has
 * asked not to be sent megabytes, or not to be shown motion, the poster
 * frame alone tells the same story at 54 KB.
 *
 * Resolved once, at mount, rather than on resize: swapping the source
 * mid-playback would restart the clip, and the size difference between the
 * two files does not justify that.
 */
function pickReelSource(): string | null {
  if (typeof window === 'undefined') return null;

  // Save-Data header equivalent — set by the visitor, or by the browser on a
  // metered connection. Not in every browser's typings, hence the cast.
  const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
  if (connection?.saveData) return null;

  if (window.matchMedia('(prefers-reduced-data: reduce)').matches) return null;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return null;

  // A phone shows the panel about 360 px wide; the 960 file is for the
  // 1184 px it reaches on a desktop.
  return window.matchMedia('(max-width: 768px)').matches
    ? '/reel-640.mp4'
    : '/reel-960.mp4';
}

export default function Reel() {
  const [index, setIndex] = useState(0);
  const [inView, setInView] = useState(false);
  // Resolved once on mount: which file to attach, or null for poster only.
  const [source] = useState(pickReelSource);
  const cardRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Motion values for smooth 3D tilt effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth springs to avoid jittery movements
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [6, -6]), { stiffness: 120, damping: 15 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-6, 6]), { stiffness: 120, damping: 15 });

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  // Defer fetching the video until this section is about to scroll into
  // view, instead of downloading it eagerly on page load — it sits below
  // the fold and shouldn't compete with the hero's initial paint.
  useEffect(() => {
    if (inView && source && videoRef.current) {
      videoRef.current.load();
      videoRef.current.play().catch(error => {
        console.error("Video autoplay prevented:", error);
      });
    }
  }, [inView, source]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;
    x.set(mouseX / width);
    y.set(mouseY / height);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div id="reel-card" className="reel-card-container">
      <motion.div
        ref={cardRef}
        className="glass-panel glow-card reel-glass-panel"
        style={{
          '--card-glow': 'var(--accent-cyan)',
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        } as React.CSSProperties}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "0px" }}
        onViewportEnter={() => setInView(true)}
        transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* The looping aerial drone clip. The source is attached only once the
            panel is in view (see the effect above), and only if this visitor
            should get one at all — otherwise the poster stands in for it.

            The poster is a frame from the clip itself. It used to be
            philosophy_cinematic_visual.webp, an unrelated image, so the panel
            showed one picture and then cut to something else entirely. */}
        <video
          ref={videoRef}
          loop
          muted
          playsInline
          preload="none"
          poster="/reel-poster.webp"
          className="reel-video"
        >
          {inView && source && <source src={source} type="video/mp4" />}
        </video>
        
        {/* Cinematic Vignette Overlay */}
        <div className="reel-vignette" />

        {/* ─── High-End Camera HUD Viewfinder Elements ─── */}
        <div className="hud-corner hud-corner-tl" />
        <div className="hud-corner hud-corner-tr" />
        <div className="hud-corner hud-corner-bl" />
        <div className="hud-corner hud-corner-br" />


        {/* Animated Text Overlay */}
        <div className="reel-text-overlay" style={{ transform: 'translateZ(30px) translate(-50%, -50%)' }}>
          <AnimatePresence mode="wait">
            <motion.h2
              key={index}
              initial={{ opacity: 0, y: 15, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -15, filter: 'blur(8px)' }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="reel-text text-silver"
            >
              {words[index]}
            </motion.h2>
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
