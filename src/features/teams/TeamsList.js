import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { List, ListSubheader, Button } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'

import { selectTeamsByUser } from './teamsSlice'
import TeamShowPage from './TeamShowPage'
import TeamsListMenu from './TeamsListMenu'
import TeamListItem from './TeamListItem'

const TeamsList = () => {
  // Material UI styling helpers
  const [open, setOpen] = useState(false)
  const handleClose = () => setOpen(false)
  const [anchorEl, setAnchorEl] = useState(null)
  // Material UI styling helpers

  const currentUserId = useSelector((state) => state.users.currentUser)
  const teams = useSelector((state) => selectTeamsByUser(state, currentUserId))
  const [clickedTeam, setClickedTeam] = useState(null)
  const handleMoreIconClick = (e, team) => {
    setAnchorEl(e.currentTarget)
    setClickedTeam(team)
  }

  const renderedTeamListItems = teams.map((team) => (
    <TeamListItem
      key={team.id}
      team={team}
      handleMoreIconClick={(e) => handleMoreIconClick(e, team)}
    />
  ))

  return (
    <List
      component="nav"
      subheader={
        <ListSubheader component="div" id="list-subheader">
          Teams
        </ListSubheader>
      }>
      <Button
        component={Link}
        to={'/teams'}
        color="primary"
        style={{ marginLeft: '2rem' }}
        startIcon={<AddIcon />}>
        Join or create a team
      </Button>
      {renderedTeamListItems}
      <TeamsListMenu
        clickedTeam={clickedTeam}
        anchorEl={anchorEl}
        setAnchorEl={setAnchorEl}
        setOpen={setOpen}
      />
      {clickedTeam && (
        <TeamShowPage
          open={open}
          handleClose={handleClose}
          team={clickedTeam}
        />
      )}
    </List>
  )
}

export default TeamsList
