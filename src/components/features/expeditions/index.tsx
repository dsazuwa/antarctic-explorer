import ExpeditionsGrid from './ExpeditionsGrid';
import FilterChips from './FilterChips';
import MobileFilterPanel from './MobileFilterPanel';
import PaginationControls from './PaginationControls';
import PaginationHeader from './PaginationHeader';
import SideFilterPanel from './SideFilterPanel';

export default function Expeditions() {
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

          <PaginationHeader />

          <ExpeditionsGrid />

          <PaginationControls />
        </div>
      </div>
    </main>
  );
}
