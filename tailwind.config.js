/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primaryButton': '#3950bb',
        'footer': '#1e3055',
        'line': '#227bff',
        'font': '#5064bd',
      },
      fontFamily: {
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

