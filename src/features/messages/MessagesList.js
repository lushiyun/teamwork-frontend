import React, { useEffect, useContext, useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { List, Container } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import {
  fetchNewMessages,
  selectMessagesByTeam,
  messageReceived,
  allMessagesRead,
} from './messagesSlice'
import { ActionCableContext } from '../../index'
import MessageItem from './MessageItem'
import QuillEditor from './QuillEditor'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: 'calc(100% - 60px)',
  },
  msgList: {
    flexGrow: 1,
  },
}))

const MessagesList = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const { teamId } = useParams()
  const [channel, setChannel] = useState(null)
  const messages = useSelector((state) => selectMessagesByTeam(state, teamId))

  const endRef = useRef(null)
  useEffect(() => {
    endRef.current.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  useEffect(() => {
    dispatch(fetchNewMessages(teamId))
    return () => {
      dispatch(allMessagesRead())
    }
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
      <div ref={endRef} />
    </Container>
  )
}

export default MessagesList
