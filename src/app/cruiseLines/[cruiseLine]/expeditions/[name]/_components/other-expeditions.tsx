import { ArrowRightIcon } from '@radix-ui/react-icons';
import Link from 'next/link';

import Expedition from '@/components/expedition';
import { TExpedition } from '@/lib/type';

type Props = { expeditions: TExpedition[] };

export default function Expeditions({ expeditions }: Props) {
  return (
    <section className='w-full' aria-label='Itineraries'>
      <div className='mx-auto flex max-w-screen-lg flex-col gap-4 px-4 py-8 md:py-12'>
        <h2 className='heading-3 font-bold text-sky-900'>Other Expeditions</h2>

        <ul className='flex flex-col gap-6 sm:grid sm:grid-cols-2 lg:grid-cols-3'>
          {expeditions.map((expedition, i) => (
            <Expedition key={`other-expedition-${i}`} expedition={expedition} />
          ))}
        </ul>

        <div className='flex justify-center'>
          <Link
            className='body-sm group inline-flex items-center justify-center gap-2 rounded-[32px] border border-sky-800/50 stroke-sky-800 px-4 py-2 text-center font-extrabold text-sky-800 transition-colors hover:border-sky-800 hover:shadow-md focus:bg-sky-800 focus:stroke-white focus:text-white'
            href={`/?cruiseLines=${encodeURIComponent(expeditions[0].cruiseLine.name)}`}
          >
            See More
            <ArrowRightIcon />
          </Link>
        </div>
      </div>
    </section>
  );
}
