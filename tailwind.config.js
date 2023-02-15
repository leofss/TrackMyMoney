/** @type {import('tailwindcss').Config} */
module.exports = {
   content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'light-green': '#cffdd3',
        'name': '#777',
        'button': '#ddd',
        'total-positive': '#1f9751'
      },
      lineHeight: {
        '0':'0',
      }
    },
  },
  plugins: [],
}
