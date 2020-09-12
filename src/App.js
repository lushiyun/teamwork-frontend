import React, { useState } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'

import { makeStyles, useTheme } from '@material-ui/core/styles'

import Nav from './app/Nav'
import AuthenticatedNav from './app/AuthenticatedNav'
import TeamsDrawer from './app/TeamsDrawer'
import LandingPage from './app/LandingPage'
import LoadingBackdrop from './app/LoadingBackdrop'
import TeamsGrid from './features/teams/TeamsGrid'
import AddTeamForm from './features/teams/AddTeamForm'
import AuthenticatedRoute from './AuthenticatedRoute'

const useStyles = makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}))

const App = (props) => {
  const classes = useStyles()
  const { window } = props
  const [open, setOpen] = useState(false)

  const container =
    window !== undefined ? () => window().document.body : undefined

  const handleDrawerToggle = () => setOpen(!open)

  return (
    <div style={{ display: 'flex' }}>
      <AuthenticatedNav handleDrawerToggle={handleDrawerToggle} />
      <TeamsDrawer
        handleDrawerToggle={handleDrawerToggle}
        container={container}
        open={open}
      />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <TeamsGrid />
      </main>
    </div>
  )
}

export default App
