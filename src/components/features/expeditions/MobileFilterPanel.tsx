import { Cross2Icon, MixerHorizontalIcon } from '@radix-ui/react-icons';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import useWindowWidth from '@/hooks/useWindowWidth';
import ClearFilterButton from './ClearFilterButton';
import FilterPanel from './FilterPanel';

function MobileFilterPanel() {
  const [open, setOpen] = useState(false);
  const windowWidth = useWindowWidth();

  useEffect(() => {
    if (windowWidth && windowWidth >= 1024) setOpen(false);
  }, [windowWidth]);

  return (
    <div className='flex flex-row justify-between py-2 text-xxs font-semibold sm:text-xs lg:hidden'>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button
            variant='outline'
            className='h-[32px] w-20 gap-2 rounded-md capitalize'
          >
            <MixerHorizontalIcon />
            <span>Filter</span>
          </Button>
        </SheetTrigger>

        <SheetContent
          side='custom'
          className='inset-y-0 left-0 flex h-full w-3/4 w-screen flex-col border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm'
        >
          <div className='text-md flex items-center justify-between bg-primary-foreground p-4 font-semibold'>
            <span>Filter</span>

            <SheetClose className='rounded-sm opacity-70 transition-opacity hover:opacity-100'>
              <Cross2Icon className='h-4 w-4' />
              <span className='sr-only'>Close</span>
            </SheetClose>
          </div>

          <div className='px-2 pb-4'>
            <FilterPanel />
          </div>
        </SheetContent>
      </Sheet>

      <ClearFilterButton />
    </div>
  );
}

export default MobileFilterPanel;
