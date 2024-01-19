import { ExpeditionSortType } from '@/type';

function ExpeditionSortHeader({ numExpeditions }: { numExpeditions: number }) {
  const sortOptions: ExpeditionSortType[] = [
    {
      displayText: 'Departure Date (near to far)',
      field: 'departure',
      dir: 'asc',
    },
    {
      displayText: 'Departure Date (far to near)',
      field: 'departure',
      dir: 'desc',
    },
    {
      displayText: 'Price (low to high)',
      field: 'startingPrice',
      dir: 'asc',
    },
    {
      displayText: 'Price (high to low)',
      field: 'startingPrice',
      dir: 'desc',
    },
    {
      displayText: 'Name (A-Z)',
      field: 'name',
      dir: 'asc',
    },
    {
      displayText: 'Name (Z-A)',
      field: 'name',
      dir: 'desc',
    },
  ];

  return (
    <div className='flex items-center justify-between text-[8px] sm:py-4 sm:text-base sm:text-xs'>
      <div className='mr-2 font-semibold'>{`Showing ${numExpeditions} expedition cruise(s)`}</div>

      <div className='flex flex-row items-center'>
        <div className='mr-1 font-semibold'>Sort</div>

        <select
          className='select select-xs px-1 py-2'
          // onChange={(e) => handleSortChange(parseInt(e.target.value, 10))}
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
