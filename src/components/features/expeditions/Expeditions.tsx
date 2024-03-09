import { ValueNoneIcon } from '@radix-ui/react-icons';

import useExpeditions from '@/hooks/useExpeditions';
import Expedition from './Expedition';

export default function Expeditions() {
  const data = useExpeditions();

  return data.length === 0 ? (
    <div className='flex w-full flex-col items-center justify-center gap-3 p-4 text-center font-semibold text-gray-300 sm:flex-row'>
      <ValueNoneIcon className='h-10 w-10' />

      <span className='max-w-64 lg:text-lg'>
        No results. Try adjusting your search by removing filters.
      </span>
    </div>
  ) : (
    <ol
      id='expeditions-list'
      className='grid w-full grid-cols-1 gap-4 sm:grid-cols-2'
    >
      {data.map((expedition, index) => (
        <Expedition key={'expedition' + index} expedition={expedition} />
      ))}
    </ol>
  );
}
