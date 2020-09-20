import React, { useState, useEffect } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useAuth0 } from '@auth0/auth0-react'
import { makeStyles } from '@material-ui/core/styles'

import { fetchTeams } from './features/teams/teamsSlice'

import Nav from './app/Nav'
import AuthenticatedNav from './app/AuthenticatedNav'
import TeamsDrawer from './app/TeamsDrawer'
import LandingPage from './app/LandingPage'
import LoadingBackdrop from './app/LoadingBackdrop'
import TeamsGrid from './features/teams/TeamsGrid'
import AuthenticatedRoute from './AuthenticatedRoute'
import GlobalSnackbar from './ui/GlobalSnackbar'
import TeamChat from './features/teams/TeamChat'
import { fetchUsers } from './features/users/usersSlice'

const useStyles = makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
  content: {
    height: '100vh',
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}))

const App = (props) => {
  // helpers for material UI styles
  const classes = useStyles()
  const { window } = props
  const [open, setOpen] = useState(false)
  const container =
    window !== undefined ? () => window().document.body : undefined
  const handleDrawerToggle = () => setOpen(!open)

  // initial loading (auth, users, teams)
  const { isLoading, isAuthenticated } = useAuth0()

  const dispatch = useDispatch()
  const teamsStatus = useSelector((state) => state.teams.status)
  const teamsError = useSelector((state) => state.teams.error)
  useEffect(() => {
    if (teamsStatus === 'idle') {
      dispatch(fetchTeams())
    }
  }, [teamsStatus, dispatch])

  const usersStatus = useSelector((state) => state.users.status)
  const usersError = useSelector((state) => state.users.error)
  useEffect(() => {
    if (usersStatus === 'idle') {
      dispatch(fetchUsers())
    }
  }, [usersStatus, dispatch])

  if (teamsStatus === 'loading' || usersStatus === 'loading') {
    return <LoadingBackdrop />
  }

  // if (teamsStatus === 'error') 

  return (
    <React.Fragment>
      <GlobalSnackbar />
      {!isAuthenticated && (
        <div style={{ display: 'flex' }}>
          <AuthenticatedNav handleDrawerToggle={handleDrawerToggle} />
          <TeamsDrawer
            handleDrawerToggle={handleDrawerToggle}
            container={container}
            open={open}
          />
          <main className={classes.content}>
            <div className={classes.toolbar} />
            <Switch>
              <Route exact path="/teams" component={TeamsGrid} />
              <Route path="/teams/:teamId" children={<TeamChat />} />
            </Switch>
          </main>
        </div>
      )}

      {/* {!isAuthenticated && (
        <div style={{ height: '100vh' }}>
          <Nav />
          <Route exact path="/" component={LandingPage} />
        </div>
      )} */}
    </React.Fragment>
  )
}

export default App
