import { Metadata } from 'next';

import Expeditions from '@/components/expeditions';
import Navbar from '@/components/layout/nav';
import { SearchParams } from '@/lib/type';

export default function HomePage({
  searchParams,
}: {
  searchParams?: SearchParams;
}) {
  return (
    <>
      <Navbar className='lg:fixed lg:z-10' />

      <Expeditions searchParams={searchParams} />
    </>
  );
}

export const metadata: Metadata = {
  title: 'Antarctic Explorer',
  description:
    'Embark on an Antarctic adventure with Antarctica Explorer. Discover curated expeditions to Antarctica sourced from renowned expedition cruise lines, such as Lindblad and Quark Expeditions. Explore the wonders of the icy continent through our comprehensive selection of voyages, offering unforgettable experiences amidst breathtaking landscapes and unique wildlife encounters.',
};
