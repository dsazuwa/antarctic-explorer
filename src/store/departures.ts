import { create } from 'zustand';

import { departuresPerPageOptions } from '../lib/constants';
import { DeparturesResponse } from '../lib/type';

type ExpeditionsStore = DeparturesResponse & {
  isLoading: boolean;
  selectedSize: number;
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

  data: [],
  currentPage: 0,
  itemsPerPage: 0,
  totalItems: 0,
  totalPages: 0,

  selectedSize: 0,
  selectedSort: 0,

  setIsLoading: (isLoading: boolean) => {
    set({ isLoading });
  },

  setDepartures: (data) => {
    set({
      ...data,
      isLoading: false,
      selectedSize: departuresPerPageOptions.findIndex(
        (x) => x === data.itemsPerPage,
      ),
    });
  },

  setSort: (val) => {
    set({ currentPage: 0, selectedSort: val });
  },

  setSize: (val) => {
    set({ currentPage: 0, selectedSort: val });
  },

  navigateTo: (page: number) => {
    set((state) => ({
      currentPage: Math.min(Math.max(0, page), state.totalPages - 1),
    }));
  },

  navigateToPrevious: () => {
    set((state) => ({ currentPage: Math.max(0, state.currentPage - 1) }));
  },

  navigateToNext: () => {
    set((state) => ({
      currentPage: Math.min(state.totalPages - 1, state.currentPage + 1),
    }));
  },
}));
