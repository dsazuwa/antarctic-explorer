import { ChangeEventHandler } from 'react';

import { BasicFilterOption, FilterState } from '@/type';
import ClearFilters from './ClearFilters';
import FilterPanel from './FilterPanel';

type Props = {
  cruiseLineOptions: BasicFilterOption;
  filters: FilterState;
  filterByCruiseLine: ChangeEventHandler<HTMLInputElement>;
  filterByDuration: ChangeEventHandler<HTMLInputElement>;
};

function SideFilterPanel({
  cruiseLineOptions,
  filters,
  filterByCruiseLine,
  filterByDuration,
}: Props) {
  const disabled = true;

  return (
    <div id='side-panel' className='hidden w-[300px] p-2 text-xxs lg:inline'>
      <div className='flex w-full justify-end p-2'>
        <ClearFilters disabled={disabled} />
      </div>

      <FilterPanel
        cruiseLineOptions={cruiseLineOptions}
        filters={filters}
        filterByCruiseLine={filterByCruiseLine}
        filterByDuration={filterByDuration}
      />
    </div>
  );
}

export default SideFilterPanel;
