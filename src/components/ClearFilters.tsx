import { durationOptions } from '@/lib/constants';
import { resetFilters, useAppDispatch, useAppSelector } from '@/store';
import { Button } from './ui/button';

function ClearFilters() {
  const dispatch = useAppDispatch();
  const { filters } = useAppSelector((s) => s.state);

  return (
    <Button
      disabled={
        filters.cruiseLines.length === 0 &&
        filters.duration === durationOptions.length - 1
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
