import { ChangeEvent } from 'react';

import { durationOptions } from '@/lib/constants';
import { filterExpeditions, useAppDispatch, useAppSelector } from '@/store';
import { DatePickerWithRange } from './DatePickerWithRange';
import OptionHeader from './OptionHeader';
import OptionsSelector from './OptionsSelector';

function FilterPanel() {
  const dispatch = useAppDispatch();
  const { cruiseLineOptions, filters } = useAppSelector((state) => state.state);

  const handleFilterChange = (
    filterType: 'cruiseLines' | 'duration',
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    dispatch(
      filterExpeditions({
        filterType,
        value: Number.parseInt(event.target.value),
      }),
    );
  };

  return (
    <>
      <div className='p-2'>
        <OptionHeader>Departure Dates</OptionHeader>
        <DatePickerWithRange />
      </div>

      {/* <OptionsSelector
          label='Ship capacity'
          type='radio'
          options={capacityOptions}
          isChecked={(i: number) => filters.cruiseLines.includes(i)}
          handleChange={(e) => handleFilterChange('capacity', e)}
      /> */}

      <OptionsSelector
        label='Cruise lines'
        type='checkbox'
        options={cruiseLineOptions}
        isChecked={(i: number) => filters.cruiseLines.includes(i)}
        handleChange={(e) => handleFilterChange('cruiseLines', e)}
      />

      <OptionsSelector
        label='Duration'
        type='radio'
        options={durationOptions}
        isChecked={(i: number) => filters.duration === i}
        handleChange={(e) => handleFilterChange('duration', e)}
      />
    </>
  );
}

export default FilterPanel;
