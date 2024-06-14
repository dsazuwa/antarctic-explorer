import { create } from 'zustand';

import { DeparturesResponse } from '../lib/type';

type ExpeditionsStore = DeparturesResponse & {
  isLoading: boolean;
  selectedSort: number;

  setIsLoading: (isLoading: boolean) => void;
  setDepartures: (data: DeparturesResponse) => void;
  setSort: (value: number) => void;
  setSize: (value: number) => void;
  navigateTo: (page: number) => void;
  navigateToPrevious: () => void;
  navigateToNext: () => void;
};

export const useDeparturesStore = create<ExpeditionsStore>((set) => ({
  isLoading: false,

  departures: [],
  page: 1,
  size: 5,
  totalItems: 0,
  totalPages: 0,

  selectedSort: 0,

  setIsLoading: (isLoading: boolean) => {
    set({ isLoading });
  },

  setDepartures: (data) => {
    set({
      ...data,
      isLoading: false,
    });
  },

  setSort: (val) => {
    set({ page: 1, selectedSort: val });
  },

  setSize: (val) => {
    set({ page: 1, size: val });
  },

  navigateTo: (page: number) => {
    set((state) => ({
      page: Math.min(Math.max(1, page), state.totalPages),
    }));
  },

  navigateToPrevious: () => {
    set((state) => ({ page: Math.max(1, state.page) }));
  },

  navigateToNext: () => {
    set((state) => ({
      page: Math.min(state.totalPages, state.page + 1),
    }));
  },
}));
