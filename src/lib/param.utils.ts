import { isValid, parseISO } from 'date-fns';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { ReadonlyURLSearchParams } from 'next/navigation';

import {
  capacityOptions,
  defaultCapacity,
  defaultDuration,
  durationOptions,
  expeditionsDefault,
  sortOptions,
} from '@/lib/constants';
import { ExpeditionsParams } from '@/lib/type';
import { BasicFilterOption, RangedFilterOption } from './type';
import { formatDate } from './utils';

export const getEnumParam = (
  param: string | string[] | undefined | null,
  values: string[],
  defaultValue: string,
): string => {
  if (param === undefined || param === null) return defaultValue;

  const paramArray = Array.isArray(param) ? param : [param];
  const validParam = paramArray.find((p) => values.includes(p));

  return validParam || defaultValue;
};

export const getNumericalParam = (
  param: string | string[] | undefined | null,
  defaultValue: number,
) => {
  return typeof param === 'string' &&
    !isNaN(parseInt(param, 10)) &&
    parseInt(param, 10) >= 0
    ? parseInt(param, 10)
    : defaultValue;
};

export const getCruiseLinesParam = (param: string | string[] | undefined) => {
  if (Array.isArray(param)) return param;
  else if (typeof param === 'string') return [param];
  else return [];
};

export const toggleCruiseLine = (
  router: AppRouterInstance,
  searchParams: ReadonlyURLSearchParams,
  selectedCruiseLine: string,
) => {
  const selectedCruiseLines = searchParams.getAll('cruiseLines');

  const value = selectedCruiseLines.includes(selectedCruiseLine)
    ? selectedCruiseLines.filter((x) => x !== selectedCruiseLine)
    : [...selectedCruiseLines, selectedCruiseLine];

  updateQueryParam(router, searchParams, { param: 'cruiseLines', value });
};

export const getDateParam = (param: string | null) => {
  if (typeof param !== 'string') return null;

  const dateFormatRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateFormatRegex.test(param)) return null;

  const parsedDate = parseISO(param);
  return isValid(parsedDate) ? parsedDate : null;
};

export const getParamInRange = (
  param: string | null,
  defaultValue: number,
  min: number,
  max: number,
) => Math.min(Math.max(getNumericalParam(param, defaultValue), min), max);

export const getCapacityParam = (capacity: string | null) =>
  getParamInRange(capacity, defaultCapacity, 0, capacityOptions.length - 1);

export const getDurationParam = (duration: string | null) =>
  getParamInRange(duration, defaultDuration, 0, durationOptions.length - 1);

export const getSortParam = (sort: string | null) =>
  getParamInRange(sort, 0, 0, sortOptions.length - 1);

const getParamValue = (
  params: { [key: string]: string | string[] | undefined },
  param: string,
) => {
  const value = params[param];
  return typeof value === 'string' ? value : null;
};

export const getExpeditionsParams = (params: {
  [key: string]: string | string[] | undefined;
}): ExpeditionsParams => {
  const page = getNumericalParam(params.page, 1);
  const size = getNumericalParam(params.size, 6);

  const sort = getSortParam(getParamValue(params, 'sort'));
  const cruiseLines = getCruiseLinesParam(params.cruiseLines).join(',');

  const startDate = getDateParam(getParamValue(params, 'startDate'));
  const endDate = getDateParam(getParamValue(params, 'endDate'));

  const capacity = getCapacityParam(getParamValue(params, 'capacity'));
  const duration = getDurationParam(getParamValue(params, 'duration'));

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
    size,
    sort: sortOptions[sort].sort,
    order: sortOptions[sort].order,
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
  router: AppRouterInstance,
  searchParams: ReadonlyURLSearchParams,
  payload:
    | { param: 'cruiseLines'; value: string[] }
    | {
        param: 'page' | 'size' | 'sort' | 'capacity' | 'duration';
        value: number;
      },
) => {
  const params = new URLSearchParams(searchParams.toString());
  const { param, value } = payload;

  switch (param) {
    case 'cruiseLines':
      params.delete('page');
      params.delete(param);
      if (value.length > 0) value.forEach((v) => params.append(param, v));
      break;

    case 'capacity':
      params.delete('page');
      if (value === defaultCapacity) params.delete(param);
      else params.set(param, value.toString());
      break;

    case 'duration':
      params.delete('page');
      if (value === defaultDuration) params.delete(param);
      else params.set(param, value.toString());
      break;

    case 'size':
      params.delete('page');
      if (value === expeditionsDefault.size) params.delete(param);
      else params.set(param, value.toString());
      break;

    case 'sort':
      params.delete('page');
      if (value === 0) params.delete(param);
      else params.set(param, value.toString());
      break;

    default:
      if (value === 1) params.delete(param);
      else params.set(param, value.toString());
      break;
  }

  router.push(`/?${params.toString()}`);
};

export const updateDateParam = (
  router: AppRouterInstance,
  searchParams: ReadonlyURLSearchParams,
  from: Date | undefined,
  to: Date | undefined,
) => {
  const params = new URLSearchParams(searchParams.toString());

  params.delete('page');

  if (from !== undefined)
    params.set('startDate', formatDate(from, 'yyyy-MM-dd'));
  else params.delete('startDate');

  if (to !== undefined) params.set('endDate', formatDate(to, 'yyyy-MM-dd'));
  else params.delete('endDate');

  router.push(`/?${params.toString()}`, { scroll: true });
};
