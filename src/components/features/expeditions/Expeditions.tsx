import { ValueNoneIcon } from '@radix-ui/react-icons';
import { useEffect, useState } from 'react';

import Expedition from '@/components/common/Expedition';
import Loader from '@/components/common/Loader';
import {
  capacityOptions,
  durationOptions,
  itemsPerPageOptions,
  sortOptions,
} from '@/lib/constants';
import { formatDate } from '@/lib/utils';
import { useAppSelector, useLazyGetExpeditionsQuery } from '@/store';

export default function Expeditions() {
  const {
    expeditions: { data, currentPage },
    cruiseLines,
    selectedItemsPerPage,
    selectedSort,
    filters,
  } = useAppSelector((s) => s.expeditionState);

  const [fetchExpeditions, { isLoading, isFetching }] =
    useLazyGetExpeditionsQuery();

  const [isFirstLoad, setFirstLoad] = useState(true);

  useEffect(() => {
    if (isFirstLoad) {
      setFirstLoad(false);
      return;
    }

    const {
      startDate,
      endDate,
      cruiseLines: cruiseLinesFilter,
      capacity,
      duration,
    } = filters;

    const startFilter =
      startDate !== null
        ? { startDate: encodeURIComponent(formatDate(startDate, 'yyyy-MM-dd')) }
        : {};

    const endFilter =
      endDate !== null
        ? { endDate: encodeURIComponent(formatDate(endDate, 'yyyy-MM-dd')) }
        : {};

    const capacityFillter =
      capacity !== capacityOptions.length - 1
        ? {
            'capacity.min': capacityOptions[capacity].min,
            'capacity.max': capacityOptions[capacity].max,
          }
        : {};

    const durationFilter =
      duration !== durationOptions.length - 1
        ? {
            'duration.min': durationOptions[duration].min,
            'duration.max': durationOptions[duration].max,
          }
        : {};

    fetchExpeditions({
      page: currentPage,
      size: itemsPerPageOptions[selectedItemsPerPage],
      sort: selectedSort === 0 ? '' : sortOptions[selectedSort].sort,
      dir: sortOptions[selectedSort].dir === 'asc' ? '' : 'desc',
      cruiseLines: cruiseLinesFilter.map((x) => cruiseLines[x]).join(','),
      ...startFilter,
      ...endFilter,
      ...capacityFillter,
      ...durationFilter,
    });
  }, [
    currentPage,
    selectedItemsPerPage,
    selectedSort,
    filters,
    cruiseLines,
    fetchExpeditions,
  ]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage, selectedItemsPerPage]);

  return (
    <>
      {data.length === 0 ? (
        <div className='flex w-full flex-col items-center justify-center gap-3 p-4 text-center font-semibold text-gray-300 sm:flex-row'>
          <ValueNoneIcon className='h-10 w-10' />

          <span className='max-w-64 lg:text-lg'>
            No results. Try adjusting your search by removing filters.
          </span>
        </div>
      ) : (
        <ol
          id='expeditions-list'
          className='grid w-full grid-cols-1 gap-4 sm:grid-cols-2'
        >
          {data.map((expedition, index) => (
            <Expedition key={'expedition' + index} expedition={expedition} />
          ))}
        </ol>
      )}

      {(isLoading || isFetching) && (
        <div className='fixed bottom-0 left-0 right-0 top-0 z-50 flex bg-[hsla(0,0%,100%,0.5)]'>
          <Loader className='my-auto' />
        </div>
      )}
    </>
  );
}
