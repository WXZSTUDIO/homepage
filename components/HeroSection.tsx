import React, { useRef, useState, useEffect } from 'react';
import { useLanguage } from '../LanguageContext';
import gsap from 'gsap';
import { ArrowDown, Volume2, VolumeX, ArrowUpRight } from 'lucide-react';

interface HeroSectionProps {
  onExplore: () => void;
  onContact: () => void;
  isIntroDone: boolean;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onExplore, onContact, isIntroDone }) => {
  const { ui, language } = useLanguage();
  const heroRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);

  // GSAP Kinetic Entrance Timeline for Hero Section
  useEffect(() => {
    if (!isIntroDone) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.1 });

      // 1. Eyebrow kicker
      tl.fromTo(
        '.hero-eyebrow',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
      );

      // 2. Masked Headline: Displacement and clean settling
      tl.fromTo(
        '.hero-line-inner',
        {
          yPercent: 110,
          skewY: 2,
          opacity: 0
        },
        {
          yPercent: 0,
          skewY: 0,
          opacity: 1,
          duration: 1.2,
          ease: 'expo.out',
          stagger: 0.12
        },
        '-=0.5'
      );

      // 3. Narrative and Buttons
      tl.fromTo(
        '.hero-content-fade',
        { y: 25, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out', stagger: 0.08 },
        '-=0.7'
      );

      // 4. Bottom bar
      tl.fromTo(
        '.hero-bottom-bar',
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
        '-=0.6'
      );
    }, heroRef);

    return () => ctx.revert();
  }, [isIntroDone, language]);

  const toggleSound = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative min-h-[92vh] w-full flex flex-col justify-between overflow-hidden bg-black pt-36 pb-12"
    >
      {/* Background Image / Video Asset - Pure, un-obscured with clean dimming */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          poster="/src/assets/images/shinsegae_luxury_visual_1791140086284.jpg"
          className="w-full h-full object-cover opacity-25 filter grayscale contrast-110 brightness-90"
        >
          <source
            src="https://wxzstudio.github.io/videos/portfolio-2024-showreel.mp4"
            type="video/mp4"
          />
        </video>
        {/* Subtle, flat dark overlay without heavy radial or colorful gradients */}
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 max-w-1700 mx-auto w-full px-6 md:px-12 my-auto py-10 md:py-16">
        <div className="max-w-4xl">
          {/* Eyebrow / Kicker */}
          <div className="hero-eyebrow text-xs uppercase tracking-[0.2em] text-[#86868b] font-mono mb-6">
            <span>{ui.nav.brand}</span>
            <span className="mx-2 text-white/30">/</span>
            <span>{ui.hero.roleBadge}</span>
          </div>

          {/* Master Headline: Pure white and silver typography, zero colorful gradients */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-semibold tracking-[-0.035em] leading-[1.04] mb-8">
            <div className="overflow-hidden block py-1">
              <span className="hero-line-inner block will-change-transform text-white">
                {ui.hero.headline1}
              </span>
            </div>
            <div className="overflow-hidden block py-1">
              <span className="hero-line-inner block will-change-transform text-[#a1a1a6]">
                {ui.hero.headline2}
              </span>
            </div>
          </h1>

          {/* Subheading Narrative - Concise Apple-style */}
          <div className="hero-content-fade mb-10 max-w-xl">
            <p className="text-base sm:text-lg text-[#a1a1a6] font-normal leading-relaxed">
              {ui.hero.narrative1}
            </p>
          </div>

          {/* Action Triggers: Apple-style pure buttons */}
          <div className="hero-content-fade flex flex-wrap items-center gap-4">
            <button
              onClick={onExplore}
              className="px-7 py-3 rounded-full bg-white text-black font-medium text-xs sm:text-sm tracking-tight hover:bg-[#e5e5ea] transition-colors flex items-center space-x-2 cursor-pointer active:scale-98"
            >
              <span>{ui.hero.btnExplore}</span>
              <ArrowDown size={14} />
            </button>

            <button
              onClick={onContact}
              className="px-7 py-3 rounded-full border border-white/20 hover:border-white text-white font-medium text-xs sm:text-sm tracking-tight transition-colors flex items-center space-x-1.5 cursor-pointer active:scale-98"
            >
              <span>{ui.hero.btnContact}</span>
              <ArrowUpRight size={14} />
            </button>

            {/* Subtle showreel audio toggle */}
            <button
              onClick={toggleSound}
              className="p-3 rounded-full text-[#86868b] hover:text-white transition-colors cursor-pointer"
              title={isMuted ? 'Unmute' : 'Mute'}
              aria-label="Toggle Audio"
            >
              {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Bar: Quiet Apple-style specs divider */}
      <div className="hero-bottom-bar relative z-10 max-w-1700 mx-auto w-full px-6 md:px-12 border-t border-white/[0.08] pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-[#86868b]">
        <div className="flex flex-wrap items-center gap-6 font-mono text-[11px] tracking-wider uppercase">
          <span>{ui.hero.statExp}</span>
          <span className="text-white/20">/</span>
          <span>{ui.hero.statProjects}</span>
          <span className="text-white/20">/</span>
          <span>{ui.hero.statBrands}</span>
        </div>

        <button
          onClick={onExplore}
          className="flex items-center space-x-1.5 text-[#86868b] hover:text-white transition-colors text-xs font-mono tracking-wider cursor-pointer"
        >
          <span>{ui.hero.scroll}</span>
          <ArrowDown size={12} />
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
