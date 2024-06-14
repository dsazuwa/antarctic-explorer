export default function HeaderSummary({
  currentPage,
  size,
  totalItems,
  itemType,
}: {
  currentPage: number;
  size: number;
  totalItems: number;
  itemType: string;
}) {
  const start = (currentPage - 1) * size;
  const end = Math.min(start + size, totalItems);

  return (
    <div className='body-sm lg:body mr-2 inline-flex flex-wrap space-x-1 font-semibold'>
      <span>Showing</span>

      {totalItems === 0 && <span>0</span>}

      {totalItems === 1 && (
        <>
          <span className='font-bold text-black'>{start + 1}</span>
          <span>of</span>
          <span className='font-bold text-black'>{totalItems}</span>
        </>
      )}

      {totalItems > 1 && (
        <>
          <span className='font-bold text-black'>{start + 1}</span>
          <span>-</span>
          <span className='font-bold text-black'>{end}</span>
          <span>of</span>
          <span className='font-bold text-black'>{totalItems}</span>
        </>
      )}

      <span className='capitalize'>{itemType}</span>
    </div>
  );
}
