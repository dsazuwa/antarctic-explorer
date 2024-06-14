import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

import { getEnumParam, getNumericalParam } from '@/lib/param.utils';
import { DeparturesResponse } from '@/lib/type';

export async function GET(
  request: NextRequest,
  {
    params: { cruiseLine, name },
  }: { params: { cruiseLine: string; name: string } },
) {
  const { page, size, sort, dir } = getQueryParams(request);

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

  const { data } = await supabase
    .schema('antarctic')
    .rpc('get_expedition_departures', {
      p_cruise_line: cruiseLine,
      p_name: name,
      p_page: page,
      p_size: size,
      p_order: sort,
      p_sort: dir,
    });

  const { totalItems, departures } = data[0];

  const response: DeparturesResponse = {
    departures,
    currentPage: page,
    totalPages: Math.ceil(totalItems / size),
    size,
    totalItems,
  };

  return NextResponse.json(response, { status: 200 });
}

const getQueryParams = (request: NextRequest) => {
  const queryParams = ['page', 'size', 'sort', 'dir'].map((param) =>
    request.nextUrl.searchParams.get(param),
  );

  const page = getNumericalParam(queryParams[0], 1);
  const size = getNumericalParam(queryParams[1], 5);
  const sort = getEnumParam(queryParams[2], ['startDate', 'price'], 'price');
  const dir = getEnumParam(queryParams[3], ['asc', 'desc'], 'asc');

  return { page, size, sort, dir };
};
