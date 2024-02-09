import { CalendarIcon } from '@radix-ui/react-icons';
import { format, formatDate } from 'date-fns';
import { useState } from 'react';
import { DateRange } from 'react-day-picker';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { filterExpeditions, useAppDispatch } from '@/store';

export default function DatePicker({
  className,
}: React.HTMLAttributes<HTMLDivElement>) {
  const dispatch = useAppDispatch();
  const [date, setDate] = useState<DateRange | undefined>(undefined);

  const handleSelectDate = (range?: DateRange) => {
    setDate({ from: range?.from, to: range?.to });

    dispatch(
      filterExpeditions({
        filterType: 'startDate',
        value:
          range && range.from
            ? encodeURIComponent(formatDate(range.from, 'yyyy-MM-dd'))
            : undefined,
      }),
    );

    dispatch(
      filterExpeditions({
        filterType: 'endDate',
        value:
          range && range.to
            ? encodeURIComponent(formatDate(range.to, 'yyyy-MM-dd'))
            : undefined,
      }),
    );
  };

  return (
    <div className={cn('grid gap-2', className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant='outline'
            className={cn(
              'w-full justify-start text-left font-normal',
              !date && 'text-muted-foreground',
            )}
          >
            <CalendarIcon className='mr-2 h-4 w-4' />

            {date?.from ? (
              date.to ? (
                `${format(date.from, 'LLL dd, y')} - ${format(date.to, 'LLL dd, y')}`
              ) : (
                format(date.from, 'LLL dd, y')
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>

        <PopoverContent className='w-auto p-0' align='start'>
          <Calendar
            initialFocus
            mode='range'
            defaultMonth={date?.from}
            selected={date}
            onSelect={handleSelectDate}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
