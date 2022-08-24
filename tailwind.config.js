const colors = require('tailwindcss/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx,svg}"],
  // , "./public/index.html", './next.config.js'
  darkMode: 'class',
  theme: {
    extend: {
      gray: {
        900: '#000000',
        800: '#333333',
        700: 'rgb(var(--color-gray) / <alpha-value>)',
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
