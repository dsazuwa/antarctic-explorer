import { Cross1Icon } from '@radix-ui/react-icons';
import clsx from 'clsx';
import { useEffect, useState } from 'react';

import { TItinerary } from '@/lib/type';
import Itinerary from './Itinerary';

type Props = { itinerary: TItinerary; handleClose: () => void };

export default function ItemDialogContent({ itinerary, handleClose }: Props) {
  const [ready, setReady] = useState(true);
  const [scrolledPast, setScrolledPast] = useState(false);

  useEffect(() => {
    const appBar = document.querySelector('#dialog-app-bar');
    const observedElement = document.querySelector('#scroll-anchor');

    if (appBar == null || observedElement == null) {
      setReady(false);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        setScrolledPast(!entries[0].isIntersecting);
      },
      { threshold: 0, rootMargin: `-${appBar.clientHeight}px` },
    );

    observer.observe(observedElement);

    return () => {
      observer.disconnect();
    };
  }, [ready]);

  return (
    <>
      <div
        id='dialog-app-bar'
        className={clsx(
          'fixed flex w-full flex-row items-center gap-2 bg-white px-3 py-5',
          { 'border-b-2 border-solid border-gray-100': scrolledPast },
        )}
      >
        <button aria-label='close' onClick={handleClose}>
          <Cross1Icon className='h-7 w-7 stroke-sky-900 p-2' />
        </button>

        {scrolledPast && (
          <span className='mt-0.5 text-sm font-black text-sky-900'>
            {itinerary.name}
          </span>
        )}
      </div>

      <Itinerary
        className='mt-[64px] space-y-4 px-5 pb-6'
        itinerary={itinerary}
        nameElementId='scroll-anchor'
      />
    </>
  );
}
