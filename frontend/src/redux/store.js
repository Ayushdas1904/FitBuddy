import { configureStore } from '@reduxjs/toolkit';
import foodReducer from './reducers';  // Add your reducer here

const store = configureStore({
  reducer: {
    food: foodReducer,
  },
});

export default store;