// eslint-disable-next-line no-undef
const colors = require('tailwindcss/colors')

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: ['class'],
  theme: {
    container: {
      center: true
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          ...colors.emerald
        },
        surface: {
          DEFAULT: 'hsl(var(--surface))',
          0: colors.white,
          ...colors.neutral
        },
        error: {
          DEFAULT: 'hsl(var(--error))',
          ...colors.red
        }
      },
      spacing: {
        9.5: '2.375rem',
        13: '3.25rem',
        15: '3.75rem',
        128: '32rem',
        144: '36rem'
      },
      minHeight: {
        5: '1.25rem'
      }
    }
  },
  plugins: []
}
