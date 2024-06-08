import { ChangeEventHandler, ReactNode, useState } from 'react';

import ExpandLess from '@/assets/icons/ExpandLess';
import { BasicFilterOption, RangedFilterOption } from '@/lib/type';
import { cn } from '@/lib/utils';

type OptionsSelectorProps = {
  type: 'checkbox' | 'radio';
  label: string;
  options: (BasicFilterOption | RangedFilterOption)[];
  isChecked: (i: number) => boolean;
  handleChange: ChangeEventHandler<HTMLInputElement>;
};

export function OptionsSelector({
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
    <div>
      <button className='w-full' onClick={handleClick}>
        <OptionHeader>
          {label}
          <div
            className={cn(
              'rounded-full p-0.5 transition-transform ease-in-out hover:bg-gray-200 hover:shadow',
              { 'rotate-180': !isExpanded },
            )}
          >
            <ExpandLess />
          </div>
        </OptionHeader>
      </button>

      <form
        className={cn('ml-1 transition-transform ease-in-out', {
          hidden: !isExpanded,
        })}
      >
        {options.map((o, i) => (
          <label
            key={i}
            className='body-sm lg:body my-1 flex items-center font-medium'
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

type OptionsHeaderProps = { children?: ReactNode; className?: string };

export function OptionHeader({ children, className }: OptionsHeaderProps) {
  return (
    <div
      className={cn(
        'body lg:body-lg mb-2 inline-flex w-full items-center justify-between border-b-2 border-solid border-gray-200 pb-1 font-semibold text-primary',
        className,
      )}
    >
      {children}
    </div>
  );
}
