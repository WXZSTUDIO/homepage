import React, { useState, useEffect, useCallback } from 'react';
import { LanguageProvider } from './LanguageContext';
import Navbar from './components/Navbar';
import OpeningAnimation from './components/OpeningAnimation';
import HeroSection from './components/HeroSection';
import ExperienceSection from './components/ExperienceSection';
import CasesSection from './components/CasesSection';
import StrengthsSection from './components/StrengthsSection';
import ContactSection from './components/ContactSection';
import BrandMarquee from './components/BrandMarquee';
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
    </div>
  );
};

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <MainApp />
    </LanguageProvider>
  );
};

export default App;
