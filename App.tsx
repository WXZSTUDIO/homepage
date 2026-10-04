import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const App: React.FC = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Lock body overflow while mobile drawer is open
  useEffect(() => {
    if (isDrawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isDrawerOpen]);

  const navLinks = ['Story', 'Jobs', 'Message'];
  const socialLinks = ['Instagram', 'TikTok', 'YouTube'];

  return (
    <section className="relative h-[100dvh] w-full overflow-hidden bg-black font-hn text-cream select-none">
      {/* 1. Background image (full-bleed, behind everything) */}
      <img
        src="https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260729_022513_486985a2-ac8c-4278-91a8-071dcd9fcaff.png&w=1280&q=85"
        alt=""
        className="absolute inset-0 h-full w-full object-cover anim-fade-in"
      />

      {/* 2. Marquee name (z-10) */}
      <div 
        className="absolute inset-x-0 top-[16vh] sm:top-[14vh] z-10 overflow-hidden anim-fade-up pointer-events-none"
        style={{ animationDelay: '500ms' }}
      >
        <div className="marquee flex w-max whitespace-nowrap font-hn text-[16vh] sm:text-[26vh] leading-none text-cream tracking-tight">
          <span className="pr-[6vw]">Marcus &mdash; Bennet&nbsp;</span>
          <span className="pr-[6vw]">Marcus &mdash; Bennet&nbsp;</span>
        </div>
      </div>

      {/* 3. Horizontal cream rule (z-10) */}
      <div 
        className="absolute inset-x-6 sm:inset-x-10 bottom-[5.5rem] sm:bottom-28 z-10 h-0.5 bg-cream anim-line"
      />

      {/* 4. Desktop footer & Mobile footer (z-30 on mobile, sm:z-10 on desktop) */}
      <footer className="absolute inset-x-0 bottom-0 z-30 sm:z-10 flex items-end justify-between px-6 pb-5 sm:px-10 sm:pb-8 text-xs sm:text-sm leading-relaxed font-hn text-cream pointer-events-auto">
        {/* Left: 3 lines */}
        <div 
          className="anim-fade-up flex flex-col"
          style={{ animationDelay: '1400ms' }}
        >
          <span>Visuals Composer</span>
          <span>Digital Crafter</span>
          <span>Obsessed by The Office</span>
        </div>

        {/* Right: 2 lines */}
        <div 
          className="anim-fade-up text-right flex flex-col"
          style={{ animationDelay: '1550ms' }}
        >
          <span>A homage to</span>
          <span>Marcus Holloway</span>
        </div>
      </footer>

      {/* 5. Front portrait (cutout overlay, above marquee, pointer-events none) (z-20) */}
      <img
        src="https://stone-expand-60400629.figma.site/_assets/v11/8da570354e86aa0d44ac3e4aa335a72c8e750d68.png"
        alt="Portrait"
        className="absolute inset-0 h-full w-full object-cover pointer-events-none z-20 anim-rise-in"
      />

      {/* 6. Header (z-30) */}
      <header className="absolute inset-x-0 top-0 z-30 flex items-start justify-between px-6 pt-6 sm:px-10 sm:pt-8 text-cream">
        {/* Left Brand */}
        <a
          href="#"
          className="font-hn text-lg tracking-wide text-cream transition-opacity duration-300 hover:opacity-60 anim-fade-up inline-block"
          style={{ animationDelay: '800ms' }}
        >
          Marcus
        </a>

        {/* Desktop Right Cluster (hidden on mobile) */}
        <div className="hidden sm:flex items-start gap-16 lg:gap-24">
          {/* Year */}
          <span 
            className="text-sm font-hn text-cream anim-fade-up"
            style={{ animationDelay: '900ms' }}
          >
            2025
          </span>

          {/* Navigation Column */}
          <nav className="flex flex-col gap-0.5 text-sm font-hn text-cream">
            {navLinks.map((item, index) => (
              <a
                key={item}
                href="#"
                className="transition-opacity duration-300 hover:opacity-60 anim-fade-up"
                style={{ animationDelay: `${1000 + index * 80}ms` }}
              >
                {item}
              </a>
            ))}
          </nav>

          {/* Socials Column */}
          <div className="flex flex-col gap-0.5 text-sm font-hn text-cream">
            {socialLinks.map((item, index) => (
              <a
                key={item}
                href="#"
                className="transition-opacity duration-300 hover:opacity-60 anim-fade-up"
                style={{ animationDelay: `${1150 + index * 80}ms` }}
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </header>

      {/* 7. Mobile Hamburger Trigger Button (z-50, always on top) */}
      <button
        type="button"
        onClick={() => setIsDrawerOpen(!isDrawerOpen)}
        className="sm:hidden fixed right-6 top-6 z-50 h-10 w-10 flex items-center justify-center text-cream focus:outline-none anim-fade-up"
        style={{ animationDelay: '900ms' }}
        aria-label={isDrawerOpen ? 'Close navigation' : 'Open navigation'}
      >
        <div className="relative h-4 w-6 flex flex-col justify-between">
          <span
            className={`h-[2px] w-6 bg-cream rounded-full transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] origin-center ${
              isDrawerOpen ? 'translate-y-[7px] rotate-45' : ''
            }`}
          />
          <span
            className={`h-[2px] w-6 bg-cream rounded-full transition-opacity duration-300 ${
              isDrawerOpen ? 'opacity-0' : 'opacity-100'
            }`}
          />
          <span
            className={`h-[2px] w-6 bg-cream rounded-full transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] origin-center ${
              isDrawerOpen ? '-translate-y-[7px] -rotate-45' : ''
            }`}
          />
        </div>
      </button>

      {/* 8. Mobile Drawer Backdrop (z-40) */}
      <div
        onClick={() => setIsDrawerOpen(false)}
        className={`sm:hidden fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity duration-500 ${
          isDrawerOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden="true"
      />

      {/* 9. Mobile Drawer Panel (z-40) */}
      <aside
        className={`sm:hidden fixed top-0 bottom-0 right-0 z-40 w-[80%] max-w-sm bg-[#141414] px-8 py-10 flex flex-col justify-between transition-transform duration-600 ease-[cubic-bezier(0.76,0,0.24,1)] ${
          isDrawerOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation Menu"
      >
        {/* Close Button with Lucide X inside Drawer */}
        <button
          type="button"
          onClick={() => setIsDrawerOpen(false)}
          className={`absolute right-6 top-6 text-cream cursor-pointer transition-all duration-300 ${
            isDrawerOpen ? 'rotate-0 opacity-100 delay-300' : 'rotate-90 opacity-0 pointer-events-none'
          }`}
          aria-label="Close menu"
        >
          <X size={26} strokeWidth={1.5} />
        </button>

        {/* Top: Site Index */}
        <div className="pt-12">
          <p
            className={`text-xs uppercase tracking-[0.2em] text-cream/50 font-hn mb-6 transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] ${
              isDrawerOpen ? 'translate-y-0 opacity-100 delay-250' : 'translate-y-4 opacity-0'
            }`}
          >
            Site Index
          </p>

          <nav className="flex flex-col gap-5">
            {navLinks.map((item, index) => (
              <a
                key={item}
                href="#"
                onClick={() => setIsDrawerOpen(false)}
                className={`text-4xl font-hn font-normal text-cream hover:opacity-60 transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] ${
                  isDrawerOpen ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
                }`}
                style={{
                  transitionDelay: isDrawerOpen ? `${300 + index * 80}ms` : '0ms',
                }}
              >
                {item}
              </a>
            ))}
          </nav>
        </div>

        {/* Bottom: Find Me */}
        <div className="pb-4">
          <p
            className={`text-xs uppercase tracking-[0.2em] text-cream/50 font-hn mb-4 transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] ${
              isDrawerOpen ? 'translate-y-0 opacity-100 delay-500' : 'translate-y-4 opacity-0'
            }`}
          >
            Find Me
          </p>

          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-cream font-hn">
            {socialLinks.map((item, index) => (
              <a
                key={item}
                href="#"
                onClick={() => setIsDrawerOpen(false)}
                className={`hover:opacity-60 transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] ${
                  isDrawerOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                }`}
                style={{
                  transitionDelay: isDrawerOpen ? `${550 + index * 60}ms` : '0ms',
                }}
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </aside>
    </section>
  );
};

export default App;
