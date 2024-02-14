import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { createWrapper } from 'next-redux-wrapper';

import { dataApi } from './api/data.api';
import { dataReducer } from './slice/data.slice';
import { expeditionApi } from './api/expedition.api';

export const store = configureStore({
  devTools: process.env.NODE_ENV === 'development',

  reducer: {
    [dataApi.reducerPath]: dataApi.reducer,
    [expeditionApi.reducerPath]: expeditionApi.reducer,
    state: dataReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({}).concat([
      dataApi.middleware,
      expeditionApi.middleware,
    ]),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const wrapper = createWrapper(() => store);
