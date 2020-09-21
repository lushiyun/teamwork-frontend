import {
  createSlice,
  createEntityAdapter,
  createAsyncThunk,
  createSelector,
} from '@reduxjs/toolkit'
import teamwork from '../../api/teamwork'

const messagesAdapter = createEntityAdapter()

const initialState = messagesAdapter.getInitialState()

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
        read: false,
        teamId: data.relationships.team.data.id,
        userId: data.relationships.user.data.id,
      }
      messagesAdapter.addOne(state, message)
    },
    allMessagesRead(state, action) {
      Object.values(state.entities).forEach((message) => {
        message.read = true
      })
    },
  },
  extraReducers: {
    [fetchNewMessages.fulfilled]: (state, action) => {
      Object.values(state.entities).forEach((message) => {
        message.isNew = !message.read
      })
      messagesAdapter.upsertMany(state, action.payload)
    },
  },
})

export const { messageReceived, allMessagesRead } = messagesSlice.actions

export default messagesSlice.reducer

export const {
  selectAll: selectAllMessages,
  selectById: selectMessageById,
} = messagesAdapter.getSelectors((state) => state.messages)

export const selectMessagesByTeam = createSelector(
  [selectAllMessages, (state, teamId) => teamId],
  (messages, teamId) => messages.filter((message) => message.teamId === teamId)
)
