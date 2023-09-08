/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')

const emoji = 'Segoe UI Emoji'
const mono = 'IBM Plex Mono'
const sans = 'Libre Franklin Variable'
const condensed = 'IBM Plex Sans Condensed'
const serif = 'IBM Plex Serif'

module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
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
      keyframes: {
        blink: {
          'from, to': { opacity: 1 },
          '50%': { opacity: 0 },
        },
        shake: {
          '10%, 90%': { transform: 'translate3d(-1px, 0, 0)' },
          '20%, 80%': { transform: 'translate3d(2px, 0, 0)' },
          '30%, 50%, 70%': { transform: 'translate3d(-3px, 0, 0)' },
          '40%, 60%': { transform: 'translate3d(3px, 0, 0)' },
        },
        pop: {
          from: { opacity: 0, bottom: '0px' },
          '20%': { opacity: 1 },
          '80%': { opacity: 1 },
          to: { opacity: 0, bottom: '15px' },
        },
        float: {
          from: { opacity: 0, bottom: '8px' },
          '50%': { opacity: 1 },
          '60%': { opacity: 1 },
          to: { opacity: 0, bottom: '23px' },
        },
      },
      animation: {
        blink: '1000ms blink step-end infinite',
        pop: '1000ms pop ease-out',
        shake: '500ms shake',
      },
    },
  },
  plugins: [],
}
