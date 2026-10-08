import React, { useState, useEffect, useCallback } from 'react';
import { useLanguage } from '../LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';
import { scrollToTarget } from './SmoothScroll';
import { useScrollLock } from '../hooks/useScrollLock';
import { ChevronRight } from './Icons';

interface NavbarProps {
  activeSection: string;
}

/* Abstract geometric mark — angular bolt geometry, one gradient. */
export const BrandMark: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 31.5 48.5" className={className} aria-hidden="true">
    <defs>
      <linearGradient id="bg1" x1="8" y1="0" x2="34.1" y2="28.9" gradientUnits="userSpaceOnUse">
        <stop offset="0" stopColor="#9e9e9e" />
        <stop offset=".28" stopColor="#a6a6a6" />
        <stop offset=".34" stopColor="#a3a3a3" />
        <stop offset=".40" stopColor="#3a3a3a" />
        <stop offset=".55" stopColor="#414141" />
        <stop offset=".60" stopColor="#7a7a7a" />
        <stop offset=".68" stopColor="#8e8e8e" />
        <stop offset=".80" stopColor="#a9a9a9" />
        <stop offset=".95" stopColor="#c4c4c4" />
        <stop offset="1" stopColor="#cccccc" />
      </linearGradient>
    </defs>
    <path d="M21.5 0 L21.5 19.5 L31.5 19.5 L31.5 29 L10 48.5 L10 28.5 L0.5 28.5 L0.5 18.5 Z" fill="url(#bg1)" />
    <rect x="0.5" y="18.5" width="9" height="10" fill="#fdfdfd" />
    <rect x="22" y="19.5" width="9.5" height="9.5" fill="#fdfdfd" />
  </svg>
);

const Navbar: React.FC<NavbarProps> = ({ activeSection }) => {
  const { ui } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = useCallback(() => setIsOpen(false), []);
  useScrollLock(isOpen, closeMenu);

  // Landscape resize while the overlay is open would strand it.
  useEffect(() => {
    if (!isOpen) return;
    const mq = window.matchMedia('(min-aspect-ratio: 11/10)');
    const sync = () => {
      if (mq.matches) setIsOpen(false);
    };
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen]);

  const navItems = [
    { id: 'hero', label: ui.nav.overview },
    { id: 'experience', label: ui.nav.experience },
    { id: 'projects', label: ui.nav.works },
    { id: 'strengths', label: ui.nav.capabilities },
    { id: 'contact', label: ui.nav.contact },
  ];

  const scrollTo = (id: string) => {
    setIsOpen(false);
    scrollToTarget(id, -72);
  };

  return (
    <div className={isOpen ? 'is-open' : ''}>
      <header
        className={`topbar transition-[backdrop-filter] duration-500 ${
          isScrolled ? 'is-scrolled backdrop-blur-md' : ''
        }`}
      >
        <div className="topbar-inner">
          {/* Text wordmark — "DESIGN BY <name>" */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              scrollTo('hero');
            }}
            className="brand-text rise"
            aria-label="Home"
          >
            DESIGN BY <b>{ui.nav.brand}</b>
          </a>

          {/* Centered links with hairline separators — single line */}
          <nav className="links rise-nav" aria-label="Primary">
            {navItems.map((item, idx) => (
              <React.Fragment key={item.id}>
                {idx > 0 && (
                  <span className="links-sep" aria-hidden="true">
                    /
                  </span>
                )}
                <a
                  href={`#${item.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollTo(item.id);
                  }}
                  className={activeSection === item.id ? 'is-active' : ''}
                >
                  {item.label}
                </a>
              </React.Fragment>
            ))}
          </nav>

          {/* Right cluster: language switcher only */}
          <div className="topbar-actions rise">
            <LanguageSwitcher />
          </div>

          {/* Portrait: burger only */}
          <button
            className="burger md:hidden rise"
            onClick={() => setIsOpen((v) => !v)}
            aria-expanded={isOpen}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
          >
            <i />
            <i />
          </button>
        </div>
      </header>

      {/* Full-screen menu overlay (portrait) */}
      <nav className="menu" aria-hidden={!isOpen}>
        <div className="flex-1 flex flex-col justify-center px-7 pt-20 pb-10 pb-safe">
          <p className="menu-item eyebrow mb-8">{ui.nav.menu}</p>
          <ul>
            {navItems.map((item, idx) => (
              <li key={item.id} className="menu-item border-b border-rule-soft">
                <a
                  href={`#${item.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollTo(item.id);
                  }}
                  className="flex items-center justify-between py-5 text-[26px] min-[380px]:text-[30px] font-medium text-paper tracking-tight"
                >
                  {item.label}
                  <ChevronRight size={18} className="text-faint" />
                </a>
              </li>
            ))}
          </ul>

          <div className="menu-foot mt-10 flex flex-col gap-4">
            <button
              onClick={() => scrollTo('contact')}
              className="pill w-full justify-center py-4 text-[15px]"
            >
              {ui.nav.getInTouch}
            </button>
            <div className="flex items-center justify-between gap-3">
              <LanguageSwitcher isMobile />
              <a
                href="https://naver.me/5fdFDeXr"
                target="_blank"
                rel="noopener noreferrer"
                className="ghost text-xs whitespace-nowrap shrink-0"
              >
                {ui.nav.portfolioDoc}
              </a>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
