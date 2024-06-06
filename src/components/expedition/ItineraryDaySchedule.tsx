import { ChevronDownIcon } from '@radix-ui/react-icons';
import clsx from 'clsx';
import { useState } from 'react';

import { TSchedule } from '@/lib/type';

export default function DaySchedule({ schedule }: { schedule: TSchedule }) {
  const { day, header, content } = schedule;
  const [isOpen, setIsOpen] = useState(false);

  return (
    <li>
      <button
        className='flex w-full flex-col gap-0.5 border-b py-2.5 pr-2 text-start'
        onClick={() => setIsOpen((x) => !x)}
      >
        <span className='text-sm font-semibold text-gray-500'>{day}</span>

        <span className='flex w-full flex-row items-center justify-between gap-4'>
          <span className='flex-grow text-base font-bold md:text-sm/[1rem]'>
            {header}
          </span>

          <span
            className={clsx(
              'mt-auto rounded-full p-0.5 transition-transform ease-in-out hover:bg-primary/10 hover:shadow-md',
              { 'rotate-[-180deg]': isOpen },
            )}
          >
            <ChevronDownIcon className='h-6 w-6 p-1' />
          </span>
        </span>
      </button>

      <div className='space-y-6 py-7 text-base/[1.75em]' hidden={!isOpen}>
        {content.map((paragraph, i) => (
          <p key={`p-${i}`}>{paragraph}</p>
        ))}
      </div>
    </li>
  );
}
