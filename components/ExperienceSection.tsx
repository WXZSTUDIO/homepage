import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../LanguageContext';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Copy, Check, CalendarClock, Package, TrendingUp, Camera, MapPin } from 'lucide-react';

/* Metric → icon + bloom colour. The label stays to one word. */
const METRICS = [
  { icon: CalendarClock, color: '#4F7CFF' },
  { icon: Package, color: '#FF7A2F' },
  { icon: TrendingUp, color: '#FF5FA2' },
  { icon: Camera, color: '#55D98C' },
];

gsap.registerPlugin(ScrollTrigger);

const ExperienceSection: React.FC = () => {
  const { ui, careers, language } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const [copiedEmail, setCopiedEmail] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.exp-title-line',
        { yPercent: 110, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 1.2,
          ease: 'expo.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' }
        }
      );

      gsap.fromTo(
        '.exp-stagger-item',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.85,
          ease: 'power3.out',
          stagger: 0.08,
          scrollTrigger: { trigger: '.exp-content-trigger', start: 'top 82%' }
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
    { value: '13+', unit: 'Years' },
    { value: '120+', unit: 'Deliveries' },
    { value: '15M+', unit: 'Impressions' },
    { value: '100%', unit: 'In-house' },
  ];

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="relative py-24 md:py-36"
    >
      <div className="max-w-1700 mx-auto px-6 md:px-12">
        {/* Section head */}
        <div className="mb-12">
          <div className="eyebrow mb-4">{ui.experience.tag}</div>
          <div className="overflow-hidden py-1">
            <h2 className="exp-title-line text-[clamp(2.2rem,5.4vw,4.5rem)] leading-[1.02] block will-change-transform">
              {ui.experience.title}
            </h2>
          </div>
        </div>

        <div className="exp-content-trigger grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 items-start">
          {/* Identity panel */}
          <div className="lg:col-span-4 exp-stagger-item glass rounded-glass p-7 md:p-8">
            <div className="relative z-10 font-display text-[clamp(2.4rem,4vw,3.4rem)] leading-[1] text-paper">
              ZHENG
              <br />
              CANFENG
            </div>
            <div className="relative z-10 mt-3 text-sm text-paper-70">{ui.nav.title}</div>

            <div className="relative z-10 mt-8 pt-6 border-t border-rule space-y-3">
              <button
                onClick={handleCopyEmail}
                className="w-full flex items-center gap-2.5 text-sm text-paper-70 hover:text-paper transition-colors cursor-pointer"
              >
                <Mail size={14} strokeWidth={1.5} />
                <span className="truncate">ro3eandcat@gmail.com</span>
                {copiedEmail ? (
                  <Check size={13} className="text-paper shrink-0" />
                ) : (
                  <Copy size={13} className="shrink-0" />
                )}
              </button>
              <div className="flex items-center gap-2.5 text-sm text-paper-70">
                <MapPin size={14} strokeWidth={1.5} />
                Seoul, KR
              </div>
            </div>
          </div>

          {/* Bio + metrics + career */}
          <div className="lg:col-span-8 space-y-4 lg:space-y-6">
            <p className="exp-stagger-item glass rounded-glass p-7 md:p-8 text-base sm:text-lg text-paper-70 leading-[1.7]">
              <span className="relative z-10">{ui.experience.bioP1}</span>
            </p>

            {/* Metrics — icon, coloured numeral, one-word label */}
            <div className="exp-stagger-item grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
              {metrics.map((m: any, idx: number) => {
                const meta = METRICS[idx % METRICS.length];
                const Icon = meta.icon;
                return (
                  <div
                    key={idx}
                    className="glass rounded-glass p-5 md:p-6 flex flex-col justify-between min-h-[9rem] md:min-h-[10.5rem]"
                  >
                    <div className="relative z-10 flex items-center justify-between">
                      <span
                        className="w-8 h-8 rounded-full flex items-center justify-center"
                        style={{ background: `${meta.color}45` }}
                      >
                        <Icon size={14} strokeWidth={1.7} className="text-paper" />
                      </span>
                    </div>
                    <div>
                      <div className="folio text-4xl sm:text-5xl" style={{ color: meta.color }}>
                        {m.value}
                      </div>
                      <div className="eyebrow mt-2.5">{m.unit}</div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Career — glass rows */}
            <div className="exp-stagger-item flex flex-col gap-2.5">
              {careers.map((career: any, idx: number) => (
                <div
                  key={career.id}
                  className="glass-tile rounded-glass grid grid-cols-[2.5rem_1fr] sm:grid-cols-[3rem_1fr_auto] gap-x-4 gap-y-1 items-center px-5 sm:px-6 py-5"
                >
                  <span className="font-mono text-[11px] tracking-[0.15em] text-faint">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <div className="min-w-0">
                    <h3 className="font-display text-lg sm:text-xl text-paper leading-tight">
                      {career.company}
                    </h3>
                    <div className="text-xs text-paper-45 mt-1">{career.role}</div>
                  </div>
                  <span className="tag-pill col-start-2 sm:col-start-auto justify-self-start sm:justify-self-end">
                    {career.period}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
