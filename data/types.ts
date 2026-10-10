/* ------------------------------------------------------------------
   Canonical content shapes.

   Every component reads these types and nothing else — whether the
   payload came from Sanity or from the local fallback in ./local, the
   shape is identical, so switching data sources can never change the
   component tree.
   ------------------------------------------------------------------ */

export type Locale = 'zh' | 'ko' | 'en';
export type LocaleText = { zh: string; ko: string; en: string };

export interface ImageAsset {
  url: string;
  alt?: string;
  width?: number;
  height?: number;
  /** tiny blurred placeholder from the Sanity pipeline */
  lqip?: string;
}

export interface VideoAsset {
  url?: string;
  poster?: string;
  autoplay?: boolean;
  loop?: boolean;
  muted?: boolean;
}

export type MediaBlock =
  | { _key: string; type: 'image'; image?: ImageAsset; caption?: LocaleText }
  | { _key: string; type: 'gallery'; items?: ImageAsset[]; caption?: LocaleText }
  | { _key: string; type: 'video'; video?: VideoAsset; caption?: LocaleText }
  | {
      _key: string;
      type: 'richText';
      title?: LocaleText;
      body?: LocaleText;
      bullets?: LocaleText[];
    };

export type ProjectGroup = 'visual' | 'film' | 'star' | 'tvc';

export interface ProjectStats {
  likes?: number;
  saves?: number;
}

export interface Project {
  id: string;
  slug: string;
  group: ProjectGroup;
  year?: string;
  category?: string;
  title: LocaleText;
  brand?: LocaleText;
  tag?: LocaleText;
  description?: LocaleText;
  coverType: 'image' | 'video';
  coverImage?: ImageAsset;
  coverVideo?: VideoAsset;
  stats?: ProjectStats;
  /** Ordered detail blocks (image / gallery / video / rich text). */
  media: MediaBlock[];
  order: number;
  updatedAt?: string;
}

export interface Metric {
  value: number;
  suffix?: string;
  unit: LocaleText;
  sub?: LocaleText;
}

export interface Experience {
  id: string;
  company: LocaleText;
  role?: LocaleText;
  period?: string;
  current?: boolean;
  description?: LocaleText;
  order: number;
}

export interface ResumeEntry {
  id: string;
  title: LocaleText;
  subtitle?: LocaleText;
  meta?: string;
  description?: LocaleText;
  order: number;
}

export interface SocialLink {
  id: string;
  platform: string;
  label?: LocaleText;
  url: string;
  handle?: string;
}

export interface ClientBrand {
  id: string;
  name: string;
  /** Pre-rendered mark in public/brands (local fallback path). */
  logo?: string;
  /** Sanity-hosted mark. */
  image?: ImageAsset;
  order: number;
}

export interface Profile {
  name: string;
  role?: LocaleText;
  avatar?: ImageAsset;
  bio?: LocaleText;
  location?: LocaleText;
  email?: string;
  phone?: string;
  resumeFileUrl?: string;
}

export interface Resume {
  profile: Profile;
  metrics: Metric[];
  experiences: Experience[];
  educations: ResumeEntry[];
  awards: ResumeEntry[];
  exhibitions: ResumeEntry[];
  services: ResumeEntry[];
  skills: ResumeEntry[];
  clients: ClientBrand[];
  contacts: SocialLink[];
}

export interface BackgroundMusic {
  url?: string;
  name?: string;
  enabled: boolean;
  loop: boolean;
  /** 0 – 1 */
  volume: number;
}

export interface SiteSettings {
  siteName: string;
  hero: {
    headline1: LocaleText;
    headline2: LocaleText;
    narrative?: LocaleText;
    video?: VideoAsset;
  };
  seo: {
    title?: LocaleText;
    description?: LocaleText;
    shareImage?: ImageAsset;
  };
  footer: {
    copyright?: LocaleText;
    location?: LocaleText;
  };
  contact: {
    email?: string;
    phone?: string;
    wechat?: string;
    resumeFileUrl?: string;
  };
  socials: SocialLink[];
  backgroundMusic: BackgroundMusic;
}

export interface ContentBundle {
  projects: Project[];
  resume: Resume;
  settings: SiteSettings;
  /** Where the payload came from — surfaced in dev only. */
  source: 'sanity' | 'local' | 'mixed';
}
