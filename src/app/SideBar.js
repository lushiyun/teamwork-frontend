import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { List, ListItem, ListItemText, Divider } from '@material-ui/core'


import TeamsList from '../features/teams/TeamsList'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 300,
    height: '100%',
    overflow: 'scroll',
    backgroundColor: theme.palette.background.paper,
  },
  addFab: {
    position: 'sticky',
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}))

const SideBar = () => {
  const classes = useStyles()
  const [selectedIndex, setSelectedIndex] = useState(1)

  const handleListItemClick = (e, index) => {
    setSelectedIndex(index)
  }

  return (
    <div className={classes.root}>
      <TeamsList />
      <Divider />
      <List component="nav" aria-label="secondary mailbox folder">
        <ListItem
          button
          selected={selectedIndex === 2}
          onClick={(event) => handleListItemClick(event, 2)}>
          <ListItemText primary="Trash" />
        </ListItem>
        <ListItem
          button
          selected={selectedIndex === 3}
          onClick={(event) => handleListItemClick(event, 3)}>
          <ListItemText primary="Spam" />
        </ListItem>
      </List> 
    </div>
  )
}

export default SideBar
