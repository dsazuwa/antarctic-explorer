/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        misty_blue: '#E7ECEF',
        navy: '#274C77',
        sky_blue: '#6096BA',
        pale_azure: '#A3CEF1',
        stone_gray: '#8B8C89',
        light_gray: '#F3F5F7',
        lighter_gray: '#F7F9FB',
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
