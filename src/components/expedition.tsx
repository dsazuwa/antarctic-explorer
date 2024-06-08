import { CalendarIcon } from '@radix-ui/react-icons';
import Image from 'next/image';
import Link from 'next/link';
import { ComponentType } from 'react';

import DurationIcon from '@/assets/icons/DurationIcon';
import PriceTagIcon from '@/assets/icons/PriceTagIcon';
import { TExpedition } from '@/lib/type';
import { cn, formatPrice } from '@/lib/utils';

type ExpeditionProps = {
  expedition: TExpedition;
  isImgPriority?: boolean;
};

export default function Expedition({
  expedition,
  isImgPriority,
}: ExpeditionProps) {
  const { cruiseLine, name, duration, startingPrice, nearestDate, photoUrl } =
    expedition;

  return (
    <li className='group relative flex h-full flex-col rounded-xl bg-white hover:shadow-md'>
      <Image
        className='aspect-[4/3] h-full w-full rounded-t-xl object-cover object-bottom'
        src={photoUrl}
        alt={name}
        width={0}
        height={0}
        sizes='100vw'
        priority={!!isImgPriority}
      />

      <div className='flex flex-1 flex-col rounded-b-xl border'>
        <div className='inline-flex items-center p-4 pt-6'>
          <Image
            className='mr-2 h-6 w-auto shrink-0 sm:h-8'
            src={cruiseLine.logo}
            alt={`${cruiseLine.name} logo`}
            width={0}
            height={0}
            sizes='100vw'
          />

          <Link
            href={`/cruiseLines/${encodeURIComponent(cruiseLine.name)}/expeditions/${encodeURIComponent(name)}`}
            className={cn(
              'heading-6 lg:heading-5 line-clamp-2 font-semibold text-primary after:absolute after:bottom-[-3px] after:left-[-3px] after:right-[-3px] after:top-[-3px] after:block after:rounded-xl group-hover:underline',
            )}
          >
            {name}
          </Link>
        </div>

        <div
          className='mx-4 mb-6 mt-auto grid grid-cols-3 gap-1 border-t-2 border-solid border-gray-200 pt-4'
          // style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(80px, 1fr))' }}
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

interface InfoDisplayProps {
  Icon: ComponentType<{ className?: string }>;
  primaryLabel: string;
  secondaryLabel?: string;
  value: string | null;
}

function InfoDisplay({
  Icon,
  primaryLabel,
  secondaryLabel,
  value,
}: InfoDisplayProps) {
  return (
    <div className='inline-flex items-center'>
      <div className='mr-2 flex h-6 w-6 items-center justify-center rounded-full bg-muted sm:h-7 sm:w-7'>
        <Icon className='text-muted-foregound h-3 w-3 flex-shrink-0 sm:h-4 sm:w-4' />
      </div>

      <div className='text-[8px] font-semibold text-gray-400'>
        <div>{primaryLabel}</div>

        <div className='items-baseline'>
          {value === null ? (
            <span>Unavailable</span>
          ) : (
            <span className='mr-1 text-[10px] text-black'>{value}</span>
          )}

          {secondaryLabel && <span>{secondaryLabel}</span>}
        </div>
      </div>
    </div>
  );
}
