'use client';

import { useSearchParams } from 'next/navigation';

import { Button } from '@/components/ui/button';

export default function ClearFilterButton() {
  const searchParams = useSearchParams();

  const clearFilter = () => {
    const params = new URLSearchParams(searchParams.toString());

    params.delete('page');
    params.delete('startDate');
    params.delete('endDate');
    params.delete('cruiseLines');
    params.delete('capacity');
    params.delete('duration');

    return params.toString();
  };

  return (
    <Button
      disabled={
        searchParams.get('startDate') === null &&
        searchParams.get('endDate') === null &&
        searchParams.getAll('cruiseLines').length === 0 &&
        searchParams.get('capacity') === null &&
        searchParams.get('duration') === null
      }
      size='none'
      className='body-sm h-10 rounded-md px-4 py-2 capitalize text-white'
      onClick={clearFilter}
    >
      Clear all filters
    </Button>
  );
}
