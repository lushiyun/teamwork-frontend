import React from 'react'

import { AppBar, Toolbar } from '@material-ui/core'

import Logo from '../ui/Logo'
import LoginButton from '../features/users/LoginButton'

const UnauthenticatedNav = () => (
  <AppBar position="fixed" elevation={0} color="transparent">
    <Toolbar style={{ justifyContent: 'space-between' }}>
      <Logo />
      <LoginButton />
    </Toolbar>
  </AppBar>
)

export default UnauthenticatedNav
