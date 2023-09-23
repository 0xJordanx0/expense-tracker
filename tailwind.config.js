/** @type {import('tailwindcss').Config} */
import { nextui } from '@nextui-org/react'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        "income": "#2ecc71",
        "expense": "#e74c3c",
        "saving": "#f39c12",
      },
    },
  },
  plugins: [nextui(), require("@tailwindcss/typography")],
}

