import { motion, useScroll, useSpring } from 'framer-motion';

export default function ReadingProgress(): React.ReactElement {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-retro-cyan origin-left z-50 border-b border-bevel-dark"
      style={{ scaleX }}
    />
  );
}
