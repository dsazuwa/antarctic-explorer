import { TExpedition } from '@/lib/type';
import H3Heading from './H3Heading';
import Expedition from '../expeditions/Expedition';
import { Button } from '@/components/ui/button';

type Props = { expeditions: TExpedition[] };

export default function Expeditions({ expeditions }: Props) {
  return (
    <section className='w-full' aria-label='Itineraries'>
      <div className='mx-auto max-w-screen-lg px-4 py-8 md:py-16'>
        <H3Heading text='Other Expeditions' />

        <div className='grid grid-cols-1 gap-6 pt-3 sm:grid-cols-2 lg:grid-cols-3'>
          {expeditions.map((expedition, i) => (
            <Expedition key={`other-expedition-${i}`} expedition={expedition} />
          ))}
        </div>

        <span className='flex justify-center'>
          <Button className='mt-8 rounded-[32px] text-sm'>See More</Button>
        </span>
      </div>
    </section>
  );
}
