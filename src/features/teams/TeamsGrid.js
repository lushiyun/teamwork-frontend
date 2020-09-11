import React, { useState } from 'react'
import { useSelector } from 'react-redux'

import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Grid,
  Fab,
} from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import { makeStyles } from '@material-ui/core/styles'

import textTruncate from '../../utils/textTruncate'
import AddTeamForm from './AddTeamForm'

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
  },
  addFab: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}))

const TeamsGrid = () => {
  const classes = useStyles()
  const teams = useSelector((state) => state.teams)
  const [open, setOpen] = useState(false)

  const handleClickOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const renderedTeamCards = () =>
    teams.map((team) => {
      const truncatedName = textTruncate(team.name, 18)
      const truncatedDesc = textTruncate(team.description, 60)
      return (
        <Grid item lg={3} md={6} sm={12} xs={12}>
          <Card key={team.id}>
            <CardActionArea>
              <CardMedia
                component="img"
                alt={team.name}
                height="160px"
                image={team.cover}
                title={team.name}
              />
              <CardContent>
                <Typography gutterBottom variant="h5">
                  {truncatedName}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {truncatedDesc}
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button size="small" color="primary">
                Join
              </Button>
              <Button size="small" color="primary">
                Learn More
              </Button>
            </CardActions>
          </Card>
        </Grid>
      )
    })

  return (
    <div className={classes.root}>
      <Grid container spacing={1}>
        {renderedTeamCards()}
      </Grid>
      <Fab
        color="primary"
        aria-label="add"
        className={classes.addFab}
        onClick={handleClickOpen}>
        <AddIcon />
      </Fab>
      <AddTeamForm open={open} handleClose={handleClose} />
    </div>
  )
}

export default TeamsGrid
