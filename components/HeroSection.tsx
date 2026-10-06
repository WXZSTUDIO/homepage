import React, { useEffect, useRef } from 'react';
import { useLanguage } from '../LanguageContext';
import gsap from 'gsap';
import {
  ArrowDown,
  ArrowUpRight,
  Aperture,
  Clapperboard,
  Sparkles,
  Package,
  CalendarClock,
  Layers,
  Building2,
} from 'lucide-react';

interface HeroSectionProps {
  onExplore: () => void;
  onContact: () => void;
  isIntroDone: boolean;
}

/* Four disciplines as glass tiles — icon, name, count. No prose. */
const DISCIPLINES = [
  { key: 'brand', label: 'Brand & VI', icon: Aperture, tint: 'rgba(255,95,162,0.28)' },
  { key: 'video', label: 'Video & Motion', icon: Clapperboard, tint: 'rgba(255,122,47,0.28)' },
  { key: 'ai', label: 'AI Synthesis', icon: Sparkles, tint: 'rgba(85,217,140,0.28)' },
  { key: 'package', label: 'Packaging', icon: Package, tint: 'rgba(79,124,255,0.28)' },
];

const HeroSection: React.FC<HeroSectionProps> = ({
  onExplore,
  onContact,
  isIntroDone,
}) => {
  const { ui, language, projects } = useLanguage();
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!isIntroDone) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.1 });

      tl.fromTo(
        '.hero-eyebrow',
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', stagger: 0.08 }
      );

      tl.fromTo(
        '.hero-line-inner',
        { yPercent: 110, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 1.25,
          ease: 'expo.out',
          stagger: 0.1,
        },
        '-=0.45'
      );

      tl.fromTo(
        '.hero-content-fade',
        { y: 22, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out', stagger: 0.08 },
        '-=0.75'
      );

      tl.fromTo(
        '.hero-tile',
        { y: 28, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: 'power3.out',
          stagger: 0.08,
        },
        '-=0.7'
      );
    }, heroRef);

    return () => ctx.revert();
  }, [isIntroDone, language]);

  const countOf = (key: string) =>
    projects.filter((p: any) => p.category === key).length;

  // Discipline names follow the active language; the literal is the fallback.
  const labelsByCategory: Record<string, string> = {};
  projects.forEach((p: any) => {
    if (!labelsByCategory[p.category]) labelsByCategory[p.category] = p.categoryLabel;
  });

  return (
    <section ref={heroRef} id="hero" className="relative w-full min-h-viewport">
      <div className="relative w-full min-h-viewport flex flex-col">
        <div className="relative z-10 max-w-1700 mx-auto w-full px-6 md:px-12 flex flex-col flex-1 pt-28 sm:pt-32 pb-10">
          {/* Running head — three labels, nothing more */}
          <div className="hero-eyebrow flex items-center justify-between pb-5 mt-2 sm:mt-6">
            <span className="eyebrow text-paper-70">{ui.nav.brand}</span>
            <span className="eyebrow hidden sm:block">{ui.hero.roleBadge}</span>
            <span className="eyebrow">Seoul, KR</span>
          </div>

          {/* Headline */}
          <div className="flex-1 flex flex-col justify-center py-10 sm:py-14">
            <h1 className="font-display leading-[1.02] tracking-[-0.035em] max-w-5xl">
              <span className="block overflow-hidden py-[0.06em]">
                <span className="hero-line-inner block will-change-transform text-[clamp(2.6rem,7.4vw,6.6rem)] text-paper">
                  {ui.hero.headline1}
                </span>
              </span>
              <span className="block overflow-hidden py-[0.06em]">
                <span className="hero-line-inner block will-change-transform text-[clamp(2.6rem,7.4vw,6.6rem)] text-paper-45">
                  {ui.hero.headline2}
                </span>
              </span>
            </h1>

            {/* Actions — icons do the talking */}
            <div className="hero-content-fade flex flex-wrap items-center gap-3 mt-10">
              <button onClick={onExplore} className="btn-pill group">
                {ui.hero.btnExplore}
                <ArrowDown
                  size={12}
                  className="transition-transform duration-300 group-hover:translate-y-0.5"
                />
              </button>
              <button onClick={onContact} className="btn-pill-ghost group">
                {ui.hero.btnContact}
                <ArrowUpRight
                  size={12}
                  className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </button>
            </div>
          </div>

          {/* Disciplines — glass tiles, icon + label + count */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {DISCIPLINES.map((d) => {
              const Icon = d.icon;
              return (
                <div
                  key={d.key}
                  className="hero-tile glass rounded-glass p-5 md:p-6 min-h-[7.5rem] md:min-h-[8.5rem] flex flex-col justify-between"
                >
                  <div className="relative z-10 flex items-start justify-between">
                    <span
                      className="w-9 h-9 rounded-full flex items-center justify-center"
                      style={{ background: d.tint }}
                    >
                      <Icon size={15} strokeWidth={1.7} className="text-paper" aria-hidden="true" />
                    </span>
                    <span className="folio text-2xl">{countOf(d.key)}</span>
                  </div>
                  <div className="relative z-10 font-display text-base md:text-lg text-paper leading-tight mt-4">
                    {labelsByCategory[d.key] || d.label}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Foot facts — icon + one number each */}
          <div className="hero-content-fade flex flex-wrap items-center gap-x-7 gap-y-3 pt-8">
            <span className="inline-flex items-center gap-2 eyebrow">
              <CalendarClock size={13} strokeWidth={1.5} />
              {ui.hero.statExp}
            </span>
            <span className="inline-flex items-center gap-2 eyebrow">
              <Layers size={13} strokeWidth={1.5} />
              {ui.hero.statProjects}
            </span>
            <span className="inline-flex items-center gap-2 eyebrow">
              <Building2 size={13} strokeWidth={1.5} />
              {ui.hero.statBrands}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
