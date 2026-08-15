import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import './StackingSection.css';

const StackingSection = ({ children, index, totalSections }) => {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const isLast = index === totalSections - 1;

  // Scale down and sink backward as you scroll past
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.86]);
  const opacity = useTransform(scrollYProgress, [0, 0.75, 1], [1, 0.7, 0.4]);
  const blur = useTransform(scrollYProgress, [0, 1], ["blur(0px)", "blur(8px)"]);

  return (
    <div ref={containerRef} className="stacking-card-wrapper">
      <motion.div
        className="stacking-card-inner"
        style={{
          scale: isLast ? 1 : scale,
          opacity: isLast ? 1 : opacity,
          filter: isLast ? 'none' : blur,
          zIndex: index + 1,
        }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default StackingSection;
