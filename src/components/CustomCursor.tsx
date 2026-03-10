import React, { useEffect, useState } from 'react';
import { motion, useSpring } from 'motion/react';

export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const mouseX = useSpring(0, { stiffness: 500, damping: 28 });
  const mouseY = useSpring(0, { stiffness: 500, damping: 28 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.closest('button') || 
        target.closest('a') ||
        target.classList.contains('cursor-pointer')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [mouseX, mouseY]);

  return (
    <motion.div
      style={{
        x: mouseX,
        y: mouseY,
        translateX: '-50%',
        translateY: '-50%',
      }}
      className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-[9999] hidden lg:block"
    >
      <motion.div
        animate={{
          scale: isHovering ? 2.5 : 1,
          backgroundColor: isHovering ? 'rgba(242, 125, 38, 0.15)' : 'rgba(242, 125, 38, 0)',
          borderWidth: isHovering ? '1px' : '2px',
          borderColor: isHovering ? 'rgba(242, 125, 38, 0.5)' : 'rgba(242, 125, 38, 0.8)',
        }}
        className="w-full h-full rounded-full border-delta-gold flex items-center justify-center transition-colors duration-300"
      >
        <motion.div 
          animate={{ scale: isHovering ? 0 : 1 }}
          className="w-1 h-1 bg-delta-gold rounded-full" 
        />
      </motion.div>
    </motion.div>
  );
}
