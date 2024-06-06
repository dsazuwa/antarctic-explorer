import clsx from 'clsx';
import { format, isSameMonth, isSameYear } from 'date-fns';

import LinkButton from '@/components/LinkButton';
import { TDeparture } from '@/lib/type';
import { formatPrice } from '@/lib/utils';
import InfoDisplay from './InfoDisplay';

export default function Departure({ departure }: { departure: TDeparture }) {
  const {
    name,
    itinerary,
    vessel,
    departingFrom,
    arrivingAt,
    duration,
    startDate,
    endDate,
    startingPrice,
    discountedPrice,
    website,
  } = departure;

  const isDiscounted = discountedPrice !== null;

  const formatDateRange = () => {
    if (isSameYear(startDate, endDate))
      return isSameMonth(startDate, endDate)
        ? `${format(startDate, 'MMM d')} - ${format(endDate, 'd, yyyy')}`
        : `${format(startDate, 'MMM d')} - ${format(endDate, 'MMM d, yyyy')}`;
    else
      return `${format(startDate, 'MMM d, yyyy')} - ${format(endDate, 'MMM d, yyyy')}`;
  };

  return (
    <li className='flex flex-col gap-4 rounded-r-sm border border-l-amber-400 bg-white p-4 shadow-sm sm:flex-row sm:space-y-0'>
      <div className='flex flex-col justify-center gap-3 sm:w-9/12'>
        <div className='font-bold'>
          {itinerary}
          {name !== null && (
            <span className='ml-1 text-sm font-normal'>{`(${name})`}</span>
          )}
        </div>

        <ul
          className='grid gap-6'
          style={{
            gridTemplateColumns: 'repeat(auto-fit, minmax(144px, 1fr))',
          }}
        >
          <InfoDisplay label='Departure Date' value={formatDateRange()} />

          <InfoDisplay label='Duration' value={duration + ' days'} />

          <InfoDisplay label='Origin Port' value={departingFrom} />

          <InfoDisplay label='Final Port' value={arrivingAt} />

          <InfoDisplay label='Ship' value={vessel} />
        </ul>
      </div>

      <div className='flex flex-col items-center justify-center gap-2 border-t sm:w-3/12 sm:border-l sm:border-t-0'>
        <div className='mt-4 text-xxs/[10px] font-semibold text-slate-400 sm:mt-0 sm:text-xs/[12px]'>
          Starting from
        </div>

        <div className='flex flex-col items-center'>
          <div
            className={clsx({
              'text-xs/[12px] line-through sm:text-sm/[16px]': isDiscounted,
              'text-lg/[20px] font-bold sm:text-xl/[22px]': !isDiscounted,
            })}
          >
            {formatPrice(startingPrice)}
          </div>

          {isDiscounted && (
            <div className='text-lg font-bold text-emerald-600 sm:text-xl'>
              {formatPrice(discountedPrice)}
            </div>
          )}
        </div>

        <LinkButton variant='secondary' label='Book Now' website={website} />
      </div>
    </li>
  );
}
