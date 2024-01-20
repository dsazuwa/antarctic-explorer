import type { GetStaticProps } from 'next';

import getLayout from '@/Layout';
import BottomNavigation from '@/components/BottomNavigation';
import ExpeditionSortHeader from '@/components/ExpeditionSortHeader';
import Expeditions from '@/components/Expeditions';
import useExpeditions from '@/reducers/useExpeditions';
import { NAVBAR_HEIGHT } from '@/styles/styles';
import { TCruiseLinesAndExpeditions } from '@/type';
import MobileFilterPanel from '@/components/MobileFilterPanel';

export default function Home({ expeditions }: TCruiseLinesAndExpeditions) {
  const {
    filteredExpeditions,
    currentPage,
    itemsPerPageOptions,
    totalPages,
    setItemsPerPage,
    previousPage,
    nextPage,
    sortExpeditions,
  } = useExpeditions(expeditions);

  return (
    <div className='ml-auto mr-auto w-full max-w-screen-lg'>
      <div
        className={`h-[${NAVBAR_HEIGHT}px] flex items-center justify-center p-2 text-base font-bold sm:p-4 sm:text-lg md:text-xl`}
      >
        Expeditions
      </div>

      <div className='flex flex-row'>
        <div
          id='side-panel'
          className='hidden w-[304px] bg-gray-400 p-2 lg:inline'
        ></div>

        <div id='main-panel' className='w-full px-4 lg:space-y-0 lg:px-2'>
          <MobileFilterPanel />

          <ExpeditionSortHeader
            numExpeditions={expeditions.length}
            sortExpeditions={sortExpeditions}
          />

          <Expeditions expeditions={filteredExpeditions} />

          <BottomNavigation
            options={itemsPerPageOptions}
            currentPage={currentPage}
            totalPages={totalPages}
            handlePreviousPage={previousPage}
            handleNextPage={nextPage}
            setItemsPerPage={setItemsPerPage}
          />
        </div>
      </div>
    </div>
  );
}

export const getStaticProps = (async () => {
  const res = await fetch(process.env.NEXT_PUBLIC_API_URL || '');
  const { cruiseLines, expeditions } = await res.json();

  return { props: { cruiseLines, expeditions } };
}) satisfies GetStaticProps<TCruiseLinesAndExpeditions>;

Home.getLayout = getLayout;
