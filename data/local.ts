/* ------------------------------------------------------------------
   Local fallback content.

   This is the payload the site has always rendered, lifted out of
   cases.ts / i18n.ts into the canonical shapes in ./types. It is used
   when Sanity is not configured, when a request fails or times out, or
   to fill any section Sanity has no documents for — so the page never
   goes blank and never changes shape.
   ------------------------------------------------------------------ */

import { CASES, TVC_FEATURE } from '../cases';
import { I18N_UI, I18N_CAREER } from '../i18n';
import type {
  Project,
  ProjectGroup,
  Resume,
  SiteSettings,
  LocaleText,
  MediaBlock,
  Metric,
  Experience,
} from './types';

const asLocale = (v: { zh: string; ko: string; en?: string }): LocaleText => ({
  zh: v.zh ?? '',
  ko: v.ko ?? '',
  en: v.en ?? v.zh ?? '',
});

const groupOf = (id: string, type: 'img' | 'video'): ProjectGroup => {
  if (id.startsWith('star')) return 'star';
  return type === 'img' ? 'visual' : 'film';
};

const projectFromCase = (item: (typeof CASES)[number], order: number): Project => {
  const isVideo = item.type === 'video' && !!item.videoSrc;
  const title = asLocale(item.title);
  const media: MediaBlock[] = isVideo
    ? [
        {
          _key: `${item.id}-v`,
          type: 'video',
          video: { url: item.videoSrc, poster: item.src, loop: true, muted: true },
        },
      ]
    : [{ _key: `${item.id}-i`, type: 'image', image: { url: item.src, alt: title.zh } }];

  return {
    id: item.id,
    slug: item.id,
    group: groupOf(item.id, item.type),
    title,
    brand: item.brand ? asLocale(item.brand) : undefined,
    tag: asLocale(item.tag),
    coverType: isVideo ? 'video' : 'image',
    coverImage: isVideo ? undefined : { url: item.src, alt: title.zh },
    coverVideo: isVideo
      ? { url: item.videoSrc, poster: item.src, loop: true, muted: true }
      : undefined,
    stats: item.stats,
    media,
    order,
    updatedAt: undefined,
  };
};

export const localProjects = (): Project[] => [
  ...CASES.map(projectFromCase),
  {
    id: TVC_FEATURE.id,
    slug: TVC_FEATURE.id,
    group: 'tvc',
    title: asLocale(TVC_FEATURE.title),
    tag: asLocale(TVC_FEATURE.tag),
    coverType: 'video',
    coverVideo: {
      url: TVC_FEATURE.videoSrc,
      poster: TVC_FEATURE.src,
      loop: true,
      muted: true,
    },
    media: [
      {
        _key: 'tvc-v',
        type: 'video',
        video: {
          url: TVC_FEATURE.videoSrc,
          poster: TVC_FEATURE.src,
          loop: true,
          muted: true,
        },
      },
    ],
    order: -1,
    updatedAt: undefined,
  },
];

const metricUnit = (i: number): LocaleText => ({
  zh: I18N_UI.zh.experience.metrics[i]?.unit ?? '',
  ko: I18N_UI.ko.experience.metrics[i]?.unit ?? '',
  en: I18N_UI.en.experience.metrics[i]?.unit ?? '',
});

const metricSub = (i: number): LocaleText => ({
  zh: I18N_UI.zh.experience.metrics[i]?.sub ?? '',
  ko: I18N_UI.ko.experience.metrics[i]?.sub ?? '',
  en: I18N_UI.en.experience.metrics[i]?.sub ?? '',
});

const localMetrics = (): Metric[] =>
  I18N_UI.ko.experience.metrics.map((m, i) => ({
    value: m.value,
    suffix: m.suffix,
    unit: metricUnit(i),
    sub: metricSub(i),
  }));

const localExperiences = (): Experience[] =>
  I18N_CAREER.map((c, i) => ({
    id: c.id,
    company: asLocale(c.company),
    role: asLocale(c.role),
    period: c.period,
    order: i,
  }));

export const localResume = (): Resume => ({
  profile: {
    name: 'ZHENG CANFENG',
    role: { zh: I18N_UI.zh.nav.title, ko: I18N_UI.ko.nav.title, en: I18N_UI.en.nav.title },
    avatar: { url: 'profile.png', alt: 'ZHENG CANFENG' },
    bio: {
      zh: I18N_UI.zh.experience.bioP1,
      ko: I18N_UI.ko.experience.bioP1,
      en: I18N_UI.en.experience.bioP1,
    },
    location: {
      zh: I18N_UI.zh.experience.location,
      ko: I18N_UI.ko.experience.location,
      en: I18N_UI.en.experience.location,
    },
    email: 'ro3eandcat@gmail.com',
    phone: I18N_UI.ko.experience.phone,
    resumeFileUrl: 'https://naver.me/5fdFDeXr',
  },
  metrics: localMetrics(),
  experiences: localExperiences(),
  educations: [],
  awards: [],
  exhibitions: [],
  services: [],
  skills: [],
  clients: [],
  contacts: [
    {
      id: 'wechat',
      platform: 'wechat',
      label: { zh: '微信', ko: '위챗', en: 'WeChat' },
      url: '',
      handle: 'icf304',
    },
    {
      id: 'xiaohongshu',
      platform: 'xiaohongshu',
      label: {
        zh: I18N_UI.zh.contact?.xiaohongshuLink ?? '小红书',
        ko: I18N_UI.ko.contact?.xiaohongshuLink ?? '샤오홍슈',
        en: I18N_UI.en.contact?.xiaohongshuLink ?? 'Xiaohongshu',
      },
      url: 'https://www.xiaohongshu.com/user/profile/5fd363ac000000000101cffc',
      handle: '@WXZ STUDIO',
    },
  ],
});

export const localSettings = (): SiteSettings => ({
  siteName: 'STUDIO (WXZ)',
  hero: {
    headline1: {
      zh: I18N_UI.zh.hero.headline1,
      ko: I18N_UI.ko.hero.headline1,
      en: I18N_UI.en.hero.headline1,
    },
    headline2: {
      zh: I18N_UI.zh.hero.headline2,
      ko: I18N_UI.ko.hero.headline2,
      en: I18N_UI.en.hero.headline2,
    },
    narrative: {
      zh: I18N_UI.zh.hero.narrative1,
      ko: I18N_UI.ko.hero.narrative1,
      en: I18N_UI.en.hero.narrative1,
    },
    video: { url: 'hero-keyflip.mp4', loop: true, muted: true, autoplay: true },
  },
  seo: {
    title: {
      zh: 'STUDIO (WXZ) · 郑灿峰 — 视觉设计师 · 摄影师',
      ko: 'STUDIO (WXZ) · 정찬봉 — 시각 디자이너 · 사진가',
      en: 'STUDIO (WXZ) · Zheng Canfeng — Designer · Photographer',
    },
    description: {
      zh: '郑灿峰 — 13年视觉设计师与摄影师。品牌视觉、商业影像、生成式 AI 工作流。',
      ko: '정찬봉 (郑灿峰) — 13년차 시각 디자이너 · 사진가. 브랜드 비주얼, 상업 영상, 생성형 AI 워크플로.',
      en: 'Zheng Canfeng — 13-year visual designer and photographer. Brand visuals, commercial film, generative AI workflow.',
    },
    shareImage: { url: 'profile.png' },
  },
  footer: {
    copyright: {
      zh: I18N_UI.zh.contact?.copyright ?? '',
      ko: I18N_UI.ko.contact?.copyright ?? '',
      en: I18N_UI.en.contact?.copyright ?? '',
    },
    location: {
      zh: I18N_UI.zh.contact?.locationFooter ?? '',
      ko: I18N_UI.ko.contact?.locationFooter ?? '',
      en: I18N_UI.en.contact?.locationFooter ?? '',
    },
  },
  contact: {
    email: 'ro3eandcat@gmail.com',
    phone: I18N_UI.ko.experience.phone,
    wechat: 'icf304',
    resumeFileUrl: 'https://naver.me/5fdFDeXr',
  },
  socials: [],
  backgroundMusic: { enabled: false, loop: true, volume: 0.5 },
});
