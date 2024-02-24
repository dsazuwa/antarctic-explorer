import Pagination from '@/components/common/Pagination';
import PerPageSelector from '@/components/common/PerPageSelector';
import { departuresPerPageOptions } from '@/lib/constants';
import {
  navigateToFirstDeparture,
  navigateToLastDeparture,
  navigateToNextDeparture,
  navigateToPreviousDeparture,
  setDeparturesPerPage,
  useAppDispatch,
  useAppSelector,
} from '@/store';

export default function PaginationControls() {
  const dispatch = useAppDispatch();
  const {
    departures: { currentPage, totalPages },
    selectedItemsPerPage,
  } = useAppSelector((s) => s.departureState);

  return (
    <div className='flex flex-col-reverse items-center py-4 text-xs sm:grid sm:grid-cols-3'>
      <PerPageSelector
        options={departuresPerPageOptions}
        itemsPerPage={selectedItemsPerPage}
        setItemsPerPage={(i) => dispatch(setDeparturesPerPage(i))}
      />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        navigateToFirst={() => dispatch(navigateToFirstDeparture())}
        navigateToPrevious={() => dispatch(navigateToPreviousDeparture())}
        navigateToNext={() => dispatch(navigateToNextDeparture())}
        navigateToLast={() => dispatch(navigateToLastDeparture())}
      />
    </div>
  );
}
