import { Metadata } from 'next';

import ExpeditionsGrid from '@/components/expeditions/ExpeditionsGrid';
import FilterChips from '@/components/expeditions/FilterChips';
import MobileFilterPanel from '@/components/expeditions/MobileFilterPanel';
import PaginationControls from '@/components/expeditions/PaginationControls';
import PaginationHeader from '@/components/expeditions/PaginationHeader';
import SideFilterPanel from '@/components/expeditions/SideFilterPanel';
import { fetchExpeditions } from '@/lib/data';
import { SearchParams } from '@/lib/type';

type Props = { searchParams?: SearchParams };

export default async function HomePage({ searchParams }: Props) {
  const { currentPage, totalPages, itemsPerPage, totalItems } =
    await fetchExpeditions(searchParams);

  return (
    <main className='mx-auto flex h-full w-full max-w-screen-lg flex-grow flex-col bg-white'>
      <h1 className='my-2.5 text-center font-bold text-navy sm:text-lg'>
        Expeditions
      </h1>

      <div className='flex flex-grow flex-col gap-4 md:grid md:grid-cols-3 lg:p-2'>
        <SideFilterPanel />

        <div
          id='main-panel'
          className='col-span-4 flex h-full w-full flex-col gap-2 px-4 lg:col-span-2 lg:px-0'
        >
          <MobileFilterPanel />

          <FilterChips />

          <PaginationHeader
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
            totalItems={totalItems}
          />

          <ExpeditionsGrid searchParams={searchParams} />

          <PaginationControls
            currentPage={currentPage}
            totalPages={totalPages}
            itemsPerPage={itemsPerPage}
          />
        </div>
      </div>
    </main>
  );
}

export const metadata: Metadata = {
  title: 'Antarctic Explorer',
  description:
    'Embark on an Antarctic adventure with Antarctica Explorer. Discover curated expeditions to Antarctica sourced from renowned expedition cruise lines, such as Lindblad and Quark Expeditions. Explore the wonders of the icy continent through our comprehensive selection of voyages, offering unforgettable experiences amidst breathtaking landscapes and unique wildlife encounters.',
};

// {isLoading && (
//   <div className='fixed bottom-0 left-0 right-0 top-0 z-50 flex bg-[hsla(0,0%,100%,0.5)]'>
//     <Loader className='my-auto' />
//   </div>
// )}
