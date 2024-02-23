import { ArrowRightIcon } from '@radix-ui/react-icons';

import { TVessel } from '@/lib/type';
import VesselDetail from './VesselDetail';

type VesselProps = {
  id: number;
  vessel: TVessel;
};

export default function Vessel({ id, vessel }: VesselProps) {
  const { name, cabins, capacity, description, photoUrl, website } = vessel;

  return (
    <div className='flex flex-col-reverse lg:h-[600px] lg:flex-row lg:space-x-4'>
      <div className='mt-4 flex h-full w-full flex-col lg:mt-0 lg:w-5/12'>
        <h4 className='text-lg font-black italic text-sky-800'>{name}</h4>

        <div className='mt-3 grid grid-cols-2 divide-x border-b border-t py-4'>
          <VesselDetail label='Guests' value={capacity} />
          <VesselDetail label='Cabins' value={cabins} />
        </div>

        <div className='mt-3 space-y-2'>
          {description.map((x, i) => (
            <p key={`vessel-${id}-desc=${i}`} className='text-sm'>
              {x}
            </p>
          ))}
        </div>

        <div className='mt-3 flex flex-row justify-end lg:mt-auto'>
          <a
            href={website}
            target='_blank'
            rel='noopener noreferrer'
            className='group m-2 flex flex-row items-center space-x-2 rounded-[32px] border border-sky-800/50 px-4 py-2 text-sm font-black text-sky-800 transition-colors hover:border-sky-800 hover:shadow-md focus:bg-sky-800 focus:text-white'
          >
            <span>Explore Ship</span>

            <span className='transition-transform group-hover:rotate-[-35deg]'>
              <ArrowRightIcon
                className='stroke-sky-800 group-focus:stroke-white'
                strokeWidth={1.2}
              />
            </span>
          </a>
        </div>
      </div>

      <img
        className='w-full rounded-sm object-cover lg:w-7/12'
        src={photoUrl}
      />
    </div>
  );
}
