import React from 'react';

/* ------------------------------------------------------------------
   In-house icon set, drawn to one spec so the whole site reads as a
   single family (the way SF Symbols carries an Apple interface):

   · 24×24 grid, optically centred
   · 1.7 unit round-cap / round-join strokes, fill none
   · one accent geometry per glyph — no mixed corner languages
   ------------------------------------------------------------------ */

export type IconProps = {
  size?: number;
  strokeWidth?: number;
  className?: string;
};

const make =
  (children: React.ReactNode) =>
  ({ size = 16, strokeWidth = 1.7, className }: IconProps) => (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {children}
    </svg>
  );

/* --- Directional -------------------------------------------------- */

export const ArrowUpRight = make(
  <>
    <path d="M7 17 17 7" />
    <path d="M8.5 7H17v8.5" />
  </>
);

export const ArrowDown = make(
  <>
    <path d="M12 4.5v15" />
    <path d="m5.5 13 6.5 6.5L18.5 13" />
  </>
);

export const ArrowRight = make(
  <>
    <path d="M4.5 12h15" />
    <path d="m13 5.5 6.5 6.5L13 18.5" />
  </>
);

export const ChevronDown = make(<path d="m6 9.5 6 6 6-6" />);

export const ChevronRight = make(<path d="m9.5 6 6 6-6 6" />);

export const Close = make(<path d="M6 6l12 12M18 6 6 18" />);

export const Check = make(<path d="m4.5 12.5 5 5L19.5 7" />);

export const Copy = make(
  <>
    <rect x="8.8" y="8.8" width="11.2" height="11.2" rx="2.4" />
    <path d="M5.4 15.2h-.6a1.8 1.8 0 0 1-1.8-1.8V6a1.8 1.8 0 0 1 1.8-1.8h7.4A1.8 1.8 0 0 1 14 6v.6" />
  </>
);

export const Play = make(
  <path d="M9 5.8v12.4a.6.6 0 0 0 .92.5l9.3-6.2a.6.6 0 0 0 0-1l-9.3-6.2a.6.6 0 0 0-.92.5Z" fill="currentColor" stroke="none" />
);

/* --- Hardware ----------------------------------------------------- */

export const Camera = make(
  <>
    <rect x="3" y="7" width="18" height="12.6" rx="2.6" />
    <path d="M8.6 7l1.3-2.4a1.2 1.2 0 0 1 1.06-.64h2.08a1.2 1.2 0 0 1 1.06.64L14.9 7" />
    <circle cx="12" cy="13" r="3.7" />
    <path d="M17.4 9.9h.01" strokeWidth={2.4} />
  </>
);

export const Tripod = make(
  <>
    <path d="M9.6 3.6h4.8" />
    <path d="M12 3.6v7" />
    <circle cx="12" cy="11.9" r="1.7" />
    <path d="M11 13.4 6.4 20.6" />
    <path d="m13 13.4 4.6 7.2" />
    <path d="M12 13.6v7" />
  </>
);

export const Gimbal = make(
  <>
    <path d="M12 3.2v5" />
    <path d="M9.4 3.2h5.2" />
    <circle cx="12" cy="12.4" r="4.3" />
    <circle cx="12" cy="12.4" r="1.3" />
    <path d="M9.2 20.8h5.6" />
    <path d="M12 16.7v4.1" />
  </>
);

export const Mic = make(
  <>
    <rect x="9.1" y="2.8" width="5.8" height="11.2" rx="2.9" />
    <path d="M5.8 11.4a6.2 6.2 0 0 0 12.4 0" />
    <path d="M12 17.6v3.6" />
    <path d="M8.8 21.2h6.4" />
  </>
);

/* --- Craft -------------------------------------------------------- */

export const Palette = make(
  <>
    <path d="M12 3.4a8.6 8.6 0 1 0 0 17.2c1.34 0 2.1-.83 2.1-1.86 0-.9-.72-1.4-.72-2.24 0-1.04.84-1.86 2.1-1.86h1.72A3.8 3.8 0 0 0 21 10.8c0-4.2-4-7.4-9-7.4Z" />
    <path d="M7.6 9.4h.01" strokeWidth={2.4} />
    <path d="M11.2 6.9h.01" strokeWidth={2.4} />
    <path d="M15.4 8.2h.01" strokeWidth={2.4} />
  </>
);

export const Sparkle = make(
  <>
    <path d="M11 4.2c.56 3.7 2.44 5.58 6.14 6.14-3.7.56-5.58 2.44-6.14 6.14-.56-3.7-2.44-5.58-6.14-6.14 3.7-.56 5.58-2.44 6.14-6.14Z" />
    <path d="M18.2 14.6c.26 1.72 1.14 2.6 2.86 2.86-1.72.26-2.6 1.14-2.86 2.86-.26-1.72-1.14-2.6-2.86-2.86 1.72-.26 2.6-1.14 2.86-2.86Z" />
  </>
);

export const Clapper = make(
  <>
    <rect x="3" y="5.6" width="18" height="13.2" rx="2.6" />
    <path d="M10.2 9.6v5.2l4.6-2.6-4.6-2.6Z" fill="currentColor" stroke="none" />
  </>
);

export const Scissors = make(
  <>
    <circle cx="6.2" cy="6.8" r="2.7" />
    <circle cx="6.2" cy="17.2" r="2.7" />
    <path d="M8.6 8.2 20 17.4" />
    <path d="M8.6 15.8 20 6.6" />
  </>
);

export const Image = make(
  <>
    <rect x="3.4" y="4.4" width="17.2" height="15.2" rx="2.4" />
    <circle cx="8.8" cy="9.4" r="1.7" />
    <path d="m4.2 17.4 5.4-5.4 3.8 3.8 2.8-2.8 3.6 3.6" />
  </>
);

export const Pen = make(
  <>
    <path d="M4.6 19.4l1.36-4.6L16.1 4.64a2.26 2.26 0 0 1 3.2 3.2L9.14 18 4.6 19.4Z" />
    <path d="m14.4 6.4 3.2 3.2" />
  </>
);

export const Diamond = make(
  <>
    <rect x="4.6" y="4.6" width="14.8" height="14.8" rx="1.6" transform="rotate(45 12 12)" />
  </>
);

export const Cpu = make(
  <>
    <rect x="6" y="6" width="12" height="12" rx="2.2" />
    <rect x="9.6" y="9.6" width="4.8" height="4.8" rx="1" />
    <path d="M9.2 3.2v2.8M14.8 3.2v2.8M9.2 18v2.8M14.8 18v2.8M3.2 9.2H6M3.2 14.8H6M18 9.2h2.8M18 14.8h2.8" />
  </>
);

export const Wand = make(
  <>
    <path d="m4.6 19.4 9.8-9.8" />
    <path d="M13.6 3.6l.8 2 2 .8-2 .8-.8 2-.8-2-2-.8 2-.8.8-2Z" />
    <path d="M19 10.6l.55 1.35L20.9 12.5l-1.35.55L19 14.4l-.55-1.35L17.1 12.5l1.35-.55L19 10.6Z" />
  </>
);

export const Cube = make(
  <>
    <path d="M12 3.2 20 7.7v8.6l-8 4.5-8-4.5V7.7l8-4.5Z" />
    <path d="M4.3 7.8 12 12.1l7.7-4.3" />
    <path d="M12 12.1v8.5" />
  </>
);

export const Aperture = make(
  <>
    <circle cx="12" cy="12" r="8.6" />
    <path d="m14.31 8 5.74 9.94" />
    <path d="M9.69 8h11.48" />
    <path d="m7.38 12 5.74-9.94" />
    <path d="M9.69 16 3.95 6.06" />
    <path d="M14.31 16H2.83" />
    <path d="m16.62 12-5.74 9.94" />
  </>
);

export const Layers = make(
  <>
    <path d="M12 3.4 20.6 8 12 12.6 3.4 8 12 3.4Z" />
    <path d="m20.6 12.4-8.6 4.6-8.6-4.6" />
    <path d="m20.6 16.4-8.6 4.6-8.6-4.6" />
  </>
);

/* --- Contact / meta ----------------------------------------------- */

export const Mail = make(
  <>
    <rect x="3" y="5.4" width="18" height="13.2" rx="2.4" />
    <path d="m3.6 7.2 8.4 6.2 8.4-6.2" />
  </>
);

export const Chat = make(
  <path d="M20.2 11.9a8.2 8.2 0 0 1-11.9 7.33L3.8 20.2l.97-4.5A8.2 8.2 0 1 1 20.2 11.9Z" />
);

export const Phone = make(
  <path d="M21.4 16.6v2.9a1.9 1.9 0 0 1-2.08 1.9 18.9 18.9 0 0 1-8.24-2.93 18.6 18.6 0 0 1-5.73-5.73A18.9 18.9 0 0 1 2.42 4.4 1.9 1.9 0 0 1 4.31 2.32h2.9a1.9 1.9 0 0 1 1.9 1.63c.12.9.34 1.78.65 2.63a1.9 1.9 0 0 1-.43 2L7.98 9.93a15.2 15.2 0 0 0 5.7 5.7l1.35-1.35a1.9 1.9 0 0 1 2-.43c.85.31 1.73.53 2.63.65a1.9 1.9 0 0 1 1.63 1.93Z" />
);

export const Download = make(
  <>
    <path d="M12 3.8v11" />
    <path d="M6.6 9.6 12 15l5.4-5.4" />
    <path d="M4.4 20.2h15.2" />
  </>
);

export const Pin = make(
  <>
    <path d="M12 21.2s-7-5.6-7-10.7a7 7 0 1 1 14 0c0 5.1-7 10.7-7 10.7Z" />
    <circle cx="12" cy="10.3" r="2.5" />
  </>
);

export const Heart = make(
  <path d="M12 20.4S3.8 15.2 3.8 9.7A4.7 4.7 0 0 1 12 6.8a4.7 4.7 0 0 1 8.2 2.9c0 5.5-8.2 10.7-8.2 10.7Z" />
);

export const Bookmark = make(
  <path d="M6.5 4.5h11a0 0 0 0 1 0 0v15l-5.5-3.8L6.5 19.5v-15a0 0 0 0 1 0 0Z" />
);

export const ChevronLeft = make(<path d="M14.5 6 8.5 12l6 6" />);

export const User = make(
  <>
    <circle cx="12" cy="7.8" r="3.7" />
    <path d="M4.8 20.4a7.2 7.2 0 0 1 14.4 0" />
  </>
);

export const AtSign = make(
  <>
    <circle cx="12" cy="12" r="3.7" />
    <path d="M15.7 12v1.1a2.7 2.7 0 0 0 5.3-.7 9 9 0 1 0-3.5 7.1" />
  </>
);

export const Building = make(
  <>
    <rect x="4.8" y="3.6" width="14.4" height="16.8" rx="1.8" />
    <path d="M8.6 7.6h.01M12 7.6h.01M15.4 7.6h.01M8.6 11.2h.01M12 11.2h.01M15.4 11.2h.01" strokeWidth={2.4} />
    <path d="M10.2 20.4v-4.2h3.6v4.2" />
  </>
);

export const Message = make(
  <>
    <rect x="3.2" y="4.8" width="17.6" height="12.6" rx="2.2" />
    <path d="M8.2 17.4V21l4.2-3.6" />
  </>
);

export const Calendar = make(
  <>
    <rect x="3.6" y="5" width="16.8" height="15.6" rx="2.2" />
    <path d="M3.6 9.6h16.8" />
    <path d="M8.2 3v3.4M15.8 3v3.4" />
  </>
);

export const Package = make(
  <>
    <path d="M12 3.2 20 7.7v8.6l-8 4.5-8-4.5V7.7l8-4.5Z" />
    <path d="M4.3 7.8 12 12.1l7.7-4.3" />
    <path d="M7.6 5.6l7.8 4.4v4.2" />
  </>
);

export const TrendingUp = make(
  <>
    <path d="m3.4 17.2 6-6.2 4 4 7-7.4" />
    <path d="M15.6 7.6h4.8v4.8" />
  </>
);
