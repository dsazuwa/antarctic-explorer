import { setSortOption, useAppDispatch, useAppSelector } from '@/store';
import HeaderSelect from '../../common/HeaderSelect';
import HeaderSummary from '../../common/HeaderSummary';

function SortHeader() {
  const dispatch = useAppDispatch();
  const {
    expeditions: { currentPage, totalItems, itemsPerPage },
    selectedSort,
  } = useAppSelector((s) => s.state);

  return (
    <div className='flex items-center justify-between py-2 sm:py-0 sm:pb-2 sm:text-xs'>
      <HeaderSummary
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        totalItems={totalItems}
        itemType='expeditions'
      />

      <HeaderSelect
        selectedSort={selectedSort}
        setSortOption={(i: number) => dispatch(setSortOption(i))}
      />
    </div>
  );
}

export default SortHeader;
