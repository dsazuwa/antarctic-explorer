import Pagination from '@/components/common/Pagination';
import PerPageSelector from '@/components/common/PerPageSelector';
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
    <div className='flex flex-col-reverse items-center py-4 text-xs sm:grid sm:grid-cols-3'>
      <PerPageSelector
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
