'use client';

import { Cross2Icon, MixerHorizontalIcon } from '@radix-ui/react-icons';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import { useMediaQuery } from '@/hooks/use-media-query';
import ClearFilters from './clear-filters';
import FilterPanel from './filter-panel';

export default function MobileFilterPanel() {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery('(min-width: 1024px)');

  useEffect(() => {
    if (isDesktop) setOpen(false);
  }, [isDesktop]);

  return (
    <div className='inline-flex flex-wrap justify-between gap-6 font-semibold lg:hidden'>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant='outline' className='gap-2'>
            <MixerHorizontalIcon className='h-4 w-4 shrink-0' />
            <span className='mt-0.5'>Filter</span>
          </Button>
        </SheetTrigger>

        <SheetContent
          side='custom'
          className='inset-y-0 left-0 flex max-h-screen w-screen flex-col overflow-y-auto border-r bg-white data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:w-1/2'
        >
          <div className='body-sm flex items-center justify-between bg-primary-foreground p-4 font-semibold'>
            <span>Filter</span>

            <SheetClose className='rounded-sm opacity-70 transition-opacity hover:opacity-100'>
              <Cross2Icon className='h-4 w-4' />
              <span className='sr-only'>Close</span>
            </SheetClose>
          </div>

          <div className='space-y-6 p-4'>
            <FilterPanel />
          </div>
        </SheetContent>
      </Sheet>

      <ClearFilters />
    </div>
  );
}
