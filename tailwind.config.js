/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "brand-green": "#2cd284",
        "brand-green-light": "#b6e18a",
        "brand-orange": "#ff4f00",
      },
      fontFamily: {
        sans: ["Outfit", "sans-serif"],
        cocogoose: ["Outfit", "sans-serif"],
      },
      fontWeight: {
        ultralight: 300,
        light: 400,
        semilight: 400,
        regular: 500,
        medium: 500,
        semibold: 600,
      },
    },
  },
  plugins: [],
};
