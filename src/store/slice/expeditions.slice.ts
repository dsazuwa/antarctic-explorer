/* eslint-disable  @typescript-eslint/no-unused-vars */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import {
  capacityOptions,
  durationOptions,
  itemsPerPageOptions,
} from '@/lib/constants';
import { ExpeditionsResponse, MainResponse } from '@/lib/type';
import { toggleIndex } from '@/lib/utils';

export type FilterState = {
  startDate: Date | null;
  endDate: Date | null;
  cruiseLines: number[];
  capacity: number;
  duration: number;
};

export type ExpeditionsState = {
  cruiseLines: string[];
  expeditions: ExpeditionsResponse;
  selectedItemsPerPage: number;
  selectedSort: number;
  filters: FilterState;
};

type FilterAction =
  | { filterType: 'startDate' | 'endDate'; value: string | null }
  | { filterType: 'cruiseLines' | 'duration' | 'capacity'; value: number };

const initalFilterState: FilterState = {
  startDate: null,
  endDate: null,
  cruiseLines: [],
  capacity: capacityOptions.length - 1,
  duration: durationOptions.length - 1,
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

    selectedItemsPerPage: 0,
    selectedSort: 0,

    filters: initalFilterState,
  } as ExpeditionsState,

  reducers: {
    setCruiseLines: (state, action: PayloadAction<string[]>) => {
      state.cruiseLines = action.payload;
    },

    setExpeditions: (state, action: PayloadAction<ExpeditionsResponse>) => {
      state.expeditions = action.payload;
    },

    setSortOption: (state, action: PayloadAction<number>) => {
      state.selectedSort = action.payload;
      state.expeditions.currentPage = 0;
    },

    setItemsPerPage: (state, action: PayloadAction<number>) => {
      state.selectedItemsPerPage = action.payload;
      state.expeditions.currentPage = 0;
    },

    navigateToFirst: (state) => {
      state.expeditions.currentPage = 0;
    },

    navigateToPrevious: (state) => {
      if (state.expeditions.currentPage === 0) return;
      state.expeditions.currentPage = state.expeditions.currentPage - 1;
    },

    navigateToNext: (state) => {
      if (state.expeditions.currentPage + 1 === state.expeditions.totalPages)
        return;
      state.expeditions.currentPage = state.expeditions.currentPage + 1;
    },

    navigateToLast: (state) => {
      state.expeditions.currentPage = state.expeditions.totalPages - 1;
    },

    filterExpeditions: (state, action: PayloadAction<FilterAction>) => {
      const { filterType, value } = action.payload;

      switch (filterType) {
        case 'startDate':
        case 'endDate':
          state.expeditions.currentPage = 0;
          state.filters = { ...state.filters, [filterType]: value };
          break;

        case 'cruiseLines':
          if (value < 0 || value > state.cruiseLines.length - 1) return;

          state.expeditions.currentPage = 0;
          state.filters = {
            ...state.filters,
            cruiseLines: toggleIndex(value, state.filters.cruiseLines),
          };
          break;

        case 'capacity':
        case 'duration':
          if (value < 0 || value > durationOptions.length - 1) return;
          state.expeditions.currentPage = 0;
          state.filters = { ...state.filters, [filterType]: value };
          break;
      }
    },

    resetFilters: (state) => {
      state.filters = initalFilterState;
    },

    resetDateFilters: (state) => {
      state.filters = {
        ...state.filters,
        startDate: null,
        endDate: null,
      };
    },
  },
});

export const expeditionsReducer = expeditionsSlice.reducer;

export const {
  setCruiseLines,
  setExpeditions,
  setSortOption,
  setItemsPerPage,
  navigateToFirst,
  navigateToPrevious,
  navigateToNext,
  navigateToLast,
  filterExpeditions,
  resetFilters,
  resetDateFilters,
} = expeditionsSlice.actions;
