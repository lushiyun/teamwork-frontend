import {
  createSlice,
  createAsyncThunk,
  createSelector,
  createEntityAdapter,
} from '@reduxjs/toolkit'
import teamwork from '../../api/teamwork'

const teamsAdapter = createEntityAdapter()

const initialState = teamsAdapter.getInitialState({
  status: 'idle',
  error: null,
})

export const fetchTeams = createAsyncThunk('teams/fetchTeams', async () => {
  const response = await teamwork.get('/teams')
  return response.data.data.map((team) => {
    const userIds = team.relationships.users.data.map((user) => user.id)
    return { id: team.id, ...team.attributes, userIds: userIds }
  })
})

export const addNewTeam = createAsyncThunk('teams/addNewTeam', async (data) => {
  const response = await teamwork.post('/teams', { team: data })
  const teamData = response.data.data
  const userIds = teamData.relationships.users.data.map((user) => user.id)
  return { id: teamData.id, ...teamData.attributes, userIds: userIds }
})

export const updateTeamMember = createAsyncThunk(
  'teams/updateTeamMember',
  async ({ id, data }) => {
    const response = await teamwork.patch(`/teams/${id}`, { team: data })
    const teamData = response.data.data
    const userIds = teamData.relationships.users.data.map((user) => user.id)
    return { id: teamData.id, ...teamData.attributes, userIds: userIds }
  }
)

const teamsSlice = createSlice({
  name: 'teams',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchTeams.pending]: (state, action) => {
      state.status = 'loading'
    },
    [fetchTeams.fulfilled]: (state, action) => {
      state.status = 'succeeded'
      teamsAdapter.upsertMany(state, action.payload)
    },
    [fetchTeams.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.payload
    },
    [addNewTeam.fulfilled]: teamsAdapter.addOne,
    [updateTeamMember.fulfilled]: teamsAdapter.upsertOne,
  },
})

export default teamsSlice.reducer

export const {
  selectAll: selectAllTeams,
  selectById: selectTeamById,
  selectIds: selectTeamIds,
} = teamsAdapter.getSelectors((state) => state.teams)
