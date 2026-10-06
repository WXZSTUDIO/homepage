/** @type {import('tailwindcss').Config} */

/* BLACK STAGE SYSTEM
   One dark cinematic stage: #050505 under everything, silver type on top,
   white pills for the primary actions. Historical token names kept (ink /
   paper) so existing class names keep resolving:
   - `ink`   → the stage (near-black)
   - `paper` → the foreground (silver white) */
export default {
  content: [
    './index.html',
    './*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Stage
        ink: '#050505',
        'ink-soft': 'rgba(255, 255, 255, 0.04)',
        'ink-card': 'rgba(255, 255, 255, 0.05)',
        'ink-deep': 'rgba(255, 255, 255, 0.08)',

        // Foreground — silver on black
        paper: '#fafafa',
        'paper-70': 'rgba(250, 250, 250, 0.72)',
        'paper-45': 'rgba(250, 250, 250, 0.48)',
        muted: '#a7a6a6',
        faint: 'rgba(250, 250, 250, 0.38)',
        nav: '#b6b5b5',
        strip: '#8b8a8a',
        rule: 'rgba(250, 250, 250, 0.13)',
        'rule-soft': 'rgba(250, 250, 250, 0.07)',
        accent: '#FFD500',
        pill: '#ffffff',
      },
      fontFamily: {
        sans: [
          '"Montserrat"',
          '"Spoqa Han Sans Neo"',
          '"Spoqa Han Sans"',
          '-apple-system',
          'BlinkMacSystemFont',
          'system-ui',
          '"Apple SD Gothic Neo"',
          '"Malgun Gothic"',
          '"Segoe UI"',
          'sans-serif',
        ],
        display: [
          '"Montserrat"',
          '"Spoqa Han Sans Neo"',
          '"Spoqa Han Sans"',
          '-apple-system',
          'BlinkMacSystemFont',
          'system-ui',
          '"Apple SD Gothic Neo"',
          '"Malgun Gothic"',
          'sans-serif',
        ],
        mono: ['"SF Mono"', 'Menlo', 'Monaco', 'monospace'],
      },
      maxWidth: {
        1700: '1700px',
      },
      borderRadius: {
        glass: '1.5rem',
        tile: '1rem',
      },
      transitionTimingFunction: {
        editorial: 'cubic-bezier(0.16, 1, 0.3, 1)',
        fluid: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
};
