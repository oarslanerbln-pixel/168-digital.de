import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Use motion values for smooth performance instead of state
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Apply spring physics
  const springX = useSpring(mouseX, { stiffness: 500, damping: 28, mass: 0.1 });
  const springY = useSpring(mouseY, { stiffness: 500, damping: 28, mass: 0.1 });

  useEffect(() => {
    // Basic mobile/touch check
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768 || 'ontouchstart' in window);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    if (window.innerWidth <= 768 || 'ontouchstart' in window) {
      document.body.style.cursor = 'auto';
      return () => { window.removeEventListener('resize', checkMobile); };
    }

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

  if (isMobile) return null;

  return (
    <>
      <motion.div
        className="custom-cursor-wrapper"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          pointerEvents: 'none',
          zIndex: 99999,
          mixBlendMode: 'difference',
          x: springX,
          y: springY,
        }}
      >
        <motion.div
          className="custom-cursor"
          animate={{
            x: isHovered ? -16 : -3,
            y: isHovered ? -16 : -3,
            width: isHovered ? 32 : 6,
            height: isHovered ? 32 : 6,
            backgroundColor: isHovered ? 'rgba(255, 255, 255, 0)' : 'rgba(255, 255, 255, 1)',
            border: isHovered ? '1px solid rgba(255, 255, 255, 0.4)' : '0px solid rgba(255, 255, 255, 0)'
          }}
          transition={{ type: 'spring', stiffness: 500, damping: 28, mass: 0.1 }}
          style={{
            borderRadius: '50%',
          }}
        />
      </motion.div>
    </>
  );
}
