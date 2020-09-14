import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
} from '@reduxjs/toolkit'
import teamwork from '../../api/teamwork'

const usersAdapter = createEntityAdapter()

const initialState = usersAdapter.getInitialState({
  currentUser: null,
})

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await teamwork.get('/users')
  return response.data.data.map((user) => ({ id: user.id, ...user.attributes }))
})

export const addNewUser = createAsyncThunk('users/addNewUser', async (data) => {
  const response = await teamwork.post('/users', data)
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
    [fetchUsers.fulfilled]: usersAdapter.setAll,
    [addNewUser.fulfilled]: usersAdapter.addOne,
  },
})

export const { currentUserAdded } = usersSlice.actions

export default usersSlice.reducer

export const {
  selectAll: selectAllUsers,
  selectById: selectUserById,
  selectIds: selectUserIds,
} = usersAdapter.getSelectors((state) => state.users)
