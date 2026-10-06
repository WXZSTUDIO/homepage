import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../LanguageContext';
import gsap from 'gsap';
import {
  ArrowDown,
  ArrowUpRight,
  Aperture,
  Clapperboard,
  Sparkles,
  Package,
} from 'lucide-react';

interface HeroSectionProps {
  onExplore: () => void;
  onContact: () => void;
  isIntroDone: boolean;
}

/* The four disciplines, rendered as the reference's colour blocks.
   Colour is identity here — no photography, no generated imagery. */
const DISCIPLINES = [
  { key: 'brand', label: 'Brand & VI', color: '#FF7AC3', icon: Aperture },
  { key: 'video', label: 'Video & Motion', color: '#FF5A1F', icon: Clapperboard },
  { key: 'ai', label: 'AI Synthesis', color: '#55D98C', icon: Sparkles },
  { key: 'package', label: 'Packaging & Editorial', color: '#4F7CFF', icon: Package },
] as const;

const COLOR_BG: Record<string, string> = {
  brand: 'bg-c-pink',
  video: 'bg-c-orange',
  ai: 'bg-c-green',
  package: 'bg-c-blue',
};

const HeroSection: React.FC<HeroSectionProps> = ({
  onExplore,
  onContact,
  isIntroDone,
}) => {
  const { ui, language } = useLanguage();
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
        { yPercent: 110, skewY: 2, opacity: 0 },
        {
          yPercent: 0,
          skewY: 0,
          opacity: 1,
          duration: 1.3,
          ease: 'expo.out',
          stagger: 0.12,
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
        '.hero-discipline',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: 'power3.out',
          stagger: 0.09,
        },
        '-=0.7'
      );
    }, heroRef);

    return () => ctx.revert();
  }, [isIntroDone, language]);

  return (
    <section ref={heroRef} id="hero" className="relative w-full min-h-viewport">
      <div className="relative w-full min-h-viewport flex flex-col grain">
        <div className="relative z-10 max-w-1700 mx-auto w-full px-6 md:px-12 flex flex-col flex-1 pt-28 sm:pt-32 pb-10">
          {/* Running head */}
          <motion.div className="hero-eyebrow flex items-center justify-between border-b border-rule pb-4 mt-2 sm:mt-6">
            <span className="eyebrow text-paper">Vol. 01</span>
            <span className="eyebrow hidden sm:block">
              {ui.nav.brand} — Archive
            </span>
            <span className="eyebrow">Seoul, KR</span>
          </motion.div>

          {/* Headline spread */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-16 items-end flex-1 py-10 sm:py-14">
            <h1 className="lg:col-span-8 font-display leading-[1.02] tracking-[-0.02em]">
              <span className="block overflow-hidden py-[0.06em]">
                <span className="hero-line-inner block will-change-transform text-[clamp(2.6rem,7.2vw,6.4rem)] text-paper">
                  {ui.hero.headline1}
                </span>
              </span>
              <span className="block overflow-hidden py-[0.06em]">
                <span className="hero-line-inner block will-change-transform italic text-[clamp(2.6rem,7.2vw,6.4rem)] text-paper-45">
                  {ui.hero.headline2}
                </span>
              </span>
            </h1>

            <div className="lg:col-span-4 lg:pb-2">
              <p className="hero-content-fade text-sm sm:text-base text-paper-70 leading-relaxed max-w-md border-t border-rule pt-5">
                {ui.hero.narrative1}
              </p>

              <div className="hero-content-fade flex flex-wrap items-center gap-3 mt-8">
                <button onClick={onExplore} className="group btn-pill cursor-pointer">
                  {ui.hero.btnExplore}
                  <ArrowDown
                    size={12}
                    className="transition-transform duration-300 group-hover:translate-y-0.5"
                  />
                </button>
                <button onClick={onContact} className="group btn-pill-ghost cursor-pointer">
                  {ui.hero.btnContact}
                  <ArrowUpRight
                    size={12}
                    className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Four disciplines — the colour blocks, dithered like the reference */}
          <div className="grid grid-cols-2 lg:grid-cols-4 border border-rule">
            {DISCIPLINES.map((d, i) => {
              const Icon = d.icon;
              return (
                <div
                  key={d.key}
                  className={`hero-discipline group relative overflow-hidden ${COLOR_BG[d.key]} dither p-5 md:p-7 min-h-[9.5rem] md:min-h-[12rem] flex flex-col justify-between border-rule ${
                    i > 0 ? 'border-l' : ''
                  } ${i >= 2 ? 'border-t lg:border-t-0' : ''}`}
                >
                  <div className="relative z-10 flex items-start justify-between">
                    <span className="font-mono text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-black/70">
                      {String(i + 1).padStart(2, '0')} —
                    </span>
                    <Icon
                      size={16}
                      strokeWidth={1.6}
                      className="text-black/80"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="relative z-10">
                    <div className="font-display text-xl md:text-2xl text-black leading-tight">
                      {d.label}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Foot line */}
          <div className="hero-eyebrow pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 eyebrow">
              <span>{ui.hero.statExp}</span>
              <span className="text-faint/50">/</span>
              <span>{ui.hero.statProjects}</span>
              <span className="text-faint/50">/</span>
              <span>{ui.hero.statBrands}</span>
            </div>
            <button
              onClick={onExplore}
              className="group inline-flex items-center gap-2 eyebrow text-muted hover:text-paper transition-colors cursor-pointer"
            >
              {ui.hero.scroll}
              <ArrowDown
                size={11}
                className="transition-transform duration-300 group-hover:translate-y-0.5"
              />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
