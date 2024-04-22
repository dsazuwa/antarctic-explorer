import { create } from 'zustand';

import { itemsPerPageOptions } from './lib/constants';
import { ExpeditionsResponse } from './lib/type';

export type FilterState = {
  startDate: Date | null;
  endDate: Date | null;
  cruiseLines: number[];
  capacity: number;
  duration: number;
};

type ExpeditionsStore = {
  isLoading: boolean;
  expeditions: ExpeditionsResponse;

  setExpeditions: (data: ExpeditionsResponse) => void;
  setIsLoading: (isLoading: boolean) => void;
};

export const useExpeditionsStore = create<ExpeditionsStore>((set) => ({
  isLoading: false,
  expeditions: {
    data: [],
    currentPage: 0,
    itemsPerPage: itemsPerPageOptions[0],
    totalItems: 0,
    totalPages: 0,
  },

  setExpeditions: (data) => {
    set({ expeditions: data, isLoading: false });
  },

  setIsLoading: (isLoading: boolean) => {
    set({ isLoading });
  },
}));
