import {
  List,
  ListSubheader,
  ListItem,
  Avatar,
  ListItemText,
  Menu,
  MenuItem,
  ListItemSecondaryAction,
  IconButton,
  Button,
} from '@material-ui/core'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import AddIcon from '@material-ui/icons/Add'

import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

import {
  updateTeamMember,
  selectTeamById,
  selectTeamsByUser,
} from './teamsSlice'

import { setSnackbar } from '../../ui/snackbarSlice'
import { unwrapResult } from '@reduxjs/toolkit'
import TeamShowPage from './TeamShowPage'

const TeamsList = () => {
  // Material UI styling helpers
  const [selectedId, setSelectedId] = useState(null)
  const handleListItemClick = (e, id) => setSelectedId(id)

  const [anchorEl, setAnchorEl] = useState(null)
  const handleMoreIconClick = (e) => setAnchorEl(e.currentTarget)

  const [open, setOpen] = useState(false)
  const handleClose = () => setOpen(false)
  // Material UI styling helpers

  const teams = useSelector((state) => selectTeamsByUser(state, '45'))
  const selectedTeam = useSelector((state) => selectTeamById(state, selectedId))

  const renderedTeamListItems = teams.map((team) => (
    <ListItem
      component={Link}
      to={`/teams/${team.id}`}
      key={team.id}
      button
      selected={selectedId === team.id}
      onClick={(e) => handleListItemClick(e, team.id)}>
      <Avatar
        variant="rounded"
        src={team.cover_url}
        alt={team.name}
        style={{ marginRight: '1rem' }}
      />
      <ListItemText primary={team.name} />
      <ListItemSecondaryAction>
        <IconButton onClick={handleMoreIconClick} edge="end">
          <MoreHorizIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  ))

  // Leave team function from menu
  const dispatch = useDispatch()
  const [leaveRequestStatus, setLeaveRequestStatus] = useState('idle')

  const handleLeaveClick = async () => {
    if (leaveRequestStatus !== 'idle') {
      dispatch(setSnackbar(serverError))
    } else {
      try {
        const updatedMembers = selectedTeam.userIds.filter((id) => id !== '45')
        const resultAction = await dispatch(
          updateTeamMember({
            id: selectedId,
            data: { user_ids: updatedMembers },
          })
        )
        unwrapResult(resultAction)
        dispatch(setSnackbar(successMessage(selectedTeam.name)))
      } catch (err) {
        console.error('Failed to save the team: ', err)
      } finally {
        setLeaveRequestStatus('idle')
      }
    }
  }

  const menu = (
    <Menu
      anchorEl={anchorEl}
      keepMounted
      open={Boolean(anchorEl)}
      onClose={() => setAnchorEl(null)}>
      <MenuItem
        onClick={() => {
          setAnchorEl(null)
          setOpen(true)
        }}>
        Details
      </MenuItem>
      <MenuItem
        onClick={() => {
          setAnchorEl(null)
          handleLeaveClick()
        }}>
        Leave
      </MenuItem>
    </Menu>
  )

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
      {menu}
      {selectedTeam && (
        <TeamShowPage
          open={open}
          handleClose={handleClose}
          team={selectedTeam}
        />
      )}
    </List>
  )
}

// Snackbar helpers
const serverError = {
  open: true,
  type: 'error',
  message: 'Server busy, try again later',
}

const successMessage = (name) => ({
  open: true,
  type: 'success',
  message: `Left ${name} successfully`,
})

export default TeamsList
