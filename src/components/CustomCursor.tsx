import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [isHovered, setIsHovered] = useState(false);

  // ⚡ Bolt: Performance optimization
  // Using useMotionValue instead of useState for high-frequency events like mousemove
  // This prevents React from re-rendering the component 60+ times a second
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { stiffness: 800, damping: 30, mass: 0.1 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      // Offset by half of base size (16px / 2 = 8px) to center it
      mouseX.set(e.clientX - 8);
      mouseY.set(e.clientY - 8);
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
  }, [mouseX, mouseY]);

  return (
    <>
      <motion.div
        className="custom-cursor"
        animate={{
          scale: isHovered ? 3 : 1, // Base size is 16px. 16 * 3 = 48px
          opacity: isHovered ? 1 : 0.8
        }}
        transition={{ scale: { type: 'spring', stiffness: 800, damping: 30, mass: 0.1 } }}
        style={{
          x: springX,
          y: springY,
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
      />
    </>
  );
}
