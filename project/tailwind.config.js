/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'white': '#ffffff',
        'dark-green': '#00420C',
        'light-green': '#17882C',
        'red': '#C90C0F',
      }
    },
  },
  plugins: [],
}