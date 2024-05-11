import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

//load users
export const loadUsers = createAsyncThunk('programs/loadUsers', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.post('http://localhost:5000/loadUsers')
    return response.data
  } catch (error) {
    return rejectWithValue(error.response.data)
  }
})

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    users: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadUsers.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(loadUsers.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.users = action.payload
      })
      .addCase(loadUsers.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  },
})

export default usersSlice.reducer
