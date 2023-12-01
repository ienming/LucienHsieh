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
        'light': '#EFEFEF',
        'dark': '#1d2b43',
        'lavendar': '#4C6899',
        'snow-shadow': '#BECCE2',
        'gold': '#8C8462'
      }
    },
  },
  plugins: [],
}