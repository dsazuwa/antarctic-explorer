import { clsx, type ClassValue } from 'clsx';
import { format, isValid, parseISO } from 'date-fns';
import { twMerge } from 'tailwind-merge';

import {
  capacityOptions,
  durationOptions,
  itemsPerPageOptions,
  sortOptions,
} from '@/lib/constants';
import { ExpeditionParams } from '@/lib/type';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
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
  page: number,
  itemsPerPage: number,
  sort: number,
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
    page,
    size: itemsPerPageOptions[itemsPerPage],
    sort: sort === 0 ? '' : sortOptions[sort].sort,
    dir: sortOptions[sort].dir === 'asc' ? '' : 'desc',
    cruiseLines,
    ...startFilter,
    ...endFilter,
    ...capacityFillter,
    ...durationFilter,
  };
};

export const getNumbericalParam = (
  param: string | string[] | undefined,
  defaultValue: number,
) => {
  return typeof param === 'string' && !isNaN(parseInt(param, 10))
    ? parseInt(param, 10)
    : defaultValue;
};

export const getCruiseLinesParam = (param: string | string[] | undefined) => {
  if (Array.isArray(param)) return param.join(',');
  return typeof param === 'string' ? param : '';
};

export const getDateParam = (param: string | string[] | undefined) => {
  if (typeof param !== 'string') return null;

  const dateFormatRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateFormatRegex.test(param)) return null;

  const parsedDate = parseISO(param);
  return isValid(parsedDate) ? parsedDate : null;
};
