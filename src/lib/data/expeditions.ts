import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { cookies } from 'next/headers';

import { getDateParam, getEnumParam, getNumericalParam } from '../param.utils';
import { ExpeditionsResponse } from '../type';

export const getExpeditions = async (searchParams: URLSearchParams) => {
  const {
    page,
    size,
    sort,
    order,
    startDate,
    endDate,
    minDuration,
    maxDuration,
    minCapacity,
    maxCapacity,
    cruiseLines,
  } = getQueryParams(searchParams);

  const cookieStore = cookies();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          cookieStore.set({ name, value, ...options });
        },
        remove(name: string, options: CookieOptions) {
          cookieStore.set({ name, value: '', ...options });
        },
      },
    },
  );

  const { data } = await supabase.schema('antarctic').rpc('get_expeditions', {
    p_start_date: startDate,
    p_end_date: endDate,
    p_cruise_lines: cruiseLines,
    p_min_capacity: minCapacity,
    p_max_capacity: maxCapacity,
    p_min_duration: minDuration,
    p_max_duration: maxDuration,
    p_page: page,
    p_size: size,
    p_sort: sort,
    p_order: order,
  });

  const { totalItems, expeditions } = data[0];

  return {
    expeditions,
    page,
    totalPages: Math.ceil(totalItems / size),
    size,
    totalItems,
  } as ExpeditionsResponse;
};

const getQueryParams = (searchParams: URLSearchParams) => {
  const queryParams = [
    'page',
    'size',
    'sort',
    'order',
    'startDate',
    'endDate',
    'duration.min',
    'duration.max',
    'capacity.min',
    'capacity.max',
    'cruiseLines',
  ].map((param) => searchParams.get(param));

  const page = getNumericalParam(queryParams[0], 1);
  const size = getNumericalParam(queryParams[1], 6);
  const sort = getEnumParam(
    queryParams[2],
    ['name', 'cruiseLine', 'startDate', 'startingPrice'],
    'startDate',
  );
  const order = getEnumParam(queryParams[3], ['asc', 'desc'], 'asc');

  const startDate = getDateParam(queryParams[4]);
  const endDate = getDateParam(queryParams[5]);

  const minDuration = getNumericalParam(queryParams[6], 0);
  const maxDuration = getNumericalParam(queryParams[7], 2147483647);

  const minCapacity = getNumericalParam(queryParams[8], 0);
  const maxCapacity = getNumericalParam(queryParams[9], 2147483647);

  const cruiseLines =
    queryParams[10] === null ? [] : queryParams[10].split(',');

  return {
    page,
    size,
    sort,
    order,
    startDate,
    endDate,
    minDuration,
    maxDuration,
    minCapacity,
    maxCapacity,
    cruiseLines,
  };
};
