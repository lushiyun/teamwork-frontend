import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { parseJSON, formatDistanceToNow } from 'date-fns'
import {
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Typography,
  Divider,
} from '@material-ui/core'

import { selectUserById } from '../users/usersSlice'
import { Quill } from 'react-quill'

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
    <React.Fragment>
      <ListItem alignItems="flex-start">
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
              <Typography
                component="span"
                variant="body2"
                color="textSecondary">
                {`  | ${timeAgo} ago`}
              </Typography>
            </React.Fragment>
          }
          secondary={<div dangerouslySetInnerHTML={quillHtml()}></div>}
        />
      </ListItem>
      <Divider variant="inset" component="li" />
    </React.Fragment>
  )
}

export default MessageItem
