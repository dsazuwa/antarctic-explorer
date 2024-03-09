import Image from 'next/image';

import LinkButton from '@/components/common/LinkButton';
import { TVessel } from '@/lib/type';
import VesselDetail from './VesselDetail';

type VesselProps = {
  id: number;
  vessel: TVessel;
};

export default function Vessel({ id, vessel }: VesselProps) {
  const { name, cabins, capacity, description, photoUrl, website } = vessel;

  return (
    <div className='grid w-full grid-cols-1 gap-4 lg:grid-cols-12'>
      <div className='order-2 mt-4 flex flex-col lg:order-1 lg:col-span-5 lg:mt-0'>
        <h3 className='text-sm font-black italic text-sky-800 md:text-base'>
          {name}
        </h3>

        <div className='mt-3 grid grid-cols-2 divide-x border-b border-t py-4'>
          <VesselDetail label='Guests' value={capacity} />
          <VesselDetail label='Cabins' value={cabins} />
        </div>

        <div className='mt-3 space-y-4'>
          {description.map((x, i) => (
            <p key={`vessel-${id}-desc=${i}`} className='text-base/[1.5em]'>
              {x}
            </p>
          ))}
        </div>

        <div className='m-2 mt-3 flex flex-row justify-end lg:mt-auto'>
          <LinkButton label='Explore Ship' website={website} />
        </div>
      </div>

      <Image
        className='rounded-sm object-cover lg:order-2 lg:col-span-7 lg:h-[600px]'
        src={photoUrl}
        alt={name}
        width={0}
        height={0}
        sizes='100vw'
      />
    </div>
  );
}
