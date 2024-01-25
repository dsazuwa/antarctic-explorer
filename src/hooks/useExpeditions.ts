import { ChangeEvent, useEffect, useMemo, useReducer } from 'react';

import {
  capacityOptions,
  durationOptions,
  itemsPerPageOptions,
  sortOptions,
} from '@/constants';
import { ExpeditionsState, TCruiseLines, TExpedition } from '@/type';
import {
  filterExpeditions,
  paginateExpeditions,
  sortExpeditions as sortExpeditionsUtils,
} from '@/utils';

type SET_ITEMS_PER_PAGE = {
  type: 'SET_ITEMS_PER_PAGE';
  index: number;
};

type PREVIOUS_PAGE = { type: 'PREVIOUS_PAGE' };

type NEXT_PAGE = {
  type: 'NEXT_PAGE';
  totalPages: number;
};

type SORT_EXPEDITIONS = {
  type: 'SORT_EXPEDITIONS';
  index: number;
};

type FILTER_START_DATE = {
  type: 'FILTER_START_DATE';
  date: Date;
};

type FILTER_END_DATE = {
  type: 'FILTER_END_DATE';
  date: Date;
};

type FILTER_CRUISE_LINES = {
  type: 'FILTER_CRUISE_LINES';
  indices: number[];
};

type FILTER_SHIP_CAPACITY = {
  type: 'FILTER_SHIP_CAPACITY';
  index: number;
};

type FILTER_DURATION = {
  type: 'FILTER_DURATION';
  index: number;
};

type ExpeditionsAction =
  | SET_ITEMS_PER_PAGE
  | PREVIOUS_PAGE
  | NEXT_PAGE
  | SORT_EXPEDITIONS
  | FILTER_START_DATE
  | FILTER_END_DATE
  | FILTER_CRUISE_LINES
  | FILTER_SHIP_CAPACITY
  | FILTER_DURATION;

export function expeditionsReducer(
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
      return {
        ...state,
        currentPage: 1,
        selectedSortOption: action.index,
      };

    case 'FILTER_START_DATE':
      return {
        ...state,
        currentPage: 1,
        filters: { ...state.filters, startDate: action.date },
      };

    case 'FILTER_END_DATE':
      return {
        ...state,
        currentPage: 1,
        filters: { ...state.filters, endDate: action.date },
      };

    case 'FILTER_CRUISE_LINES':
      return {
        ...state,
        currentPage: 1,
        filters: { ...state.filters, cruiseLines: action.indices },
      };

    case 'FILTER_DURATION':
      return {
        ...state,
        currentPage: 1,
        filters: { ...state.filters, duration: action.index },
      };

    case 'FILTER_SHIP_CAPACITY':
      return {
        ...state,
        currentPage: 1,
        filters: { ...state.filters, capacity: action.index },
      };
    default:
      return state;
  }
}

export default function useExpeditions(
  rawExpeditions: TExpedition[],
  cruiseLines: TCruiseLines,
) {
  const initialState: ExpeditionsState = {
    currentPage: 1,
    selectedItemsPerPageOption: 1,
    selectedSortOption: 0,
    filters: {
      startDate: undefined,
      endDate: undefined,
      cruiseLines: [],
      capactity: capacityOptions.length - 1,
      duration: durationOptions.length - 1,
    },
  };

  const cruiseLineOptions = Object.keys(cruiseLines).map((x) => {
    return { displayName: x };
  });

  const [state, dispatch] = useReducer(expeditionsReducer, initialState);
  const {
    currentPage,
    selectedItemsPerPageOption,
    selectedSortOption,
    filters,
  } = state;

  const { filteredExpeditions } = useMemo(() => {
    return {
      filteredExpeditions: filterExpeditions(
        rawExpeditions,
        filters,
        cruiseLineOptions,
        durationOptions,
      ),
    };
  }, [rawExpeditions, filters.cruiseLines, filters.duration]);

  const { sortedExpeditions } = useMemo(() => {
    return {
      sortedExpeditions: sortExpeditionsUtils(
        filteredExpeditions,
        sortOptions[selectedSortOption],
      ),
    };
  }, [filteredExpeditions, sortOptions, selectedSortOption]);

  const { paginatedExpeditions } = useMemo(() => {
    return {
      paginatedExpeditions: paginateExpeditions(
        sortedExpeditions,
        currentPage,
        selectedItemsPerPageOption,
        itemsPerPageOptions,
      ),
    };
  }, [
    currentPage,
    selectedItemsPerPageOption,
    itemsPerPageOptions,
    sortedExpeditions,
    selectedSortOption,
  ]);

  const totalPages = Math.ceil(
    filteredExpeditions.length /
      itemsPerPageOptions[selectedItemsPerPageOption],
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
    if (index < 0 || index > sortOptions.length - 1) return;
    dispatch({ type: 'SORT_EXPEDITIONS', index });
  };

  const filterByStartDate = (date: Date) => {
    dispatch({ type: 'FILTER_START_DATE', date });
  };

  const filterByEndDate = (date: Date) => {
    dispatch({ type: 'FILTER_END_DATE', date });
  };

  const filterByCruiseLine = (event: ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
    // dispatch({ type: 'FILTER_CRUISE_LINES', cruiseLines });
  };

  const filterByDuration = (event: ChangeEvent<HTMLInputElement>) => {
    const index = Number.parseInt(event.target.value);
    if (index < 0 || index > durationOptions.length - 1) return;
    dispatch({ type: 'FILTER_DURATION', index });
  };

  const filterByCapacity = (index: number) => {
    if (index < 0 || index > capacityOptions.length - 1) return;
    dispatch({ type: 'FILTER_SHIP_CAPACITY', index });
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  return {
    expeditions: paginatedExpeditions,
    numExpeditions: filteredExpeditions.length,
    currentPage,
    selectedItemsPerPageOption,
    totalPages,
    selectedSortOption,
    cruiseLineOptions,
    filters,
    setItemsPerPage,
    previousPage,
    nextPage,
    sortExpeditions,
    filterByStartDate,
    filterByEndDate,
    filterByCruiseLine,
    filterByDuration,
    filterByCapacity,
  };
}
