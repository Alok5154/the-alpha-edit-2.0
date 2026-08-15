import { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { 
  Mail, 
  ArrowUpRight, 
  MessageCircle, 
  ShieldCheck, 
  Zap, 
  Clock, 
  Sparkles, 
  ArrowUp,
  Send,
  CheckCircle2,
  Star
} from 'lucide-react';
import './Footer.css';

const InstagramIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const LinkedinIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

const YoutubeIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
  </svg>
);

const socialLinks = [
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/thealphaedit.in?igsh=MWF5N3puMThuenk2eg==',
    icon: InstagramIcon,
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/company/thealphaedit/?viewAsMember=true',
    icon: LinkedinIcon,
  },
  {
    label: 'YouTube',
    href: 'https://youtube.com',
    icon: YoutubeIcon,
  },
  {
    label: 'Email',
    href: 'mailto:thealphaedit101@gmail.com',
    icon: Mail,
  },
];

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mqenwpvr';

const Footer = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: 'YouTube Long-Form Editing',
    details: '',
  });
  const [formStatus, setFormStatus] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setFormStatus(null);

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          service: formData.service,
          details: formData.details,
          _subject: 'Custom Video Editing Strategy Request',
        }),
      });

      if (!response.ok) {
        throw new Error('Form submission failed');
      }

      setFormStatus('success');
      setFormData({ name: '', email: '', service: 'YouTube Long-Form Editing', details: '' });
    } catch {
      const mailBody = `Name: ${formData.name}\nEmail: ${formData.email}\nService: ${formData.service}\nDetails: ${formData.details}`;
      window.location.href = `mailto:thealphaedit101@gmail.com?subject=Custom Video Editing Strategy Request&body=${encodeURIComponent(mailBody)}`;
      setFormStatus('success');
    } finally {
      setSubmitting(false);
    }
  };

  const footerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ["start end", "end start"]
  });

  const yTransform = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const rotateTransform = useTransform(scrollYProgress, [0, 1], [0, 360]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* High-Converting Final Call To Action Banner */}
      <section className="final-cta-section" ref={footerRef}>
        <div className="spotlight-bg"></div>

        {/* Shooting Stars and Parallax Background Accents */}
        <div className="shooting-stars">
          <div className="shooting-star" style={{ left: '10%', top: '20%' }}></div>
          <div className="shooting-star" style={{ animationDelay: '3s', left: '70%', top: '15%' }}></div>
          <div className="shooting-star" style={{ animationDelay: '5s', left: '50%', top: '55%' }}></div>
        </div>

        <motion.div
          className="parallax-star left"
          style={{ y: yTransform, rotate: rotateTransform }}
        >
          <Star size={160} strokeWidth={1} />
        </motion.div>

        <motion.div
          className="parallax-star right"
          style={{ y: useTransform(scrollYProgress, [0, 1], [-100, 100]), rotate: useTransform(scrollYProgress, [0, 1], [360, 0]) }}
        >
          <Star size={130} strokeWidth={1} />
        </motion.div>

        <div className="container final-cta-container">
          <motion.div
            className="cta-pill-badge"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Sparkles size={14} className="text-neon" />
            <span>Ready to Dominate YouTube & Socials?</span>
          </motion.div>

          <motion.h2
            className="final-cta-title"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            Stop Delaying Your Growth.<br />
            <span className="text-neon">Scale Your Channel Today.</span>
          </motion.h2>

          <motion.p
            className="final-cta-sub"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            Get a dedicated editing team, retention strategy, and high-CTR thumbnails engineered for view counts.
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            className="cta-action-group"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.25 }}
          >
            <motion.a
              href="https://wa.me/message/XXVVKUQAMRZLG1"
              target="_blank"
              rel="noreferrer"
              className="btn-primary final-cta-btn"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
            >
              <MessageCircle size={20} />
              <span>Book Strategy Call</span>
              <ArrowUpRight size={18} />
            </motion.a>

            <motion.a
              href="#pricing"
              className="btn-outline-cta"
              whileHover={{ scale: 1.04, background: 'rgba(255, 255, 255, 0.08)' }}
              whileTap={{ scale: 0.96 }}
            >
              View Retainer Plans
            </motion.a>
          </motion.div>

          {/* Guarantee Highlights Bar */}
          <motion.div
            className="cta-trust-bar"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.35 }}
          >
            <div className="trust-item">
              <Zap size={15} className="text-neon" />
              <span>48-72h Delivery Cadence</span>
            </div>
            <div className="trust-item">
              <Clock size={15} className="text-neon" />
              <span>Save 40+ Hrs/Month</span>
            </div>
            <div className="trust-item">
              <ShieldCheck size={15} className="text-neon" />
              <span>No Lock-in Retainer</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Footer */}
      <footer className="site-footer">
        <div className="container footer-container">
          {/* Brand Info & Socials */}
          <motion.div
            className="footer-left"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
          >
            <div className="footer-brand">
              <img src="/alpha-edit-header-logo.png" alt="The Alpha Edit" className="footer-logo" />
            </div>

            <p className="footer-desc">
              The premier video editing & retention strategy partner for YouTubers, founders, and scaling digital brands.
            </p>

            <div className="footer-contact-info">
              <a href="https://wa.me/919217540120" target="_blank" rel="noreferrer" className="contact-badge">
                <MessageCircle size={15} className="text-neon" />
                <span>WhatsApp: +91 92175 40120</span>
              </a>
              <a href="mailto:thealphaedit101@gmail.com" className="contact-badge">
                <Mail size={15} className="text-neon" />
                <span>thealphaedit101@gmail.com</span>
              </a>
              <div className="response-tag">
                <span className="live-dot"></span>
                <span>Average Response: &lt; 2 Hours</span>
              </div>
            </div>

            <div className="footer-socials" aria-label="Connect with us">
              {socialLinks.map(({ label, href, icon: Icon }, index) => (
                <motion.a
                  key={label}
                  href={href}
                  className="social-link"
                  aria-label={label}
                  title={label}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noreferrer' : undefined}
                  initial={{ opacity: 0, y: 12, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.15 + index * 0.08 }}
                  whileHover={{
                    y: -5,
                    scale: 1.1,
                    borderColor: 'var(--accent-neon)',
                    boxShadow: "0 10px 25px rgba(217, 253, 49, 0.3)"
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon className="social-icon" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Navigation Links */}
          <motion.div
            className="footer-links-grid"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <div className="link-group">
              <span className="link-group-title">Services</span>
              <a href="#pricing">YouTube Long-Form</a>
              <a href="#pricing">Shorts & Reels</a>
              <a href="#pricing">Custom VFX & Motion</a>
              <a href="#pricing">High-CTR Thumbnails</a>
              <a href="#pricing">Channel Management</a>
            </div>

            <div className="link-group">
              <span className="link-group-title">Navigation</span>
              <a href="#">Home</a>
              <a href="#whyus">Why Us</a>
              <a href="#testimonials">Client Results</a>
              <a href="#pricing">Pricing Plans</a>
              <a href="#faq">FAQ</a>
            </div>
          </motion.div>

          {/* Custom Scope Contact Form Card */}
          <motion.div
            className="footer-contact-card glass"
            id="contact"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: 0.25 }}
          >
            <div className="contact-card-header">
              <span className="contact-label">Quick Inquiry</span>
              <h3 className="contact-title">Need a Custom Scope?</h3>
              <p className="contact-copy">Fill out your details and we'll send a tailored proposal to your inbox.</p>
            </div>

            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="input-group">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Full Name"
                  required
                />
              </div>

              <div className="input-group">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your Email Address"
                  required
                />
              </div>

              <div className="input-group">
                <select name="service" value={formData.service} onChange={handleChange} required>
                  <option value="YouTube Long-Form Editing">YouTube Long-Form Editing</option>
                  <option value="Shorts / Reels Package">Shorts & Reels Package</option>
                  <option value="Custom Motion & VFX">Custom Motion & VFX</option>
                  <option value="Full Channel Management">Full Channel Management</option>
                </select>
              </div>

              <div className="input-group">
                <textarea
                  name="details"
                  value={formData.details}
                  onChange={handleChange}
                  placeholder="Tell us about your channel, frequency, or project goals..."
                  rows="3"
                  required
                />
              </div>

              <motion.button
                type="submit"
                className="btn-primary contact-submit"
                disabled={submitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Send size={16} />
                <span>{submitting ? 'Sending Request...' : 'Send Request'}</span>
              </motion.button>

              <AnimatePresence>
                {formStatus === 'success' && (
                  <motion.div
                    className="form-note success"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                  >
                    <CheckCircle2 size={16} />
                    <span>Inquiry received! We'll be in touch within 24h.</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </motion.div>
        </div>

        {/* Bottom Copyright & Scroll To Top Bar */}
        <div className="footer-bottom-bar">
          <div className="container bottom-content">
            <p>© {new Date().getFullYear()} The Alpha Edit. All rights reserved.</p>

            <button 
              className="scroll-top-btn" 
              onClick={scrollToTop}
              aria-label="Scroll back to top"
            >
              <span>Back to top</span>
              <ArrowUp size={15} />
            </button>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
