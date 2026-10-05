import { useEffect, useState } from 'react';

export interface MotionProfile {
  /** User explicitly asked for reduced motion — no scrub, no parallax, no pin. */
  reduced: boolean;
  /** Full depth effects are safe: desktop, fine pointer, motion allowed. */
  heavy: boolean;
}

const REDUCE_QUERY = '(prefers-reduced-motion: reduce)';
const COARSE_QUERY = '(hover: none), (pointer: coarse)';

function readProfile(): MotionProfile {
  if (typeof window === 'undefined') return { reduced: false, heavy: false };

  const reduced = window.matchMedia(REDUCE_QUERY).matches;
  const coarse = window.matchMedia(COARSE_QUERY).matches;
  // Pin + scrub fall apart on narrow viewports (mobile URL bar resizes the
  // viewport mid-scroll and the pinned element drifts), so keep them on desktop.
  const narrow = window.innerWidth < 1024;

  return { reduced, heavy: !reduced && !coarse && !narrow };
}

/**
 * Tells the page how much motion it is allowed to use.
 * Every scroll-driven effect must branch on `heavy` — never assume desktop.
 */
export function useMotionProfile(): MotionProfile {
  const [profile, setProfile] = useState<MotionProfile>(readProfile);

  useEffect(() => {
    const mqReduce = window.matchMedia(REDUCE_QUERY);
    const mqCoarse = window.matchMedia(COARSE_QUERY);
    const sync = () => setProfile(readProfile());

    mqReduce.addEventListener('change', sync);
    mqCoarse.addEventListener('change', sync);
    window.addEventListener('resize', sync);

    return () => {
      mqReduce.removeEventListener('change', sync);
      mqCoarse.removeEventListener('change', sync);
      window.removeEventListener('resize', sync);
    };
  }, []);

  return profile;
}
