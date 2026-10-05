import React, { useEffect, useRef } from 'react';
import { useLanguage } from '../LanguageContext';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import DepthLayer from './DepthLayer';
import {
  Aperture, Palette, Sun, Orbit, MonitorPlay, Mic,
  Cpu, Sparkles, Clapperboard, Scissors, Wand2, Image as ImageIcon,
  PenTool, Figma, Boxes, Camera,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

/* Equipment and stack reduced to icon + name + one technical keyword.
   The long-form role descriptions repeated what the images already showed. */
const GEAR_ITEMS = [
  { icon: Aperture, name: 'Sony FX3 / A7S III', spec: '4K 120p Cinema Line' },
  { icon: Palette, name: 'DaVinci Resolve Studio', spec: 'HDR Color Science' },
  { icon: Sun, name: 'Aputure & Nanlite', spec: 'High-Output Lighting' },
  { icon: Orbit, name: 'DJI Ronin RS3 Pro', spec: '3-Axis Stabilization' },
  { icon: MonitorPlay, name: 'Atomos Ninja V+', spec: 'ProRes RAW 10-Bit' },
  { icon: Mic, name: 'Sennheiser & Rode', spec: 'Wireless Audio Suite' },
];

const TOOLS = [
  { icon: Cpu, name: 'ComfyUI' },
  { icon: Sparkles, name: 'Midjourney v6' },
  { icon: Clapperboard, name: 'Runway Gen-3' },
  { icon: Palette, name: 'DaVinci Resolve' },
  { icon: Scissors, name: 'Premiere Pro' },
  { icon: Wand2, name: 'After Effects' },
  { icon: ImageIcon, name: 'Photoshop' },
  { icon: PenTool, name: 'Illustrator' },
  { icon: Figma, name: 'Figma' },
  { icon: Boxes, name: 'Blender 3D' },
  { icon: Camera, name: 'Lightroom Classic' },
  { icon: Cpu, name: 'Stable Diffusion' },
];

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

  const gearItems = GEAR_ITEMS;
  const tools = TOOLS;

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
      <div className="flex items-baseline justify-between gap-4 pb-2 mb-4">
        <span className="font-mono text-[11px] tracking-[0.2em] text-faint">{index}</span>
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
        <span className="pointer-events-none absolute inset-0 rounded-card ring-1 ring-inset ring-transparent group-hover:ring-paper/20 transition-all duration-500" />
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
              <h2 className="strengths-title-line dot-title text-[clamp(2.2rem,5.4vw,4.5rem)] leading-[1.02] block will-change-transform">
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

        {/* Specs — icon plates, no prose */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 border-t border-rule pt-12">
          <div className="lg:col-span-7">
            <div className="eyebrow mb-5">Hardware Arsenal (Owned)</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {gearItems.map((item) => (
                <div
                  key={item.name}
                  className="group flex items-center gap-4 bg-ink rounded-2xl px-4 py-3.5 hover:bg-ink-deep/70 transition-colors duration-300"
                >
                  <item.icon
                    size={18}
                    strokeWidth={1.4}
                    className="shrink-0 text-faint group-hover:text-paper transition-colors duration-300"
                  />
                  <div className="min-w-0">
                    <div className="font-display text-base text-paper leading-none truncate">
                      {item.name}
                    </div>
                    <div className="font-mono text-[9px] uppercase tracking-[0.18em] text-faint mt-1.5">
                      {item.spec}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="eyebrow mb-5">Technical &amp; Creative Stack</div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {tools.map((tool) => (
                <div
                  key={tool.name}
                  className="group flex flex-col items-start gap-2.5 bg-ink rounded-2xl px-3.5 py-3.5 hover:bg-ink-deep/70 transition-colors duration-300"
                >
                  <tool.icon
                    size={15}
                    strokeWidth={1.4}
                    className="text-faint group-hover:text-paper transition-colors duration-300"
                  />
                  <span className="font-mono text-[10px] tracking-[0.08em] text-paper-70 leading-tight">
                    {tool.name}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-8 border-t border-rule pt-4 flex items-baseline justify-between">
              <span className="eyebrow">Status</span>
              <span className="font-display text-xl text-paper flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent inline-block" aria-hidden="true" />
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
