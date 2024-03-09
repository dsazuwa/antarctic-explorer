import clsx from 'clsx';

import Chip from '@/components/common/Chip';
import { capacityOptions, durationOptions } from '@/lib/constants';
import { RangedFilterOption } from '@/lib/type';
import { formatDate } from '@/lib/utils';
import {
  filterExpeditions,
  resetDateFilters,
  useAppDispatch,
  useAppSelector,
} from '@/store';

function FilterChips() {
  const dispatch = useAppDispatch();
  const {
    cruiseLineOptions,
    filters: { startDate, endDate, cruiseLines, capacity, duration },
  } = useAppSelector((s) => s.expeditionState);

  const handleDate = () => {
    dispatch(resetDateFilters());
  };

  const handleCruiseLine = (value: number) => {
    dispatch(filterExpeditions({ filterType: 'cruiseLines', value }));
  };

  const handleRadio = (
    filterType: 'duration' | 'capacity',
    options: RangedFilterOption,
  ) => {
    dispatch(
      filterExpeditions({
        filterType,
        value: options.length - 1,
      }),
    );
  };

  const isFilteredByStartDate = startDate !== null;
  const isFilteredByEndDate = endDate !== null;
  const isFilteredByCruise = cruiseLines.length > 0;
  const isFIlteredByCapacity = capacity !== capacityOptions.length - 1;
  const isFIlteredByDuration = duration !== durationOptions.length - 1;
  const isFiltered =
    isFilteredByStartDate ||
    isFilteredByEndDate ||
    isFilteredByCruise ||
    isFIlteredByCapacity ||
    isFIlteredByDuration;

  return (
    <div
      className={clsx(
        { 'flex flex-row flex-wrap gap-2': isFiltered },
        { hidden: !isFiltered },
      )}
    >
      {isFilteredByStartDate && (
        <Chip
          label={`Start: ${formatDate(startDate, 'LLL dd, y')}${isFilteredByEndDate ? ` End: ${formatDate(endDate, 'LLL dd, y')}` : ''}`}
          handleClick={() => handleDate()}
        />
      )}

      {isFilteredByCruise &&
        cruiseLines.map((x, i) => (
          <Chip
            key={`cruiseLineChip${i}`}
            label={cruiseLineOptions[x].displayName}
            handleClick={() => handleCruiseLine(x)}
          />
        ))}

      {isFIlteredByCapacity && (
        <Chip
          label={`Capacity: ${capacityOptions[capacity].displayName}`}
          handleClick={() => handleRadio('capacity', capacityOptions)}
        />
      )}

      {isFIlteredByDuration && (
        <Chip
          label={`Duration: ${durationOptions[duration].displayName}`}
          handleClick={() => handleRadio('duration', durationOptions)}
        />
      )}
    </div>
  );
}

export default FilterChips;
