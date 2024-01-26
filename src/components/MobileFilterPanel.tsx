import { MixerHorizontalIcon } from '@radix-ui/react-icons';
import { ChangeEventHandler, useEffect, useState } from 'react';

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import useWindowWidth from '@/hooks/useWindowWidth';
import { BasicFilterOption, FilterState } from '@/type';
import ClearFilters from './ClearFilters';
import FilterPanel from './FilterPanel';
import { Button } from './ui/button';

type Props = {
  cruiseLineOptions: BasicFilterOption;
  filters: FilterState;
  filterByCruiseLine: ChangeEventHandler<HTMLInputElement>;
  filterByDuration: ChangeEventHandler<HTMLInputElement>;
};

function MobileFilterPanel({
  cruiseLineOptions,
  filters,
  filterByCruiseLine,
  filterByDuration,
}: Props) {
  const disabled = true;
  const [open, setOpen] = useState(false);
  const windowWidth = useWindowWidth();

  useEffect(() => {
    if (windowWidth && windowWidth >= 1024) setOpen(false);
  }, [windowWidth]);

  return (
    <div className='flex flex-row justify-between py-2 text-xxs font-semibold sm:text-xs lg:hidden'>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button className='flex flex-row items-center bg-white' size='xs'>
            <MixerHorizontalIcon className='mr-2 text-muted-foreground' />
            <div className='text-muted-foreground'>Filter</div>
          </Button>
        </SheetTrigger>

        <SheetContent className='h-full w-screen'>
          <SheetHeader>
            <SheetTitle className='border-bottom border-b-2 border-solid pb-4 text-xl'>
              Filter
            </SheetTitle>
          </SheetHeader>

          <div>
            <FilterPanel
              cruiseLineOptions={cruiseLineOptions}
              filters={filters}
              filterByCruiseLine={filterByCruiseLine}
              filterByDuration={filterByDuration}
            />
          </div>

          <div className='mx-auto mt-auto flex w-full flex-row justify-center p-4'>
            <SheetClose asChild>
              <Button
                type='submit'
                className='mr-3 rounded-2xl bg-primary-foreground/20 px-8 uppercase transition-colors hover:bg-primary-foreground'
              >
                <div className='text-primary'>Clear all filters</div>
              </Button>
            </SheetClose>

            <SheetClose asChild>
              <Button type='submit' className='rounded-2xl px-10 uppercase'>
                Apply filters
              </Button>
            </SheetClose>
          </div>
        </SheetContent>
      </Sheet>

      <ClearFilters disabled={disabled} />
    </div>
  );
}

export default MobileFilterPanel;
