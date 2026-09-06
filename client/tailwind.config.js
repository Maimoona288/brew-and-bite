/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        espresso: {
          50: "#f7f2ee",
          100: "#e9dcd2",
          200: "#d1b79f",
          300: "#b8926e",
          400: "#96693f",
          500: "#6b4226",
          600: "#57351f",
          700: "#432819",
          800: "#2f1c13",
          900: "#1c100b",
        },
        cinnamon: {
          400: "#c4854a",
          500: "#a9673a",
          600: "#8c5230",
        },
        cream: {
          50: "#fffaf3",
          100: "#f6ede2",
          200: "#eddfcd",
        },
        gold: {
          400: "#d9ab6a",
          500: "#c89b5c",
        },
      },
      fontFamily: {
        display: ["'Fraunces'", "serif"],
        body: ["'Work Sans'", "sans-serif"],
      },
      boxShadow: {
        soft: "0 8px 24px -8px rgba(43, 26, 15, 0.25)",
      },
    },
  },
  plugins: [],
};
