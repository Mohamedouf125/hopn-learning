import { configureStore } from '@reduxjs/toolkit'
import userSlice from './slices/user/userSlice'
import rejesterSlice from './slices/user/rejesterSlice'
import ratingStarsSlice from './slices/ratingStars/ratingStarsSlice';

export const store = configureStore({
  reducer: {
    user: userSlice,
    rejester: rejesterSlice,
    ratingStars: ratingStarsSlice,
  },
});