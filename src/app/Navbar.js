import React from 'react'
import { Link } from 'react-router-dom'

import { makeStyles } from '@material-ui/core/styles'
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  logo: {
    flexGrow: 1,
    fontFamily: 'Playfair Display, serif',
    fontWeight: '700',
  },
}))

export const Navbar = () => {
  const classes = useStyles()

  return (
    <AppBar position="fixed" elevation={0} color="transparent">
      <Toolbar>
        <Typography className={classes.logo} variant="h5">
          TeamWork.
        </Typography>
        <Button variant="outlined">Log In</Button>
      </Toolbar>
    </AppBar>
  )
}
