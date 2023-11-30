/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js}",
    "./src/**/**/*.{html,js}",
    "public/index.html",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "desktop-pattern": "url('assets/pattern-bg-desktop.png')",
        "mobile-pattern": "url('assets/pattern-bg-mobile.png')",
      },
      fontFamily: {
        rubik: ["Rubik", "sans-serif"],
      },
    },
  },
  plugins: [],
};
