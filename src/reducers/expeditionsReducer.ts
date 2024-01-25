import { ExpeditionsState } from '@/type';
import { toggleIndex } from '@/utils';

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
  index: number;
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

export default function expeditionsReducer(
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
        filters: {
          ...state.filters,
          cruiseLines: toggleIndex(action.index, state.filters.cruiseLines),
        },
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
