import { Cross1Icon } from '@radix-ui/react-icons';
import clsx from 'clsx';
import { useEffect, useState } from 'react';

import { Sheet, SheetContent } from '@/components/ui/sheet';
import useWindowWidth from '@/hooks/useWindowWidth';
import { TItinerary } from '@/lib/type';
import Itinerary from './Itinerary';
import Tab from './ItineraryTab';

type Props = {
  itineraries: TItinerary[];
  index: number;
  handleClick: (i: number) => void;
};

export default function ItineraryDialog({
  itineraries,
  index,
  handleClick,
}: Props) {
  const [open, setOpen] = useState(false);
  const windowWidth = useWindowWidth();
  const maxWidth = 768;

  useEffect(() => {
    if (windowWidth && windowWidth > maxWidth) setOpen(false);
  }, [windowWidth]);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <ul>
        {itineraries.map(({ name, startPort }, i) => (
          <Tab
            key={`itinerary_btn_${i}`}
            index={i}
            name={name}
            startPort={startPort}
            isSelected={i === index}
            isLastTab={i + 1 < itineraries.length}
            handleClick={() => {
              handleClick(i);
              setOpen(true);
            }}
          />
        ))}
      </ul>

      <SheetContent
        side='custom'
        className={clsx(
          'flex max-h-screen w-screen flex-col overflow-y-scroll bg-white',
          {
            'inset-y-0 right-0 border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right':
              windowWidth !== undefined && windowWidth <= maxWidth,
          },
        )}
      >
        <div className='px-4'>
          <div className='fixed top-0 z-10 flex w-full items-center bg-white py-6'>
            <button onClick={() => setOpen(false)}>
              <Cross1Icon className='h-4 w-4' />
            </button>
          </div>

          <Itinerary
            className='mt-[64px] space-y-4 py-2 pb-6'
            itinerary={itineraries[index]}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
}
