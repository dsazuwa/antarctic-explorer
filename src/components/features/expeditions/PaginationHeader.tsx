import { useRouter } from 'next/router';

import HeaderSelect from '@/components/common/HeaderSelect';
import HeaderSummary from '@/components/common/HeaderSummary';
import { sortOptions } from '@/lib/constants';
import { getSortParam, updateQueryParam } from '@/lib/param.utils';
import { useExpeditionsStore } from '@/store';

export default function PaginationHeader() {
  const router = useRouter();

  const { currentPage, totalItems, itemsPerPage } = useExpeditionsStore(
    (state) => state.expeditions,
  );

  return (
    <div className='flex h-10 items-center justify-between sm:text-xs'>
      <HeaderSummary
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        totalItems={totalItems}
        itemType='expeditions'
      />

      <HeaderSelect
        sortOptions={sortOptions}
        selectedSort={getSortParam(router.query)}
        setSortOption={(i: number) =>
          updateQueryParam(router, { param: 'sort', value: i })
        }
      />
    </div>
  );
}
