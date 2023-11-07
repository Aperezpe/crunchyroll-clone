/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "tertiary-color": "var(--tertiary-color)",
        "secondary-color": "var(--secondary-color)",
        "crunchy-orange": "var(--crunchy-orange)",
        "pill-color": "var(--pill-color)",
        "loading-bg-color": "var(--loading-bg-color)",
        "loading-element": "var(--loading-element)"
      },
      spacing: {
        '15': '3.75rem'
      }
    },
  },
  plugins: [],
}