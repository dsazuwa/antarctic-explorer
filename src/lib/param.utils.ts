/* eslint-disable @typescript-eslint/no-unused-vars */
import { isValid, parseISO } from 'date-fns';
import { NextRouter } from 'next/router';
import { ParsedUrlQuery } from 'querystring';

import {
  capacityOptions,
  durationOptions,
  itemsPerPageOptions,
  sortOptions,
} from '@/lib/constants';
import { ExpeditionsParams } from '@/lib/type';
import { formatDate } from './utils';

export const getNumericalParam = (
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

export const getExpeditionsParams = (
  query: ParsedUrlQuery,
): ExpeditionsParams => {
  const page = getNumericalParam(query.page, 0);
  const itemsPerPage = getNumericalParam(query.itemsPerPage, 0);

  const sort = Math.min(
    getNumericalParam(query.sort, 0),
    sortOptions.length - 1,
  );

  const cruiseLines = getCruiseLinesParam(query.cruiseLines);
  const startDate = getDateParam(query.startDate);
  const endDate = getDateParam(query.endDate);

  const capacity = Math.min(
    getNumericalParam(query.capacity, capacityOptions.length - 1),
    capacityOptions.length - 1,
  );

  const duration = Math.min(
    getNumericalParam(query.duration, durationOptions.length - 1),
    durationOptions.length - 1,
  );

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

export const updateQueryParam = (
  router: NextRouter,
  param: string,
  value: number,
) => {
  const { [param]: _, ...remainingParams } = router.query;
  const updatedParam = value === 0 ? {} : { [param]: value };

  router.push({
    pathname: router.pathname,
    query: { ...remainingParams, ...updatedParam },
  });
};
