import { createSlice } from '@reduxjs/toolkit'
import { createAsyncThunk } from '@reduxjs/toolkit'

export const loadTask = createAsyncThunk('task/loadTask', async (taskId, { rejectWithValue }) => {
  try {
    const response = await axios.post(`https://one10524redboost.onrender.com/loadTask/${taskId}`)
    return response.data
  } catch (error) {
    return rejectWithValue(error.response.data)
  }
})

export const createTask = createAsyncThunk(
  'task/createTask',
  async (taskData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`https://one10524redboost.onrender.com/createTask`, taskData)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  },
)

export const deleteTask = createAsyncThunk(
  'task/deleteTask',
  async (taskId, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`https://one10524redboost.onrender.com/deleteTask/${taskId}`)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  },
)

export const loadTasks = createAsyncThunk('task/loadTasks', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.post(`https://one10524redboost.onrender.com/loadTasks`)
    return response.data
  } catch (error) {
    return rejectWithValue(error.response.data)
  }
})

const taskSLice = createSlice({
  name: 'task',
  initialState: {
    tasks: [], //when loading the tasks
    task: {}, //when loading a single task
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadTasks.fulfilled, (state, action) => {
        state.tasks = action.payload
      })
      .addCase(loadTasks.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(loadTasks.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.tasks.push(action.payload)
      })
      .addCase(createTask.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(createTask.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter((task) => task._id !== action.payload._id)
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(deleteTask.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(loadTask.fulfilled, (state, action) => {
        state.task = action.payload
      })
      .addCase(loadTask.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(loadTask.pending, (state) => {
        state.status = 'loading'
      })
  },
})

export default taskSLice.reducer
