/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./public/**/*.svg",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        themeOrange: "#FF4C29",
        themeNavyLight: "#738897",
        themeNavy: "#334756",
        themeNavyDark: "#2C394B",
        themeDark: "#082032",
        themeWhite: "#ffffffd1"
      }
    },
  },
  plugins: [],
}
