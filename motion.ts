/**
 * Fluid-interface springs.
 *
 * Apple specifies motion as damping ratio + response time, not duration.
 * Framer Motion wants stiffness/damping, so we convert for mass = 1:
 *
 *   omega     = 4 / (dampingRatio * response)   // 2% settling criterion
 *   stiffness = omega^2
 *   damping   = 2 * dampingRatio * omega
 *
 * dampingRatio 1.0 = critically damped, arrives without bouncing.
 * dampingRatio 0.8 = the small overshoot Apple reserves for sheets and
 * anything the user flung with a gesture.
 */

export type Spring = {
  type: 'spring';
  stiffness: number;
  damping: number;
  mass: number;
};

const spring = (response: number, dampingRatio: number): Spring => {
  const omega = 4 / (dampingRatio * response);
  return {
    type: 'spring',
    stiffness: Math.round(omega * omega),
    damping: Math.round(2 * dampingRatio * omega * 10) / 10,
    mass: 1,
  };
};

/** Sheets and detail panels — 0.3s response, a touch of overshoot. */
export const springSheet = spring(0.3, 0.8);

/** Plain travel: cards lifting, lists settling. No bounce. */
export const springMove = spring(0.4, 1.0);

/** Rotation / orientation flips. Slight bounce is expected. */
export const springRotate = spring(0.4, 0.8);

/** Scrubbing fades where a spring would look elastic. */
export const fade = (duration = 0.28) => ({
  duration,
  ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
});
