import { Metadata } from 'next';

import Footer from '@/components/layout/footer';
import Navbar from '@/components/layout/nav';
import {
  ClearFilters,
  ExpeditionsGrid,
  FilterChips,
  FilterPanel,
  MobileFilterPanel,
  PaginationControls,
  PaginationHeader,
} from '@/components/expeditions';
import { fetchExpeditions } from '@/lib/data';
import { SearchParams } from '@/lib/type';

type Props = { searchParams?: SearchParams };

export default async function HomePage({ searchParams }: Props) {
  const { currentPage, totalPages, itemsPerPage, totalItems } =
    await fetchExpeditions(searchParams);

  return (
    <>
      <Navbar className='lg:fixed lg:z-10' />

      <div className='grid h-full flex-grow bg-white px-6 lg:container lg:grid-cols-3 lg:gap-24 xl:grid-cols-4'>
        <div className='hidden h-full py-4 text-xxs lg:sticky lg:top-16 lg:col-span-1 lg:flex lg:h-[calc(100vh-64px)] lg:flex-col lg:gap-6 lg:overflow-y-auto lg:py-8 xl:col-span-1'>
          <div className='flex w-full justify-end'>
            <ClearFilters />
          </div>

          <FilterPanel />
        </div>

        <div className='col-span-4 flex h-full w-full flex-col gap-2 py-4 lg:col-span-2 lg:pt-16 xl:col-span-3'>
          <h1 className='heading-2 my-2.5 text-center font-bold text-navy'>
            Expeditions
          </h1>

          <MobileFilterPanel />

          <FilterChips />

          <PaginationHeader
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
            totalItems={totalItems}
          />

          <ExpeditionsGrid searchParams={searchParams} />

          <div className='mt-auto'>
            <PaginationControls
              currentPage={currentPage}
              totalPages={totalPages}
              itemsPerPage={itemsPerPage}
            />

            <Footer />
          </div>
        </div>
      </div>
    </>
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
