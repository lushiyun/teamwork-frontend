import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { Grid, Fab, Tooltip } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import { makeStyles } from '@material-ui/core/styles'

import { selectAllTeams, fetchTeams } from './teamsSlice'
import TeamCard from './TeamCard'
import AddTeamForm from './AddTeamForm'

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
  },
  addFab: {
    position: 'sticky',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
    textAlign: 'right',
  },
}))

const TeamsGrid = () => {
  // Material UI helpers
  const classes = useStyles()
  const [open, setOpen] = useState(false)
  const handleClickOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const teams = useSelector(selectAllTeams)
  const currentUserId = useSelector((state) => state.users.currentUser)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchTeams(currentUserId))
  }, [currentUserId, dispatch])

  const renderedTeamCards = teams.map((team) => (
    <TeamCard team={team} key={team.id} />
  ))

  return (
    <div className={classes.root}>
      <Grid container spacing={2} alignItems="stretch">
        {renderedTeamCards}
      </Grid>
      <div className={classes.addFab}>
        <Tooltip title="Create a team">
          <Fab color="primary" onClick={handleClickOpen}>
            <AddIcon />
          </Fab>
        </Tooltip>
      </div>
      <AddTeamForm open={open} handleClose={handleClose} />
    </div>
  )
}

export default TeamsGrid
