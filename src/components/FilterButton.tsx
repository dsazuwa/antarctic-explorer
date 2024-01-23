import clsx from 'clsx';

import Button from './Button';

function FilterButton({ disabled }: { disabled: boolean }) {
  return (
    <Button
      rippleColor='bg-sky-400'
      className={clsx('relative overflow-hidden p-2 lg:font-semibold', {
        'bg-gray-200 text-gray-400': disabled,
        'rounded-lg border border-solid border-sky-400 text-sky-400 shadow-sm hover:border-sky-500 hover:shadow-sm':
          !disabled,
      })}
    >
      Clear all filters
    </Button>
  );
}

export default FilterButton;

// source for createRipple: https://css-tricks.com/how-to-recreate-the-ripple-effect-of-material-design-buttons/
