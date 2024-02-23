import React from 'react';

type Props = {
  label: string;
  value: number;
};

export default function VesselDetail({ label, value }: Props) {
  return (
    <div className='flex flex-col items-center'>
      <div className='text-xs font-black text-sky-800/90'>{label}</div>
      <div className='text-lg font-semibold'>{value}</div>
    </div>
  );
}
