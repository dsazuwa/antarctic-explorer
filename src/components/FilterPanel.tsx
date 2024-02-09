import { ChangeEvent } from 'react';

import { capacityOptions, durationOptions } from '@/lib/constants';
import { filterExpeditions, useAppDispatch, useAppSelector } from '@/store';
import DatePicker from './DatePicker';
import OptionHeader from './OptionHeader';
import OptionsSelector from './OptionsSelector';

function FilterPanel() {
  const dispatch = useAppDispatch();
  const { cruiseLineOptions, filters } = useAppSelector((state) => state.state);

  const handleFilterChange = (
    filterType: 'cruiseLines' | 'capacity' | 'duration',
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    const value = Number.parseInt(event.target.value);
    dispatch(filterExpeditions({ filterType, value }));
  };

  return (
    <>
      <div className='p-2'>
        <OptionHeader>Departure Dates</OptionHeader>
        <DatePicker />
      </div>

      <OptionsSelector
        label='Cruise lines'
        type='checkbox'
        options={cruiseLineOptions}
        isChecked={(i: number) => filters.cruiseLines.includes(i)}
        handleChange={(e) => handleFilterChange('cruiseLines', e)}
      />

      <OptionsSelector
        label='Ship capacity'
        type='radio'
        options={capacityOptions}
        isChecked={(i: number) => filters.capacity === i}
        handleChange={(e) => handleFilterChange('capacity', e)}
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
