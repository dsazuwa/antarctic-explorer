import { ArrowRightIcon } from '@radix-ui/react-icons';
import Link from 'next/link';

import Expedition from '@/components/common/Expedition';
import { TExpedition } from '@/lib/type';

type Props = { expeditions: TExpedition[] };

export default function Expeditions({ expeditions }: Props) {
  return (
    <section className='w-full' aria-label='Itineraries'>
      <div className='mx-auto flex max-w-screen-lg flex-col gap-4 px-4 py-8 md:py-12'>
        <h2 className='text-lg font-bold text-sky-900 md:text-xl'>
          Other Expeditions
        </h2>

        <ul className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
          {expeditions.map((expedition, i) => (
            <Expedition key={`other-expedition-${i}`} expedition={expedition} />
          ))}
        </ul>

        <div className='flex justify-center'>
          <Link
            className='group flex flex-row items-center justify-center gap-2 rounded-[32px] border border-sky-800/50 stroke-sky-800 px-4 py-2 text-center text-xs font-extrabold text-sky-800 transition-colors hover:border-sky-800 hover:shadow-md focus:bg-sky-800 focus:stroke-white focus:text-white md:text-sm'
            href={`/?cruiseLines=${encodeURIComponent(expeditions[0].cruiseLine)}`}
          >
            See More
            <ArrowRightIcon />
          </Link>
        </div>
      </div>
    </section>
  );
}
