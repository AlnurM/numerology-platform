/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'aot',
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './widgets/**/*.{js,ts,jsx,tsx}',
    './features/**/*.{js,ts,jsx,tsx}',
    './entities/**/*.{js,ts,jsx,tsx}',
    './shared/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      boxShadow: {
        inner: 'rgb(204, 219, 232) 3px 3px 6px 0px inset, rgba(255, 255, 255, 0.5) -3px -3px 6px 1px inset'
      }
    },
  },
  plugins: [],
}
