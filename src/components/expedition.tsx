import { CalendarIcon } from '@radix-ui/react-icons';
import Image from 'next/image';
import Link from 'next/link';
import { ComponentType } from 'react';

import DurationIcon from '@/components/icons/duration';
import PriceTagIcon from '@/components/icons/price-tag';
import { TExpedition } from '@/lib/type';
import { formatPrice } from '@/lib/utils';

export default function Expedition({
  expedition,
  priority,
}: {
  expedition: TExpedition;
  priority?: boolean;
}) {
  const { cruiseLine, name, duration, startingPrice, startDate, photoUrl } =
    expedition;

  const width = photoInfo[cruiseLine.name]?.width ?? 50;
  const height = photoInfo[cruiseLine.name]?.height ?? 50;

  return (
    <li>
      <Link
        href={`/cruiseLines/${encodeURIComponent(cruiseLine.name)}/expeditions/${encodeURIComponent(name)}`}
        className='group relative flex h-full flex-col rounded-sm bg-white hover:shadow-sm'
      >
        <div>
          <div className='aspect-[4/3]'>
            <Image
              className='h-full w-full rounded-t-sm object-cover object-bottom'
              src={photoUrl}
              alt={name}
              width={0}
              height={0}
              sizes='75vw'
              priority={priority}
            />
          </div>
        </div>

        <div className='flex flex-1 flex-col rounded-b-sm border-x border-b'>
          <div className='inline-flex items-center gap-4 p-6'>
            <Image
              className='h-6 w-auto shrink-0 sm:h-8'
              src={cruiseLine.logo}
              alt={`${cruiseLine.name} logo`}
              width={width}
              height={height}
              sizes='100vw'
            />

            <div className='heading-5 font-semibold text-primary group-hover:underline'>
              {name}
            </div>
          </div>

          <div className='mx-6 mb-6 mt-auto grid gap-4 border-t-2 border-solid border-gray-200 pt-6 sm:grid-cols-[repeat(auto-fit,minmax(8rem,1fr))]'>
            <InfoDisplay
              Icon={DurationIcon}
              primaryLabel='Duration'
              secondaryLabel='days'
              value={duration}
            />

            <InfoDisplay
              Icon={CalendarIcon}
              primaryLabel='Next Sailing'
              value={startDate}
            />

            <InfoDisplay
              Icon={PriceTagIcon}
              primaryLabel='Price from'
              secondaryLabel='pp'
              value={startingPrice === null ? null : formatPrice(startingPrice)}
            />
          </div>
        </div>
      </Link>
    </li>
  );
}

function InfoDisplay({
  Icon,
  primaryLabel,
  secondaryLabel,
  value,
}: {
  Icon: ComponentType<{ className?: string }>;
  primaryLabel: string;
  secondaryLabel?: string;
  value: string | null;
}) {
  return (
    <div className='inline-flex items-center gap-2'>
      <div className='rounded-full bg-primary/10 p-2'>
        <Icon className='h-3 w-3 flex-shrink-0 fill-black sm:h-4 sm:w-4' />
      </div>

      <div className='text-[0.9rem] font-semibold'>
        <div>{primaryLabel}</div>

        <div className='inline-flex flex-wrap items-baseline gap-1 leading-7'>
          {value === null ? (
            <span>Unavailable</span>
          ) : (
            <span className='text-nowrap text-base text-black'>{value}</span>
          )}

          {secondaryLabel && value !== null && <span>{secondaryLabel}</span>}
        </div>
      </div>
    </div>
  );
}

const photoInfo: Record<string, { width: number; height: number }> = {
  'Aurora Expeditions': { width: 100, height: 100 },
  'Hurtigruten Expeditions': { width: 187, height: 269 },
  'Lindblad Expeditions': { width: 225, height: 225 },
};
