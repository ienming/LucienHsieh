/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      'serif': ['Noto Serif TC', 'ui-serif', 'Georgia', 'Cambria', 'Times New Roman', 'Times', 'serif'],
      'display': ['Noto Serif TC']
    },
    extend: {
      backgroundColor: {
        'light': '#FCFAF4',
      },
    },
  },
  plugins: [],
}