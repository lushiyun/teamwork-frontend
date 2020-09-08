import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'
import Grid from '@material-ui/core/Grid'

import { Navbar } from './app/Navbar'
import { LandingPage } from './app/LandingPage'

function App() {
  return (
    <Router>
      <Grid container direction="column" style={{ minHeight: '100vh' }}>
        <Grid item>
          <Navbar />
        </Grid>
        <Grid item>
          <LandingPage />
        </Grid>
      </Grid>
    </Router>
  )
}

export default App
