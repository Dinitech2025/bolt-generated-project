/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-blue': '#007BFF', // Define your desired blue color here
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
