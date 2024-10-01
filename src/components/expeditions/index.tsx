'use client';

import { useEffect } from 'react';
import useSWRImmutable from 'swr/immutable';

import SideFilterPanel from '@/components/expeditions/filter-panel-side';
import Footer from '@/components/layout/footer';
import Loader from '@/components/loader';
import useExpeditions from '@/hooks/use-expeditions';
import { getExpeditionsParams } from '@/lib/param.utils';
import { ExpeditionsResponse, SearchParams } from '@/lib/type';
import ExpeditionsGrid from './expeditions-grid';
import FilterChips from './filter-chips';
import MobileFilterPanel from './filter-panel-mobile';
import PaginationControls from './pagination-controls';
import PaginationHeader from './pagination-header';

export default function Expeditions({
  searchParams,
}: {
  searchParams?: SearchParams;
}) {
  const { expeditions, page, size, totalItems, totalPages, setExpeditions } =
    useExpeditions();

  const fetcher = (url: string) => fetch(url).then((r) => r.json());

  const { data, isLoading } = useSWRImmutable<ExpeditionsResponse>(
    `/api/expeditions?${getExpeditionsParams(searchParams || {})}`,
    fetcher,
  );

  useEffect(() => {
    if (data) setExpeditions(data);
  }, [data]);

  return (
    <>
      <div className='grid h-full flex-grow px-6 lg:container lg:grid-cols-3 lg:gap-12 xl:grid-cols-4'>
        <SideFilterPanel />

        <main className='col-span-4 flex h-full w-full flex-col gap-6 pt-6 lg:col-span-2 lg:pt-24 xl:col-span-3'>
          <h1 className='heading-2 text-center font-bold text-navy'>
            Expeditions
          </h1>

          <MobileFilterPanel />

          <FilterChips />

          <PaginationHeader page={page} size={size} totalItems={totalItems} />

          <ExpeditionsGrid expeditions={expeditions} />

          <div className='mt-auto space-y-8 pt-2'>
            <PaginationControls
              page={page}
              totalPages={totalPages}
              size={size}
            />

            <Footer />
          </div>
        </main>
      </div>

      {isLoading && (
        <div className='fixed bottom-0 left-0 right-0 top-0 z-50 flex bg-[hsla(0,0%,100%,0.5)]'>
          <Loader className='my-auto' />
        </div>
      )}
    </>
  );
}
