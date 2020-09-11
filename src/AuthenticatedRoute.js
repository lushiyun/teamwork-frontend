import React from 'react'
import { Route } from 'react-router-dom'
import { withAuthenticationRequired } from '@auth0/auth0-react'
import LoadingBackdrop from './app/LoadingBackdrop'

const AuthenticatedRoute = ({ component, ...args }) => (
  <Route
    component={withAuthenticationRequired(component, {
      onRedirecting: () => <LoadingBackdrop />,
    })}
    {...args}
  />
)

export default AuthenticatedRoute
