import { ChangeEventHandler } from 'react';

import { durationOptions } from '@/constants';
import { BasicFilterOption, FilterState } from '@/type';
import { DatePickerWithRange } from './DatePickerWithRange';
import FilterButton from './FilterButton';
import OptionHeader from './OptionHeader';
import OptionsSelector from './OptionsSelector';

type Props = {
  cruiseLineOptions: BasicFilterOption;
  filters: FilterState;
  filterByCruiseLine: ChangeEventHandler<HTMLInputElement>;
  filterByDuration: ChangeEventHandler<HTMLInputElement>;
};

function SideFilterPanel({
  cruiseLineOptions,
  filters,
  filterByCruiseLine,
  filterByDuration,
}: Props) {
  const disabled = true;

  return (
    <div id='side-panel' className='hidden w-[300px] p-2 text-xxs lg:inline'>
      <div className='flex w-full justify-end p-2'>
        <FilterButton disabled={disabled} />
      </div>

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
        handleChange={filterByCapacity}
      /> */}

      <OptionsSelector
        label='Duration'
        type='radio'
        options={durationOptions}
        isChecked={(i: number) => filters.duration === i}
        handleChange={filterByDuration}
      />
    </div>
  );
}

export default SideFilterPanel;
