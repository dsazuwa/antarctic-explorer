import { useRouter } from 'next/router';
import { ChangeEvent } from 'react';

import { capacityOptions, durationOptions } from '@/lib/constants';
import {
  getCapacityParam,
  getCruiseLinesParam,
  getDurationParam,
  toggleCruiseLine,
  updateQueryParam,
} from '@/lib/param.utils';
import { useAppSelector } from '@/store';
import DatePicker from './DatePicker';
import OptionsSelector from './OptionsSelector';

function FilterPanel() {
  const router = useRouter();
  const { query } = router;

  const { cruiseLines } = useAppSelector((store) => store.expeditionState);
  const selectedCruiseLines = getCruiseLinesParam(query.cruiseLines);

  const handleFilterChange = (
    param: 'cruiseLines' | 'capacity' | 'duration',
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    const value = Number.parseInt(event.target.value);

    if (param === 'cruiseLines') toggleCruiseLine(router, cruiseLines[value]);
    else updateQueryParam(router, { param, value });
  };

  return (
    <>
      <DatePicker />

      <OptionsSelector
        label='Cruise lines'
        type='checkbox'
        options={cruiseLines.map((x) => ({ displayText: x }))}
        isChecked={(i: number) => selectedCruiseLines.includes(cruiseLines[i])}
        handleChange={(e) => handleFilterChange('cruiseLines', e)}
      />

      <OptionsSelector
        label='Ship capacity'
        type='radio'
        options={capacityOptions}
        isChecked={(i: number) => getCapacityParam(query) === i}
        handleChange={(e) => handleFilterChange('capacity', e)}
      />

      <OptionsSelector
        label='Duration'
        type='radio'
        options={durationOptions}
        isChecked={(i: number) => getDurationParam(query) === i}
        handleChange={(e) => handleFilterChange('duration', e)}
      />
    </>
  );
}

export default FilterPanel;
