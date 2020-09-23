import {
  createSlice,
  createEntityAdapter,
  createAsyncThunk,
  createSelector,
} from '@reduxjs/toolkit'
import { isAfter, parseISO, subYears } from 'date-fns'
import teamwork from '../../api/teamwork'
import { selectTeamById } from '../teams/teamsSlice'

const messagesAdapter = createEntityAdapter()

const initialState = messagesAdapter.getInitialState({
  status: 'idle',
  error: null,
})

export const fetchUserAllMessages = createAsyncThunk(
  'messages/fetchUserAllMessages',
  async (currentUserId) => {
    const response = await teamwork.get(`/users/${currentUserId}/messages`)
    return response.data.data.map((message) => {
      const teamId = message.relationships.team.data.id
      const userId = message.relationships.user.data.id
      return {
        id: message.id,
        ...message.attributes,
        teamId,
        userId,
      }
    })
  }
)

export const fetchNewMessages = createAsyncThunk(
  'messages/fetchNewMessages',
  async (teamId, { getState }) => {
    const messages = selectMessagesByTeam(getState(), teamId)
    const [latestMessage] = messages
    const datetime = latestMessage ? latestMessage.created_at : ''
    const response = await teamwork.get(`/teams/${teamId}/${datetime}`)
    return response.data.data.map((message) => {
      const userId = message.relationships.user.data.id
      return {
        id: message.id,
        ...message.attributes,
        teamId,
        userId,
      }
    })
  }
)

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    messageReceived(state, action) {
      const data = action.payload.data
      const message = {
        id: data.id,
        ...data.attributes,
        teamId: data.relationships.team.data.id,
        userId: data.relationships.user.data.id,
      }
      messagesAdapter.addOne(state, message)
    },
    // allMessagesRead(state, action) {
    //   Object.values(state.entities).forEach((message) => {
    //     message.read = true
    //   })
    // },
  },
  extraReducers: {
    [fetchUserAllMessages.pending]: (state, action) => {
      state.status = 'loading'
    },
    [fetchUserAllMessages.fulfilled]: (state, action) => {
      state.status = 'succeeded'
      messagesAdapter.setAll(state, action.payload)
    },
    [fetchUserAllMessages.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.payload
    },
    [fetchNewMessages.fulfilled]: (state, action) => {
      messagesAdapter.upsertMany(state, action.payload)
    },
  },
})

export const { messageReceived } = messagesSlice.actions

export default messagesSlice.reducer

export const {
  selectAll: selectAllMessages,
  selectById: selectMessageById,
} = messagesAdapter.getSelectors((state) => state.messages)

export const selectMessagesByTeam = createSelector(
  [selectAllMessages, (state, teamId) => teamId],
  (messages, teamId) => messages.filter((message) => message.teamId === teamId)
)

export const selectUnreadMessages = createSelector(
  [selectMessagesByTeam, selectTeamById],
  (messages, team) => {
    const lastReadAt = team.lastReadAt || subYears(Date.now(), 1)
    return messages.filter((message) =>
      isAfter(parseISO(message.created_at), lastReadAt)
    )
  }
)
