import React from 'react'
import { ListItem, ListItemText, Avatar } from '@material-ui/core'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'

const TeamListItem = (props) => {
  const { team, index, selectedIndex, handleListItemClick } = props
  return (
    <ListItem
      key={team.id}
      button
      selected={selectedIndex === index}
      onClick={(event) => handleListItemClick(event, index)}>
      <Avatar
        variant="rounded"
        src={team.cover}
        alt={team.name}
        style={{ marginRight: '1rem' }}
      />
      <ListItemText primary={team.name} noWrap />
      <MoreHorizIcon />
    </ListItem>
  )
}

export default TeamListItem
