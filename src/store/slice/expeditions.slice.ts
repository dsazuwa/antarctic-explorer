/* eslint-disable  @typescript-eslint/no-unused-vars */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ExpeditionsResponse } from '@/lib/type';

export type ExpeditionsState = {
  expeditions: ExpeditionsResponse;
};

export const expeditionsSlice = createSlice({
  name: 'expeditionsSlice',

  initialState: {
    expeditions: {
      data: [],
      currentPage: 0,
      itemsPerPage: 6,
      totalItems: 0,
      totalPages: 0,
    },
  } as ExpeditionsState,

  reducers: {
    setExpeditions: (state, action: PayloadAction<ExpeditionsResponse>) => {
      state.expeditions = action.payload;
    },
  },
});

export const expeditionsReducer = expeditionsSlice.reducer;

export const { setExpeditions } = expeditionsSlice.actions;
