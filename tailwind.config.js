import typography from "@tailwindcss/typography";

/** @type {import('tailwindcss').Config} */
const config = {
  darkMode: "class",  // ← add this
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [typography],
};

export default config;