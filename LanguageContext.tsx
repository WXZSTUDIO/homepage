import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Language, 
  getInitialLanguage, 
  I18N_UI, 
  I18N_PROJECTS, 
  I18N_CAREER, 
  I18N_STRENGTHS 
} from './i18n';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  ui: typeof I18N_UI['zh'];
  projects: any[];
  careers: any[];
  strengths: any[];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(getInitialLanguage);

  useEffect(() => {
    // Sync with html lang attribute
    document.documentElement.lang = language;
    try {
      localStorage.setItem('app_lang', language);
    } catch (e) {
      // Ignore localStorage errors in private mode
    }
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  // Pre-project localized structures
  const currentUI = I18N_UI[language] || I18N_UI['zh'];

  const localizedProjects = I18N_PROJECTS.map((item) => ({
    id: item.id,
    category: item.category,
    categoryLabel: item.categoryLabel[language],
    title: item.title[language],
    client: item.client[language],
    year: item.year,
    description: item.description[language],
    deliverables: item.deliverables[language],
    videoSrc: item.videoSrc,
    tags: item.tags[language],
    featured: item.featured,
  }));

  const localizedCareers = I18N_CAREER.map((item) => ({
    id: item.id,
    company: item.company[language],
    period: item.period,
    duration: item.duration[language],
    role: item.role[language],
    type: item.type[language],
    highlights: item.highlights[language],
  }));

  const localizedStrengths = I18N_STRENGTHS.map((item) => ({
    id: item.id,
    number: item.number,
    title: item.title[language],
    subtitle: item.subtitle[language],
    desc: item.desc[language],
    keyPoints: item.keyPoints[language],
    tags: item.tags[language],
  }));

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        ui: currentUI,
        projects: localizedProjects,
        careers: localizedCareers,
        strengths: localizedStrengths,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
