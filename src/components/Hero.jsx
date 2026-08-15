import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { Play, TrendingUp, Users, Zap } from 'lucide-react';
import './Hero.css';

const STAR_COUNT = 320;
const HERO_VIDEO_SPEED = 0.35;
const HERO_VIDEO_CROSSFADE_SECONDS = 0.85;

const StarfieldBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const stars = [];
    const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
    let width = 0;
    let height = 0;
    let centerX = 0;
    let centerY = 0;
    let animationFrame;
    let reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const createStar = (fromCenter = false) => {
      const angle = Math.random() * Math.PI * 2;
      const maxRadius = Math.hypot(width, height) * 0.56;
      const radius = fromCenter ? Math.random() * 42 : Math.random() * maxRadius;
      const depth = Math.random();

      return {
        angle,
        radius,
        depth,
        size: 0.45 + depth * 1.75,
        speed: 0.09 + depth * 0.34,
        alpha: 0.22 + depth * 0.64,
        twinkleSpeed: 0.012 + Math.random() * 0.024,
        twinklePhase: Math.random() * Math.PI * 2,
      };
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      centerX = width / 2;
      centerY = height / 2;

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      stars.length = 0;
      for (let i = 0; i < STAR_COUNT; i += 1) {
        stars.push(createStar());
      }
    };

    const handlePointerMove = (event) => {
      const rect = canvas.getBoundingClientRect();
      pointer.tx = ((event.clientX - rect.left) / rect.width - 0.5) * 34;
      pointer.ty = ((event.clientY - rect.top) / rect.height - 0.5) * 34;
    };

    const handlePointerLeave = () => {
      pointer.tx = 0;
      pointer.ty = 0;
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      pointer.x += (pointer.tx - pointer.x) * 0.045;
      pointer.y += (pointer.ty - pointer.y) * 0.045;

      for (const star of stars) {
        if (!reducedMotion) {
          star.radius += star.speed;
          star.twinklePhase += star.twinkleSpeed;
        }

        const depthOffset = 0.35 + star.depth * 0.95;
        const x = centerX + Math.cos(star.angle) * star.radius + pointer.x * depthOffset;
        const y = centerY + Math.sin(star.angle) * star.radius + pointer.y * depthOffset;

        if (x < -20 || x > width + 20 || y < -20 || y > height + 20) {
          Object.assign(star, createStar(true));
          continue;
        }

        const twinkle = reducedMotion ? 0.82 : 0.72 + Math.sin(star.twinklePhase) * 0.28;
        const alpha = Math.max(0.12, star.alpha * twinkle);
        const glowSize = star.size * (2.4 + star.depth * 1.8);

        ctx.beginPath();
        const glow = ctx.createRadialGradient(x, y, 0, x, y, glowSize);
        glow.addColorStop(0, `rgba(255, 255, 255, ${alpha})`);
        glow.addColorStop(0.42, `rgba(184, 219, 255, ${alpha * 0.35})`);
        glow.addColorStop(1, 'rgba(184, 219, 255, 0)');
        ctx.fillStyle = glow;
        ctx.arc(x, y, glowSize, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.min(1, alpha + 0.18)})`;
        ctx.arc(x, y, star.size * 0.56, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrame = requestAnimationFrame(draw);
    };

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleMotionChange = (event) => {
      reducedMotion = event.matches;
    };

    resize();
    draw();

    window.addEventListener('resize', resize);
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerleave', handlePointerLeave);
    motionQuery.addEventListener('change', handleMotionChange);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerleave', handlePointerLeave);
      motionQuery.removeEventListener('change', handleMotionChange);
    };
  }, []);

  return <canvas ref={canvasRef} className="hero-starfield" aria-hidden="true" />;
};

/* Animated counter component */
const AnimatedCounter = ({ target, suffix = '', duration = 2 }) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v));
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const controls = animate(count, target, {
      duration,
      ease: [0.16, 1, 0.3, 1],
    });
    const unsubscribe = rounded.on('change', (v) => setDisplayValue(v));
    return () => {
      controls.stop();
      unsubscribe();
    };
  }, [target, duration, count, rounded]);

  return (
    <span className="counter-value">{displayValue}{suffix}</span>
  );
};

const FloatingBadge = ({ icon: Icon, title, subtitle, delay, x, y }) => (
  <motion.div
    className="floating-badge glass"
    initial={{ opacity: 0, y: 50, scale: 0.8 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    transition={{ delay, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    whileHover={{ y: -8, scale: 1.06, rotateX: 4, z: 40 }}
    style={{ top: y, left: x }}
  >
    <div className="badge-icon">
      <Icon size={20} className="text-neon" />
    </div>
    <div className="badge-content">
      <span className="badge-title">{title}</span>
      <span className="badge-subtitle">{subtitle}</span>
    </div>
  </motion.div>
);

const Hero = () => {
  const titleWords = ['not', 'just', 'an'];
  const heroVideoRef = useRef(null);
  const heroOppositeVideoRef = useRef(null);
  const activeHeroVideoRef = useRef(0);
  const isCrossfadingVideoRef = useRef(false);
  const [activeHeroVideo, setActiveHeroVideo] = useState(0);

  useEffect(() => {
    const videos = [heroVideoRef.current, heroOppositeVideoRef.current].filter(Boolean);
    let animationFrame;
    let resetTimer;

    const syncVideoSpeed = (video) => {
      video.playbackRate = HERO_VIDEO_SPEED;
    };

    const resetVideo = (video) => {
      video.pause();
      video.currentTime = 0;
      syncVideoSpeed(video);
    };

    const playVideo = (video) => {
      syncVideoSpeed(video);
      video.play().catch(() => {});
    };

    const crossfadeToNextVideo = () => {
      if (isCrossfadingVideoRef.current || videos.length < 2) {
        return;
      }

      const currentIndex = activeHeroVideoRef.current;
      const nextIndex = currentIndex === 0 ? 1 : 0;
      const currentVideo = videos[currentIndex];
      const nextVideo = videos[nextIndex];

      isCrossfadingVideoRef.current = true;
      resetVideo(nextVideo);
      playVideo(nextVideo);

      activeHeroVideoRef.current = nextIndex;
      setActiveHeroVideo(nextIndex);

      resetTimer = window.setTimeout(() => {
        resetVideo(currentVideo);
        isCrossfadingVideoRef.current = false;
      }, 1400);
    };

    const watchVideoLoop = () => {
      const activeVideo = videos[activeHeroVideoRef.current];

      if (
        activeVideo?.duration
        && Number.isFinite(activeVideo.duration)
        && activeVideo.duration - activeVideo.currentTime <= HERO_VIDEO_CROSSFADE_SECONDS
      ) {
        crossfadeToNextVideo();
      }

      animationFrame = window.requestAnimationFrame(watchVideoLoop);
    };

    if (videos.length < 2) {
      videos.forEach(playVideo);
      return undefined;
    }

    videos.forEach(syncVideoSpeed);
    resetVideo(videos[1]);
    playVideo(videos[0]);
    videos.forEach((video) => video.addEventListener('ended', crossfadeToNextVideo));
    watchVideoLoop();

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.clearTimeout(resetTimer);
      videos.forEach((video) => video.removeEventListener('ended', crossfadeToNextVideo));
    };
  }, []);

  return (
    <section className="hero">
      <video
        ref={heroVideoRef}
        className={`hero-bg-video ${activeHeroVideo === 0 ? 'is-active' : ''}`}
        aria-hidden="true"
        autoPlay
        muted
        playsInline
        preload="auto"
        poster="/cosmic-night-bg.jpg"
      >
        <source src="/moonlit-canyon-desert.mp4" type="video/mp4" />
      </video>
      <video
        ref={heroOppositeVideoRef}
        className={`hero-bg-video hero-bg-video-secondary ${activeHeroVideo === 1 ? 'is-active' : ''}`}
        aria-hidden="true"
        muted
        playsInline
        preload="auto"
        poster="/cosmic-night-bg.jpg"
      >
        <source src="/moonlit-canyon-desert.mp4" type="video/mp4" />
      </video>
      <StarfieldBackground />
      <div className="hero-bg-overlay"></div>

      <div className="container hero-container">

        <motion.div
          className="hero-content"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.div
            className="hero-subtitle"
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.span
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="subtitle-dot"
            >●</motion.span>
            The Alpha Edit presents
          </motion.div>

          <h1 className="hero-title">
            <motion.span className="title-small">
              {titleWords.map((word, i) => (
                <motion.span
                  key={i}
                  className="title-word"
                  initial={{ opacity: 0, y: 20, rotateX: -40 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  transition={{ delay: 0.3 + i * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                  {word}{' '}
                </motion.span>
              ))}
            </motion.span>
            <motion.span
              className="title-large text-gradient"
              initial={{ opacity: 0, y: 40, filter: 'blur(16px)', scale: 0.9 }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)', scale: 1 }}
              transition={{ delay: 0.5, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              Editing Agency
            </motion.span>
          </h1>

          <motion.div
            className="hero-description"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.7 }}
          >
            the ultimate creative partner for YouTubers and brands, powered by insane storytelling and retention-driven editing.
          </motion.div>

          <motion.div
            className="hero-actions"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <motion.a
              href="https://wa.me/message/XXVVKUQAMRZLG1"
              className="btn-primary btn-large"
              whileHover={{ y: -4, scale: 1.04, boxShadow: '0 20px 40px rgba(217, 253, 49, 0.3)' }}
              whileTap={{ scale: 0.96 }}
            >
              <Zap size={20} />
              Join now
            </motion.a>
          </motion.div>

          {/* Animated Stats Row */}
          <motion.div
            className="hero-stats"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            <div className="stat-item">
              <div className="stat-number text-neon">
                <AnimatedCounter target={10} suffix="M+" duration={2.5} />
              </div>
              <div className="stat-label">Views Generated</div>
            </div>
            <div className="stat-separator" />
            <div className="stat-item">
              <div className="stat-number text-neon">
                <AnimatedCounter target={500} suffix="K+" duration={2.5} />
              </div>
              <div className="stat-label">Subscribers Gained</div>
            </div>
            <div className="stat-separator" />
            <div className="stat-item">
              <div className="stat-number text-neon">
                <AnimatedCounter target={60} suffix="%" duration={2} />
              </div>
              <div className="stat-label">Avg. Retention</div>
            </div>
          </motion.div>

          <motion.div
            className="experience-badge"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 1.2, type: 'spring', stiffness: 200 }}
          >
            <div className="exp-text">Editing for</div>
            <div className="exp-years text-neon">3 YEARS</div>
            <div className="exp-text">in the industry!</div>
          </motion.div>

          <motion.p
            className="hero-subtext"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.7 }}
          >
            With years of proven success in content creation, YouTube strategy, and building high-converting brand videos,
            The Alpha Edit will craft the powerful narratives that help you dominate your niche.
          </motion.p>
        </motion.div>



        {/* Floating elements mimicking the parallax subscriber stats */}
        <div className="badges-container">
          <FloatingBadge
            icon={Play}
            title="Total Reach"
            subtitle="10M+ Views Generated"
            delay={0.8}
            y="20%"
            x="5%"
          />
          <FloatingBadge
            icon={TrendingUp}
            title="Growth Engine"
            subtitle="500K+ Subscribers Gained"
            delay={1.0}
            y="60%"
            x="10%"
          />
          <FloatingBadge
            icon={Users}
            title="Performance"
            subtitle="Avg. 60% Retention"
            delay={1.2}
            y="30%"
            x="80%"
          />
          <FloatingBadge
            icon={Users}
            title="Conversion"
            subtitle="Top 1% CTR"
            delay={1.4}
            y="70%"
            x="75%"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
