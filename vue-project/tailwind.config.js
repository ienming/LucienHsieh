/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      'serif': ['Noto Serif TC', 'ui-serif', 'Georgia', 'Cambria', 'Times New Roman', 'Times', 'serif'],
      'display': ['Taviraj', 'Noto Serif TC'],
    },
    extend: {
      colors: {
        'light': '#FCFAF4',
        'dark': '#244d69'
      }
    },
  },
  plugins: [],
}