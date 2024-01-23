import { useEffect, useMemo, useReducer } from 'react';

import { TExpedition, sortOptions } from '@/type';
import { sortByNumber, sortByString } from '@/utils';

type ExpeditionsState = {
  expeditions: TExpedition[];
  itemsPerPageOptions: number[];
  selectedItemsPerPageOption: number;
  currentPage: number;
  selectedSortOption: number;
};

type SET_ITEMS_PER_PAGE = { type: 'SET_ITEMS_PER_PAGE'; index: number };
type PREVIOUS_PAGE = { type: 'PREVIOUS_PAGE' };
type NEXT_PAGE = { type: 'NEXT_PAGE'; totalPages: number };
type SORT_EXPEDITIONS = { type: 'SORT_EXPEDITIONS'; index: number };

type ExpeditionsAction =
  | SET_ITEMS_PER_PAGE
  | PREVIOUS_PAGE
  | NEXT_PAGE
  | SORT_EXPEDITIONS;

function expeditionsReducer(
  state: ExpeditionsState,
  action: ExpeditionsAction,
) {
  switch (action.type) {
    case 'SET_ITEMS_PER_PAGE':
      return {
        ...state,
        selectedItemsPerPageOption: action.index,
        currentPage: 1,
      };

    case 'PREVIOUS_PAGE':
      return {
        ...state,
        currentPage: Math.max(state.currentPage - 1, 1),
      };

    case 'NEXT_PAGE':
      return {
        ...state,
        currentPage: Math.min(state.currentPage + 1, action.totalPages),
      };

    case 'SORT_EXPEDITIONS':
      const { field, dir } = sortOptions[action.index];

      const sortedExpeditions = [...state.expeditions].sort((a, b) => {
        switch (field) {
          case 'cruiseLine':
            const comparison = sortByString(a[field], b[field], dir);
            return comparison !== 0
              ? comparison
              : sortByString(a.name, b.name, dir);

          case 'name':
            return sortByString(a[field], b[field], dir);

          case 'startingPrice':
            return sortByNumber(a[field], b[field], dir);
        }
      });

      return {
        ...state,
        currentPage: 1,
        expeditions: sortedExpeditions,
        selectedSortOption: action.index,
      };

    default:
      return state;
  }
}

export default function useExpeditions(rawExpeditions: TExpedition[]) {
  const initialState: ExpeditionsState = {
    expeditions: rawExpeditions,
    itemsPerPageOptions: [5, 10, 15, 20],
    currentPage: 1,
    selectedItemsPerPageOption: 1,
    selectedSortOption: 0,
  };

  const [state, dispatch] = useReducer(expeditionsReducer, initialState);
  const {
    expeditions,
    currentPage,
    selectedItemsPerPageOption,
    itemsPerPageOptions,
    selectedSortOption,
  } = state;

  const totalPages = Math.ceil(
    expeditions.length / itemsPerPageOptions[selectedItemsPerPageOption],
  );

  const setItemsPerPage = (index: number) => {
    dispatch({ type: 'SET_ITEMS_PER_PAGE', index });
  };

  const previousPage = () => {
    dispatch({ type: 'PREVIOUS_PAGE' });
  };

  const nextPage = () => {
    dispatch({ type: 'NEXT_PAGE', totalPages });
  };

  const sortExpeditions = (index: number) => {
    dispatch({ type: 'SORT_EXPEDITIONS', index });
  };

  const { filteredExpeditions } = useMemo(() => {
    return {
      filteredExpeditions: expeditions.filter(
        (_, i) =>
          i < currentPage * itemsPerPageOptions[selectedItemsPerPageOption] &&
          i + 1 >
            (currentPage - 1) * itemsPerPageOptions[selectedItemsPerPageOption],
      ),
    };
  }, [currentPage, selectedItemsPerPageOption, expeditions]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  return {
    filteredExpeditions,
    currentPage,
    itemsPerPageOptions,
    selectedItemsPerPageOption,
    totalPages,
    selectedSortOption,
    setItemsPerPage,
    previousPage,
    nextPage,
    sortExpeditions,
  };
}
