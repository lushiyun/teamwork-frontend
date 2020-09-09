import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'

import { AppBar, Toolbar, Typography } from '@material-ui/core'

import LoginButton from '../features/user/LoginButton'
import LogoutButton from '../features/user/LogoutButton'

export const Navbar = () => {
  const { isAuthenticated } = useAuth0()

  return (
    <AppBar position="fixed" elevation={0} color="transparent">
      <Toolbar>
        <Typography variant="h5" style={{ flexGrow: '1' }}>
          TeamWork.
        </Typography>
        {isAuthenticated ? <LogoutButton /> : <LoginButton />}
      </Toolbar>
    </AppBar>
  )
}
