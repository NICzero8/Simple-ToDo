import { configureStore } from '@reduxjs/toolkit';
import toDoReducer from './slices/toDoSlice';

const store = configureStore({
  reducer: {
    toDo: toDoReducer,
  },
})

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;