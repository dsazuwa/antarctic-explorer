import { TVessel } from '@/lib/type';
import Vessel from './Vessel';

type VesselsProps = {
  vessels: {
    [id: number]: TVessel;
  };
};

export default function Vessels({ vessels }: VesselsProps) {
  return (
    <section className='w-full' aria-label='Ships'>
      <div className='mx-auto flex max-w-screen-lg flex-col px-4 py-8 md:py-12'>
        <h2 className='mb-2 text-lg font-bold text-sky-900 md:text-xl'>
          Ships
        </h2>

        <div className='space-y-10'>
          {Object.entries(vessels).map(([id, vessel]) => (
            <Vessel key={id} id={Number(id)} vessel={vessel} />
          ))}
        </div>
      </div>
    </section>
  );
}
