import ClearFilters from './ClearFilters';
import FilterPanel from './FilterPanel';

function SideFilterPanel() {
  return (
    <div id='side-panel' className='hidden w-[300px] px-2 text-xxs lg:inline'>
      <div className='flex w-full justify-end px-2'>
        <ClearFilters />
      </div>

      <FilterPanel />
    </div>
  );
}

export default SideFilterPanel;
