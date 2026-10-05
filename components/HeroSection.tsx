import React, { useRef, useState, useEffect } from 'react';
import { useLanguage } from '../LanguageContext';
import gsap from 'gsap';
import { ArrowDown, Volume2, VolumeX } from 'lucide-react';

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
          stagger: 0.12
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
        '.hero-bottom-bar',
        { opacity: 0, y: 12 },
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
      className="relative min-h-[100svh] w-full flex flex-col justify-between overflow-hidden bg-ink pt-32 pb-8 grain"
    >
      {/* Showreel as barely-there texture */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          poster="images/shinsegae-luxury-visual.jpg"
          className="w-full h-full object-cover opacity-[0.14] grayscale contrast-125"
        >
          <source
            src="https://wxzstudio.github.io/videos/portfolio-2024-showreel.mp4"
            type="video/mp4"
          />
        </video>
        <div className="absolute inset-0 bg-ink/70" />
      </div>

      {/* Right-edge spine label */}
      <div className="hidden xl:flex absolute right-5 top-1/2 -translate-y-1/2 z-10 flex-col items-center gap-4">
        <span className="w-px h-16 bg-rule" />
        <span className="spine eyebrow tracking-[0.3em]">SELECTED WORKS · 2013—2026</span>
        <span className="w-px h-16 bg-rule" />
      </div>

      <div className="relative z-10 max-w-1700 mx-auto w-full px-6 md:px-12 flex-1 flex flex-col justify-center py-12">
        {/* Running head */}
        <div className="hero-eyebrow flex items-center justify-between border-b border-rule pb-3 mb-10 md:mb-16">
          <span className="eyebrow text-accent">Vol. 01</span>
          <span className="eyebrow hidden sm:block">{ui.nav.brand} — Archive</span>
          <span className="eyebrow">Seoul, KR</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-end">
          {/* Cover headline */}
          <h1 className="lg:col-span-8 font-display leading-[0.94] tracking-[-0.02em]">
            <span className="block overflow-hidden py-[0.06em]">
              <span className="hero-line-inner block will-change-transform text-[clamp(2.6rem,7.6vw,6.6rem)] text-paper">
                {ui.hero.headline1}
              </span>
            </span>
            <span className="block overflow-hidden py-[0.06em]">
              <span className="hero-line-inner block will-change-transform italic text-[clamp(2.6rem,7.6vw,6.6rem)] text-paper-45">
                {ui.hero.headline2}
              </span>
            </span>
          </h1>

          {/* Standfirst + actions */}
          <div className="lg:col-span-4 lg:pb-3">
            <p className="hero-content-fade text-sm sm:text-base text-paper-70 leading-relaxed max-w-md border-t border-rule pt-5">
              {ui.hero.narrative1}
            </p>

            <div className="hero-content-fade flex flex-wrap items-center gap-3 mt-8">
              <button
                onClick={onExplore}
                className="group inline-flex items-center gap-2 border border-paper bg-paper px-5 py-2.5 font-mono text-[10px] uppercase tracking-[0.2em] text-ink hover:bg-transparent hover:text-paper transition-colors duration-300 cursor-pointer"
              >
                {ui.hero.btnExplore}
                <ArrowDown
                  size={12}
                  className="transition-transform duration-300 group-hover:translate-y-0.5"
                />
              </button>

              <button
                onClick={onContact}
                className="group inline-flex items-center gap-2 border border-rule px-5 py-2.5 font-mono text-[10px] uppercase tracking-[0.2em] text-paper hover:border-paper transition-colors duration-300 cursor-pointer"
              >
                {ui.hero.btnContact}
                <span className="transition-transform duration-300 group-hover:translate-x-0.5">
                  →
                </span>
              </button>

              <button
                onClick={toggleSound}
                className="p-2.5 text-faint hover:text-paper transition-colors cursor-pointer"
                title={isMuted ? 'Unmute' : 'Mute'}
                aria-label="Toggle Audio"
              >
                {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Foot line of the cover */}
      <div className="hero-bottom-bar relative z-10 max-w-1700 mx-auto w-full px-6 md:px-12 border-t border-rule pt-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
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
    </section>
  );
};

export default HeroSection;
