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
  const [currentTime, setCurrentTime] = useState('');

  // Live Seoul Time
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const seoulTime = new Intl.DateTimeFormat('en-US', {
        timeZone: 'Asia/Seoul',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      }).format(now);
      setCurrentTime(seoulTime);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // GSAP Kinetic Entrance Timeline for Hero Section
  useEffect(() => {
    if (!isIntroDone) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.15 });

      // 1. Top status row
      tl.fromTo(
        '.hero-meta-row',
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out' }
      );

      // 2. Eyebrow badge
      tl.fromTo(
        '.hero-eyebrow',
        { y: 25, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
        '-=0.5'
      );

      // 3. Masked Headline: Extreme displacement, skew, and scale compression returning to position
      tl.fromTo(
        '.hero-line-inner',
        {
          yPercent: 120,
          skewY: 4,
          scaleY: 1.12,
          opacity: 0
        },
        {
          yPercent: 0,
          skewY: 0,
          scaleY: 1,
          opacity: 1,
          duration: 1.35,
          ease: 'expo.out',
          stagger: 0.15
        },
        '-=0.6'
      );

      // 4. Narrative and Buttons
      tl.fromTo(
        '.hero-content-fade',
        { y: 35, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.0, ease: 'power3.out', stagger: 0.1 },
        '-=0.8'
      );

      // 5. Bottom bar
      tl.fromTo(
        '.hero-bottom-bar',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' },
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
      className="relative min-h-screen w-full flex flex-col justify-between overflow-hidden bg-black pt-32 pb-12"
    >
      {/* Background Video Layer */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          poster="/src/assets/images/shinsegae_luxury_visual_1791140086284.jpg"
          className="w-full h-full object-cover opacity-40 scale-100 filter contrast-110 brightness-75 transition-opacity duration-1000"
        >
          <source
            src="https://wxzstudio.github.io/videos/portfolio-2024-showreel.mp4"
            type="video/mp4"
          />
        </video>

        {/* Apple-style Smooth Dark Gradient Scrims */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/80" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-black/40 to-black" />
      </div>

      {/* Top Tagline Row */}
      <div className="hero-meta-row relative z-10 max-w-1700 mx-auto w-full px-6 md:px-12 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Status Pill */}
        <div className="flex items-center space-x-3 text-[13px] text-[#86868b]">
          <span className="flex items-center space-x-2 px-3 py-1 rounded-full bg-white/[0.06] border border-white/[0.08] backdrop-blur-md">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span className="text-[#f5f5f7] font-normal">{ui.hero.status}</span>
          </span>
          <span className="hidden sm:inline text-white/20">|</span>
          <span className="hidden sm:inline text-[#86868b]">
            {ui.hero.seoulTime}: <span className="text-[#f5f5f7] font-medium">{currentTime || '12:00:00'}</span>
          </span>
        </div>

        {/* Discipline Breadcrumb */}
        <div className="text-[13px] text-[#86868b]">
          {ui.hero.disciplines}
        </div>
      </div>

      {/* Center Apple-style Headline & Narrative with Kinetic Mask Reveal */}
      <div className="relative z-10 max-w-1700 mx-auto w-full px-6 md:px-12 my-auto py-12 md:py-16">
        <div className="max-w-4xl">
          {/* Eyebrow / Kicker */}
          <div className="hero-eyebrow inline-flex items-center space-x-2 mb-4 text-[#f5f5f7] text-sm md:text-base font-normal tracking-[-0.01em]">
            <span className="text-accent font-medium">{ui.hero.roleBadge}</span>
            <span className="text-white/20">·</span>
            <span className="text-[#86868b]">{ui.nav.brand}</span>
          </div>

          {/* Master Headline with Mask & Compression Reset */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[5.25rem] font-semibold tracking-[-0.035em] text-[#f5f5f7] leading-[1.05] mb-6">
            <div className="overflow-hidden block py-1">
              <span className="hero-line-inner block will-change-transform">
                {ui.hero.headline1}
              </span>
            </div>
            <div className="overflow-hidden block py-1">
              <span className="hero-line-inner block will-change-transform bg-gradient-to-r from-[#f5f5f7] via-[#e5e5ea] to-[#86868b] bg-clip-text text-transparent">
                {ui.hero.headline2}
              </span>
            </div>
          </h1>

          {/* Subheading Narrative */}
          <div className="hero-content-fade">
            <p className="text-lg sm:text-xl md:text-2xl text-[#86868b] font-normal max-w-3xl leading-relaxed mb-4 tracking-[-0.015em]">
              {ui.hero.narrative1}
            </p>
          </div>

          <div className="hero-content-fade">
            <p className="text-sm sm:text-base text-[#6e6e73] font-normal max-w-2xl leading-relaxed mb-8">
              {ui.hero.narrative2}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="hero-content-fade flex flex-wrap items-center gap-3 sm:gap-4">
            <button
              onClick={onExplore}
              className="px-6 py-3 rounded-full bg-[#f5f5f7] text-black font-medium text-sm tracking-[-0.01em] hover:bg-white hover:shadow-[0_4px_20px_rgba(255,255,255,0.25)] transition-all duration-300 flex items-center space-x-2 active:scale-95 cursor-pointer"
            >
              <span>{ui.hero.btnExplore}</span>
              <ArrowDown size={15} />
            </button>

            <button
              onClick={onContact}
              className="px-6 py-3 rounded-full bg-white/[0.08] hover:bg-white/[0.14] border border-white/[0.12] text-[#f5f5f7] font-medium text-sm tracking-[-0.01em] transition-all duration-300 flex items-center space-x-1.5 active:scale-95 cursor-pointer"
            >
              <span>{ui.hero.btnContact}</span>
              <ArrowUpRight size={15} className="text-accent" />
            </button>

            {/* Video Sound Toggle */}
            <button
              onClick={toggleSound}
              className="p-3 rounded-full bg-white/[0.06] hover:bg-white/[0.12] border border-white/[0.08] text-[#86868b] hover:text-[#f5f5f7] transition-colors cursor-pointer"
              title={isMuted ? 'Unmute Showreel' : 'Mute Showreel'}
              aria-label="Toggle Showreel Audio"
            >
              {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} className="text-accent" />}
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Bar: Quick Metrics & Credentials */}
      <div className="hero-bottom-bar relative z-10 max-w-1700 mx-auto w-full px-6 md:px-12 border-t border-white/[0.08] pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-[#86868b]">
        <div className="flex flex-wrap items-center gap-5 sm:gap-6">
          <div>
            <span className="text-[#f5f5f7] font-medium">{ui.hero.statExp}</span>
          </div>
          <span className="text-white/10">·</span>
          <div>
            <span className="text-[#f5f5f7] font-medium">{ui.hero.statProjects}</span>
          </div>
          <span className="text-white/10">·</span>
          <div>
            <span className="text-accent font-medium">{ui.hero.statBrands}</span>
          </div>
        </div>

        <button
          onClick={onExplore}
          className="flex items-center space-x-1.5 text-[#86868b] hover:text-[#f5f5f7] transition-colors self-start sm:self-auto cursor-pointer"
        >
          <span>{ui.hero.scroll}</span>
          <ArrowDown size={13} className="animate-bounce" />
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
