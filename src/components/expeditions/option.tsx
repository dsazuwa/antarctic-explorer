import { ChangeEventHandler, ReactNode } from 'react';

import { BasicFilterOption, RangedFilterOption } from '@/lib/type';
import { cn } from '@/lib/utils';
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../ui/accordion';

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
  return (
    <AccordionItem value={label}>
      <AccordionTrigger className='w-full py-0'>
        <OptionHeader className='border-none pb-1'>{label}</OptionHeader>
      </AccordionTrigger>

      <AccordionContent>
        <form className='ml-1 transition-transform ease-in-out'>
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
      </AccordionContent>
    </AccordionItem>
  );
}

type OptionsHeaderProps = { children?: ReactNode; className?: string };

export function OptionHeader({ children, className }: OptionsHeaderProps) {
  return (
    <div
      className={cn(
        'body lg:body-lg mb-2 inline-flex w-full items-center justify-between font-semibold text-primary',
        className,
      )}
    >
      {children}
    </div>
  );
}
