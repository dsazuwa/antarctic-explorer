import ClearFilterButton from './ClearFilterButton';
import FilterPanel from './FilterPanel';

function SideFilterPanel() {
  return (
    <div
      id='side-panel'
      className='col-span-1 hidden h-full text-xxs lg:flex lg:flex-col lg:gap-4'
    >
      <div className='flex w-full justify-end'>
        <ClearFilterButton />
      </div>

      <FilterPanel />
    </div>
  );
}

export default SideFilterPanel;
