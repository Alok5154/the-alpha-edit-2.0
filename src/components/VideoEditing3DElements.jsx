import { motion, useScroll, useTransform } from 'framer-motion';
import { Film, Clapperboard, Scissors, Layers, Sliders, Volume2, Play } from 'lucide-react';
import './VideoEditing3DElements.css';

const FloatingCard = ({ children, className, style }) => (
  <motion.div 
    className={`ve-card-3d ${className}`} 
    style={style}
    animate={{
      y: [0, -15, 0],
      rotateX: [12, 18, 12],
      rotateY: [-15, -8, -15],
    }}
    transition={{
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut"
    }}
  >
    {children}
  </motion.div>
);

const VideoEditing3DElements = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '-12%']);
  const rotateZ = useTransform(scrollYProgress, [0, 1], [0, 15]);

  return (
    <motion.div 
      className="video-editing-3d-bg"
      style={{ y, rotateZ }}
      aria-hidden="true"
    >
      <div className="ve-perspective-wrapper">
        {/* 1. Floating 3D Clapperboard Element */}
        <FloatingCard className="ve-clapperboard">
          <div className="card-glass-glow"></div>
          <Clapperboard size={36} className="text-neon" />
          <div className="ve-label">
            <span className="label-title">CUT 04</span>
            <span className="label-sub">SCENE 12 • TAKE 3</span>
          </div>
        </FloatingCard>

        {/* 2. Floating 3D Timeline Editor Track */}
        <FloatingCard className="ve-timeline-track">
          <div className="card-glass-glow"></div>
          <div className="timeline-header">
            <Layers size={16} className="text-cyan" />
            <span>VIDEO TRACK 01 (V1)</span>
          </div>
          <div className="timeline-clips">
            <span className="clip clip-a">INTRO_4K.MOV</span>
            <span className="clip clip-b">BROLL_CUP.MP4</span>
            <span className="clip clip-c">OUTRO_FX.MOV</span>
          </div>
          <div className="timeline-playhead"></div>
        </FloatingCard>

        {/* 3. Floating 3D Precision Scissors */}
        <FloatingCard className="ve-scissors">
          <div className="card-glass-glow"></div>
          <Scissors size={32} className="text-neon" />
          <span className="ve-badge">SPLIT CLIP [K]</span>
        </FloatingCard>

        {/* 4. Floating 3D Color Grading Dial / Sliders */}
        <FloatingCard className="ve-color-grade">
          <div className="card-glass-glow"></div>
          <Sliders size={24} className="text-neon" />
          <div className="grade-meters">
            <div className="meter"><span style={{ width: '75%' }}></span></div>
            <div className="meter"><span style={{ width: '45%' }}></span></div>
            <div className="meter"><span style={{ width: '85%' }}></span></div>
          </div>
        </FloatingCard>

        {/* 5. Floating 3D Audio Equalizer Spectrum */}
        <FloatingCard className="ve-audio-spectrum">
          <div className="card-glass-glow"></div>
          <Volume2 size={20} className="text-cyan" />
          <div className="audio-bars">
            <i></i><i></i><i></i><i></i><i></i><i></i><i></i>
          </div>
        </FloatingCard>

        {/* 6. Floating 3D Playback Monitor Frame */}
        <FloatingCard className="ve-monitor-frame">
          <div className="card-glass-glow"></div>
          <div className="monitor-top">
            <Film size={16} className="text-neon" />
            <span>4K PRORES 422 HQ</span>
          </div>
          <div className="monitor-center">
            <Play size={28} className="play-icon text-neon" />
          </div>
        </FloatingCard>
      </div>
    </motion.div>
  );
};

export default VideoEditing3DElements;
