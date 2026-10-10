import { useCallback, useEffect, useRef, useState } from 'react';
import { getContent } from '../data/content';
import { localProjects, localResume, localSettings } from '../data/local';
import { isSanityConfigured, revalidateSec } from '../lib/sanity';
import type { ContentBundle } from '../data/types';

/* ------------------------------------------------------------------
   Revalidation strategy (and why).

   The site is a static SPA on GitHub Pages — there is no server to
   hold a Sanity listener, and the Live Content API / listen() needs a
   token we must never ship to the browser. So the freshest safe option
   is: render local content instantly, then swap in Sanity content on
   load, and re-fetch when the tab regains focus / becomes visible
   (plus an optional interval via VITE_SANITY_REVALIDATE_SEC).
   A Sanity webhook → Actions rebuild can be layered on later without
   touching any component.
   ------------------------------------------------------------------ */

const initial = (): ContentBundle => ({
  projects: localProjects(),
  resume: localResume(),
  settings: localSettings(),
  source: 'local',
});

export const useContent = () => {
  const [data, setData] = useState<ContentBundle>(initial);
  const [loading, setLoading] = useState(isSanityConfigured);
  const [error, setError] = useState<string | null>(null);
  const mounted = useRef(true);

  const load = useCallback(async () => {
    if (!isSanityConfigured) return;
    setLoading(true);
    try {
      const next = await getContent();
      if (!mounted.current) return;
      setData(next);
      setError(null);
    } catch (e: any) {
      if (!mounted.current) return;
      // Never blank the page: keep whatever is already rendered.
      if (import.meta.env.DEV) console.warn('[content] load failed:', e?.message || e);
      setError(import.meta.env.DEV ? String(e?.message || e) : null);
    } finally {
      if (mounted.current) setLoading(false);
    }
  }, []);

  useEffect(() => {
    mounted.current = true;
    load();
    return () => {
      mounted.current = false;
    };
  }, [load]);

  useEffect(() => {
    if (!isSanityConfigured) return;

    const onVisible = () => {
      if (document.visibilityState === 'visible') load();
    };
    document.addEventListener('visibilitychange', onVisible);
    window.addEventListener('focus', load);

    let timer: number | undefined;
    if (revalidateSec > 0) {
      timer = window.setInterval(load, revalidateSec * 1000);
    }

    return () => {
      document.removeEventListener('visibilitychange', onVisible);
      window.removeEventListener('focus', load);
      if (timer) window.clearInterval(timer);
    };
  }, [load]);

  return { ...data, loading, error, refresh: load };
};
