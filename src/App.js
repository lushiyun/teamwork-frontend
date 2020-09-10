import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react'

import Nav from './app/Nav'
import { LandingPage } from './app/LandingPage'
import TeamsList from './features/teams/TeamsList'
import LoadingBackdrop from './app/LoadingBackdrop'

const AuthenticatedRoute = ({ component, ...args }) => (
  <Route
    component={withAuthenticationRequired(component, {
      onRedirecting: () => <LoadingBackdrop />,
    })}
    {...args}
  />
)

const App = () => {
  const { isLoading } = useAuth0()

  if (isLoading) {
    return <LoadingBackdrop />
  }

  return (
    <div style={{ minHeight: '100vh' }}>
      <Nav />
      <React.Fragment>
        <Switch>
        {/* TODO */}
          <Route path="/dashboard" component={TeamsList} /> 
          <Route exact path="/" component={LandingPage} />
          <Redirect from="*" to="/" />
        </Switch>
      </React.Fragment>
    </div>
  )
}

export default App
