import React, { createContext, useContext, useMemo, type ReactNode } from 'react';
import { useContent } from './hooks/useContent';
import { localProjects, localResume, localSettings } from './data/local';
import type {
  ContentBundle,
  Locale,
  LocaleText,
  Project,
  Resume,
  SiteSettings,
} from './data/types';

/* ------------------------------------------------------------------
   The only bridge between data and UI.

   Components call useSiteContent() and receive canonical objects plus
   a `t()` helper that resolves a LocaleText to the active language.
   Nothing in the UI imports the Sanity SDK, cases.ts or i18n.ts
   directly — so the data source can change without touching markup.
   ------------------------------------------------------------------ */

export interface SiteContent extends ContentBundle {
  lang: Locale;
  t: (v?: LocaleText | null) => string;
  loading: boolean;
  error: string | null;
  refresh: () => void;
}

const fallbackProjects = localProjects();
const fallbackResume = localResume();
const fallbackSettings = localSettings();

const Ctx = createContext<SiteContent>({
  projects: fallbackProjects,
  resume: fallbackResume,
  settings: fallbackSettings,
  lang: 'ko',
  t: () => '',
  loading: false,
  error: null,
  refresh: () => {},
  source: 'local',
});

export const ContentProvider: React.FC<{
  lang: Locale;
  children: ReactNode;
}> = ({ lang, children }) => {
  const { projects, resume, settings, source, loading, error, refresh } = useContent();

  const value = useMemo<SiteContent>(() => {
    const t = (v?: LocaleText | null): string => {
      if (!v) return '';
      return (v[lang] ?? v.zh ?? v.ko ?? v.en ?? '').toString();
    };
    return { projects, resume, settings, lang, t, loading, error, refresh, source };
  }, [projects, resume, settings, lang, loading, error, refresh, source]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
};

export const useSiteContent = (): SiteContent => useContext(Ctx);

/* --- Convenience selectors ---------------------------------------- */

export const useProjects = (): Project[] => useSiteContent().projects;

export const useProjectsByGroup = (group: Project['group']): Project[] =>
  useProjects().filter((p) => p.group === group);

export const useResume = (): Resume => useSiteContent().resume;

export const useSettings = (): SiteSettings => useSiteContent().settings;
