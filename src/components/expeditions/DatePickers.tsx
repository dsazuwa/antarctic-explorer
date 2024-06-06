import { useEffect, useState } from 'react';
import { DateRange } from 'react-day-picker';

import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  PopoverAnchor,
} from '@/components/ui/popover';
import useWindowWidth from '@/hooks/useWindowWidth';
import DateLabel from './DateLabel';

type Props = {
  startDate: Date | null;
  endDate: Date | null;
  handleSelectDate: (range?: DateRange) => void;
};

function MobileDatePicker({ startDate, endDate, handleSelectDate }: Props) {
  const [isExpanded, setExpanded] = useState(false);
  const range = { from: startDate || undefined, to: endDate || undefined };

  return (
    <div className='lg:hidden'>
      <DateLabel
        startDate={startDate}
        endDate={endDate}
        handleClick={() => setExpanded((x) => !x)}
      />

      {isExpanded && (
        <Calendar
          initialFocus
          mode='range'
          defaultMonth={startDate || undefined}
          selected={range}
          onSelect={handleSelectDate}
          disabled={{ before: new Date() }}
          numberOfMonths={1}
          fixedWeeks
        />
      )}
    </div>
  );
}

function FullDatePicker({ startDate, endDate, handleSelectDate }: Props) {
  const [open, setOpen] = useState(false);

  const windowWidth = useWindowWidth();
  useEffect(() => {
    if (windowWidth && windowWidth <= 1024) setOpen(false);
  }, [windowWidth]);

  const range = { from: startDate || undefined, to: endDate || undefined };

  return (
    <div className='hidden gap-2 lg:grid'>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <PopoverAnchor>
            <DateLabel startDate={startDate} endDate={endDate} />
          </PopoverAnchor>
        </PopoverTrigger>

        <PopoverContent className='w-auto p-0' align='start'>
          <Calendar
            initialFocus
            mode='range'
            defaultMonth={startDate || undefined}
            selected={range}
            onSelect={handleSelectDate}
            disabled={{ before: new Date() }}
            numberOfMonths={2}
            fixedWeeks
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}

export { FullDatePicker, MobileDatePicker };
