'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  // Koordinat mouse langsung (akurasi instan)
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Animasi pegas lembut untuk cincin pelacak (smooth trailing)
  const springConfig = { damping: 25, stiffness: 350, mass: 0.4 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Nonaktifkan pada layar sentuh (mobile/tablet)
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouchDevice(true);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (!target) return;

      const clickable = Boolean(
        target.closest('a, button, [role="button"], input, select, textarea, .cursor-pointer')
      );
      setIsHovered(clickable);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isVisible, mouseX, mouseY]);

  if (isTouchDevice || !isVisible) return null;

  return (
    <>
      {/* 1. Titik Presisi (Center Dot) - Menempel instan di titik klik mouse */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[99999] rounded-full bg-black"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
          width: 5,
          height: 5,
        }}
        animate={{
          scale: isHovered ? 0 : 1,
          opacity: isHovered ? 0 : 1,
        }}
        transition={{ duration: 0.15 }}
      />

      {/* 2. Cincin Pelacak (Follower Ring) - Mengikuti dengan gerakan halus dan membesar saat hover */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[99998] rounded-full border border-black/40 bg-black/5"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: isHovered ? 46 : 28,
          height: isHovered ? 46 : 28,
          borderColor: isHovered ? 'rgba(0, 0, 0, 0.65)' : 'rgba(0, 0, 0, 0.3)',
          backgroundColor: isHovered ? 'rgba(0, 0, 0, 0.08)' : 'rgba(0, 0, 0, 0.02)',
        }}
        transition={{
          type: 'spring',
          damping: 22,
          stiffness: 300,
          mass: 0.4,
        }}
      />
    </>
  );
}
