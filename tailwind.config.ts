import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', '"Fira Code"', 'monospace'],
      },
      colors: {
        'bg-deep':     '#020203',
        'bg-base':     '#050506',
        'bg-elevated': '#0a0a0c',
        accent:        '#5E6AD2',
        'accent-bright': '#6872D9',
        fg:            '#EDEDEF',
        'fg-muted':    '#8A8F98',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      animation: {
        'blob-1':          'blob-float 10s ease-in-out infinite',
        'blob-2':          'blob-float-2 8s ease-in-out infinite',
        'blob-3':          'blob-float-3 12s ease-in-out infinite',
        'blob-4':          'blob-float 14s ease-in-out infinite reverse',
        'status-pulse':    'status-pulse 2s ease-in-out infinite',
        'shimmer':         'shimmer 4s linear infinite',
        'cursor-blink':    'cursor-blink 1s ease-in-out infinite',
        'float-slow':      'float-slow 6s ease-in-out infinite',
      },
      keyframes: {
        'blob-float': {
          '0%, 100%': { transform: 'translate(0,0) rotate(0deg) scale(1)' },
          '33%':       { transform: 'translate(30px,-20px) rotate(1deg) scale(1.02)' },
          '66%':       { transform: 'translate(-20px,10px) rotate(-0.5deg) scale(0.98)' },
        },
        'blob-float-2': {
          '0%, 100%': { transform: 'translate(0,0) rotate(0deg)' },
          '50%':       { transform: 'translate(-30px,20px) rotate(-1deg)' },
        },
        'blob-float-3': {
          '0%, 100%': { transform: 'translate(0,0) scale(1)' },
          '50%':       { transform: 'translate(20px,-30px) scale(0.97)' },
        },
        'status-pulse': {
          '0%, 100%': { boxShadow: '0 0 6px rgba(94,106,210,0.8)', opacity: '1' },
          '50%':       { boxShadow: 'none',                          opacity: '0.4' },
        },
        'shimmer': {
          '0%':   { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '-200% 0' },
        },
        'cursor-blink': {
          '0%, 100%': { opacity: '1' },
          '50%':       { opacity: '0' },
        },
        'float-slow': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%':       { transform: 'translateY(-8px)' },
        },
      },
      boxShadow: {
        'card':       '0 0 0 1px rgba(255,255,255,0.06), 0 2px 20px rgba(0,0,0,0.4), 0 0 40px rgba(0,0,0,0.2)',
        'card-hover': '0 0 0 1px rgba(255,255,255,0.10), 0 8px 40px rgba(0,0,0,0.5), 0 0 80px rgba(94,106,210,0.1)',
        'accent-btn': '0 0 0 1px rgba(94,106,210,0.5), 0 4px 12px rgba(94,106,210,0.3), inset 0 1px 0 0 rgba(255,255,255,0.2)',
        'accent-btn-hover': '0 0 0 1px rgba(94,106,210,0.7), 0 8px 24px rgba(94,106,210,0.4), inset 0 1px 0 0 rgba(255,255,255,0.2)',
      },
    },
  },
  plugins: [],
}

export default config
