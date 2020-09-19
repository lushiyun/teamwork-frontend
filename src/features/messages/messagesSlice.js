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
  reducers: {},
  extraReducers: {
    [fetchNewMessages.fulfilled]: (state, action) => {
      messagesAdapter.upsertMany(state, action.payload)
    },
  },
})

export default messagesSlice.reducer

export const {
  selectAll: selectAllMessages,
  selectById: selectMessageById,
} = messagesAdapter.getSelectors((state) => state.messages)

export const selectMessagesByTeam = createSelector(
  [selectAllMessages, (state, teamId) => teamId],
  (messages, teamId) => messages.filter((message) => message.teamId === teamId)
)
