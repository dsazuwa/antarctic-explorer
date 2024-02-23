import {
  navigateToFirst,
  navigateToLast,
  navigateToNext,
  navigateToPrevious,
  setItemsPerPage,
  useAppDispatch,
  useAppSelector,
} from '@/store';
import Pagination from './Pagination';
import PerPageSelector from './PerPageSelector';

export default function PaginationControls() {
  const dispatch = useAppDispatch();
  const {
    expeditions: { currentPage, totalPages },
    selectedItemsPerPage,
  } = useAppSelector((s) => s.state);

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
