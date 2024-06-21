import { Metadata } from 'next';

import {
  ExpeditionsGrid,
  FilterChips,
  MobileFilterPanel,
  PaginationControls,
  PaginationHeader,
} from '@/components/expeditions';
import SideFilterPanel from '@/components/expeditions/filter-panel-side';
import Footer from '@/components/layout/footer';
import Navbar from '@/components/layout/nav';
import getExpeditions from '@/lib/data/get-expeditions';
import { getExpeditionsParams } from '@/lib/param.utils';
import { SearchParams } from '@/lib/type';

export default async function HomePage({
  searchParams,
}: {
  searchParams?: SearchParams;
}) {
  const { expeditions, page, totalPages, size, totalItems } =
    await getExpeditions(getExpeditionsParams(searchParams || {}));

  return (
    <>
      <Navbar className='lg:fixed lg:z-10' />

      <div className='grid h-full flex-grow px-6 lg:container lg:grid-cols-3 lg:gap-12 xl:grid-cols-4'>
        <SideFilterPanel />

        <main className='col-span-4 flex h-full w-full flex-col gap-6 pt-6 lg:col-span-2 lg:pt-24 xl:col-span-3'>
          <h1 className='heading-2 text-center font-bold text-navy'>
            Expeditions
          </h1>

          <MobileFilterPanel />

          <FilterChips />

          <PaginationHeader page={page} size={size} totalItems={totalItems} />

          <ExpeditionsGrid expeditions={expeditions} />

          <div className='mt-auto space-y-8 pt-2'>
            <PaginationControls
              page={page}
              totalPages={totalPages}
              size={size}
            />

            <Footer />
          </div>
        </main>
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
