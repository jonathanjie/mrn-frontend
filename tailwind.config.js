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
      gray: {
        DEFAULT: '#98A2B3',
        900: '#1D2939',
        800: '#344054',
        700: '#475467',
        600: '#667085',
        500: '#98A2B3',
        400: '#B3BAC7',
        300: '#D0D5DD',
        200: '#E4E7EC',
        100: '#F2F4F7',
        50: '#F9FAFB',
        25: '#FCFCFD',
      },
      blue: {
        DEFAULT: '#004557',
        900: '#010E1C',
        800: '#004557',
        700: '#007694',
        600: '#053672',
        500: '#06448E',
        400: '#4179BE',
        300: '#88A6C9',
        200: '#CDDAE8',
        100: '#EAEFF6',
        75: '#E6ECF4',
        50: '#F8FAFC',
      },
      sysblue: {
        DEFAULT: '#1570EF',
        900: '#194185',
        800: '#1849A9',
        700: '#175CD3',
        600: '#1570EF',
        500: '#2E90FA',
        400: '#53B1FD',
        300: '#84CAFF',
        200: '#B2DDFF',
        100: '#D1E9FF',
        75: '#E0F2FF',
        50: '#53B1FD',
        25: '#F5FAFF',
      },
      green: {
        DEFAULT: '#12B76A',
        900: '#054F31',
        800: '#05603A',
        700: '#027A48',
        600: '#039855',
        500: '#12B76A',
        400: '#32D583',
        300: '#6CE9A6',
        200: '#A6F4C5',
        100: '#D1FADF',
        50: '#ECFDF3',
        25: '#F6FEF9',
      },
      yellow: {
        DEFAULT: '#F79009',
        900: '#7A2E0E',
        800: '#93370D',
        700: '#B54708',
        600: '#DC6803',
        500: '#F79009',
        400: '#FDB022',
        300: '#FEC84B',
        200: '#FED789',
        100: '#FEF0C7',
        50: '#FFFAEB',
        25: '#FFFCF5',
      },
      red: {
        50: '#FEF3F2',
        500: '#F04438',
        700: '#B42318'
      },
      orange: { 
        50: '#FFFAEB',
        500: '#F79009',
        700: '#B54708'
      },
      pink: '#ED7B84',
      darkgray: '#EAEEF0',
      gradientblue: '#0093B8',
      gradientgreen: '#09DBA9',
      white: '#FFFFFF',
      black: '#000000'
    },
    extend: {
      gridTemplateColumns: {
        '16': 'repeat(16, minmax(0, 1fr))',
        '30': 'repeat(30, minmax(0, 1fr))',
      },
      boxShadow: {
        'card': '0 2px 2px 2px rgba(29, 41, 57, 0.04)'
      }
    },
    fontFamily: {
      'sans': ['Manrope'],
    },
    fontSize:{
      12: ['12px', '20px'], // tiny
      14: ['14px', '24px'], // base, sm
      16: ['16px', '24px'], 
      18: ['18px', '26px'], 
      20: ['20px', '30px'] // huge
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
