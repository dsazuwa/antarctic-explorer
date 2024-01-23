/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      fontSize: {
        xxs: '0.625rem',
      },

      colors: {
        misty_blue: '#E7ECEF',
        navy: '#274C77',
        sky_blue: '#6096BA',
        pale_azure: '#A3CEF1',
        stone_gray: '#8B8C89',
        light_gray: '#F3F5F7',
        lighter_gray: '#F7F9FB',

        blue_0: '#A3CEF1',
        blue_1: '#93C0E4',
        blue_2: '#82B2D6',
        blue_3: '#71A4C8',
        blue_4: '#6096BA',
        blue_5: '#588BB2',
        blue_6: '#4E7EA6',
        blue_7: '#447199',
        blue_8: '#2F5680',
        blue_9: '#274C77',
      },

      keyframes: {
        ripple: {
          to: {
            transform: 'scale(4)',
            opacity: 0,
          },
        },
      },

      animation: {
        ripple: 'ripple 300ms linear',
      },
    },
  },
  plugins: [],
};
