'use client';

import { useRouter, useSearchParams } from 'next/navigation';

import Pagination from '@/components/Pagination';
import PerPageSelector from '@/components/PerPageSelector';
import { itemsPerPageOptions } from '@/lib/constants';
import { updateQueryParam } from '@/lib/param.utils';

type Props = { itemsPerPage: number; currentPage: number; totalPages: number };

export default function PaginationControls({
  currentPage,
  totalPages,
  itemsPerPage,
}: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleClick = (param: 'page' | 'itemsPerPage', value: number) => {
    updateQueryParam(router, searchParams, { param, value });
  };

  return (
    <div className='mt-auto flex w-full flex-col-reverse items-center gap-2 text-xs sm:grid sm:h-10 sm:grid-cols-3'>
      <PerPageSelector
        options={itemsPerPageOptions}
        itemsPerPage={
          itemsPerPageOptions.findIndex((x) => x === itemsPerPage) || 0
        }
        setItemsPerPage={(i) => handleClick('itemsPerPage', i)}
      />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        navigateToFirst={() => handleClick('page', 0)}
        navigateToPrevious={() =>
          handleClick('page', Math.max(0, currentPage - 1))
        }
        navigateToNext={() =>
          handleClick('page', Math.min(currentPage + 1, totalPages - 1))
        }
        navigateToLast={() => handleClick('page', Math.max(totalPages - 1, 0))}
      />
    </div>
  );
}
