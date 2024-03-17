import { useEffect } from 'react';

import {
  departureSortOptions,
  departuresPerPageOptions,
} from '@/lib/constants';
import { useAppSelector, useLazyGetDeparturesQuery } from '@/store';
import Departure from './Departure';
import PaginationControls from './PaginationControls';
import PaginationHeader from './PaginationHeader';

export default function Departures({ id, name }: { id: number; name: string }) {
  const {
    departures: { data, currentPage },
    selectedItemsPerPage,
    selectedSort,
  } = useAppSelector((s) => s.departureState);

  const [fetchDepartures] = useLazyGetDeparturesQuery();

  useEffect(() => {
    fetchDepartures({
      id,
      name,
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
      <div className='mx-auto max-w-screen-lg space-y-1 px-4 py-8 md:py-12'>
        <h2 className='mb-2 text-lg font-bold text-sky-900 md:text-xl'>
          Departures
        </h2>

        <PaginationHeader />

        <ol className='space-y-4'>
          {data.map((departure, i) => (
            <Departure key={`departure-${i}`} departure={departure} />
          ))}
        </ol>

        <PaginationControls />
      </div>
    </section>
  );
}
