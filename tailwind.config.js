/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        /* ── Theme-aware CAD & Blueprint Palette ── */
        bp: {
          canvas:        'var(--bp-canvas)',
          surface:       'var(--bp-surface)',
          elevated:      'var(--bp-elevated)',
          panel:         'var(--bp-panel)',
          line:          'var(--bp-line)',
          grid:          'var(--bp-grid)',
          'grid-strong': 'var(--bp-grid-strong)',
          text:          'var(--bp-text)',
          muted:         'var(--bp-muted)',
          dim:           'var(--bp-dim)',
          border:        'var(--bp-border)',
          'border-strong': 'var(--bp-border-strong)',
        },
        /* ── Bevel System ── */
        bevel: {
          light: 'var(--bevel-light)',
          dark:  'var(--bevel-dark)',
          mid:   'var(--bevel-mid)',
        },
        /* ── 16-bit Retro Accents ── */
        retro: {
          cyan:    'var(--retro-cyan)',
          yellow:  'var(--retro-yellow)',
          green:   'var(--retro-green)',
          red:     'var(--retro-red)',
          white:   'var(--retro-white)',
        },
        /* ── Polychrome Accents (Avoid monochrome look) ── */
        terracotta: {
          DEFAULT: '#c2410c',
          light:   '#ea580c',
          bg:      'var(--terracotta-bg)',
          border:  'var(--terracotta-border)',
          text:    'var(--terracotta-text)',
        },
        ochre: {
          DEFAULT: '#b45309',
          light:   '#d97706',
          bg:      'var(--ochre-bg)',
          border:  'var(--ochre-border)',
          text:    'var(--ochre-text)',
        },
        forest: {
          DEFAULT: '#15803d',
          light:   '#16a34a',
          bg:      'var(--forest-bg)',
          border:  'var(--forest-border)',
          text:    'var(--forest-text)',
        },
        cobalt: {
          DEFAULT: '#1d4ed8',
          light:   '#2563eb',
          bg:      'var(--cobalt-bg)',
          border:  'var(--cobalt-border)',
          text:    'var(--cobalt-text)',
        },
        plum: {
          DEFAULT: '#7e22ce',
          light:   '#9333ea',
          bg:      'var(--plum-bg)',
          border:  'var(--plum-border)',
          text:    'var(--plum-text)',
        },
        /* ── Semantic Accents (preserved for type compat) ── */
        cyan: {
          glow: 'rgba(56, 189, 248, 0.15)',
          DEFAULT: '#0284c7',
          hover: '#0369a1',
        },
        emerald: {
          glow: 'rgba(74, 222, 128, 0.15)',
          DEFAULT: '#15803d',
          hover: '#166534',
        },
        violet: {
          glow: 'rgba(139, 92, 246, 0.15)',
          DEFAULT: '#7e22ce',
          hover: '#6b21a8',
        },
        amber: {
          glow: 'rgba(250, 204, 21, 0.15)',
          DEFAULT: '#b45309',
        }
      },
      fontFamily: {
        display: ['Space Grotesk', 'sans-serif'],
        pixel:   ['Silkscreen', 'monospace'],
        mono:    ['JetBrains Mono', 'Fira Code', 'monospace'],
        sans:    ['Space Grotesk', 'sans-serif'],
      },
      fontSize: {
        'body': ['1.125rem', { lineHeight: '1.75' }],
      },
      boxShadow: {
        'bevel-raised': 'inset 1px 1px 0px 0px var(--bevel-light), inset -1px -1px 0px 0px var(--bevel-dark), 0 2px 4px rgba(0,0,0,0.15)',
        'bevel-inset':  'inset 1px 1px 0px 0px var(--bevel-dark), inset -1px -1px 0px 0px var(--bevel-light)',
        'bevel-title':  'inset 1px 1px 0px 0px var(--bevel-light), inset -1px -1px 0px 0px var(--bevel-dark)',
        'bp-glow':      '0 0 20px var(--bp-glow), 0 0 40px rgba(0,0,0,0.05)',
      },
      animation: {
        'scanline': 'scanline 8s linear infinite',
        'blink-cursor': 'blink-cursor 1s step-end infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        scanline: {
          '0%':   { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        'blink-cursor': {
          '0%, 100%': { opacity: '1' },
          '50%':      { opacity: '0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-8px)' },
        }
      },
    },
  },
  plugins: [],
}
