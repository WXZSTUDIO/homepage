import { useEffect } from 'react';

/**
 * Freeze the page behind an overlay. Body overflow alone is not enough: when
 * Lenis is mounted it drives window scroll from its own rAF loop, so it has to
 * be stopped explicitly or the page keeps moving under the overlay.
 *
 * Also wires Escape → callback, which is how touch-less keyboards and desktop
 * users close things.
 */
export function useScrollLock(locked: boolean, onEscape?: () => void) {
  useEffect(() => {
    if (!locked) return;

    const lenis = window.__lenis;
    lenis?.stop();

    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previous;
      lenis?.start();
    };
  }, [locked]);

  useEffect(() => {
    if (!locked || !onEscape) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onEscape();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [locked, onEscape]);
}
