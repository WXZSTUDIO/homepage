import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useLanguage } from '../LanguageContext';
import { CASES, CaseItem } from '../cases';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Close, Heart, Bookmark, ChevronLeft, ChevronRight } from './Icons';
import { useScrollLock } from '../hooks/useScrollLock';

gsap.registerPlugin(ScrollTrigger);

/* Featured cases split into two archives:
   graphic works (native aspect, never cropped) and films — an
   Apple-style carousel that autoplays short muted segments from
   random points of each film while the card is near the viewport. */

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

/* ------------------------------------------------------------------ */
/* Film carousel                                                       */
/* ------------------------------------------------------------------ */

/* Length of each muted preview segment, seconds. */
const SEGMENT_LEN = 4.5;

const compact = (n: number, lang: 'zh' | 'ko'): string => {
  if (n >= 10000) {
    const v = (n / 10000).toFixed(1).replace(/\.0$/, '');
    return `${v}${lang === 'ko' ? '만' : '万'}`;
  }
  return n.toLocaleString();
};

/* One film card. The <video> only mounts when the card approaches the
   viewport (60% rootMargin), so a first visit never loads all films.
   While mounted it plays muted ~4.5s segments from random offsets. */
const FilmPreview: React.FC<{
  item: CaseItem;
  lang: 'zh' | 'ko';
  paused: boolean;
  onOpen: (item: CaseItem) => void;
}> = ({ item, lang, paused, onOpen }) => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const segRef = useRef(0);
  const [near, setNear] = useState(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const ob = new IntersectionObserver(([e]) => setNear(e.isIntersecting), {
      rootMargin: '60% 0px',
    });
    ob.observe(el);
    return () => ob.disconnect();
  }, []);

  useEffect(() => {
    const v = videoRef.current;
    if (!v || !near || paused) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const pick = () => {
      const d = v.duration;
      if (!isFinite(d) || d <= 0) return;
      segRef.current = Math.random() * Math.max(0.1, d - SEGMENT_LEN - 0.3);
      try {
        v.currentTime = segRef.current;
      } catch {
        /* seeking before data — ignored */
      }
    };
    const start = () => {
      pick();
      v.play()
        .then(() => setPlaying(true))
        .catch(() => setPlaying(false));
    };
    const onTime = () => {
      if (v.currentTime - segRef.current > SEGMENT_LEN) pick();
    };

    v.addEventListener('loadedmetadata', start);
    v.addEventListener('timeupdate', onTime);
    if (v.readyState >= 1) start();

    return () => {
      v.removeEventListener('loadedmetadata', start);
      v.removeEventListener('timeupdate', onTime);
      v.pause();
      setPlaying(false);
    };
  }, [near, paused]);

  return (
    <div
      ref={wrapRef}
      className="film-card w-[82vw] sm:w-[540px] lg:w-[640px] shrink-0 snap-start"
    >
      <button
        onClick={() => onOpen(item)}
        className="group block w-full text-left cursor-pointer"
        aria-label={item.title[lang]}
      >
        <div className="relative aspect-video overflow-hidden rounded-xl border border-rule-soft bg-black">
          <img
            src={item.src}
            alt={item.title[lang]}
            loading="lazy"
            draggable={false}
            className="absolute inset-0 w-full h-full object-cover"
          />
          {near && item.videoSrc && (
            <video
              ref={videoRef}
              src={item.videoSrc}
              poster={item.src}
              muted
              loop
              playsInline
              preload="metadata"
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
                playing ? 'opacity-100' : 'opacity-0'
              }`}
            />
          )}
          <span className="pointer-events-none absolute inset-0 bg-black/25 group-hover:bg-black/10 transition-colors duration-300" />
          <span className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <span className="w-12 h-12 rounded-full bg-black/45 border border-white/25 backdrop-blur-sm flex items-center justify-center text-paper/90 opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-all duration-300 group-hover:scale-105">
              <svg
                viewBox="0 0 24 24"
                width="14"
                height="14"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M9 5.8v12.4a.6.6 0 0 0 .92.5l9.3-6.2a.6.6 0 0 0 0-1l-9.3-6.2a.6.6 0 0 0-.92.5Z" />
              </svg>
            </span>
          </span>
        </div>

        {/* Meta — brand left, engagement right */}
        <div className="mt-3.5 flex items-center justify-between gap-4 px-0.5">
          <span className="text-sm text-paper-70 group-hover:text-paper transition-colors truncate">
            {item.brand ? item.brand[lang] : item.title[lang]}
          </span>
          {item.stats && (
            <span className="flex items-center gap-4 text-[12px] text-faint shrink-0 tabular-nums">
              <span className="inline-flex items-center gap-1.5">
                <Heart size={12} strokeWidth={1.7} className="text-[#ffd500]" />
                {compact(item.stats.likes, lang)}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Bookmark size={12} strokeWidth={1.7} />
                {compact(item.stats.saves, lang)}
              </span>
            </span>
          )}
        </div>
      </button>
    </div>
  );
};

const FilmCarousel: React.FC<{
  items: CaseItem[];
  lang: 'zh' | 'ko';
  paused: boolean;
  onOpen: (item: CaseItem) => void;
}> = ({ items, lang, paused, onOpen }) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canL, setCanL] = useState(false);
  const [canR, setCanR] = useState(true);

  const update = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setCanL(el.scrollLeft > 8);
    setCanR(el.scrollLeft < el.scrollWidth - el.clientWidth - 8);
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    update();
    el.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      el.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [update]);

  const nudge = (dir: number) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>('.film-card');
    const step = card ? card.offsetWidth + 16 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * step, behavior: 'smooth' });
  };

  return (
    <div>
      <div
        ref={trackRef}
        className="film-track -mx-6 px-6 md:-mx-12 md:px-12 flex gap-4 overflow-x-auto snap-x snap-mandatory pb-2"
      >
        {items.map((it) => (
          <FilmPreview key={it.id} item={it} lang={lang} paused={paused} onOpen={onOpen} />
        ))}
      </div>

      <div className="mt-5 flex justify-end gap-2.5">
        <button
          onClick={() => nudge(-1)}
          disabled={!canL}
          className="carousel-arrow"
          aria-label="Previous films"
        >
          <ChevronLeft size={16} />
        </button>
        <button
          onClick={() => nudge(1)}
          disabled={!canR}
          className="carousel-arrow"
          aria-label="Next films"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};

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
        <span className="pointer-events-none absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
      </div>

      <div className="pt-3 px-0.5 flex items-center justify-between gap-3">
        <div className="text-[13.5px] leading-snug text-paper-70 group-hover:text-paper transition-colors truncate">
          {item.title[language as 'zh' | 'ko']}
        </div>
        <span className="inline-flex items-center gap-1 shrink-0 text-[11px] text-faint">
          <Heart size={11} strokeWidth={1.7} />
          {item.tag[language as 'zh' | 'ko']}
        </span>
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

        {/* Films — Apple-style carousel with live previews */}
        <div className="eyebrow mb-4 mt-16">{ui.projects.groupFilm}</div>
        <FilmCarousel
          items={filmCases}
          lang={language as 'zh' | 'ko'}
          paused={!!selected}
          onOpen={setSelected}
        />
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
              <div className="pt-4">
                <span className="text-paper text-sm sm:text-base">
                  {selected.title[language as 'zh' | 'ko']}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default CasesSection;
