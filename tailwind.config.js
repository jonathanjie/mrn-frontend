const colors = require('tailwindcss/colors');

module.exports = {
  mode: 'jit',
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx,vue}",
  ],
  darkMode: false,
  theme: {
    colors: {
      teal: colors.teal,
      cyan: colors.cyan,
      gray: colors.gray,
      blue: '#004557',
      lightblue: '#007694',
      white: '#fff'
    },
    extend: {},
    fontFamily: {
      'sans': ['Manrope'],
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
