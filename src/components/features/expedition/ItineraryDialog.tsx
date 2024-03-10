import clsx from 'clsx';
import { useEffect, useState } from 'react';

import { Sheet, SheetContent } from '@/components/ui/sheet';
import useWindowWidth from '@/hooks/useWindowWidth';
import { TItinerary } from '@/lib/type';
import Content from './ItemDialogContent';
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
          'flex max-h-screen w-screen flex-col gap-0 overflow-y-scroll bg-white',
          {
            'inset-y-0 right-0 border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right':
              windowWidth !== undefined && windowWidth <= maxWidth,
          },
        )}
      >
        {open && (
          <Content
            handleClose={() => setOpen(false)}
            itinerary={itineraries[index]}
          />
        )}
      </SheetContent>
    </Sheet>
  );
}
