import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import './FAQ.css';

const faqs = [
  {
    question: "WHAT IS YOUR TURNAROUND TIME?",
    answer: "Typically 48-72 hours for standard YouTube videos, and 24 hours for Shorts/Reels."
  },
  {
    question: "WHAT KIND OF VIDEOS DO YOU EDIT?",
    answer: "We specialize in YouTube long-form, Shorts, TikToks, Instagram Reels, and Video Podcasts."
  },
  {
    question: "HOW DO WE COMMUNICATE AND SHARE FILES?",
    answer: "We set up a dedicated Slack channel for your brand and use Frame.io/Google Drive for seamless file sharing and revisions."
  },
  {
    question: "DO YOU PROVIDE THUMBNAILS?",
    answer: "Yes! Our Elite and Ultimate packages include custom, high-CTR thumbnails with A/B testing variations."
  },
  {
    question: "DO I NEED TO PROVIDE EDITING ASSETS OR MUSIC?",
    answer: "No, we have licensed access to premium stock footage, SFX libraries, and copyright-free music (Epidemic Sound/Artlist)."
  },
  {
    question: "CAN I REQUEST REVISIONS?",
    answer: "Absolutely. Each package includes standard revision rounds to ensure the final cut perfectly matches your vision."
  }
];

const FAQItem = ({ faq, isOpen, onClick, index }) => {
  return (
    <motion.div
      className={`faq-item ${isOpen ? 'open' : ''}`}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ x: 6 }}
    >
      <button className="faq-question" onClick={onClick}>
        <span>{faq.question}</span>
        <motion.div
          className="faq-icon"
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          {isOpen ? <Minus size={16} /> : <Plus size={16} />}
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="faq-answer-wrapper"
          >
            <motion.div
              className="faq-answer"
              initial={{ y: -8 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.3, delay: 0.05 }}
            >
              {faq.answer}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="faq-section">
      <div className="container">
        <motion.h2
          className="faq-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Got Questions?
        </motion.h2>

        <div className="faq-list">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              faq={faq}
              isOpen={openIndex === index}
              onClick={() => toggleFAQ(index)}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
