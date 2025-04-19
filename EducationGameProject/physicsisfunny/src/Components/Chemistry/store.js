import { configureStore } from '@reduxjs/toolkit'
import scoreReducer from './ScoreSlice'

export const store = configureStore({
  reducer: {
    score: scoreReducer
  }
})