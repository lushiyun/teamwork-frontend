import React, { useEffect, useContext, useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import QuillEditor from './QuillEditor'

import { List, Container } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import { selectMessagesByTeam } from './messagesSlice'
import { selectTeamIds, updateTeamLastReadAt } from '../teams/teamsSlice'
import { ActionCableContext } from '../../index'
import MessageItem from './MessageItem'

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
  const history = useHistory()

  const { teamId } = useParams()
  const teamIds = useSelector(selectTeamIds)

  const messages = useSelector((state) => selectMessagesByTeam(state, teamId))
  const currentUserId = useSelector((state) => state.users.currentUser)

  const cable = useContext(ActionCableContext)
  const [channel, setChannel] = useState(null)
  const endRef = useRef(null)

  const dispatch = useDispatch()

  useEffect(() => {
    endRef.current.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  useEffect(() => {
    return () => {
      dispatch(updateTeamLastReadAt({ teamId, currentUserId }))
    }
  }, [teamId, currentUserId, dispatch])

  useEffect(() => {
    const channel = cable.subscriptions.create({
      channel: 'MessagesChannel',
      id: teamId,
    })
    setChannel(channel)
    return () => {
      channel.unsubscribe()
    }
  }, [teamId, dispatch])

  const sendMessage = (content) => {
    const data = { teamId, userId: currentUserId, content }
    channel.send(data)
  }

  const renderedMessages =
    messages &&
    messages.map((message) => (
      <MessageItem key={message.id} message={message} />
    ))

  if (!teamIds.includes(teamId)) {
    history.push('/teams')
  }

  return (
    <Container maxWidth="md" className={classes.root}>
      <List className={classes.msgList}>{renderedMessages}</List>
      <QuillEditor sendMessage={sendMessage} teamId={teamId} />
      <div ref={endRef} />
    </Container>
  )
}

export default MessagesList
