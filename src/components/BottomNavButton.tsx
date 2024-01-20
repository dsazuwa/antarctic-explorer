import clsx from 'clsx';
import { ReactNode } from 'react';

type ButtonProps = {
  children: ReactNode;
  disabled: boolean;
  onClick?: () => void;
};

function BottomNavButton({ children, disabled, onClick }: ButtonProps) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={clsx(
        'group flex h-8 max-h-8 w-8 items-center justify-center rounded-full',
        { 'hover:bg-gray-500': !disabled, 'bg-white': disabled },
      )}
    >
      <i
        className={clsx('flex items-center justify-center fill-current', {
          'text-black hover:text-white group-hover:text-white': !disabled,
          'text-gray-400': disabled,
        })}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 24 24'
          data-testid='icon-selector'
          height='14'
        >
          <path fill='none' d='M0 0h24v24H0z'></path>
          {children}
        </svg>
      </i>
    </button>
  );
}

export default BottomNavButton;
