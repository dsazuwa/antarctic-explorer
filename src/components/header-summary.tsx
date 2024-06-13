export default function HeaderSummary({
  currentPage,
  itemsPerPage,
  totalItems,
  itemType,
}: {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  itemType: string;
}) {
  const start = (currentPage - 1) * itemsPerPage;
  const end = Math.min(start + itemsPerPage, totalItems);

  return (
    <div className='body-sm lg:body mr-2 inline-flex flex-wrap space-x-1 font-semibold text-slate-500'>
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

      <span>{itemType}</span>
    </div>
  );
}
