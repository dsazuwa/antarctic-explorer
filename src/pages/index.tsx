import getLayout from '@/Layout';
import BottomNavigation from '@/components/BottomNavigation';
import Expeditions from '@/components/Expeditions';
import MobileFilterPanel from '@/components/MobileFilterPanel';
import SideFilterPanel from '@/components/SideFilterPanel';
import SortHeader from '@/components/SortHeader';
import useInitializeData from '@/hooks/useGetData';

export default function Home() {
  const isLoading = useInitializeData();

  return (
    <div className='mx-auto w-full max-w-screen-lg'>
      <div className='flex h-14 items-center justify-center p-2 text-base font-bold text-navy sm:p-4 sm:text-lg md:text-xl'>
        Expeditions
      </div>

      <div className='lg:flex lg:flex-row'>
        <SideFilterPanel />

        <div
          id='main-panel'
          className='px-4 lg:w-[calc(100%-300px)] lg:space-y-0 lg:px-2'
        >
          <MobileFilterPanel />

          <SortHeader />

          {isLoading ? <></> : <Expeditions />}

          <BottomNavigation />
        </div>
      </div>
    </div>
  );
}

Home.getLayout = getLayout;
