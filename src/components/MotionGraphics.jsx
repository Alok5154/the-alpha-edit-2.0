import { motion, useScroll, useTransform } from 'framer-motion';
import './MotionGraphics.css';

const Cube = ({ className }) => (
  <span className={`mg-cube ${className}`} aria-hidden="true">
    <i className="cube-face cube-front"></i>
    <i className="cube-face cube-back"></i>
    <i className="cube-face cube-right"></i>
    <i className="cube-face cube-left"></i>
    <i className="cube-face cube-top"></i>
    <i className="cube-face cube-bottom"></i>
  </span>
);

const Timeline = ({ className }) => (
  <span className={`mg-timeline ${className}`} aria-hidden="true">
    <i></i>
    <i></i>
    <i></i>
    <i></i>
  </span>
);

const Waveform = ({ className }) => (
  <span className={`mg-waveform ${className}`} aria-hidden="true">
    {Array.from({ length: 16 }).map((_, index) => (
      <i key={index}></i>
    ))}
  </span>
);

const Keyframes = ({ className }) => (
  <span className={`mg-keyframes ${className}`} aria-hidden="true">
    <i></i>
    <i></i>
    <i></i>
    <i></i>
  </span>
);

const EditFrame = ({ className }) => (
  <span className={`mg-edit-frame ${className}`} aria-hidden="true">
    <i className="frame-corner corner-one"></i>
    <i className="frame-corner corner-two"></i>
    <i className="frame-corner corner-three"></i>
    <i className="frame-corner corner-four"></i>
    <i className="play-mark"></i>
  </span>
);

const MotionGraphics = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '-16%']);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 24]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.08, 0.96]);

  return (
    <motion.div
      className="motion-graphics"
      style={{ y, rotate, scale }}
      aria-hidden="true"
    >
      <div className="mg-perspective">
        <span className="mg-orbit mg-orbit-one"></span>
        <span className="mg-orbit mg-orbit-two"></span>
        <span className="mg-orbit mg-orbit-three"></span>
        <span className="mg-beam mg-beam-one"></span>
        <span className="mg-beam mg-beam-two"></span>
        <Timeline className="mg-timeline-one" />
        <Timeline className="mg-timeline-two" />
        <Waveform className="mg-waveform-one" />
        <Keyframes className="mg-keyframes-one" />
        <Keyframes className="mg-keyframes-two" />
        <EditFrame className="mg-edit-frame-one" />
        <EditFrame className="mg-edit-frame-two" />
        <Cube className="mg-cube-one" />
        <Cube className="mg-cube-two" />
        <Cube className="mg-cube-three" />
      </div>
    </motion.div>
  );
};

export default MotionGraphics;
