import React, { useEffect } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { useSelector, useDispatch } from 'react-redux'
import { unwrapResult } from '@reduxjs/toolkit'
import { makeStyles } from '@material-ui/core/styles'
import { AppBar, Toolbar, IconButton } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import AccountCircle from '@material-ui/icons/AccountCircle'

import SearchBar from '../utils/SearchBar'
import LogoutButton from '../features/users/LogoutButton'
import Logo from '../utils/Logo'
import { drawerWidth } from './TeamsDrawer'
import {
  selectAllUsers,
  currentUserAdded,
  addNewUser,
} from '../features/users/usersSlice'

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
  const { user } = useAuth0()
  const users = useSelector(selectAllUsers)
  const dispatch = useDispatch()

  // useEffect(() => {
  //   const { email, name, picture } = user
  //   const existingUser = users.find((user) => user.email === email)
  //   console.log(existingUser)
  //   if (existingUser) {
  //     dispatch(currentUserAdded(existingUser.id))
  //   } else {
  //     const addCurrentUser = async () => {
  //       const resultAction = await dispatch(
  //         addNewUser({ email, name, picture_url: picture })
  //       )
  //       const newUser = unwrapResult(resultAction)
  //       dispatch(currentUserAdded(newUser.id))
  //     }
  //     addCurrentUser()
  //   }
  // }, [user])

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
