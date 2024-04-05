import HeaderSelect from '@/components/common/HeaderSelect';
import HeaderSummary from '@/components/common/HeaderSummary';
import { departureSortOptions } from '@/lib/constants';

type Props = {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  selectedSort: number;
  setSortOption: (i: number) => void;
};

export default function DeparturesHeader({
  currentPage,
  itemsPerPage,
  totalItems,
  selectedSort,
  setSortOption,
}: Props) {
  return (
    <div className='flex flex-row items-center justify-between'>
      <HeaderSummary
        itemType='departures'
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        totalItems={totalItems}
      />

      <HeaderSelect
        sortOptions={departureSortOptions}
        selectedSort={selectedSort}
        setSortOption={setSortOption}
      />
    </div>
  );
}
