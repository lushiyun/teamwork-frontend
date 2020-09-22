import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { unwrapResult } from '@reduxjs/toolkit'

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

  const currentUserId = useSelector((state) => state.users.currentUser)

  const dispatch = useDispatch()

  const [joinRequestStatus, setJoinRequestStatus] = useState('idle')
  const handleJoin = async () => {
    if (joinRequestStatus !== 'idle') {
      dispatch(setSnackbar(serverError))
    } else {
      try {
        setJoinRequestStatus('pending')
        const updatedMembers = team.userIds.concat(currentUserId)
        const resultAction = await dispatch(
          updateTeamMember({
            id: team.id,
            data: { user_ids: updatedMembers },
          })
        )
        unwrapResult(resultAction)
        dispatch(setSnackbar(successMessage(team.name)))
      } catch (err) {
        console.error('Failed to save the team: ', err)
        setJoinRequestStatus('failed')
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
            {!team.userIds.includes(currentUserId) && (
              <Button size="small" color="primary" onClick={handleJoin}>
                Join
              </Button>
            )}
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

// snackbar helpers
const serverError = {
  open: true,
  type: 'error',
  message: 'Server busy, try again later',
}

const successMessage = (name) => ({
  open: true,
  type: 'success',
  message: `Joined ${name} successfully`,
})

export default TeamCard
