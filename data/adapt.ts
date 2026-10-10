import type { CaseItem } from '../cases';
import type { Locale, LocaleText, Project } from './types';

/* ------------------------------------------------------------------
   Adapter: canonical Project → the CaseItem shape the gallery already
   renders.

   Every gallery/carousel/lightbox component keeps its exact markup —
   only the language resolution moves here — so wiring in the CMS
   cannot change a single pixel of the existing layout.
   ------------------------------------------------------------------ */

const pick = (v: LocaleText | undefined, lang: Locale): string => {
  if (!v) return '';
  return (v[lang] ?? v.zh ?? v.ko ?? v.en ?? '').toString();
};

export const coverSrc = (p: Project): string => {
  if (p.coverType === 'video') return p.coverVideo?.poster || p.coverImage?.url || '';
  return p.coverImage?.url || p.coverVideo?.poster || '';
};

export const projectToCaseItem = (p: Project, lang: Locale): CaseItem => ({
  id: p.slug || p.id,
  type: p.coverType === 'video' ? 'video' : 'img',
  src: coverSrc(p),
  videoSrc: p.coverType === 'video' ? p.coverVideo?.url : undefined,
  title: { zh: p.title.zh, ko: p.title.ko },
  tag: { zh: pick(p.tag, 'zh'), ko: pick(p.tag, 'ko') },
  brand: p.brand ? { zh: pick(p.brand, 'zh'), ko: pick(p.brand, 'ko') } : undefined,
  stats:
    p.stats && (p.stats.likes || p.stats.saves)
      ? { likes: Number(p.stats.likes || 0), saves: Number(p.stats.saves || 0) }
      : undefined,
});
