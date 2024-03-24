/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        momento: {
          primary: "#32BAAE",

          secondary: "#68C77D",

          accent: "#F76C5E",

          neutral: "#F4F4F4",

          "base-100": "#FFFFFF",

          "background-100": "#C5E5F3",

          text: {
            primary: "#333333", // Dark Gray for primary text
            secondary: "#575757", // Lighter Gray for secondary text
          },

          info: "#17A2B8",

          success: "#28A745",

          warning: "#FFC107",

          error: "#DC3545",
          "background-color": "transparent",
        },
      },
    ],
  },
  plugins: [
    require("daisyui"),
    require("@tailwindcss/typography"),
    require("@tailwindcss/container-queries"),
  ],
};
