import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react'

import Nav from './app/Nav'
import AuthenticatedNav from './app/AuthenticatedNav'
import SideBar from './app/SideBar'
import LandingPage from './app/LandingPage'
import LoadingBackdrop from './app/LoadingBackdrop'
import PlaceHolder from './app/PlaceHolder'
import TeamsGrid from './features/teams/TeamsGrid'
import AddTeamForm from './features/teams/AddTeamForm'

const AuthenticatedRoute = ({ component, ...args }) => (
  <Route
    component={withAuthenticationRequired(component, {
      onRedirecting: () => <LoadingBackdrop />,
    })}
    {...args}
  />
)

const App = () => {
  const { isLoading, isAuthenticated } = useAuth0()

  if (isLoading) {
    return <LoadingBackdrop />
  }

  // const renderedConstantComponents = () => {
  //   if (isAuthenticated) {
  //     return (
  //       <React.Fragment>
  //         <AuthenticatedNav />
  //         <SideBar />
  //       </React.Fragment>
  //     )
  //   }
  //   return <Nav />
  // }

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* {renderedConstantComponents()} */}
      <AuthenticatedNav />
      <main style={{ height: '100%', display: 'flex' }}>
        <SideBar />
        <Switch>
          <Route path="/dashboard" component={PlaceHolder} />
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/teams" component={TeamsGrid} />
          <Route exact path="/teams/new" component={AddTeamForm} />
          <Redirect from="*" to="/" />
        </Switch>
      </main>
    </div>
  )
}

export default App
