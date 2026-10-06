import React, { useState, useEffect, useCallback } from 'react';
import { LanguageProvider } from './LanguageContext';
import Navbar from './components/Navbar';
import OpeningAnimation from './components/OpeningAnimation';
import HeroSection from './components/HeroSection';
import ExperienceSection from './components/ExperienceSection';
import ProjectsSection from './components/ProjectsSection';
import StrengthsSection from './components/StrengthsSection';
import ContactSection from './components/ContactSection';
import BrandMarquee from './components/BrandMarquee';
import Backdrop from './components/Backdrop';
import SmoothScroll, { scrollToTarget } from './components/SmoothScroll';
import { useMotionProfile } from './hooks/useMotionProfile';

const MainApp: React.FC = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const { heavy } = useMotionProfile();
  
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

  const scrollToSection = (id: string) => scrollToTarget(id, -80);

  return (
    <div className="min-h-screen text-paper selection:bg-paper selection:text-ink">
      {/* Blurred colour field — everything else floats as glass on top */}
      <Backdrop />
      {/* Inertial scrolling — the substrate every scrub effect depends on */}
      <SmoothScroll enabled={heavy} />
      {/* High-Impact Opening Shutter Wipe & Numerical Preloader */}
      {/* Mounted ONLY until completed, so scroll state updates NEVER re-trigger it */}
      {!isIntroDone && (
        <OpeningAnimation onComplete={handleIntroComplete} />
      )}

      {/* Top Floating Glassmorphism Navbar with Language Switcher */}
      <Navbar activeSection={activeSection} />

      {/* Main Content Area */}
      <main>
        {/* 1. Cover — one headline, two actions, four discipline tiles */}
        <HeroSection
          onExplore={() => scrollToSection('projects')}
          onContact={() => scrollToSection('contact')}
          isIntroDone={isIntroDone}
        />

        {/* 1.5 Client wordmark strip — the trust line right off the cover */}
        <BrandMarquee />

        {/* 2. Practice — metrics and career as hairline rows */}
        <ExperienceSection />

        {/* 3. Work — a list; tapping a row opens its detail sheet */}
        <ProjectsSection />

        {/* 4. Capabilities — chapters and the kit, icon-led */}
        <StrengthsSection />

        {/* 5. Contact — channels and the inquiry form, both on glass */}
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
