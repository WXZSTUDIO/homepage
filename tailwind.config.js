/** @type {import('tailwindcss').Config} */

/* LIQUID GLASS SYSTEM (iOS 26)
   Historical token names kept (a full rename would touch every file), values
   set for a dark vivid base with translucent glass on top:
   - `ink`   → the base surface (near-black, under the colour blooms)
   - `paper` → the foreground (white)
   Surfaces are translucent whites layered over blurred colour, which is what
   glass has to refract — flat greys never read as glass. */
export default {
  content: [
    './index.html',
    './*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Base + glass surfaces
        ink: '#08080B',
        'ink-soft': 'rgba(255, 255, 255, 0.06)',
        'ink-card': 'rgba(255, 255, 255, 0.08)',
        'ink-deep': 'rgba(255, 255, 255, 0.12)',

        // Foreground
        paper: '#FFFFFF',
        'paper-70': 'rgba(255, 255, 255, 0.70)',
        'paper-45': 'rgba(255, 255, 255, 0.45)',
        muted: 'rgba(255, 255, 255, 0.55)',
        faint: 'rgba(255, 255, 255, 0.34)',
        rule: 'rgba(255, 255, 255, 0.14)',
        'rule-soft': 'rgba(255, 255, 255, 0.07)',
        accent: '#FFC900',

        // Bloom palette — the blurred colour under the glass
        'c-blue': '#4F7CFF',
        'c-violet': '#8B5CF6',
        'c-orange': '#FF7A2F',
        'c-pink': '#FF5FA2',
        'c-teal': '#22D3EE',
        'c-green': '#55D98C',

        // legacy aliases (kept so older markup still resolves)
        background: '#08080B',
        surface: 'rgba(255, 255, 255, 0.06)',
        'surface-card': 'rgba(255, 255, 255, 0.08)',
        'surface-elevated': 'rgba(255, 255, 255, 0.12)',
        secondary: 'rgba(255, 255, 255, 0.55)',
      },
      fontFamily: {
        // Apple voice: system SF first, Inter as the cross-platform fallback
        display: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"SF Pro Display"',
          '"Inter"',
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
          '-apple-system',
          'BlinkMacSystemFont',
          '"SF Pro Text"',
          '"Inter"',
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
        // Squircle-ish continuous radii
        glass: '1.75rem',
        tile: '1.25rem',
      },
      transitionTimingFunction: {
        editorial: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
};
