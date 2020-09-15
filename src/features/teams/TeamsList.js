import {
  List,
  ListSubheader,
  ListItem,
  Avatar,
  ListItemText,
  Menu,
  MenuItem,
} from '@material-ui/core'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'

import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import {
  selectAllTeams,
  fetchTeams,
  updateTeamMember,
  selectTeamById,
} from './teamsSlice'
import LoadingBackdrop from '../../app/LoadingBackdrop'
import { setSnackbar } from '../../ui/snackbarSlice'
import { unwrapResult } from '@reduxjs/toolkit'
import TeamShowPage from './TeamShowPage'

const TeamsList = () => {
  const [selectedId, setSelectedId] = useState(null)
  const handleListItemClick = (e, id) => setSelectedId(id)
  const [anchorEl, setAnchorEl] = useState(null)
  const handleMoreIconClick = (e) => setAnchorEl(e.currentTarget)
  const [open, setOpen] = useState(false)
  const handleClose = () => setOpen(false)

  const dispatch = useDispatch()
  const teams = useSelector(selectAllTeams)
  const selectedTeam = useSelector((state) => selectTeamById(state, selectedId))
  const teamsStatus = useSelector((state) => state.teams.status)
  const error = useSelector((state) => state.teams.error)

  useEffect(() => {
    if (teamsStatus === 'idle') {
      dispatch(fetchTeams())
    }
  }, [teamsStatus, dispatch])

  let content

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

  if (teamsStatus === 'loading') {
    content = <LoadingBackdrop />
  } else if (teamsStatus === 'succeeded') {
    content = teams.map((team) => (
      <ListItem
        key={team.id}
        button
        selected={selectedId === team.id}
        onClick={(event) => handleListItemClick(event, team.id)}>
        <Avatar
          variant="rounded"
          src={team.cover_url}
          alt={team.name}
          style={{ marginRight: '1rem' }}
        />
        <ListItemText primary={team.name} />
        <MoreHorizIcon onClick={handleMoreIconClick} />
      </ListItem>
    ))
  } else if (teamsStatus === 'error') {
    content = <div>{error}</div>
  }

  return (
    <List
      component="nav"
      aria-label="teams list"
      subheader={
        <ListSubheader component="div" id="list-subheader">
          Teams
        </ListSubheader>
      }>
      {content}
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}>
        <MenuItem onClick={() => setOpen(true)}>Details</MenuItem>
        <MenuItem onClick={handleLeaveClick}>Leave</MenuItem>
      </Menu>
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
