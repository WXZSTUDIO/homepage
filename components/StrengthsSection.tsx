import React, { useEffect, useRef } from 'react';
import { useLanguage } from '../LanguageContext';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Camera, Tripod, Gimbal, Mic,
  Cpu, Sparkle, Clapper, Palette, Scissors, Wand,
  Image, Pen, Diamond, Cube, Aperture, Layers,
} from './Icons';

gsap.registerPlugin(ScrollTrigger);

/* Owned kit — four lines, nothing more: 相机 / 脚架 / 稳定器 / 麦克 */
const GEAR_ITEMS = [
  { icon: Camera, label: { zh: '相机', ko: '카메라' }, spec: 'Sony A7M4' },
  { icon: Tripod, label: { zh: '脚架', ko: '삼각대' }, spec: 'Tripod' },
  { icon: Gimbal, label: { zh: '稳定器', ko: '짐벌' }, spec: 'Stabilizer' },
  { icon: Mic, label: { zh: '麦克', ko: '마이크' }, spec: 'Wireless Mic' },
];

const TOOLS = [
  { icon: Cpu, name: 'ComfyUI' },
  { icon: Sparkle, name: 'Midjourney' },
  { icon: Clapper, name: 'Runway' },
  { icon: Palette, name: 'DaVinci' },
  { icon: Scissors, name: 'Premiere' },
  { icon: Wand, name: 'After Effects' },
  { icon: Image, name: 'Photoshop' },
  { icon: Pen, name: 'Illustrator' },
  { icon: Diamond, name: 'Figma' },
  { icon: Cube, name: 'Blender' },
  { icon: Aperture, name: 'Lightroom' },
  { icon: Layers, name: 'Stable Diffusion' },
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
  }> = ({ index, kicker, title, icon: Icon }) => (
    <div className="strengths-card tile tile-hover p-7 md:p-9 min-h-[13rem] md:min-h-[15rem] flex flex-col justify-between">
      <div className="flex items-start justify-between">
        <span className="chip w-11 h-11 text-paper">
          <Icon size={18} />
        </span>
        <span className="eyebrow">{index}</span>
      </div>
      <div>
        <div className="eyebrow mb-3">{kicker}</div>
        <h3 className="text-2xl sm:text-3xl text-paper leading-tight max-w-sm font-medium">
          {title}
        </h3>
      </div>
    </div>
  );

  const lang = (language === 'ko' ? 'ko' : 'zh') as 'zh' | 'ko';

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
            <h2 className="strengths-title-line section-line text-[clamp(2.2rem,5.4vw,4.5rem)] leading-[1.02]">
              {ui.strengths.title}
            </h2>
          </div>
        </div>

        {/* Two chapters */}
        <div className="strengths-grid-trigger grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 mb-8">
          <Chapter
            index="01"
            kicker="IN-HOUSE PRODUCTION"
            title={ui.strengths.gearTitle}
            icon={Clapper}
          />
          <Chapter
            index="02"
            kicker="AI PIPELINE"
            title={ui.strengths.skillTitle}
            icon={Sparkle}
          />
        </div>

        {/* Kit + stack — both columns stretch to the same height */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 items-stretch">
          <div className="lg:col-span-7 flex flex-col">
            <div className="eyebrow mb-4">Hardware</div>
            <div className="grid grid-cols-2 gap-2.5 flex-1 auto-rows-fr">
              {GEAR_ITEMS.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.spec}
                    className="tile tile-hover h-full flex flex-col items-start gap-4 px-5 py-6"
                  >
                    <span className="chip w-10 h-10 text-paper">
                      <Icon size={17} />
                    </span>
                    <div className="min-w-0">
                      <div className="text-paper text-lg leading-none font-medium">
                        {item.label[lang]}
                      </div>
                      <div className="eyebrow mt-2.5 text-[10px]">
                        {item.spec}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col">
            <div className="eyebrow mb-4">Stack</div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 flex-1 auto-rows-fr">
              {TOOLS.map((tool) => {
                const Icon = tool.icon;
                return (
                  <div
                    key={tool.name}
                    className="tile tile-hover h-full flex flex-col items-start justify-between gap-3 px-4 py-4"
                  >
                    <Icon size={15} className="text-paper-70" />
                    <span className="text-[11px] tracking-[0.04em] text-paper-70 leading-tight">
                      {tool.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StrengthsSection;
