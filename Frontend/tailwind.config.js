/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "dark-bg": "#1a1a1a",
        "gradient-start": "#111827",
        "gradient-end": "#1f2937",
      },
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
        serif: [
          "Merriweather",
          "Georgia",
          "Cambria",
          "Times New Roman",
          "Times",
          "serif",
        ],
      },
      boxShadow: {
        card: "0 5px 10px rgba(0,0,0,.2)",
        "card-hover": "0 10px 20px rgba(0,0,0,.3)",
      },
    },
  },
  plugins: [],
};