import React, { useEffect, useState, useContext } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  ListItem,
  ListItemText,
  Avatar,
  ListItemSecondaryAction,
  IconButton,
  Typography,
  Box,
  Badge,
} from '@material-ui/core'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import { ActionCableContext } from '../../index'

const TeamListItem = ({ team, handleMoreIconClick }) => {
  const location = useLocation()

  const [fontWeight, setFontWeight] = useState('fontWeightRegular')
  const [numOfUnreads, setNumOfUnreads] = useState(0)

  const cable = useContext(ActionCableContext)

  useEffect(() => {
    const channel = cable.subscriptions.create(
      { channel: 'UnreadsChannel', id: team.id },
      {
        received: () => {
          if (window.location.pathname.slice(7) !== team.id) {
            setFontWeight('fontWeightBold')
            setNumOfUnreads((prev) => prev + 1)
          }
        },
      }
    )
    return () => {
      channel.unsubscribe()
    }
  }, [team])

  useEffect(() => {
    if (location.pathname.slice(7) === team.id) {
      setFontWeight('fontWeightRegular')
      setNumOfUnreads(0)
    }
  }, [location])

  return (
    <ListItem
      component={Link}
      to={`/teams/${team.id}`}
      button
      selected={location.pathname.slice(7) === team.id}>
      <Badge badgeContent={numOfUnreads} color="primary">
        <Avatar
          variant="rounded"
          src={team.cover_url}
          alt={team.name}
          style={{ marginRight: '1rem' }}
        />
      </Badge>
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
