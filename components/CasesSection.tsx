import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useLanguage } from '../LanguageContext';
import { CASES, CaseItem } from '../cases';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Close, Heart } from './Icons';
import { useScrollLock } from '../hooks/useScrollLock';

gsap.registerPlugin(ScrollTrigger);

/* Featured cases split into two archives:
   graphic works (native aspect, never cropped) and films
   (covered by a still frame pulled from the film itself). */

/* Tiles keep native aspect — no crop; motion lives in the lightbox. */
const CaseImage: React.FC<{ item: CaseItem }> = ({ item }) => (
  <img
    src={item.src}
    alt={item.title.zh}
    loading="lazy"
    draggable={false}
    className="w-full h-auto"
  />
);

const CasesSection: React.FC = () => {
  const { ui, language } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const [selected, setSelected] = useState<CaseItem | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.cases-title-line',
        { yPercent: 110, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 1.2,
          ease: 'expo.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
        }
      );
      gsap.fromTo(
        '.case-card',
        { y: 26, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.045,
          scrollTrigger: { trigger: '.cases-grid', start: 'top 85%' },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, [language]);

  const close = useCallback(() => setSelected(null), []);
  useScrollLock(!!selected, close);

  useEffect(() => {
    if (!selected) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [selected, close]);

  const author = 'STUDIO (WXZ)';
  const visualCases = CASES.filter((c) => c.type === 'img');
  const filmCases = CASES.filter((c) => c.type === 'video');

  const renderCard = (item: CaseItem) => (
    <button
      key={item.id}
      onClick={() => setSelected(item)}
      className="case-card group mb-3 md:mb-4 break-inside-avoid w-full text-left cursor-pointer"
      aria-label={item.title[language as 'zh' | 'ko']}
    >
      <div className="relative overflow-hidden rounded-xl bg-white/[0.03] border border-rule-soft">
        <CaseImage item={item} />
        {item.videoSrc && (
          <span className="absolute top-3 right-3 chip w-8 h-8 text-paper/80">
            <svg viewBox="0 0 24 24" width="11" height="11" fill="currentColor" aria-hidden="true">
              <path d="M9 5.8v12.4a.6.6 0 0 0 .92.5l9.3-6.2a.6.6 0 0 0 0-1l-9.3-6.2a.6.6 0 0 0-.92.5Z" />
            </svg>
          </span>
        )}
        <span className="pointer-events-none absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
      </div>

      <div className="pt-3 px-0.5">
        <div className="text-[13.5px] leading-snug text-paper-70 group-hover:text-paper transition-colors truncate">
          {item.title[language as 'zh' | 'ko']}
        </div>
        <div className="mt-1.5 flex items-center justify-between gap-3 text-[11px] text-faint">
          <span className="truncate">{author}</span>
          <span className="inline-flex items-center gap-1 shrink-0">
            <Heart size={11} strokeWidth={1.7} />
            {item.tag[language as 'zh' | 'ko']}
          </span>
        </div>
      </div>
    </button>
  );

  return (
    <section ref={sectionRef} id="projects" className="relative py-24 md:py-36">
      <div className="max-w-1700 mx-auto px-6 md:px-12">
        {/* Section head — one line of meta, one line of type */}
        <div className="mb-10 md:mb-14">
          <div className="eyebrow mb-4">{ui.projects.tag}</div>
          <div className="overflow-hidden py-1">
            <h2 className="cases-title-line section-line text-[clamp(2.2rem,5.4vw,4.5rem)] leading-[1.02]">
              {ui.projects.title}
            </h2>
          </div>
        </div>

        {/* Graphic works — native aspect, uncropped */}
        <div className="eyebrow mb-4">{ui.projects.groupVisual}</div>
        <div className="cases-grid columns-2 md:columns-3 xl:columns-4 gap-3 md:gap-4">
          {visualCases.map(renderCard)}
        </div>

        {/* Films — brand-mark stage tiles */}
        <div className="eyebrow mb-4 mt-16">{ui.projects.groupFilm}</div>
        <div className="cases-grid columns-2 md:columns-3 xl:columns-4 gap-3 md:gap-4">
          {filmCases.map(renderCard)}
        </div>
      </div>

      {/* Lightbox */}
      {selected && (
        <div
          className="fixed inset-0 z-50 overflow-y-auto overscroll-contain bg-[#050505]/92 backdrop-blur-sm"
          onClick={close}
        >
          <div className="min-h-full w-full flex items-center justify-center p-4 pb-safe sm:p-10">
            <div
              className="relative max-w-3xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={close}
                className="absolute -top-1 right-0 sm:-top-9 chip w-10 h-10 text-paper/80 hover:text-paper transition-colors cursor-pointer z-10"
                aria-label={ui.projects.close}
              >
                <Close size={16} />
              </button>
              <div className="overflow-hidden rounded-2xl border border-rule-soft bg-black">
                {selected.videoSrc ? (
                  <video
                    src={selected.videoSrc}
                    className="w-full max-h-[76vh] object-contain bg-black"
                    controls
                    autoPlay
                    playsInline
                  />
                ) : (
                  <img
                    src={selected.src}
                    alt={selected.title.zh}
                    className="w-full max-h-[76vh] object-contain bg-black"
                  />
                )}
              </div>
              <div className="pt-4 flex items-baseline justify-between gap-4">
                <span className="text-paper text-sm sm:text-base">
                  {selected.title[language as 'zh' | 'ko']}
                </span>
                <span className="eyebrow shrink-0">{author}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default CasesSection;
