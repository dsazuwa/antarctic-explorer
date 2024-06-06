import { CalendarIcon } from '@radix-ui/react-icons';

import { Button } from '@/components/ui/button';
import { cn, formatDate } from '@/lib/utils';

type Props = {
  startDate: Date | null;
  endDate: Date | null;
  handleClick?: () => void;
};

export default function DateLabel({ startDate, endDate, handleClick }: Props) {
  return (
    <Button
      variant='outline'
      className='w-full rounded-sm'
      onClick={handleClick}
    >
      <CalendarIcon className='mr-2 h-4 w-4' />

      <span
        className={cn(
          'text-xs leading-4 lg:text-sm',
          !(startDate && endDate) && 'text-muted-foreground',
        )}
      >
        {startDate
          ? endDate
            ? `${formatDate(startDate, 'LLL dd, y')} - ${formatDate(endDate, 'LLL dd, y')}`
            : formatDate(startDate, 'LLL dd, y')
          : 'Pick a date'}
      </span>
    </Button>
  );
}
