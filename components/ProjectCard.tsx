import React from 'react';
import { ArrowUpRight } from 'lucide-react';

export interface ProjectItem {
  id: string;
  title: string;
  client: string;
  year: string;
  category: string;
  categoryLabel: string;
  featured?: boolean;
  description?: string;
  videoSrc?: string;
  deliverables?: string[];
}

/* Category → Lexington brand colour. */
export const CATEGORY_COLOR: Record<string, string> = {
  brand: 'bg-c-pink',
  video: 'bg-c-orange',
  ai: 'bg-c-green',
  package: 'bg-c-blue',
};

export const CATEGORY_HEX: Record<string, string> = {
  brand: '#FF7AC3',
  video: '#FF5A1F',
  ai: '#55D98C',
  package: '#4F7CFF',
};

/** A Lexington list row: number · colour chip · serif title · meta · tags · arrow. */
export const ProjectRow: React.FC<{
  project: ProjectItem;
  index: number;
  onOpen: (project: ProjectItem) => void;
}> = ({ project, index, onOpen }) => {
  const hex = CATEGORY_HEX[project.category] || '#0A0A0A';

  return (
    <button
      onClick={() => onOpen(project)}
      className="group relative w-full text-left glass-tile rounded-glass grid grid-cols-[2.5rem_1fr_auto] sm:grid-cols-[3.5rem_1rem_1fr_auto] items-center gap-x-3 sm:gap-x-5 gap-y-1 px-4 sm:px-6 py-5 cursor-pointer"
      aria-label={project.title}
    >
      {/* Featured rows carry a colour rail */}
      {project.featured && (
        <span
          className="absolute left-3 top-5 bottom-5 w-[3px] rounded-full"
          style={{ backgroundColor: hex }}
          aria-hidden="true"
        />
      )}

      <span className="font-mono text-[11px] tracking-[0.15em] text-faint">
        {String(index + 1).padStart(2, '0')}
      </span>

      <span
        className={`hidden sm:block w-2.5 h-2.5 ${CATEGORY_COLOR[project.category] || 'bg-paper'}`}
        aria-hidden="true"
      />

      <span className="min-w-0">
        <span className="block font-display text-xl sm:text-2xl text-paper leading-tight truncate">
          {project.title}
        </span>
        <span className="block eyebrow mt-1 normal-case tracking-[0.08em]">
          {project.client} · {project.categoryLabel}
          {project.featured && <span className="ml-2">★</span>}
        </span>
      </span>

      <span className="flex items-center gap-3 sm:gap-5 shrink-0">
        <span className="tag-pill hidden md:inline-flex">{project.year}</span>
        <span
          className="w-9 h-9 rounded-full flex items-center justify-center text-paper transition-all duration-300"
          style={{ background: 'rgba(255,255,255,0.1)' }}
          aria-hidden="true"
        >
          <ArrowUpRight
            size={13}
            className="transition-transform duration-300 group-hover:translate-x-[1px] group-hover:-translate-y-[1px]"
          />
        </span>
      </span>
    </button>
  );
};
