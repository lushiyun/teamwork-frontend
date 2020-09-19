import React from 'react'
import { useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import {
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Typography,
} from '@material-ui/core'

import { selectUserById } from '../users/usersSlice'
import { selectMessagesByTeam } from './messagesSlice'

const MessageItem = ({ message }) => {
  const user = useSelector((state) => selectUserById(state, message.userId))
  const messages = useSelector((state) => selectMessagesByTeam(state, '11'))
  console.log(messages)

  return (
    <ListItem alignItems="flex-start">
      <ListItemAvatar>
        <Avatar alt={user.name} src={user.picture_url} />
      </ListItemAvatar>
      <ListItemText
        primary={user.name}
        secondary={
          <React.Fragment>
            <Typography
              component="span"
              variant="body2"
              // className={classes.inline}
              color="textPrimary">
              Ali Connors
            </Typography>
            {" — I'll be in your neighborhood doing errands this…"}
          </React.Fragment>
        }
      />
    </ListItem>
  )
}

export default MessageItem
