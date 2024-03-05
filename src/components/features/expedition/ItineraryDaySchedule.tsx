import { ChevronDownIcon } from '@radix-ui/react-icons';
import clsx from 'clsx';
import { useState } from 'react';

import { TSchedule } from '@/lib/type';

export default function DaySchedule({ schedule }: { schedule: TSchedule }) {
  const { day, header, content } = schedule;
  const [isOpen, setIsOpen] = useState(false);

  return (
    <li>
      <div className='flex flex-col space-y-0.5 border-b py-2.5 pr-2'>
        <span className='text-sm font-light'>{day}</span>

        <span className='flex flex-row items-center justify-between space-x-4'>
          <span className='w-[calc(100%-32px)] text-sm/[1rem] font-semibold text-[#323436] md:text-base'>
            {header}
          </span>

          <button
            className={clsx(
              'mt-auto rounded-full p-0.5 transition-transform ease-in-out hover:bg-primary/10 hover:shadow-md',
              { 'rotate-[-180deg]': isOpen },
            )}
            onClick={() => setIsOpen((x) => !x)}
          >
            <ChevronDownIcon className='h-6 w-6 p-1' />
          </button>
        </span>
      </div>

      <div className='space-y-6 py-7 text-base/[1.75em]' hidden={!isOpen}>
        {content.map((paragraph, i) => (
          <p key={`p-${i}`}>{paragraph}</p>
        ))}
      </div>
    </li>
  );
}
