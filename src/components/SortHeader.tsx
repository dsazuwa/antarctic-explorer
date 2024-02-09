import { sortOptions } from '@/lib/constants';
import { setSortOption, useAppDispatch, useAppSelector } from '@/store';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

function SortHeader() {
  const dispatch = useAppDispatch();
  const { expeditions, selectedSort } = useAppSelector((s) => s.state);

  return (
    <div className='flex items-center justify-between text-xxs sm:py-2 sm:text-xs'>
      <div className='mr-2 font-semibold text-slate-500'>{`Showing ${expeditions.totalItems} expedition cruise(s)`}</div>

      <div className='flex flex-row items-center'>
        <div className='mr-1 font-semibold text-slate-500'>Sort</div>

        <Select
          onValueChange={(i) => dispatch(setSortOption(parseInt(i, 10)))}
          value={selectedSort + ''}
          defaultValue={selectedSort + ''}
        >
          <SelectTrigger
            id='items per page'
            className='h-[28px] w-48 px-1 py-1 text-xxs font-semibold'
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
    </div>
  );
}

export default SortHeader;
