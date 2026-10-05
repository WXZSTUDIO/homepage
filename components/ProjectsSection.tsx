import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../LanguageContext';
import { useMotionProfile } from '../hooks/useMotionProfile';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { X } from 'lucide-react';
import ProjectStack from './ProjectStack';
import { useScrollLock } from '../hooks/useScrollLock';
import { ProjectItem, ProjectPlate, ProjectFolio, ProjectCaption } from './ProjectCard';

gsap.registerPlugin(ScrollTrigger);

/* Editorial rhythm: the grid never repeats the same measure twice.
   Written as literal strings so Tailwind's scanner can see them. */
const SPANS = [
  'md:col-span-2 lg:col-span-7',
  'lg:col-span-5',
  'lg:col-span-5',
  'md:col-span-2 lg:col-span-7',
  'lg:col-span-4',
  'lg:col-span-4',
  'lg:col-span-4',
  'md:col-span-2 lg:col-span-12',
];
const ASPECTS = [
  'aspect-[16/10]',
  'aspect-[4/5]',
  'aspect-[4/5]',
  'aspect-[16/10]',
  'aspect-square',
  'aspect-square',
  'aspect-square',
  /* A 21:9 letterbox reads as an error strip on a phone; only go there once
     there is enough width to earn it. */
  'aspect-[16/10] md:aspect-[21/9]',
];
const OFFSETS = ['', 'lg:mt-24', '', 'lg:mt-16', '', 'lg:mt-10', '', ''];

const ProjectsSection: React.FC = () => {
  const { ui, projects, language } = useLanguage();
  const { heavy } = useMotionProfile();
  const sectionRef = useRef<HTMLElement>(null);
  const [filter, setFilter] = useState<string>('all');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

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

  // The lightbox is a full-page spread — nothing behind it should move.
  const closeLightbox = useCallback(() => setSelectedProject(null), []);
  useScrollLock(!!selectedProject, closeLightbox);

  const filters = [
    { key: 'all', label: ui.projects.all },
    { key: 'brand', label: 'Brand & VI' },
    { key: 'video', label: 'Video & Motion' },
    { key: 'ai', label: 'AI Synthesis' },
    { key: 'package', label: 'Packaging & Editorial' },
  ];

  const filteredProjects: ProjectItem[] =
    filter === 'all' ? projects : projects.filter((p: ProjectItem) => p.category === filter);

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
              <h2 className="projects-title-line dot-title text-[clamp(2.2rem,5.4vw,4.5rem)] leading-[1.02] block will-change-transform">
                {ui.projects.title}
              </h2>
            </div>
          </div>
          <p className="text-sm md:text-base text-muted max-w-md leading-relaxed md:text-right">
            {ui.projects.subtitle}
          </p>
        </div>

        {/* Filter rail — AUVI pill chips */}
        <div className="flex items-center gap-2.5 overflow-x-auto no-scrollbar pb-1 mb-14">
          {filters.map((f) => {
            const isActive = filter === f.key;
            return (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className={`relative whitespace-nowrap rounded-full px-4 py-2 font-mono text-[10px] uppercase tracking-[0.14em] transition-colors cursor-pointer border ${
                  isActive
                    ? 'bg-paper text-ink border-paper'
                    : 'text-muted border-rule hover:border-paper/40 hover:text-paper'
                }`}
              >
                {f.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Desktop: a pinned deck. Everything else: the editorial grid. */}
      {heavy ? (
        <ProjectStack projects={filteredProjects} onOpen={setSelectedProject} />
      ) : (
        <div className="max-w-1700 mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-x-8 gap-y-14 md:gap-x-12 md:gap-y-20">
            {filteredProjects.map((project, i) => {
              const span = SPANS[i % SPANS.length];
              const aspect = ASPECTS[i % ASPECTS.length];
              const offset = OFFSETS[i % OFFSETS.length];

              return (
                <article
                  key={project.id}
                  onClick={() => setSelectedProject(project)}
                  className={`group cursor-pointer flex flex-col ${span} ${offset}`}
                >
                  <ProjectFolio
                    folio={String(i + 1).padStart(2, '0')}
                    featured={project.featured}
                    categoryLabel={project.categoryLabel}
                  />
                  <ProjectPlate project={project} aspect={aspect} />
                  <ProjectCaption project={project} />
                </article>
              );
            })}
          </div>
        </div>
      )}

      {/* Lightbox — a full page spread */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 overflow-y-auto overscroll-contain bg-ink/97 backdrop-blur-sm"
            onClick={closeLightbox}
          >
            {/* min-h wrapper instead of items-center on the scroller: centered
                content taller than the viewport loses its top to the scroll. */}
            <div className="min-h-full w-full flex items-center justify-center p-3 pb-safe sm:p-8 md:p-12">
              <motion.div
                initial={{ y: 24, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 24, opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="relative max-w-6xl w-full bg-ink rounded-plate border border-rule p-5 sm:p-8 shadow-[0_24px_80px_rgba(22,22,20,0.18)]"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={closeLightbox}
                  className="absolute top-3 right-3 sm:top-6 sm:right-6 p-3 -m-1 text-muted hover:text-paper transition-colors cursor-pointer z-10"
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
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ProjectsSection;
