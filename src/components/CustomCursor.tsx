import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Performance Optimization: Use useMotionValue and useSpring instead of useState
  // for high-frequency events like mousemove. This prevents React from re-rendering
  // the component on every single mouse movement.
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);

  const springConfig = { stiffness: 500, damping: 28, mass: 0.1 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

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
      // Update motion values directly to skip React re-renders
      // Base size is 6px (radius 3px). We center the cursor by subtracting 3.
      // We do not adjust the position for the hover state here; we handle hover visually via scaling.
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
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
  }, [cursorX, cursorY]);

  if (isMobile) return null;

  return (
    <>
      <motion.div
        className="custom-cursor"
        animate={{
          width: isHovered ? 32 : 6,
          height: isHovered ? 32 : 6,
          left: isHovered ? -16 : -3,
          top: isHovered ? -16 : -3,
          backgroundColor: isHovered ? 'rgba(255, 255, 255, 0)' : 'rgba(255, 255, 255, 1)',
          border: isHovered ? '1px solid rgba(255, 255, 255, 0.4)' : '0px solid rgba(255, 255, 255, 0)'
        }}
        transition={{ duration: 0.15, ease: "easeOut" }}
        style={{
          // Performance Optimization: Assign motion values directly to `x` and `y` in the style object
          // instead of `translateX` and `translateY` to preserve internal transformation matrix integrity.
          x: cursorXSpring,
          y: cursorYSpring,
          position: 'fixed',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 99999,
          mixBlendMode: 'difference'
        }}
      />
    </>
  );
}
