import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { createWrapper } from 'next-redux-wrapper';

import { departureReducer } from './slice/departures.slice';
import { expeditionsReducer } from './slice/expeditions.slice';

export const store = configureStore({
  devTools: process.env.NODE_ENV === 'development',

  reducer: {
    expeditionState: expeditionsReducer,
    departureState: departureReducer,
  },

  middleware: (getDefaultMiddleware) => getDefaultMiddleware({}),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const wrapper = createWrapper(() => store);
