import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Grid, Fab, Tooltip } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import { makeStyles } from '@material-ui/core/styles'

import { selectAllTeams } from './teamsSlice'
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
  const classes = useStyles()
  const teams = useSelector(selectAllTeams)
  const [open, setOpen] = useState(false)

  const handleClickOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const renderedTeamCards = () => teams.map((team) => <TeamCard team={team} />)

  return (
    <div className={classes.root}>
      <Grid container spacing={1} alignItems="stretch">
        {renderedTeamCards()}
      </Grid>
      <div className={classes.addFab}>
        <Tooltip title="Create a team" aria-label="create">
          <Fab
            color="primary"
            aria-label="add"
            onClick={handleClickOpen}>
            <AddIcon />
          </Fab>
        </Tooltip>
      </div>
      <AddTeamForm open={open} handleClose={handleClose} />
    </div>
  )
}

export default TeamsGrid
