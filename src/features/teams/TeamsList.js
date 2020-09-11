import React, { useState } from 'react'
import { useSelector } from 'react-redux'

import { List, ListSubheader } from '@material-ui/core'

import TeamListItem from './TeamListItem'

const TeamsList = () => {
  const teams = useSelector((state) => state.teams)
  const [selectedIndex, setSelectedIndex] = useState(1)

  const handleListItemClick = (e, index) => setSelectedIndex(index)

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
    </List>
  )
}

export default TeamsList
