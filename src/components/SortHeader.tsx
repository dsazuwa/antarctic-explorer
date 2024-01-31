import { sortOptions } from '@/lib/constants';
import { setSortOption, useAppDispatch, useAppSelector } from '@/store';

function SortHeader() {
  const dispatch = useAppDispatch();
  const { expeditions, selectedSort } = useAppSelector((s) => s.state);

  return (
    <div className='flex items-center justify-between text-xxs sm:py-2 sm:text-xs'>
      <div className='mr-2 font-semibold'>{`Showing ${expeditions.totalItems} expedition cruise(s)`}</div>

      <div className='flex flex-row items-center'>
        <div className='mr-1 font-semibold'>Sort</div>

        <select
          className='select select-xs px-1 py-1'
          value={selectedSort}
          onChange={(e) =>
            dispatch(setSortOption(parseInt(e.target.value, 10)))
          }
        >
          {sortOptions.map((option, index) => (
            <option key={`sortOption${index}`} value={index}>
              {option.displayText}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default SortHeader;
