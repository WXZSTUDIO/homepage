import React, { useEffect, useRef, useState } from 'react';
import { useSiteContent } from '../ContentContext';

/* ------------------------------------------------------------------
   Background music — opt-in only.

   Browsers block audio until the visitor interacts, so nothing plays
   on load. A small control lets the visitor start/stop it; the choice
   (and the volume) is remembered in localStorage.
   ------------------------------------------------------------------ */

const KEY_ON = 'wxz_bgm_on';
const KEY_VOL = 'wxz_bgm_vol';

const readBool = (k: string, d: boolean): boolean => {
  try {
    const v = localStorage.getItem(k);
    return v === null ? d : v === 'true';
  } catch {
    return d;
  }
};
const readNum = (k: string, d: number): number => {
  try {
    const v = localStorage.getItem(k);
    return v === null ? d : Number(v);
  } catch {
    return d;
  }
};

const BackgroundMusic: React.FC = () => {
  const { settings, t } = useSiteContent();
  const bm = settings.backgroundMusic;
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [on, setOn] = useState(false);
  const [ready, setReady] = useState(false);

  /* Only mount when the CMS actually provides a usable track. */
  const src = bm?.enabled ? bm.url : undefined;

  useEffect(() => {
    if (!src) return;
    const el = audioRef.current;
    if (!el) return;
    el.volume = bm?.volume ?? 0.5;
    el.loop = bm?.loop !== false;
    setReady(true);
  }, [src, bm?.volume, bm?.loop]);

  /* Restore the visitor's preference — never auto-start on first visit. */
  useEffect(() => {
    if (!src) return;
    if (readBool(KEY_ON, false)) {
      const el = audioRef.current;
      if (el) {
        el.volume = readNum(KEY_VOL, bm?.volume ?? 0.5);
        el.play().then(
          () => setOn(true),
          () => setOn(false)
        );
      }
    }
  }, [src, bm?.volume]);

  const toggle = () => {
    const el = audioRef.current;
    if (!el) return;
    if (on) {
      el.pause();
      setOn(false);
      try {
        localStorage.setItem(KEY_ON, 'false');
      } catch {
        /* ignore */
      }
    } else {
      el.play().then(
        () => {
          setOn(true);
          try {
            localStorage.setItem(KEY_ON, 'true');
            localStorage.setItem(KEY_VOL, String(el.volume));
          } catch {
            /* ignore */
          }
        },
        () => setOn(false)
      );
    }
  };

  if (!src) return null;

  return (
    <>
      <audio ref={audioRef} src={src} preload="none" loop={bm?.loop !== false} />
      <button
        onClick={toggle}
        disabled={!ready}
        className="fixed bottom-5 right-5 z-40 chip h-9 px-3.5 gap-2 text-[11px] tracking-[0.08em] text-paper-70 hover:text-paper disabled:opacity-40 cursor-pointer"
        aria-pressed={on}
        title={bm?.name || (t({ zh: '背景音乐', ko: '배경 음악', en: 'Background music' }) as string)}
      >
        <span className="flex items-end gap-[2px] h-3" aria-hidden="true">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className={`w-[2px] bg-current ${on ? 'animate-pulse' : ''}`}
              style={{ height: on ? `${6 + i * 3}px` : '4px' }}
            />
          ))}
        </span>
        {bm?.name || (on ? 'ON' : 'OFF')}
      </button>
    </>
  );
};

export default BackgroundMusic;
