import clsx from 'clsx';
import { ChangeEventHandler, useState } from 'react';

import ExpandLess from '@/assets/icons/ExpandLess';
import { BasicFilterOption, RangedFilterOption } from '@/lib/type';
import OptionHeader from './OptionHeader';

type OptionsSelectorProps = {
  type: 'checkbox' | 'radio';
  label: string;
  options: (BasicFilterOption | RangedFilterOption)[];
  isChecked: (i: number) => boolean;
  handleChange: ChangeEventHandler<HTMLInputElement>;
};

function OptionsSelector({
  type,
  label,
  options,
  isChecked,
  handleChange,
}: OptionsSelectorProps) {
  const [isExpanded, setExpanded] = useState(true);

  const handleClick = () => {
    setExpanded((x) => !x);
  };

  return (
    <div className='p-2'>
      <button className='w-full' onClick={handleClick}>
        <OptionHeader>
          {label}
          <div
            className={clsx(
              'rounded-full p-0.5 transition-transform ease-in-out hover:bg-gray-200 hover:shadow',
              { 'rotate-180': !isExpanded },
            )}
          >
            <ExpandLess />
          </div>
        </OptionHeader>
      </button>

      <form
        className={clsx('ml-1 transition-transform ease-in-out', {
          hidden: !isExpanded,
        })}
      >
        {options.map((o, i) => (
          <label
            key={i}
            className='my-2 flex items-center text-xs font-medium leading-4 lg:text-sm'
          >
            <input
              type={type}
              className='mr-2 rounded-none'
              value={i}
              name={label + ' options'}
              checked={isChecked(i)}
              onChange={handleChange}
            />
            {o.displayText}
          </label>
        ))}
      </form>
    </div>
  );
}

export default OptionsSelector;
