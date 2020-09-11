import React from 'react'
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
} from '@material-ui/core'

import textTruncate from '../../utils/textTruncate'

const TeamsGrid = () => {
  const teams = useSelector((state) => state.teams)

  const renderedTeamCards = () =>
    teams.map((team) => {
      const truncatedName = textTruncate(team.name, 18)
      const truncatedDesc = textTruncate(team.description, 60)
      return (
        <Grid item sm={3}>
          <Card key={team.id}>
            <CardActionArea>
              <CardMedia
                component="img"
                alt={team.name}
                height="200"
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
    <Grid
      container
      spacing={1}
      style={{ paddingTop: '1rem', paddingBottom: '1rem' }}>
      {renderedTeamCards()}
    </Grid>
  )
}

export default TeamsGrid
