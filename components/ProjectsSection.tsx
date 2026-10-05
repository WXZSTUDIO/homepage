import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../LanguageContext';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Play, X } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

/* Editorial rhythm: the grid never repeats the same measure twice.
   Written as literal strings so Tailwind's scanner can see them. */
const SPANS = [
  'lg:col-span-7',
  'lg:col-span-5',
  'lg:col-span-5',
  'lg:col-span-7',
  'lg:col-span-4',
  'lg:col-span-4',
  'lg:col-span-4',
  'lg:col-span-12',
];
const ASPECTS = [
  'aspect-[16/10]',
  'aspect-[4/5]',
  'aspect-[4/5]',
  'aspect-[16/10]',
  'aspect-square',
  'aspect-square',
  'aspect-square',
  'aspect-[21/9]',
];
const OFFSETS = ['', 'lg:mt-24', '', 'lg:mt-16', '', 'lg:mt-10', '', ''];

const ProjectsSection: React.FC = () => {
  const { ui, projects, language } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const [filter, setFilter] = useState<string>('all');
  const [selectedProject, setSelectedProject] = useState<any | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.projects-title-line',
        { yPercent: 110, skewY: 2, opacity: 0 },
        {
          yPercent: 0,
          skewY: 0,
          opacity: 1,
          duration: 1.2,
          ease: 'expo.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [language]);

  const filters = [
    { key: 'all', label: ui.projects.all },
    { key: 'brand', label: 'Brand & VI' },
    { key: 'video', label: 'Video & Motion' },
    { key: 'ai', label: 'AI Synthesis' },
    { key: 'package', label: 'Packaging & Editorial' },
  ];

  const filteredProjects =
    filter === 'all' ? projects : projects.filter((p: any) => p.category === filter);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative py-24 md:py-36 bg-ink border-t border-rule"
    >
      <div className="max-w-1700 mx-auto px-6 md:px-12">
        {/* Section head */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 pb-6 border-b border-rule">
          <div>
            <div className="eyebrow mb-3">{ui.projects.tag}</div>
            <div className="overflow-hidden py-1">
              <h2 className="projects-title-line font-display text-[clamp(2.2rem,5.4vw,4.5rem)] leading-[0.98] text-paper block will-change-transform">
                {ui.projects.title}
              </h2>
            </div>
          </div>
          <p className="text-sm md:text-base text-muted max-w-md leading-relaxed md:text-right">
            {ui.projects.subtitle}
          </p>
        </div>

        {/* Filter rail */}
        <div className="flex items-center gap-6 md:gap-8 overflow-x-auto no-scrollbar pb-3 border-b border-rule mb-14">
          {filters.map((f) => {
            const isActive = filter === f.key;
            return (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className={`relative whitespace-nowrap pb-3 font-mono text-[10px] uppercase tracking-[0.18em] transition-colors cursor-pointer ${
                  isActive ? 'text-paper' : 'text-faint hover:text-paper'
                }`}
              >
                {f.label}
                {isActive && (
                  <motion.span
                    layoutId="activeTabUnderline"
                    className="absolute bottom-0 left-0 right-0 h-px bg-accent"
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Asymmetric editorial grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-x-8 gap-y-14 md:gap-x-12 md:gap-y-20">
          {filteredProjects.map((project: any, i: number) => {
            const span = SPANS[i % SPANS.length];
            const aspect = ASPECTS[i % ASPECTS.length];
            const offset = OFFSETS[i % OFFSETS.length];

            return (
              <article
                key={project.id}
                onClick={() => setSelectedProject(project)}
                className={`group cursor-pointer flex flex-col ${span} ${offset}`}
              >
                {/* Folio + category */}
                <div className="flex items-baseline justify-between gap-4 border-b border-rule pb-2 mb-4">
                  <span
                    className={`font-mono text-[11px] tracking-[0.2em] ${
                      project.featured ? 'text-accent' : 'text-faint'
                    }`}
                  >
                    {String(i + 1).padStart(2, '0')}
                    {project.featured && <span className="ml-3 text-[9px] tracking-[0.25em]">★ Featured</span>}
                  </span>
                  <span className="eyebrow text-right">{project.categoryLabel}</span>
                </div>

                {/* Plate */}
                <div className={`frame ${aspect} w-full`}>
                  <img
                    src={project.src}
                    alt={project.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-[900ms] ease-editorial group-hover:scale-[1.04] will-change-transform"
                  />
                  {project.videoSrc && (
                    <div className="absolute top-4 right-4 w-9 h-9 border border-rule bg-ink/70 backdrop-blur-sm flex items-center justify-center text-paper opacity-70 group-hover:opacity-100 transition-opacity">
                      <Play size={12} fill="currentColor" />
                    </div>
                  )}
                  {/* accent hairline draws in on hover */}
                  <span className="pointer-events-none absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-accent transition-transform duration-700 ease-editorial group-hover:scale-x-100" />
                </div>

                {/* Caption */}
                <div className="mt-4 flex items-start justify-between gap-6 border-t border-rule-soft pt-3">
                  <h3 className="font-display text-xl sm:text-2xl text-paper leading-tight group-hover:text-accent transition-colors duration-300">
                    {project.title}
                  </h3>
                  <div className="eyebrow text-right shrink-0">
                    {project.client} · {project.year}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* Lightbox — a full page spread */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 md:p-12 bg-ink/97 backdrop-blur-sm overflow-y-auto"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ y: 24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 24, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative max-w-6xl w-full bg-ink border border-rule p-5 sm:p-8"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 text-muted hover:text-paper transition-colors cursor-pointer z-10"
                aria-label="Close dialog"
              >
                <X size={18} />
              </button>

              <div className="eyebrow mb-4 pb-3 border-b border-rule-soft pr-10">
                {selectedProject.categoryLabel} · {selectedProject.client} ·{' '}
                {selectedProject.year}
              </div>

              <div className="frame aspect-[16/9] w-full mb-6">
                {selectedProject.videoSrc ? (
                  <video
                    controls
                    autoPlay
                    playsInline
                    className="w-full h-full object-contain"
                    src={selectedProject.videoSrc}
                  />
                ) : (
                  <img
                    src={selectedProject.src}
                    alt={selectedProject.title}
                    className="w-full h-full object-contain"
                  />
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                <div className="md:col-span-7">
                  <h3 className="font-display text-3xl sm:text-4xl text-paper leading-tight">
                    {selectedProject.title}
                  </h3>
                  <p className="text-sm text-paper-70 mt-4 leading-relaxed">
                    {selectedProject.description}
                  </p>
                </div>

                {selectedProject.deliverables && (
                  <div className="md:col-span-5 md:border-l md:border-rule md:pl-8">
                    <div className="eyebrow mb-3">Scope</div>
                    <ul className="space-y-2">
                      {selectedProject.deliverables.map((item: string, idx: number) => (
                        <li key={idx} className="text-sm text-muted flex gap-3">
                          <span className="text-faint font-mono text-[10px] pt-1">
                            {String(idx + 1).padStart(2, '0')}
                          </span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ProjectsSection;
