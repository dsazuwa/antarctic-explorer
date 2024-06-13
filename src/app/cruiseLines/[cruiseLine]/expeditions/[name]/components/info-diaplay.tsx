type Props = {
  label: string;
  value: string | null;
};

export default function InfoDisplay({ label, value }: Props) {
  return (
    <li className='flex flex-col gap-1 text-sm/5 font-semibold'>
      <span className='text-xs text-slate-400'>{label}</span>

      {value ? (
        <span>{value}</span>
      ) : (
        <span className='text-slate-400'>Unavailable</span>
      )}
    </li>
  );
}
