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
      white: '#fff',
      backgroundgray: '#f9fafb'
    },
    extend: {},
    fontFamily: {
      'sans': ['Manrope'],
    },
    fontSize:{
      base: ['14px','24px'],
      tiny: ['12px', '20px'],
      sm: ['14px', '20px']
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
