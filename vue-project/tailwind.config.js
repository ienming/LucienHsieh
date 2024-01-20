/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      'sans': ['Raleway', 'Noto Sans TC', 'ui-sans', 'sans'],
      'serif': ['Noto Serif JP', 'ui-serif', 'Georgia', 'Cambria', 'Times New Roman', 'Times', 'serif'],
      'display': ['Raleway', 'Noto Sans TC'],
    },
    fontSize: {
      sm: '0.75rem',
      base: '1rem',
      xl: '1.375rem',
      '2xl': '1.625rem',
      '3xl': '1.75rem',
      '4xl': '2.25rem',
      '5xl': '2.875rem',
    },
    extend: {
      colors: {
        'light': '#EBEBEB',
        'dark': '#252525',
        'snow-shadow': '#C3D9E2',
        'accent': '#C3D9E2',
      }
    },
  },
  plugins: [],
}