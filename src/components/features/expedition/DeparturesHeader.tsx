import HeaderSelect from '@/components/common/HeaderSelect';
import HeaderSummary from '@/components/common/HeaderSummary';
import { departureSortOptions } from '@/lib/constants';
import { useDeparturesStore } from '@/store/departures';

export default function DeparturesHeader() {
  const { currentPage, totalItems, selectedSort, selectedSize, setSort } =
    useDeparturesStore();

  return (
    <div className='flex flex-row items-center justify-between'>
      <HeaderSummary
        itemType='departures'
        currentPage={currentPage}
        itemsPerPage={selectedSize}
        totalItems={totalItems}
      />

      <HeaderSelect
        sortOptions={departureSortOptions}
        selectedSort={selectedSort}
        setSortOption={setSort}
      />
    </div>
  );
}
