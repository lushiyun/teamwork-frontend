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

import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { unwrapResult } from '@reduxjs/toolkit'

import { updateTeamMember } from './teamsSlice'
import { setSnackbar } from '../../ui/snackbarSlice'
import TeamShowPage from './TeamShowPage'
import textTruncate from '../../ui/textTruncate'

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
  const [open, setOpen] = useState(false)
  const handleClickOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const alreadyJoinedError = {
    open: true,
    type: 'error',
    message: 'You are already in this team',
  }

  const serverError = {
    open: true,
    type: 'error',
    message: 'Server busy, try again later',
  }

  const successMessage = {
    open: true,
    type: 'success',
    message: `Joined ${team.name} successfully`,
  }

  const dispatch = useDispatch()
  const [joinRequestStatus, setJoinRequestStatus] = useState('idle')

  const handleJoin = async () => {
    if (team.userIds.includes('25')) {
      dispatch(setSnackbar(alreadyJoinedError))
    } else if (joinRequestStatus !== 'idle') {
      dispatch(setSnackbar(serverError))
    } else {
      try {
        const updatedMembers = team.userIds.concat('25')
        const resultAction = await dispatch(
          updateTeamMember({
            id: team.id,
            data: { user_ids: updatedMembers },
          })
        )
        unwrapResult(resultAction)
        dispatch(setSnackbar(successMessage))
      } catch (err) {
        dispatch(setSnackbar(true, 'error', `${err}`))
      } finally {
        setJoinRequestStatus('idle')
      }
    }
  }

  const truncatedName = textTruncate(team.name, 18)
  const truncatedDesc = textTruncate(team.description, 60)

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
            <Button size="small" color="primary" onClick={handleJoin}>
              Join
            </Button>
            <Button size="small" color="primary" onClick={handleClickOpen}>
              Learn More
            </Button>
          </CardActions>
        </Card>
      </Grid>
      <TeamShowPage
        key={team.id}
        open={open}
        team={team}
        handleClose={handleClose}
        handleJoin={handleJoin}
      />
    </React.Fragment>
  )
}

export default TeamCard
