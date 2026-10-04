import React, { useState, useEffect } from 'react';
import { useLanguage } from '../LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';
import { ArrowUpRight, Menu, X, Mail } from 'lucide-react';

interface NavbarProps {
  activeSection: string;
}

const Navbar: React.FC<NavbarProps> = ({ activeSection }) => {
  const { ui } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'hero', label: ui.nav.overview },
    { id: 'experience', label: ui.nav.experience },
    { id: 'projects', label: ui.nav.works },
    { id: 'strengths', label: ui.nav.capabilities },
    { id: 'contact', label: ui.nav.contact },
  ];

  const scrollTo = (id: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-black/80 backdrop-blur-xl border-b border-white/[0.08] py-3.5'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-1700 mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Brand Mark */}
          <button
            onClick={() => scrollTo('hero')}
            className="flex items-center space-x-2.5 text-left focus:outline-none group"
          >
            <span className="font-semibold text-base text-[#f5f5f7] tracking-[-0.02em] group-hover:text-accent transition-colors">
              {ui.nav.brand}
            </span>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-7 text-[13px] font-normal tracking-[-0.01em]">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className={`relative py-1 transition-colors duration-200 ${
                    isActive ? 'text-[#f5f5f7] font-medium' : 'text-[#86868b] hover:text-[#f5f5f7]'
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#f5f5f7] rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Area: Language Switcher + Quick Actions */}
          <div className="hidden sm:flex items-center space-x-3 text-xs">
            {/* Apple-style Language Switcher */}
            <LanguageSwitcher />

            <a
              href="https://naver.me/5fdFDeXr"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#86868b] hover:text-[#f5f5f7] transition-colors flex items-center space-x-1 px-3 py-1.5 rounded-full border border-white/[0.08] hover:border-white/[0.2]"
            >
              <span>{ui.nav.portfolioDoc}</span>
              <ArrowUpRight size={12} />
            </a>

            <button
              onClick={() => scrollTo('contact')}
              className="px-4 py-2 rounded-full bg-[#f5f5f7] text-black font-medium hover:bg-white transition-all duration-200 active:scale-95"
            >
              <span>{ui.nav.getInTouch}</span>
            </button>
          </div>

          {/* Mobile Menu Trigger & Mobile Lang */}
          <div className="flex items-center space-x-2 lg:hidden">
            <LanguageSwitcher />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-[#86868b] hover:text-[#f5f5f7] focus:outline-none"
              aria-label="Toggle Navigation"
            >
              {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-black/95 backdrop-blur-2xl pt-24 px-6 flex flex-col justify-between pb-12 animate-fade-in">
          <div className="space-y-4">
            <div className="text-xs uppercase tracking-wider text-[#86868b] mb-4">
              {ui.nav.menu}
            </div>

            <div className="mb-6">
              <LanguageSwitcher isMobile />
            </div>

            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="w-full text-left py-3 text-xl font-medium text-[#f5f5f7] hover:text-accent transition-colors flex items-center justify-between border-b border-white/[0.06]"
              >
                <span>{item.label}</span>
              </button>
            ))}
          </div>

          <div className="pt-6 border-t border-white/[0.08] space-y-3">
            <button
              onClick={() => scrollTo('contact')}
              className="w-full py-3.5 rounded-full bg-[#f5f5f7] text-black font-medium text-sm flex items-center justify-center space-x-2"
            >
              <Mail size={15} />
              <span>{ui.nav.getInTouch}</span>
            </button>
            <div className="text-center text-xs text-[#86868b]">
              ro3eandcat@gmail.com
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
