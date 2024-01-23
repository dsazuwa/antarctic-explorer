import clsx from 'clsx';

function FilterButton({ disabled }: { disabled: boolean }) {
  return (
    <button
      disabled={disabled}
      className={clsx('relative overflow-hidden p-2 lg:font-semibold', {
        'bg-gray-200 text-gray-400': disabled,
        'rounded-lg bg-blue_5 text-white shadow-sm hover:bg-blue_4 hover:shadow-sm':
          !disabled,
      })}
    >
      Clear all filters
    </button>
  );
}

export default FilterButton;
