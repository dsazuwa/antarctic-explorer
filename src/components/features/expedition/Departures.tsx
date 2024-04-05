import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import {
  departureSortOptions,
  departuresPerPageOptions,
} from '@/lib/constants';
import { setDepartures, useAppSelector } from '@/store';
import Departure from './Departure';
import PaginationControls from './PaginationControls';
import PaginationHeader from './PaginationHeader';

export default function Departures({ id, name }: { id: number; name: string }) {
  const dispatch = useDispatch();

  const {
    departures: { data, currentPage },
    selectedItemsPerPage,
    selectedSort,
  } = useAppSelector((s) => s.departureState);

  useEffect(() => {
    const params = {
      page: currentPage,
      size: departuresPerPageOptions[selectedItemsPerPage],
      sort: departureSortOptions[selectedSort].sort,
      dir: departureSortOptions[selectedSort].dir,
    };

    const url = new URL(
      `${process.env.NEXT_PUBLIC_API_URL}/cruise-lines/${id}/expeditions/${name}/departures`,
    );

    for (const [key, value] of Object.entries(params)) {
      url.searchParams.append(key, String(value));
    }

    fetch(url.toString())
      .then((response) => response.json())
      .then((data) => dispatch(setDepartures(data)));
  }, [id, currentPage, selectedItemsPerPage, selectedSort, dispatch]);

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
