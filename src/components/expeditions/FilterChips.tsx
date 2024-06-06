'use client';

import clsx from 'clsx';
import { useRouter, useSearchParams } from 'next/navigation';

import Chip from '@/components/Chip';
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
import { formatDate } from '@/lib/utils';

export default function FilterChips() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const startDate = getDateParam(searchParams.get('startDate'));
  const endDate = getDateParam(searchParams.get('endDate'));
  const cruiseLine = searchParams.getAll('cruiseLines');
  const capacity = getCapacityParam(searchParams);
  const duration = getDurationParam(searchParams);

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
      className={clsx(
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
