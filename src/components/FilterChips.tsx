import clsx from 'clsx';

import { capacityOptions, durationOptions } from '@/lib/constants';
import { RangedFilterOption } from '@/lib/type';
import { filterExpeditions, useAppDispatch, useAppSelector } from '@/store';
import Chip from './Chip';

function FilterChips() {
  const dispatch = useAppDispatch();
  const {
    cruiseLineOptions,
    filters: { cruiseLines, capacity, duration },
  } = useAppSelector((s) => s.state);

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

  const isFilteredByCruise = cruiseLines.length > 0;
  const isFIlteredByCapacity = capacity !== capacityOptions.length - 1;
  const isFIlteredByDuration = duration !== durationOptions.length - 1;
  const isFiltered =
    isFilteredByCruise || isFIlteredByCapacity || isFIlteredByDuration;

  return (
    <div
      className={clsx(
        { 'flex flex-row flex-wrap py-1': isFiltered },
        { hidden: !isFiltered },
      )}
    >
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
