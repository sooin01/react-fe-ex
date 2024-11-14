import { combineSlices, configureStore } from '@reduxjs/toolkit';
import commentSlice from '../tests/stores/slices/commentSlice';
import counterSlice from '../tests/stores/slices/counterSlice';

const rootReducer = combineSlices(counterSlice, commentSlice);

const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
