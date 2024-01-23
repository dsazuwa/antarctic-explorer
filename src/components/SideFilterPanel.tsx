import clsx from 'clsx';
import { useState } from 'react';

import ExpandMore from '@/assets/icons/ExpandMore';
import FilterButton from './FilterButton';

function SideFilterPanel({ cruiseLines }: { cruiseLines: string[] }) {
  const disabled = true;

  const cruiseLineOptions = cruiseLines.map((x) => {
    return { displayName: x };
  });

  const durationOptions = [
    { displayName: '1 - 7 days' },
    { displayName: '8 - 14 days' },
    { displayName: '15 - 7 days' },
    { displayName: '22+ days' },
    { displayName: 'All' },
  ];

  const capacityOptions = [
    { displayName: '1 - 100' },
    { displayName: '100 - 200' },
    { displayName: '200 - 500' },
    { displayName: '500+' },
    { displayName: 'All' },
  ];

  return (
    <div id='side-panel' className='hidden w-[304px] p-2 text-[12px] lg:inline'>
      <div className='flex w-full justify-end p-2'>
        <FilterButton disabled={disabled} />
      </div>

      {/* <div className='mt-2 p-2'>
        <OptionHeader label='Depature Dates' />
      </div> */}

      <FilterSection
        label='Cruise lines'
        type='checkbox'
        options={cruiseLineOptions}
      />

      <FilterSection
        label='Ship capacity'
        type='radio'
        options={capacityOptions}
      />

      <FilterSection label='Duration' type='radio' options={durationOptions} />
    </div>
  );
}

export default SideFilterPanel;

type OptionsType = { displayName: string }[];

type FilterSectionProps = {
  label: string;
  type: 'checkbox' | 'radio';
  options: OptionsType;
};

function FilterSection({ label, type, options }: FilterSectionProps) {
  const [isExpanded, setExpanded] = useState(true);

  const handleClick = () => {
    setExpanded((x) => !x);
  };

  return (
    <div className='p-2'>
      <div className='mb-2 flex flex-row items-center justify-between border-b-2 border-solid border-gray-200 pb-1 font-semibold text-navy'>
        <div>{label}</div>
        <button
          className={clsx(
            'rounded-full p-[2px] transition-transform delay-150 ease-in-out hover:bg-gray-200 hover:shadow',
            { 'rotate-180': !isExpanded },
          )}
          onClick={handleClick}
        >
          <ExpandMore />
        </button>
      </div>

      <div
        className={clsx('transition-transform delay-150 ease-in-out', {
          hidden: !isExpanded,
        })}
      >
        {options.map((o, i) => (
          <label key={i} className='my-2 flex text-[11px]/[11px] font-medium'>
            <input
              type={type}
              className='mr-2 rounded-none'
              value={o.displayName}
            />
            {o.displayName}
          </label>
        ))}
      </div>
    </div>
  );
}

// type OptionsHeaderProps = {
//   label: string;
// };

// function OptionHeader({ label }: OptionsHeaderProps) {
//   const [isExpanded, setExpanded] = useState(true);

//   const handleClick = () => {
//     setExpanded((x) => !x);
//   };

//   return (
//     <div className='mb-2 flex flex-row items-center justify-between border-b-2 border-solid border-gray-200 pb-1 font-semibold text-navy'>
//       <div>{label}</div>
//       <button
//         className={clsx(
//           'rounded-full p-[2px] transition-transform delay-150 ease-in-out hover:bg-gray-200 hover:shadow',
//           { 'rotate-180': !isExpanded },
//         )}
//         onClick={handleClick}
//       >
//         <ExpandMore />
//       </button>
//     </div>
//   );
// }

// function Options() {}

// checked={selectedOption === o.displayName}
// onChange={handleOptionChange}
