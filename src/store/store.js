import { configureStore } from '@reduxjs/toolkit'
import userSlice from './slices/user/userSlice'
import rejesterSlice from './slices/user/rejesterSlice'
import ratingStarsSlice from './slices/ratingStars/ratingStarsSlice';
import homeDataSlice from './slices/home/homeDataSlice';
import playersSlice from "./slices/players/playersSlice";
import courceSlice from './slices/courses/courceSlice';

export const store = configureStore({
  reducer: {
    user: userSlice,
    rejester: rejesterSlice,
    ratingStars: ratingStarsSlice,
    home: homeDataSlice,
    players: playersSlice,
    course: courceSlice,
  },
});