import React from 'react'

import { makeStyles, useTheme } from '@material-ui/core/styles'
import { Hidden, Drawer, Typography, Link, Toolbar } from '@material-ui/core'

import TeamsList from '../features/teams/TeamsList'

export const drawerWidth = 300

const useStyles = makeStyles((theme) => ({
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  footer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
    position: 'fixed',
    left: 0,
    bottom: 0,
  },
}))

const VerticalNav = ({ handleDrawerToggle, container, open }) => {
  const classes = useStyles()
  const theme = useTheme()

  const footer = (
    <Toolbar className={classes.footer}>
      <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        <Link
          color="inherit"
          target="_blank"
          rel="noopener"
          href="https://medium.com/@lushiyun">
          Shiyun Lu
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    </Toolbar>
  )

  const drawerContent = (
    <div className={classes.toolbar}>
      <TeamsList />
      {footer}
    </div>
  )

  return (
    <nav className={classes.drawer} aria-label="teams and messages folders">
      <Hidden smUp implementation="css">
        <Drawer
          container={container}
          variant="temporary"
          anchor={theme.direction === 'rtl' ? 'right' : 'left'}
          open={open}
          onClose={handleDrawerToggle}
          classes={{
            paper: classes.drawerPaper,
          }}>
          {drawerContent}
        </Drawer>
      </Hidden>
      <Hidden xsDown implementation="css">
        <Drawer
          classes={{
            paper: classes.drawerPaper,
          }}
          variant="permanent"
          open>
          {drawerContent}
        </Drawer>
      </Hidden>
    </nav>
  )
}

export default VerticalNav
