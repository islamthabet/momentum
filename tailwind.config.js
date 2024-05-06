/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#32BAAE',

        secondary: '#68C77D',

        accent: '#F76C5E',

        neutral: '#F4F4F4',

        'base-100': '#FFFFFF',

        'background-100': '#C5E5F3',

        text: {
          primary: '#333333', // Dark Gray for primary text
          secondary: '#575757', // Lighter Gray for secondary text
        },

        info: '#17A2B8',

        success: '#28A745',

        warning: '#FFC107',

        error: '#DC3545',
      },
      screens: {
        xs: '640px',
        sm: '768px',
        md: '950px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
        '3xl': '1920px',
        '4xl': '2560px',
      },
      animation: {
        letterSpacing: 'letterSpacing .5s linear .25s both',
      },
      keyframes: {
        letterSpacing: {
          '0%': { letterSpacing: '0.5em', opacity: 0 },
          '100%': { letterSpacing: '0', opacity: 1 },
        },
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
    },
  },

  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/container-queries'),
    require('tailwind-scrollbar'),
  ],
  corePlugins: {
    preflight: false,
  },
};
