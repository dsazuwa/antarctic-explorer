import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons';

import {
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  Pagination as PaginationUI,
} from '@/components/ui/pagination';
import { cn } from '@/lib/utils';
import { Button, buttonVariants } from './ui/button';

type Props = {
  currentPage: number;
  totalPages: number;
  navigateTo: (page: number) => void;
  navigateToNext: () => void;
  navigateToPrevious: () => void;
};

export default function Pagination({
  currentPage,
  totalPages,
  navigateTo,
  navigateToNext,
  navigateToPrevious,
}: Props) {
  return (
    <PaginationUI className='items-center'>
      <PaginationContent className='flex-wrap justify-center'>
        {currentPage !== 1 && (
          <PaginationItem>
            <PaginationButton
              className='gap-1 pl-2.5'
              onClick={navigateToPrevious}
            >
              <ChevronLeftIcon className='h-4 w-4 shrink-0' />
              <span>Previous</span>
            </PaginationButton>
          </PaginationItem>
        )}

        {currentPage !== 1 && (
          <PaginationButton onClick={() => navigateTo(1)}>{1}</PaginationButton>
        )}

        {currentPage >= 3 && <PaginationEllipsis />}

        <PaginationButton isActive>{currentPage}</PaginationButton>

        {currentPage <= totalPages - 2 && <PaginationEllipsis />}

        {currentPage !== totalPages && (
          <PaginationButton onClick={() => navigateTo(totalPages)}>
            {totalPages}
          </PaginationButton>
        )}

        {currentPage !== totalPages && (
          <PaginationItem>
            <PaginationButton className='gap-1 pl-2.5' onClick={navigateToNext}>
              <span>Next</span>
              <ChevronRightIcon className='h-4 w-4 shrink-0' />
            </PaginationButton>
          </PaginationItem>
        )}
      </PaginationContent>
    </PaginationUI>
  );
}

function PaginationButton({
  isActive,
  children,
  className,
  ...props
}: React.ComponentProps<typeof Button> & { isActive?: boolean }) {
  return (
    <button
      className={cn(
        buttonVariants({ variant: isActive ? 'outline' : 'ghost' }),
        'bg-inherit text-sm lg:text-base',
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
