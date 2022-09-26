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
      blue: {
        DEFAULT: '#004557',
        800: '#004557',
        700: '#007694',
        600: '#0093B8',
        100: '#CCF5FF',
        50: '#F0FCFF',
        system: '#1570EF',
        sys800: '#1849A9',
      },
      lightblue: '#007694',
      white: '#fff',
      darkgray: '#eaeef0',
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
      sm: ['14px', '20px'],
      huge: ['20px', '30px']
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
