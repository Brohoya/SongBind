const colors = require('tailwindcss/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  // , "./public/index.html", './next.config.js'
  // darkMode: true,
  theme: {
    extend: {
      gray: {
        900: '#000000',
        800: '#333333',
        700: '#4F4F4F',
        600: '#828282',
        400: '#E0E0E0',
        // 300: '#e3e5e8',
        // 200: '#ebedef',
        // 100: '#f2f3f5',
      },
      yellow: {
        100: '#F2C94C',
        900: 'rgba(242,201,76,1)'
      }
    },
  },
  plugins: [],
}
