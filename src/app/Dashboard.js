import React, { useState, useEffect } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { format } from 'date-fns'

import { Container, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    height: 'calc(100% - 60px)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
}))

const Dashboard = () => {
  const classes = useStyles()
  const { user } = useAuth0()
  const firstName = user.name.split(' ')[0]
  const [time, setTime] = useState(Date.now())

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(Date.now())
    }, 1000)
    return () => {
      clearInterval(intervalId)
    }
  }, [])

  return (
    <Container maxWidth="md" className={classes.root}>
      <Typography variant="h2" gutterBottom color="textSecondary">
        Hello, {firstName}
      </Typography>
      <Typography variant="h4" color="textSecondary">
        It is {format(time, 'PPpp')}
      </Typography>
    </Container>
  )
}

export default Dashboard
