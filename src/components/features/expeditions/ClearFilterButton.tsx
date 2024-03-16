import { useRouter } from 'next/router';

import { Button } from '@/components/ui/button';

export default function ClearFilterButton() {
  const router = useRouter();

  const { startDate, endDate, cruiseLines, capacity, duration } = router.query;

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
      onClick={() => router.push('/')}
    >
      Clear all filters
    </Button>
  );
}
