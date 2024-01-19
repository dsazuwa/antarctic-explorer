import { TExpedition } from '@/type';
import React from 'react';
import Expedition from './Expedition';

function Expeditions({ expeditions }: { expeditions: TExpedition[] }) {
  return (
    <div
      id='expeditions-list'
      className='mb-2 flex flex-col items-center space-y-6 overflow-y-auto'
    >
      {expeditions.map((expedition, index) => (
        <Expedition key={'expedition' + index} expedition={expedition} />
      ))}
    </div>
  );
}

export default Expeditions;
