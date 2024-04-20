import { useEffect, useReducer } from 'react';

import {
  departureSortOptions,
  departuresPerPageOptions,
} from '@/lib/constants';
import { DeparturesResponse } from '@/lib/type';
import Departure from './Departure';
import Controls from './DeparturesControls';
import Header from './DeparturesHeader';

type DepartureState = {
  departures: DeparturesResponse;
  selectedItemsPerPage: number;
  selectedSort: number;
};

export type DepartureAction =
  | { type: 'SET_DEPARTURES'; payload: DeparturesResponse }
  | { type: 'SET_DEPARTURE_SORT'; payload: number }
  | { type: 'SET_DEPARTURES_PER_PAGE'; payload: number }
  | { type: 'NAVIGATE_TO_FIRST_DEPARTURE' }
  | { type: 'NAVIGATE_TO_PREVIOUS_DEPARTURE' }
  | { type: 'NAVIGATE_TO_NEXT_DEPARTURE' }
  | { type: 'NAVIGATE_TO_LAST_DEPARTURE' };

const departureReducer = (
  state: DepartureState,
  action: DepartureAction,
): DepartureState => {
  switch (action.type) {
    case 'SET_DEPARTURES':
      return {
        ...state,
        departures: action.payload,
        selectedItemsPerPage:
          state.departures.itemsPerPage === action.payload.itemsPerPage
            ? state.selectedItemsPerPage
            : departuresPerPageOptions.findIndex(
                (x) => x === action.payload.itemsPerPage,
              ),
      };

    case 'SET_DEPARTURE_SORT':
      return {
        ...state,
        selectedSort: action.payload,
        departures: { ...state.departures, currentPage: 0 },
      };

    case 'SET_DEPARTURES_PER_PAGE':
      return {
        ...state,
        selectedItemsPerPage: action.payload,
        departures: { ...state.departures, currentPage: 0 },
      };

    case 'NAVIGATE_TO_FIRST_DEPARTURE':
      return { ...state, departures: { ...state.departures, currentPage: 0 } };

    case 'NAVIGATE_TO_PREVIOUS_DEPARTURE':
      return {
        ...state,
        departures: {
          ...state.departures,
          currentPage: Math.max(0, state.departures.currentPage - 1),
        },
      };

    case 'NAVIGATE_TO_NEXT_DEPARTURE':
      return {
        ...state,
        departures: {
          ...state.departures,
          currentPage: Math.min(
            state.departures.totalPages - 1,
            state.departures.currentPage + 1,
          ),
        },
      };

    case 'NAVIGATE_TO_LAST_DEPARTURE':
      return {
        ...state,
        departures: {
          ...state.departures,
          currentPage: state.departures.totalPages - 1,
        },
      };

    default:
      return state;
  }
};

type Props = {
  cruiseLine: string;
  name: string;
};

export default function Departures({ cruiseLine, name }: Props) {
  const [state, dispatch] = useReducer(departureReducer, {
    departures: {
      data: [],
      itemsPerPage: 0,
      totalItems: 0,
      totalPages: 0,
      currentPage: 0,
    },
    selectedItemsPerPage: 0,
    selectedSort: 0,
  });

  const {
    departures: { data, currentPage, totalPages, itemsPerPage, totalItems },
    selectedItemsPerPage,
    selectedSort,
  } = state;

  useEffect(() => {
    const params = {
      page: currentPage,
      size: departuresPerPageOptions[selectedItemsPerPage],
      sort: departureSortOptions[selectedSort].sort,
      dir: departureSortOptions[selectedSort].dir,
    };

    const url = new URL(
      `${process.env.NEXT_PUBLIC_API_URL}/cruise-lines/${encodeURIComponent(cruiseLine)}/expeditions/${encodeURIComponent(name)}/departures`,
    );

    for (const [key, value] of Object.entries(params))
      url.searchParams.append(key, String(value));

    fetch(url.toString())
      .then((response) => response.json())
      .then((data) => dispatch({ type: 'SET_DEPARTURES', payload: data }));
  }, [cruiseLine, name, currentPage, selectedItemsPerPage, selectedSort]);

  const setSortOption = (i: number) =>
    dispatch({ type: 'SET_DEPARTURE_SORT', payload: i });

  return data.length === 0 ? (
    <></>
  ) : (
    <section className='w-full' aria-label='Departure Date & Rates'>
      <div className='mx-auto max-w-screen-lg space-y-1 px-4 py-8 md:py-12'>
        <h2 className='mb-2 text-lg font-bold text-sky-900 md:text-xl'>
          Departures
        </h2>

        <Header
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          totalItems={totalItems}
          selectedSort={selectedSort}
          setSortOption={setSortOption}
        />

        <ol className='space-y-4'>
          {data.map((departure, i) => (
            <Departure key={`departure-${i}`} departure={departure} />
          ))}
        </ol>

        <Controls
          currentPage={currentPage}
          totalPages={totalPages}
          selectedItemsPerPage={selectedItemsPerPage}
          dispatch={dispatch}
        />
      </div>
    </section>
  );
}
