import React from 'react';
import { useSiteContent } from '../ContentContext';

/* Local default — replaced by SiteSettings.hero.video when the CMS is
   configured. Keeping it here means the hero never goes empty. */
const HERO_VIDEO_FALLBACK = 'hero-keyflip.mp4';

const HeroSection: React.FC = () => {
  const { settings, t } = useSiteContent();

  const headline1 = t(settings.hero.headline1);
  const headline2 = t(settings.hero.headline2);
  const videoSrc = settings.hero.video?.url || HERO_VIDEO_FALLBACK;

  // The sub reads as two quiet lines, split from the discipline string.
  const parts = (t(settings.hero.narrative) || '').split('·').map((s: string) => s.trim());
  const subLine1 = parts.slice(0, 3).join('  ·  ');
  const subLine2 = parts.slice(3).join('  ·  ');

  return (
    <section className="stage" id="hero">
      <div className="plate">
        <video
          className="plate-video"
          autoPlay={settings.hero.video?.autoplay !== false}
          muted={settings.hero.video?.muted !== false}
          loop={settings.hero.video?.loop !== false}
          playsInline
          preload="auto"
          aria-hidden="true"
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      </div>

      <div className="hero-flow">
        <h1 className="headline rise-headline">
          <span>{headline1}</span>
          <span>{headline2}</span>
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
