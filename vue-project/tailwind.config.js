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
        'light': '#EBEBEB',
        'dark': '#252525',
        'lavendar': '#3B6796',
        'snow-shadow': '#C3D9E2',
        'gold': '#A62900'
      }
    },
  },
  plugins: [],
}