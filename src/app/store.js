import { configureStore } from '@reduxjs/toolkit'

import teamsReducer from '../features/teams/teamsSlice'

export default configureStore({
  reducer: {
    teams: teamsReducer,
  },
})
