/** @type {import('tailwindcss').Config} */
export default {
  mode: "jit",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      screens: {
      sm: "576px",
      "sm-max": { max: "576px" },
      md: "768px",
      "md-max": { max: "768px" },
      lg: "992px",
      "lg-max": { max: "992px" },
      xl: "1200px",
      "xl-max": { max: "1200px" },
      "2xl": "1320px",
      "2xl-max": { max: "1320px" },
    },
      colors: {
        'primaryButton': '#3950bb',
        'footer': '#1e3055',
        'line': '#227bff',
        'font': '#5064bd',
      },
      fontFamily: {
        'opensans': ['Open Sans', 'sans-serif'],
        'roboto': ['Roboto Slab', 'sans-serif'],
        'noto': ['Noto Slab', 'sans-serif'],
        'poppins': ['Poppins', 'sans-serif'],
      }, 
      backgroundImage: {
        'home': "url('public/pengurus.jpg')",
        'footerImage': "url('public/peta.png')"
      },
      transitionProperty: {
        'height': 'height',
      },
      transitionDuration: {
        '300': '300ms',
      },
      transitionTimingFunction: {
        'ease-in-out': 'ease-in-out',
      },
    },
  },
  plugins: [require("daisyui")],
}


