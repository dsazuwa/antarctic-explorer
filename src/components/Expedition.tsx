import { CalendarIcon } from '@radix-ui/react-icons';

import DurationIcon from '@/assets/icons/DurationIcon';
import PriceTagIcon from '@/assets/icons/PriceTagIcon';
import { Card } from '@/components/ui/card';
import { TCruiseLine, TExpedition } from '@/lib/type';
import { formatPrice } from '@/lib/utils';
import InfoDisplay from './InfoDisplay';

type ExpeditionProps = {
  expedition: TExpedition;
  cruiseLine: TCruiseLine;
};

function Expedition({ expedition, cruiseLine }: ExpeditionProps) {
  const { name, duration, startingPrice, photoUrl } = expedition;

  return (
    <Card className=' sm:h-[404px]'>
      <img
        id='card-image'
        className='h-[256px] w-full rounded-t-md object-cover'
        src={photoUrl}
        alt={name}
      />

      <div className='flex h-[148px] flex-col sm:flex-1'>
        <div className='flex flex-row p-4 pt-6'>
          <img
            id='card-image'
            className='mr-2 h-5 sm:h-8'
            src={cruiseLine.logo}
            alt={`${cruiseLine.name} logo`}
          />

          <div className='line-clamp-2 text-sm/[1rem] font-semibold text-primary'>
            {name}
          </div>
        </div>

        <span className='mx-4 mb-6 mt-auto grid grid-cols-3 border-t-2 border-solid border-gray-200 pt-4'>
          <InfoDisplay
            Icon={DurationIcon}
            primaryLabel='Duration'
            secondaryLabel='days'
            value={duration}
          />

          <InfoDisplay
            Icon={CalendarIcon}
            primaryLabel='Departs'
            value='03/11/24'
          />

          {startingPrice ? (
            <InfoDisplay
              Icon={PriceTagIcon}
              primaryLabel='Price from'
              secondaryLabel='pp'
              value={formatPrice(startingPrice)}
            />
          ) : (
            <div></div>
          )}
        </span>
      </div>
    </Card>
  );
}

export default Expedition;
