

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
      },
      fontFamily: {
        'light': ['CircularStd-Light'],
        'book': ['CircularStd-Book'],
        'medium': ['CircularStd-Medium'],
        'bold': ['CircularStd-Bold'],
        'black': ['CircularStd-Black'],
      }
    },
    colors: {
      ...colors,
      'a': '#111111',
      'input-hover': '#ebecf0',
      'input-border': '#dfe1e6',
      'input-bg': '#f4f5f7',
      'input-color': '#172b4d'
    },
    boxShadow: {
      modal: 'rgb(0 0 0 / 9%) 0px 3px 12px',
      small: 'rgb(0 0 0 / 7%) 0px 5px 10px',
      large: 'rgb(0 0 0 / 7%) 0px 5px 20px',
      'large-modal': 'rgb(0 0 0 / 50%) 0px 16px 70px'
    },
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
