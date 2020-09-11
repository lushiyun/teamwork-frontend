import React from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { Hidden, Drawer } from '@material-ui/core'
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
}))

const TeamsDrawer = ({ handleDrawerToggle, container, open }) => {
  const classes = useStyles()
  const theme = useTheme()

  const drawerContent = (
    <div className={classes.toolbar}>
      <TeamsList />
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

export default TeamsDrawer
