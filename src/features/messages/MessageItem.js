import React from 'react'
import { useSelector } from 'react-redux'
import { parseJSON, format } from 'date-fns'
import {
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Typography,
  Divider,
} from '@material-ui/core'

import { selectUserById } from '../users/usersSlice'
import { QuillDeltaToHtmlConverter } from 'quill-delta-to-html'
import { Quill } from 'react-quill'

const MessageItem = ({ message }) => {
  const user = useSelector((state) => selectUserById(state, message.userId))
  const datetime = format(parseJSON(message.created_at), 'Pp')
  // const deltaOps = message.content
  // console.log(JSON.parse(message.content))
  // const cfg = {}
  // const converter = new QuillDeltaToHtmlConverter(
  //   JSON.parse(message.content),
  //   cfg
  // )
  // const html = converter.convert()
  // console.log(html)

  // const quillGetHTML = (deltaOps) => {
  //   const temp = new Quill(document.createElement('div'))
  //   temp.setContents(deltaOps)
  //   return temp.root.innerHTML
  // }

  return (
    <React.Fragment>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt={user.name} src={user.picture_url} />
        </ListItemAvatar>
        <ListItemText
          secondary={
            <React.Fragment>
              <Typography
                component="body2"
                color="textPrimary"
                style={{ fontWeight: 'bold' }}>
                {user.name}
              </Typography>
              {`  | ${datetime}`}
            </React.Fragment>
          }
        />
      </ListItem>
      {JSON.parse(message.content).toString()}
      <Divider variant="inset" component="li" />
    </React.Fragment>
  )
}

export default MessageItem
