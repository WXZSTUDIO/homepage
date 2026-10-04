import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../LanguageContext';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Play, ArrowUpRight, X } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const ProjectsSection: React.FC = () => {
  const { ui, projects, language } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const [filter, setFilter] = useState<string>('all');
  const [selectedProject, setSelectedProject] = useState<any | null>(null);

  // GSAP ScrollTrigger Sequence for Projects Title
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
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          }
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

  const filteredProjects = filter === 'all'
    ? projects
    : projects.filter((p: any) => p.category === filter);

  return (
    <section 
      ref={sectionRef} 
      id="projects" 
      className="relative py-28 md:py-36 bg-black border-t border-white/[0.08]"
    >
      <div className="max-w-1700 mx-auto px-6 md:px-12">
        {/* Section Header: Pure Typographic Hierarchy */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-white/[0.08]">
          <div>
            <div className="text-xs uppercase tracking-[0.2em] text-[#86868b] font-mono mb-3">
              {ui.projects.tag}
            </div>
            <div className="overflow-hidden py-1">
              <h2 className="projects-title-line text-3xl sm:text-5xl md:text-6xl font-semibold text-white tracking-[-0.03em] block will-change-transform">
                {ui.projects.title}
              </h2>
            </div>
          </div>
          <p className="text-[#86868b] text-sm md:text-base font-normal max-w-md mt-3 md:mt-0 leading-relaxed">
            {ui.projects.subtitle}
          </p>
        </div>

        {/* Minimalist Apple-style Text Tabs */}
        <div className="flex items-center space-x-6 md:space-x-8 overflow-x-auto no-scrollbar pb-3 border-b border-white/[0.08] mb-14 text-xs md:text-sm">
          {filters.map((f) => {
            const isActive = filter === f.key;
            return (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className={`pb-3 transition-colors cursor-pointer relative whitespace-nowrap text-xs md:text-sm tracking-tight ${
                  isActive ? 'text-white font-medium' : 'text-[#86868b] hover:text-white'
                }`}
              >
                {f.label}
                {isActive && (
                  <motion.span 
                    layoutId="activeTabUnderline"
                    className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-white" 
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Image-Centric Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16 md:gap-x-12 md:gap-y-20">
          {filteredProjects.map((project: any) => (
            <div 
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className="group cursor-pointer flex flex-col select-none"
            >
              {/* Image Frame: Pure Media Asset without Dark Gradients or Overlay Badges */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#111111] rounded-xl border border-white/[0.08] group-hover:border-white/20 transition-colors duration-300">
                <img
                  src={project.src}
                  alt={project.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 ease-[0.16,1,0.3,1] group-hover:scale-[1.02] will-change-transform"
                />
                
                {/* Subtle video indicator if applicable */}
                {project.videoSrc && (
                  <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/70 backdrop-blur-md border border-white/15 flex items-center justify-center text-white opacity-80 group-hover:opacity-100 transition-opacity">
                    <Play size={13} fill="currentColor" />
                  </div>
                )}
              </div>

              {/* Minimalist Caption Beneath Image: Pure typography, zero noise */}
              <div className="mt-4 flex items-start justify-between">
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="text-lg md:text-xl font-medium text-white tracking-tight group-hover:text-[#a1a1a6] transition-colors">
                      {project.title}
                    </h3>
                    <ArrowUpRight size={14} className="text-[#86868b] opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                  </div>
                  <div className="text-xs text-[#86868b] mt-1">
                    {project.categoryLabel}
                  </div>
                </div>
                <div className="text-xs font-mono text-[#86868b] shrink-0 ml-4 text-right">
                  <span>{project.client}</span>
                  <span className="mx-1.5 text-white/20">·</span>
                  <span>{project.year}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Minimalist Lightbox Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-12 bg-black/95 backdrop-blur-2xl"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="relative max-w-5xl w-full bg-[#0a0a0a] rounded-2xl border border-white/[0.1] overflow-hidden p-6 sm:p-8"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-6 right-6 p-2 rounded-full text-[#86868b] hover:text-white transition-colors cursor-pointer z-10"
                aria-label="Close dialog"
              >
                <X size={20} />
              </button>

              {/* Main Media Preview */}
              <div className="w-full aspect-[16/9] rounded-xl overflow-hidden bg-black mb-6 border border-white/[0.06]">
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

              {/* Project Details */}
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                <div>
                  <div className="text-[11px] font-mono tracking-widest text-[#86868b] uppercase mb-1">
                    {selectedProject.categoryLabel} · {selectedProject.client} · {selectedProject.year}
                  </div>
                  <h3 className="text-2xl font-semibold text-white tracking-tight">
                    {selectedProject.title}
                  </h3>
                  <p className="text-sm text-[#86868b] mt-2 max-w-2xl leading-relaxed">
                    {selectedProject.description}
                  </p>
                </div>

                {selectedProject.deliverables && (
                  <div className="shrink-0 space-y-1 text-xs text-[#86868b] border-t md:border-t-0 md:border-l border-white/[0.08] pt-4 md:pt-0 md:pl-6">
                    <span className="text-white font-medium block mb-1">Scope:</span>
                    {selectedProject.deliverables.map((item: string, idx: number) => (
                      <div key={idx}>— {item}</div>
                    ))}
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
