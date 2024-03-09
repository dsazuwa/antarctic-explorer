import { useEffect } from 'react';

import {
  capacityOptions,
  durationOptions,
  itemsPerPageOptions,
  sortOptions,
} from '@/lib/constants';
import { formatDate } from '@/lib/utils';
import { useAppSelector, useLazyGetExpeditionsQuery } from '@/store';

export default function useExpeditions() {
  const {
    expeditions: { data, currentPage },
    cruiseLineOptions,
    selectedItemsPerPage,
    selectedSort,
    filters,
  } = useAppSelector((s) => s.expeditionState);

  const [fetchExpeditions] = useLazyGetExpeditionsQuery();

  useEffect(() => {
    const {
      startDate,
      endDate,
      cruiseLines: linesFilter,
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
      cruiseLines: linesFilter
        .map((x) => cruiseLineOptions[x].displayName)
        .join(','),
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
    cruiseLineOptions,
    fetchExpeditions,
  ]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage, selectedItemsPerPage]);

  return data;
}
