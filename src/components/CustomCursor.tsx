import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  // Use useMotionValue instead of useState to prevent re-renders on mousemove
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Apply spring physics to the motion values for smooth movement
  const springConfig = { stiffness: 800, damping: 30, mass: 0.1 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
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
          scale: isHovered ? 1.5 : 1,
          opacity: isHovered ? 1 : 0.8,
          // Offset the cursor so the tip is at the mouse position
          // Animated here so transitions are smooth
          marginLeft: isHovered ? '-24px' : '-8px',
          marginTop: isHovered ? '-24px' : '-8px'
        }}
        style={{
          x: smoothMouseX,
          y: smoothMouseY,
          position: 'fixed',
          top: 0,
          left: 0,
          width: isHovered ? '48px' : '16px',
          height: isHovered ? '48px' : '16px',
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
