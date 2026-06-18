import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  // Use MotionValues instead of React state for high-frequency updates to prevent re-renders
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Apply spring physics directly to the motion values
  const springConfig = { stiffness: 800, damping: 30, mass: 0.1 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
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
  }, []);

  return (
    <>
      <motion.div
        className="custom-cursor"
        animate={{
          scale: isHovered ? 3 : 1, // Hardware accelerated scale instead of width/height
          opacity: isHovered ? 1 : 0.8
        }}
        style={{
          x: cursorX,
          y: cursorY,
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
