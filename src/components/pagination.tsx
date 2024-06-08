import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from '@radix-ui/react-icons';
import { IconProps } from '@radix-ui/react-icons/dist/types';

import { cn } from '@/lib/utils';

type Props = {
  currentPage: number;
  totalPages: number;
  navigateToFirst: () => void;
  navigateToPrevious: () => void;
  navigateToNext: () => void;
  navigateToLast: () => void;
};

export default function Pagination({
  currentPage,
  totalPages,
  navigateToFirst,
  navigateToLast,
  navigateToNext,
  navigateToPrevious,
}: Props) {
  return (
    <div className='inline-flex flex-wrap justify-center gap-1'>
      <IconButton
        Icon={DoubleArrowLeftIcon}
        disabled={currentPage === 0}
        onClick={() => navigateToFirst()}
      />

      <IconButton
        Icon={ChevronLeftIcon}
        disabled={currentPage === 0}
        onClick={() => navigateToPrevious()}
      />

      <div className='body-sm lg:body flex items-center px-1 text-center font-semibold leading-none text-slate-500'>
        {`Page ${totalPages == 0 ? 0 : currentPage + 1} of ${totalPages}`}
      </div>

      <IconButton
        Icon={ChevronRightIcon}
        disabled={currentPage === totalPages - 1}
        onClick={() => navigateToNext()}
      />

      <IconButton
        Icon={DoubleArrowRightIcon}
        disabled={currentPage === totalPages - 1}
        onClick={() => navigateToLast()}
      />
    </div>
  );
}

function IconButton({
  Icon,
  disabled,
  onClick,
}: {
  Icon: React.ForwardRefExoticComponent<
    IconProps & React.RefAttributes<SVGSVGElement>
  >;
  disabled: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={cn(
        'group flex h-6 max-h-6 w-6 items-center justify-center rounded-full transition-colors',
        {
          'hover:bg-primary/40 hover:text-white': !disabled,
          'text-gray-400': disabled,
        },
      )}
    >
      <Icon className='h-3 w-3' />
    </button>
  );
}
