import { useState, useRef, Fragment } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { 
  CheckCircle2, 
  CreditCard, 
  Landmark, 
  ShieldCheck, 
  Star, 
  Wallet, 
  Zap, 
  Sparkles, 
  Clock, 
  HelpCircle, 
  Layers, 
  MessageCircle,
  SlidersHorizontal,
  Award
} from 'lucide-react';
import './Pricing.css';

const plans = [
  {
    id: "essential",
    name: "ESSENTIAL",
    persona: "shorts",
    oldPriceMonthly: "₹10,000",
    priceMonthly: "₹4,000",
    oldPriceAnnual: "₹8,000",
    priceAnnual: "₹3,200",
    annualSavings: "Save ₹9,600/yr",
    for: "For creators starting their short-form journey",
    badge: null,
    highlight: false,
    features: [
      { text: "8 High-Quality Shorts/Reels per month", tooltip: "Pacing, retention cuts & color grading included." },
      { text: "Trending Audio & Sound Design", tooltip: "Hand-picked viral audio tracks tailored to your niche." },
      { text: "Dynamic Animated Captions", tooltip: "High-retention captions with kinetic typography & emojis." },
      { text: "Weekly Scheduled Delivery", tooltip: "2 polished short-form videos delivered every week." },
      { text: "Standard Revisions (2 per video)", tooltip: "Quick turnarounds for title or cut adjustments." }
    ],
    cta: "Start Shorts Growth"
  },
  {
    id: "elite",
    name: "ELITE",
    persona: "youtuber",
    badge: "Most Popular",
    oldPriceMonthly: "₹18,000",
    priceMonthly: "₹10,000",
    oldPriceAnnual: "₹15,000",
    priceAnnual: "₹8,000",
    annualSavings: "Save ₹24,000/yr",
    for: "For dedicated YouTubers scaling their main channel",
    highlight: true,
    features: [
      { text: "4 YouTube Long-Form Videos (up to 15m)", tooltip: "Full storytelling edits, pacing & custom sound effects." },
      { text: "4 Repurposed YouTube Shorts/Reels", tooltip: "Extracted high-stakes clips optimized for vertical platforms." },
      { text: "Custom Motion Graphics & VFX", tooltip: "Lower thirds, kinetic text, custom animations & transitions." },
      { text: "4 Custom High-CTR Thumbnails", tooltip: "Eye-catching, psychological thumbnail concepts built to boost CTR." },
      { text: "Priority Slack / WhatsApp Access", tooltip: "Direct 1-on-1 channel with your dedicated editor." },
      { text: "Fast 48-72h Turnaround", tooltip: "Consistent publishing cadence guaranteed." }
    ],
    cta: "Scale Your Channel"
  },
  {
    id: "ultimate",
    name: "ULTIMATE",
    persona: "brand",
    badge: "Full Dominance",
    oldPriceMonthly: "₹30,000",
    priceMonthly: "₹18,000",
    oldPriceAnnual: "₹25,000",
    priceAnnual: "₹14,400",
    annualSavings: "Save ₹43,200/yr",
    for: "For established brands seeking complete channel growth",
    highlight: false,
    features: [
      { text: "8 YouTube Long-Form Videos (up to 25m)", tooltip: "Deep-dive video essays, documentary edits, or interviews." },
      { text: "15 High-Quality Shorts/Reels", tooltip: "Daily short-form content omnipresence." },
      { text: "A/B Testing Thumbnails (2 per video)", tooltip: "Test multiple hook designs to maximize impressions." },
      { text: "YouTube SEO & Upload Management", tooltip: "Title engineering, descriptions, tags & scheduled uploads." },
      { text: "Dedicated Creative Director", tooltip: "Content strategy & narrative breakdown before every edit." },
      { text: "Unlimited Priority Revisions", tooltip: "We fine-tune until you are 100% thrilled." }
    ],
    cta: "Claim Full Management"
  }
];

const comparisonMatrix = [
  {
    category: "Deliverables & Output",
    rows: [
      { feature: "Long-Form Videos / month", essential: "—", elite: "4 Videos (up to 15m)", ultimate: "8 Videos (up to 25m)" },
      { feature: "Shorts / Reels / TikToks", essential: "8 Shorts", elite: "4 Shorts", ultimate: "15 Shorts" },
      { feature: "Custom High-CTR Thumbnails", essential: "—", elite: "4 Thumbnails", ultimate: "16 (2 per video A/B)" },
      { feature: "Motion Graphics & VFX", essential: "Basic Cuts", elite: "Advanced VFX", ultimate: "Custom 3D & 2D Motion" },
      { feature: "Sound Design & SFX", essential: "Standard Audio", elite: "Custom SFX Layering", ultimate: "Cinema-Grade Audio Mix" },
    ]
  },
  {
    category: "Turnaround & Revisions",
    rows: [
      { feature: "Delivery Cadence", essential: "Weekly", elite: "48-72h Turnaround", ultimate: "Express 24-48h Delivery" },
      { feature: "Revision Rounds", essential: "2 Rounds / Video", elite: "3 Rounds / Video", ultimate: "Unlimited Revisions" },
      { feature: "Raw Footage Backup", essential: "30 Days", elite: "90 Days", ultimate: "Lifetime Cloud Vault" },
    ]
  },
  {
    category: "Channel Growth & Strategy",
    rows: [
      { feature: "YouTube SEO & Tags", essential: "—", elite: "Basic SEO", ultimate: "Full SEO & Uploads" },
      { feature: "Thumbnail A/B Testing", essential: "—", elite: "—", ultimate: "Included" },
      { feature: "Dedicated Creative Director", essential: "—", elite: "—", ultimate: "Included (1-on-1)" },
      { feature: "Priority Support Channel", essential: "Email Support", elite: "1-on-1 Slack / WhatsApp", ultimate: "VIP Direct Phone & Slack" },
    ]
  }
];

const paymentOptions = [
  {
    icon: Wallet,
    title: "UPI & Instant Transfer",
    text: "Seamless checkout via GPay, PhonePe, Paytm, or UPI ID after scope lock."
  },
  {
    icon: CreditCard,
    title: "Cards & Global Checkout",
    text: "Supports major Visa, MasterCard, Amex, and international credit/debit cards."
  },
  {
    icon: Landmark,
    title: "Bank & Agency Retainers",
    text: "GST invoicing & direct wire transfer options available for agency retainers."
  }
];

const trustPoints = [
  {
    icon: ShieldCheck,
    title: "100% Satisfaction Guarantee",
    desc: "If your first draft doesn't hit your standards, we revise until it does or refund your deposit."
  },
  {
    icon: Zap,
    title: "No Long-Term Lock-in",
    desc: "Flexible month-to-month retainers. Pause or switch plans anytime with zero cancellation fees."
  },
  {
    icon: Clock,
    title: "Guaranteed Turnaround",
    desc: "Strict weekly deadlines. We keep your uploading schedule consistent without delays."
  },
  {
    icon: Award,
    title: "Premium Sound & VFX",
    desc: "Licensed music libraries, retention editing techniques, and high-converting visual hooks."
  }
];

const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.12,
      duration: 0.65,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

const Pricing = () => {
  const [billingCycle, setBillingCycle] = useState('monthly'); // 'monthly' | 'annual'
  const [viewMode, setViewMode] = useState('cards'); // 'cards' | 'matrix'
  const [activeTooltip, setActiveTooltip] = useState(null);

  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const yTransform = useTransform(scrollYProgress, [0, 1], [150, -150]);
  const rotateTransform = useTransform(scrollYProgress, [0, 1], [0, 360]);

  const handleWhatsApp = (planName) => {
    const cycleText = billingCycle === 'annual' ? 'Annual (20% Off)' : 'Monthly';
    const message = encodeURIComponent(`Hi Alpha Edit! I'm interested in the ${planName} plan (${cycleText}). Can we discuss the workflow and onboard my channel?`);
    return `https://wa.me/message/XXVVKUQAMRZLG1?text=${message}`;
  };

  return (
    <section id="pricing" className="pricing-section" ref={sectionRef}>
      {/* Background Animated Star Accents */}
      <div className="shooting-stars">
        <div className="shooting-star" style={{ left: '15%', top: '15%' }}></div>
        <div className="shooting-star" style={{ animationDelay: '2.5s', left: '65%', top: '25%' }}></div>
        <div className="shooting-star" style={{ animationDelay: '4.5s', left: '40%', top: '60%' }}></div>
      </div>

      <motion.div
        className="parallax-star left"
        style={{ y: yTransform, rotate: rotateTransform }}
      >
        <Star size={180} strokeWidth={1} />
      </motion.div>

      <motion.div
        className="parallax-star right"
        style={{ y: useTransform(scrollYProgress, [0, 1], [-180, 180]), rotate: useTransform(scrollYProgress, [0, 1], [360, 0]) }}
      >
        <Star size={140} strokeWidth={1} />
      </motion.div>
      <div className="container">
        {/* Section Header */}
        <motion.div
          className="section-header text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="pricing-badge-pill">
            <Sparkles size={14} className="text-neon" />
            <span>Transparent Pricing • Zero Hidden Fees</span>
          </div>
          <h2 className="section-title">
            Invest in <span className="text-neon">Growth</span> That Converts
          </h2>
          <p className="section-subtitle">
            One flat monthly retainer. Dedicated editing team. High-retention video production engineered for view counts.
          </p>

          {/* Interactive Controls Bar */}
          <div className="controls-wrapper">
            {/* Billing Cycle Toggle Switch */}
            <div className="billing-toggle-container">
              <span className={`toggle-label ${billingCycle === 'monthly' ? 'active' : ''}`}>
                Monthly
              </span>
              <button 
                className="billing-switch" 
                onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'annual' : 'monthly')}
                aria-label="Toggle Billing Cycle"
              >
                <motion.div 
                  className="switch-handle" 
                  animate={{ x: billingCycle === 'annual' ? 26 : 2 }} 
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              </button>
              <span className={`toggle-label ${billingCycle === 'annual' ? 'active' : ''}`}>
                Annual
                <span className="discount-tag">SAVE 20%</span>
              </span>
            </div>



            {/* View Mode Switcher (Cards vs Matrix) */}
            <div className="view-mode-toggle">
              <button 
                className={`view-btn ${viewMode === 'cards' ? 'active' : ''}`}
                onClick={() => setViewMode('cards')}
              >
                <Layers size={14} /> Cards
              </button>
              <button 
                className={`view-btn ${viewMode === 'matrix' ? 'active' : ''}`}
                onClick={() => setViewMode('matrix')}
              >
                <SlidersHorizontal size={14} /> Matrix
              </button>
            </div>
          </div>
        </motion.div>

        {/* Content View Modes */}
        {viewMode === 'cards' ? (
          /* Cards Grid View */
          <div className="pricing-grid">
            {plans.map((plan, idx) => {
              const currentPrice = billingCycle === 'annual' ? plan.priceAnnual : plan.priceMonthly;
              const oldPrice = billingCycle === 'annual' ? plan.oldPriceAnnual : plan.oldPriceMonthly;

              return (
                <motion.div
                  key={plan.id}
                  className={`pricing-card glass ${plan.highlight ? 'highlight' : ''} ${plan.id === 'ultimate' ? 'ultimate-card' : ''}`}
                  custom={idx}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-40px' }}
                  variants={cardVariants}
                  whileHover={{
                    y: -12,
                    scale: plan.highlight ? 1.04 : 1.025,
                    transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
                  }}
                >
                  {plan.badge && (
                    <motion.div
                      className="plan-badge"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.4, type: 'spring', stiffness: 350 }}
                    >
                      <Sparkles size={12} style={{ marginRight: 4 }} />
                      {plan.badge}
                    </motion.div>
                  )}

                  <h3 className="plan-name">{plan.name}</h3>
                  
                  <div className="plan-price-box">
                    <span className="old-price">{oldPrice}</span>
                    <div className="current-price">
                      <AnimatePresence mode="wait">
                        <motion.span 
                          key={currentPrice}
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.25 }}
                          className="price-val text-gradient"
                        >
                          {currentPrice}
                        </motion.span>
                      </AnimatePresence>
                      <span className="price-suffix">/mo</span>
                    </div>
                    {billingCycle === 'annual' && (
                      <div className="annual-save-badge">
                        {plan.annualSavings}
                      </div>
                    )}
                  </div>

                  <p className="plan-for">{plan.for}</p>

                  <motion.a
                    href={handleWhatsApp(plan.name)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`btn-primary plan-btn ${plan.highlight ? 'highlight-btn' : 'btn-outline'}`}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <MessageCircle size={18} />
                    <span>{plan.cta}</span>
                  </motion.a>

                  <div className="plan-features">
                    <div className="features-title">What's Included:</div>
                    <ul>
                      {plan.features.map((feat, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: idx * 0.1 + i * 0.05, duration: 0.4 }}
                        >
                          <CheckCircle2 size={16} className="feat-icon" />
                          <span className="feature-text">{feat.text}</span>
                          
                          {feat.tooltip && (
                            <div 
                              className="tooltip-wrapper"
                              onMouseEnter={() => setActiveTooltip(`${plan.id}-${i}`)}
                              onMouseLeave={() => setActiveTooltip(null)}
                            >
                              <HelpCircle size={14} className="info-icon" />
                              <AnimatePresence>
                                {activeTooltip === `${plan.id}-${i}` && (
                                  <motion.div 
                                    className="tooltip-box"
                                    initial={{ opacity: 0, y: 6, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 4, scale: 0.95 }}
                                    transition={{ duration: 0.2 }}
                                  >
                                    {feat.tooltip}
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          )}
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              );
            })}
          </div>
        ) : (
          /* Detailed Feature Matrix View */
          <motion.div 
            className="matrix-wrapper glass"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <table className="comparison-table">
              <thead>
                <tr>
                  <th className="feature-col">Feature Breakdown</th>
                  <th className="plan-col">
                    <div className="col-name">ESSENTIAL</div>
                    <div className="col-price">{billingCycle === 'annual' ? '₹3,200/mo' : '₹4,000/mo'}</div>
                  </th>
                  <th className="plan-col highlight-col">
                    <div className="col-name text-neon">ELITE</div>
                    <div className="col-price">{billingCycle === 'annual' ? '₹8,000/mo' : '₹10,000/mo'}</div>
                  </th>
                  <th className="plan-col">
                    <div className="col-name">ULTIMATE</div>
                    <div className="col-price">{billingCycle === 'annual' ? '₹14,400/mo' : '₹18,000/mo'}</div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonMatrix.map((cat, cIdx) => (
                  <Fragment key={cIdx}>
                    <tr className="category-group-row">
                      <td colSpan={4} className="cat-title-cell">{cat.category}</td>
                    </tr>
                    {cat.rows.map((row, rIdx) => (
                      <tr key={rIdx} className="row-item">
                        <td className="feat-name">{row.feature}</td>
                        <td className="val-col">{row.essential}</td>
                        <td className="val-col highlight-val">{row.elite}</td>
                        <td className="val-col">{row.ultimate}</td>
                      </tr>
                    ))}
                  </Fragment>
                ))}
              </tbody>
            </table>
          </motion.div>
        )}

        {/* Value Trust & Guarantee Highlights Bar */}
        <motion.div
          className="trust-highlights-grid"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {trustPoints.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div className="trust-card glass" key={idx}>
                <div className="trust-icon-box">
                  <Icon size={22} className="text-neon" />
                </div>
                <div>
                  <h4 className="trust-title">{item.title}</h4>
                  <p className="trust-desc">{item.desc}</p>
                </div>
              </div>
            );
          })}
        </motion.div>

        {/* Payment & Security Section */}
        <motion.div
          className="payment-section glass"
          initial={{ opacity: 0, y: 40, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="payment-copy">
            <div className="payment-kicker">
              <ShieldCheck size={18} />
              Secure Checkout & Invoicing
            </div>
            <h3>Simple Onboarding. 100% Risk Free.</h3>
            <p>
              We confirm deliverables & video specifications on a quick 1-on-1 strategy call before collecting payment. Work begins immediately upon agreement.
            </p>
          </div>

          <div className="payment-options">
            {paymentOptions.map(({ icon: Icon, title, text }, index) => (
              <motion.div
                className="payment-option"
                key={title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.15 + index * 0.1 }}
                whileHover={{
                  y: -6,
                  borderColor: 'rgba(217, 253, 49, 0.4)',
                  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.35), 0 0 25px rgba(217, 253, 49, 0.12)',
                }}
              >
                <div className="payment-icon">
                  <Icon size={22} />
                </div>
                <strong>{title}</strong>
                <span>{text}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Pricing;
