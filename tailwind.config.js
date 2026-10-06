/** @type {import('tailwindcss').Config} */

/* LEXINGTON-STYLE SYSTEM
   Historical token names kept (a full rename would touch every file), values
   set to the reference language:
   - `ink`   → the page surface (white)
   - `paper` → the foreground (near-black)
   Four bright brand colours carry the identity: blue / orange / pink / green. */
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
        ink: '#FFFFFF',
        'ink-soft': '#F5F4F0',
        'ink-card': '#F1F0EB',
        'ink-deep': '#E8E6E0',

        // Foreground
        paper: '#0A0A0A',
        'paper-70': 'rgba(10, 10, 10, 0.70)',
        'paper-45': 'rgba(10, 10, 10, 0.45)',
        muted: '#5B5952',
        faint: '#8D8B83',
        rule: 'rgba(10, 10, 10, 0.14)',
        'rule-soft': 'rgba(10, 10, 10, 0.06)',
        accent: '#FFC900',

        // Lexington brand palette
        'c-blue': '#4F7CFF',
        'c-orange': '#FF5A1F',
        'c-pink': '#FF7AC3',
        'c-green': '#55D98C',

        // legacy aliases (kept so older markup still resolves)
        background: '#FFFFFF',
        surface: '#F5F4F0',
        'surface-card': '#F1F0EB',
        'surface-elevated': '#E8E6E0',
        secondary: '#5B5952',
      },
      fontFamily: {
        // Lexington voice: serif display (roman + italic accents), grotesque body
        display: [
          '"Instrument Serif"',
          '"Noto Serif SC"',
          '"Songti SC"',
          '"Source Han Serif SC"',
          'SimSun',
          'Georgia',
          'serif',
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
      transitionTimingFunction: {
        editorial: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
};
