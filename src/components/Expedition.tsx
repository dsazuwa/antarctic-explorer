import DurationIcon from '@/assets/icons/DurationIcon';
import PriceTagIcon from '@/assets/icons/PriceTagIcon';
import { Card, CardTitle } from '@/components/ui/card';
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
    <Card className=' sm:h-[416px]'>
      <img
        id='card-image'
        className='h-[256px] w-full rounded-t-md object-cover'
        src={photoUrl}
        alt={name}
      />

      <div className='flex h-[160px] flex-col sm:flex-1'>
        <div className='flex flex-row items-center justify-between p-4 pt-6'>
          <CardTitle className='mr-2 line-clamp-3 text-primary'>
            {name}
          </CardTitle>

          <img
            id='card-image'
            className='h-5 sm:h-8'
            src={cruiseLine.logo}
            alt={`${cruiseLine.name} logo`}
          />
        </div>

        <span className='mx-4 mb-4 mt-auto flex flex-row space-x-6 border-t-2 border-solid border-gray-200 pt-4'>
          {startingPrice && (
            <InfoDisplay
              Icon={PriceTagIcon}
              primaryLabel='Price from'
              secondaryLabel='pp'
              value={formatPrice(startingPrice)}
            />
          )}

          <InfoDisplay
            Icon={DurationIcon}
            primaryLabel='Duration'
            secondaryLabel='days'
            value={duration}
          />
        </span>
      </div>
    </Card>
  );
}

export default Expedition;
