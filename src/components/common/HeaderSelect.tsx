import { SortType } from '@/lib/type';
import { Label } from '../ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

type Props = {
  sortOptions: SortType[];
  selectedSort: number;
  setSortOption: (i: number) => void;
};

export default function HeaderSelect({
  sortOptions,
  selectedSort,
  setSortOption,
}: Props) {
  return (
    <div className='flex flex-row items-center'>
      <Label
        htmlFor='select_sort_option'
        className='mr-1 text-xxs font-semibold text-slate-500 md:text-xs'
      >
        Sort
      </Label>

      <Select
        onValueChange={(i) => setSortOption(parseInt(i, 10))}
        value={selectedSort + ''}
        defaultValue={selectedSort + ''}
      >
        <SelectTrigger
          id='select_sort_option'
          className='h-[28px] w-[144px] p-1 font-semibold md:w-[168px]'
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
