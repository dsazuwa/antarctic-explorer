'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Cross2Icon } from '@radix-ui/react-icons';

import {
  capacityOptions,
  defaultCapacity,
  defaultDuration,
  durationOptions,
} from '@/lib/constants';
import {
  getCapacityParam,
  getDateParam,
  getDurationParam,
  toggleCruiseLine,
  updateDateParam,
  updateQueryParam,
} from '@/lib/param.utils';
import { cn, formatDate } from '@/lib/utils';

export default function FilterChips() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const startDate = getDateParam(searchParams.get('startDate'));
  const endDate = getDateParam(searchParams.get('endDate'));
  const cruiseLine = searchParams.getAll('cruiseLines');
  const capacity = getCapacityParam(searchParams.get('capacity'));
  const duration = getDurationParam(searchParams.get('duration'));

  const isFilteredByStartDate = startDate !== null;
  const isFilteredByEndDate = endDate !== null;
  const isFilteredByCruise = cruiseLine.length !== 0;
  const isFIlteredByCapacity = capacity !== defaultCapacity;
  const isFIlteredByDuration = duration !== defaultDuration;
  const isFiltered =
    isFilteredByStartDate ||
    isFilteredByEndDate ||
    isFilteredByCruise ||
    isFIlteredByCapacity ||
    isFIlteredByDuration;

  return (
    <div
      className={cn(
        { 'inline-flex flex-wrap gap-2': isFiltered },
        { hidden: !isFiltered },
      )}
    >
      {isFilteredByStartDate && (
        <Chip
          label={`Start: ${formatDate(startDate, 'LLL dd, y')}${isFilteredByEndDate ? ` End: ${formatDate(endDate, 'LLL dd, y')}` : ''}`}
          handleClick={() =>
            updateDateParam(router, searchParams, undefined, undefined)
          }
        />
      )}

      {isFilteredByCruise &&
        cruiseLine.map((x, i) => (
          <Chip
            key={`cruiseLineChip${i}`}
            label={x}
            handleClick={() => toggleCruiseLine(router, searchParams, x)}
          />
        ))}

      {isFIlteredByCapacity && (
        <Chip
          label={`Capacity: ${capacityOptions[capacity].displayText}`}
          handleClick={() =>
            updateQueryParam(router, searchParams, {
              param: 'capacity',
              value: defaultCapacity,
            })
          }
        />
      )}

      {isFIlteredByDuration && (
        <Chip
          label={`Duration: ${durationOptions[duration].displayText}`}
          handleClick={() =>
            updateQueryParam(router, searchParams, {
              param: 'duration',
              value: defaultDuration,
            })
          }
        />
      )}
    </div>
  );
}

type ChipProps = {
  label: string;
  handleClick: () => void;
};

function Chip({ label, handleClick }: ChipProps) {
  return (
    <div className='inline-flex min-h-10 items-center rounded-md border border-solid border-primary/50 px-4 py-2 text-xs font-bold text-primary/75 hover:shadow'>
      {label}
      <button
        className='ml-2 rounded-full bg-muted-foreground/35 p-1 transition-colors hover:bg-muted-foreground/45 hover:shadow-sm'
        onClick={handleClick}
      >
        <Cross2Icon className='h-3 w-3 text-white' />
      </button>
    </div>
  );
}
