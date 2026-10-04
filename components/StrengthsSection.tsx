import React, { useEffect, useRef } from 'react';
import { useLanguage } from '../LanguageContext';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const StrengthsSection: React.FC = () => {
  const { ui, language } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.strengths-title-line',
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

      gsap.fromTo(
        '.strengths-card',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: 'power3.out',
          stagger: 0.15,
          scrollTrigger: {
            trigger: '.strengths-grid-trigger',
            start: 'top 80%',
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [language]);

  const gearItems = [
    { name: 'Sony FX3 / A7S III', role: 'Full-Frame 4K 120p Cinema Line' },
    { name: 'DaVinci Resolve Studio', role: 'HDR Color Science & Grading Deck' },
    { name: 'Aputure & Nanlite Rig', role: 'Studio High-Output Lighting Array' },
    { name: 'DJI Ronin RS3 Pro', role: 'Cinema 3-Axis Stabilization' },
    { name: 'Atomos Ninja V+', role: 'ProRes RAW 10-Bit External Recording' },
    { name: 'Sennheiser & Rode', role: 'Professional Wireless Audio Suite' },
  ];

  const tools = [
    'ComfyUI', 'Midjourney v6', 'Runway Gen-3', 'DaVinci Resolve',
    'Premiere Pro', 'After Effects', 'Photoshop', 'Illustrator',
    'Figma', 'Blender 3D', 'Stable Diffusion', 'Lightroom Classic'
  ];

  return (
    <section 
      ref={sectionRef} 
      id="strengths" 
      className="relative py-28 md:py-36 bg-black border-t border-white/[0.08]"
    >
      <div className="relative z-10 max-w-1700 mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-white/[0.08]">
          <div>
            <div className="text-xs uppercase tracking-[0.2em] text-[#86868b] font-mono mb-3">
              {ui.strengths.tag}
            </div>
            <div className="overflow-hidden py-1">
              <h2 className="strengths-title-line text-3xl sm:text-5xl md:text-6xl font-semibold text-white tracking-[-0.03em] block will-change-transform">
                {ui.strengths.title}
              </h2>
            </div>
          </div>
          <p className="text-[#86868b] text-sm md:text-base font-normal max-w-md mt-3 md:mt-0 leading-relaxed">
            {ui.strengths.subtitle}
          </p>
        </div>

        {/* Image-First Visual Pillars (2 Wide Editorial Media Cards) */}
        <div className="strengths-grid-trigger grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mb-20">
          {/* Card 1: Commercial Cinema & Color Science */}
          <div className="strengths-card flex flex-col group">
            <div className="aspect-[16/10] w-full overflow-hidden rounded-xl border border-white/[0.08] bg-[#111111] group-hover:border-white/20 transition-colors duration-300">
              <img
                src="/src/assets/images/shinsegae_luxury_visual_1791140086284.jpg"
                alt="Commercial Cinema Direction"
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 ease-[0.16,1,0.3,1] group-hover:scale-[1.02]"
              />
            </div>
            <div className="mt-4 flex items-baseline justify-between">
              <h3 className="text-lg md:text-xl font-medium text-white tracking-tight">
                01 · {ui.strengths.gearTitle}
              </h3>
              <span className="text-xs font-mono text-[#86868b] uppercase tracking-wider">
                IN-HOUSE PRODUCTION
              </span>
            </div>
            <div className="text-xs text-[#86868b] mt-1">
              {ui.strengths.gearSubtitle}
            </div>
          </div>

          {/* Card 2: Generative AI & Next-Gen Synthesis */}
          <div className="strengths-card flex flex-col group">
            <div className="aspect-[16/10] w-full overflow-hidden rounded-xl border border-white/[0.08] bg-[#111111] group-hover:border-white/20 transition-colors duration-300">
              <img
                src="/src/assets/images/ai_generative_sculpture_1791140097764.jpg"
                alt="AI Generative Design"
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 ease-[0.16,1,0.3,1] group-hover:scale-[1.02]"
              />
            </div>
            <div className="mt-4 flex items-baseline justify-between">
              <h3 className="text-lg md:text-xl font-medium text-white tracking-tight">
                02 · {ui.strengths.skillTitle}
              </h3>
              <span className="text-xs font-mono text-[#86868b] uppercase tracking-wider">
                AI SYNTHESIS & PIPELINE
              </span>
            </div>
            <div className="text-xs text-[#86868b] mt-1">
              {ui.strengths.skillSubtitle}
            </div>
          </div>
        </div>

        {/* Minimalist Apple Tech Specs (Hardware & Software) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-12 border-t border-white/[0.08]">
          {/* Left: Production Gear Arsenal (6 cols) */}
          <div className="lg:col-span-6 space-y-6">
            <div className="text-xs font-mono tracking-widest text-[#86868b] uppercase">
              HARDWARE ARSENAL (OWNED)
            </div>
            <div className="divide-y divide-white/[0.06] border-y border-white/[0.06]">
              {gearItems.map((item, idx) => (
                <div key={idx} className="py-3 flex items-center justify-between text-xs">
                  <span className="text-[#f5f5f7] font-medium">{item.name}</span>
                  <span className="text-[#86868b] font-mono text-[11px] shrink-0 ml-4">{item.role}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Core Discipline Stack (6 cols) */}
          <div className="lg:col-span-6 space-y-6">
            <div className="text-xs font-mono tracking-widest text-[#86868b] uppercase">
              TECHNICAL & CREATIVE STACK
            </div>
            <div className="pt-2 border-t border-white/[0.06] grid grid-cols-2 sm:grid-cols-3 gap-y-3.5 gap-x-4">
              {tools.map((tool, idx) => (
                <div key={idx} className="text-xs text-[#86868b] hover:text-white transition-colors flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-white/20 shrink-0" />
                  <span className="font-mono text-white/90">{tool}</span>
                </div>
              ))}
            </div>
            <div className="pt-6 border-t border-white/[0.06] text-xs font-mono text-[#86868b] flex items-center justify-between">
              <span>STATUS</span>
              <span className="text-white">{ui.strengths.gearReady}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StrengthsSection;
