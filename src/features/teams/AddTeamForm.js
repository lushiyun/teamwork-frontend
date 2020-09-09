import {
  createEntityAdapter,
  createSlice,
  createAsyncThunk,
  createSelector,
} from '@reduxjs/toolkit'

const teamsAdapter = createEntityAdapter()

const initialState = teamsAdapter.getInitialState({
  status: 'idle',
  error: null,
})

export const fetchTeams = createAsyncThunk()
