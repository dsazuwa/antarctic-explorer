import { useRouter } from 'next/router';

import HeaderSelect from '@/components/common/HeaderSelect';
import HeaderSummary from '@/components/common/HeaderSummary';
import { sortOptions } from '@/lib/constants';
import { getSortParam, updateQueryParam } from '@/lib/param.utils';

type Props = {
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
};

export default function PaginationHeader({
  currentPage,
  totalItems,
  itemsPerPage,
}: Props) {
  const router = useRouter();

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
