/* ------------------------------------------------------------------
   Mappers — Sanity payload → canonical types.

   Kept separate from the queries so the shape contract lives in one
   place and can be unit-checked independently of GROQ.
   ------------------------------------------------------------------ */

import { imageFromSanity } from './sanity';
import type {
  Project,
  ProjectGroup,
  MediaBlock,
  Resume,
  SiteSettings,
  LocaleText,
  Metric,
  Experience,
  ResumeEntry,
  ClientBrand,
  SocialLink,
} from '../data/types';

type MaybeLocale = { zh?: string; ko?: string; en?: string } | undefined | null;

const locale = (v: MaybeLocale): LocaleText | undefined => {
  if (!v) return undefined;
  const out: LocaleText = { zh: v.zh ?? '', ko: v.ko ?? '', en: v.en ?? v.zh ?? '' };
  return out.zh || out.ko ? out : undefined;
};

const groups: ProjectGroup[] = ['visual', 'film', 'star', 'tvc'];
const group = (v?: string): ProjectGroup =>
  (groups as string[]).includes(v || '') ? (v as ProjectGroup) : 'film';

const mediaBlocks = (blocks: any[] = []): MediaBlock[] =>
  blocks
    .filter(Boolean)
    .map((b, i): MediaBlock | null => {
      const key = b._key || `mb-${i}`;
      switch (b.type) {
        case 'image':
          return { _key: key, type: 'image', image: imageFromSanity(b.image), caption: locale(b.caption) };
        case 'gallery':
          return {
            _key: key,
            type: 'gallery',
            items: (b.gallery || []).map(imageFromSanity).filter(Boolean),
            caption: locale(b.caption),
          };
        case 'video':
          return {
            _key: key,
            type: 'video',
            video: {
              url: b.videoFile || b.videoUrl,
              poster: imageFromSanity(b.poster)?.url,
              autoplay: !!b.autoplay,
              loop: !!b.loop,
              muted: b.muted !== false,
            },
            caption: locale(b.caption),
          };
        case 'richText':
          return {
            _key: key,
            type: 'richText',
            title: locale(b.title),
            body: locale(b.body),
            bullets: (b.bullets || []).map(locale).filter(Boolean) as LocaleText[],
          };
        default:
          return null;
      }
    })
    .filter(Boolean) as MediaBlock[];

export const mapProject = (doc: any): Project => {
  const isVideo = doc.coverType === 'video';
  const coverVideoUrl = doc.coverVideoFile || doc.coverVideoUrl;
  return {
    id: doc._id,
    slug: doc.slug || doc._id,
    group: group(doc.group),
    year: doc.year,
    category: doc.category,
    title: locale(doc.title) || { zh: '', ko: '', en: '' },
    brand: locale(doc.brand),
    tag: locale(doc.tag),
    description: locale(doc.description),
    coverType: isVideo && coverVideoUrl ? 'video' : 'image',
    coverImage: imageFromSanity(doc.coverImage),
    coverVideo: coverVideoUrl
      ? {
          url: coverVideoUrl,
          poster: imageFromSanity(doc.coverPoster)?.url || imageFromSanity(doc.coverImage)?.url,
          autoplay: !!doc.coverAutoplay,
          loop: doc.coverLoop !== false,
          muted: doc.coverMuted !== false,
        }
      : undefined,
    stats:
      typeof doc.likes === 'number' || typeof doc.saves === 'number'
        ? { likes: Number(doc.likes || 0), saves: Number(doc.saves || 0) }
        : undefined,
    media: mediaBlocks(doc.mediaBlocks),
    order: typeof doc.order === 'number' ? doc.order : 999,
    updatedAt: doc._updatedAt,
  };
};

const mapEntries = (docs: any[] = []): ResumeEntry[] =>
  (docs || [])
    .filter(Boolean)
    .map((d, i) => ({
      id: d._id || `e-${i}`,
      title: locale(d.title) || { zh: '', ko: '', en: '' },
      subtitle: locale(d.subtitle),
      meta: d.meta,
      description: locale(d.description),
      order: typeof d.order === 'number' ? d.order : i,
    }));

export const mapResume = (raw: any): Partial<Resume> => {
  if (!raw) return {};
  const p = raw.profile;
  const metrics: Metric[] = (raw.metrics || []).map((m: any, i: number) => ({
    value: Number(m.value || 0),
    suffix: m.suffix,
    unit: locale(m.unit) || { zh: '', ko: '', en: '' },
    sub: locale(m.sub),
  }));
  const experiences: Experience[] = (raw.experiences || []).map((e: any, i: number) => ({
    id: e._id || `x-${i}`,
    company: locale(e.company) || { zh: '', ko: '', en: '' },
    role: locale(e.role),
    period: e.current
      ? `${e.start || ''} ~ ${''}`.trim().replace(/~\s*$/, '~ 至今')
      : [e.start, e.end].filter(Boolean).join(' ~ '),
    current: !!e.current,
    description: locale(e.description),
    order: typeof e.order === 'number' ? e.order : i,
  }));

  const clients: ClientBrand[] = (raw.clients || []).map((c: any, i: number) => ({
    id: c._id || `c-${i}`,
    name: c.name || '',
    image: imageFromSanity(c.logo),
    order: typeof c.order === 'number' ? c.order : i,
  }));

  const contacts: SocialLink[] = (raw.contacts || [])
    .map((c: any, i: number) => ({
      id: c._id || `s-${i}`,
      platform: c.platform || '',
      label: locale(c.label),
      url: c.url || '',
      handle: c.handle,
    }))
    .filter((c: SocialLink) => Boolean(c.url || c.handle));

  return {
    profile: p
      ? {
          name: p.name || '',
          role: locale(p.role),
          avatar: imageFromSanity(p.avatar),
          bio: locale(p.bio),
          location: locale(p.location),
          email: p.email,
          phone: p.phone,
          resumeFileUrl: p.resumeFile,
        }
      : undefined,
    metrics,
    experiences,
    educations: mapEntries(raw.educations),
    awards: mapEntries(raw.awards),
    exhibitions: mapEntries(raw.exhibitions),
    services: mapEntries(raw.services),
    skills: mapEntries(raw.skills),
    clients,
    contacts,
  };
};

export const mapSettings = (raw: any): Partial<SiteSettings> => {
  if (!raw) return {};
  const heroVideoUrl = raw.heroVideoFile || raw.heroVideoUrl;
  const bm = raw.backgroundMusic || {};
  return {
    siteName: raw.siteName || '',
    hero: {
      headline1: locale(raw.heroHeadline1) || { zh: '', ko: '', en: '' },
      headline2: locale(raw.heroHeadline2) || { zh: '', ko: '', en: '' },
      narrative: locale(raw.heroNarrative),
      video: heroVideoUrl ? { url: heroVideoUrl, loop: true, muted: true, autoplay: true } : undefined,
    },
    seo: {
      title: locale(raw.seoTitle),
      description: locale(raw.seoDescription),
      shareImage: imageFromSanity(raw.shareImage),
    },
    footer: {
      copyright: locale(raw.footerCopyright),
      location: locale(raw.footerLocation),
    },
    contact: {
      email: raw.contactEmail,
      phone: raw.contactPhone,
      wechat: raw.contactWechat,
      resumeFileUrl: raw.resumeFileUrl,
    },
    socials: (raw.socials || [])
      .map((s: any, i: number) => ({
        id: s._key || s.platform || `s-${i}`,
        platform: s.platform || '',
        label: locale(s.label),
        url: s.url || '',
        handle: s.handle,
      }))
      .filter((s: SocialLink) => Boolean(s.url || s.handle)),
    backgroundMusic: {
      url: bm.audioFile || bm.audioUrl,
      name: bm.name,
      enabled: Boolean(bm.enabled) && Boolean(bm.audioFile || bm.audioUrl),
      loop: bm.loop !== false,
      volume: typeof bm.volume === 'number' ? Math.min(1, Math.max(0, bm.volume)) : 0.5,
    },
  };
};
