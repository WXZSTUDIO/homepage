import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../LanguageContext';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Copy, Check, CalendarClock, Package, TrendingUp, Camera } from 'lucide-react';

/* Metrics carry an icon so they can be read at a glance. */
const METRIC_ICONS = [CalendarClock, Package, TrendingUp, Camera];

/* Lexington brand colours, one per metric. */
const METRIC_COLORS = ['#4F7CFF', '#FF5A1F', '#FF7AC3', '#55D98C'];

gsap.registerPlugin(ScrollTrigger);

const ExperienceSection: React.FC = () => {
  const { ui, careers, language } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const [copiedEmail, setCopiedEmail] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.exp-title-line',
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
        '.exp-stagger-item',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: 'power3.out',
          stagger: 0.1,
          scrollTrigger: { trigger: '.exp-content-trigger', start: 'top 80%' }
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
    { value: '100%', unit: 'Autonomous Gear', sub: 'Zero rental delay' }
  ];

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="relative py-24 md:py-36 bg-paper text-ink"
    >
      <div className="max-w-1700 mx-auto px-6 md:px-12">
        {/* Section head */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14 pb-6 border-b border-white/15">
          <div>
            <div className="eyebrow mb-3 !text-white/50">{ui.experience.tag}</div>
            <div className="overflow-hidden py-1">
              <h2 className="exp-title-line font-display text-[clamp(2.2rem,5.4vw,4.5rem)] leading-[1.02] text-ink block will-change-transform">
                {ui.experience.title}
              </h2>
            </div>
          </div>
          <p className="text-sm md:text-base text-white/60 max-w-md leading-relaxed md:text-right">
            {ui.experience.subtitle}
          </p>
        </div>

        <div className="exp-content-trigger grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left: identity block — type instead of a portrait */}
          <div className="lg:col-span-4 exp-stagger-item">
            <div className="font-display text-[clamp(3rem,6vw,5rem)] leading-[0.95] text-ink">
              ZHENG
              <br />
              CANFENG
            </div>
            <div className="mt-3 text-sm text-white/60">{ui.nav.title}</div>

            <div className="mt-8 border-t border-white/15 pt-5 space-y-3 eyebrow !text-white/50">
              <div className="flex items-center gap-2">
                <Mail size={11} />
                <button
                  onClick={handleCopyEmail}
                  className="inline-flex items-center gap-1.5 text-white/60 hover:text-ink transition-colors cursor-pointer"
                >
                  <span className="normal-case tracking-normal">
                    ro3eandcat@gmail.com
                  </span>
                  {copiedEmail ? (
                    <Check size={11} className="text-ink" />
                  ) : (
                    <Copy size={11} />
                  )}
                </button>
              </div>
              <div>Seoul, KR — WeChat: icf304</div>
            </div>
          </div>

          {/* Right: bio + metrics + career */}
          <div className="lg:col-span-8 space-y-14">
            <p className="exp-stagger-item text-base sm:text-lg text-white/75 leading-[1.75] max-w-2xl [&::first-letter]:font-display [&::first-letter]:float-left [&::first-letter]:mr-3 [&::first-letter]:leading-[0.82] [&::first-letter]:text-[4.2em] [&::first-letter]:text-ink">
              {ui.experience.bioP1}
            </p>

            {/* Metrics — coloured serif numerals, the reference's signature */}
            <div className="exp-stagger-item grid grid-cols-2 sm:grid-cols-4 gap-x-8 gap-y-10 border-t border-white/15 pt-10">
              {metrics.map((m: any, idx: number) => {
                const Icon = METRIC_ICONS[idx % METRIC_ICONS.length];
                const color = METRIC_COLORS[idx % METRIC_COLORS.length];
                return (
                  <div key={idx}>
                    <div className="flex items-center gap-2 mb-4">
                      <span
                        className="w-2 h-2 inline-block"
                        style={{ backgroundColor: color }}
                        aria-hidden="true"
                      />
                      <Icon size={13} strokeWidth={1.6} className="text-white/50" aria-hidden="true" />
                    </div>
                    <div className="folio text-5xl sm:text-6xl" style={{ color }}>
                      {m.value}
                    </div>
                    <div className="eyebrow mt-3 !text-white/50">{m.unit}</div>
                  </div>
                );
              })}
            </div>

            {/* Career — Lexington list rows */}
            <div className="exp-stagger-item border-t border-white/15 pt-2">
              <div className="eyebrow !text-white/50 py-4">
                {ui.experience.careerHistoryTitle || ui.experience.careerHistoryTag}
              </div>
              <div className="border-t border-white/10">
                {careers.map((career: any, idx: number) => (
                  <div
                    key={career.id}
                    className="group grid grid-cols-[3rem_1fr] sm:grid-cols-[4rem_1fr_auto] gap-x-4 gap-y-1 items-baseline border-b border-white/10 py-5 px-2 hover:bg-white/5 transition-colors duration-300"
                  >
                    <span className="font-mono text-[11px] tracking-[0.15em] text-white/40">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <div className="min-w-0">
                      <h3 className="font-display text-xl sm:text-2xl text-ink leading-tight">
                        {career.company}
                      </h3>
                      <div className="text-xs text-white/50 mt-1">
                        {career.role} · {career.type}
                      </div>
                    </div>
                    <span className="tag-pill !border-white/25 !text-white/60 col-start-2 sm:col-start-auto justify-self-start sm:justify-self-end">
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
