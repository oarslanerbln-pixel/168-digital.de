import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [isHovered, setIsHovered] = useState(false);

  // Use Framer Motion values to avoid React re-renders on mousemove
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);

  const springConfig = { stiffness: 800, damping: 30, mass: 0.1 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
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
  }, []);

  return (
    <>
      <motion.div
        className="custom-cursor"
        animate={{
          scale: isHovered ? 4.5 : 1, // 4.5 * 16px = 72px (equivalent to 48px * 1.5 in previous implementation)
          opacity: isHovered ? 1 : 0.8
        }}
        style={{
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
          mixBlendMode: 'difference',
          x: cursorXSpring,
          y: cursorYSpring,
        }}
      />
    </>
  );
}
