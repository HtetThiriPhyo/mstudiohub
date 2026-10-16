/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        teal: { DEFAULT: "#005278", dark: "#05314A", light: "#3E87A6" },
        navy: "#05314A",
        mist: "#F4F7FA",
        ink: "#0B0F14",
        muted: "#667085",
        success: "#168A63",
        danger: "#D64545",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 10px 30px -12px rgba(16,42,67,0.18)",
        glass: "0 8px 32px -8px rgba(16,42,67,0.20)",
      },
    },
  },
  plugins: [],
};
