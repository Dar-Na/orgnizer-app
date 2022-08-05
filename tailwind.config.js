/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    screens: {
      'phone': '0px',
      // => @media (min-width: 0px) { ... }

      'else': '400px',
      // => @media (min-width: 400px) { ... }

    },
  },
  plugins: [],
}
