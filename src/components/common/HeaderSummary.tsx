type Props = {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  itemType: string;
};

export default function HeaderSummary({
  currentPage,
  itemsPerPage,
  totalItems,
  itemType,
}: Props) {
  const start = currentPage * itemsPerPage;
  const end = Math.min(start + itemsPerPage, totalItems);

  return (
    <div className='mr-2 space-x-0.5 text-xxs font-semibold text-slate-500 md:space-x-[3px] md:text-xs'>
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
