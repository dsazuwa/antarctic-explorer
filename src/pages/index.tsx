import Head from 'next/head';

import Layout from '@/Layout';
import Loader from '@/components/common/Loader';
import {
  Expeditions,
  FilterChips,
  MobileFilterPanel,
  PaginationControls,
  PaginationHeader,
  SideFilterPanel,
} from '@/components/features/expeditions';
import useInitializeData from '@/hooks/useGetData';

export default function ExpeditionPage() {
  const isLoading = useInitializeData();

  return (
    <Layout>
      <Head>
        <title>Antarctica Explorer</title>
        <meta
          name='description'
          content='Embark on an Antarctic adventure with Antarctica Explorer. Discover curated expeditions to Antarctica sourced from renowned expedition cruise lines, such as Lindblad and Quark Expeditions. Explore the wonders of the icy continent through our comprehensive selection of voyages, offering unforgettable experiences amidst breathtaking landscapes and unique wildlife encounters.'
        />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <div className='bg-warm-gray-1 mx-auto w-full max-w-screen-lg'>
        <div className='flex h-10 items-center justify-center text-base font-bold text-navy sm:mb-1 sm:text-lg md:text-xl'>
          Expeditions
        </div>

        <div className='lg:flex lg:flex-row'>
          <SideFilterPanel />

          <div
            id='main-panel'
            className='px-4 lg:w-[calc(100%-300px)] lg:space-y-0 lg:px-2'
          >
            <MobileFilterPanel />

            <FilterChips />

            <PaginationHeader />

            {isLoading ? <Loader /> : <Expeditions />}

            <PaginationControls />
          </div>
        </div>
      </div>
    </Layout>
  );
}
