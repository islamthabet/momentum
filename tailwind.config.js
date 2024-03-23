/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        momento: {
          primary: '#32BAAE',

          secondary: '#68C77D',

          accent: '#F76C5E',

          neutral: '#F4F4F4',

          'base-100': '#C5E5F3',

          info: '#17A2B8',

          success: '#28A745',

          warning: '#FFC107',

          error: '#DC3545',
        },
      },
    ],
  },
  plugins: [require('daisyui')],
};
