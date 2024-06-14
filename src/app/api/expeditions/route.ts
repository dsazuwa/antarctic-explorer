import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

import {
  getDateParam,
  getEnumParam,
  getNumericalParam,
} from '@/lib/param.utils';
import { ExpeditionsResponse } from '@/lib/type';

export async function GET(request: NextRequest) {
  const {
    page,
    size,
    sort,
    dir,
    startDate,
    endDate,
    minDuration,
    maxDuration,
    minCapacity,
    maxCapacity,
    cruiseLines,
  } = getQueryParams(request);

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
    p_order: sort,
    p_sort: dir,
  });

  const { totalItems, expeditions } = data[0];

  const response: ExpeditionsResponse = {
    expeditions,
    currentPage: page,
    totalPages: Math.ceil(totalItems / size),
    itemsPerPage: size,
    totalItems,
  };

  return NextResponse.json(response, { status: 200 });
}

const getQueryParams = (request: NextRequest) => {
  const queryParams = [
    'page',
    'size',
    'sort',
    'dir',
    'startDate',
    'endDate',
    'duration.min',
    'duration.max',
    'capacity.min',
    'capacity.max',
  ].map((param) => request.nextUrl.searchParams.get(param));

  const page = getNumericalParam(queryParams[0], 1);
  const size = getNumericalParam(queryParams[1], 6);
  const sort = getEnumParam(
    queryParams[2],
    ['name', 'cruiseLine', 'startDate', 'startingPrice'],
    'startDate',
  );
  const dir = getEnumParam(queryParams[3], ['asc', 'desc'], 'asc');

  const startDate = getDateParam(queryParams[4]);
  const endDate = getDateParam(queryParams[5]);

  const minDuration = getNumericalParam(queryParams[6], 0);
  const maxDuration = getNumericalParam(queryParams[7], 2147483647);

  const minCapacity = getNumericalParam(queryParams[8], 0);
  const maxCapacity = getNumericalParam(queryParams[9], 2147483647);

  const getCruiseLinesParam = request.nextUrl.searchParams.get('cruiseLines');
  const cruiseLines =
    getCruiseLinesParam === null ? [] : getCruiseLinesParam.split(',');

  return {
    page,
    size,
    sort,
    dir,
    startDate,
    endDate,
    minDuration,
    maxDuration,
    minCapacity,
    maxCapacity,
    cruiseLines,
  };
};
