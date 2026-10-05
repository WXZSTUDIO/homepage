/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Editorial "ink & newsprint" palette
        ink: '#09090b',
        'ink-soft': '#101013',
        'ink-card': '#151517',
        paper: '#F4F1EC',
        'paper-70': 'rgba(244, 241, 236, 0.70)',
        'paper-45': 'rgba(244, 241, 236, 0.45)',
        muted: '#9A958C',
        faint: '#6B675F',
        rule: 'rgba(244, 241, 236, 0.14)',
        'rule-soft': 'rgba(244, 241, 236, 0.07)',
        accent: '#FFC900',

        // legacy aliases (kept so older markup still resolves)
        background: '#000000',
        surface: '#0d0d0f',
        'surface-card': '#121214',
        'surface-elevated': '#18181b',
        secondary: '#86868b',
      },
      fontFamily: {
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
