/** @type {import('tailwindcss').Config} */
export default {
  content: ["./public/**/*.html", "./src/**/*.{js,jsx,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        "main-blue": "#0096FF",
        "light-blue": "#F0F9FF",
      },
    },
  },
  plugins: [],
};
