/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        s901: "901px",
        s750: "750px",
        s601: "601px",
        s450: "450px",
      },
      colors: {
        primary: "#142d63",
        secondary: "#00a0ff",
        "default-gray": "rgba(0, 0, 0, 66%)",
        black: "rgba(0, 0, 0, 80%)",
      },
      transformOrigin: {
        0: "0%",
      },
      zIndex: {
        "-1": "-1",
      },

      keyframes: {
        "enter-bottom": {
          "0%": {
            opacity: "0",
            transform: "translateY(100px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        "enter-top": {
          "0%": {
            opacity: "0",
            transform: "translateY(-100px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        "enter-left": {
          "0%": {
            opacity: "0",
            transform: "translateX(-100px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateX(0)",
          },
        },
        "enter-right": {
          "0%": {
            opacity: "0",
            transform: "translateX(100px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateX(0)",
          },
        },
      },
      animation: {
        "enter-bottom": "enter-bottom 1s ease-in-out",
        "enter-top": "enter-top 1s ease-in-out",
        "enter-left": "enter-left 1s ease-in-out",
        "enter-right": "enter-right 1s ease-in-out",
      },
    },
  },
  plugins: [],
}

