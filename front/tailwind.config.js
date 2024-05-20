/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "path-to-your-node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}",
    "path-to-your-node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "bg-img": "url(../src/assets/bg-img.jpeg)",
      },
      colors: {
        brightBackground: "#FDF8EE",
        brightGreen: "#539165",
        lightText: "#959595",

        mainColor50: "#f0fdf4",
        mainColor100: "#dcfce7",
        mainColor200: "#bbf7d0",
        mainColor300: "#86efac",
        mainColor400: "#4ade80",
        mainColor500: "#22c55e",
        mainColor600: "#16a34a",
        mainColor700: "#15803d",
        mainColor800: "#166534",
        mainColor900: "#14532d",
        mainColor950: "#052e16",

        subColor50Lime: " #f7fee7",
        subColor100Lime: "#ecfccb",
        subColor200Lime: "#d9f99d",
        subColor300Lime: "#bef264",
        subColor400Lime: "#a3e635",
        subColor500Lime: "#84cc16",
        subColor600Lime: "#65a30d",
        subColor700Lime: "#4d7c0f",
        subColor800Lime: "#3f6212",
        subColor900Lime: "#365314",
        subColor950Lime: "#1a2e05",

        darkMode: {
          dark50: "#f9fafb",
          dark100: "#f3f4f6",
          dark200: "#e5e7eb",
          dark300: "#d1d5db",
          dark400: "#9ca3af",
          dark500: "#6b7280",
          dark600: "#4b5563",
          dark700: "#374151",
          dark800: "#1f2937",
          dark900: "#111827",
          dark950: "#030712",
        },
      },
      screens: {
        sm: "540px",
        md: "720px",
        lg: "960px",
        xl: "1140px",
        xxl: "1320px",
      },
    },
  },
  plugins: [],
  darkMode: "class",
});
