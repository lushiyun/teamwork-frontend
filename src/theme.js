import { createMuiTheme } from '@material-ui/core/styles'

const titleFont = {
  fontFamily: 'Display Fair, serif',
  fontWeight: 700,
}

const theme = createMuiTheme({
  typography: {
    fontFamily: 'Open Sans, sans-serif',
  },
  palette: {
    primary: {
      main: '#34675c',
    },
    secondary: {
      main: '#B3C100',
    },
  },
  typography: {
    h1: titleFont,
    h2: titleFont,
    h3: titleFont,
    h4: titleFont,
    h5: titleFont,
    h6: titleFont,
  },
})

export default theme
