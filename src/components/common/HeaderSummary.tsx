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
  const label =
    totalItems === 0
      ? `Showing 0 ${itemType}`
      : `Showing ${start + 1}-${end} of ${totalItems} ${itemType}`;

  return (
    <div className='mr-2 text-xxs font-semibold text-slate-500'>{label}</div>
  );
}
