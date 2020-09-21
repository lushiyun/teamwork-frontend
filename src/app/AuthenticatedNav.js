import React, { useEffect, useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { useSelector, useDispatch } from 'react-redux'
import { unwrapResult } from '@reduxjs/toolkit'
import { makeStyles } from '@material-ui/core/styles'
import {
  AppBar,
  Toolbar,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'

import SearchBar from '../ui/SearchBar'
import LogoutButton from '../features/users/LogoutButton'
import Logo from '../ui/Logo'
import { drawerWidth } from './VerticleNav'
import {
  selectAllUsers,
  currentUserAdded,
  addNewUser,
  selectUserById,
} from '../features/users/usersSlice'
import AddTeamForm from '../features/teams/AddTeamForm'
import { Link } from 'react-router-dom'

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
  const { user, logout } = useAuth0()
  const users = useSelector(selectAllUsers)
  const dispatch = useDispatch()
  const [anchorEl, setAnchorEl] = useState(null)
  const [open, setOpen] = useState(false)

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

  const handleNewTeamClick = () => {
    setAnchorEl(null)
    setOpen(true)
  }

  const handleLogOutClick = () => {
    setAnchorEl(null)
    logout({ returnTo: window.location.origin })
  }

  return (
    <React.Fragment>
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
            <IconButton
              edge="end"
              color="inherit"
              onClick={(e) => setAnchorEl(e.currentTarget)}>
              <Avatar
                alt="Shiyun Lu"
                src="https://avatars2.githubusercontent.com/u/13009238?s=400&u=84c1659bae3d9b2c5c2974fd1ff561fe74396e5a&v=4"
              />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={() => setAnchorEl(null)}>
              <MenuItem onClick={handleNewTeamClick}>New Team</MenuItem>
              <MenuItem
                component={Link}
                to={'/teams'}
                onClick={() => setAnchorEl(null)}>
                Teams
              </MenuItem>
              <MenuItem onClick={handleLogOutClick}>Log Out</MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
      <AddTeamForm open={open} handleClose={() => setOpen(false)} />
    </React.Fragment>
  )
}

export default AuthenticatedNav
