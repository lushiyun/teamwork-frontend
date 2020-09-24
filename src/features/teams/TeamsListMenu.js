import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { unwrapResult } from '@reduxjs/toolkit'
import { useHistory } from 'react-router-dom'

import { Menu, MenuItem } from '@material-ui/core'

import { updateTeamMember } from './teamsSlice'
import { setSnackbar } from '../../ui/snackbarSlice'

const TeamsListMenu = (props) => {
  const { clickedTeam, anchorEl, setAnchorEl, setOpen } = props

  const currentUserId = useSelector((state) => state.users.currentUser)

  const history = useHistory()
  const dispatch = useDispatch()

  const [leaveRequestStatus, setLeaveRequestStatus] = useState('idle')
  const handleLeaveClick = async () => {
    if (leaveRequestStatus !== 'idle') {
      dispatch(setSnackbar(serverError))
    } else {
      try {
        setLeaveRequestStatus('pending')
        const updatedMembers = clickedTeam.userIds.filter(
          (id) => id !== currentUserId
        )
        const resultAction = await dispatch(
          updateTeamMember({
            id: clickedTeam.id,
            data: { user_ids: updatedMembers },
          })
        )
        unwrapResult(resultAction)
        history.push('/teams')
        dispatch(setSnackbar(successMessage(clickedTeam.name)))
      } catch (err) {
        console.error('Failed to save the team: ', err)
        setLeaveRequestStatus('failed')
      } finally {
        setLeaveRequestStatus('idle')
      }
    }
  }

  return (
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
  message: `Left ${name} successfully`,
})

export default TeamsListMenu
