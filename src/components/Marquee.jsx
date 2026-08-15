import { motion } from 'framer-motion';
import './Marquee.css';

const Marquee = () => {
  const logos = [
    "YouTube", "TikTok", "Instagram", "Premiere Pro", "After Effects", "DaVinci Resolve", "Canva", "Final Cut Pro", "Photoshop", "Adobe Illustrator", "Adobe XD"
  ];

  return (
    <div className="marquee-container">
      <div className="marquee-content">
        {[...logos, ...logos, ...logos].map((logo, idx) => (
          <motion.div
            key={idx}
            className="marquee-item"
            whileHover={{ scale: 1.15, color: "rgba(217, 253, 49, 0.9)" }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
          >
            <span className="marquee-dot">◆</span>
            {logo}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Marquee;
