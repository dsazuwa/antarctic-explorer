import { ChevronRightIcon, HamburgerMenuIcon } from '@radix-ui/react-icons';
import Link from 'next/link';

import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';

function NavDrawer() {
  return (
    <Sheet>
      <SheetTrigger className='ml-2 mr-4 flex items-center sm:hidden'>
        <HamburgerMenuIcon />
      </SheetTrigger>

      <SheetContent side='left' className='w-[200px]'>
        <div className='h-14 bg-primary-foreground' />

        <div className='flex flex-col'>
          <Link
            href='/cruiseLines'
            className='flex flex-row items-center justify-between p-4 text-sm font-semibold capitalize text-navy transition-colors hover:text-navy/80'
          >
            <div>Cruise Lines</div>
            <ChevronRightIcon />
          </Link>

          <Link
            href='/expeditions'
            className='flex flex-row items-center justify-between p-4 text-sm font-semibold capitalize text-navy transition-colors hover:text-navy/80'
          >
            <div>Expeditions</div>
            <ChevronRightIcon />
          </Link>
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default NavDrawer;
