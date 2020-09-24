import { configureStore } from '@reduxjs/toolkit'

import usersReducer from '../features/users/usersSlice'
import teamsReducer from '../features/teams/teamsSlice'
import messagesReducer from '../features/messages/messagesSlice'
import snackbarReducer from '../ui/snackbarSlice'

export default configureStore({
  reducer: {
    users: usersReducer,
    teams: teamsReducer,
    messages: messagesReducer,
    snackbar: snackbarReducer,
  },
})
