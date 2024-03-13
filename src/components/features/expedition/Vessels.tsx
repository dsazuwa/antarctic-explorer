import { TVessel } from '@/lib/type';
import Vessel from './Vessel';

export default function Vessels({ vessels }: { vessels: TVessel[] }) {
  return (
    <section className='w-full' aria-label='Ships'>
      <div className='mx-auto flex max-w-screen-lg flex-col px-4 py-8 md:py-12'>
        <h2 className='mb-2 text-lg font-bold text-sky-900 md:text-xl'>
          Ships
        </h2>

        <div className='space-y-10'>
          {vessels.map((vessel) => (
            <Vessel key={`vessel-${vessel.id}`} vessel={vessel} />
          ))}
        </div>
      </div>
    </section>
  );
}
