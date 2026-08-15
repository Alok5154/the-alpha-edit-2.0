import { motion } from 'framer-motion';
import { Video, TrendingUp, Briefcase, Bot } from 'lucide-react';
import './LearnGrid.css';

const features = [
  {
    icon: Video,
    title: "A -> Z of Video Editing",
    items: [
      "Advanced Motion Graphics",
      "Cinematic Color Grading",
      "Dynamic Sound Design"
    ],
    className: "feature-large",
    accent: "#78dcff"
  },
  {
    icon: TrendingUp,
    title: "Growth",
    items: [
      "Content Planning",
      "Retention Scripting",
      "YouTube SEO Strategy",
      "Thumbnail A/B Testing"
    ],
    className: "feature-tall",
    accent: "#d9fd31"
  },
  {
    icon: Bot,
    title: "High-CTR Thumbnails",
    items: [
      "We design custom thumbnails optimized for massive click-through rates."
    ],
    className: "feature-wide",
    accent: "#ff6b6b"
  },
  {
    icon: Briefcase,
    title: "Full Channel Management",
    items: [
      "End-to-end strategy",
      "Upload optimization",
      "Community management",
      "Brand deal negotiations"
    ],
    className: "feature-box",
    accent: "#c084fc"
  }
];

const cardVariants = {
  hidden: { opacity: 0, y: 60, scale: 0.95 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.12,
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

const LearnGrid = () => {
  return (
    <section id="services" className="learn-section">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">What we <span className="text-neon">offer</span></h2>
          <p className="section-subtitle">Everything you need to scale your channel</p>
        </motion.div>

        <div className="learn-grid">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              className={`learn-card glass ${feature.className}`}
              custom={idx}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              variants={cardVariants}
              whileHover={{
                y: -12,
                rotateX: 2,
                rotateY: idx % 2 === 0 ? -3 : 3,
                transition: { duration: 0.3 },
              }}
            >
              <motion.div
                className="card-icon-wrapper"
                whileHover={{ rotate: -8, scale: 1.1 }}
                transition={{ type: 'spring', stiffness: 300 }}
                style={{ '--icon-accent': feature.accent }}
              >
                <feature.icon className="text-neon" size={32} />
              </motion.div>
              <h3 className="card-title">{feature.title}</h3>
              <ul className="card-list">
                {feature.items.map((item, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.12 + i * 0.08, duration: 0.5 }}
                  >
                    {item}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="learn-cta"
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="cta-box glass">
            <h3>We handle everything</h3>
            <p>Not just editing, but strategy, thumbnails, and growth. Focus on creating while we scale your channel and make you revenue.</p>
            <motion.a
              href="https://wa.me/message/XXVVKUQAMRZLG1"
              className="btn-primary"
              whileHover={{ scale: 1.05, boxShadow: '0 16px 40px rgba(217, 253, 49, 0.25)' }}
              whileTap={{ scale: 0.95 }}
            >
              View Plans
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default LearnGrid;
