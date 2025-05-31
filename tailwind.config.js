module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        birthday: {
          cake: "#f0e4d0",
          icing: "#f4ebdc",
          candle: "#7b020b",
          flame: "#ffcc00",
        },
      },
      keyframes: {
        flicker: {
          "0%, 100%": { transform: "rotate(-1deg) scale(1)" },
          "25%": { transform: "rotate(1deg) scale(1.1)" },
          "50%": { transform: "rotate(-1deg) scale(0.95)" },
          "75%": { transform: "rotate(1deg) scale(1.05)" },
        },
      },
      animation: {
        flicker: "flicker 2s ease-in-out infinite",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
