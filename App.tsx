import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import ExperienceSection from './components/ExperienceSection';
import ProjectsSection from './components/ProjectsSection';
import StrengthsSection from './components/StrengthsSection';
import ContactSection from './components/ContactSection';

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState('hero');

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
    <div className="min-h-screen bg-background text-white selection:bg-accent selection:text-black">
      {/* Top Floating Glassmorphism Navbar */}
      <Navbar activeSection={activeSection} />

      {/* Main Content Area */}
      <main>
        {/* 1. Full-screen Hero Section with Video Background */}
        <HeroSection
          onExplore={() => scrollToSection('projects')}
          onContact={() => scrollToSection('contact')}
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

export default App;
