'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { ChangeEvent } from 'react';

import {
  capacityOptions,
  cruiseLineOptions,
  durationOptions,
} from '@/lib/constants';
import {
  getCapacityParam,
  getDurationParam,
  toggleCruiseLine,
  updateQueryParam,
} from '@/lib/param.utils';
import { Accordion } from '../ui/accordion';
import DatePicker from './date-picker';
import { OptionsSelector } from './option';

export default function FilterPanel() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleFilterChange = (
    param: 'cruiseLines' | 'capacity' | 'duration',
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    const value = Number.parseInt(event.target.value);

    if (param === 'cruiseLines')
      toggleCruiseLine(router, searchParams, cruiseLineOptions[value]);
    else updateQueryParam(router, searchParams, { param, value });
  };

  return (
    <>
      <DatePicker />

      <Accordion
        type='multiple'
        className='flex flex-col gap-6'
        defaultValue={['Cruise lines', 'Ship capacity', 'Duration']}
      >
        <OptionsSelector
          label='Cruise lines'
          type='checkbox'
          options={cruiseLineOptions.map((x) => ({ displayText: x }))}
          isChecked={(i: number) =>
            searchParams.getAll('cruiseLines').includes(cruiseLineOptions[i])
          }
          handleChange={(e) => handleFilterChange('cruiseLines', e)}
        />

        <OptionsSelector
          label='Ship capacity'
          type='radio'
          options={capacityOptions}
          isChecked={(i: number) =>
            getCapacityParam(searchParams.get('capacity')) === i
          }
          handleChange={(e) => handleFilterChange('capacity', e)}
        />

        <OptionsSelector
          label='Duration'
          type='radio'
          options={durationOptions}
          isChecked={(i: number) =>
            getDurationParam(searchParams.get('duration')) === i
          }
          handleChange={(e) => handleFilterChange('duration', e)}
        />
      </Accordion>
    </>
  );
}
