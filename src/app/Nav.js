import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'

import LoginButton from '../features/user/LoginButton'
import Logo from '../utils/Logo'

const Nav = () => (
  <AppBar position="fixed" elevation={0} color="transparent">
    <Toolbar>
      <Logo />
      <LoginButton />
    </Toolbar>
  </AppBar>
)

export default Nav
