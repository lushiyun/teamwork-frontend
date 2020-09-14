import React, { useState } from 'react'
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
import TeamShowPage from './TeamShowPage'

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
  const [open, setOpen] = useState(false)
  const handleClickOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <React.Fragment>
      <Grid item lg={3} md={6} sm={12} xs={12}>
        <Card className={classes.teamCard}>
          <CardActionArea onClick={handleClickOpen}>
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
            <Button size="small" color="primary" onClick={handleClickOpen}>
              Learn More
            </Button>
          </CardActions>
        </Card>
      </Grid>
      <TeamShowPage open={open} handleClose={handleClose} team={team} />
    </React.Fragment>
  )
}

export default TeamCard
