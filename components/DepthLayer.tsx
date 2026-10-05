import React, { useRef, ReactNode } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { useMotionProfile } from '../hooks/useMotionProfile';

interface DepthLayerProps {
  children: ReactNode;
  /** Positive lags behind the scroll (background), negative runs ahead (foreground). */
  depth?: number;
  /** Travel in px at |depth| = 1. */
  travel?: number;
  className?: string;
}

/**
 * The parallax primitive. Two layers at different depths drift apart as the
 * section crosses the viewport, and that separation is what the eye reads as
 * depth. Transform-only, so it stays on the compositor.
 */
const DepthLayer: React.FC<DepthLayerProps> = ({
  children,
  depth = 0.3,
  travel = 60,
  className = '',
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { heavy } = useMotionProfile();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const raw = useTransform(
    scrollYProgress,
    [0, 1],
    [-travel * depth, travel * depth]
  );
  const y = useSpring(raw, { stiffness: 90, damping: 30, restDelta: 0.001 });

  // Hooks above always run; only the output branches.
  if (!heavy) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div ref={ref} className={`depth ${className}`} style={{ y }}>
      {children}
    </motion.div>
  );
};

export default DepthLayer;
