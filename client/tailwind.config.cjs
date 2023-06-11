/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", 'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: "#4821e7cc",
        active: "#1e1692",
        darkColor: "#404145",
        navbg: "#4821e7cc",
        darkblue: "#0d084d",
        clientBg: "#fafafa",
      },
      backgroundPosition: {
        "top-4": "right top -4rem",
      },
      boxShadow: {
        box: "0 0.14px 2.29266px rgb(0 0 0 / 3%), 0 0.37px 4.42626px rgb(0 0 0 / 5%), 0 3px 7px rgb(0 0 0 / 9%)",
      },
      screens: {
        laptop: "1136px",
        tab: "900px",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide"),require('flowbite/plugin')],
};
