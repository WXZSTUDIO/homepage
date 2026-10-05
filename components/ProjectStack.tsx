import React, { useRef } from 'react';
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  MotionValue,
} from 'framer-motion';
import { ProjectItem, ProjectPlate, ProjectFolio, ProjectCaption } from './ProjectCard';

/* Slot choreography, expressed as a fraction of one card's slot:
   0 → card arrives from below, 0.3 → settled, 0.72 → the next card starts
   crowding it out, 1 → handed over and pushed back into the stack. */
const ARRIVE = 0.3;
const CROWD = 0.72;

interface SlotState {
  y: number;
  scale: number;
  opacity: number;
  veil: number;
}

function slotAt(v: number, index: number, total: number): SlotState {
  const t = v * total - index;

  if (t < 0) return { y: 100, scale: 0.9, opacity: 0, veil: 0.5 };

  if (t < ARRIVE) {
    const k = t / ARRIVE;
    return {
      y: 100 * (1 - k),
      scale: 0.9 + 0.1 * k,
      opacity: k,
      veil: 0.5 * (1 - k),
    };
  }

  if (t < CROWD) return { y: 0, scale: 1, opacity: 1, veil: 0 };

  if (t < 1) {
    const k = (t - CROWD) / (1 - CROWD);
    return {
      y: -14 * k,
      scale: 1 - 0.07 * k,
      opacity: 1 - 0.45 * k,
      veil: 0.5 * k,
    };
  }

  return { y: -14, scale: 0.93, opacity: 0.55, veil: 0.5 };
}

const DeckCard: React.FC<{
  project: ProjectItem;
  index: number;
  total: number;
  progress: MotionValue<number>;
  onOpen: (project: ProjectItem) => void;
}> = ({ project, index, total, progress, onOpen }) => {
  const y = useTransform(progress, (v: number) => `${slotAt(v, index, total).y}%`);
  const scale = useTransform(progress, (v: number) => slotAt(v, index, total).scale);
  const opacity = useTransform(progress, (v: number) => slotAt(v, index, total).opacity);
  const veil = useTransform(progress, (v: number) => slotAt(v, index, total).veil);

  return (
    <motion.article
      className="absolute inset-0 flex items-center justify-center px-6 md:px-12 depth cursor-pointer"
      style={{ y, scale, opacity, zIndex: index + 1 }}
      onClick={() => onOpen(project)}
    >
      <div className="relative w-full max-w-5xl group">
        <ProjectFolio
          folio={String(index + 1).padStart(2, '0')}
          featured={project.featured}
          categoryLabel={project.categoryLabel}
        />
        <ProjectPlate project={project} aspect="aspect-[16/10]" priority={index === 0} />
        <ProjectCaption project={project} />

        {/* Cards that have been handed over sink into the ink instead of
            staying legible — that loss of contrast is the depth cue. */}
        <motion.div
          className="pointer-events-none absolute -inset-4 bg-ink"
          style={{ opacity: veil }}
        />
      </div>
    </motion.article>
  );
};

const ProjectStack: React.FC<{
  projects: ProjectItem[];
  onOpen: (project: ProjectItem) => void;
}> = ({ projects, onOpen }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 38,
    restDelta: 0.0005,
  });

  const total = projects.length || 1;

  return (
    <div
      ref={containerRef}
      className="relative"
      style={{ height: `${Math.max(total * 55, 170)}vh` }}
    >
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        {projects.map((project, i) => (
          <DeckCard
            key={project.id}
            project={project}
            index={i}
            total={total}
            progress={progress}
            onOpen={onOpen}
          />
        ))}

        <div className="absolute bottom-6 right-6 md:right-12 pointer-events-none">
          <span className="font-mono text-[10px] tracking-[0.25em] text-faint">
            {String(total).padStart(2, '0')} WORKS · SCROLL
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProjectStack;
