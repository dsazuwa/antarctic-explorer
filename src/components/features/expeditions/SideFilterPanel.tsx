import ClearFilterButton from './ClearFilterButton';
import FilterPanel from './FilterPanel';

function SideFilterPanel() {
  return (
    <div id='side-panel' className='col-span-1 hidden h-full text-xxs lg:block'>
      <div className='flex w-full justify-end p-2'>
        <ClearFilterButton />
      </div>

      <FilterPanel />
    </div>
  );
}

export default SideFilterPanel;
