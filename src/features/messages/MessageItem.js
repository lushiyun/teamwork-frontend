import React from 'react'
import { useSelector } from 'react-redux'
import { parseJSON, format } from 'date-fns'
import { makeStyles } from '@material-ui/core/styles'
import {
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Typography,
  Divider,
} from '@material-ui/core'

import { selectUserById } from '../users/usersSlice'

const MessageItem = ({ message }) => {
  const user = useSelector((state) => selectUserById(state, message.userId))
  const datetime = format(parseJSON(message.created_at), 'Pp')

  return (
    <React.Fragment>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt={user.name} src={user.picture_url} />
        </ListItemAvatar>
        <ListItemText
          primary={user.name}
          secondary={
            <React.Fragment>
              <Typography component="span" variant="body2" color="textPrimary">
                {datetime}
              </Typography>
              {" — I'll be in your neighborhood doing errands this…"}
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
    </React.Fragment>
  )
}

export default MessageItem
