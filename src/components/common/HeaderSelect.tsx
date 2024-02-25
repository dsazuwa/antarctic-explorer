import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { SortType } from '@/lib/type';

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
      <div className='mr-1 text-xxs font-semibold text-slate-500 md:text-xs'>
        Sort
      </div>

      <Select
        onValueChange={(i) => setSortOption(parseInt(i, 10))}
        value={selectedSort + ''}
        defaultValue={selectedSort + ''}
      >
        <SelectTrigger
          id='items per page'
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
