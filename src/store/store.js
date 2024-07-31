import { configureStore } from '@reduxjs/toolkit'
import  counterSlice  from './slices/example/example'

export const store = configureStore({
  reducer: {
    counter: counterSlice,
  },
})