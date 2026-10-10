/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SANITY_PROJECT_ID?: string;
  readonly VITE_SANITY_DATASET?: string;
  readonly VITE_SANITY_API_VERSION?: string;
  readonly VITE_SANITY_USE_CDN?: string;
  readonly VITE_SANITY_REVALIDATE_SEC?: string;
  readonly VITE_SANITY_TIMEOUT_MS?: string;
  readonly VITE_SANITY_READ_TOKEN?: string;
  readonly VITE_SANITY_MERGE_LOCAL?: string;
  readonly VITE_SANITY_STUDIO_BASE_PATH?: string;
  readonly VITE_SITE_URL?: string;
  readonly VITE_STUDIO_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
