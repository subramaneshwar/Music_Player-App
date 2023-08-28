import { configureStore } from '@reduxjs/toolkit';

import playerReducer from './features/playerSlice';
import { coreApi } from './serveces/Core';

export const store = configureStore({
  reducer: {
    [coreApi.reducerPath]:coreApi.reducer,
    player: playerReducer,
  },
  middleware:(getDefaultMiddleware)=> getDefaultMiddleware().concat(coreApi.middleware)
});
