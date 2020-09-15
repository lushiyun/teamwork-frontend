import { createSlice } from '@reduxjs/toolkit'

export const snackbarSlice = createSlice({
  name: 'snackbar',
  initialState: {
    open: false,
    type: '',
    message: '',
  },
  reducers: {
    setSnackbar: (state, action) => {
      return {...action.payload}
    },
  },
})

export const { setSnackbar } = snackbarSlice.actions

export default snackbarSlice.reducer
