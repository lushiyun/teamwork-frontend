import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isAuthenticated: null,
  userId: null,
}

const authSlice = createSlice({
  name: 'currentUser',
  initialState,
  reducers: {
    
  }
})