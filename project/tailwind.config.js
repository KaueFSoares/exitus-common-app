/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "white": "#ffffff",
        "dark-green": "#00420C",
        "light-green": "#17882C",
        "red": "#C90C0F",
        "gray": "#D9D9D9",
      },
      screens: {
        xsm: "380px",
      },
      boxShadow: {
        navbar: "0 0 20px rgba(0, 0, 0, 0.2)",
      },
    },
  },
  plugins: [],
}
