import React, { useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import QuillEditor from '../messages/QuillEditor'
import { useSelector, useDispatch } from 'react-redux'
import { fetchMessages, selectMessagesByTeam } from '../messages/messagesSlice'
import LoadingBackdrop from '../../app/LoadingBackdrop'
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

  const messages = useSelector((state) => selectMessagesByTeam(state, teamId))

  const renderedMessages =
    messages &&
    messages.map((message) => (
      <MessageItem key={message.id} message={message} />
    ))

  const cable = useContext(ActionCableContext)
  const teamChannel = cable.subscriptions.create(
    {
      channel: 'TeamsChannel',
      id: teamId,
    },
    {
      received: (data) => {
        console.log('data')
      },
      connected: () => {
        console.log('connected')
      },
    }
  )

  // useEffect(() => {
  //   teamChannel = cable.subscriptions.create(
  //     {
  //       channel: 'TeamsChannel',
  //       id: teamId,
  //     },
  //     {
  //       received: (data) => {
  //         console.log('data')
  //       },
  //       send: (data) => {
  //         console.log(data)
  //       },
  //     }
  //   )
  //   // return () => {
  //   //   teamChannel.unsubscribe()
  //   // }
  // }, [teamId])
  // console.log(teamChannel)

  const sendMessage = (data) => {
    teamChannel.send({ team_id: teamId, content: data })
  }

  return (
    <Container maxWidth="md" className={classes.root}>
      <List className={classes.msgList}>{renderedMessages}</List>
      <QuillEditor sendMessage={sendMessage} />
    </Container>
  )
}

export default TeamChat
