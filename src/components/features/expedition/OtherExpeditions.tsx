import { ArrowRightIcon } from '@radix-ui/react-icons';

import { Button } from '@/components/ui/button';
import { TExpedition } from '@/lib/type';
import { Expedition } from '../expeditions';

type Props = { expeditions: TExpedition[] };

export default function Expeditions({ expeditions }: Props) {
  return (
    <section className='w-full' aria-label='Itineraries'>
      <div className='mx-auto max-w-screen-lg px-4 py-8 md:py-12'>
        <h2 className='mb-2 text-lg font-bold text-sky-900 md:text-xl'>
          Other Expeditions
        </h2>

        <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
          {expeditions.map((expedition, i) => (
            <Expedition key={`other-expedition-${i}`} expedition={expedition} />
          ))}
        </div>

        <span className='flex justify-center'>
          <Button className='mt-8 gap-2 gap-2 rounded-[32px] text-sm font-bold'>
            <span>See More</span>

            <ArrowRightIcon />
          </Button>
        </span>
      </div>
    </section>
  );
}
