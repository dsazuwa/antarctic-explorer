import { DateRange } from 'react-day-picker';

import { formatDate } from '@/lib/utils';
import { filterExpeditions, useAppDispatch, useAppSelector } from '@/store';
import { FullDatePicker, MobileDatePicker } from './DatePickers';

export default function DatePicker() {
  const dispatch = useAppDispatch();
  const { startDate, endDate } = useAppSelector(
    (s) => s.expeditionState.filters,
  );

  const handleSelectDate = (range?: DateRange) => {
    dispatch(
      filterExpeditions({
        filterType: 'startDate',
        value:
          range && range.from
            ? encodeURIComponent(formatDate(range.from, 'yyyy-MM-dd'))
            : null,
      }),
    );

    dispatch(
      filterExpeditions({
        filterType: 'endDate',
        value:
          range && range.to
            ? encodeURIComponent(formatDate(range.to, 'yyyy-MM-dd'))
            : null,
      }),
    );
  };

  return (
    <>
      <MobileDatePicker
        startDate={startDate}
        endDate={endDate}
        handleSelectDate={handleSelectDate}
      />

      <FullDatePicker
        startDate={startDate}
        endDate={endDate}
        handleSelectDate={handleSelectDate}
      />
    </>
  );
}
