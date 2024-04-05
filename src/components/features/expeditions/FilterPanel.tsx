import { useRouter } from 'next/router';
import { ChangeEvent } from 'react';

import {
  capacityOptions,
  cruiseLineOptions,
  durationOptions,
} from '@/lib/constants';
import {
  getCapacityParam,
  getCruiseLinesParam,
  getDurationParam,
  toggleCruiseLine,
  updateQueryParam,
} from '@/lib/param.utils';
import DatePicker from './DatePicker';
import OptionsSelector from './OptionsSelector';

function FilterPanel() {
  const router = useRouter();
  const { query } = router;

  const selectedCruiseLines = getCruiseLinesParam(query.cruiseLines);

  const handleFilterChange = (
    param: 'cruiseLines' | 'capacity' | 'duration',
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    const value = Number.parseInt(event.target.value);

    if (param === 'cruiseLines')
      toggleCruiseLine(router, cruiseLineOptions[value]);
    else updateQueryParam(router, { param, value });
  };

  return (
    <>
      <DatePicker />

      <OptionsSelector
        label='Cruise lines'
        type='checkbox'
        options={cruiseLineOptions.map((x) => ({ displayText: x }))}
        isChecked={(i: number) =>
          selectedCruiseLines.includes(cruiseLineOptions[i])
        }
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
