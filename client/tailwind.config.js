/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      screens: {
        // Header nav collapses into a toggled menu below this width.
        nav: "1080px",
      },
      colors: {
        ink: "#0f172a",
        panel: "#f7f8fb",
        brand: "#94A3B8",
        accent: "#f59e0b",
        danger: "#dc2626",
        success: "#265b50",
      },
      fontSize: {
        "2xl": "1.375rem", // 22px
        "3xl": "2rem", // 32px
      },
    },
  },
  plugins: [],
};
