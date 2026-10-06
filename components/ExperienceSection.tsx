import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../LanguageContext';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Copy, Check, Calendar, Package, TrendingUp, Camera, Pin } from './Icons';

/* Metric → icon. Silver numerals, one icon each, no colour noise. */
const METRICS = [
  { icon: Calendar },
  { icon: Package },
  { icon: TrendingUp },
  { icon: Camera },
];

gsap.registerPlugin(ScrollTrigger);

/* Count-up: eased 0 → target, runs once when the grid enters the viewport.
   Honours prefers-reduced-motion by snapping straight to the final value. */
const useCountUp = (target: number, run: boolean, duration = 1600) => {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!run) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setN(target);
      return;
    }
    let raf = 0;
    const t0 = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [run, target, duration]);
  return n;
};

const MetricTile: React.FC<{ m: any; run: boolean; icon: any }> = ({ m, run, icon: Icon }) => {
  const n = useCountUp(Number(m.value) || 0, run);
  const suffix = m.suffix ?? '';
  return (
    <div className="tile p-5 md:p-6 flex flex-col justify-between min-h-[9rem] md:min-h-[10rem]">
      <span className="chip w-8 h-8 text-paper-70">
        <Icon size={14} />
      </span>
      <div>
        <div className="text-4xl sm:text-5xl text-paper font-light tracking-tight leading-none tabular-nums">
          {n.toLocaleString()}
          {suffix}
        </div>
        <div className="eyebrow mt-2.5">{m.unit}</div>
      </div>
    </div>
  );
};

const ExperienceSection: React.FC = () => {
  const { ui, careers, language } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const metricsRef = useRef<HTMLDivElement>(null);
  const [metricsInView, setMetricsInView] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  useEffect(() => {
    const el = metricsRef.current;
    if (!el) return;
    const ob = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setMetricsInView(true);
          ob.disconnect();
        }
      },
      { threshold: 0.35 }
    );
    ob.observe(el);
    return () => ob.disconnect();
  }, []);

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

  const metrics =
    ui.experience?.metrics || [];

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
            <h2 className="exp-title-line section-line text-[clamp(2.2rem,5.4vw,4.5rem)] leading-[1.02]">
              {ui.experience.title}
            </h2>
          </div>
        </div>

        <div className="exp-content-trigger grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 items-start">
          {/* Identity */}
          <div className="lg:col-span-4 exp-stagger-item tile p-7 md:p-8">
            <img
              src="profile.jpg"
              alt="ZHENG CANFENG"
              loading="lazy"
              draggable={false}
              className="w-24 h-24 rounded-full object-cover object-top border border-rule-soft"
            />
            <div className="mt-6 text-[clamp(2.2rem,3.6vw,3rem)] leading-[1.05] text-paper font-medium tracking-tight">
              ZHENG
              <br />
              CANFENG
            </div>
            <div className="mt-3 text-sm text-muted">{ui.nav.title}</div>

            <div className="mt-8 pt-6 border-t border-rule space-y-3">
              <button
                onClick={handleCopyEmail}
                className="w-full flex items-center gap-2.5 text-sm text-muted hover:text-paper transition-colors cursor-pointer"
              >
                <Mail size={14} />
                <span className="truncate">ro3eandcat@gmail.com</span>
                {copiedEmail ? (
                  <Check size={13} className="text-paper shrink-0" />
                ) : (
                  <Copy size={13} className="shrink-0" />
                )}
              </button>
              <div className="flex items-center gap-2.5 text-sm text-muted">
                <Pin size={14} />
                Seoul, KR
              </div>
            </div>
          </div>

          {/* Bio + metrics + career */}
          <div className="lg:col-span-8 space-y-4 lg:space-y-6">
            <p className="exp-stagger-item tile p-7 md:p-8 text-base sm:text-lg text-paper-70 leading-[1.75]">
              {ui.experience.bioP1}
            </p>

            {/* Metrics — icon, silver numeral counting up on reveal */}
            <div ref={metricsRef} className="exp-stagger-item grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
              {metrics.map((m: any, idx: number) => {
                const meta = METRICS[idx % METRICS.length];
                return (
                  <MetricTile key={idx} m={m} run={metricsInView} icon={meta.icon} />
                );
              })}
            </div>

            {/* Career — hairline rows */}
            <div className="exp-stagger-item border-t border-rule">
              {careers.map((career: any, idx: number) => (
                <div
                  key={career.id}
                  className="grid grid-cols-[2.5rem_1fr_auto] gap-x-4 items-center py-5 border-b border-rule-soft"
                >
                  <span className="text-[11px] tracking-[0.15em] text-faint">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-lg sm:text-xl text-paper leading-tight font-medium">
                      {career.company}
                    </h3>
                    <div className="text-xs text-faint mt-1">{career.role}</div>
                  </div>
                  <span className="text-[11px] tracking-[0.1em] text-muted whitespace-nowrap">
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
