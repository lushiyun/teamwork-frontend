import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import Button from '@material-ui/core/Button'

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0()

  return (
    <Button size="medium" variant="outlined" onClick={loginWithRedirect}>
      Log In
    </Button>
  )
}

export default LoginButton
