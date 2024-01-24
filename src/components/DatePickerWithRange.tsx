'use client';

import { useState } from 'react';
import { DateRange } from 'react-day-picker';

import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import DatePopoverButton from './DatePopoverButton';

export function DatePickerWithRange({
  className,
}: React.HTMLAttributes<HTMLDivElement>) {
  const [open, setOpen] = useState({ start: false, end: false });
  const [date, setDate] = useState<DateRange | undefined>(undefined);

  const handleClick = (isStart: boolean) => {
    setOpen((x) => {
      if ((isStart && x.start) || (!isStart && x.end))
        return { ...x, start: false, end: false };

      return isStart
        ? { ...x, start: true, end: false }
        : { ...x, start: false, end: true };
    });
  };

  return (
    <div className={cn('grid gap-2', className)}>
      <Popover open={open.start || open.end}>
        <DatePopoverButton
          id='start-date'
          label='Start'
          date={date?.from}
          handleClick={() => handleClick(true)}
        />

        <DatePopoverButton
          id='end-date'
          label='End'
          date={date?.to}
          handleClick={() => handleClick(false)}
        />

        <PopoverContent className='w-auto p-0' align='start'>
          <Calendar
            initialFocus
            mode='range'
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
