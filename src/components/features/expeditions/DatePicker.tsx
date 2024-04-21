import { useRouter } from 'next/router';
import { DateRange } from 'react-day-picker';

import { getDateParam, updateDateParam } from '@/lib/param.utils';
import { FullDatePicker, MobileDatePicker } from './DatePickers';
import OptionHeader from './OptionHeader';

export default function DatePicker() {
  const router = useRouter();

  const startDate = getDateParam(router.query.startDate);
  const endDate = getDateParam(router.query.endDate);

  const handleSelectDate = (range?: DateRange) => {
    updateDateParam(router, range?.from, range?.to);
  };

  return (
    <div>
      <OptionHeader>Departure Dates</OptionHeader>

      <MobileDatePicker
        startDate={getDateParam(router.query.startDate)}
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
