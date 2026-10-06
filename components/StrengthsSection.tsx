import React, { useEffect, useRef } from 'react';
import { useLanguage } from '../LanguageContext';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Aperture, Palette, Sun, Orbit, MonitorPlay, Mic,
  Cpu, Sparkles, Clapperboard, Scissors, Wand2, Image as ImageIcon,
  PenTool, Figma, Boxes, Camera,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

/* Equipment and stack reduced to icon + name + one technical keyword. */
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

const CHAPTER_COLORS = ['#4F7CFF', '#FF7AC3'];

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

  const Chapter: React.FC<{
    index: string;
    kicker: string;
    title: string;
    body: string;
    colorIndex: number;
  }> = ({ index, kicker, title, body, colorIndex }) => (
    <div className="strengths-card flex flex-col">
      {/* Colour block in place of photography — dithered like the reference */}
      <div
        className="dither relative overflow-hidden p-6 md:p-8 min-h-[13rem] md:min-h-[16rem] flex flex-col justify-between"
        style={{ backgroundColor: CHAPTER_COLORS[colorIndex] }}
      >
        <div className="relative z-10 flex items-start justify-between">
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-black/70">
            {index} —
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-black/70">
            {kicker}
          </span>
        </div>
        <h3 className="relative z-10 font-display text-2xl sm:text-3xl text-black leading-tight max-w-sm">
          {title}
        </h3>
      </div>
      <p className="text-sm text-muted mt-5 leading-relaxed max-w-md">{body}</p>
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
              <h2 className="strengths-title-line text-[clamp(2.2rem,5.4vw,4.5rem)] leading-[1.02] block will-change-transform">
                {ui.strengths.title}
              </h2>
            </div>
          </div>
          <p className="text-sm md:text-base text-muted max-w-md leading-relaxed md:text-right">
            {ui.strengths.subtitle}
          </p>
        </div>

        {/* Two chapters */}
        <div className="strengths-grid-trigger grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 mb-24">
          <Chapter
            index="01"
            kicker="IN-HOUSE PRODUCTION"
            title={ui.strengths.gearTitle}
            body={ui.strengths.gearSubtitle}
            colorIndex={0}
          />
          <div className="md:mt-16">
            <Chapter
              index="02"
              kicker="AI SYNTHESIS & PIPELINE"
              title={ui.strengths.skillTitle}
              body={ui.strengths.skillSubtitle}
              colorIndex={1}
            />
          </div>
        </div>

        {/* Specs — icon plates on light blocks */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 border-t border-rule pt-12">
          <div className="lg:col-span-7">
            <div className="eyebrow mb-5">Hardware Arsenal (Owned)</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {GEAR_ITEMS.map((item, i) => (
                <div
                  key={item.name}
                  className="group flex items-center gap-4 bg-ink-card px-4 py-3.5 hover:bg-ink-deep transition-colors duration-300"
                >
                  <span
                    className="shrink-0 w-8 h-8 flex items-center justify-center"
                    style={{ backgroundColor: ['#4F7CFF', '#FF5A1F', '#FF7AC3', '#55D98C'][i % 4] }}
                  >
                    <item.icon size={15} strokeWidth={1.6} className="text-black" />
                  </span>
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
              {TOOLS.map((tool, i) => (
                <div
                  key={tool.name}
                  className="group flex flex-col items-start gap-2.5 bg-ink-card px-3.5 py-3.5 hover:bg-ink-deep transition-colors duration-300"
                >
                  <span
                    className="w-2 h-2"
                    style={{ backgroundColor: ['#4F7CFF', '#FF5A1F', '#FF7AC3', '#55D98C'][i % 4] }}
                    aria-hidden="true"
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
                <span className="w-1.5 h-1.5 rounded-full bg-c-green inline-block" aria-hidden="true" />
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
