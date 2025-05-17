import { configureStore } from '@reduxjs/toolkit';
import coursesReducer from './coursesSlice';

export const store = configureStore({
  reducer: {
    courses: coursesReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;