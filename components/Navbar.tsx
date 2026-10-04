import React, { useState, useEffect } from 'react';
import { useLanguage } from '../LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';
import { ArrowUpRight, Menu, X } from 'lucide-react';

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
            ? 'bg-black/90 backdrop-blur-xl border-b border-white/[0.08] py-3'
            : 'bg-black/40 backdrop-blur-sm py-4'
        }`}
      >
        <div className="max-w-1700 mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Brand Mark */}
          <button
            onClick={() => scrollTo('hero')}
            className="flex items-center space-x-2 text-left focus:outline-none cursor-pointer"
          >
            <span className="font-semibold text-sm sm:text-base text-white tracking-[-0.02em] hover:text-[#a1a1a6] transition-colors">
              {ui.nav.brand}
            </span>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-8 text-xs font-normal tracking-tight">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className={`py-1 transition-colors cursor-pointer ${
                    isActive ? 'text-white font-medium' : 'text-[#86868b] hover:text-white'
                  }`}
                >
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Action Area: Language Switcher + Fast Touchpoint */}
          <div className="hidden sm:flex items-center space-x-3 text-xs">
            <LanguageSwitcher />

            <a
              href="https://naver.me/5fdFDeXr"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#86868b] hover:text-white transition-colors flex items-center space-x-1 px-3 py-1.5 rounded-full border border-white/[0.1] hover:border-white/20"
            >
              <span>{ui.nav.portfolioDoc}</span>
              <ArrowUpRight size={11} />
            </a>

            <button
              onClick={() => scrollTo('contact')}
              className="px-4 py-1.5 rounded-full bg-white text-black font-medium hover:bg-[#e5e5ea] transition-colors cursor-pointer"
            >
              <span>{ui.nav.getInTouch}</span>
            </button>
          </div>

          {/* Mobile Menu Trigger & Mobile Lang */}
          <div className="flex items-center space-x-2 lg:hidden">
            <LanguageSwitcher />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-1.5 text-[#86868b] hover:text-white focus:outline-none cursor-pointer"
              aria-label="Toggle Navigation"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-black/95 backdrop-blur-2xl pt-24 px-6 flex flex-col justify-between pb-12">
          <div className="space-y-3">
            <div className="text-xs uppercase tracking-widest text-[#86868b] mb-4 font-mono">
              {ui.nav.menu}
            </div>

            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="w-full text-left py-3 text-lg font-medium text-white hover:text-[#a1a1a6] transition-colors border-b border-white/[0.06]"
              >
                <span>{item.label}</span>
              </button>
            ))}
          </div>

          <div className="pt-6 border-t border-white/[0.08] space-y-3">
            <button
              onClick={() => scrollTo('contact')}
              className="w-full py-3 rounded-full bg-white text-black font-medium text-xs tracking-tight"
            >
              <span>{ui.nav.getInTouch}</span>
            </button>
            <div className="text-center text-xs font-mono text-[#86868b]">
              ro3eandcat@gmail.com
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
