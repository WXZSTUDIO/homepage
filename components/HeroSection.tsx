import React from 'react';
import { useLanguage } from '../LanguageContext';

/* Full-bleed looping video — the only hero visual. */
const HERO_VIDEO =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260808_112712_da9d53df-6d27-4b12-bdf6-aa9dc2622bdf.mp4';

interface HeroSectionProps {
  onExplore: () => void;
  onContact: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onExplore, onContact }) => {
  const { ui } = useLanguage();

  // The sub reads as two quiet lines, split from the discipline string.
  const parts = (ui.hero.narrative1 || '').split('·').map((s: string) => s.trim());
  const subLine1 = parts.slice(0, 3).join('  ·  ');
  const subLine2 = parts.slice(3).join('  ·  ');

  return (
    <section className="stage" id="hero">
      <div className="plate">
        <video
          className="plate-video"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
        >
          <source src={HERO_VIDEO} type="video/mp4" />
        </video>
      </div>

      <div className="hero-flow">
        <h1 className="headline rise-headline">
          <span>{ui.hero.headline1}</span>
          <span>{ui.hero.headline2}</span>
        </h1>

        <p className="sub rise-sub">
          <span>{subLine1}</span>
          {subLine2 && <span>{subLine2}</span>}
        </p>

        <div className="actions">
          <button onClick={onContact} className="pill pill-cta rise-cta">
            <span>{ui.hero.btnContact}</span>
          </button>
          <button onClick={onExplore} className="ghost ghost-cta rise-cta">
            {ui.hero.btnExplore}
          </button>
        </div>

      </div>
    </section>
  );
};

export default HeroSection;
