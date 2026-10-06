import React from 'react';

/* Full client wall — the below-fold companion to the hero strip.
   Grey wordmarks and logos, drifting once; hover restores colour. */

type BrandItem =
  | { kind: 'img'; src: string; alt: string; h: string }
  | { kind: 'mark'; node: React.ReactNode };

const MARK = 'text-strip hover:text-paper-70 transition-colors duration-300';

const BRANDS: BrandItem[] = [
  { kind: 'img', src: 'brands/shinsegae.svg', alt: 'Shinsegae', h: 'h-5 md:h-6' },
  {
    kind: 'mark',
    node: (
      <span className={`font-display italic text-xl md:text-2xl tracking-[0.08em] leading-none ${MARK}`}>
        HERA
      </span>
    ),
  },
  { kind: 'img', src: 'brands/amorepacific.svg', alt: 'AMOREPACIFIC', h: 'h-3.5 md:h-4' },
  {
    kind: 'mark',
    node: (
      <span className={`font-sans font-light text-sm md:text-base tracking-[0.34em] leading-none ${MARK}`}>
        VITAL BEAUTIE
      </span>
    ),
  },
  { kind: 'img', src: 'brands/iope.png', alt: 'IOPE', h: 'h-5 md:h-6' },
  { kind: 'img', src: 'brands/buldak.png', alt: 'Buldak (Samyang Foods)', h: 'h-4 md:h-5' },
  {
    kind: 'mark',
    node: (
      <span className={`font-sans font-semibold text-lg md:text-xl leading-none ${MARK}`}>
        王府井
        <span className="ml-2 hidden sm:inline font-sans font-normal text-[9px] tracking-[0.3em] align-middle opacity-70">
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
        <span className="font-sans text-[8px] tracking-[0.42em] opacity-70">BEIJING LIBEYA</span>
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
        <span className="font-bold text-base md:text-lg tracking-[0.06em]">哈尔滨地铁报</span>
        <span className="font-light text-[10px] md:text-xs tracking-[0.22em] opacity-70">HARBIN METRO</span>
      </span>
    ),
  },
];

const BrandMarquee: React.FC = () => {
  const strip = [...BRANDS, ...BRANDS];

  return (
    <section
      aria-label="Brands served"
      className="relative border-y border-rule-soft py-10 md:py-12 overflow-hidden select-none"
    >
      <div className="max-w-1700 mx-auto px-6 md:px-12 mb-7 flex items-center justify-between">
        <span className="eyebrow flex items-center gap-3">
          <span className="w-1.5 h-1.5 rounded-full bg-strip inline-block" aria-hidden="true" />
          2013 — 2026
        </span>
      </div>

      <div className="relative">
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 md:w-32 z-10 bg-gradient-to-r from-[#050505] to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 md:w-32 z-10 bg-gradient-to-l from-[#050505] to-transparent" />

        <div className="marquee-track flex w-max items-center gap-14 md:gap-20 px-6 md:px-12">
          {strip.map((brand, i) => (
            <React.Fragment key={`brand-${i}`}>
              {brand.kind === 'img' ? (
                <img
                  src={brand.src}
                  alt={brand.alt}
                  loading="lazy"
                  draggable={false}
                  className={`${brand.h} w-auto object-contain transition-all duration-300 ${
                    brand.src.includes('buldak')
                      ? 'opacity-45 hover:opacity-90'
                      : 'brightness-0 invert opacity-40 hover:opacity-90'
                  }`}
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
