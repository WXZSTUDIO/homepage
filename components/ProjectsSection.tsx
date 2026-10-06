import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../LanguageContext';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { X, CalendarClock } from 'lucide-react';
import { useScrollLock } from '../hooks/useScrollLock';
import { ProjectItem, ProjectRow, CATEGORY_HEX } from './ProjectCard';

gsap.registerPlugin(ScrollTrigger);

const ProjectsSection: React.FC = () => {
  const { ui, projects, language } = useLanguage();
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

      gsap.fromTo(
        '.project-row',
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: 'power3.out',
          stagger: 0.05,
          scrollTrigger: { trigger: '.projects-list-trigger', start: 'top 85%' }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [language, filter]);

  // The detail panel is a full-page overlay — nothing behind it should move.
  const closePanel = useCallback(() => setSelectedProject(null), []);
  useScrollLock(!!selectedProject, closePanel);

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
      className="relative py-24 md:py-36"
    >
      <div className="max-w-1700 mx-auto px-6 md:px-12">
        {/* Section head — eyebrow + headline only */}
        <div className="mb-10">
          <div className="eyebrow mb-4">{ui.projects.tag}</div>
          <div className="overflow-hidden py-1">
            <h2 className="projects-title-line text-[clamp(2.2rem,5.4vw,4.5rem)] leading-[1.02] block will-change-transform">
              {ui.projects.title}
            </h2>
          </div>
        </div>

        {/* Filter rail — pill chips */}
        <div className="flex items-center gap-2.5 overflow-x-auto no-scrollbar pb-1 mb-8">
          {filters.map((f) => {
            const isActive = filter === f.key;
            return (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className={`relative whitespace-nowrap rounded-full px-4 py-2 font-mono text-[10px] uppercase tracking-[0.14em] transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-paper/[0.92] text-ink'
                    : 'glass-tile text-paper-70'
                }`}
              >
                {f.label}
              </button>
            );
          })}
        </div>

        {/* Glass list */}
        <div className="projects-list-trigger flex flex-col gap-2.5">
          {filteredProjects.map((project, i) => (
            <div className="project-row" key={project.id}>
              <ProjectRow
                project={project}
                index={i}
                onOpen={setSelectedProject}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Detail panel — no imagery, type does the work */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 overflow-y-auto overscroll-contain bg-ink/70 backdrop-blur-md"
            onClick={closePanel}
          >
            <div className="min-h-full w-full flex items-center justify-center p-4 pb-safe sm:p-8 md:p-12">
              <motion.div
                initial={{ y: 24, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 24, opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="relative max-w-3xl w-full glass-strong rounded-glass p-6 sm:p-10"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={closePanel}
                  className="absolute top-4 right-4 sm:top-6 sm:right-6 p-3 -m-1 text-muted hover:text-paper transition-colors cursor-pointer z-10"
                  aria-label="Close dialog"
                >
                  <X size={18} />
                </button>

                <div className="flex items-center gap-3 mb-6 eyebrow">
                  <span
                    className="w-2.5 h-2.5 inline-block"
                    style={{ backgroundColor: CATEGORY_HEX[selectedProject.category] || '#0A0A0A' }}
                    aria-hidden="true"
                  />
                  {selectedProject.categoryLabel} · {selectedProject.client} ·{' '}
                  {selectedProject.year}
                </div>

                <h3 className="font-display text-3xl sm:text-5xl text-paper leading-[1.05] pr-10">
                  {selectedProject.title}
                </h3>

                {selectedProject.videoSrc && (
                  <video
                    controls
                    autoPlay
                    playsInline
                    className="w-full aspect-video object-contain bg-ink-deep mt-8"
                    src={selectedProject.videoSrc}
                  />
                )}

                <p className="text-sm sm:text-base text-paper-70 mt-8 leading-[1.75] max-w-2xl">
                  {selectedProject.description}
                </p>

                {selectedProject.deliverables && (
                  <div className="mt-10 border-t border-rule pt-6">
                    <div className="eyebrow mb-4">Scope</div>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2.5">
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

                <div className="mt-10 pt-6 border-t border-rule flex items-center gap-2 eyebrow">
                  <CalendarClock size={12} strokeWidth={1.5} />
                  {selectedProject.year}
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
