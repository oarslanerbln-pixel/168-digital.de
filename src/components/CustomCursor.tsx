import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  // ⚡ BOLT OPTIMIZATION:
  // WHAT: Replaced useState with useMotionValue and useSpring for mouse coordinates.
  // WHY: useState triggers a full React re-render of this component 60+ times a second on mousemove.
  //      useMotionValue updates the DOM directly outside of React's render cycle.
  //      Also set fixed width/height and only animate 'scale' to prevent layout thrashing.
  // IMPACT: Eliminates unnecessary React re-renders, dropping CPU usage significantly during cursor movement.

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 30, stiffness: 800, mass: 0.1 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      // Direct DOM update via Framer Motion, no React re-render
      cursorX.set(e.clientX - 8);
      cursorY.set(e.clientY - 8);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Manyetik büyüme efekti için buton veya tıklanabilir link üzerine gelindiğinde:
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

    // Düzeltme: Standart mouse cursor'unu gizlemek için:
    document.body.style.cursor = 'none';

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', handleMouseOver);
      document.body.style.cursor = 'auto'; // Temizleme
    };
  }, [cursorX, cursorY]);

  return (
    <>
      <motion.div
        className="custom-cursor"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          position: 'fixed',
          top: 0,
          left: 0,
          width: '16px',
          height: '16px',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 99999,
          backgroundColor: '#ffffff',
          boxShadow: '0 0 10px rgba(255,255,255,0.3)',
          mixBlendMode: 'difference'
        }}
        animate={{
          scale: isHovered ? 3 : 1, // 48px / 16px = 3 for hover effect
          opacity: isHovered ? 1 : 0.8
        }}
        transition={{ type: 'spring', stiffness: 800, damping: 30, mass: 0.1 }}
      />
    </>
  );
}
