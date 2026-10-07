import React, { useEffect, useRef } from 'react';
import { useLanguage } from '../LanguageContext';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Camera, Tripod, Gimbal, Mic,
  Cpu, Sparkle, Clapper,
  Aperture, Message,
} from './Icons';

gsap.registerPlugin(ScrollTrigger);

/* ------------------------------------------------------------------
   Icons: real brand marks where they exist (simple-icons, white
   monochrome), in-house glyphs elsewhere — all on one 24-grid so the
   set reads as a single family.
   ------------------------------------------------------------------ */
const Logo: React.FC<{ name?: string; size?: number }> = ({ name, size = 17 }) =>
  name ? (
    <img
      src={`logos/${name}${name.endsWith('.png') ? '' : '.svg'}`}
      alt=""
      loading="lazy"
      draggable={false}
      style={{ width: size, height: size, opacity: 0.92 }}
    />
  ) : null;

/* Adobe apps: the classic two-letter app tile, monochrome for the
   dark stage. Recognised instantly, matches the logo weight. */
const AdobeTile: React.FC<{ text: string; size?: number }> = ({ text, size = 17 }) => (
  <span
    className="inline-flex items-center justify-center rounded-[4px] font-bold text-[#050505]"
    style={{
      width: size,
      height: size,
      fontSize: size * 0.52,
      letterSpacing: '-0.02em',
      fontFamily: 'Montserrat, sans-serif',
      background: 'rgba(250, 250, 250, 0.85)',
    }}
    aria-hidden="true"
  >
    {text}
  </span>
);

/* Owned kit — four lines, nothing more: 相机 / 脚架 / 稳定器 / 麦克 */
const GEAR_ITEMS = [
  { label: { zh: '相机', ko: '카메라' }, spec: 'Sony A7M4', logo: 'sony', icon: Camera },
  { label: { zh: '脚架', ko: '삼각대' }, spec: 'Tripod', icon: Tripod },
  { label: { zh: '稳定器', ko: '짐벌' }, spec: 'DJI RS', logo: 'dji', icon: Gimbal },
  { label: { zh: '麦克', ko: '마이크' }, spec: 'Wireless Mic', icon: Mic },
];

type Tool = {
  /* name shown in ko/en; nameZh overrides in the zh interface */
  name: string;
  nameZh?: string;
  logo?: string;
  adobe?: string;
  icon?: React.ElementType;
};

const TOOLS: Tool[] = [
  { name: 'ChatGPT', logo: 'openai' },
  { name: 'Midjourney', icon: Sparkle },
  { name: 'Jimeng', nameZh: '即梦', logo: 'jimeng.png' },
  { name: 'DaVinci Resolve', logo: 'davinciresolve' },
  { name: 'Premiere Pro', adobe: 'Pr' },
  { name: 'After Effects', adobe: 'Ae' },
  { name: 'Photoshop', adobe: 'Ps' },
  { name: 'Illustrator', adobe: 'Ai' },
  { name: 'Figma', logo: 'figma' },
  { name: 'Blender', logo: 'blender' },
  { name: 'CapCut', nameZh: '剪映', logo: 'capcut.png' },
  { name: 'Stable Diffusion', icon: Cpu },
];

const PILLAR_ICONS = [Clapper, Aperture, Message, Sparkle];

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
          stagger: 0.08,
          scrollTrigger: { trigger: '.strengths-grid-trigger', start: 'top 80%' }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [language]);

  const pillars: { kicker: string; title: string; desc: string }[] =
    (ui.strengths as any).pillars || [];
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

        {/* Four pillars — the core strengths, one card each */}
        <div className="strengths-grid-trigger grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 md:gap-4 mb-12 md:mb-16">
          {pillars.map((p, idx) => {
            const Icon = PILLAR_ICONS[idx % PILLAR_ICONS.length];
            return (
              <div
                key={p.kicker}
                className="strengths-card tile tile-hover p-6 md:p-7 min-h-[12rem] md:min-h-[14rem] flex flex-col justify-between"
              >
                <div className="flex items-start justify-between">
                  <span className="chip w-10 h-10 text-paper">
                    <Icon size={17} />
                  </span>
                  <span className="eyebrow">{String(idx + 1).padStart(2, '0')}</span>
                </div>
                <div>
                  <div className="eyebrow mb-2.5">{p.kicker}</div>
                  <h3 className="text-lg sm:text-xl text-paper leading-snug font-medium">
                    {p.title}
                  </h3>
                  <p className="mt-2.5 text-[12.5px] leading-relaxed text-muted">
                    {p.desc}
                  </p>
                </div>
              </div>
            );
          })}
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
                      {item.logo ? (
                        <Logo name={item.logo} size={19} />
                      ) : (
                        <Icon size={17} />
                      )}
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
                const Fallback = tool.icon;
                return (
                <div
                  key={tool.name}
                  className="tile tile-hover h-full flex flex-col items-start justify-between gap-3 px-4 py-4"
                >
                  {tool.logo ? (
                    <Logo name={tool.logo} size={16} />
                  ) : tool.adobe ? (
                    <AdobeTile text={tool.adobe} size={17} />
                  ) : (
                    Fallback && <Fallback size={15} className="text-paper-70" />
                  )}
                  <span className="text-[11px] tracking-[0.04em] text-paper-70 leading-tight">
                    {language === 'zh' && tool.nameZh ? tool.nameZh : tool.name}
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
