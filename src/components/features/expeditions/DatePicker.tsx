import { CalendarIcon } from '@radix-ui/react-icons';
import { DateRange } from 'react-day-picker';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn, formatDate } from '@/lib/utils';
import { filterExpeditions, useAppDispatch, useAppSelector } from '@/store';

export default function DatePicker({
  className,
}: React.HTMLAttributes<HTMLDivElement>) {
  const dispatch = useAppDispatch();
  const { startDate, endDate } = useAppSelector(
    (s) => s.expeditionState.filters,
  );

  const handleSelectDate = (range?: DateRange) => {
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
              !(startDate && endDate) && 'text-muted-foreground',
            )}
          >
            <CalendarIcon className='mr-2 h-4 w-4' />

            {startDate ? (
              endDate ? (
                `${formatDate(startDate, 'LLL dd, y')} - ${formatDate(endDate, 'LLL dd, y')}`
              ) : (
                formatDate(startDate, 'LLL dd, y')
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
            defaultMonth={startDate}
            selected={{ from: startDate, to: endDate }}
            onSelect={handleSelectDate}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
