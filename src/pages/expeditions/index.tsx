import getLayout from '@/Layout';
import BottomNavigation from '@/components/BottomNavigation';
import Expeditions from '@/components/Expeditions';
import FilterChips from '@/components/FilterChips';
import Loader from '@/components/Loader';
import MobileFilterPanel from '@/components/MobileFilterPanel';
import SideFilterPanel from '@/components/SideFilterPanel';
import SortHeader from '@/components/SortHeader';
import useInitializeData from '@/hooks/useGetData';

export default function ExpeditionPage() {
  const isLoading = useInitializeData();

  return (
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

          <SortHeader />

          {isLoading ? <Loader /> : <Expeditions />}

          <BottomNavigation />
        </div>
      </div>
    </div>
  );
}

ExpeditionPage.getLayout = getLayout;
