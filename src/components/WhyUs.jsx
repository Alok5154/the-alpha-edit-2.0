import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import './WhyUs.css';

const WhyUs = () => {
  const diagramRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const diagram = diagramRef.current;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.35 }
    );

    if (diagram) {
      observer.observe(diagram);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="whyus" className="whyus-section">
      <div className="container">
        <motion.h2
          className="whyus-title"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          WHY THE ALPHA EDIT?
        </motion.h2>

        <motion.div
          ref={diagramRef}
          className={`diagram-container ${isVisible ? 'is-visible' : ''}`}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <div className="diagram-side left-side">
            <span>Hand off your</span>
            <span className="italic-text">Raw Footage</span>
          </div>

          <div className="diagram-center">
            <svg className="journey-svg" viewBox="0 0 640 300" aria-hidden="true">
              <defs>
                <filter id="journeyGlow" x="-40%" y="-40%" width="180%" height="180%">
                  <feGaussianBlur stdDeviation="4" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <linearGradient id="journeyLineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="rgba(255,255,255,0.18)" />
                  <stop offset="62%" stopColor="rgba(120,220,255,0.48)" />
                  <stop offset="100%" stopColor="rgba(217,253,49,0.95)" />
                </linearGradient>
              </defs>
              <path
                className="journey-arc-base journey-arc-left"
                d="M 260 8 A 250 142 0 0 0 260 292"
              />
              <path
                className="journey-arc-base journey-arc-right-base"
                d="M 380 8 A 250 142 0 0 1 380 292"
              />
              <path
                className="journey-arc-glow"
                pathLength="1"
                d="M 380 8 A 250 142 0 0 1 380 292"
              />
              <path
                className="journey-path journey-path-top-left"
                pathLength="1"
                d="M 0 46 H 220"
              />
              <path
                className="journey-path journey-path-top-right"
                pathLength="1"
                d="M 410 46 H 640"
              />
              <path
                className="journey-path journey-path-middle-left"
                pathLength="1"
                d="M 0 150 H 240"
              />
              <path
                className="journey-path journey-path-middle-right"
                pathLength="1"
                d="M 390 150 H 640"
              />
              <path
                className="journey-path journey-path-bottom-left"
                pathLength="1"
                d="M 0 254 H 220"
              />
              <path
                className="journey-path journey-path-bottom-right"
                pathLength="1"
                d="M 410 254 H 640"
              />
            </svg>

            <div className="diagram-node node-top">
              Viral<br />Short-Form Edits
            </div>
            <div className="diagram-node node-middle">
              High-Retention<br />YouTube Videos
            </div>
            <div className="diagram-node node-bottom">
              Thumbnails &<br />Channel Strategy
            </div>
          </div>

          <div className="diagram-side right-side">
            <span className="text-neon">Scale your</span>
            <span className="text-neon italic-text">Revenue</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyUs;
