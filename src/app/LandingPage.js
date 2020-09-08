import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { CssBaseline, Grid, Typography, Button, Box } from '@material-ui/core'

import introPhoto from './Work-together.png'

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  introTitle: {
    marginBottom: theme.spacing(5),
  },
  buttonContainer: {},
  introBackground: {
    background:
      'linear-gradient(125deg, rgba(76,181,245,1) 0%, rgba(179,193,0,1) 100%)',
  },
  introPhoto: {
    width: '50%',
    height: 'auto',
    position: 'absolute',
    top: '28vh',
    right: '10%',
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
}))

export const LandingPage = () => {
  const classes = useStyles()

  return (
    <Grid container component="main" className={classes.root} spacing={0}>
      <CssBaseline />
      <Grid container item xs={12} sm={6} direction="column" justify="center">
        <Box maxWidth="450px" alignSelf="center">
          <Typography variant="h2">Team Work</Typography>
          <Typography variant="h4" className={classes.introTitle}>
            Makes the Dream Work
          </Typography>
          <Typography>
            A React + Redux Toolkit app made by Shiyun Lu for Flatiron School.
            TeamWork supports team task management and group chat with
            ActionCable and websockets.
          </Typography>
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            spacing={2}
            style={{ marginTop: '25px' }}>
            <Grid item>
              <Button color="secondary" variant="contained">
                Sign Up
              </Button>
            </Grid>
            <Grid item>
              <Button color="secondary" variant="contained">
                Watch the Demo
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Grid>
      <Grid item xs={12} sm={6} className={classes.introBackground}>
        <img
          className={classes.introPhoto}
          src={introPhoto}
          alt="People working and talking together"
        />
      </Grid>
    </Grid>
  )
}
