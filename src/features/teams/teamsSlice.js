import {
  createSlice,
  createAsyncThunk,
  createSelector,
  createEntityAdapter,
} from '@reduxjs/toolkit'

const initialState = [
  {
    id: 1,
    name: 'Fitness Group',
    description:
      'A fitness team to hold each other accountable on our fitness journey',
    cover:
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-1.2.1&auto=format&fit=crop&w=2100&q=80',
  },
  {
    id: 2,
    name: 'Japan Travel Plan Team',
    description: 'A team of friends planning our trip to Japan together',
    cover:
      'https://images.unsplash.com/photo-1528164344705-47542687000d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2138&q=80',
  },
]

const teamsSlice = createSlice({
  name: 'teams',
  initialState,
  reducers: {
    teamAdded(state, action) {
      state.push(action.payload)
    },
  },
})

export const { teamAdded } = teamsSlice.actions

export default teamsSlice.reducer
