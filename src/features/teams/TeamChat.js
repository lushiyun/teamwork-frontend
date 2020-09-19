import { makeStyles } from '@material-ui/core/styles'
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import QuillEditor from '../messages/QuillEditor'
import actionCable from 'actioncable'
import { WS_ROOT } from '../../api/teamwork'
import { useSelector, useDispatch } from 'react-redux'
import { fetchMessages, selectMessagesByTeam } from '../messages/messagesSlice'
import LoadingBackdrop from '../../app/LoadingBackdrop'
import MessageItem from '../messages/MessageItem'
import { List } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
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

  let cable
  let teamChannel

  useEffect(() => {
    if (!cable) {
      cable = actionCable.createConsumer(WS_ROOT)
      teamChannel = cable.subscriptions.create(
        {
          channel: 'TeamsChannel',
          id: teamId,
        },
        {
          received: (data) => {
            console.log('data')
          },
        }
      )
    }
    return () => {
      teamChannel.unsubscribe()
    }
  }, [teamId])

  const sendMessage = (data) => {
    teamChannel.send({ team_id: teamId, user_id: '45', content: data })
  }

  return (
    <div className={classes.root}>
      <List>{renderedMessages}</List>
      <QuillEditor sendMessage={sendMessage} />
    </div>
  )
}

export default TeamChat
