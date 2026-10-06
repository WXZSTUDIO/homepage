import React from 'react';
import { useLanguage } from '../LanguageContext';

/* Full-bleed looping video — the only hero visual. */
const HERO_VIDEO = 'hero-keyflip.mp4';

const HeroSection: React.FC = () => {
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

      </div>
    </section>
  );
};

export default HeroSection;
