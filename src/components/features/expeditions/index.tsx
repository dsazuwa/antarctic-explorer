import ExpeditionsGrid from './ExpeditionsGrid';
import FilterChips from './FilterChips';
import MobileFilterPanel from './MobileFilterPanel';
import PaginationControls from './PaginationControls';
import PaginationHeader from './PaginationHeader';
import SideFilterPanel from './SideFilterPanel';

export default function Expeditions() {
  return (
    <main className='mx-auto flex h-full w-full max-w-screen-lg flex-grow flex-col bg-white'>
      <div className='grid flex-grow grid-cols-3 gap-4 lg:p-2'>
        <SideFilterPanel />

        <div
          id='main-panel'
          className='col-span-4 flex h-full w-full flex-col gap-1 px-4 lg:col-span-2 lg:px-0'
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
