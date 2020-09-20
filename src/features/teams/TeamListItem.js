import React from 'react'
import { Link } from 'react-router-dom'
import {
  ListItem,
  ListItemText,
  Avatar,
  ListItemSecondaryAction,
  IconButton,
} from '@material-ui/core'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'

const TeamListItem = ({
  team,
  selectedId,
  handleMoreIconClick,
  handleListItemClick,
}) => (
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
    <ListItemText primary={team.name} />
    <ListItemSecondaryAction>
      <IconButton onClick={handleMoreIconClick} edge="end">
        <MoreHorizIcon />
      </IconButton>
    </ListItemSecondaryAction>
  </ListItem>
)

export default TeamListItem
