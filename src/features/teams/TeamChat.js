import React, { useEffect, useContext, useState } from 'react'
import { useParams } from 'react-router-dom'
import QuillEditor from '../messages/QuillEditor'
import { useSelector, useDispatch } from 'react-redux'
import {
  fetchNewMessages,
  selectMessagesByTeam,
  messageReceived,
} from '../messages/messagesSlice'
import MessageItem from '../messages/MessageItem'
import { List, Container } from '@material-ui/core'
import { ActionCableContext } from '../../index'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: 'calc(100% - 60px)',
  },
  msgList: {
    flexGrow: 1,
  },
}))

const TeamChat = () => {
  const classes = useStyles()
  const { teamId } = useParams()
  const [channel, setChannel] = useState(null)
  const messages = useSelector((state) => selectMessagesByTeam(state, teamId))
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchNewMessages(teamId))
  }, [teamId, dispatch])

  const cable = useContext(ActionCableContext)
  useEffect(() => {
    const channel = cable.subscriptions.create(
      {
        channel: 'MessagesChannel',
        id: teamId,
      },
      {
        received: (data) => {
          receiveMessage(data)
        },
      }
    )
    setChannel(channel)
    return () => {
      channel.unsubscribe()
    }
  }, [teamId])

  const sendMessage = (content) => {
    const data = { teamId, userId: '45', content }
    channel.send(data)
  }

  const receiveMessage = (data) => {
    dispatch(messageReceived(JSON.parse(data)))
  }

  const renderedMessages = () =>
    messages &&
    messages.map((message) => (
      <MessageItem key={message.id} message={message} />
    ))

  return (
    <Container maxWidth="md" className={classes.root}>
      <List className={classes.msgList}>{renderedMessages()}</List>
      <QuillEditor sendMessage={sendMessage} />
    </Container>
  )
}

export default TeamChat
