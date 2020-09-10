import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'

import LoginButton from '../features/user/LoginButton'
import Logo from './Logo'
import AuthenticatedNav from './AuthenticatedNav'

const Nav = () => {
  const { isAuthenticated } = useAuth0()

  console.log(isAuthenticated)

  //TODO

  // if (isAuthenticated) {
  return <AuthenticatedNav />
  // }

  return (
    <AppBar position="fixed" elevation={0} color="transparent">
      <Toolbar>
        <Typography variant="h5" style={{ flexGrow: '1' }}>
          TeamWork.
        </Typography>
        <LoginButton />
      </Toolbar>
    </AppBar>
  )
}
export default Nav
