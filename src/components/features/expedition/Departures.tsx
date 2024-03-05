import { useEffect } from 'react';

import { useAppSelector, useLazyGetDeparturesQuery } from '@/store';
import Departure from './Departure';
import H3Heading from './H3Heading';
import PaginationControls from './PaginationControls';
import PaginationHeader from './PaginationHeader';
import {
  departureSortOptions,
  departuresPerPageOptions,
} from '@/lib/constants';

export default function Departures({ id }: { id: number }) {
  const {
    departures: { data, currentPage },
    selectedItemsPerPage,
    selectedSort,
  } = useAppSelector((s) => s.departureState);

  const [fetchDepartures] = useLazyGetDeparturesQuery();

  useEffect(() => {
    fetchDepartures({
      id,
      page: currentPage,
      size: departuresPerPageOptions[selectedItemsPerPage],
      sort:
        selectedSort === 0
          ? undefined
          : departureSortOptions[selectedSort].sort,
      dir:
        departureSortOptions[selectedSort].dir === 'asc' ? undefined : 'desc',
    });
  }, [id, currentPage, selectedItemsPerPage, selectedSort, fetchDepartures]);

  return data === undefined || data.length === 0 ? (
    <></>
  ) : (
    <section className='w-full' aria-label='Departure Date & Rates'>
      <div className='mx-auto max-w-screen-lg space-y-1 p-4'>
        <H3Heading text='Departures' />

        <PaginationHeader />

        <div className='space-y-4'>
          {data.map((departure, i) => (
            <Departure key={`departure-${i}`} departure={departure} />
          ))}
        </div>

        <PaginationControls />
      </div>
    </section>
  );
}
