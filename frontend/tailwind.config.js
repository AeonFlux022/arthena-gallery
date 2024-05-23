/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily: {
      display: ["Poppins", "sans-serif"],
      body: ['"Bespoke Slab"', "sans-serif"],
    },
    extend: {
      colors: {
        primary: {
          light: "#7272a1",
          DEFAULT: "#666699", // web safe color
          dark: "#47476b",
        },
        secondary: {
          light: "#ffd65a",
          DEFAULT: "#ffcc33", // web safe color
          dark: "#ffc20c",
        },
        neutral: "#FCFAFA",
        black: "#313638",
      },
    },
  },
  plugins: [],
};
