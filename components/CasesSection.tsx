import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useLanguage } from '../LanguageContext';
import { useSiteContent } from '../ContentContext';
import { projectToCaseItem } from '../data/adapt';
import { getProjectBySlug } from '../data/content';
import type { CaseItem } from '../cases';
import type { Project } from '../data/types';
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

/* One film card. The <video> only mounts when the card approaches the
   viewport (60% rootMargin), so a first visit never loads all films.
   While mounted it plays muted ~4.5s segments from random offsets. */

/* Watch a wrapper; report when it approaches the viewport. */
const useNearViewport = (rootMargin: string) => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [near, setNear] = useState(false);
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const ob = new IntersectionObserver(([e]) => setNear(e.isIntersecting), {
      rootMargin,
    });
    ob.observe(el);
    return () => ob.disconnect();
  }, [rootMargin]);
  return { wrapRef, near };
};

/* Live-preview engine — while `active`, plays muted ~4.5s segments
   from random offsets. Shared by every autoplaying film surface. */
const useLiveSegments = (
  videoRef: React.RefObject<HTMLVideoElement | null>,
  active: boolean
) => {
  const segRef = useRef(0);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const v = videoRef.current;
    if (!v || !active) return;
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
  }, [videoRef, active]);

  return { playing, segRef };
};

/* Pinned TVC media — autoplays muted (gated on viewport proximity),
   click opens the film large in the lightbox. */
const TvcMedia: React.FC<{
  item: CaseItem;
  paused: boolean;
  onOpen: (item: CaseItem) => void;
}> = ({ item, paused, onOpen }) => {
  const { wrapRef, near } = useNearViewport('40% 0px');
  const videoRef = useRef<HTMLVideoElement>(null);
  const { playing } = useLiveSegments(videoRef, near && !paused);

  return (
    <div
      ref={wrapRef}
      className="relative aspect-video overflow-hidden rounded-xl border border-rule-soft bg-black"
    >
      <button
        onClick={() => onOpen(item)}
        className="group absolute inset-0 block w-full cursor-pointer"
        aria-label={item.title.zh}
      >
        <img
          src={item.src}
          alt={item.title.zh}
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
        <span className="pointer-events-none absolute inset-0 bg-black/20 group-hover:bg-black/5 transition-colors duration-300" />
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
      </button>
    </div>
  );
};

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
  const { wrapRef, near } = useNearViewport('60% 0px');
  const videoRef = useRef<HTMLVideoElement>(null);
  const { playing } = useLiveSegments(videoRef, near && !paused);

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
          {item.videoSrc && (
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
          )}
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
        className="film-track flex gap-4 overflow-x-auto snap-x snap-mandatory pb-2"
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

/* Detail blocks — the ordered media modules edited in the CMS.
   Falls back to the cover so a project without blocks still renders. */
const DetailBlocks: React.FC<{ project?: Project; lang: 'zh' | 'ko' }> = ({ project, lang }) => {
  const blocks = project?.media?.length
    ? project.media
    : project
    ? [
        project.coverType === 'video'
          ? ({ _key: 'cover', type: 'video', video: project.coverVideo } as const)
          : ({ _key: 'cover', type: 'image', image: project.coverImage } as const),
      ]
    : [];

  return (
    <div className="space-y-6">
      {blocks.map((b: any) => {
        if (b.type === 'image' && b.image?.url) {
          return (
            <img
              key={b._key}
              src={b.image.url}
              alt={b.image.alt || ''}
              className="w-full h-auto rounded-xl bg-black"
              loading="lazy"
            />
          );
        }
        if (b.type === 'gallery' && b.items?.length) {
          return (
            <div key={b._key} className="grid grid-cols-2 gap-3">
              {b.items.map((im: any, i: number) => (
                <img
                  key={`${b._key}-${i}`}
                  src={im.url}
                  alt={im.alt || ''}
                  className="w-full h-auto rounded-lg bg-black"
                  loading="lazy"
                />
              ))}
            </div>
          );
        }
        if (b.type === 'video' && b.video?.url) {
          return (
            <video
              key={b._key}
              src={b.video.url}
              poster={b.video.poster}
              controls
              playsInline
              muted={b.video.muted !== false}
              loop={!!b.video.loop}
              className="w-full h-auto rounded-xl bg-black"
            />
          );
        }
        if (b.type === 'richText') {
          const title = b.title?.[lang] ?? '';
          const body = b.body?.[lang] ?? '';
          const bullets = (b.bullets || []).map((x: any) => x?.[lang]).filter(Boolean);
          if (!title && !body && !bullets.length) return null;
          return (
            <div key={b._key} className="space-y-3">
              {title && <h4 className="text-paper text-lg font-medium">{title}</h4>}
              {body && <p className="text-paper-70 text-sm leading-relaxed whitespace-pre-line">{body}</p>}
              {bullets.length > 0 && (
                <ul className="space-y-1.5">
                  {bullets.map((x: string, i: number) => (
                    <li key={i} className="text-paper-70 text-sm flex gap-2">
                      <span className="text-faint">—</span>
                      <span>{x}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          );
        }
        return null;
      })}
    </div>
  );
};

/* Deep link: #/works/<slug> — refresh-safe on a static host. */
const readSlugFromHash = (): string | null => {
  const m = /#\/works\/([\w-]+)/.exec(window.location.hash || '');
  return m ? decodeURIComponent(m[1]) : null;
};

const CasesSection: React.FC = () => {
  const { ui, language } = useLanguage();
  const { projects, t } = useSiteContent();
  const lang = language as 'zh' | 'ko';
  const sectionRef = useRef<HTMLElement>(null);

  const items = React.useMemo(
    () => projects.map((p) => ({ project: p, item: projectToCaseItem(p, lang) })),
    [projects, lang]
  );

  const [slug, setSlug] = useState<string | null>(() => readSlugFromHash());
  const [deepProject, setDeepProject] = useState<Project | null>(null);

  const selected = React.useMemo(() => {
    const local = items.find((x) => x.item.id === slug);
    if (local) return local;
    if (deepProject && (deepProject.slug || deepProject.id) === slug) {
      return { project: deepProject, item: projectToCaseItem(deepProject, lang) };
    }
    return null;
  }, [items, slug, deepProject, lang]);

  const selectedItem = selected?.item ?? null;

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

  /* Keep the URL in sync so a refresh / shared link re-opens the piece. */
  const open = useCallback((item: CaseItem) => {
    setSlug(item.id);
    try {
      history.pushState(null, '', `#/works/${encodeURIComponent(item.id)}`);
    } catch {
      /* history unavailable — the modal still works */
    }
  }, []);

  const close = useCallback(() => {
    setSlug(null);
    setDeepProject(null);
    try {
      history.pushState(null, '', '#works');
    } catch {
      /* noop */
    }
  }, []);

  useScrollLock(!!selectedItem, close);

  useEffect(() => {
    if (!selectedItem) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [selectedItem, close]);

  /* Back/forward + pasted deep links. */
  useEffect(() => {
    const sync = () => setSlug(readSlugFromHash());
    window.addEventListener('hashchange', sync);
    return () => window.removeEventListener('hashchange', sync);
  }, []);

  /* A deep-linked slug may not be in the loaded list yet — ask directly. */
  useEffect(() => {
    if (!slug) return;
    if (items.some((x) => x.item.id === slug)) return;
    let alive = true;
    (async () => {
      const p = await getProjectBySlug(slug);
      if (!alive) return;
      setDeepProject(p);
    })();
    return () => {
      alive = false;
    };
  }, [slug, items]);

  const visualCases = items.filter((x) => x.project.group === 'visual').map((x) => x.item);
  const starCases = items.filter((x) => x.project.group === 'star').map((x) => x.item);
  const filmCases = items.filter((x) => x.project.group === 'film').map((x) => x.item);
  const tvcEntry = items.find((x) => x.project.group === 'tvc');

  const renderCard = (item: CaseItem) => (
    <button
      key={item.id}
      onClick={() => open(item)}
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

        {/* TVC — pinned featured brand film */}
        {tvcEntry && (
          <>
            <div className="eyebrow mb-4 mt-16">{ui.projects.groupTvc}</div>
            <div className="tvc-feature">
              <TvcMedia item={tvcEntry.item} paused={!!selectedItem} onOpen={open} />
              <div className="eyebrow text-[10px] text-faint mt-7">{ui.projects.tvcRole}</div>
              <h3 className="tvc-title">
                {tvcEntry.item.brand?.[language as 'zh' | 'ko'] ||
                  tvcEntry.item.title[language as 'zh' | 'ko']}
              </h3>
              <p className="tvc-intro">
                {t(tvcEntry.project.description) || ui.projects.tvcIntro}
              </p>
            </div>
          </>
        )}

        {/* Celebrity side films — same live-preview carousel */}
        {starCases.length > 0 && (
          <>
            <div className="eyebrow mb-4 mt-16">{ui.projects.groupStar}</div>
            <FilmCarousel items={starCases} lang={lang} paused={!!selectedItem} onOpen={open} />
          </>
        )}

        {/* Films — Apple-style carousel with live previews */}
        <div className="eyebrow mb-4 mt-16">{ui.projects.groupFilm}</div>
        <FilmCarousel items={filmCases} lang={lang} paused={!!selectedItem} onOpen={open} />
      </div>

      {/* Lightbox */}
      {selectedItem && (
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
                {selectedItem.videoSrc ? (
                  <video
                    src={selectedItem.videoSrc}
                    poster={selectedItem.src}
                    className="w-full max-h-[76vh] object-contain bg-black"
                    controls
                    autoPlay
                    playsInline
                  />
                ) : (
                  <img
                    src={selectedItem.src}
                    alt={selectedItem.title.zh}
                    className="w-full max-h-[76vh] object-contain bg-black"
                  />
                )}
              </div>

              {/* Ordered media blocks from the CMS */}
              <div className="pt-6">
                <DetailBlocks project={selected?.project} lang={lang} />
              </div>

              <div className="pt-6">
                <span className="text-paper text-sm sm:text-base">
                  {selectedItem.title[language as 'zh' | 'ko']}
                </span>
                {selected?.project?.year && (
                  <span className="ml-3 text-xs text-faint">{selected.project.year}</span>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default CasesSection;
