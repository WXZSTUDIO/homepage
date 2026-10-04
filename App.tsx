import React, { useState, useEffect, useCallback } from 'react';
import { LanguageProvider } from './LanguageContext';
import Navbar from './components/Navbar';
import OpeningAnimation from './components/OpeningAnimation';
import HeroSection from './components/HeroSection';
import ExperienceSection from './components/ExperienceSection';
import ProjectsSection from './components/ProjectsSection';
import StrengthsSection from './components/StrengthsSection';
import ContactSection from './components/ContactSection';

const MainApp: React.FC = () => {
  const [activeSection, setActiveSection] = useState('hero');
  
  // Track whether opening intro animation has completed
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

  // Track active section for navbar highlighting
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

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="min-h-screen bg-black text-[#f5f5f7] selection:bg-white selection:text-black">
      {/* High-Impact Opening Shutter Wipe & Numerical Preloader */}
      {/* Mounted ONLY until completed, so scroll state updates NEVER re-trigger it */}
      {!isIntroDone && (
        <OpeningAnimation onComplete={handleIntroComplete} />
      )}

      {/* Top Floating Glassmorphism Navbar with Language Switcher */}
      <Navbar activeSection={activeSection} />

      {/* Main Content Area */}
      <main>
        {/* 1. Full-screen Hero Section with Video Background & Kinetic Title Reveal */}
        <HeroSection
          onExplore={() => scrollToSection('projects')}
          onContact={() => scrollToSection('contact')}
          isIntroDone={isIntroDone}
        />

        {/* 2. Personal Profile & Experience (Portrait, Bio, Contacts, Metrics, Career Timeline) */}
        <ExperienceSection />

        {/* 3. Curated Selected Projects (Expansive Cards Grid with Lightbox) */}
        <ProjectsSection />

        {/* 4. Core Capabilities & Advantages (4 Pillars + Equipment Arsenal) */}
        <StrengthsSection />

        {/* 5. Full-Viewport Finale: Contact Module (Direct Channels + Inquiry Form) */}
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
