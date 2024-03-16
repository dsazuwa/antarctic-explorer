/* eslint-disable  @typescript-eslint/no-unused-vars */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { capacityOptions, durationOptions } from '@/lib/constants';
import { ExpeditionsResponse } from '@/lib/type';

export type ExpeditionsState = {
  cruiseLines: string[];
  expeditions: ExpeditionsResponse;
};

export const expeditionsSlice = createSlice({
  name: 'expeditionsSlice',

  initialState: {
    cruiseLines: [],

    expeditions: {
      data: [],
      currentPage: 0,
      itemsPerPage: 6,
      totalItems: 0,
      totalPages: 0,
    },
  } as ExpeditionsState,

  reducers: {
    setCruiseLines: (state, action: PayloadAction<string[]>) => {
      state.cruiseLines = action.payload;
    },

    setExpeditions: (state, action: PayloadAction<ExpeditionsResponse>) => {
      state.expeditions = action.payload;
    },
  },
});

export const expeditionsReducer = expeditionsSlice.reducer;

export const { setCruiseLines, setExpeditions } = expeditionsSlice.actions;
