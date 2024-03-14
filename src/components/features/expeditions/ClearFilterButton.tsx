import { Button } from '@/components/ui/button';
import { capacityOptions, durationOptions } from '@/lib/constants';
import { resetFilters, useAppDispatch, useAppSelector } from '@/store';

export default function ClearFilterButton() {
  const dispatch = useAppDispatch();
  const { startDate, endDate, cruiseLines, capacity, duration } =
    useAppSelector((s) => s.expeditionState.filters);

  return (
    <Button
      disabled={
        startDate === null &&
        endDate === null &&
        cruiseLines.length === 0 &&
        capacity === capacityOptions.length - 1 &&
        duration === durationOptions.length - 1
      }
      size='xs'
      className='h-[32px] rounded-md px-4 capitalize'
      onClick={() => dispatch(resetFilters())}
    >
      Clear all filters
    </Button>
  );
}
