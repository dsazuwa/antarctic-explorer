import { itemsPerPageOptions } from '@/constants';
import BottomNavButton from './BottomNavButton';

type BottomNavigationProps = {
  currentPage: number;
  totalPages: number;
  selectedOption: number;
  handlePreviousPage: () => void;
  handleNextPage: () => void;
  setItemsPerPage: (index: number) => void;
};

function BottomNavigation({
  currentPage,
  totalPages,
  selectedOption,
  handlePreviousPage,
  handleNextPage,
  setItemsPerPage,
}: BottomNavigationProps) {
  return (
    <div className='flex w-full flex-col items-center space-y-2 p-4 text-xxs sm:relative sm:space-y-0 sm:p-6'>
      <div className='flex flex-row justify-center space-x-2'>
        <BottomNavButton
          disabled={currentPage === 1}
          onClick={handlePreviousPage}
        >
          <path d='M7.828 11H20v2H7.828l5.364 5.364-1.414 1.414L4 12l7.778-7.778 1.414 1.414z'></path>
        </BottomNavButton>

        <div className='flex items-center text-center'>
          {`Page ${currentPage} of ${totalPages}`}
        </div>

        <BottomNavButton
          disabled={currentPage === totalPages}
          onClick={handleNextPage}
        >
          <path d='M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z'></path>
        </BottomNavButton>
      </div>

      <div className='flex flex-row items-center space-x-2 py-1 sm:absolute sm:right-6'>
        <div>Items per page</div>

        <select
          className='select select-bordered select-xs p-1'
          value={selectedOption}
          onChange={(e) => setItemsPerPage(parseInt(e.target.value, 10))}
        >
          {itemsPerPageOptions.map((o, i) => (
            <option key={`option${i}`} value={i}>
              {o}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default BottomNavigation;
