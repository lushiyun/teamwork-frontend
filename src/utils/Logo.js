import React from 'react'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  logo: {
    fontFamily: 'Display Fair, serif',
    fontWeight: 700,
    marginRight: theme.spacing(1),
  },
}))

const Logo = () => {
  const classes = useStyles()
  return (
    <Typography variant="h5" className={classes.logo}>
      TeamWork.
    </Typography>
  )
}

export default Logo
