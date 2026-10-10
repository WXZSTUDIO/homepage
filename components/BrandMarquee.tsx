import React, { useEffect, useState } from 'react';
import { useLanguage } from '../LanguageContext';
import { useResume } from '../ContentContext';

/* Full client wall — the below-fold companion to the hero strip.
   Real marks, extracted to white alpha; drifting once.
   Below the wall, a quiet line keeps Seoul time. */

type BrandItem =
  | { kind: 'img'; src: string; alt: string; h: string; white?: boolean }
  | { kind: 'mark'; node: React.ReactNode };

const MARK = 'text-strip hover:text-paper-70 transition-colors duration-300';

const BRANDS: BrandItem[] = [
  { kind: 'img', src: 'brands/shinsegae.svg', alt: 'Shinsegae', h: 'h-5 md:h-6' },
  { kind: 'img', src: 'brands/hera.png', alt: 'HERA', h: 'h-3.5 md:h-4', white: true },
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
  { kind: 'img', src: 'brands/buldak-white.png', alt: 'Buldak (Samyang Foods)', h: 'h-4 md:h-5', white: true },
  { kind: 'img', src: 'brands/highgogo.png', alt: 'high & gogo', h: 'h-8 md:h-10', white: true },
  { kind: 'img', src: 'brands/hy.png', alt: 'HY', h: 'h-8 md:h-10', white: true },
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
  { kind: 'img', src: 'brands/libeya.png', alt: 'LIBEYA GROUP', h: 'h-3 md:h-3.5', white: true },
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
  { kind: 'img', src: 'brands/harbin-metro.png', alt: 'Harbin Metro', h: 'h-8 md:h-10', white: true },
];

/* Seoul clock — HH:mm, KST, quiet tick. */
const SeoulClock: React.FC<{ label: string }> = ({ label }) => {
  const fmt = React.useMemo(
    () =>
      new Intl.DateTimeFormat('ko-KR', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
        timeZone: 'Asia/Seoul',
      }),
    []
  );
  const [now, setNow] = useState(() => fmt.format(new Date()));
  useEffect(() => {
    const id = setInterval(() => setNow(fmt.format(new Date())), 1000);
    return () => clearInterval(id);
  }, [fmt]);
  return (
    <span className="tabular-nums">
      {label} {now} KST
    </span>
  );
};

/* CMS-driven marks (resume.clients) win; the local wall stays as the
   fallback so the strip is never empty. */
const buildStrip = (
  clients: { id: string; name: string; logo?: string; image?: { url: string } }[],
  fallback: BrandItem[]
): BrandItem[] => {
  const fromCms = clients
    .filter((c) => c.logo || c.image?.url)
    .map<BrandItem>((c) => ({
      kind: 'img',
      src: c.image?.url || c.logo || '',
      alt: c.name,
      h: 'h-5 md:h-6',
      white: true,
    }));
  return fromCms.length ? fromCms : fallback;
};

const BrandMarquee: React.FC = () => {
  const { ui } = useLanguage();
  const { clients } = useResume();
  const base = buildStrip(clients, BRANDS);
  const strip = [...base, ...base];

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
                    brand.white
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

      {/* Seoul time — small line under the wall */}
      <div className="max-w-1700 mx-auto px-6 md:px-12 mt-7 text-center">
        <span className="eyebrow text-[10px]">
          <SeoulClock label={ui.hero.seoulTime} />
        </span>
      </div>
    </section>
  );
};

export default BrandMarquee;
