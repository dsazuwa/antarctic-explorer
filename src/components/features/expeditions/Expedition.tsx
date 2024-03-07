import { CalendarIcon } from '@radix-ui/react-icons';
import Link from 'next/link';

import DurationIcon from '@/assets/icons/DurationIcon';
import PriceTagIcon from '@/assets/icons/PriceTagIcon';
import { TExpedition } from '@/lib/type';
import { formatPrice } from '@/lib/utils';
import InfoDisplay from './InfoDisplay';

type ExpeditionProps = {
  expedition: TExpedition;
};

function Expedition({ expedition }: ExpeditionProps) {
  const {
    id,
    cruiseLine,
    logo,
    name,
    duration,
    startingPrice,
    nearestDate,
    photoUrl,
  } = expedition;

  return (
    <Link aria-label={name} href={`/expeditions/${id}`}>
      <div className='group rounded-xl bg-white hover:shadow-lg'>
        <img
          className='h-[270px] w-full rounded-t-xl object-cover object-bottom'
          src={photoUrl}
          alt={name}
        />

        <div className='flex h-[calc(100%-270px)] flex-col rounded-b-xl border sm:flex-1'>
          <div className='flex flex-row p-4 pt-6'>
            <img
              className='mr-2 h-6 sm:h-8'
              src={logo}
              alt={`${cruiseLine} logo`}
            />

            <h3 className='line-clamp-2 text-sm/[1rem] font-semibold text-primary group-hover:underline'>
              {name}
            </h3>
          </div>

          <div className='mx-4 mb-6 mt-auto grid grid-cols-3 border-t-2 border-solid border-gray-200 pt-4'>
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
                  ? 'none'
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
      </div>
    </Link>
  );
}

export default Expedition;
