module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        birthday: {
          cake: '#f0e4d0',
          icing: '#f4ebdc',
          candle: '#7b020b',
          flame: '#ffcc00',
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};