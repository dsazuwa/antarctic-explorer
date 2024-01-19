import React from 'react';

import { TExpedition } from '@/type';

function Expedition({ expedition }: { expedition: TExpedition }) {
  const { name, photoUrl } = expedition;

  return (
    <div
      id='card'
      className='flex w-full flex-col rounded-md bg-white shadow sm:h-[240px] sm:flex-row'
    >
      <img
        id='card-image'
        className='sm:max-w-5/12 h-[240px] rounded-t-md object-cover sm:h-full sm:w-5/12 sm:rounded-none sm:rounded-l-md'
        src={photoUrl}
        alt={name}
      />

      <div id='card-content' className='h-[160px] p-2 sm:flex-1'>
        <div className='line-clamp-2 text-center text-[12px] font-semibold text-navy'>
          {name}
        </div>
      </div>
    </div>
  );
}

export default Expedition;
