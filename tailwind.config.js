/** @type {import('tailwindcss').Config} */

/* AUVI-STYLE LIGHT SYSTEM
   The historical names are kept (a full rename would touch every file), but
   the VALUES are inverted:
   - `ink`   → the page surface (warm light grey)
   - `paper` → the foreground (near-black)
   So `bg-ink text-paper` now renders a light page with dark text, and
   `bg-paper text-ink` renders the solid dark pill button — exactly the
   reference language (black pill buttons on warm grey cards). */
export default {
  content: [
    './index.html',
    './*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Surfaces
        ink: '#F0EFEC',
        'ink-soft': '#EAE8E3',
        'ink-card': '#E5E3DD',
        'ink-deep': '#DBD9D2',

        // Foreground
        paper: '#161614',
        'paper-70': 'rgba(22, 22, 20, 0.70)',
        'paper-45': 'rgba(22, 22, 20, 0.45)',
        muted: '#6F6C65',
        faint: '#9C9991',
        rule: 'rgba(22, 22, 20, 0.13)',
        'rule-soft': 'rgba(22, 22, 20, 0.06)',
        accent: '#FFC900',

        // legacy aliases (kept so older markup still resolves)
        background: '#F0EFEC',
        surface: '#EAE8E3',
        'surface-card': '#E5E3DD',
        'surface-elevated': '#DBD9D2',
        secondary: '#6F6C65',
      },
      fontFamily: {
        // AUVI voice: one clean grotesque everywhere, tight display tracking
        display: [
          '"Inter"',
          '-apple-system',
          'BlinkMacSystemFont',
          '"SF Pro Display"',
          '"PingFang SC"',
          '"Hiragino Sans GB"',
          '"Apple SD Gothic Neo"',
          '"Microsoft YaHei"',
          '"Malgun Gothic"',
          '"Helvetica Neue"',
          'Helvetica',
          'Arial',
          'sans-serif',
        ],
        sans: [
          '"Inter"',
          '-apple-system',
          'BlinkMacSystemFont',
          '"SF Pro Text"',
          '"PingFang SC"',
          '"Hiragino Sans GB"',
          '"Apple SD Gothic Neo"',
          '"Microsoft YaHei"',
          '"Malgun Gothic"',
          '"Helvetica Neue"',
          'Helvetica',
          'Arial',
          'sans-serif',
        ],
        mono: ['"JetBrains Mono"', '"SF Mono"', 'Menlo', 'Monaco', 'monospace'],
      },
      maxWidth: {
        1700: '1700px',
      },
      borderRadius: {
        card: '1.5rem',
        plate: '2rem',
      },
      transitionTimingFunction: {
        editorial: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
};
