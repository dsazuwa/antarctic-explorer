import { SortType } from '@/lib/type';
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

export default function SortSelector({
  sortOptions,
  selectedSort,
  setSortOption,
}: Props) {
  return (
    <Select
      onValueChange={(i) => setSortOption(parseInt(i, 10))}
      value={selectedSort + ''}
      defaultValue={selectedSort + ''}
    >
      <SelectTrigger
        className='max-w-fit flex-wrap gap-2 bg-inherit text-sm font-semibold text-black lg:text-base'
        aria-label='Sort:'
      >
        <span className='font-normal text-neutral-500'>Sort: </span>

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
  );
}
