import { useState } from 'react';

import { TExtension } from '@/lib/type';
import { ArrowDownIcon } from '@radix-ui/react-icons';
import Extension from './Extension';

type Props = { extensions: TExtension[] };

export default function Extensions({ extensions }: Props) {
  const [showAll, setShowAll] = useState(false);
  const renderedData = showAll ? extensions : extensions.slice(0, 3);

  return (
    <section aria-label='Expedition Extensions'>
      <div className='mx-auto flex max-w-screen-lg flex-col gap-4 px-4 py-8 md:py-12'>
        <h2 className='mb-2 text-lg font-bold text-sky-900 md:text-xl'>
          Expedition Extensions
        </h2>

        <ul className='mt-auto grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
          {renderedData.map((extension, i) => (
            <Extension key={`extension-${i}`} extension={extension} />
          ))}
        </ul>

        {!showAll && extensions.length > 3 && (
          <div className='flex justify-center'>
            <button
              className='group inline-flex items-center justify-center gap-2 rounded-[32px] border border-sky-800/50 stroke-sky-800 px-4 py-2 text-center text-xs font-extrabold text-sky-800 transition-colors hover:border-sky-800 hover:shadow-md focus:bg-sky-800 focus:stroke-white focus:text-white md:text-sm'
              onClick={() => setShowAll(true)}
            >
              Show All
              <ArrowDownIcon />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
