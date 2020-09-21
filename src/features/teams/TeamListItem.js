import React, { useEffect, useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import {
  ListItem,
  ListItemText,
  Avatar,
  ListItemSecondaryAction,
  IconButton,
  Typography,
  Box,
} from '@material-ui/core'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import { ActionCableContext } from '../../index'

const TeamListItem = (props) => {
  const { team, selectedId, handleMoreIconClick, handleListItemClick } = props
  const [fontWeight, setFontWeight] = useState('fontWeightRegular')

  const cable = useContext(ActionCableContext)
  useEffect(() => {
    const channel = cable.subscriptions.create(
      { channel: 'UnreadsChannel', id: team.id },
      {
        received: () => {
          if (selectedId !== team.id) {
            setFontWeight('fontWeightBold')
          }
        },
      }
    )
    return () => {
      channel.unsubscribe()
    }
  }, [team])

  useEffect(() => {
    if (selectedId === team.id) {
      setFontWeight('fontWeightRegular')
    }
  }, [selectedId])

  return (
    <ListItem
      component={Link}
      to={`/teams/${team.id}`}
      button
      selected={selectedId === team.id}
      onClick={(e) => handleListItemClick(e, team.id)}>
      <Avatar
        variant="rounded"
        src={team.cover_url}
        alt={team.name}
        style={{ marginRight: '1rem' }}
      />
      <ListItemText
        primary={
          <Typography>
            <Box fontWeight={fontWeight}>{team.name}</Box>
          </Typography>
        }
      />
      <ListItemSecondaryAction>
        <IconButton onClick={handleMoreIconClick} edge="end">
          <MoreHorizIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  )
}

export default TeamListItem
