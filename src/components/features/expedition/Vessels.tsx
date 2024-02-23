import { Vessel as TVessel } from '@/lib/type';
import H3Heading from './H3Heading';
import Vessel from './Vessel';

type VesselsProps = {
  vessels: {
    [id: number]: TVessel;
  };
};

export default function Vessels({ vessels }: VesselsProps) {
  return (
    <section className='w-full' aria-label='Ships'>
      <div className='mx-auto flex max-w-screen-lg flex-col p-4'>
        <H3Heading text='Ships' />

        <div className='space-y-10'>
          {Object.entries(vessels).map(([id, vessel]) => (
            <Vessel key={id} id={Number(id)} vessel={vessel} />
          ))}
        </div>
      </div>
    </section>
  );
}
