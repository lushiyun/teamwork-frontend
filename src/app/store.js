import { configureStore } from '@reduxjs/toolkit'

import teamsReducer from '../features/teams/teamsSlice'
import usersReducer from '../features/users/usersSlice'
import snackbarReducer from '../ui/snackbarSlice'

export default configureStore({
  reducer: {
    teams: teamsReducer,
    users: usersReducer,
    snackbar: snackbarReducer,
  },
})
