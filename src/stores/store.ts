import { combineSlices, configureStore } from '@reduxjs/toolkit';
import boardSlice from '../pages/board/slice/boardSlice';
import counterSlice from '../tests/stores/slices/counterSlice';

const rootReducer = combineSlices(counterSlice, boardSlice);

const store = configureStore({
  reducer: rootReducer,
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
