import React, { useEffect, useRef } from 'react';
import { useSiteContent } from '../ContentContext';

/* Local defaults — replaced by SiteSettings.hero when the CMS is
   configured. Keeping them here means the hero never goes empty. */
const HERO_VIDEO_FALLBACK = 'hero-keyflip.mp4';
const HERO_POSTER_FALLBACK = 'hero-poster.jpg';

const HeroSection: React.FC = () => {
  const { settings, t } = useSiteContent();
  const videoRef = useRef<HTMLVideoElement>(null);

  const headline1 = t(settings.hero.headline1);
  const headline2 = t(settings.hero.headline2);
  const videoSrc = settings.hero.video?.url || HERO_VIDEO_FALLBACK;
  const posterSrc = settings.hero.poster || HERO_POSTER_FALLBACK;
  const wantAutoplay = settings.hero.video?.autoplay !== false;

  // The sub reads as two quiet lines, split from the discipline string.
  const parts = (t(settings.hero.narrative) || '').split('·').map((s: string) => s.trim());
  const subLine1 = parts.slice(0, 3).join('  ·  ');
  const subLine2 = parts.slice(3).join('  ·  ');

  /* ----------------------------------------------------------------
     Mobile autoplay.

     iOS / Android only allow a video to start on its own when the
     element is *already* muted and marked inline at the moment play()
     is attempted — relying on the JSX attributes alone is unreliable
     (React applies `muted` as a property after insertion, and some
     browsers reject the first play()). So: force the flags imperatively,
     then retry on every event that can unlock playback — including the
     first user gesture, which covers the browsers that gate autoplay
     until the page has been touched. If everything fails, the poster
     frame stays visible instead of a black box.
     ---------------------------------------------------------------- */
  useEffect(() => {
    const v = videoRef.current;
    if (!v || !wantAutoplay) return;

    const arm = () => {
      // must be set before play() — this is what mobile browsers check
      v.muted = true;
      v.defaultMuted = true;
      v.playsInline = true;
      (v as any).webkitPlaysInline = true;
      v.setAttribute('playsinline', '');
      v.setAttribute('webkit-playsinline', '');
      v.setAttribute('muted', '');
    };

    let retry: number | undefined;
    const tryPlay = () => {
      if (document.hidden) return;
      arm();
      const p = v.play();
      if (p && typeof (p as Promise<void>).catch === 'function') {
        (p as Promise<void>).catch(() => {
          if (retry) window.clearTimeout(retry);
          retry = window.setTimeout(() => {
            arm();
            v.play().catch(() => undefined);
          }, 400);
        });
      }
    };

    arm();
    tryPlay();
    v.addEventListener('loadedmetadata', tryPlay);
    v.addEventListener('canplay', tryPlay);
    v.addEventListener('suspend', tryPlay);

    const onVisible = () => {
      if (document.visibilityState === 'visible') tryPlay();
    };
    document.addEventListener('visibilitychange', onVisible);

    // First gesture unlocks the stricter browsers (iOS Low Power, data saver)
    const onGesture = () => tryPlay();
    window.addEventListener('touchstart', onGesture, { once: true, passive: true });
    window.addEventListener('pointerdown', onGesture, { once: true });
    window.addEventListener('click', onGesture, { once: true });

    return () => {
      if (retry) window.clearTimeout(retry);
      v.removeEventListener('loadedmetadata', tryPlay);
      v.removeEventListener('canplay', tryPlay);
      v.removeEventListener('suspend', tryPlay);
      document.removeEventListener('visibilitychange', onVisible);
      window.removeEventListener('touchstart', onGesture);
      window.removeEventListener('pointerdown', onGesture);
      window.removeEventListener('click', onGesture);
    };
  }, [wantAutoplay, videoSrc]);

  return (
    <section className="stage" id="hero">
      <div className="plate">
        <video
          ref={videoRef}
          className="plate-video"
          autoPlay={wantAutoplay}
          muted
          defaultMuted
          loop={settings.hero.video?.loop !== false}
          playsInline
          poster={posterSrc}
          preload="auto"
          disablePictureInPicture
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
