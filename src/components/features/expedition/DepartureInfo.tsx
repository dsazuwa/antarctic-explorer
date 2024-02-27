type Props = {
  label: string;
  value?: string;
};

export default function DepartureInfo({ label, value }: Props) {
  return (
    <li className='flex flex-col space-y-0.5 font-semibold'>
      <div className='text-xs text-slate-400'>{label}</div>
      {value ? (
        <div className='text-sm'>{value}</div>
      ) : (
        <div className='text-sm text-slate-400'>Unavailable</div>
      )}
    </li>
  );
}
