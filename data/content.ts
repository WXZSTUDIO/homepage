/* ------------------------------------------------------------------
   The one content interface the UI is allowed to call.

   getProjects() / getProjectBySlug() / getResume() / getSiteSettings()

   Rules:
   1. Sanity is the primary source when configured.
   2. Any failure — unconfigured, network error, timeout, empty
      section — falls back to the local dataset, per section.
   3. The returned shape is always the canonical type, so a source
      switch can never blank the page or change the component tree.
   4. Errors are logged in dev only; production stays silent.
   ------------------------------------------------------------------ */

import { fetchWithTimeout, isSanityConfigured } from '../lib/sanity';
import { projectsQuery, projectBySlugQuery, resumeQuery, settingsQuery } from '../lib/queries';
import { mapProject, mapResume, mapSettings } from '../lib/mappers';
import { localProjects, localResume, localSettings } from './local';
import type { ContentBundle, Project, Resume, SiteSettings } from './types';

const dev = (...args: unknown[]) => {
  if (import.meta.env.DEV) console.info('[content]', ...args);
};

/* --- Projects ------------------------------------------------------ */

/** With VITE_SANITY_MERGE_LOCAL=true the local dataset stays visible
    alongside the CMS (CMS wins on slug collisions). Handy while
    migrating; turn it off once everything has been seeded. */
const mergeLocal = import.meta.env.VITE_SANITY_MERGE_LOCAL === 'true';

export const getProjects = async (): Promise<Project[]> => {
  const raw = await fetchWithTimeout<any[]>(projectsQuery);
  /* Empty is treated like a failure: a freshly created dataset must not
     blank the works section. Seed the CMS (npm run seed:sanity) to take
     over from the local dataset. */
  if (!raw || raw.length === 0) {
    dev(raw ? 'projects → empty, local fallback' : 'projects → local fallback');
    return localProjects();
  }

  const mapped = raw.map(mapProject);
  if (!mergeLocal) {
    dev(`projects → sanity (${mapped.length})`);
    return mapped;
  }

  const seen = new Set(mapped.map((p) => p.slug));
  const merged = [...mapped, ...localProjects().filter((p) => !seen.has(p.slug))].sort(
    (a, b) => a.order - b.order
  );
  dev(`projects → sanity + local (${merged.length})`);
  return merged;
};

export const getProjectBySlug = async (slug: string): Promise<Project | null> => {
  if (!slug) return null;
  const raw = await fetchWithTimeout<any>(projectBySlugQuery, { slug });
  if (!raw) {
    const local = localProjects().find((p) => p.slug === slug);
    return local || null;
  }
  return mapProject(raw);
};

/* --- Resume -------------------------------------------------------- */

export const getResume = async (): Promise<Resume> => {
  const fallback = localResume();
  if (!isSanityConfigured) return fallback;

  const raw = await fetchWithTimeout<any>(resumeQuery);
  if (!raw) {
    dev('resume → local fallback');
    return fallback;
  }

  const mapped = mapResume(raw);
  const merged: Resume = {
    profile: { ...fallback.profile, ...(mapped.profile || {}) },
    metrics: mapped.metrics?.length ? mapped.metrics : fallback.metrics,
    experiences: mapped.experiences?.length ? mapped.experiences : fallback.experiences,
    educations: mapped.educations?.length ? mapped.educations : fallback.educations,
    awards: mapped.awards ?? fallback.awards,
    exhibitions: mapped.exhibitions ?? fallback.exhibitions,
    services: mapped.services ?? fallback.services,
    skills: mapped.skills ?? fallback.skills,
    clients: mapped.clients?.length ? mapped.clients : fallback.clients,
    contacts: mapped.contacts?.length ? mapped.contacts : fallback.contacts,
  };
  dev('resume → sanity');
  return merged;
};

/* --- Site settings ------------------------------------------------- */

export const getSiteSettings = async (): Promise<SiteSettings> => {
  const fallback = localSettings();
  if (!isSanityConfigured) return fallback;

  const raw = await fetchWithTimeout<any>(settingsQuery);
  if (!raw) {
    dev('settings → local fallback');
    return fallback;
  }

  const mapped = mapSettings(raw);
  const merged: SiteSettings = {
    siteName: mapped.siteName || fallback.siteName,
    hero: {
      headline1: mapped.hero?.headline1?.zh ? mapped.hero.headline1 : fallback.hero.headline1,
      headline2: mapped.hero?.headline2?.zh ? mapped.hero.headline2 : fallback.hero.headline2,
      narrative: mapped.hero?.narrative || fallback.hero.narrative,
      video: mapped.hero?.video || fallback.hero.video,
    },
    seo: {
      title: mapped.seo?.title || fallback.seo.title,
      description: mapped.seo?.description || fallback.seo.description,
      shareImage: mapped.seo?.shareImage || fallback.seo.shareImage,
    },
    footer: {
      copyright: mapped.footer?.copyright || fallback.footer.copyright,
      location: mapped.footer?.location || fallback.footer.location,
    },
    contact: { ...fallback.contact, ...(mapped.contact || {}) },
    socials: mapped.socials?.length ? mapped.socials : fallback.socials,
    backgroundMusic: { ...fallback.backgroundMusic, ...(mapped.backgroundMusic || {}) },
  };
  dev('settings → sanity');
  return merged;
};

/* --- Bundle -------------------------------------------------------- */

export const getContent = async (): Promise<ContentBundle> => {
  if (!isSanityConfigured) {
    dev('Sanity not configured — serving local content');
    return {
      projects: localProjects(),
      resume: localResume(),
      settings: localSettings(),
      source: 'local',
    };
  }

  const [projects, resume, settings] = await Promise.all([
    getProjects(),
    getResume(),
    getSiteSettings(),
  ]);

  const localP = localProjects().length;
  const localR = localResume();
  const localS = localSettings();
  const usedSanity = {
    projects: projects.length > 0 && projects.length !== localP,
    resume:
      resume.experiences.length !== localR.experiences.length ||
      JSON.stringify(resume.profile) !== JSON.stringify(localR.profile),
    settings: settings.siteName !== localS.siteName || !!settings.hero.video?.url,
  };
  const hits = Object.values(usedSanity).filter(Boolean).length;

  return {
    projects,
    resume,
    settings,
    source: hits === 0 ? 'local' : hits === 3 ? 'sanity' : 'mixed',
  };
};
