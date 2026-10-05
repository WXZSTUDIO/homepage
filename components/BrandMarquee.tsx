import React from 'react';
import { useLanguage } from '../LanguageContext';

/* Clients served. There are no logo files in the repo, so these are set as
   typographic wordmarks — which suits the editorial system better than
   mismatched logo files would anyway. */
const BRANDS = [
  'SHINSEGAE 新世界免税店',
  'AMOREPACIFIC',
  'HERA 赫妍',
  'IOPE 艾诺碧',
  'VITAL BEAUTIE',
  'SAMYANG 三养食品',
  '王府井百货',
  '北京丽贝亚',
  'EKE COSMETICS',
  'QOOOK',
  'HIGH & GOGO',
  'HARBIN METRO MEDIA',
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
      className="relative border-y border-rule bg-ink py-7 overflow-hidden select-none"
    >
      <div className="max-w-1700 mx-auto px-6 md:px-12 mb-5 flex items-center justify-between">
        <span className="eyebrow text-faint">{label}</span>
        <span className="w-px h-4 bg-rule hidden sm:block" />
        <span className="eyebrow text-faint hidden sm:block">2013 — 2026</span>
      </div>

      <div className="relative">
        {/* Edge fades keep the strip from ending abruptly */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 md:w-32 z-10 bg-gradient-to-r from-ink to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 md:w-32 z-10 bg-gradient-to-l from-ink to-transparent" />

        <div className="marquee-track flex w-max items-baseline gap-12 md:gap-16 px-6 md:px-12">
          {strip.map((brand, i) => (
            <React.Fragment key={`${brand}-${i}`}>
              <span
                className={`whitespace-nowrap font-display text-paper-45 text-lg md:text-2xl leading-none tracking-tight ${
                  i % 2 === 1 ? 'italic' : ''
                }`}
              >
                {brand}
              </span>
              <span className="shrink-0 w-1 h-1 rotate-45 bg-rule" aria-hidden="true" />
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandMarquee;
