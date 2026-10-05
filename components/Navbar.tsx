import React, { useState, useEffect, useCallback } from 'react';
import { useLanguage } from '../LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';
import { scrollToTarget } from './SmoothScroll';
import { useScrollLock } from '../hooks/useScrollLock';
import { ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  activeSection: string;
}

const Navbar: React.FC<NavbarProps> = ({ activeSection }) => {
  const { ui } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = useCallback(() => setIsMobileMenuOpen(false), []);

  // Freeze the page behind the mobile index (and stop Lenis with it).
  useScrollLock(isMobileMenuOpen, closeMenu);

  // If the viewport grows into the desktop layout while the index is open, the
  // overlay would sit there with no way to reach it.
  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const mq = window.matchMedia('(min-width: 640px)');
    const sync = () => {
      if (mq.matches) setIsMobileMenuOpen(false);
    };
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, [isMobileMenuOpen]);

  const navItems = [
    { id: 'hero', label: ui.nav.overview },
    { id: 'experience', label: ui.nav.experience },
    { id: 'projects', label: ui.nav.works },
    { id: 'strengths', label: ui.nav.capabilities },
    { id: 'contact', label: ui.nav.contact },
  ];

  const scrollTo = (id: string) => {
    setIsMobileMenuOpen(false);
    scrollToTarget(id, -72);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-ink/85 backdrop-blur-xl border-b border-rule py-3'
            : 'bg-transparent border-b border-transparent py-5'
        }`}
      >
        <div className="max-w-1700 mx-auto px-6 md:px-12 flex items-center justify-between gap-6">
          {/* Masthead brand */}
          <button
            onClick={() => scrollTo('hero')}
            className="group text-left focus:outline-none cursor-pointer shrink-0"
          >
            <span className="block font-display text-lg sm:text-xl leading-none text-paper tracking-tight">
              {ui.nav.brand}
            </span>
            <span className="block eyebrow mt-1 text-[9px] tracking-[0.28em] text-faint group-hover:text-muted transition-colors">
              {ui.hero.roleBadge}
            </span>
          </button>

          {/* Desktop nav — the running-head of the magazine */}
          <nav className="hidden lg:flex items-center gap-7">
            {navItems.map((item, idx) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className={`relative group py-1 font-mono text-[10px] uppercase tracking-[0.2em] transition-colors cursor-pointer ${
                    isActive ? 'text-paper' : 'text-faint hover:text-paper'
                  }`}
                >
                  <span className="mr-1.5 text-[9px] text-faint/70">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  {item.label}
                  <span
                    className={`absolute left-0 -bottom-1 h-px bg-paper transition-all duration-500 ${
                      isActive ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}
                  />
                </button>
              );
            })}
          </nav>

          {/* Right rail */}
          <div className="hidden sm:flex items-center gap-4 shrink-0">
            <LanguageSwitcher />
            <a
              href="https://naver.me/5fdFDeXr"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden xl:inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-[0.18em] text-muted hover:text-paper transition-colors link-rule"
            >
              {ui.nav.portfolioDoc}
              <ArrowUpRight size={10} />
            </a>
            <button
              onClick={() => scrollTo('contact')}
              className="rounded-full bg-paper px-5 py-2 font-mono text-[10px] uppercase tracking-[0.18em] text-ink hover:bg-ink-deep hover:text-paper transition-colors duration-300 cursor-pointer"
            >
              {ui.nav.getInTouch}
            </button>
          </div>

          {/* Mobile trigger */}
          <div className="flex items-center gap-3 sm:hidden">
            <LanguageSwitcher />
            <button
              onClick={() => setIsMobileMenuOpen((v) => !v)}
              className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted hover:text-paper transition-colors cursor-pointer p-2 -mr-2"
              aria-expanded={isMobileMenuOpen}
              aria-label="Toggle Navigation"
            >
              {isMobileMenuOpen ? 'Close' : 'Index'}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile index — a table of contents */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-ink pt-28 pb-10 pb-safe px-6 flex flex-col justify-between overflow-y-auto overscroll-contain">
          <nav className="border-t border-rule">
            {navItems.map((item, idx) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="w-full text-left flex items-baseline gap-4 py-4 border-b border-rule-soft cursor-pointer"
              >
                <span className="font-mono text-[10px] text-muted">
                  {String(idx + 1).padStart(2, '0')}
                </span>
                <span className="font-display text-3xl text-paper leading-none">
                  {item.label}
                </span>
              </button>
            ))}
          </nav>

          <div className="pt-8 space-y-4">
            <button
              onClick={() => scrollTo('contact')}
              className="w-full rounded-full bg-paper py-3.5 font-mono text-[10px] uppercase tracking-[0.2em] text-ink hover:bg-ink-deep hover:text-paper transition-colors"
            >
              {ui.nav.getInTouch}
            </button>
            <div className="text-center eyebrow">ro3eandcat@gmail.com</div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
