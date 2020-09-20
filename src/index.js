import React, { createContext } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import { ThemeProvider, CssBaseline } from '@material-ui/core'
import actionCable from 'actioncable'

import Auth0ProviderWithHistory from './Auth0ProviderWithHistory'
import App from './App'
import store from './app/store'
import theme from './theme'
import { fetchUsers } from './features/users/usersSlice'
import {fetchTeams} from './features/teams/teamsSlice'
import { WS_ROOT } from './api/teamwork'
// import ActionCableContext from './app/ActionCableContext'

store.dispatch(fetchUsers())
// store.dispatch(fetchTeams())

const CableApp = {}
CableApp.cable = actionCable.createConsumer(WS_ROOT)
export const ActionCableContext = createContext()

ReactDOM.render(
  <Router>
    <Provider store={store}>
      <Auth0ProviderWithHistory>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <ActionCableContext.Provider value={CableApp.cable}>
            <App />
          </ActionCableContext.Provider>
        </ThemeProvider>
      </Auth0ProviderWithHistory>
    </Provider>
  </Router>,
  document.getElementById('root')
)
