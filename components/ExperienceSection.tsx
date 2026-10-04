import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../LanguageContext';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Copy, Check, ArrowUpRight, Award, Briefcase, 
  MapPin, Mail, Phone, Calendar, ChevronRight
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const ExperienceSection: React.FC = () => {
  const { ui, careers, language } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [activeCareerTab, setActiveCareerTab] = useState(careers[0]?.id || 'icon');

  // GSAP ScrollTrigger Sequence
  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Headline Mask Reveal
      gsap.fromTo(
        '.exp-title-line',
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

      // 2. Stagger Cards Entry
      gsap.fromTo(
        '.exp-stagger-card',
        { y: 55, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.0,
          ease: 'power3.out',
          stagger: 0.12,
          scrollTrigger: {
            trigger: '.exp-grid-trigger',
            start: 'top 80%',
          }
        }
      );

      // 3. Portrait Image Parallax / Unscale Reveal
      gsap.fromTo(
        '.exp-portrait-img',
        { scale: 1.16, filter: 'contrast(1.15) brightness(0.85)' },
        {
          scale: 1.0,
          filter: 'contrast(1.03) brightness(1)',
          duration: 1.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.exp-portrait-frame',
            start: 'top 85%',
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

  const handleCopyPhone = () => {
    navigator.clipboard.writeText('010-8388');
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  const currentCareer = careers.find((c: any) => c.id === activeCareerTab) || careers[0];

  return (
    <section 
      ref={sectionRef} 
      id="experience" 
      className="relative py-28 md:py-36 bg-[#0a0a0c] border-t border-white/[0.08]"
    >
      <div className="relative z-10 max-w-1700 mx-auto px-6 md:px-12">
        {/* Section Header with Mask Reveal */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-white/[0.08]">
          <div>
            <div className="text-xs uppercase tracking-wider text-[#86868b] mb-2 font-normal">
              {ui.experience.tag}
            </div>
            <div className="overflow-hidden py-1">
              <h2 className="exp-title-line text-3xl sm:text-5xl font-semibold text-[#f5f5f7] tracking-[-0.03em] block will-change-transform">
                {ui.experience.title}
              </h2>
            </div>
          </div>
          <p className="text-[#86868b] text-sm md:text-base font-normal max-w-md mt-3 md:mt-0 leading-relaxed tracking-[-0.01em]">
            {ui.experience.subtitle}
          </p>
        </div>

        {/* Top Part: Portrait + Bio & Metrics Grid */}
        <div className="exp-grid-trigger grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 mb-20 items-start">
          {/* Left Column: Portrait & Direct Contact Card (5 cols) */}
          <div className="lg:col-span-5 flex flex-col space-y-5 exp-stagger-card">
            {/* Portrait Frame */}
            <div className="exp-portrait-frame relative rounded-2xl overflow-hidden bg-[#121214] border border-white/[0.08] group shadow-xl">
              <div className="aspect-[3/4] w-full overflow-hidden bg-black">
                <img
                  src="/src/assets/images/designer_chanbong_portrait_1791140071150.jpg"
                  alt={ui.nav.brand}
                  className="exp-portrait-img w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 will-change-transform"
                  loading="lazy"
                />
              </div>

              {/* Status Floating Badge */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[12px] text-[#f5f5f7] flex items-center space-x-1.5 font-normal">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>{ui.experience.portraitBadge}</span>
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-white/[0.12] backdrop-blur-md border border-white/10 text-[#f5f5f7] text-[11px] font-medium">
                  {ui.experience.tierBadge}
                </span>
              </div>

              {/* Bottom Scrim with Name & Credentials */}
              <div className="absolute bottom-0 inset-x-0 p-6 bg-gradient-to-t from-black via-black/80 to-transparent">
                <h3 className="text-2xl font-semibold text-[#f5f5f7] tracking-[-0.02em]">
                  {ui.nav.brand}
                </h3>
                <p className="text-accent text-xs font-medium tracking-wide mt-1">
                  {ui.nav.title}
                </p>
              </div>
            </div>

            {/* Direct Contact & Meta Snapshot */}
            <div className="p-6 rounded-2xl bg-[#121214] border border-white/[0.08] space-y-3.5">
              <div className="text-xs uppercase tracking-wider text-[#86868b] font-normal">
                {ui.experience.directTouchpoint}
              </div>

              {/* Email */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:border-white/[0.15] transition-colors">
                <div className="flex items-center space-x-3 text-sm">
                  <Mail size={15} className="text-accent" />
                  <span className="text-[#f5f5f7] text-xs sm:text-sm truncate font-mono">
                    ro3eandcat@gmail.com
                  </span>
                </div>
                <button
                  onClick={handleCopyEmail}
                  className="text-xs text-[#86868b] hover:text-[#f5f5f7] px-2.5 py-1 rounded bg-white/[0.06] hover:bg-white/[0.12] transition-colors flex items-center space-x-1 shrink-0 ml-2 cursor-pointer"
                >
                  {copiedEmail ? <Check size={11} className="text-emerald-400" /> : <Copy size={11} />}
                  <span>{copiedEmail ? ui.experience.copied : ui.experience.copy}</span>
                </button>
              </div>

              {/* Location & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                <div className="flex items-center space-x-2 p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] text-[#86868b]">
                  <MapPin size={13} className="text-accent shrink-0" />
                  <span className="truncate">{ui.experience.location}</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] text-[#86868b]">
                  <div className="flex items-center space-x-2 truncate">
                    <Phone size={13} className="text-accent shrink-0" />
                    <span>{ui.experience.phone}</span>
                  </div>
                  <button
                    onClick={handleCopyPhone}
                    className="hover:text-white transition-colors ml-1 cursor-pointer"
                    title={ui.experience.copy}
                  >
                    {copiedPhone ? <Check size={11} className="text-emerald-400" /> : <Copy size={11} />}
                  </button>
                </div>
              </div>

              {/* External Verified Links */}
              <div className="grid grid-cols-2 gap-2.5 pt-1">
                <a
                  href="https://naver.me/5fdFDeXr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-xs text-[#f5f5f7] transition-all group"
                >
                  <span>Naver Portfolio</span>
                  <ArrowUpRight size={13} className="text-[#86868b] group-hover:text-white transition-colors" />
                </a>

                <a
                  href="https://www.xiaohongshu.com/user/profile/5fd363ac000000000101cffc"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-xs text-[#f5f5f7] transition-all group"
                >
                  <span>Xiaohongshu</span>
                  <ArrowUpRight size={13} className="text-[#86868b] group-hover:text-white transition-colors" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Bio Narrative & Quantitative Impact (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-8 exp-stagger-card">
            {/* Bio Narrative */}
            <div className="space-y-5">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-accent text-xs">
                <Award size={13} />
                <span>{ui.experience.tag}</span>
              </div>

              <h3 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-[#f5f5f7] tracking-[-0.025em] leading-snug">
                {ui.experience.quote}
              </h3>

              <div className="space-y-4 text-[#86868b] text-sm md:text-base font-normal leading-relaxed">
                <p>{ui.experience.bioP1}</p>
                <p>{ui.experience.bioP2}</p>
                <p className="border-l-2 border-accent/70 pl-4 text-[#f5f5f7]">
                  {ui.experience.bioP3}
                </p>
              </div>
            </div>

            {/* Quantitative Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 pt-6 border-t border-white/[0.08]">
              {ui.experience.metrics.map((m: any, idx: number) => (
                <div key={idx} className="p-4 rounded-xl bg-[#121214] border border-white/[0.08]">
                  <div className="text-2xl sm:text-3xl md:text-4xl font-semibold text-[#f5f5f7] tracking-tight mb-0.5">
                    {m.value}
                  </div>
                  <div className="text-xs text-accent uppercase font-medium mb-1">
                    {m.unit}
                  </div>
                  <div className="text-[11px] text-[#86868b] line-clamp-2 leading-tight">
                    {m.sub}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Part: Interactive Career Timeline (Tabbed) */}
        <div className="pt-10 border-t border-white/[0.08] exp-stagger-card">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-2">
            <div>
              <span className="text-xs uppercase tracking-wider text-[#86868b] block mb-1">
                {ui.experience.careerHistoryTag}
              </span>
              <h3 className="text-2xl sm:text-3xl font-semibold text-[#f5f5f7] tracking-[-0.02em]">
                {ui.experience.careerHistoryTitle}
              </h3>
            </div>
            <div className="text-xs text-[#86868b]">
              {ui.experience.education}
            </div>
          </div>

          {/* Company Tabs */}
          <div className="flex space-x-2 overflow-x-auto no-scrollbar pb-3 mb-6">
            {careers.map((item: any) => {
              const isActive = activeCareerTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveCareerTab(item.id)}
                  className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm tracking-[-0.01em] transition-all whitespace-nowrap flex items-center space-x-2 cursor-pointer ${
                    isActive
                      ? 'bg-[#f5f5f7] text-black font-medium shadow-md'
                      : 'bg-[#121214] text-[#86868b] border border-white/[0.08] hover:border-white/[0.2] hover:text-[#f5f5f7]'
                  }`}
                >
                  <Briefcase size={13} />
                  <span>{item.company}</span>
                  <span className="text-[11px] opacity-70">({item.duration})</span>
                </button>
              );
            })}
          </div>

          {/* Active Career Detail Card */}
          <div className="p-6 md:p-8 rounded-2xl bg-[#121214] border border-white/[0.08]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 mb-5 border-b border-white/[0.08] gap-3">
              <div>
                <div className="flex items-center space-x-3 mb-1">
                  <h4 className="text-xl sm:text-2xl font-semibold text-[#f5f5f7] tracking-[-0.02em]">
                    {currentCareer.company}
                  </h4>
                  <span className="px-2 py-0.5 rounded text-[11px] bg-white/[0.08] text-[#86868b]">
                    {currentCareer.duration}
                  </span>
                </div>
                <div className="text-accent text-sm font-medium">
                  {currentCareer.role}
                </div>
              </div>

              <div className="flex items-center space-x-2 text-xs text-[#86868b]">
                <Calendar size={13} className="text-[#86868b]" />
                <span>{currentCareer.period}</span>
                <span>·</span>
                <span>{currentCareer.type}</span>
              </div>
            </div>

            {/* Bullet Highlights */}
            <div className="space-y-3">
              <div className="text-xs uppercase tracking-wider text-[#6e6e73]">
                {ui.experience.coreDuties}
              </div>
              <ul className="space-y-2.5">
                {currentCareer.highlights.map((h: string, i: number) => (
                  <li key={i} className="flex items-start space-x-2.5 text-sm md:text-base text-[#86868b] font-normal leading-relaxed">
                    <ChevronRight size={15} className="text-accent shrink-0 mt-1" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
