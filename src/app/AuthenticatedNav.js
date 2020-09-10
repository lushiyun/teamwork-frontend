import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import AccountCircle from '@material-ui/icons/AccountCircle'

import SearchBar from '../utils/SearchBar'
import MenuPopup from '../utils/MenuPopup'

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  gradientBackground: {
    background:
      'linear-gradient(125deg, rgba(76,181,245,1) 0%, rgba(179,193,0,1) 100%)',
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
}))

const AuthenticatedNav = () => {
  const menuId = 'Profile Menu Popup'
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = useState(null)

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget)
  }

  return (
    <div className={classes.grow}>
      <AppBar elevation={0} className={classes.gradientBackground}>
        <Toolbar>
          <Typography variant="h5">TeamWork.</Typography>
          <SearchBar />
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            {/* TODO */}
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit">
              <AccountCircle />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      <MenuPopup menuId={menuId} />
    </div>
  )
}

export default AuthenticatedNav
