'use client';

import { useRouter, useSearchParams } from 'next/navigation';

import Pagination from '@/components/pagination';
import PerPageSelector from '@/components/per-page-selector';
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
    <div className='mt-auto flex w-full flex-col-reverse items-center justify-between gap-4 sm:flex-row'>
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
        navigateTo={(page: number) =>
          handleClick('page', Math.min(Math.max(1, page), totalPages))
        }
        navigateToPrevious={() =>
          handleClick('page', Math.max(1, currentPage - 1))
        }
        navigateToNext={() =>
          handleClick('page', Math.min(currentPage + 1, totalPages))
        }
      />
    </div>
  );
}
