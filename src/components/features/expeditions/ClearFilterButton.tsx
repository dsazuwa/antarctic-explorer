/* eslint-disable @typescript-eslint/no-unused-vars */

import { useRouter } from 'next/router';

import { Button } from '@/components/ui/button';
import { updateRouterQuery } from '@/lib/param.utils';

export default function ClearFilterButton() {
  const router = useRouter();

  const { startDate, endDate, cruiseLines, capacity, duration } = router.query;

  const clearFilter = () => {
    const {
      page,
      startDate,
      endDate,
      cruiseLines,
      capacity,
      duration,
      ...rest
    } = router.query;

    updateRouterQuery(router, rest);
  };

  return (
    <Button
      disabled={
        startDate === undefined &&
        endDate === undefined &&
        cruiseLines === undefined &&
        capacity === undefined &&
        duration === undefined
      }
      size='xs'
      className='h-[32px] rounded-md px-4 capitalize text-white'
      onClick={clearFilter}
    >
      Clear all filters
    </Button>
  );
}
