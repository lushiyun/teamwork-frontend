import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  List,
  ListSubheader,
  ListItem,
  Avatar,
  ListItemText,
} from '@material-ui/core'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'

import { selectAllTeams, fetchTeams } from './teamsSlice'
import LoadingBackdrop from '../../app/LoadingBackdrop'

const TeamsList = () => {
  const [selectedIndex, setSelectedIndex] = useState(1)
  const handleListItemClick = (e, index) => setSelectedIndex(index)

  const dispatch = useDispatch()
  const teams = useSelector(selectAllTeams)
  const teamsStatus = useSelector((state) => state.teams.status)
  const error = useSelector((state) => state.teams.error)

  useEffect(() => {
    if (teamsStatus === 'idle') {
      dispatch(fetchTeams())
    }
  }, [teamsStatus, dispatch])

  let content

  if (teamsStatus === 'loading') {
    content = <LoadingBackdrop />
  } else if (teamsStatus === 'succeeded') {
    content = teams.map((team, index) => (
      <ListItem
        key={team.id}
        button
        selected={selectedIndex === index}
        onClick={(event) => handleListItemClick(event, index)}>
        <Avatar
          variant="rounded"
          src={team.cover_url}
          alt={team.name}
          style={{ marginRight: '1rem' }}
        />
        <ListItemText primary={team.name} />
        <MoreHorizIcon />
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
    </List>
  )
}

export default TeamsList
