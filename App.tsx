import React, { useState, useEffect, useCallback } from 'react';
import { LanguageProvider, useLanguage } from './LanguageContext';
import { ContentProvider, useSiteContent } from './ContentContext';
import Navbar from './components/Navbar';
import OpeningAnimation from './components/OpeningAnimation';
import HeroSection from './components/HeroSection';
import ExperienceSection from './components/ExperienceSection';
import CasesSection from './components/CasesSection';
import StrengthsSection from './components/StrengthsSection';
import ContactSection from './components/ContactSection';
import BrandMarquee from './components/BrandMarquee';
import BackgroundMusic from './components/BackgroundMusic';
import SmoothScroll, { scrollToTarget } from './components/SmoothScroll';
import { useMotionProfile } from './hooks/useMotionProfile';

const MainApp: React.FC = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const { heavy } = useMotionProfile();

  // Opening intro runs once per session
  const [isIntroDone, setIsIntroDone] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem('seen_opening_intro') === 'true';
    } catch {
      return false;
    }
  });

  const handleIntroComplete = useCallback(() => {
    try {
      sessionStorage.setItem('seen_opening_intro', 'true');
    } catch {}
    setIsIntroDone(true);
  }, []);

  // Active section tracking for the topbar
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'experience', 'projects', 'strengths', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => scrollToTarget(id, -80);

  return (
    <div className="min-h-screen text-paper">
      {/* Inertial scrolling — the substrate every entrance depends on */}
      <SmoothScroll enabled={heavy} />

      {!isIntroDone && <OpeningAnimation onComplete={handleIntroComplete} />}

      <Navbar activeSection={activeSection} />

      <main>
        {/* 1. Cover — full-bleed video, one headline, one action, partner strip */}
        <HeroSection />

        {/* 1.5 Full client wall */}
        <BrandMarquee />

        {/* 2. Practice — metrics and career as hairline rows */}
        <ExperienceSection />

        {/* 3. Featured cases — the published feed as a quiet grid */}
        <CasesSection />

        {/* 4. Capabilities — chapters, kit and stack, icon-led */}
        <StrengthsSection />

        {/* 5. Contact — channels and the inquiry form */}
        <ContactSection />
      </main>

      {/* Background music — opt-in, remembers the visitor's choice */}
      <BackgroundMusic />

      {/* Dev-only badge: which source the page is rendering from */}
      <ContentSourceBadge />
    </div>
  );
};

/* Shows "local / sanity / mixed" in development only — never in prod. */
const ContentSourceBadge: React.FC = () => {
  const { source, loading, error } = useSiteContent();
  if (!import.meta.env.DEV) return null;
  if (source === 'local' && !loading && !error) return null;
  return (
    <div className="fixed bottom-4 left-4 z-50 chip h-8 px-3 text-[10px] tracking-[0.08em] text-paper-70">
      content: {source}
      {loading ? ' · loading' : ''}
      {error ? ' · error' : ''}
    </div>
  );
};

const AppShell: React.FC = () => {
  const { language } = useLanguage();
  return (
    <ContentProvider lang={language}>
      <MainApp />
    </ContentProvider>
  );
};

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <AppShell />
    </LanguageProvider>
  );
};

export default App;
