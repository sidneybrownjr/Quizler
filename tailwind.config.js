module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    container: {
      center: true,
      padding: '2rem',
    },
    fontFamily: {
      display: ['Flamenco', 'cursive'],
      body: ['Asap', 'sans-serif'],
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
