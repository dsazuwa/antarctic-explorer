import { Dispatch } from 'react';

import Pagination from '@/components/common/Pagination';
import PerPageSelector from '@/components/common/PerPageSelector';
import { departuresPerPageOptions } from '@/lib/constants';
import { DepartureAction } from './Departures';

type Props = {
  selectedItemsPerPage: number;
  currentPage: number;
  totalPages: number;
  dispatch: Dispatch<DepartureAction>;
};

export default function DeparturesControls({
  selectedItemsPerPage,
  currentPage,
  totalPages,
  dispatch,
}: Props) {
  return (
    <div className='flex flex-col-reverse items-center py-4 text-xs sm:grid sm:grid-cols-3'>
      <PerPageSelector
        options={departuresPerPageOptions}
        itemsPerPage={selectedItemsPerPage}
        setItemsPerPage={(i) =>
          dispatch({ type: 'SET_DEPARTURES_PER_PAGE', payload: i })
        }
      />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        navigateToFirst={() =>
          dispatch({ type: 'NAVIGATE_TO_FIRST_DEPARTURE' })
        }
        navigateToPrevious={() =>
          dispatch({ type: 'NAVIGATE_TO_PREVIOUS_DEPARTURE' })
        }
        navigateToNext={() => dispatch({ type: 'NAVIGATE_TO_NEXT_DEPARTURE' })}
        navigateToLast={() => dispatch({ type: 'NAVIGATE_TO_LAST_DEPARTURE' })}
      />
    </div>
  );
}
