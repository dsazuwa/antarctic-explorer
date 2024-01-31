import { durationOptions } from '@/lib/constants';
import { filterExpeditions, useAppDispatch, useAppSelector } from '@/store';
import Chip from './Chip';
import clsx from 'clsx';

function FilterChips() {
  const dispatch = useAppDispatch();
  const {
    cruiseLineOptions,
    filters: { cruiseLines, duration },
  } = useAppSelector((s) => s.state);

  const handleCruiseLineClick = (value: number) => {
    dispatch(filterExpeditions({ filterType: 'cruiseLines', value }));
  };

  const handleDurationClick = () => {
    dispatch(
      filterExpeditions({
        filterType: 'duration',
        value: durationOptions.length - 1,
      }),
    );
  };

  const isCruiseFiltered = cruiseLines.length > 0;
  const isDurationFIltered = duration !== durationOptions.length - 1;
  const isFiltered = isCruiseFiltered || isDurationFIltered;

  return (
    <div
      className={clsx(
        { 'flex flex-row flex-wrap py-1': isFiltered },
        { hidden: !isFiltered },
      )}
    >
      {isCruiseFiltered &&
        cruiseLines.map((x, i) => (
          <Chip
            key={`cruiseLineChip${i}`}
            label={cruiseLineOptions[x].displayName}
            handleClick={() => handleCruiseLineClick(x)}
          />
        ))}

      {isDurationFIltered && (
        <Chip
          label={`Duration: ${durationOptions[duration].displayName}`}
          handleClick={handleDurationClick}
        />
      )}
    </div>
  );
}

export default FilterChips;
