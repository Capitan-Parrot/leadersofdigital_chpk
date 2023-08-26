/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      md: "860px",
    },
    extend: {
      colors: {
        primary: "#0541F0",
        text: {
          primary: "#282828",
        },
        bg: {
          primary: "#FAFAFA",
          chat: "linear-gradient(69deg, rgba(5, 65, 240, 0.08) 42.29%, rgba(5, 65, 240, 0.02) 100%, rgba(5, 65, 240, 0.02) 100%)",
        },
        border: {
          main: "#E5E5E5",
        },
      },
    },
  },
  plugins: [],
};
