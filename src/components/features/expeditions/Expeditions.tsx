import { ValueNoneIcon } from '@radix-ui/react-icons';

import useExpeditions from '@/hooks/useExpeditions';
import Expedition from './Expedition';

export default function Expeditions() {
  const data = useExpeditions();

  return data.length === 0 ? (
    <div className='flex flex-row items-center justify-center gap-3 p-4 font-semibold text-gray-300'>
      <ValueNoneIcon className='h-10 w-10' />

      <span className='max-w-64 lg:text-lg'>
        No results. Try adjusting your search by removing filters.
      </span>
    </div>
  ) : (
    <div
      id='expeditions-list'
      className='grid grid-cols-1 gap-4 py-1 sm:grid-cols-2'
    >
      {data.map((expedition, index) => (
        <Expedition key={'expedition' + index} expedition={expedition} />
      ))}
    </div>
  );
}
