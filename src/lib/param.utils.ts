/* eslint-disable @typescript-eslint/no-unused-vars */
import { isValid, parseISO } from 'date-fns';
import { NextRouter } from 'next/router';
import { ParsedUrlQuery, ParsedUrlQueryInput } from 'querystring';

import {
  capacityOptions,
  durationOptions,
  itemsPerPageOptions,
  sortOptions,
} from '@/lib/constants';
import { ExpeditionsParams } from '@/lib/type';
import { BasicFilterOption, RangedFilterOption } from './type';
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
  if (Array.isArray(param)) return param;
  else if (typeof param === 'string') return [param];
  else return [];
};

export const toggleCruiseLine = (
  router: NextRouter,
  selectedCruiseLine: string,
) => {
  const selectedCruiseLines = getCruiseLinesParam(router.query.cruiseLines);

  const value = selectedCruiseLines.includes(selectedCruiseLine)
    ? selectedCruiseLines.filter((x) => x !== selectedCruiseLine)
    : [...selectedCruiseLines, selectedCruiseLine];

  updateQueryParam(router, { param: 'cruiseLines', value });
};

export const getDateParam = (param: string | string[] | undefined) => {
  if (typeof param !== 'string') return null;

  const dateFormatRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateFormatRegex.test(param)) return null;

  const parsedDate = parseISO(param);
  return isValid(parsedDate) ? parsedDate : null;
};

export const getParamInRange = (
  param: string | string[] | undefined,
  defaultValue: number,
  min: number,
  max: number,
) => Math.min(Math.max(getNumericalParam(param, defaultValue), min), max);

export const getSortParam = (query: ParsedUrlQuery) =>
  getParamInRange(query.sort, 0, 0, sortOptions.length - 1);

export const getCapacityParam = (query: ParsedUrlQuery) =>
  getParamInRange(
    query.capacity,
    capacityOptions.length - 1,
    0,
    capacityOptions.length - 1,
  );

export const getDurationParam = (query: ParsedUrlQuery) =>
  getParamInRange(
    query.duration,
    durationOptions.length - 1,
    0,
    durationOptions.length - 1,
  );

export const getExpeditionsParams = (
  query: ParsedUrlQuery,
): ExpeditionsParams => {
  const page = getNumericalParam(query.page, 0);
  const itemsPerPage = getNumericalParam(query.itemsPerPage, 0);

  const sort = getSortParam(query);

  const cruiseLines = getCruiseLinesParam(query.cruiseLines).join(',');

  const startDate = getDateParam(query.startDate);
  const endDate = getDateParam(query.endDate);

  const capacity = getCapacityParam(query);
  const duration = getDurationParam(query);

  const capacityFilter = buildRangeFilter(
    capacityOptions[capacity],
    'capacity',
  );

  const durationFilter = buildRangeFilter(
    durationOptions[duration],
    'duration',
  );

  const startFilter =
    startDate !== null
      ? { startDate: encodeURIComponent(formatDate(startDate, 'yyyy-MM-dd')) }
      : {};

  const endFilter =
    endDate !== null
      ? { endDate: encodeURIComponent(formatDate(endDate, 'yyyy-MM-dd')) }
      : {};

  return {
    page,
    size: itemsPerPageOptions[itemsPerPage],
    sort: sortOptions[sort].sort,
    dir: sortOptions[sort].dir,
    ...(cruiseLines.length === 0 ? {} : { cruiseLines }),
    ...startFilter,
    ...endFilter,
    ...capacityFilter,
    ...durationFilter,
  };
};

const buildRangeFilter = (
  option: BasicFilterOption | RangedFilterOption,
  field: 'capacity' | 'duration',
) => {
  const filter: { [key: string]: number } = {};

  if ('min' in option) filter[`${field}.min`] = option.min;
  if ('max' in option) filter[`${field}.max`] = option.max;

  return filter;
};

export const updateQueryParam = (
  router: NextRouter,
  payload:
    | { param: 'cruiseLines'; value: string[] }
    | {
        param: 'page' | 'itemsPerPage' | 'sort' | 'capacity' | 'duration';
        value: number;
      },
) => {
  const { param, value } = payload;
  const { [param]: _, ...remainingParams } = router.query;

  let updatedParam;

  switch (param) {
    case 'cruiseLines':
      updatedParam = value.length === 0 ? {} : { page: 0, [param]: value };
      break;

    case 'capacity':
      updatedParam =
        value === capacityOptions.length - 1 ? {} : { page: 0, [param]: value };
      break;

    case 'duration':
      updatedParam =
        value === durationOptions.length - 1 ? {} : { page: 0, [param]: value };
      break;

    case 'itemsPerPage':
      updatedParam = { page: 0, [param]: value };
      break;

    default:
      updatedParam = value === 0 ? {} : { [param]: value };
      break;
  }

  updateRouterQuery(router, { ...remainingParams, ...updatedParam });
};

export const updateDateParam = (
  router: NextRouter,
  from: Date | undefined,
  to: Date | undefined,
) => {
  const { startDate: _, endDate: __, ...remainingParams } = router.query;

  const updatedParams: Record<string, string> = {};

  if (from !== undefined)
    updatedParams['startDate'] = formatDate(from, 'yyyy-MM-dd');

  if (to !== undefined) updatedParams['endDate'] = formatDate(to, 'yyyy-MM-dd');

  const query =
    from === undefined && to === undefined
      ? { ...remainingParams }
      : { ...remainingParams, page: 0, ...updatedParams };

  updateRouterQuery(router, query);
};

export const updateRouterQuery = (
  router: NextRouter,
  query: string | ParsedUrlQueryInput | null | undefined,
) => {
  const { page, itemsPerPage, sort, ...rest } = query as ParsedUrlQueryInput;

  const updatedQuery = {
    ...(page && { page }),
    ...(itemsPerPage && { itemsPerPage }),
    ...(sort && { sort }),
    ...rest,
  };

  router.push({ pathname: router.pathname, query: updatedQuery });
};
