import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { List, ListSubheader, Fab } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import ListIcon from '@material-ui/icons/List'
import { makeStyles } from '@material-ui/core/styles'

import TeamListItem from './TeamListItem'

const useStyles = makeStyles((theme) => ({
  addFab: {
    position: 'sticky',
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}))

const TeamsList = () => {
  const classes = useStyles()
  const teams = useSelector((state) => state.teams)
  const [selectedIndex, setSelectedIndex] = useState(1)

  const handleListItemClick = (e, index) => {
    setSelectedIndex(index)
  }

  const handleAddTeamClick = (e) => {}

  const renderedTeams = () =>
    teams.map((team, index) => (
      <TeamListItem
        team={team}
        index={index}
        selectedIndex={selectedIndex}
        handleListItemClick={handleListItemClick}
      />
    ))

  return (
    <List
      component="nav"
      aria-label="teams list"
      subheader={
        <ListSubheader component="div" id="list-subheader">
          Teams
        </ListSubheader>
      }>
      {renderedTeams()}
      <div className={classes.addFab}>
        <Fab color="primary" aria-label="add" style={{ marginRight: '1rem' }}>
          <AddIcon />
        </Fab>
        <Link to="/teams">
          <Fab color="secondary" aria-label="view index">
            <ListIcon />
          </Fab>
        </Link>
      </div>
    </List>
  )
}

export default TeamsList
