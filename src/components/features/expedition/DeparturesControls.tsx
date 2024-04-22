import Pagination from '@/components/common/Pagination';
import PerPageSelector from '@/components/common/PerPageSelector';
import { departuresPerPageOptions } from '@/lib/constants';
import { useDeparturesStore } from '@/store/departures';

export default function DeparturesControls() {
  const {
    currentPage,
    selectedSize,
    totalPages,
    setSize,
    navigateToFirst,
    navigateToPrevious,
    navigateToNext,
    navigateToLast,
  } = useDeparturesStore();

  return (
    <div className='flex flex-col-reverse items-center py-4 text-xs sm:grid sm:grid-cols-3'>
      <PerPageSelector
        options={departuresPerPageOptions}
        itemsPerPage={selectedSize}
        setItemsPerPage={setSize}
      />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        navigateToFirst={navigateToFirst}
        navigateToPrevious={navigateToPrevious}
        navigateToNext={navigateToNext}
        navigateToLast={navigateToLast}
      />
    </div>
  );
}
