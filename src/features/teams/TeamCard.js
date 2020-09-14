import React from 'react'
import textTruncate from '../../utils/textTruncate'

import {
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  teamCard: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
}))

const TeamCard = ({ team }) => {
  const classes = useStyles()
  const truncatedName = textTruncate(team.name, 18)
  const truncatedDesc = textTruncate(team.description, 60)
  return (
    <Grid item key={team.id} lg={3} md={6} sm={12} xs={12}>
      <Card className={classes.teamCard}>
        <CardActionArea>
          <CardMedia
            component="img"
            alt={team.name}
            height="160px"
            image={team.cover_url}
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
}

export default TeamCard
