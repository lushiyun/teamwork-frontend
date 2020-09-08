import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Auth0Provider } from '@auth0/auth0-react'
import { ThemeProvider, CssBaseline } from '@material-ui/core'

import App from './App'
import store from './app/store'
import theme from './theme'

const domain = process.env.REACT_APP_AUTH0_DOMAIN
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Auth0Provider
        domain="dev-9j7h-fth.us.auth0.com"
        clientId="mR3ddfUdwjh57rnOzcUg2vNKkLw0qSi0"
        redirectUri={window.location.origin}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <App />
        </ThemeProvider>
      </Auth0Provider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)
