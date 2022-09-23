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
      bggray: '#f9fafb',
      gradientblue: '#0093B8',
      gradientgreen: '#09DBA9',
      filtergray: '#1D2939',
      superlightblue: '#F0FCFF',
      black: '#000000'
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
