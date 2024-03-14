import { clsx, type ClassValue } from 'clsx';
import { format } from 'date-fns';

import {
  capacityOptions,
  durationOptions,
  itemsPerPageOptions,
  sortOptions,
} from '@/lib/constants';
import { ExpeditionParams } from '@/lib/type';

export function cn(...inputs: ClassValue[]) {
  // return twMerge(clsx(inputs));
  return clsx(inputs);
}

export const toggleIndex = (index: number, selectedIndices: number[]) =>
  selectedIndices.includes(index)
    ? selectedIndices.filter((i) => i !== index)
    : [...selectedIndices, index];

export const formatPrice = (price: number) => {
  return price.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  });
};

export const formatDate = (
  date: Date | string,
  formatStr: 'yyyy-MM-dd' | 'LLL dd, y' | 'LLL y',
) => {
  return format(date, formatStr);
};

export const getExpeditionParams = (
  currentPage: number,
  selectedItemsPerPage: number,
  selectedSort: number,
  cruiseLines: string,
  startDate: Date | null,
  endDate: Date | null,
  capacity: number,
  duration: number,
): ExpeditionParams => {
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

  return {
    page: currentPage,
    size: itemsPerPageOptions[selectedItemsPerPage],
    sort: selectedSort === 0 ? '' : sortOptions[selectedSort].sort,
    dir: sortOptions[selectedSort].dir === 'asc' ? '' : 'desc',
    cruiseLines,
    ...startFilter,
    ...endFilter,
    ...capacityFillter,
    ...durationFilter,
  };
};
