import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { AppBar, Toolbar, IconButton } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import AccountCircle from '@material-ui/icons/AccountCircle'

import SearchBar from '../utils/SearchBar'
import LogoutButton from '../features/user/LogoutButton'
import Logo from '../utils/Logo'
import { drawerWidth } from './TeamsDrawer'

const useStyles = makeStyles((theme) => ({
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
    background:
      'linear-gradient(125deg, rgba(76,181,245,1) 0%, rgba(179,193,0,1) 100%)',
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  grow: {
    flexGrow: 1,
  },
}))

const AuthenticatedNav = ({ handleDrawerToggle }) => {
  const classes = useStyles()

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          className={classes.menuButton}
          aria-label="menu"
          onClick={handleDrawerToggle}>
          <MenuIcon />
        </IconButton>
        <Logo />
        <SearchBar />
        <div className={classes.grow} />
        <div className={classes.sectionDesktop}>
          {/* TODO */}
          <IconButton
            edge="end"
            aria-label="account of current user"
            aria-haspopup="true"
            color="inherit">
            <AccountCircle />
          </IconButton>
          <LogoutButton />
        </div>
      </Toolbar>
    </AppBar>
  )
}

export default AuthenticatedNav
