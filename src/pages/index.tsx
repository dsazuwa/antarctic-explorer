import type { GetStaticProps } from 'next';

import getLayout from '@/Layout';
import BottomNavigation from '@/components/BottomNavigation';
import Expeditions from '@/components/Expeditions';
import MobileFilterPanel from '@/components/MobileFilterPanel';
import SideFilterPanel from '@/components/SideFilterPanel';
import SortHeader from '@/components/SortHeader';
import useExpeditions from '@/hooks/useExpeditions';
import { TCruiseLinesAndExpeditions } from '@/type';

export default function Home({
  expeditions: rawExpeditions,
  cruiseLines,
}: TCruiseLinesAndExpeditions) {
  const {
    expeditions,
    numExpeditions,
    currentPage,
    totalPages,
    selectedSortOption,
    selectedItemsPerPageOption,
    cruiseLineOptions,
    filters,
    setItemsPerPage,
    previousPage,
    nextPage,
    sortExpeditions,
    filterByCruiseLine,
    filterByDuration,
  } = useExpeditions(rawExpeditions, cruiseLines);

  return (
    <div className='mx-auto w-full max-w-screen-lg'>
      <div
        className={`flex h-14 items-center justify-center p-2 text-base font-bold text-navy sm:p-4 sm:text-lg md:text-xl`}
      >
        Expeditions
      </div>

      <div className='lg:flex lg:flex-row'>
        <SideFilterPanel
          cruiseLineOptions={cruiseLineOptions}
          filters={filters}
          filterByCruiseLine={filterByCruiseLine}
          filterByDuration={filterByDuration}
        />

        <div
          id='main-panel'
          className='px-4 lg:w-[calc(100%-300px)] lg:space-y-0 lg:px-2'
        >
          <MobileFilterPanel
            cruiseLineOptions={cruiseLineOptions}
            filters={filters}
            filterByCruiseLine={filterByCruiseLine}
            filterByDuration={filterByDuration}
          />

          <SortHeader
            numExpeditions={numExpeditions}
            selectedOption={selectedSortOption}
            sortExpeditions={sortExpeditions}
          />

          <Expeditions expeditions={expeditions} cruiseLines={cruiseLines} />

          <BottomNavigation
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
