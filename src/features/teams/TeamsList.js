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

import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

import {
  fetchTeams,
  updateTeamMember,
  selectTeamById,
  selectTeamsByUser,
} from './teamsSlice'
import LoadingBackdrop from '../../app/LoadingBackdrop'
import { setSnackbar } from '../../ui/snackbarSlice'
import { unwrapResult } from '@reduxjs/toolkit'
import TeamShowPage from './TeamShowPage'
import { fetchNewMessages } from '../messages/messagesSlice'

const TeamsList = () => {
  const [selectedId, setSelectedId] = useState(null)
  const selectedTeam = useSelector((state) => selectTeamById(state, selectedId))

  const [anchorEl, setAnchorEl] = useState(null)
  const handleMoreIconClick = (e) => setAnchorEl(e.currentTarget)
  const [open, setOpen] = useState(false)
  const handleClose = () => setOpen(false)

  const dispatch = useDispatch()
  const teams = useSelector((state) => selectTeamsByUser(state, '45'))

  let content

  const handleListItemClick = (e, id) => {
    setSelectedId(id)
    dispatch(fetchNewMessages(id))
  }

  content = teams.map((team) => (
    <ListItem
      component={Link}
      to={`/teams/${team.id}`}
      key={team.id}
      button
      selected={selectedId === team.id}>
      <Avatar
        variant="rounded"
        src={team.cover_url}
        alt={team.name}
        style={{ marginRight: '1rem' }}
      />
      <ListItemText
        primary={team.name}
        onClick={(e) => handleListItemClick(e, team.id)}
      />
      <ListItemSecondaryAction>
        <IconButton onClick={handleMoreIconClick} edge="end">
          <MoreHorizIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  ))

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
      aria-label="teams list"
      subheader={
        <ListSubheader component="div" id="list-subheader">
          Teams
        </ListSubheader>
      }>
      <Button
        component={Link}
        to={'/teams'}
        color="primary"
        style={{ marginLeft: '20px' }}
        startIcon={<AddIcon />}>
        Join or create a team
      </Button>
      {content}
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

export default TeamsList
