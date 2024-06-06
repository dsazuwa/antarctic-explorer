'use client';

import { useRouter, useSearchParams } from 'next/navigation';

import HeaderSummary from '@/components/HeaderSummary';
import SortSelect from '@/components/SortSelect';
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
    <div className='inline-flex min-h-10 flex-wrap items-center justify-between gap-2 sm:text-xs'>
      <HeaderSummary
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        totalItems={totalItems}
        itemType='expeditions'
      />

      <SortSelect
        sortOptions={sortOptions}
        selectedSort={getSortParam(searchParams.get('sort'))}
        setSortOption={(i: number) =>
          updateQueryParam(router, searchParams, { param: 'sort', value: i })
        }
      />
    </div>
  );
}
