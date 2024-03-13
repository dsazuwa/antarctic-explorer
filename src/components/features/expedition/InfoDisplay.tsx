type Props = {
  label: string;
  value: string | null;
};

export default function InfoDisplay({ label, value }: Props) {
  return (
    <li className='flex flex-col gap-0.5 font-semibold'>
      <span className='text-xs text-slate-400'>{label}</span>
      {value ? (
        <span className='text-sm'>{value}</span>
      ) : (
        <span className='text-sm text-slate-400'>Unavailable</span>
      )}
    </li>
  );
}
