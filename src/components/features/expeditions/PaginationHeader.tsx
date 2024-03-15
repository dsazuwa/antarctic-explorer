import { useRouter } from 'next/router';

import HeaderSelect from '@/components/common/HeaderSelect';
import HeaderSummary from '@/components/common/HeaderSummary';
import { sortOptions } from '@/lib/constants';
import { getNumericalParam, updateQueryParam } from '@/lib/param.utils';
import { useAppSelector } from '@/store';

export default function PaginationHeader() {
  const router = useRouter();
  const sortOption = getNumericalParam(router.query.sort, 0);

  const { currentPage, totalItems, itemsPerPage } = useAppSelector(
    (s) => s.expeditionState.expeditions,
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
        selectedSort={Math.min(Math.max(sortOption, 0), sortOptions.length - 1)}
        setSortOption={(i: number) => updateQueryParam(router, 'sort', i)}
      />
    </div>
  );
}
