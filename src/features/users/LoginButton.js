import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import Button from '@material-ui/core/Button'

const LoginButton = ({ text }) => {
  const { loginWithRedirect } = useAuth0()

  return (
    <Button
      variant={text === 'Log In' ? 'outlined' : 'contained'}
      color={text === 'Log In' ? 'default' : 'secondary'}
      onClick={() => loginWithRedirect()}>
      {text}
    </Button>
  )
}

export default LoginButton
