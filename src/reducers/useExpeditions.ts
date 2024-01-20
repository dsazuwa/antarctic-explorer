import { useEffect, useMemo, useReducer } from 'react';

import { TExpedition } from '@/type';

type ExpeditionsState = {
  expeditions: TExpedition[];
  itemsPerPageOptions: number[];
  selectedItemsPerPageOption: number;
  currentPage: number;
};

type SET_ITEMS_PER_PAGE = { type: 'SET_ITEMS_PER_PAGE'; payload: number };
type PREVIOUS_PAGE = { type: 'PREVIOUS_PAGE' };
type NEXT_PAGE = { type: 'NEXT_PAGE'; payload: number };
type ExpeditionsAction = SET_ITEMS_PER_PAGE | PREVIOUS_PAGE | NEXT_PAGE;

function expeditionsReducer(
  state: ExpeditionsState,
  action: ExpeditionsAction,
) {
  switch (action.type) {
    case 'SET_ITEMS_PER_PAGE':
      return {
        ...state,
        selectedItemsPerPageOption: action.payload,
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
        currentPage: Math.min(state.currentPage + 1, action.payload),
      };

    default:
      return state;
  }
}

export default function useExpeditions(expeditions: TExpedition[]) {
  const initialState: ExpeditionsState = {
    expeditions,
    itemsPerPageOptions: [6, 12, 18, 24],
    selectedItemsPerPageOption: 0,
    currentPage: 1,
  };

  const [state, dispatch] = useReducer(expeditionsReducer, initialState);
  const { currentPage, selectedItemsPerPageOption, itemsPerPageOptions } =
    state;

  const totalPages = Math.ceil(
    expeditions.length / itemsPerPageOptions[selectedItemsPerPageOption],
  );

  const setItemsPerPage = (index: number) => {
    dispatch({ type: 'SET_ITEMS_PER_PAGE', payload: index });
  };

  const previousPage = () => {
    dispatch({ type: 'PREVIOUS_PAGE' });
  };

  const nextPage = () => {
    dispatch({ type: 'NEXT_PAGE', payload: totalPages });
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
  };
}
