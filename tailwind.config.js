/*
** TailwindCSS Configuration File
**
** Docs: https://tailwindcss.com/docs/configuration
** Default: https://github.com/tailwindcss/tailwindcss/blob/master/stubs/defaultConfig.stub.js
*/
module.exports = {
  theme: {
    fontFamily: {
      'primary': ['Raleway','sans-serif']
    },
    colors: {
      
      black: {
        default: '#000000',
      },
      white: {
        default: '#FFFFFF',
      },
      grey: {
        lighter: '#fafafa',
        default: '#ddd',
        darker: '#424242',
      },
      debug: {
        red: 'red',
        blue: 'blue',
        yellow: 'yellow'
      }
    }
  },
  variants: {},
  plugins: []
}
