import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../LanguageContext';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Copy, Check } from 'lucide-react';
import DepthLayer from './DepthLayer';

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
      className="relative py-24 md:py-36 bg-ink border-t border-rule"
    >
      <div className="max-w-1700 mx-auto px-6 md:px-12">
        {/* Section head */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14 pb-6 border-b border-rule">
          <div>
            <div className="eyebrow mb-3">{ui.experience.tag}</div>
            <div className="overflow-hidden py-1">
              <h2 className="exp-title-line font-display text-[clamp(2.2rem,5.4vw,4.5rem)] leading-[0.98] text-paper block will-change-transform">
                {ui.experience.title}
              </h2>
            </div>
          </div>
          <p className="text-sm md:text-base text-muted max-w-md leading-relaxed md:text-right">
            {ui.experience.subtitle}
          </p>
        </div>

        {/* Profile spread */}
        <div className="exp-content-trigger grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left: portrait plate */}
          <div className="lg:col-span-5 exp-stagger-item">
            <figure className="m-0">
              <div className="frame aspect-[3/4] w-full">
                <DepthLayer
                  depth={0.45}
                  travel={70}
                  className="absolute inset-x-0 -top-[12%] -bottom-[12%]"
                >
                  <img
                    src="images/designer-chanbong-portrait.jpg"
                    alt={ui.nav.brand}
                    className="w-full h-full object-cover grayscale contrast-105 brightness-95 hover:grayscale-0 transition-[filter] duration-700"
                    loading="lazy"
                  />
                </DepthLayer>
              </div>
              <figcaption className="mt-5 border-t border-rule pt-4">
                <div className="flex items-baseline justify-between gap-4">
                  <span className="font-display text-2xl text-paper leading-none">
                    ZHENG CANFENG
                  </span>
                  <span className="eyebrow">Seoul, KR</span>
                </div>
                <div className="mt-2 text-sm text-muted">{ui.nav.title}</div>

                <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 eyebrow">
                  <button
                    onClick={handleCopyEmail}
                    className="inline-flex items-center gap-1.5 text-muted hover:text-paper transition-colors cursor-pointer"
                  >
                    <Mail size={11} />
                    <span className="normal-case tracking-normal">
                      ro3eandcat@gmail.com
                    </span>
                    {copiedEmail && <Check size={11} className="text-accent" />}
                  </button>
                  <span className="text-faint/60">/</span>
                  <span>WeChat: icf304</span>
                </div>
              </figcaption>
            </figure>
          </div>

          {/* Right: column text */}
          <div className="lg:col-span-7 space-y-12 exp-stagger-item">
            {/* Lead paragraph with drop cap */}
            <p className="dropcap text-base sm:text-lg text-paper-70 leading-[1.75] max-w-2xl">
              {ui.experience.bioP1}
            </p>

            {/* Metrics — set on a hairline grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 border-t border-rule">
              {metrics.map((m: any, idx: number) => (
                <div
                  key={idx}
                  className={`pt-5 pb-1 ${idx > 0 ? 'sm:border-l sm:border-rule sm:pl-5' : ''}`}
                >
                  <div className="folio text-4xl sm:text-5xl">{m.value}</div>
                  <div className="eyebrow mt-2">{m.unit}</div>
                </div>
              ))}
            </div>

            {/* Career — contents table */}
            <div className="border-t border-rule pt-6">
              <div className="eyebrow mb-5">
                {ui.experience.careerHistoryTitle || ui.experience.careerHistoryTag}
              </div>

              <div className="border-t border-rule-soft">
                {careers.map((career: any) => (
                  <div
                    key={career.id}
                    className="group grid grid-cols-1 sm:grid-cols-[7.5rem_1fr] gap-1 sm:gap-6 py-4 border-b border-rule-soft items-baseline"
                  >
                    <span className="eyebrow text-faint">{career.period}</span>
                    <div>
                      <h3 className="font-display text-xl sm:text-2xl text-paper leading-tight group-hover:text-accent transition-colors duration-300">
                        {career.company}
                      </h3>
                      <div className="text-xs text-muted mt-1">
                        {career.role} · {career.type} · {career.duration}
                      </div>
                    </div>
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
