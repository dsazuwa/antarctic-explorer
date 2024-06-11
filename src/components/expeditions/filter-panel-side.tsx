'use client';

import { ScrollArea } from '../ui/scroll-area';
import ClearFilters from './clear-filters';
import FilterPanel from './filter-panel';

export default function SideFilterPanel() {
  return (
    <aside className='top-[5rem] h-[calc(100vh-6rem)] w-full max-lg:hidden md:sticky'>
      <ScrollArea className='relative h-full overflow-hidden pr-6'>
        <div className='flex flex-col gap-6 py-6'>
          <div className='flex w-full justify-end'>
            <ClearFilters />
          </div>

          <FilterPanel />
        </div>
      </ScrollArea>
    </aside>
  );
}
