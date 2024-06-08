type Props = {
  label: string;
  value: string | null;
};

export default function InfoDisplay({ label, value }: Props) {
  return (
    <li className='flex max-w-36 flex-col gap-1 font-semibold'>
      <span className='body-sm text-slate-400'>{label}</span>

      {value ? (
        <span className='body'>{value}</span>
      ) : (
        <span className='body text-slate-400'>Unavailable</span>
      )}
    </li>
  );
}
