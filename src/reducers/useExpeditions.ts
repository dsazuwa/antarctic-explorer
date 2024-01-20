import { useEffect, useMemo, useReducer } from 'react';

import { ExpeditionSortType, TExpedition, sortOptions } from '@/type';

type ExpeditionsState = {
  expeditions: TExpedition[];
  itemsPerPageOptions: number[];
  selectedItemsPerPageOption: number;
  currentPage: number;
};

type SET_ITEMS_PER_PAGE = { type: 'SET_ITEMS_PER_PAGE'; index: number };
type PREVIOUS_PAGE = { type: 'PREVIOUS_PAGE' };
type NEXT_PAGE = { type: 'NEXT_PAGE'; totalPages: number };
type SORT_EXPEDITIONS = {
  type: 'SORT_EXPEDITIONS';
  payload: ExpeditionSortType;
};

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
      const { field, dir } = action.payload;

      const sortedExpeditions = [...state.expeditions].sort((a, b) => {
        switch (field) {
          case 'name':
            return dir === 'asc'
              ? a.name.localeCompare(b.name)
              : b.name.localeCompare(a.name);

          case 'startingPrice': {
            const valA = a.startingPrice;
            const valB = b.startingPrice;

            if (valA === null) return 1;
            if (valB === null) return -1;

            return dir === 'asc' ? valA - valB : valB - valA;
          }
        }
      });

      return {
        ...state,
        expeditions: sortedExpeditions,
      };

    default:
      return state;
  }
}

export default function useExpeditions(rawExpeditions: TExpedition[]) {
  const initialState: ExpeditionsState = {
    expeditions: rawExpeditions,
    itemsPerPageOptions: [6, 12, 18, 24],
    selectedItemsPerPageOption: 0,
    currentPage: 1,
  };

  const [state, dispatch] = useReducer(expeditionsReducer, initialState);
  const {
    expeditions,
    currentPage,
    selectedItemsPerPageOption,
    itemsPerPageOptions,
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
    const selectedSortOption = sortOptions[index];
    dispatch({ type: 'SORT_EXPEDITIONS', payload: selectedSortOption });
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

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

  return {
    filteredExpeditions,
    currentPage,
    itemsPerPageOptions,
    totalPages,
    setItemsPerPage,
    previousPage,
    nextPage,
    sortExpeditions,
  };
}
