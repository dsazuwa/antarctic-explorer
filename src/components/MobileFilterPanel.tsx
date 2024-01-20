import clsx from 'clsx';

import FilterIcon from '@/assets/icons/FilterIcon';

function MobileFilterPanel() {
  const disabled = true;

  return (
    <div className='flex flex-row justify-between py-2 text-[8px] font-semibold sm:text-xs lg:hidden'>
      <button className='flex flex-row items-center'>
        <FilterIcon className='mr-1 text-black' />
        <div>Filter</div>
      </button>

      <button
        className={clsx('p-2', {
          'rounded bg-white shadow': !disabled,
          'bg-gray-200 text-gray-400': disabled,
        })}
      >
        Clear all filters
      </button>
    </div>
  );
}

export default MobileFilterPanel;
