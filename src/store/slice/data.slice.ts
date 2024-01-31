/* eslint-disable  @typescript-eslint/no-unused-vars */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import {
  capacityOptions,
  durationOptions,
  itemsPerPageOptions,
} from '@/lib/constants';
import {
  ExpeditionsResponse,
  FilterState,
  MainResponse,
  TCruiseLines,
} from '@/lib/type';
import { toggleIndex } from '@/lib/utils';

export type DataState = {
  cruiseLines: TCruiseLines;
  cruiseLineOptions: { displayName: string }[];
  expeditions: ExpeditionsResponse;
  selectedItemsPerPage: number;
  selectedSort: number;
  filters: FilterState;
};

type FilterAction =
  | { filterType: 'startDate' | 'endDate'; value: Date }
  | { filterType: 'cruiseLines' | 'duration' | 'capacity'; value: number };

const initalFilterState: FilterState = {
  startDate: undefined,
  endDate: undefined,
  cruiseLines: [],
  capacity: capacityOptions.length - 1,
  duration: durationOptions.length - 1,
};

export const dataSlice = createSlice({
  name: 'dataSlice',

  initialState: {
    cruiseLines: {},
    cruiseLineOptions: [],

    expeditions: {
      data: [],
      currentPage: 0,
      itemsPerPage: 5,
      totalItems: 0,
      totalPages: 0,
    },

    selectedItemsPerPage: 1,
    selectedSort: 0,

    filters: initalFilterState,
  } as DataState,

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

    navigateToPrevious: (state) => {
      if (state.expeditions.currentPage === 0) return;
      state.expeditions.currentPage = state.expeditions.currentPage - 1;
    },

    navigateToNext: (state) => {
      if (state.expeditions.currentPage + 1 === state.expeditions.totalPages)
        return;
      state.expeditions.currentPage = state.expeditions.currentPage + 1;
    },

    filterExpeditions: (state, action: PayloadAction<FilterAction>) => {
      const { filterType, value } = action.payload;

      switch (filterType) {
        // case 'startDate':
        // case 'endDate':
        //   state.currentPage = 0;
        //   state.filters = { ...state.filters, [filterType]: value };
        //   break;

        case 'cruiseLines':
          if (value < 0 || value > state.cruiseLineOptions.length - 1) return;

          state.expeditions.currentPage = 0;
          state.filters = {
            ...state.filters,
            cruiseLines: toggleIndex(value, state.filters.cruiseLines),
          };
          break;

        case 'duration':
          if (value < 0 || value > durationOptions.length - 1) return;
          state.expeditions.currentPage = 0;
          state.filters = { ...state.filters, [filterType]: value };
          break;

        // case 'capacity': {
        //   if (value < 0 || value > capacityOptions.length - 1) return;
        //   state.currentPage = 1;
        //   state.filters = { ...state.filters, [filterType]: value };
        // }
      }
    },

    resetFilters: (state) => {
      state.filters = initalFilterState;
    },
  },
});

export const dataReducer = dataSlice.reducer;

export const {
  setData,
  setExpeditions,
  setSortOption,
  setItemsPerPage,
  navigateToNext,
  navigateToPrevious,
  filterExpeditions,
  resetFilters,
} = dataSlice.actions;
