/** @type {Plugin} */
const plugin = require('tailwindcss/plugin')
module.exports = {
  darkMode: 'class',
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite-react/**/*.js",
    "./public/**/*.html",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'flag-manga': "url('/flag/jp.svg')",
        'flag-manhwa': "url('/flag/kr.svg')",
        'flag-manhua': "url('/flag/cn.svg')",
        'flag-adult': "url('/flag/adult.svg')",
        'flag-indo': "url('/flag/id.svg')",
      }
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
    require('flowbite/plugin'),
    plugin(function({ addUtilities }) {
      addUtilities({
        '.no-scrollbar::-webkit-scrollbar': {
          'display': 'none',
        },
        '.no-scrollbar': {
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none'
        },
        '.text-2xs' : {
          'font-size' : '0.625rem',
          'line-height' : '0.75rem'
        },
        '.pt-135-p' : {
          'padding-top' : '135%'
        }
      })
    })
  ],
}
