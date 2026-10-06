import React, { useEffect, useRef } from 'react';
import { useLanguage } from '../LanguageContext';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Aperture, Palette, Sun, Orbit, MonitorPlay, Mic,
  Cpu, Sparkles, Clapperboard, Scissors, Wand2, Image as ImageIcon,
  PenTool, Figma, Boxes, Camera, Radio, Boxes as Pipeline,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

/* Specs as icon plates. Keyword only — no prose. */
const GEAR_ITEMS = [
  { icon: Aperture, name: 'Sony FX3 / A7S III', spec: '4K 120p', color: '#4F7CFF' },
  { icon: Palette, name: 'DaVinci Resolve', spec: 'HDR', color: '#8B5CF6' },
  { icon: Sun, name: 'Aputure & Nanlite', spec: 'Lighting', color: '#FF7A2F' },
  { icon: Orbit, name: 'DJI Ronin RS3 Pro', spec: 'Gimbal', color: '#22D3EE' },
  { icon: MonitorPlay, name: 'Atomos Ninja V+', spec: 'ProRes RAW', color: '#FF5FA2' },
  { icon: Mic, name: 'Sennheiser & Rode', spec: 'Audio', color: '#55D98C' },
];

const TOOLS = [
  { icon: Cpu, name: 'ComfyUI', color: '#8B5CF6' },
  { icon: Sparkles, name: 'Midjourney', color: '#FF5FA2' },
  { icon: Clapperboard, name: 'Runway', color: '#FF7A2F' },
  { icon: Palette, name: 'DaVinci', color: '#4F7CFF' },
  { icon: Scissors, name: 'Premiere', color: '#22D3EE' },
  { icon: Wand2, name: 'After Effects', color: '#8B5CF6' },
  { icon: ImageIcon, name: 'Photoshop', color: '#4F7CFF' },
  { icon: PenTool, name: 'Illustrator', color: '#FF7A2F' },
  { icon: Figma, name: 'Figma', color: '#FF5FA2' },
  { icon: Boxes, name: 'Blender', color: '#FF7A2F' },
  { icon: Camera, name: 'Lightroom', color: '#55D98C' },
  { icon: Pipeline, name: 'Stable Diffusion', color: '#22D3EE' },
];

const StrengthsSection: React.FC = () => {
  const { ui, language } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.strengths-title-line',
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
        '.strengths-card',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: 'power3.out',
          stagger: 0.1,
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
    icon: React.ElementType;
    color: string;
  }> = ({ index, kicker, title, icon: Icon, color }) => (
    <div className="strengths-card glass rounded-glass p-7 md:p-9 min-h-[15rem] md:min-h-[18rem] flex flex-col justify-between">
      <div className="relative z-10 flex items-start justify-between">
        <span
          className="w-11 h-11 rounded-full flex items-center justify-center"
          style={{ background: `${color}40` }}
        >
          <Icon size={18} strokeWidth={1.7} className="text-paper" aria-hidden="true" />
        </span>
        <span className="eyebrow">{index}</span>
      </div>
      <div>
        <div className="relative z-10 eyebrow mb-3">{kicker}</div>
        <h3 className="relative z-10 font-display text-2xl sm:text-3xl text-paper leading-tight max-w-sm">
          {title}
        </h3>
      </div>
    </div>
  );

  return (
    <section
      ref={sectionRef}
      id="strengths"
      className="relative py-24 md:py-36"
    >
      <div className="max-w-1700 mx-auto px-6 md:px-12">
        {/* Section head */}
        <div className="mb-12">
          <div className="eyebrow mb-4">{ui.strengths.tag}</div>
          <div className="overflow-hidden py-1">
            <h2 className="strengths-title-line text-[clamp(2.2rem,5.4vw,4.5rem)] leading-[1.02] block will-change-transform">
              {ui.strengths.title}
            </h2>
          </div>
        </div>

        {/* Two chapters */}
        <div className="strengths-grid-trigger grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 mb-4">
          <Chapter
            index="01"
            kicker="IN-HOUSE PRODUCTION"
            title={ui.strengths.gearTitle}
            icon={Radio}
            color="#4F7CFF"
          />
          <Chapter
            index="02"
            kicker="AI PIPELINE"
            title={ui.strengths.skillTitle}
            icon={Sparkles}
            color="#FF5FA2"
          />
        </div>

        {/* Specs — icon plates */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6">
          <div className="lg:col-span-7">
            <div className="eyebrow mb-4">Hardware</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {GEAR_ITEMS.map((item) => (
                <div
                  key={item.name}
                  className="glass-tile rounded-tile flex items-center gap-4 px-4 py-4"
                >
                  <span
                    className="shrink-0 w-9 h-9 rounded-full flex items-center justify-center"
                    style={{ background: `${item.color}40` }}
                  >
                    <item.icon size={15} strokeWidth={1.7} className="text-paper" />
                  </span>
                  <div className="min-w-0">
                    <div className="font-display text-base text-paper leading-none truncate">
                      {item.name}
                    </div>
                    <div className="font-mono text-[9px] uppercase tracking-[0.18em] text-faint mt-2">
                      {item.spec}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="eyebrow mb-4">Stack</div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {TOOLS.map((tool) => (
                <div
                  key={tool.name}
                  className="glass-tile rounded-tile flex flex-col items-start gap-3 px-4 py-4"
                >
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ background: tool.color }}
                    aria-hidden="true"
                  />
                  <span className="font-mono text-[10px] tracking-[0.06em] text-paper-70 leading-tight">
                    {tool.name}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-4 glass rounded-glass px-6 py-5 flex items-baseline justify-between">
              <span className="eyebrow">Status</span>
              <span className="font-display text-lg text-paper flex items-center gap-2.5">
                <span
                  className="w-2 h-2 rounded-full animate-pulse"
                  style={{ background: '#55D98C' }}
                  aria-hidden="true"
                />
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
