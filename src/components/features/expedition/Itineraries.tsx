import { useState } from 'react';

import { TItinerary } from '@/lib/type';
import H3Heading from './H3Heading';
import Itinerary from './Itinerary';
import Dialog from './ItineraryDialog';
import Tab from './ItineraryTab';

type Props = { itineraries: TItinerary[] };

export default function Itineraries({ itineraries }: Props) {
  const [index, setIndex] = useState(0);

  return (
    <section className='w-full' aria-label='Itineraries'>
      <div className='mx-auto flex max-w-screen-lg flex-col px-4 py-8 md:py-16'>
        <H3Heading text='Available Itineraries' />

        <p className='mb-4 pr-4 text-base/7 md:w-1/2'>
          Our portfolio of immersive itineraries allows you to choose where and
          how you&apos;d like to explore the Antarctic with the best expedition
          team available.
        </p>

        <div className='hidden md:grid md:grid-cols-4 md:gap-4'>
          <ul>
            {itineraries.map(({ name, startPort }, i) => (
              <Tab
                key={`itinerary_btn_${i}`}
                index={i}
                name={name}
                startPort={startPort}
                isSelected={i === index}
                isLastTab={i + 1 < itineraries.length}
                handleClick={() => setIndex(i)}
              />
            ))}
          </ul>

          <Itinerary itinerary={itineraries[index]} className='md:col-span-3' />
        </div>

        <div className='md:hidden'>
          <Dialog
            itineraries={itineraries}
            index={index}
            handleClick={(i: number) => setIndex(i)}
          />
        </div>
      </div>
    </section>
  );
}
