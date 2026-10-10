/* ------------------------------------------------------------------
   Sanity access — one client, one place for credentials.

   The frontend is strictly read-only: it never receives a write token
   and always reads with the `published` perspective, so drafts can
   never leak into the live site. All values come from env vars — no
   projectId is ever hardcoded in source.
   ------------------------------------------------------------------ */

import { createClient, type SanityClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import type { ImageAsset } from '../data/types';

const env = import.meta.env;

export const sanityConfig = {
  projectId: (env.VITE_SANITY_PROJECT_ID as string) || '',
  dataset: (env.VITE_SANITY_DATASET as string) || 'production',
  apiVersion: (env.VITE_SANITY_API_VERSION as string) || '2024-10-01',
  useCdn: env.VITE_SANITY_USE_CDN !== 'false',
  token: (env.VITE_SANITY_READ_TOKEN as string) || undefined,
};

export const isSanityConfigured = Boolean(sanityConfig.projectId && sanityConfig.dataset);
export const revalidateSec = Number(env.VITE_SANITY_REVALIDATE_SEC || 0) || 0;
export const requestTimeoutMs = Number(env.VITE_SANITY_TIMEOUT_MS || 6000) || 6000;

/* ------------------------------------------------------------------
   Realtime.

   Sanity 的 listen() 走 WebSocket，需要一个浏览器可见的只读 Viewer
   Token，因此默认关闭：只有显式设置 VITE_SANITY_REALTIME=true 且配了
   只读 Token 时才订阅。未开启时退化为「聚焦 / 可见性 / 轮询」重取，
   行为同样正确，只是延迟略高。
   ------------------------------------------------------------------ */
export const realtimeEnabled =
  env.VITE_SANITY_REALTIME === 'true' && Boolean(sanityConfig.token) && isSanityConfigured;

const LISTENED_TYPES = [
  'project',
  'resumeProfile',
  'experience',
  'resumeEntry',
  'metric',
  'client',
  'contactLink',
  'siteSettings',
];

export const subscribeContent = (onChange: () => void): (() => void) => {
  const client = getClient();
  if (!client || !realtimeEnabled) return () => undefined;
  try {
    const sub = client
      .listen(
        `*[_type in ${JSON.stringify(LISTENED_TYPES)}]`,
        {},
        { includeResult: false, visibility: 'query' }
      )
      .subscribe({
        next: () => onChange(),
        error: (err: any) => {
          if (import.meta.env.DEV) console.warn('[content] listener error:', err?.message || err);
        },
      });
    return () => sub.unsubscribe();
  } catch {
    return () => undefined;
  }
};

/* ------------------------------------------------------------------
   Draft preview.

   Only armed by an explicit `?preview=1` in the URL AND a configured
   read-only Viewer token. Without both, the client stays on the
   `published` perspective, so草稿 can never reach the public site by
   accident.
   ------------------------------------------------------------------ */
export const isPreviewMode = (): boolean => {
  if (typeof window === 'undefined') return false;
  try {
    return new URLSearchParams(window.location.search).get('preview') === '1';
  } catch {
    return false;
  }
};

const previewArmed = (): boolean => isPreviewMode() && Boolean(sanityConfig.token);

let cached: SanityClient | null = null;
let cachedPreview: SanityClient | null = null;

export const getClient = (): SanityClient | null => {
  if (!isSanityConfigured) return null;

  if (previewArmed()) {
    if (!cachedPreview) {
      cachedPreview = createClient({
        ...sanityConfig,
        perspective: 'previewDrafts',
        useCdn: false,
        ignoreBrowserTokenWarning: true,
      });
    }
    return cachedPreview;
  }

  if (!cached) {
    cached = createClient({
      ...sanityConfig,
      // published-only: drafts stay invisible to the public site
      perspective: 'published',
      ignoreBrowserTokenWarning: true,
    });
  }
  return cached;
};

/* --- Image pipeline -------------------------------------------------
   Every Sanity image is served through the CDN pipeline so the browser
   gets a responsive, compressed rendition instead of the original. */
const builder = isSanityConfigured
  ? imageUrlBuilder({ projectId: sanityConfig.projectId, dataset: sanityConfig.dataset })
  : null;

type SanityImage = {
  alt?: string;
  altText?: string;
  asset?: { _id?: string; _ref?: string; url?: string; metadata?: { lqip?: string; dimensions?: any } };
  url?: string;
};

/* 响应式候选宽度 —— 每张图都生成多档，由浏览器按屏幕自行挑选 */
const SRCSET_WIDTHS = [480, 768, 1024, 1440, 1920];

export const imageFromSanity = (src?: SanityImage | null): ImageAsset | undefined => {
  if (!src) return undefined;
  const ref = src.asset?._ref || src.asset?._id;
  let url: string | undefined;
  let srcSet: string | undefined;

  if (builder && ref) {
    const img = () => builder!.image({ _type: 'image', asset: { _ref: ref } } as any);
    try {
      url = img().auto('format').url();
    } catch {
      url = undefined;
    }
    const natural = Number(src.asset?.metadata?.dimensions?.width || 0);
    try {
      srcSet = SRCSET_WIDTHS.filter((w) => !natural || w <= natural)
        .map((w) => `${img().width(w).auto('format').url()} ${w}w`)
        .join(', ');
      if (natural && !SRCSET_WIDTHS.some((w) => w >= natural)) {
        srcSet += `, ${img().width(natural).auto('format').url()} ${natural}w`;
      }
    } catch {
      srcSet = undefined;
    }
  }
  url = url || src.asset?.url || src.url;
  if (!url) return undefined;

  return {
    url,
    alt: src.alt || src.altText || '',
    lqip: src.asset?.metadata?.lqip,
    width: src.asset?.metadata?.dimensions?.width,
    height: src.asset?.metadata?.dimensions?.height,
    srcSet: srcSet && srcSet.length > 0 ? srcSet : undefined,
  };
};

/** Responsive rendition at a target width (Sanity pipeline). */
export const imageUrlAt = (src: SanityImage | undefined, width: number): string | undefined => {
  const img = imageFromSanity(src);
  if (!img || !builder || !src?.asset?._ref) return img?.url;
  try {
    return builder
      .image({ _type: 'image', asset: { _ref: src.asset._ref } } as any)
      .width(width)
      .auto('format')
      .url();
  } catch {
    return img.url;
  }
};

/* --- Fetch helper ---------------------------------------------------
   Hard timeout + never throws: callers fall back to local data. */
export const fetchWithTimeout = async <T>(
  query: string,
  params: Record<string, unknown> = {}
): Promise<T | null> => {
  const client = getClient();
  if (!client) return null;

  const timeout = new Promise<null>((resolve) => setTimeout(() => resolve(null), requestTimeoutMs));
  const request = client.fetch<T>(query, params).catch((err) => {
    if (import.meta.env.DEV) console.warn('[content] Sanity fetch failed:', err?.message || err);
    return null;
  });

  return Promise.race([request, timeout]);
};
