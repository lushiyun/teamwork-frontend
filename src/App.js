import React, { useState } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'
import Paper from '@material-ui/core/Paper'

import { Navbar } from './app/Navbar'
import { LandingPage } from './app/LandingPage'
import { Box } from '@material-ui/core'

function App() {
  return (
    <Router>
      <Box style={{ minHeight: '100vh' }}>
        <Navbar />
        <LandingPage />
      </Box>
    </Router>
  )
}

export default App
