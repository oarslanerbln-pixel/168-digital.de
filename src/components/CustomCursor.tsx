import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  // Bolt Optimization: Replace useState with useMotionValue to prevent re-renders on mousemove
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);

  // Spring config for smooth follow
  const springConfig = { damping: 28, stiffness: 500, mass: 0.1 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

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
      // Bolt Optimization: Update motion values directly instead of triggering a React state update
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
  }, []);

  if (isMobile) return null;

  return (
    <>
      <motion.div
        className="custom-cursor"
        animate={{
          // Bolt Optimization: Animate `scale` instead of `width`/`height` to avoid layout thrashing
          scale: isHovered ? 1 : 0.1875, // 0.1875 is 6 / 32
          backgroundColor: isHovered ? 'rgba(255, 255, 255, 0)' : 'rgba(255, 255, 255, 1)',
          border: isHovered ? '1px solid rgba(255, 255, 255, 0.4)' : '0px solid rgba(255, 255, 255, 0)'
        }}
        transition={{ duration: 0.15 }}
        style={{
          position: 'fixed',
          // Center the fixed-size cursor natively
          top: -16,
          left: -16,
          // Fixed size to prevent layout thrashing
          width: 32,
          height: 32,
          // Bolt Optimization: Use hardware-accelerated transforms powered directly by motion values
          x: cursorXSpring,
          y: cursorYSpring,
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 99999,
          mixBlendMode: 'difference'
        }}
      />
    </>
  );
}
