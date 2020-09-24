import React, { useEffect, useContext } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

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
import {
  selectUnreadMessages,
  messageReceived,
} from '../messages/messagesSlice'

const TeamListItem = ({ team, handleMoreIconClick }) => {
  const location = useLocation()
  const dispatch = useDispatch()
  const cable = useContext(ActionCableContext)

  const numOfUnreads = useSelector((state) =>
    selectUnreadMessages(state, team.id)
  ).length

  useEffect(() => {
    if (location.pathname.slice(7) === team.id) return
    const channel = cable.subscriptions.create(
      { channel: 'MessagesChannel', id: team.id },
      {
        received: (data) => {
          dispatch(messageReceived(JSON.parse(data)))
        },
      }
    )
    return () => {
      channel.unsubscribe()
    }
  }, [team.id, cable.subscriptions, location.pathname, dispatch])

  const getFontWeight = () => {
    if (location.pathname.slice(7) === team.id) {
      return 'fontWeightRegular'
    }
    return numOfUnreads === 0 ? 'fontWeightRegular' : 'fontWeightBold'
  }

  const renderedNumOfUnreads = () => {
    if (location.pathname.slice(7) === team.id) {
      return 0
    }
    return numOfUnreads
  }

  return (
    <ListItem
      component={Link}
      to={`/teams/${team.id}`}
      button
      selected={location.pathname.slice(7) === team.id}>
      <Badge badgeContent={renderedNumOfUnreads()} color="primary">
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
            <Box fontWeight={getFontWeight()}>{team.name}</Box>
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
