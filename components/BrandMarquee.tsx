import React from 'react';
import { useLanguage } from '../LanguageContext';

/* Brand wall. Four official logo files (Shinsegae, Amorepacific, Samyang,
   IOPE — SVG/PNG pulled from public sources) sit alongside typographic
   wordmarks drawn after each brand's real lettering (the smaller brands have
   no freely licensed logo files). Everything renders semi-transparent and
   greyscale; hover restores the mark's true colour. */

type BrandItem =
  | { kind: 'img'; src: string; alt: string; h: string }
  | { kind: 'mark'; node: React.ReactNode };

const MARK = 'text-paper/40 hover:text-paper transition-colors duration-300';

const BRANDS: BrandItem[] = [
  {
    kind: 'img',
    src: 'brands/shinsegae.svg',
    alt: 'Shinsegae',
    h: 'h-5 md:h-6',
  },
  {
    kind: 'mark',
    node: (
      <span className={`font-display italic text-xl md:text-2xl tracking-[0.08em] leading-none ${MARK}`}>
        HERA
      </span>
    ),
  },
  {
    kind: 'img',
    src: 'brands/amorepacific.svg',
    alt: 'AMOREPACIFIC',
    h: 'h-3.5 md:h-4',
  },
  {
    kind: 'mark',
    node: (
      <span className={`font-sans font-light text-sm md:text-base tracking-[0.34em] leading-none ${MARK}`}>
        VITAL BEAUTIE
      </span>
    ),
  },
  {
    kind: 'img',
    src: 'brands/iope.png',
    alt: 'IOPE',
    h: 'h-5 md:h-6',
  },
  {
    kind: 'img',
    src: 'brands/samyang.svg',
    alt: 'Samyang Foods',
    h: 'h-6 md:h-7',
  },
  {
    kind: 'mark',
    node: (
      <span className={`font-sans font-semibold text-lg md:text-xl leading-none ${MARK}`}>
        王府井
        <span className="ml-2 hidden sm:inline font-mono font-normal text-[9px] tracking-[0.3em] align-middle opacity-70">
          WANGFUJING
        </span>
      </span>
    ),
  },
  {
    kind: 'mark',
    node: (
      <span className={`font-sans font-medium leading-none ${MARK} inline-flex flex-col items-start gap-1`}>
        <span className="text-lg md:text-xl tracking-[0.02em]">丽贝亚</span>
        <span className="font-mono text-[8px] tracking-[0.42em] opacity-70">BEIJING LIBEYA</span>
      </span>
    ),
  },
  {
    kind: 'mark',
    node: (
      <span className={`font-display text-xl md:text-2xl lowercase tracking-[0.24em] leading-none ${MARK}`}>
        eke
      </span>
    ),
  },
  {
    kind: 'mark',
    node: (
      <span className={`font-sans font-bold text-lg md:text-xl tracking-[0.12em] leading-none ${MARK}`}>
        QOOOK
      </span>
    ),
  },
  {
    kind: 'mark',
    node: (
      <span className={`font-sans font-extrabold text-base md:text-lg italic tracking-[0.04em] leading-none ${MARK}`}>
        HIGH <span className="font-light">&amp;</span> GOGO
      </span>
    ),
  },
  {
    kind: 'mark',
    node: (
      <span className={`font-sans leading-none ${MARK} inline-flex items-baseline gap-1.5`}>
        <span className="font-bold text-base md:text-lg tracking-[0.06em]">HARBIN</span>
        <span className="font-light text-sm md:text-base tracking-[0.22em]">METRO MEDIA</span>
      </span>
    ),
  },
];

const BrandMarquee: React.FC = () => {
  const { language } = useLanguage();

  const label =
    language === 'zh' ? '服务品牌' : language === 'ko' ? '클라이언트' : 'Brands served';

  // Track content duplicated once; the keyframe translates exactly -50%,
  // so the loop seam is invisible.
  const strip = [...BRANDS, ...BRANDS];

  return (
    <section
      aria-label={label}
      className="relative bg-ink py-12 md:py-16 overflow-hidden select-none"
    >
      <div className="max-w-1700 mx-auto px-6 md:px-12 mb-8 md:mb-10 flex items-center justify-between">
        <span className="eyebrow flex items-center gap-3">
          <span className="w-1.5 h-1.5 rounded-full bg-paper inline-block" aria-hidden="true" />
          {label}
        </span>
        <span className="w-px h-4 bg-rule hidden sm:block" />
        <span className="eyebrow hidden sm:block">2013 — 2026</span>
      </div>

      <div className="relative">
        {/* Edge fades keep the strip from ending abruptly */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 md:w-32 z-10 bg-gradient-to-r from-ink to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 md:w-32 z-10 bg-gradient-to-l from-ink to-transparent" />

        <div className="marquee-track flex w-max items-center gap-14 md:gap-20 px-6 md:px-12">
          {strip.map((brand, i) => (
            <React.Fragment key={`brand-${i}`}>
              {brand.kind === 'img' ? (
                <img
                  src={brand.src}
                  alt={brand.alt}
                  loading="lazy"
                  draggable={false}
                  className={`${brand.h} w-auto object-contain grayscale opacity-40 hover:opacity-100 hover:grayscale-0 transition-all duration-300`}
                />
              ) : (
                <span className="whitespace-nowrap">{brand.node}</span>
              )}
              <span className="shrink-0 w-1 h-1 rounded-full bg-rule" aria-hidden="true" />
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandMarquee;
