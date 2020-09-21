import React from 'react'
import { useSelector } from 'react-redux'
import { parseJSON, formatDistanceToNow } from 'date-fns'
import { Quill } from 'react-quill'
import {
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Typography,
} from '@material-ui/core'

import { selectUserById } from '../users/usersSlice'

const MessageItem = ({ message }) => {
  const user = useSelector((state) => selectUserById(state, message.userId))
  const timeAgo = formatDistanceToNow(parseJSON(message.created_at))

  const deltaOps = JSON.parse(message.content)
  const quillHtml = () => {
    const temp = new Quill(document.createElement('div'))
    temp.setContents(deltaOps)
    return { __html: temp.root.innerHTML }
  }

  return (
    <ListItem
      alignItems="flex-start"
      divider
      style={{
        backgroundColor: `${message.isNew ? 'rgba(179, 193, 0, 0.3)' : 'transparent'}`,
      }}>
      <ListItemAvatar>
        <Avatar alt={user.name} src={user.picture_url} />
      </ListItemAvatar>
      <ListItemText
        primary={
          <React.Fragment>
            <Typography
              component="span"
              variant="body2"
              color="textPrimary"
              style={{ fontWeight: 'bold' }}>
              {user.name}
            </Typography>
            <Typography component="span" variant="body2" color="textSecondary">
              {`  | ${timeAgo} ago`}
            </Typography>
          </React.Fragment>
        }
        secondary={<div dangerouslySetInnerHTML={quillHtml()}></div>}
      />
    </ListItem>
  )
}

export default MessageItem
