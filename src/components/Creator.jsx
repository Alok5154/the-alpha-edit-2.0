import { motion } from 'framer-motion';
import './Creator.css';

const SoftwareBadge = ({ label, color, x, y, delay }) => (
  <motion.div 
    className="software-badge glass"
    initial={{ opacity: 0, scale: 0, rotate: -20 }}
    whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.6, type: "spring", stiffness: 200 }}
    whileHover={{ scale: 1.2, rotate: 8, boxShadow: `0 0 20px ${color}44` }}
    style={{ top: y, left: x, borderColor: color }}
  >
    <span style={{ color }}>{label}</span>
  </motion.div>
);

const Creator = () => {
  return (
    <section className="creator-section">
      <div className="container creator-container">
        <motion.div 
          className="creator-portrait-wrapper"
          initial={{ opacity: 0, x: -80, rotateY: 15 }}
          whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ rotateY: -4, rotateX: 2, scale: 1.015 }}
        >
          <div className="creator-portrait-card">
            <div className="creator-hud-rings" aria-hidden="true">
              <span></span>
              <span></span>
              <span></span>
            </div>
            <img src="/portrait.jpg" alt="Alok Verma" className="creator-portrait" />
            <div className="creator-gradient-light" aria-hidden="true"></div>
            <div className="creator-vignette" aria-hidden="true"></div>
          </div>
          
          <div className="software-layer">
            <SoftwareBadge label="Pr" color="#E788FF" x="-10%" y="20%" delay={0.3} />
            <SoftwareBadge label="Ae" color="#9999FF" x="82%" y="14%" delay={0.5} />
            <SoftwareBadge label="Da" color="#FF5555" x="-5%" y="70%" delay={0.7} />
            <SoftwareBadge label="Ps" color="#31A8FF" x="82%" y="66%" delay={0.9} />
          </div>
        </motion.div>

        <motion.div 
          className="creator-info"
          initial={{ opacity: 0, x: 80 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.div
            className="creator-role text-neon"
            initial={{ opacity: 0, letterSpacing: '8px' }}
            whileInView={{ opacity: 1, letterSpacing: '2px' }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            CEO & Founder
          </motion.div>
          <motion.h2
            className="creator-name"
            initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Alok Verma
          </motion.h2>
          <motion.p
            className="creator-bio"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            With over 3 years of experience in the creator economy, Alok founded <strong>The Alpha Edit</strong> to help ambitious YouTubers and brands scale without the burnout. We don't just chop footage—we craft retention-driven narratives, engineer high-CTR thumbnails, and build YouTube strategies that turn casual viewers into loyal subscribers.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

export default Creator;
