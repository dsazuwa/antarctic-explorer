import { sortOptions } from '@/type';

type Props = {
  numExpeditions: number;
  sortExpeditions: (index: number) => void;
};

function ExpeditionSortHeader({ numExpeditions, sortExpeditions }: Props) {
  return (
    <div className='flex items-center justify-between text-[8px] sm:py-2 sm:text-xs'>
      <div className='mr-2 font-semibold'>{`Showing ${numExpeditions} expedition cruise(s)`}</div>

      <div className='flex flex-row items-center'>
        <div className='mr-1 font-semibold'>Sort</div>

        <select
          className='select select-xs px-1 py-2'
          onChange={(e) => sortExpeditions(parseInt(e.target.value, 10))}
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

export default ExpeditionSortHeader;
