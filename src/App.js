import React, { useState, useEffect } from 'react'
import { Switch, Route } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { unwrapResult } from '@reduxjs/toolkit'
import { useAuth0 } from '@auth0/auth0-react'
import { makeStyles } from '@material-ui/core/styles'

import {
  selectAllUsers,
  currentUserAdded,
  addNewUser,
} from './features/users/usersSlice'
import { fetchUserTeams } from './features/teams/teamsSlice'
import { fetchUserAllMessages } from './features/messages/messagesSlice'

import UnauthenticatedNav from './app/UnauthenticatedNav'
import AuthenticatedNav from './app/AuthenticatedNav'
import VerticalNav from './app/VerticalNav'
import LandingPage from './app/LandingPage'
import LoadingBackdrop from './app/LoadingBackdrop'
import TeamsGrid from './features/teams/TeamsGrid'
import AuthenticatedRoute from './AuthenticatedRoute'
import GlobalSnackbar from './ui/GlobalSnackbar'
import MessagesList from './features/messages/MessagesList'
import Dashboard from './app/Dashboard'

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
  const [open, setOpen] = useState(false)
  const handleDrawerToggle = () => setOpen(!open)
  const { window } = props
  const container =
    window !== undefined ? () => window().document.body : undefined

  // initial loading (auth, user teams, user messages)
  const { isLoading, isAuthenticated, user } = useAuth0()

  const users = useSelector(selectAllUsers)
  const teamsStatus = useSelector((state) => state.teams.status)
  const messagesStatus = useSelector((state) => state.messages.status)

  const dispatch = useDispatch()

  useEffect(() => {
    if (!isAuthenticated) return
    const { email, name, picture } = user
    const existingUser = users.find((user) => user.email === email)
    if (existingUser) {
      dispatch(currentUserAdded(existingUser.id))

      const fetchTeamsForUser = async () => {
        await dispatch(fetchUserTeams(existingUser.id))
      }

      const fetchMessagesForUser = async () => {
        await dispatch(fetchUserAllMessages(existingUser.id))
      }

      fetchTeamsForUser()
      fetchMessagesForUser()
    } else {
      const addCurrentUser = async () => {
        const resultAction = await dispatch(
          addNewUser({ email, name, picture_url: picture })
        )
        const newUser = unwrapResult(resultAction)
        dispatch(currentUserAdded(newUser.id))
      }

      addCurrentUser()
    }
  }, [isAuthenticated])

  if (isLoading || teamsStatus === 'loading' || messagesStatus === 'loading') {
    return <LoadingBackdrop />
  }

  return (
    <React.Fragment>
      <GlobalSnackbar />
      <div style={{ display: 'flex' }}>
        {isAuthenticated ? (
          <AuthenticatedNav handleDrawerToggle={handleDrawerToggle} />
        ) : (
          <UnauthenticatedNav />
        )}
        {isAuthenticated && (
          <VerticalNav
            handleDrawerToggle={handleDrawerToggle}
            container={container}
            open={open}
          />
        )}
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Switch>
            <Route exact path="/" component={LandingPage} />
            <AuthenticatedRoute exact path="/dashboard" component={Dashboard} />
            <AuthenticatedRoute exact path="/teams" component={TeamsGrid} />
            <AuthenticatedRoute
              exact
              path="/teams/:teamId"
              children={<MessagesList />}
            />
          </Switch>
        </main>
      </div>
    </React.Fragment>
    // 404 route instead of redirect 
  )
}

export default App
