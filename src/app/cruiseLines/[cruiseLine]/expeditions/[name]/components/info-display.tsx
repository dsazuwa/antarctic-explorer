type Props = {
  label: string;
  value: string | null;
};

export default function InfoDisplay({ label, value }: Props) {
  return (
    <li className='flex flex-col gap-1 text-sm/5'>
      <span className='text-xs'>{label}</span>

      {value ? (
        <span className='font-semibold'>{value}</span>
      ) : (
        <span className='font-semibold'>Unavailable</span>
      )}
    </li>
  );
}
