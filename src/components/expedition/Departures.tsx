'use client';

import { useEffect } from 'react';

import {
  departureSortOptions,
  departuresPerPageOptions,
} from '@/lib/constants';
import { useDeparturesStore } from '@/store/departures';
import Departure from './Departure';
import Controls from './DeparturesControls';
import Header from './DeparturesHeader';

type Props = {
  cruiseLine: string;
  name: string;
};

export default function Departures({ cruiseLine, name }: Props) {
  const { data, currentPage, selectedSize, selectedSort, setDepartures } =
    useDeparturesStore();

  useEffect(() => {
    const { sort, dir } = departureSortOptions[selectedSort];

    const params = {
      page: currentPage,
      size: departuresPerPageOptions[selectedSize],
      sort,
      dir,
    };

    const url = new URL(
      `${process.env.NEXT_PUBLIC_API_URL}/cruise-lines/${encodeURIComponent(cruiseLine)}/expeditions/${encodeURIComponent(name)}/departures`,
    );

    for (const [key, value] of Object.entries(params))
      url.searchParams.append(key, String(value));

    fetch(url.toString())
      .then((response) => response.json())
      .then((data) => setDepartures(data));
  }, [cruiseLine, name, currentPage, selectedSize, selectedSort]);

  return data.length === 0 ? (
    <></>
  ) : (
    <section className='w-full' aria-label='Departure Date & Rates'>
      <div className='mx-auto max-w-screen-lg space-y-1 px-4 py-8 md:py-12'>
        <h2 className='mb-2 text-lg font-bold text-sky-900 md:text-xl'>
          Departures
        </h2>

        <Header />

        <ol className='space-y-4'>
          {data.map((departure, i) => (
            <Departure key={`departure-${i}`} departure={departure} />
          ))}
        </ol>

        <Controls />
      </div>
    </section>
  );
}
