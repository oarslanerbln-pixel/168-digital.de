import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  // ⚡ Bolt Optimization: Use Framer Motion values instead of React state for mouse position.
  // This prevents the CustomCursor component from re-rendering 60+ times per second on mousemove,
  // significantly reducing Main Thread work and React render cycle overhead.
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 30, stiffness: 800, mass: 0.1 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      // Direct mutation of motion values bypasses React's render phase
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        window.getComputedStyle(target).cursor === 'pointer' ||
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'button'
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mouseover', handleMouseOver);

    document.body.style.cursor = 'none';

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', handleMouseOver);
      document.body.style.cursor = 'auto';
    };
  }, [mouseX, mouseY]);

  return (
    <motion.div
      className="custom-cursor"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: isHovered ? '48px' : '16px',
        height: isHovered ? '48px' : '16px',
        // Offset margin keeps cursor centered without needing to calculate it in x/y
        margin: isHovered ? '-24px 0 0 -24px' : '-8px 0 0 -8px',
        borderRadius: '50%',
        pointerEvents: 'none',
        zIndex: 99999,
        backgroundColor: '#ffffff',
        boxShadow: '0 0 10px rgba(255,255,255,0.3)',
        mixBlendMode: 'difference',
        x: cursorX,
        y: cursorY,
      }}
      animate={{
        scale: isHovered ? 1.5 : 1,
        opacity: isHovered ? 1 : 0.8
      }}
      transition={{ scale: { type: 'spring', stiffness: 800, damping: 30, mass: 0.1 }, opacity: { duration: 0.2 } }}
    />
  );
}
