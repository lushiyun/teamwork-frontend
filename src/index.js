import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
// import { Provider } from 'react-redux'
import { ThemeProvider, CssBaseline } from '@material-ui/core'

import Auth0ProviderWithHistory from './Auth0ProviderWithHistory'
import App from './App'
// import store from './app/store'
import theme from './theme'

ReactDOM.render(
  <Router>
    <Auth0ProviderWithHistory>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </Auth0ProviderWithHistory>
  </Router>,
  document.getElementById('root')
)
