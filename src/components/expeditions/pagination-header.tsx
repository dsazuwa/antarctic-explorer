'use client';

import { useRouter, useSearchParams } from 'next/navigation';

import HeaderSummary from '@/components/header-summary';
import SortSelector from '@/components/sort-selector';
import { sortOptions } from '@/lib/constants';
import { getSortParam, updateQueryParam } from '@/lib/param.utils';

type Props = { currentPage: number; itemsPerPage: number; totalItems: number };

export default function PaginationHeader({
  currentPage,
  itemsPerPage,
  totalItems,
}: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  return (
    <div className='flex flex-col-reverse gap-6 sm:flex-row sm:flex-wrap-reverse sm:items-center sm:justify-between'>
      <HeaderSummary
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        totalItems={totalItems}
        itemType='expeditions'
      />

      <SortSelector
        sortOptions={sortOptions}
        selectedSort={getSortParam(searchParams.get('sort'))}
        setSortOption={(i: number) =>
          updateQueryParam(router, searchParams, { param: 'sort', value: i })
        }
      />
    </div>
  );
}
