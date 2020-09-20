import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
} from '@reduxjs/toolkit'
import teamwork from '../../api/teamwork'

import { selectTeamById } from '../teams/teamsSlice'

const usersAdapter = createEntityAdapter()

const initialState = usersAdapter.getInitialState({
  status: 'idle',
  error: null,
  currentUser: null,
})

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await teamwork.get('/users')
  return response.data.data.map((user) => ({ id: user.id, ...user.attributes }))
})

export const addNewUser = createAsyncThunk('users/addNewUser', async (data) => {
  const response = await teamwork.post('/users', { user: data })
  return { id: response.data.data.id, ...response.data.data.attributes }
})

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    currentUserAdded(state, action) {
      state.currentUser = action.payload
    },
  },
  extraReducers: {
    [fetchUsers.pending]: (state, action) => {
      state.status = 'loading'
    },
    [fetchUsers.fulfilled]: (state, action) => {
      state.status = 'succeeded'
      usersAdapter.setAll(state, action.payload)
    },
    [fetchUsers.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.payload
    },
    [addNewUser.fulfilled]: usersAdapter.addOne,
  },
})

export const { currentUserAdded } = usersSlice.actions

export default usersSlice.reducer

export const {
  selectAll: selectAllUsers,
  selectById: selectUserById,
} = usersAdapter.getSelectors((state) => state.users)

export const selectUsersByTeam = createSelector(
  [selectAllUsers, selectTeamById],
  (users, team) => users.filter((user) => team.userIds.includes(user.id))
)
