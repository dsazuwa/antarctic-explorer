import type { GetStaticProps } from 'next';

import getLayout from '@/Layout';
import BottomNavigation from '@/components/BottomNavigation';
import Expeditions from '@/components/Expeditions';
import MobileFilterPanel from '@/components/MobileFilterPanel';
import SideFilterPanel from '@/components/SideFilterPanel';
import SortHeader from '@/components/SortHeader';
import { NAVBAR_HEIGHT } from '@/styles/styles';
import { TCruiseLinesAndExpeditions } from '@/type';

export default function Home({
  expeditions,
  cruiseLines,
}: TCruiseLinesAndExpeditions) {
  const {
    filteredExpeditions,
    currentPage,
    itemsPerPageOptions,
    totalPages,
    selectedSortOption,
    selectedItemsPerPageOption,
    setItemsPerPage,
    previousPage,
    nextPage,
    sortExpeditions,
  } = useExpeditions(expeditions);

  return (
    <div className='ml-auto mr-auto w-full max-w-screen-lg'>
      <div
        className={`h-[${NAVBAR_HEIGHT}px] flex items-center justify-center p-2 text-base font-bold text-navy sm:p-4 sm:text-lg md:text-xl`}
      >
        Expeditions
      </div>

      <div className='flex flex-row'>
        <SideFilterPanel cruiseLines={Object.keys(cruiseLines)} />

        <div
          id='main-panel'
          className='px-4 lg:w-[calc(100%-304px)] lg:space-y-0 lg:px-2'
        >
          <MobileFilterPanel />

          <SortHeader
            numExpeditions={expeditions.length}
            selectedOption={selectedSortOption}
            sortExpeditions={sortExpeditions}
          />

          <Expeditions
            expeditions={filteredExpeditions}
            cruiseLines={cruiseLines}
          />

          <BottomNavigation
            options={itemsPerPageOptions}
            currentPage={currentPage}
            totalPages={totalPages}
            selectedOption={selectedItemsPerPageOption}
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
