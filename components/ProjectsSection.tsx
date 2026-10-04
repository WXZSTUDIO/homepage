import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../LanguageContext';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Play, ArrowUpRight, X, Star, Eye } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const cardVariants = {
  rest: {
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  hover: {
    borderColor: 'rgba(255, 255, 255, 0.22)',
    transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] }
  }
};

const imageVariants = {
  rest: {
    scale: 1,
    filter: 'brightness(0.92)',
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
  },
  hover: {
    scale: 1.05,
    filter: 'brightness(1)',
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
  }
};

const scrimVariants = {
  rest: {
    opacity: 0.45,
    transition: { duration: 0.35 }
  },
  hover: {
    opacity: 0.82,
    transition: { duration: 0.35 }
  }
};

const overlayVariants = {
  rest: {
    opacity: 0,
    y: 10,
    transition: { duration: 0.2 }
  },
  hover: {
    opacity: 1,
    y: 0,
    transition: { 
      duration: 0.3, 
      ease: [0.16, 1, 0.3, 1],
      staggerChildren: 0.04
    }
  }
};

const childVariants = {
  rest: { opacity: 0, y: 6 },
  hover: { opacity: 1, y: 0, transition: { duration: 0.25 } }
};

const ProjectsSection: React.FC = () => {
  const { ui, projects, language } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const [filter, setFilter] = useState<string>('all');
  const [selectedProject, setSelectedProject] = useState<any | null>(null);

  // GSAP ScrollTrigger Sequence for Projects
  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Title Mask Reveal
      gsap.fromTo(
        '.projects-title-line',
        { yPercent: 110, skewY: 3, opacity: 0 },
        {
          yPercent: 0,
          skewY: 0,
          opacity: 1,
          duration: 1.25,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          }
        }
      );

      // 2. Cascade Card Stagger
      gsap.fromTo(
        '.project-card-stagger',
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.05,
          ease: 'power3.out',
          stagger: 0.12,
          scrollTrigger: {
            trigger: '.projects-grid-trigger',
            start: 'top 80%',
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [language, filter]);

  const filters = [
    { key: 'all', label: ui.projects.all },
    { key: 'brand', label: 'Brand & VI' },
    { key: 'video', label: 'Video & Short-form' },
    { key: 'ai', label: 'AI Generative' },
    { key: 'package', label: 'Packaging & Social' },
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
        {/* Section Header with Mask Reveal */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-white/[0.08]">
          <div>
            <div className="text-xs uppercase tracking-wider text-[#86868b] mb-2 font-normal">
              {ui.projects.tag}
            </div>
            <div className="overflow-hidden py-1">
              <h2 className="projects-title-line text-3xl sm:text-5xl font-semibold text-[#f5f5f7] tracking-[-0.03em] block will-change-transform">
                {ui.projects.title}
              </h2>
            </div>
          </div>
          <p className="text-[#86868b] text-sm md:text-base font-normal max-w-md mt-3 md:mt-0 leading-relaxed tracking-[-0.01em]">
            {ui.projects.subtitle}
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex space-x-2 overflow-x-auto no-scrollbar pb-3 mb-10">
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`px-4 py-2 rounded-full text-xs font-normal transition-all whitespace-nowrap cursor-pointer ${
                filter === f.key
                  ? 'bg-[#f5f5f7] text-black font-medium'
                  : 'bg-[#121214] text-[#86868b] border border-white/[0.08] hover:border-white/[0.2] hover:text-[#f5f5f7]'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Big Cards Grid with Stagger Trigger */}
        <div className="projects-grid-trigger grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-7">
          {filteredProjects.map((project: any) => (
            <div key={project.id} className="project-card-stagger">
              <motion.div
                initial="rest"
                animate="rest"
                whileHover="hover"
                whileTap="hover"
                variants={cardVariants}
                onClick={() => setSelectedProject(project)}
                className="group relative rounded-2xl overflow-hidden cursor-pointer bg-[#0d0d0f] border select-none h-[400px] md:h-[480px] flex flex-col justify-between shadow-lg"
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setSelectedProject(project);
                  }
                }}
              >
                {/* Media Layer with Framer Motion Scaling */}
                <div className="absolute inset-0 w-full h-full overflow-hidden bg-black">
                  <motion.img
                    variants={imageVariants}
                    src={project.src}
                    alt={project.title}
                    loading="lazy"
                    className="w-full h-full object-cover will-change-transform"
                  />
                </div>

                {/* Scrim Overlays */}
                <div className="absolute inset-0 vignette-radial opacity-50 pointer-events-none" />
                <motion.div
                  variants={scrimVariants}
                  className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent pointer-events-none"
                />

                {/* Top Floating Badge & Action */}
                <div className="relative z-20 p-6 md:p-7 flex items-center justify-between pointer-events-none">
                  <div className="flex items-center space-x-2">
                    <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[11px] text-[#f5f5f7] font-normal">
                      {project.categoryLabel}
                    </span>
                    {project.featured && (
                      <span className="px-2.5 py-0.5 rounded-full bg-accent text-black text-[10px] font-medium flex items-center space-x-1 shadow-sm">
                        <Star size={9} fill="currentColor" />
                        <span>Featured</span>
                      </span>
                    )}
                  </div>

                  <div className="w-9 h-9 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[#f5f5f7] flex items-center justify-center group-hover:border-white/40 transition-colors">
                    {project.videoSrc ? <Play size={14} fill="currentColor" /> : <Eye size={14} />}
                  </div>
                </div>

                {/* Center Play Indicator for Videos */}
                {project.videoSrc && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-15">
                    <div className="w-14 h-14 rounded-full bg-black/50 backdrop-blur-md border border-white/20 flex items-center justify-center text-white group-hover:scale-105 transition-all duration-300">
                      <Play size={20} className="ml-1" fill="currentColor" />
                    </div>
                  </div>
                )}

                {/* Revealed Project Title & Info Overlay via Framer Motion */}
                <motion.div
                  variants={overlayVariants}
                  className="relative z-20 p-6 md:p-7 pointer-events-none will-change-transform"
                >
                  <motion.div variants={childVariants} className="text-xs text-accent mb-1 flex items-center space-x-1.5 font-normal">
                    <span>{project.client}</span>
                    <span className="text-white/30">·</span>
                    <span className="text-[#86868b]">{project.year}</span>
                  </motion.div>

                  <motion.h3
                    variants={childVariants}
                    className="text-xl sm:text-2xl font-semibold text-[#f5f5f7] tracking-[-0.02em] mb-1.5"
                  >
                    {project.title}
                  </motion.h3>

                  <motion.p
                    variants={childVariants}
                    className="text-xs sm:text-sm text-[#86868b] font-normal line-clamp-2 max-w-xl mb-3.5 leading-relaxed"
                  >
                    {project.description}
                  </motion.p>

                  <motion.div variants={childVariants} className="flex flex-wrap items-center gap-1.5">
                    {project.tags.map((tag: string, tIdx: number) => (
                      <span
                        key={tIdx}
                        className="text-[11px] text-[#86868b] bg-white/[0.06] px-2 py-0.5 rounded border border-white/[0.08]"
                      >
                        #{tag}
                      </span>
                    ))}
                    <span className="text-accent text-xs flex items-center space-x-1 ml-auto font-medium">
                      <span>{ui.projects.inspect}</span>
                      <ArrowUpRight size={13} />
                    </span>
                  </motion.div>
                </motion.div>

                {/* Rest State Bottom Preview (Fades out when hovered) */}
                <div className="group-hover:opacity-0 transition-opacity duration-200 absolute bottom-6 left-6 right-6 z-10 flex items-end justify-between pointer-events-none">
                  <div>
                    <div className="text-[11px] text-accent mb-0.5 font-normal">
                      {project.client}
                    </div>
                    <div className="text-lg sm:text-xl font-semibold text-[#f5f5f7] tracking-[-0.02em]">
                      {project.title}
                    </div>
                  </div>
                  <span className="text-xs text-[#86868b]">
                    {project.year}
                  </span>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>

      {/* High-Resolution Project Lightbox Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-2xl flex items-center justify-center p-4 md:p-8"
            onClick={() => setSelectedProject(null)}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-6 right-6 p-2.5 rounded-full bg-white/[0.08] text-[#86868b] hover:text-white hover:bg-white/[0.15] transition-all z-20 border border-white/10 cursor-pointer"
              aria-label={ui.projects.close}
            >
              <X size={20} />
            </button>

            {/* Modal Dialog Card */}
            <motion.div
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl w-full max-h-[90vh] flex flex-col lg:flex-row bg-[#121214] border border-white/[0.1] rounded-2xl overflow-hidden shadow-2xl"
            >
              {/* Media Stage (Left / Top) */}
              <div className="flex-1 bg-black flex items-center justify-center p-4 md:p-6 min-h-[300px] md:min-h-[460px] overflow-hidden relative">
                {selectedProject.videoSrc ? (
                  <video
                    src={selectedProject.videoSrc}
                    controls
                    autoPlay
                    playsInline
                    className="max-w-full max-h-[68vh] w-auto h-auto rounded-lg shadow-xl border border-white/10"
                  />
                ) : (
                  <img
                    src={selectedProject.src}
                    alt={selectedProject.title}
                    className="max-w-full max-h-[68vh] w-auto h-auto object-contain rounded-lg shadow-xl"
                  />
                )}
              </div>

              {/* Sidebar Info (Right) */}
              <div className="w-full lg:w-88 p-6 md:p-7 border-t lg:border-t-0 lg:border-l border-white/[0.08] flex flex-col justify-between bg-[#121214] overflow-y-auto">
                <div className="space-y-5">
                  <div>
                    <div className="text-xs uppercase tracking-wider text-accent mb-1.5 font-normal">
                      {selectedProject.categoryLabel}
                    </div>

                    <h3 className="text-xl sm:text-2xl font-semibold text-[#f5f5f7] mb-1 tracking-[-0.02em]">
                      {selectedProject.title}
                    </h3>
                    <p className="text-xs text-[#86868b]">
                      {ui.projects.client}: <span className="text-[#f5f5f7] font-medium">{selectedProject.client}</span> ({selectedProject.year})
                    </p>
                  </div>

                  {/* Descriptions */}
                  <div className="space-y-2 text-[#86868b] text-sm font-normal leading-relaxed border-t border-white/[0.08] pt-3.5">
                    <p>{selectedProject.description}</p>
                  </div>

                  {/* Deliverables List */}
                  <div className="border-t border-white/[0.08] pt-3.5 space-y-1.5">
                    <div className="text-xs uppercase tracking-wider text-[#6e6e73]">
                      {ui.projects.deliverables}
                    </div>
                    <ul className="space-y-1 text-xs text-[#86868b]">
                      {selectedProject.deliverables.map((item: string, idx: number) => (
                        <li key={idx} className="flex items-start space-x-1.5">
                          <span className="text-accent font-medium">✓</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Tags */}
                  <div className="border-t border-white/[0.08] pt-3.5">
                    <div className="flex flex-wrap gap-1.5">
                      {selectedProject.tags.map((tag: string, tIdx: number) => (
                        <span
                          key={tIdx}
                          className="px-2 py-0.5 rounded bg-white/[0.04] border border-white/[0.08] text-[11px] text-[#86868b]"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/[0.08] mt-4 text-[11px] text-[#6e6e73] flex items-center justify-between">
                  <span>{ui.projects.verified}</span>
                  <span className="text-accent">OK</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ProjectsSection;
