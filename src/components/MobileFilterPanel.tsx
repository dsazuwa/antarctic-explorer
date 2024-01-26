import ClearFilters from './ClearFilters';

function MobileFilterPanel() {
  const disabled = false;

  return (
    <div className='flex flex-row justify-between py-2 text-xxs font-semibold sm:text-xs lg:hidden'>
      <ClearFilters disabled={disabled} />
    </div>
  );
}

export default MobileFilterPanel;
