import { Cross2Icon, MixerHorizontalIcon } from '@radix-ui/react-icons';
import clsx from 'clsx';
import { useEffect, useState } from 'react';

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import useWindowWidth from '@/hooks/useWindowWidth';
import ClearFilterButton from './ClearFilterButton';
import FilterPanel from './FilterPanel';
import { Button } from '../../ui/button';

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
          <Button variant='white' size='xs'>
            <MixerHorizontalIcon className='mr-2 text-muted-foreground' />
            <div className='text-muted-foreground'>Filter</div>
          </Button>
        </SheetTrigger>

        <SheetContent
          side='custom'
          className={clsx('flex w-screen flex-col', {
            'inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom':
              windowWidth !== undefined && windowWidth < 640,
            'inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm':
              windowWidth !== undefined && windowWidth >= 640,
          })}
        >
          <div>
            <div className='text-md flex items-center justify-between bg-primary-foreground p-4 font-semibold'>
              Filter
              <SheetClose className='rounded-sm opacity-70 transition-opacity hover:opacity-100'>
                <Cross2Icon className='h-4 w-4' />
                <span className='sr-only'>Close</span>
              </SheetClose>
            </div>

            <div className='px-2 pb-4'>
              <FilterPanel />
            </div>
          </div>
        </SheetContent>
      </Sheet>

      <ClearFilterButton />
    </div>
  );
}

export default MobileFilterPanel;
