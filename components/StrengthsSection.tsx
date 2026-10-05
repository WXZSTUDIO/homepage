import React, { useEffect, useRef } from 'react';
import { useLanguage } from '../LanguageContext';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import DepthLayer from './DepthLayer';

gsap.registerPlugin(ScrollTrigger);

const StrengthsSection: React.FC = () => {
  const { ui, language } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.strengths-title-line',
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
        '.strengths-card',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: 'power3.out',
          stagger: 0.15,
          scrollTrigger: { trigger: '.strengths-grid-trigger', start: 'top 80%' }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [language]);

  const gearItems = [
    { name: 'Sony FX3 / A7S III', role: 'Full-Frame 4K 120p Cinema Line' },
    { name: 'DaVinci Resolve Studio', role: 'HDR Color Science & Grading Deck' },
    { name: 'Aputure & Nanlite Rig', role: 'Studio High-Output Lighting Array' },
    { name: 'DJI Ronin RS3 Pro', role: 'Cinema 3-Axis Stabilization' },
    { name: 'Atomos Ninja V+', role: 'ProRes RAW 10-Bit External Recording' },
    { name: 'Sennheiser & Rode', role: 'Professional Wireless Audio Suite' },
  ];

  const tools = [
    'ComfyUI', 'Midjourney v6', 'Runway Gen-3', 'DaVinci Resolve',
    'Premiere Pro', 'After Effects', 'Photoshop', 'Illustrator',
    'Figma', 'Blender 3D', 'Stable Diffusion', 'Lightroom Classic'
  ];

  const Chapter: React.FC<{
    index: string;
    image: string;
    alt: string;
    kicker: string;
    title: string;
    body: string;
    depth?: number;
  }> = ({ index, image, alt, kicker, title, body, depth = 0.4 }) => (
    <div className="strengths-card flex flex-col group">
      <div className="flex items-baseline justify-between gap-4 border-b border-rule pb-2 mb-4">
        <span className="font-mono text-[11px] tracking-[0.2em] text-accent">{index}</span>
        <span className="eyebrow">{kicker}</span>
      </div>
      <div className="frame aspect-[16/10] w-full">
        <DepthLayer
          depth={depth}
          travel={55}
          className="absolute inset-x-0 -top-[10%] -bottom-[10%]"
        >
          <img
            src={image}
            alt={alt}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-[900ms] ease-editorial group-hover:scale-[1.04]"
          />
        </DepthLayer>
        <span className="pointer-events-none absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-accent transition-transform duration-700 ease-editorial group-hover:scale-x-100" />
      </div>
      <h3 className="font-display text-2xl sm:text-3xl text-paper leading-tight mt-5">
        {title}
      </h3>
      <p className="text-sm text-muted mt-3 leading-relaxed max-w-md">{body}</p>
    </div>
  );

  return (
    <section
      ref={sectionRef}
      id="strengths"
      className="relative py-24 md:py-36 bg-ink border-t border-rule"
    >
      <div className="max-w-1700 mx-auto px-6 md:px-12">
        {/* Section head */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14 pb-6 border-b border-rule">
          <div>
            <div className="eyebrow mb-3">{ui.strengths.tag}</div>
            <div className="overflow-hidden py-1">
              <h2 className="strengths-title-line font-display text-[clamp(2.2rem,5.4vw,4.5rem)] leading-[0.98] text-paper block will-change-transform">
                {ui.strengths.title}
              </h2>
            </div>
          </div>
          <p className="text-sm md:text-base text-muted max-w-md leading-relaxed md:text-right">
            {ui.strengths.subtitle}
          </p>
        </div>

        {/* Two chapters, deliberately off-register */}
        <div className="strengths-grid-trigger grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-10 mb-24">
          <Chapter
            index="01"
            image="images/shinsegae-luxury-visual.jpg"
            alt="Commercial Cinema Direction"
            kicker="IN-HOUSE PRODUCTION"
            title={ui.strengths.gearTitle}
            body={ui.strengths.gearSubtitle}
          />
          <div className="md:mt-24">
            <Chapter
            index="02"
            image="images/ai-generative-sculpture.jpg"
            alt="AI Generative Design"
            kicker="AI SYNTHESIS & PIPELINE"
            title={ui.strengths.skillTitle}
            body={ui.strengths.skillSubtitle}
            depth={0.68}
          />
          </div>
        </div>

        {/* Specs columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 border-t border-rule pt-12">
          <div className="lg:col-span-7">
            <div className="eyebrow mb-5">Hardware Arsenal (Owned)</div>
            <div className="border-t border-rule-soft">
              {gearItems.map((item, idx) => (
                <div
                  key={idx}
                  className="py-3.5 flex items-baseline justify-between gap-6 border-b border-rule-soft"
                >
                  <span className="font-display text-lg text-paper leading-none">
                    {item.name}
                  </span>
                  <span className="eyebrow text-right">{item.role}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="eyebrow mb-5">Technical &amp; Creative Stack</div>
            <div className="flex flex-wrap gap-2">
              {tools.map((tool) => (
                <span
                  key={tool}
                  className="border border-rule px-2.5 py-1 font-mono text-[10px] tracking-[0.1em] text-paper-70 hover:border-paper hover:text-paper transition-colors duration-300"
                >
                  {tool}
                </span>
              ))}
            </div>

            <div className="mt-8 border-t border-rule pt-4 flex items-baseline justify-between">
              <span className="eyebrow">Status</span>
              <span className="font-display text-xl text-accent">
                {ui.strengths.gearReady}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StrengthsSection;
