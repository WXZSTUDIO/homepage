import React, { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export type SmoothScrollInstance = Lenis;

declare global {
  interface Window {
    __lenis?: SmoothScrollInstance;
  }
}

interface SmoothScrollProps {
  /** Only mounted when the motion profile says effects are safe. */
  enabled: boolean;
}

/**
 * Inertial scrolling. Scroll-linked scrubbing reads the raw wheel delta, which
 * arrives in coarse steps — without interpolation every frame animation visibly
 * judders. Lenis smooths the position signal before any of it reaches GSAP or
 * framer-motion.
 */
const SmoothScroll: React.FC<SmoothScrollProps> = ({ enabled }) => {
  useEffect(() => {
    if (!enabled) return;

    const lenis = new Lenis({
      // lerp (not duration): a fixed per-frame catch-up keeps the scrub
      // responsive during long scrolls instead of dragging behind them.
      lerp: 0.1,
      wheelMultiplier: 1,
      smoothWheel: true,
      syncTouch: false,
    });

    window.__lenis = lenis;

    // Keep GSAP's ScrollTrigger in lockstep with the interpolated position.
    const update = () => ScrollTrigger.update();
    lenis.on('scroll', update);

    // Drive Lenis from GSAP's ticker so both share one rAF loop.
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.off('scroll', update);
      gsap.ticker.remove(tick);
      gsap.ticker.lagSmoothing(500, 33);
      lenis.destroy();
      delete window.__lenis;
    };
  }, [enabled]);

  return null;
};

export default SmoothScroll;

/** Anchor navigation that respects the smoothed scroller when it is active. */
export function scrollToTarget(target: string | HTMLElement, offset = -80) {
  const el =
    typeof target === 'string' ? document.getElementById(target) : target;
  if (!el) return;

  const lenis = window.__lenis;
  if (lenis) {
    lenis.scrollTo(el, { offset, duration: 1.2 });
    return;
  }

  const top = el.getBoundingClientRect().top + window.scrollY + offset;
  window.scrollTo({ top, behavior: 'smooth' });
}
