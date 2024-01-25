import { ChangeEvent, useEffect, useMemo, useReducer } from 'react';

import {
  capacityOptions,
  durationOptions,
  itemsPerPageOptions,
  sortOptions,
} from '@/constants';
import expeditionsReducer from '@/reducers/expeditionsReducer';
import { ExpeditionsState, TCruiseLines, TExpedition } from '@/type';
import {
  filterExpeditions,
  paginateExpeditions,
  sortExpeditions as sortExpeditionsUtils,
} from '@/utils';

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
