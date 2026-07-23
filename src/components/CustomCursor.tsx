import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 500, damping: 28, mass: 0.1 });
  const springY = useSpring(mouseY, { stiffness: 500, damping: 28, mass: 0.1 });
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Basic mobile/touch check
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768 || 'ontouchstart' in window);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    // Respect prefers-reduced-motion: hijacking the OS cursor with no way
    // to opt out is a real accessibility problem for people who rely on
    // their system's cursor size/contrast settings.
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setPrefersReducedMotion(reduced);

    if (window.innerWidth <= 768 || 'ontouchstart' in window || reduced) {
      document.body.style.cursor = 'auto';
      return () => { window.removeEventListener('resize', checkMobile); };
    }

    // Update the motion values directly instead of via React state — this
    // runs on every mousemove (dozens of times a second) and driving it
    // through setState would re-render the component on each one.
    const updateMousePosition = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        window.getComputedStyle(target).cursor === 'pointer' ||
        target.closest('a') ||
        target.closest('button')
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mouseover', handleMouseOver);

    // Hide default cursor on desktop
    document.body.style.cursor = 'none';

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('resize', checkMobile);
      document.body.style.cursor = 'auto';
    };
  }, []);

  if (isMobile || prefersReducedMotion) return null;

  return (
    <>
      <motion.div
        className="custom-cursor"
        animate={{
          width: isHovered ? 32 : 6,
          height: isHovered ? 32 : 6,
          marginLeft: isHovered ? -16 : -3,
          marginTop: isHovered ? -16 : -3,
          backgroundColor: isHovered ? 'rgba(255, 255, 255, 0)' : 'rgba(255, 255, 255, 1)',
          border: isHovered ? '1px solid rgba(255, 255, 255, 0.4)' : '0px solid rgba(255, 255, 255, 0)'
        }}
        transition={{ type: 'spring', stiffness: 500, damping: 28, mass: 0.1 }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          x: springX,
          y: springY,
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 99999,
          mixBlendMode: 'difference'
        }}
      />
    </>
  );
}
