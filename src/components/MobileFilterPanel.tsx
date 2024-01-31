import { Cross2Icon, MixerHorizontalIcon } from '@radix-ui/react-icons';
import { useEffect, useState } from 'react';

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import useWindowWidth from '@/hooks/useWindowWidth';
import ClearFilters from './ClearFilters';
import FilterPanel from './FilterPanel';
import { Button } from './ui/button';

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

        <SheetContent side='left' className='flex w-screen flex-col'>
          <div>
            <div className='text-md flex items-center justify-between bg-primary-foreground p-4 font-semibold'>
              Filter
              <SheetClose className='rounded-sm opacity-70 transition-opacity hover:opacity-100'>
                <Cross2Icon className='h-4 w-4' />
                <span className='sr-only'>Close</span>
              </SheetClose>
            </div>

            <div className='px-2'>
              <FilterPanel />
            </div>
          </div>

          <div className='mx-auto mt-auto flex w-full flex-row justify-center bg-primary-foreground p-4'>
            <SheetClose asChild>
              <Button
                type='submit'
                variant='white'
                className='mr-3 px-8 uppercase'
              >
                Clear all filters
              </Button>
            </SheetClose>

            <SheetClose asChild>
              <Button type='submit' className='px-8 uppercase'>
                Apply filters
              </Button>
            </SheetClose>
          </div>
        </SheetContent>
      </Sheet>

      <ClearFilters />
    </div>
  );
}

export default MobileFilterPanel;
