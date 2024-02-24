import React from 'react';
import { sortOptions } from '@/lib/constants';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

type Props = {
  selectedSort: number;
  setSortOption: (i: number) => void;
};

export default function HeaderSelect({ selectedSort, setSortOption }: Props) {
  return (
    <div className='flex flex-row items-center'>
      <div className='mr-1 text-xxs font-semibold text-slate-500'>Sort</div>

      <Select
        onValueChange={(i) => setSortOption(parseInt(i, 10))}
        value={selectedSort + ''}
        defaultValue={selectedSort + ''}
      >
        <SelectTrigger
          id='items per page'
          className='h-[28px] w-[152px] px-1 py-1 font-semibold'
        >
          <SelectValue defaultValue={selectedSort} />
        </SelectTrigger>

        <SelectContent>
          {sortOptions.map((option, index) => (
            <SelectItem key={`sortOption${index}`} value={index + ''}>
              {option.displayText}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
