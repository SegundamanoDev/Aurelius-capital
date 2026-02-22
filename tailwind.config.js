/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        // Optional: Define a clean, modern monospaced font for code/design details
        mono: ["Fira Code", "Roboto Mono", "monospace"],
      },
    },
  },
  plugins: [],
};
