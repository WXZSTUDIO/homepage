import React, { useRef, useState, useEffect } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  MotionValue,
} from 'framer-motion';
import { useLanguage } from '../LanguageContext';
import { useMotionProfile } from '../hooks/useMotionProfile';
import gsap from 'gsap';
import { ArrowDown } from 'lucide-react';

interface HeroSectionProps {
  onExplore: () => void;
  onContact: () => void;
  isIntroDone: boolean;
}

/* The film strip. Nine stills stepped through by scroll position — a
   frame-by-frame advance without shipping a video. (The old showreel was a
   51 MB remote mp4, heavier than the rest of the site combined.) */
const FRAMES = [
  'images/shinsegae-luxury-visual.jpg',
  'images/iope-campaign-visual.jpg',
  'images/tech-summit-keyvisual.jpg',
  'images/ai-generative-sculpture.jpg',
  'images/skincare-brand-identity.jpg',
  'images/summer-drinks-packaging.jpg',
  'images/fan-meet-poster-visual.jpg',
  'images/holiday-special-campaign.jpg',
  'images/designer-chanbong-portrait.jpg',
];

/* Hard cut, not cross-fade: a frame holds, then snaps to the next one.
   A soft blend reads as a slideshow; a cut reads as film. */
const HOLD = 0.42;
const EDGE = 0.5;

function frameOpacity(v: number, index: number, total: number) {
  const d = Math.abs(v * total - index);
  if (d >= EDGE) return 0;
  if (d <= HOLD) return 1;
  return (EDGE - d) / (EDGE - HOLD);
}

const Frame: React.FC<{
  src: string;
  alt: string;
  index: number;
  total: number;
  progress: MotionValue<number>;
}> = ({ src, alt, index, total, progress }) => {
  const opacity = useTransform(progress, (v: number) =>
    frameOpacity(v, index, total)
  );
  // Each frame pushes in slightly and drifts, so a held frame is never static.
  const scale = useTransform(progress, (v: number) => {
    const d = Math.max(-0.5, Math.min(0.5, v * total - index));
    return 1.06 - (d + 0.5) * 0.05;
  });
  const y = useTransform(progress, (v: number) => {
    const d = Math.max(-0.5, Math.min(0.5, v * total - index));
    return d * -18;
  });

  return (
    <motion.div
      className="absolute inset-0 depth"
      style={{ opacity, scale, y }}
      aria-hidden={index !== 0}
    >
      <img
        src={src}
        alt={alt}
        loading={index === 0 ? 'eager' : 'lazy'}
        decoding="async"
        className="w-full h-full object-cover"
      />
    </motion.div>
  );
};

const HeroSection: React.FC<HeroSectionProps> = ({
  onExplore,
  onContact,
  isIntroDone,
}) => {
  const { ui, language } = useLanguage();
  const { heavy } = useMotionProfile();
  const heroRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end end'],
  });
  const scrub = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 40,
    restDelta: 0.0005,
  });

  const [frameIndex, setFrameIndex] = useState(0);

  // Only re-render when the frame actually changes — nine times across the
  // whole hero, not once per scroll tick.
  useEffect(() => {
    const update = (v: number) => {
      const i = Math.min(
        FRAMES.length - 1,
        Math.max(0, Math.floor(v * FRAMES.length))
      );
      setFrameIndex((prev) => (prev === i ? prev : i));
    };
    update(scrub.get());
    return scrub.on('change', update);
  }, [scrub]);

  // Depth: the plate pulls back (slow, background), the type runs ahead
  // (fast, foreground). The gap between the two is what reads as depth.
  const plateScale = useTransform(scrub, [0, 1], [1.18, 1]);
  const plateY = useTransform(scrub, [0, 1], [0, 46]);
  const titleY = useTransform(scrub, [0, 1], [0, -150]);
  const titleOpacity = useTransform(scrub, [0, 0.5, 0.85], [1, 1, 0]);
  const standY = useTransform(scrub, [0, 1], [0, -78]);
  const chromeY = useTransform(scrub, [0, 1], [0, -30]);

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
        '.hero-bottom-bar',
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
        '-=0.6'
      );
    }, heroRef);

    return () => ctx.revert();
  }, [isIntroDone, language]);

  const plateStyle = heavy ? { scale: plateScale, y: plateY } : undefined;
  const titleStyle = heavy ? { y: titleY, opacity: titleOpacity } : undefined;
  const standStyle = heavy ? { y: standY } : undefined;
  const chromeStyle = heavy ? { y: chromeY } : undefined;

  return (
    <section
      ref={heroRef}
      id="hero"
      className={`relative w-full ${
        heavy ? 'h-[220svh]' : 'min-h-viewport'
      }`}
    >
      <div
        className={`w-full overflow-hidden bg-ink ${
          heavy ? 'sticky top-0 h-viewport' : 'relative min-h-viewport'
        } grain`}
      >
        {/* --- Layer 0: the plate --- */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <motion.div
            className="absolute inset-0 depth"
            style={plateStyle}
          >
            {heavy ? (
              FRAMES.map((src, i) => (
                <Frame
                  key={src}
                  src={src}
                  alt=""
                  index={i}
                  total={FRAMES.length}
                  progress={scrub}
                />
              ))
            ) : (
              <img
                src="images/shinsegae-luxury-visual.jpg"
                alt=""
                className="w-full h-full object-cover opacity-[0.16] grayscale contrast-125"
              />
            )}
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-b from-ink/90 via-ink/62 to-ink/95" />
        </div>

        {/* Right-edge spine label */}
        <div className="hidden xl:flex absolute right-5 top-1/2 -translate-y-1/2 z-20 flex-col items-center gap-4">
          <span className="w-px h-16 bg-rule" />
          <span className="spine eyebrow tracking-[0.3em]">
            SELECTED WORKS · 2013—2026
          </span>
          <span className="w-px h-16 bg-rule" />
        </div>

        <div className="relative z-10 max-w-1700 mx-auto w-full h-full px-6 md:px-12 flex flex-col justify-between pt-28 sm:pt-32 pb-8 pb-safe">
          {/* Running head */}
          <motion.div
            style={chromeStyle}
            className="hero-eyebrow flex items-center justify-between border-b border-rule pb-3 mt-2 sm:mt-6"
          >
            <span className="eyebrow text-accent">Vol. 01</span>
            <span className="eyebrow hidden sm:block">
              {ui.nav.brand} — Archive
            </span>
            <span className="eyebrow">Seoul, KR</span>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-16 items-end py-6 sm:py-10">
            {/* Cover headline — foreground layer */}
            <motion.h1
              style={titleStyle}
              className="lg:col-span-8 font-display leading-[0.94] tracking-[-0.02em] depth"
            >
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
            </motion.h1>

            {/* Standfirst + actions — mid layer */}
            <motion.div style={standStyle} className="lg:col-span-4 lg:pb-3">
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
              </div>
            </motion.div>
          </div>

          {/* Foot line of the cover */}
          <div className="hero-bottom-bar relative border-t border-rule pt-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 eyebrow">
              <span>{ui.hero.statExp}</span>
              <span className="text-faint/50">/</span>
              <span>{ui.hero.statProjects}</span>
              <span className="text-faint/50">/</span>
              <span>{ui.hero.statBrands}</span>
              {heavy && (
                <span className="ml-2 text-paper-70">
                  Frame{' '}
                  <span className="text-accent">
                    {String(frameIndex + 1).padStart(2, '0')}
                  </span>
                  <span className="text-faint">
                    {' '}
                    / {String(FRAMES.length).padStart(2, '0')}
                  </span>
                </span>
              )}
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

        {/* Film advance rail */}
        {heavy && (
          <div className="absolute bottom-0 left-0 right-0 z-20 flex">
            {FRAMES.map((src, i) => (
              <div key={src} className="relative flex-1 h-[3px] bg-rule-soft">
                <span
                  className={`absolute inset-0 origin-left transition-transform duration-200 ${
                    i <= frameIndex ? 'bg-accent scale-x-100' : 'scale-x-0'
                  }`}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default HeroSection;
