'use client';

import { CalendarIcon } from '@radix-ui/react-icons';
import { format } from 'date-fns';

import { Button } from '@/components/ui/button';
import { PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';

type DatePopoverButtonProps = {
  id: string;
  label: string;
  date?: Date;
  handleClick: () => void;
};

export default function DatePopoverButton({
  id,
  label,
  date,
  handleClick,
}: DatePopoverButtonProps) {
  return (
    <PopoverTrigger asChild>
      <Button
        id={id}
        variant={'outline'}
        className={cn('w-full font-normal', !date && 'text-muted-foreground')}
        onClick={handleClick}
      >
        <div className='flex w-full flex-row items-end'>
          <CalendarIcon className='mr-2 h-4 w-4 text-primary' />

          {date ? format(date, 'LLL dd, y') : label}
        </div>
      </Button>
    </PopoverTrigger>
  );
}
