import { capacityOptions, durationOptions } from '@/lib/constants';
import { resetFilters, useAppDispatch, useAppSelector } from '@/store';
import { Button } from './ui/button';

function ClearFilters() {
  const dispatch = useAppDispatch();
  const { startDate, endDate, cruiseLines, capacity, duration } =
    useAppSelector((s) => s.state.filters);

  return (
    <Button
      disabled={
        startDate === undefined &&
        endDate === undefined &&
        cruiseLines.length === 0 &&
        capacity === capacityOptions.length - 1 &&
        duration === durationOptions.length - 1
      }
      size='xs'
      className='px-3 capitalize'
      onClick={() => dispatch(resetFilters())}
    >
      Clear all filters
    </Button>
  );
}

export default ClearFilters;
