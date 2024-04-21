import { ExpeditionsResponse } from '@/lib/type';
import ExpeditionsGrid from './ExpeditionsGrid';
import FilterChips from './FilterChips';
import MobileFilterPanel from './MobileFilterPanel';
import PaginationControls from './PaginationControls';
import PaginationHeader from './PaginationHeader';
import SideFilterPanel from './SideFilterPanel';

type Props = { expeditions: ExpeditionsResponse };

export default function Expeditions({ expeditions }: Props) {
  const { currentPage, totalPages, totalItems, itemsPerPage, data } =
    expeditions;

  return (
    <main className='mx-auto flex h-full w-full max-w-screen-lg flex-grow flex-col bg-white'>
      <div className='grid flex-grow grid-cols-3 gap-4 lg:px-2'>
        <SideFilterPanel />

        <div
          id='main-panel'
          className='col-span-4 flex h-full w-full flex-col gap-1 px-4 lg:col-span-2 lg:px-0'
        >
          <MobileFilterPanel />

          <FilterChips />

          <PaginationHeader
            currentPage={currentPage}
            totalItems={totalItems}
            itemsPerPage={itemsPerPage}
          />

          <ExpeditionsGrid expeditions={data} />

          <PaginationControls
            currentPage={currentPage}
            totalPages={totalPages}
            itemsPerPage={itemsPerPage}
          />
        </div>
      </div>
    </main>
  );
}
