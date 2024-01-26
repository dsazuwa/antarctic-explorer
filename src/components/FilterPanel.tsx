import { ChangeEventHandler } from 'react';

import { durationOptions } from '@/constants';
import { BasicFilterOption, FilterState } from '@/type';
import { DatePickerWithRange } from './DatePickerWithRange';
import OptionHeader from './OptionHeader';
import OptionsSelector from './OptionsSelector';

type Props = {
  cruiseLineOptions: BasicFilterOption;
  filters: FilterState;
  filterByCruiseLine: ChangeEventHandler<HTMLInputElement>;
  filterByDuration: ChangeEventHandler<HTMLInputElement>;
};

function FilterPanel({
  cruiseLineOptions,
  filters,
  filterByCruiseLine,
  filterByDuration,
}: Props) {
  return (
    <>
      <div className='mt-2 p-2'>
        <OptionHeader>Departure Dates</OptionHeader>
        <DatePickerWithRange />
      </div>

      <OptionsSelector
        label='Cruise lines'
        type='checkbox'
        options={cruiseLineOptions}
        isChecked={(i: number) => filters.cruiseLines.includes(i)}
        handleChange={filterByCruiseLine}
      />

      {/* <OptionsSelector
    label='Ship capacity'
    type='radio'
    options={capacityOptions}
    isChecked={(i: number) => filters.cruiseLines.includes(i)}
    handleChange={filterByCapacity}
  /> */}

      <OptionsSelector
        label='Duration'
        type='radio'
        options={durationOptions}
        isChecked={(i: number) => filters.duration === i}
        handleChange={filterByDuration}
      />
    </>
  );
}

export default FilterPanel;
