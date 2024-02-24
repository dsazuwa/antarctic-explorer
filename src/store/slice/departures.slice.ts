/* eslint-disable  @typescript-eslint/no-unused-vars */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { departuresPerPageOptions } from '@/lib/constants';
import { DeparturesResponse } from '@/lib/type';

export type DepartureState = {
  departures: DeparturesResponse;
  selectedItemsPerPage: number;
  selectedSort: number;
};

export const departureSlice = createSlice({
  name: 'departureSlice',

  initialState: {
    departures: {
      data: [],
      currentPage: 0,
      itemsPerPage: 6,
      totalItems: 0,
      totalPages: 0,
    },

    selectedItemsPerPage: 0,
    selectedSort: 0,
  } as DepartureState,

  reducers: {
    setDepartures: (state, action: PayloadAction<DeparturesResponse>) => {
      const { payload } = action;

      state.departures = payload;
      state.selectedItemsPerPage = departuresPerPageOptions.findIndex(
        (x) => x == payload.itemsPerPage,
      );
    },

    setDepartureSort: (state, action: PayloadAction<number>) => {
      state.selectedSort = action.payload;
      state.departures.currentPage = 0;
    },

    setDeparturesPerPage: (state, action: PayloadAction<number>) => {
      state.selectedItemsPerPage = action.payload;
      state.departures.currentPage = 0;
    },

    navigateToFirstDeparture: (state) => {
      state.departures.currentPage = 0;
    },

    navigateToPreviousDeparture: (state) => {
      if (state.departures.currentPage === 0) return;
      state.departures.currentPage = state.departures.currentPage - 1;
    },

    navigateToNextDeparture: (state) => {
      if (state.departures.currentPage + 1 === state.departures.totalPages)
        return;
      state.departures.currentPage = state.departures.currentPage + 1;
    },

    navigateToLastDeparture: (state) => {
      state.departures.currentPage = state.departures.totalPages - 1;
    },
  },
});

export const departureReducer = departureSlice.reducer;

export const {
  setDepartures,
  setDepartureSort,
  setDeparturesPerPage,
  navigateToFirstDeparture,
  navigateToPreviousDeparture,
  navigateToNextDeparture,
  navigateToLastDeparture,
} = departureSlice.actions;
