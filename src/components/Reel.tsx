import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import './Reel.css';

const words = [
  "3D MODELS",
  "HOCHZEITSFILME",
  "APP BUILDING",
  "SOFTWARE PRODUCTION",
  "AERIAL DRONE",
  "CINEMATICS"
];

export default function Reel() {
  const [index, setIndex] = useState(0);
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

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.error("Video autoplay prevented:", error);
      });
    }
  }, []);

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
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* The Looping Aerial Drone Video */}
        <video 
          ref={videoRef}
          autoPlay 
          loop 
          muted 
          playsInline
          poster="/philosophy_cinematic_visual.png"
          className="reel-video"
        >
          <source src="/video.1.mp4.mp4" type="video/mp4" />
          Your browser does not support the video tag.
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
