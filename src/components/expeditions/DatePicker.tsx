'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { DateRange } from 'react-day-picker';

import { getDateParam, updateDateParam } from '@/lib/param.utils';
import { FullDatePicker, MobileDatePicker } from './DatePickers';
import OptionHeader from './OptionHeader';

export default function DatePicker() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const startDate = getDateParam(searchParams.get('startDate'));
  const endDate = getDateParam(searchParams.get('endDate'));

  const handleSelectDate = (range?: DateRange) => {
    updateDateParam(router, searchParams, range?.from, range?.to);
  };

  return (
    <div>
      <OptionHeader>Departure Dates</OptionHeader>

      <MobileDatePicker
        startDate={getDateParam(searchParams.get('startDate'))}
        endDate={endDate}
        handleSelectDate={handleSelectDate}
      />

      <FullDatePicker
        startDate={startDate}
        endDate={endDate}
        handleSelectDate={handleSelectDate}
      />
    </div>
  );
}
