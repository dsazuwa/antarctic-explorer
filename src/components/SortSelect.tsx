import { SortType } from '@/lib/type';
import { Label } from './ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

type Props = {
  sortOptions: SortType[];
  selectedSort: number;
  setSortOption: (i: number) => void;
};

export default function SortSelect({
  sortOptions,
  selectedSort,
  setSortOption,
}: Props) {
  return (
    <div className='inline-flex flex-wrap items-center'>
      <Label
        htmlFor='select_sort_option'
        className='body-sm lg:body mr-1 font-semibold text-slate-500'
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
          className='min-h-7 flex-wrap gap-1 p-1 font-semibold'
        >
          <SelectValue
            defaultValue={selectedSort}
            className='whitespace-pre-wrap'
          />
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
