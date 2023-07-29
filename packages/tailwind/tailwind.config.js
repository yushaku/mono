/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "../../packages/ui/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primaryColor: "#234f66",
        secondColor: "#64ffda",
        tertiary: "#151030",
        grayColor: { DEFAULT: "#627480", 100: "#2d3748" },
        textColor: "#051320",
        strokeColor: "#F1F2F3",
        tagColor: "#F6F7F8",
        blackColor: "#051320",
        dark: {
          DEFAULT: "#323337",
          100: "#24283b",
          200: "#141922",
          300: "#050816",
          400: "#0f2243",
          500: "#0a0f2f",
        },
      },
      boxShadow: {
        lightShadow: "-2px 2px 20px 10px #00000024",
        darkShadow: "-2px 5px 10px rgba(255, 255, 255, 0.1)",
        inner: "inset 0 2px 4px 0 rgb(0 0 0 / 0.05)",
        card: "0px 35px 120px -15px #211e35",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("tailwindcss-animated"),
  ],
};
