import Image from 'next/image';

import LinkButton from '@/components/link-btn';
import { TVessel } from '@/lib/type';

export default function Vessels({ vessels }: { vessels: TVessel[] }) {
  return (
    <section className='w-full' aria-label='Ships'>
      <div className='container flex max-w-screen-lg flex-col gap-6 py-8 md:py-12'>
        <h2 className='heading-3 font-bold text-sky-900'>Ships</h2>

        <div className='space-y-10'>
          {vessels.map((vessel) => (
            <Vessel key={`vessel-${vessel.id}`} vessel={vessel} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Vessel({ vessel }: { vessel: TVessel }) {
  const { id, name, cabins, capacity, description, photoUrl, website } = vessel;

  return (
    <div>
      <h3 className='heading-5 font-bold text-sky-900'>{name}</h3>

      <div className='mt-4 grid w-full grid-cols-1 gap-4 lg:grid-cols-12 lg:gap-8'>
        <div className='order-2 flex flex-col gap-2 lg:order-1 lg:col-span-6'>
          <div className='grid grid-cols-2 divide-x border-b border-t py-4'>
            <VesselDetail label='Guests' value={capacity} />
            <VesselDetail label='Cabins' value={cabins} />
          </div>

          <div className='space-y-4'>
            {description.map((x, i) => (
              <p key={`vessel-${id}-desc=${i}`} className='body'>
                {x}
              </p>
            ))}
          </div>

          <div className='inline-flex justify-end pt-2 lg:mt-auto'>
            <LinkButton
              label='Explore Ship'
              website={website}
              aria-label={`Go to external page: ${name}`}
            />
          </div>
        </div>

        <Image
          className='w-full rounded-sm object-cover lg:order-2 lg:col-span-6 lg:h-[600px]'
          src={photoUrl}
          alt={name}
          width={0}
          height={0}
          sizes='(max-width: 1024px) 100vw, 50vw'
        />
      </div>
    </div>
  );
}

type Props = { label: string; value: number };

function VesselDetail({ label, value }: Props) {
  return (
    <div className='flex flex-col items-center gap-1'>
      <div className='text-xs font-black text-sky-800/90'>{label}</div>
      <div className='text-lg font-semibold'>{value}</div>
    </div>
  );
}
