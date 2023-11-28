/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      'sans': ['Raleway', 'Noto Sans JP', 'ui-sans', 'sans'],
      'serif': ['Noto Serif TC', 'ui-serif', 'Georgia', 'Cambria', 'Times New Roman', 'Times', 'serif'],
      'display': ['Raleway', 'Noto Serif TC'],
    },
    extend: {
      colors: {
        'light': '#FCFAF4',
        'dark': '#292929',
        'beige': '#E9E5D1'
      }
    },
  },
  plugins: [],
}