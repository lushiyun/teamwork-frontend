import {
  createSlice,
  createAsyncThunk,
  createSelector,
  createEntityAdapter,
} from '@reduxjs/toolkit'
import { formatISO } from 'date-fns/esm'
import teamwork from '../../api/teamwork'

const teamsAdapter = createEntityAdapter()

const initialState = teamsAdapter.getInitialState({
  status: 'idle',
  error: null,
})

export const fetchUserTeams = createAsyncThunk(
  'teams/fetchUserTeams',
  async (currentUserId) => {
    const response = await teamwork.get(`/users/${currentUserId}/memberships`)
    return response.data.data.map((membership) => {
      const lastReadAt = membership.attributes.last_read_at
      const teamId = membership.relationships.team.data.id
      const team = response.data.included.find((team) => team.id === teamId)
      const userIds = team.relationships.users.data.map((user) => user.id)
      return { id: teamId, ...team.attributes, lastReadAt, userIds }
    })
  }
)

export const fetchTeams = createAsyncThunk(
  'teams/fetchTeams',
  async (currentUserId) => {
    const response = await teamwork.get('/teams')
    return response.data.data.reduce((result, team) => {
      const userIds = team.relationships.users.data.map((user) => user.id)
      if (!userIds.includes(currentUserId)) {
        result.push({
          id: team.id,
          ...team.attributes,
          userIds,
        })
      }
      return result
    }, [])
  }
)

export const addNewTeam = createAsyncThunk('teams/addNewTeam', async (data) => {
  const response = await teamwork.post('/teams', { team: data })
  const teamData = response.data.data
  const userIds = teamData.relationships.users.data.map((user) => user.id)
  return { id: teamData.id, ...teamData.attributes, userIds }
})

export const updateTeamMember = createAsyncThunk(
  'teams/updateTeamMember',
  async ({ id, data }) => {
    const response = await teamwork.patch(`/teams/${id}`, { team: data })
    const teamData = response.data.data
    const userIds = teamData.relationships.users.data.map((user) => user.id)
    return { id: teamData.id, ...teamData.attributes, userIds }
  }
)

export const updateTeamLastReadAt = createAsyncThunk(
  'teams/updateTeamLastReadAt',
  async ({ teamId, currentUserId }) => {
    const last_read_at = formatISO(Date.now())
    const response = await teamwork.patch(`/users/${currentUserId}`, {
      team_id: teamId,
      last_read_at,
    })
    const lastReadAt = response.data.data.attributes.last_read_at
    return { id: teamId, lastReadAt }
  }
)

const teamsSlice = createSlice({
  name: 'teams',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchUserTeams.pending]: (state, action) => {
      state.status = 'loading'
    },
    [fetchUserTeams.fulfilled]: (state, action) => {
      state.status = 'succeeded'
      teamsAdapter.setAll(state, action.payload)
    },
    [fetchUserTeams.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.payload
    },
    [fetchTeams.fulfilled]: teamsAdapter.upsertMany,
    [addNewTeam.fulfilled]: teamsAdapter.addOne,
    [updateTeamMember.fulfilled]: teamsAdapter.upsertOne,
    [updateTeamLastReadAt.fulfilled]: (state, action) => {
      const { id, ...changes } = action.payload
      teamsAdapter.updateOne(state, { id, changes })
    },
  },
})

export default teamsSlice.reducer

export const {
  selectAll: selectAllTeams,
  selectById: selectTeamById,
} = teamsAdapter.getSelectors((state) => state.teams)

export const selectTeamsByUser = createSelector(
  [selectAllTeams, (state, userId) => userId],
  (teams, userId) => teams.filter((team) => team.userIds.includes(userId))
)
