import React from 'react'
import { useSelector } from 'react-redux'

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Divider,
} from '@material-ui/core'

import { selectAllUsers } from '../users/usersSlice'

const TeamShowPage = ({ open, handleClose, team }) => {
  const users = useSelector(selectAllUsers)
  const members = users.filter((user) => team.userIds.includes(user.id))

  // const renderedMembers = () => (
  //   members.map(member => (
  //     <Avatar
  //   ))
  // )

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{team.name}</DialogTitle>
      <Divider />
      <DialogContent>
        <Typography variant="body1">{team.description}</Typography>
      </DialogContent>
    </Dialog>
  )
}

export default TeamShowPage
