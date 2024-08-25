import { configureStore } from '@reduxjs/toolkit'
import userSlice from './slices/user/userSlice'
import rejesterSlice from './slices/user/rejesterSlice'


export const store = configureStore({
  reducer: {
    user: userSlice,
    rejester: rejesterSlice,
  },
})