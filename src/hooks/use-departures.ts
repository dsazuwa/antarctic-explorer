import { useReducer } from 'react';

import { DeparturesResponse } from '@/lib/type';

type DeparturesState = DeparturesResponse & { selectedSort: number };

type Action =
  | { type: 'SET_DEPARTURES'; payload: DeparturesResponse }
  | { type: 'SET_SORT'; payload: number }
  | { type: 'SET_SIZE'; payload: number }
  | { type: 'NAVIGATE_TO'; payload: number }
  | { type: 'NAVIGATE_TO_PREVIOUS' }
  | { type: 'NAVIGATE_TO_NEXT' };

const initialState: DeparturesState = {
  departures: [],
  page: 1,
  size: 5,
  totalItems: 0,
  totalPages: 0,
  selectedSort: 0,
};

const reducer = (state: DeparturesState, action: Action): DeparturesState => {
  switch (action.type) {
    case 'SET_DEPARTURES':
      return { ...state, ...action.payload };

    case 'SET_SORT':
      return { ...state, selectedSort: action.payload, page: 1 };

    case 'SET_SIZE':
      return { ...state, size: action.payload, page: 1 };

    case 'NAVIGATE_TO':
      return {
        ...state,
        page: Math.min(Math.max(1, action.payload), state.totalPages),
      };

    case 'NAVIGATE_TO_PREVIOUS':
      return { ...state, page: Math.max(1, state.page - 1) };

    case 'NAVIGATE_TO_NEXT':
      return {
        ...state,
        page: Math.min(state.totalPages, state.page + 1),
      };

    default:
      return state;
  }
};

export default function useDepartures() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setDepartures = (data: DeparturesResponse) => {
    dispatch({ type: 'SET_DEPARTURES', payload: data });
  };

  const setSort = (value: number) => {
    dispatch({ type: 'SET_SORT', payload: value });
  };

  const setSize = (value: number) => {
    dispatch({ type: 'SET_SIZE', payload: value });
  };

  const navigateTo = (page: number) => {
    dispatch({ type: 'NAVIGATE_TO', payload: page });
  };

  const navigateToPrevious = () => {
    dispatch({ type: 'NAVIGATE_TO_PREVIOUS' });
  };

  const navigateToNext = () => {
    dispatch({ type: 'NAVIGATE_TO_NEXT' });
  };

  return {
    ...state,
    setDepartures,
    setSort,
    setSize,
    navigateTo,
    navigateToPrevious,
    navigateToNext,
  };
}
