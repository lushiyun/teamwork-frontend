import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'

import LoginButton from '../features/user/LoginButton'

const Nav = () => (
  <AppBar position="fixed" elevation={0} color="transparent">
    <Toolbar>
      <Typography variant="h5" style={{ flexGrow: '1' }}>
        TeamWork.
      </Typography>
      <LoginButton />
    </Toolbar>
  </AppBar>
)

export default Nav
