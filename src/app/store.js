import { configureStore } from '@reduxjs/toolkit'

import teamsReducer from '../features/teams/teamsSlice'
import usersReducer from '../features/users/usersSlice'

export default configureStore({
  reducer: {
    teams: teamsReducer,
    users: usersReducer,
  },
})
