import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Menu, X } from 'lucide-react';
import './Navbar.css';

const navLinks = [
  { href: "#whyus", text: "Why us" },
  { href: "#pricing", text: "Services" },
  { href: "#pricing", text: "Pricing" },
  { href: "#testimonials", text: "Results" },
  { href: "#contact", text: "Contact" },
];

const Navbar = ({ scrollDirection }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) setMobileOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <motion.nav
        className={`navbar ${scrolled ? 'scrolled glass' : ''}`}
        initial={{ y: -100, opacity: 0 }}
        animate={{
          y: scrollDirection === 'down' && scrolled ? -100 : 0,
          opacity: 1,
        }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="container navbar-container">
          <motion.div
            className="navbar-logo"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <img src="/alpha-edit-header-logo.png" alt="The Alpha Edit" />
          </motion.div>

          <motion.div
            className="navbar-links"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.08,
                  delayChildren: 0.3,
                },
              },
            }}
          >
            {navLinks.map((link, idx) => (
              <motion.a
                key={idx}
                href={link.href}
                className="nav-link"
                variants={{
                  hidden: { opacity: 0, y: -20, filter: 'blur(4px)' },
                  visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
                }}
                whileHover={{ scale: 1.05, color: "#78dcff" }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {link.text}
              </motion.a>
            ))}
          </motion.div>

          <motion.div
            className="navbar-cta"
            initial={{ opacity: 0, scale: 0.8, filter: 'blur(4px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <motion.a
              href="https://wa.me/message/XXVVKUQAMRZLG1"
              className="btn-primary"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 20px rgba(0, 212, 255, 0.5)",
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles size={18} />
              </motion.div>
              Join Now
            </motion.a>
          </motion.div>

          {/* Mobile Hamburger */}
          <motion.button
            className="mobile-menu-btn"
            onClick={() => setMobileOpen(!mobileOpen)}
            whileTap={{ scale: 0.9 }}
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait">
              {mobileOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X size={24} />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu size={24} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="mobile-menu-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="mobile-menu glass"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            >
              <div className="mobile-menu-links">
                {navLinks.map((link, idx) => (
                  <motion.a
                    key={idx}
                    href={link.href}
                    className="mobile-link"
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
                    onClick={() => setMobileOpen(false)}
                  >
                    <span className="mobile-link-number">0{idx + 1}</span>
                    {link.text}
                  </motion.a>
                ))}
              </div>
              <motion.a
                href="https://wa.me/message/XXVVKUQAMRZLG1"
                className="btn-primary mobile-cta"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                onClick={() => setMobileOpen(false)}
              >
                <Sparkles size={18} />
                Join Now
              </motion.a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
