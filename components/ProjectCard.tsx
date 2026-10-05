import React from 'react';
import { Play } from 'lucide-react';

export interface ProjectItem {
  id: string;
  title: string;
  src: string;
  client: string;
  year: string;
  category: string;
  categoryLabel: string;
  featured?: boolean;
  description?: string;
  videoSrc?: string;
  deliverables?: string[];
}

/** The image plate — shared by the editorial grid and the stacked deck. */
export const ProjectPlate: React.FC<{
  project: ProjectItem;
  aspect?: string;
  priority?: boolean;
}> = ({ project, aspect = 'aspect-[16/10]', priority = false }) => (
  <div className={`frame ${aspect} w-full`}>
    <img
      src={project.src}
      alt={project.title}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      className="w-full h-full object-cover transition-transform duration-[900ms] ease-editorial group-hover:scale-[1.04] will-change-transform"
    />
    {project.videoSrc && (
      <div className="absolute top-4 right-4 w-9 h-9 border border-rule bg-ink/70 backdrop-blur-sm flex items-center justify-center text-paper opacity-70 group-hover:opacity-100 transition-opacity">
        <Play size={12} fill="currentColor" />
      </div>
    )}
    <span className="pointer-events-none absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-accent transition-transform duration-700 ease-editorial group-hover:scale-x-100" />
  </div>
);

/** Folio number + category line. */
export const ProjectFolio: React.FC<{
  folio: string;
  featured?: boolean;
  categoryLabel: string;
}> = ({ folio, featured, categoryLabel }) => (
  <div className="flex items-baseline justify-between gap-4 border-b border-rule pb-2 mb-4">
    <span
      className={`font-mono text-[11px] tracking-[0.2em] ${
        featured ? 'text-accent' : 'text-faint'
      }`}
    >
      {folio}
      {featured && (
        <span className="ml-3 text-[9px] tracking-[0.25em]">★ Featured</span>
      )}
    </span>
    <span className="eyebrow text-right">{categoryLabel}</span>
  </div>
);

/** Title + client/year caption. */
export const ProjectCaption: React.FC<{ project: ProjectItem }> = ({
  project,
}) => (
  <div className="mt-4 flex items-start justify-between gap-6 border-t border-rule-soft pt-3">
    <h3 className="font-display text-xl sm:text-2xl text-paper leading-tight group-hover:text-accent transition-colors duration-300">
      {project.title}
    </h3>
    <div className="eyebrow text-right shrink-0">
      {project.client} · {project.year}
    </div>
  </div>
);
