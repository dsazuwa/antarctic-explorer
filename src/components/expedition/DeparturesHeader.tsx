import HeaderSummary from '@/components/HeaderSummary';
import SortSelect from '@/components/SortSelect';
import {
  departureSortOptions,
  departuresPerPageOptions,
} from '@/lib/constants';
import { useDeparturesStore } from '@/store/departures';

export default function DeparturesHeader() {
  const { currentPage, totalItems, selectedSort, selectedSize, setSort } =
    useDeparturesStore();

  return (
    <div className='inline-flex w-full flex-wrap items-center justify-between'>
      <HeaderSummary
        itemType='departures'
        currentPage={currentPage}
        itemsPerPage={departuresPerPageOptions[selectedSize]}
        totalItems={totalItems}
      />

      <SortSelect
        sortOptions={departureSortOptions}
        selectedSort={selectedSort}
        setSortOption={setSort}
      />
    </div>
  );
}
