import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import './Testimonials.css';

const testimonials = [
  {
    name: "Raj Patel",
    location: "Mumbai, India",
    channel: "Tech Reviews",
    growth: "10K → 150K subs",
    text: "Alpha Edit literally changed my life yaar. Mere channel ko 10K subscribers se 150K tak le gaye sirf 4 months mein. Ab mera har video 100K+ views easily get kar raha hai. Their editing style is so crisp, storytelling is on point. Best decision ever tha."
  },
  {
    name: "Priya Singh",
    location: "Delhi, India",
    channel: "Lifestyle Vlogging",
    growth: "50K → 500K Instagram followers",
    text: "I was skeptical about outsourcing my editing, but The Alpha Edit proved me wrong. They understand YouTube algorithm perfectly. My retention rate increased from 35% to 62%. They don't just edit—they optimize for watch time. Game changer!"
  },
  {
    name: "Vikram Sharma",
    location: "Bangalore, India",
    channel: "Tech Reviews",
    growth: "5K → 120K subs",
    text: "Mera first video jo unhone edit kiya na... usne 150K views kar diye. Ab maine unhe pehle se hi naye video concepts bata dete hoon because they understand exactly what will work. Their motion graphics and color grading is professional level. Shukriya yaar!"
  },
  {
    name: "Ananya Verma",
    location: "Pune, India",
    channel: "Educational Content",
    growth: "20K → 200K subs",
    text: "Educational content can be boring but Alpha Edit makes it engaging. They add animations, transitions, and pacing that keeps viewers glued. My average watch time went from 2:30 to 8:15 minutes. This is how you do it. Highly recommend!"
  },
  {
    name: "Arjun Kapoor",
    location: "Hyderabad, India",
    channel: "Short-Form Content",
    growth: "100K TikTok followers",
    text: "Maine apne podcast ke episodes ko unhe de diye aur inhone usse viral TikTok clips banaye. 100K followers ho gaye TikTok pe sirf 2 months mein. They know what makes content viral. Literally genius editing team hai ye."
  },
  {
    name: "Neha Gupta",
    location: "Ahmedabad, India",
    channel: "Fashion & Beauty",
    growth: "30K → 400K subs",
    text: "For fashion content, visuals matter more than anything. Alpha Edit's color grading, transitions, and B-roll integration is insane. My videos now look 10X more professional. Every thumbnail they design gets 50% CTR. They're not just editors—they're marketing specialists."
  },
  {
    name: "Aditya Singh",
    location: "Chennai, India",
    channel: "Gaming",
    growth: "50K → 550K subs",
    text: "Gaming content needs fast pacing aur perfect timing. Unhe jo brief deta hoon na, vo samajh jaate hain exactly kya chahiye. Their motion graphics during intense moments, slow-mo timing... sab perfect. My gaming channel is now my full-time income because of them."
  },
  {
    name: "Shreya Pant",
    location: "Kolkata, India",
    channel: "Business & Startup",
    growth: "8K → 200K subs",
    text: "I run a startup content channel aur professional editing bilkul zaroori tha. Alpha Edit ne professional storytelling sikhaya mujhe through their edits. Corporate clients interested ho gaye aur ab brand partnerships bhi mil rahe hain. Total business transformation hua!"
  }
];

const TestimonialCard = ({ t }) => (
  <motion.div
    className="testimonial-card glass"
    whileHover={{
      y: -10,
      rotateX: 2,
      rotateY: -2,
      boxShadow: '0 20px 50px rgba(120, 220, 255, 0.18)',
      transition: { duration: 0.3 },
    }}
  >
    {/* Growth Badge */}
    <div className="growth-badge">{t.growth}</div>

    <div className="t-header">
      <motion.div
        className="t-avatar"
        whileHover={{ scale: 1.1, rotate: 5 }}
        transition={{ type: 'spring', stiffness: 300 }}
      >
        {t.name.charAt(0)}
      </motion.div>
      <div className="t-info">
        <div className="t-name">{t.name}</div>
        <div className="t-meta">
          <span className="t-location">{t.location}</span>
          <span className="t-channel">{t.channel}</span>
        </div>
      </div>
    </div>
    
    <p className="t-text">"{t.text}"</p>

    {/* Stars Rating */}
    <div className="t-rating">
      {[...Array(5)].map((_, i) => (
        <span key={i} className="star">⭐</span>
      ))}
    </div>
  </motion.div>
);

const Testimonials = () => {
  const trackRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);

  return (
    <section id="testimonials" className="testimonials-section">
      <div className="container">
        <motion.div 
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">Client <span className="text-neon">Results</span></h2>
          <p className="section-subtitle">Real success stories from Indian creators we've scaled</p>
        </motion.div>

        {/* Horizontal Scrolling Testimonials */}
        <div
          className="testimonials-scroll-container"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div
            ref={trackRef}
            className={`testimonials-scroll-track ${isPaused ? 'paused' : ''}`}
          >
            {testimonials.map((t, idx) => (
              <TestimonialCard key={idx} t={t} />
            ))}
            {/* Duplicate for seamless loop */}
            {testimonials.map((t, idx) => (
              <TestimonialCard key={`dup-${idx}`} t={t} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
