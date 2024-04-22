import { CalendarIcon } from '@radix-ui/react-icons';
import Image from 'next/image';
import Link from 'next/link';

import DurationIcon from '@/assets/icons/DurationIcon';
import PriceTagIcon from '@/assets/icons/PriceTagIcon';
import { TExpedition } from '@/lib/type';
import { formatPrice } from '@/lib/utils';
import InfoDisplay from '../features/expeditions/InfoDisplay';

type ExpeditionProps = { expedition: TExpedition; isImgPriority?: boolean };

export default function Expedition({
  expedition,
  isImgPriority,
}: ExpeditionProps) {
  const { cruiseLine, name, duration, startingPrice, nearestDate, photoUrl } =
    expedition;

  return (
    <li className='group relative rounded-xl bg-white hover:shadow-lg'>
      <Image
        className='h-[270px] w-full rounded-t-xl object-cover object-bottom'
        src={photoUrl}
        alt={name}
        width={0}
        height={0}
        sizes='100vw'
        priority={!!isImgPriority}
      />

      <div className='flex h-[calc(100%-270px)] flex-col rounded-b-xl border sm:flex-1'>
        <div className='inline-flex p-4 pt-6'>
          <Image
            className='mr-2 h-6 w-auto sm:h-8'
            src={cruiseLine.logo}
            alt={`${cruiseLine.name} logo`}
            width={0}
            height={0}
            sizes='100vw'
          />

          <Link
            href={`/cruise-lines/${encodeURIComponent(cruiseLine.name)}/expeditions/${encodeURIComponent(name)}`}
            className='line-clamp-2 text-sm/[1rem] font-semibold text-primary after:absolute after:bottom-[-3px] after:left-[-3px] after:right-[-3px] after:top-[-3px] after:block after:rounded-xl group-hover:underline'
          >
            {name}
          </Link>
        </div>

        <div
          className='mx-4 mb-6 mt-auto grid gap-1 border-t-2 border-solid border-gray-200 pt-4'
          style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(80px, 1fr))' }}
        >
          <InfoDisplay
            Icon={DurationIcon}
            primaryLabel='Duration'
            secondaryLabel='days'
            value={duration}
          />

          <InfoDisplay
            Icon={CalendarIcon}
            primaryLabel='Next Sailing'
            value={
              nearestDate === null
                ? null
                : new Date(nearestDate).toLocaleDateString('en-US', {
                    year: '2-digit',
                    month: '2-digit',
                    day: '2-digit',
                  })
            }
          />

          {startingPrice && (
            <InfoDisplay
              Icon={PriceTagIcon}
              primaryLabel='Price from'
              secondaryLabel='pp'
              value={formatPrice(startingPrice)}
            />
          )}
        </div>
      </div>
    </li>
  );
}

// grid-cols-3 grid-flow-row
