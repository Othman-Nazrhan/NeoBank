/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#3A86FF',
        background: {
          start: '#0B132B',
          end: '#1E293B',
        },
        text: {
          primary: '#E2E8F0',
          secondary: '#94A3B8',
        },
      },
      fontFamily: {
        sans: ['System', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
