import { useRouter } from 'next/router';

import SortSelect from '@/components/common/SortSelect';
import HeaderSummary from '@/components/common/HeaderSummary';
import { sortOptions } from '@/lib/constants';
import { getSortParam, updateQueryParam } from '@/lib/param.utils';
import { useExpeditionsStore } from '@/store/expeditions';

export default function PaginationHeader() {
  const router = useRouter();

  const { currentPage, totalItems, itemsPerPage } = useExpeditionsStore(
    (state) => state.expeditions,
  );

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
        selectedSort={getSortParam(router.query)}
        setSortOption={(i: number) =>
          updateQueryParam(router, { param: 'sort', value: i })
        }
      />
    </div>
  );
}
