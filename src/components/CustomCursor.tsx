import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  // Use useMotionValue instead of useState for high-frequency updates like mousemove.
  // This prevents React from re-rendering the component ~60+ times per second.
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 30, stiffness: 800, mass: 0.1 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);

  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      // Set raw mouse position without offset
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
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
  }, []);

  return (
    <>
      <motion.div
        style={{
          x: smoothX,
          y: smoothY,
          position: 'fixed',
          top: 0,
          left: 0,
          pointerEvents: 'none',
          zIndex: 99999
        }}
      >
        <motion.div
          className="custom-cursor"
          animate={{
            x: isHovered ? -24 : -8,
            y: isHovered ? -24 : -8,
            scale: isHovered ? 1.5 : 1,
            opacity: isHovered ? 1 : 0.8
          }}
          style={{
            width: isHovered ? '48px' : '16px',
            height: isHovered ? '48px' : '16px',
            borderRadius: '50%',
            backgroundColor: '#ffffff',
            boxShadow: '0 0 10px rgba(255,255,255,0.3)',
            mixBlendMode: 'difference'
          }}
        />
      </motion.div>
    </>
  );
}
