import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../LanguageContext';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, ArrowUpRight, Copy, Check } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const ExperienceSection: React.FC = () => {
  const { ui, careers, language } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const [copiedEmail, setCopiedEmail] = useState(false);

  // GSAP ScrollTrigger Sequence
  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Headline Mask Reveal
      gsap.fromTo(
        '.exp-title-line',
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

      // 2. Content Stagger
      gsap.fromTo(
        '.exp-stagger-item',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: 'power3.out',
          stagger: 0.1,
          scrollTrigger: {
            trigger: '.exp-content-trigger',
            start: 'top 80%',
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [language]);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('ro3eandcat@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const metrics = ui.experience?.metrics || [
    { value: '13+', unit: 'Years Active', sub: 'Dedicated to visual design & cinema' },
    { value: '120+', unit: 'Deliveries', sub: 'Commercial brand systems & video' },
    { value: '15M+', unit: 'Impressions', sub: 'Viral reach across platforms' },
    { value: '100%', unit: 'Autonomous Gear', sub: 'Zero rental delay' },
  ];

  return (
    <section 
      ref={sectionRef} 
      id="experience" 
      className="relative py-28 md:py-36 bg-black border-t border-white/[0.08]"
    >
      <div className="relative z-10 max-w-1700 mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-white/[0.08]">
          <div>
            <div className="text-xs uppercase tracking-[0.2em] text-[#86868b] font-mono mb-3">
              {ui.experience.tag}
            </div>
            <div className="overflow-hidden py-1">
              <h2 className="exp-title-line text-3xl sm:text-5xl md:text-6xl font-semibold text-white tracking-[-0.03em] block will-change-transform">
                {ui.experience.title}
              </h2>
            </div>
          </div>
          <p className="text-[#86868b] text-sm md:text-base font-normal max-w-md mt-3 md:mt-0 leading-relaxed">
            {ui.experience.subtitle}
          </p>
        </div>

        {/* Image-Centric 2-Column Split */}
        <div className="exp-content-trigger grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Full Editorial Portrait Image (5 cols) */}
          <div className="lg:col-span-5 exp-stagger-item flex flex-col">
            <div className="aspect-[3/4] w-full overflow-hidden rounded-xl border border-white/[0.08] bg-[#111111]">
              <img
                src="/src/assets/images/designer_chanbong_portrait_1791140071150.jpg"
                alt={ui.nav.brand}
                className="w-full h-full object-cover filter contrast-105"
                loading="lazy"
              />
            </div>

            {/* Clean Typographic Caption Beneath Image */}
            <div className="mt-5 space-y-1">
              <div className="text-lg font-semibold text-white tracking-tight flex items-center justify-between">
                <span>ZHENG CANFENG (정찬봉)</span>
                <span className="text-xs font-mono text-[#86868b]">SEOUL, KR</span>
              </div>
              <p className="text-sm text-[#86868b]">
                {ui.nav.title}
              </p>
              <div className="pt-3 flex items-center space-x-4 text-xs font-mono text-[#86868b]">
                <button
                  onClick={handleCopyEmail}
                  className="hover:text-white transition-colors flex items-center space-x-1 cursor-pointer"
                >
                  <Mail size={12} />
                  <span>ro3eandcat@gmail.com</span>
                  {copiedEmail && <span className="text-white ml-1">✓</span>}
                </button>
                <span>/</span>
                <span>WeChat: icf304</span>
              </div>
            </div>
          </div>

          {/* Right Column: Bio + Pure Typographic Metrics + Career Timeline (7 cols) */}
          <div className="lg:col-span-7 space-y-12 exp-stagger-item">
            {/* Executive Bio - Single punchy statement */}
            <div>
              <p className="text-lg sm:text-xl text-[#f5f5f7] font-normal leading-relaxed tracking-[-0.01em]">
                {ui.experience.bioP1}
              </p>
            </div>

            {/* Pure Typographic Metrics (No Boxes, Pure Apple Numbers) */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-6 border-t border-white/[0.08]">
              {metrics.map((m: any, idx: number) => (
                <div key={idx} className="flex flex-col">
                  <div className="text-4xl sm:text-5xl font-light text-white tracking-tight">
                    {m.value}
                  </div>
                  <div className="text-xs text-[#86868b] mt-1 font-normal">
                    {m.unit}
                  </div>
                </div>
              ))}
            </div>

            {/* Career Timeline: Clean Minimalist Rows (No Text Clutter) */}
            <div className="pt-6 border-t border-white/[0.08] space-y-6">
              <div className="text-xs font-mono tracking-widest text-[#86868b] uppercase">
                {ui.experience.careerHistoryTitle || ui.experience.careerHistoryTag}
              </div>

              <div className="space-y-4">
                {careers.map((career: any) => (
                  <div key={career.id} className="border-b border-white/[0.06] pb-4 last:border-b-0 flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 sm:gap-4">
                    <div>
                      <h3 className="text-base sm:text-lg font-medium text-white tracking-tight">
                        {career.company}
                      </h3>
                      <div className="text-xs text-[#86868b] mt-0.5">
                        {career.role} · {career.type}
                      </div>
                    </div>
                    <span className="text-xs font-mono text-[#86868b] shrink-0">
                      {career.period}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
