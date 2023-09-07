/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')

const emoji = 'Segoe UI Emoji'
const mono = 'IBM Plex Mono'
const sans = 'Libre Franklin Variable'
const condensed = 'IBM Plex Sans Condensed'
const serif = 'IBM Plex Serif'

module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  safelist: [4, 5, 6, 7, 8, 9, 10].map(x => `grid-cols-${x}`), // MIN_SIZE+1...MAX_SIZE+1 (keep in sync with src\constants.ts)
  theme: {
    extend: {
      fontFamily: {
        mono: [mono, emoji, 'monospace'],
        sans: [sans, emoji, 'sans-serif'],
        condensed: [condensed, emoji, 'sans-serif'],
        serif: [serif, emoji, 'serif'],
      },
      colors: {
        background: '#FAA6A4',
        primary: colors.blue,
        secondary: colors.teal,
        neutral: colors.gray,
        success: colors.green,
        warning: colors.orange,
        danger: colors.red,
      },
      fontWeight: {
        thin: 100,
        extralight: 200,
        light: 300,
        normal: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
        extrabold: 800,
        black: 900,
      },
    },
  },
  plugins: [],
}
