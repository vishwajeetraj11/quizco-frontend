

let colors = require('tailwindcss/colors')
delete colors['lightBlue'] // <-----
colors = { ...colors, ...{ transparent: 'transparent' } }

module.exports = {
   purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
    darkMode: false, // or 'media' or 'class'
    theme: {
      extend: {
        minHeight: {
          auto: 'auto',
          '0': '0',
          '1/10': '20%',
          '1/4': '25%',
          '1/2': '50%',
          '3/4': '75%',
          'full': '100%',
          'screen': '100vh'
        }
      },
      colors: {
      ...colors,
      'a': '#111111',
    }
    },
    variants: {
      variants: {
        backgroundColor: ({ after }) => after(['disabled']),
        opacity: ({ after }) => after(['disabled']),
        textColor: ({ after }) => after(['disabled']),
        cursor: ({ after }) => after(['disabled']),
        extend: {},
      },
      extend: {
       
      },
    },
   
  }