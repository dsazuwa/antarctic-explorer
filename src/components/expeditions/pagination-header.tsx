'use client';

import { useRouter, useSearchParams } from 'next/navigation';

import HeaderSummary from '@/components/header-summary';
import SortSelector from '@/components/sort-selector';
import { sortOptions } from '@/lib/constants';
import { getSortParam, updateQueryParam } from '@/lib/param.utils';

type Props = { page: number; size: number; totalItems: number };

export default function PaginationHeader({ page, size, totalItems }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  return (
    <div className='flex flex-col-reverse gap-6 sm:flex-row sm:flex-wrap-reverse sm:items-center sm:justify-between'>
      <HeaderSummary
        page={page}
        size={size}
        totalItems={totalItems}
        itemType='expeditions'
      />

      <SortSelector
        sortOptions={sortOptions}
        selectedSort={getSortParam(
          searchParams.get('sort'),
          searchParams.get('order'),
        )}
        setSortOption={(i: number) =>
          updateQueryParam(router, searchParams, { param: 'sort', value: i })
        }
      />
    </div>
  );
}
