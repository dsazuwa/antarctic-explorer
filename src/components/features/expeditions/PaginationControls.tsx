import Pagination from '@/components/common/Pagination';
import PerPageSelector from '@/components/common/PerPageSelector';
import { itemsPerPageOptions } from '@/lib/constants';
import {
  navigateToFirst,
  navigateToLast,
  navigateToNext,
  navigateToPrevious,
  setItemsPerPage,
  useAppDispatch,
  useAppSelector,
} from '@/store';

export default function PaginationControls() {
  const dispatch = useAppDispatch();
  const {
    expeditions: { currentPage, totalPages },
    selectedItemsPerPage,
  } = useAppSelector((s) => s.expeditionState);

  return (
    <div className='mt-auto flex h-20 w-full flex-col-reverse items-center gap-2 text-xs sm:grid sm:h-10 sm:grid-cols-3 md:gap-0'>
      <PerPageSelector
        options={itemsPerPageOptions}
        itemsPerPage={selectedItemsPerPage}
        setItemsPerPage={(i) => dispatch(setItemsPerPage(i))}
      />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        navigateToFirst={() => dispatch(navigateToFirst())}
        navigateToPrevious={() => dispatch(navigateToPrevious())}
        navigateToNext={() => dispatch(navigateToNext())}
        navigateToLast={() => dispatch(navigateToLast())}
      />
    </div>
  );
}
