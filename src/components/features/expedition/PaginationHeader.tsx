import HeaderSelect from '@/components/common/HeaderSelect';
import HeaderSummary from '@/components/common/HeaderSummary';
import { departureSortOption } from '@/lib/constants';
import { setDepartureSort, useAppDispatch, useAppSelector } from '@/store';

export default function PaginationHeader() {
  const dispatch = useAppDispatch();
  const {
    departures: { currentPage, itemsPerPage, totalItems },
    selectedSort,
  } = useAppSelector((s) => s.departureState);

  return (
    <div className='flex flex-row items-center justify-between'>
      <HeaderSummary
        itemType='departures'
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        totalItems={totalItems}
      />

      <HeaderSelect
        sortOptions={departureSortOption}
        selectedSort={selectedSort}
        setSortOption={(i: number) => dispatch(setDepartureSort(i))}
      />
    </div>
  );
}
