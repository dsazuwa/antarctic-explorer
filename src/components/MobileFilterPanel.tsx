import FilterIcon from '@/assets/icons/FilterIcon';
import FilterButton from './FilterButton';

function MobileFilterPanel() {
  const disabled = false;

  return (
    <div className='flex flex-row justify-between py-2 text-xxs font-semibold sm:text-xs lg:hidden'>
      <button className='flex flex-row items-center'>
        <FilterIcon className='mr-1 text-black' />
        <div>Filter</div>
      </button>

      <FilterButton disabled={disabled} />
    </div>
  );
}

export default MobileFilterPanel;
