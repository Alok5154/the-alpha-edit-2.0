import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useState, useEffect, useCallback } from 'react';
import './CursorFollower.css';

const CursorFollower = () => {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const [isVisible, setIsVisible] = useState(false);
  const [hoverType, setHoverType] = useState(null); // null | 'button' | 'card' | 'input' | 'text'
  const [hoverLabel, setHoverLabel] = useState('');
  const [isMouseDown, setIsMouseDown] = useState(false);

  // Outer ring spring (smooth lag effect)
  const springConfig = { damping: 24, stiffness: 220, mass: 0.25 };
  const followerX = useSpring(cursorX, springConfig);
  const followerY = useSpring(cursorY, springConfig);

  // Ambient aura spring (slower trailing glow)
  const auraConfig = { damping: 30, stiffness: 120, mass: 0.6 };
  const auraX = useSpring(cursorX, auraConfig);
  const auraY = useSpring(cursorY, auraConfig);

  const handleMouseMove = useCallback((e) => {
    cursorX.set(e.clientX);
    cursorY.set(e.clientY);
    if (!isVisible) setIsVisible(true);
  }, [cursorX, cursorY, isVisible]);

  const handleMouseLeave = useCallback(() => {
    setIsVisible(false);
  }, []);

  const handleMouseDown = useCallback(() => {
    setIsMouseDown(true);
  }, []);

  const handleMouseUp = useCallback(() => {
    setIsMouseDown(false);
  }, []);

  useEffect(() => {
    const handleOver = (e) => {
      const target = e.target;
      if (!target) return;

      const clickable = target.closest('a') || target.closest('button') || target.closest('.btn-primary') || target.closest('.filter-chip');
      const pricingCard = target.closest('.pricing-card');
      const learnCard = target.closest('.learn-card');
      const testimonialCard = target.closest('.testimonial-card');
      const inputEl = target.closest('input') || target.closest('textarea') || target.closest('select');

      if (pricingCard) {
        setHoverType('card');
        setHoverLabel('PLAN');
      } else if (learnCard) {
        setHoverType('card');
        setHoverLabel('VIEW');
      } else if (testimonialCard) {
        setHoverType('card');
        setHoverLabel('CLIENT');
      } else if (clickable) {
        setHoverType('button');
        setHoverLabel('');
      } else if (inputEl) {
        setHoverType('input');
        setHoverLabel('');
      } else {
        setHoverType(null);
        setHoverLabel('');
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseover', handleOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseover', handleOver);
    };
  }, [handleMouseMove, handleMouseDown, handleMouseUp, handleMouseLeave]);

  if (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(hover: none)').matches) {
    return null;
  }

  return (
    <>
      {/* Outer Ambient Trail Aura */}
      <motion.div
        className={`cursor-aura ${isVisible ? 'visible' : ''}`}
        style={{
          x: auraX,
          y: auraY,
        }}
      />

      {/* Main Smooth Follower Ring */}
      <motion.div
        className={`cursor-follower ${isVisible ? 'visible' : ''} ${hoverType ? `hover-${hoverType}` : ''} ${isMouseDown ? 'pressed' : ''}`}
        style={{
          x: followerX,
          y: followerY,
        }}
        animate={{
          scale: isMouseDown ? 0.75 : hoverType === 'card' ? 1.6 : hoverType === 'button' ? 1.4 : 1,
        }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      >
        {hoverLabel && (
          <motion.span 
            className="cursor-label"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
          >
            {hoverLabel}
          </motion.span>
        )}
      </motion.div>

      {/* Inner Precision Core Dot */}
      <motion.div
        className={`cursor-dot ${isVisible ? 'visible' : ''} ${hoverType ? 'hidden-dot' : ''}`}
        style={{
          x: cursorX,
          y: cursorY,
        }}
        animate={{
          scale: isMouseDown ? 1.5 : 1,
        }}
      />
    </>
  );
};

export default CursorFollower;
