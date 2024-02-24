/* eslint-disable  @typescript-eslint/no-unused-vars */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import {
  capacityOptions,
  durationOptions,
  itemsPerPageOptions,
} from '@/lib/constants';
import { ExpeditionsResponse, MainResponse, TCruiseLines } from '@/lib/type';
import { toggleIndex } from '@/lib/utils';

export type FilterState = {
  startDate: Date | undefined;
  endDate: Date | undefined;
  cruiseLines: number[];
  capacity: number;
  duration: number;
};

export type ExpeditionsState = {
  cruiseLines: TCruiseLines;
  cruiseLineOptions: { displayName: string }[];
  expeditions: ExpeditionsResponse;
  selectedItemsPerPage: number;
  selectedSort: number;
  filters: FilterState;
};

type FilterAction =
  | { filterType: 'startDate' | 'endDate'; value: string | undefined }
  | { filterType: 'cruiseLines' | 'duration' | 'capacity'; value: number };

const initalFilterState: FilterState = {
  startDate: undefined,
  endDate: undefined,
  cruiseLines: [],
  capacity: capacityOptions.length - 1,
  duration: durationOptions.length - 1,
};

export const expeditionsSlice = createSlice({
  name: 'expeditionsSlice',

  initialState: {
    cruiseLines: {},
    cruiseLineOptions: [],

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
    setData: (state, action: PayloadAction<MainResponse>) => {
      const { expeditions, cruiseLines } = action.payload;

      state.cruiseLines = cruiseLines;
      state.cruiseLineOptions = Object.keys(cruiseLines).map((x) => {
        return { displayName: x };
      });

      state.expeditions = expeditions;
      state.selectedItemsPerPage = itemsPerPageOptions.findIndex(
        (x) => x == state.expeditions.itemsPerPage,
      );
    },

    setExpeditions: (state, action: PayloadAction<ExpeditionsResponse>) => {
      const expeditions = action.payload;

      state.expeditions = expeditions;
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
          if (value < 0 || value > state.cruiseLineOptions.length - 1) return;

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
        startDate: undefined,
        endDate: undefined,
      };
    },
  },
});

export const expeditionsReducer = expeditionsSlice.reducer;

export const {
  setData,
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
