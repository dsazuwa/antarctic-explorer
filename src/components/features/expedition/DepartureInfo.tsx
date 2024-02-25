type Props = {
  label: string;
  value: string;
};

export default function DepartureInfo({ label, value }: Props) {
  return (
    <li className='flex flex-col font-semibold'>
      <div className='text-xs text-slate-400'>{label}</div>
      <div className='mt-0.5 text-sm'>{value}</div>
    </li>
  );
}
