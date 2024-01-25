import clsx from 'clsx';
import { ChangeEventHandler, useState } from 'react';

import ExpandLess from '@/assets/icons/ExpandLess';
import { BasicFilterOption, RangedFilterOption } from '@/type';
import OptionHeader from './OptionHeader';

type OptionsSelectorProps = {
  type: 'checkbox' | 'radio';
  label: string;
  options: BasicFilterOption | RangedFilterOption;
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
      <OptionHeader>
        {label}
        <button
          className={clsx(
            'rounded-full p-0.5 transition-transform ease-in-out hover:bg-gray-200 hover:shadow',
            { 'rotate-180': !isExpanded },
          )}
          onClick={handleClick}
        >
          <ExpandLess />
        </button>
      </OptionHeader>

      <form
        className={clsx('ml-1 transition-transform ease-in-out', {
          hidden: !isExpanded,
        })}
      >
        {options.map((o, i) => (
          <label
            key={i}
            className='my-2 flex items-center text-xxs font-medium leading-3'
          >
            <input
              type={type}
              className='mr-2 rounded-none'
              value={i}
              name={label + ' options'}
              checked={isChecked(i)}
              onChange={handleChange}
            />
            {o.displayName}
          </label>
        ))}
      </form>
    </div>
  );
}

export default OptionsSelector;
