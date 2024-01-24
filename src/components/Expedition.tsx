import DurationIcon from '@/assets/icons/DurationIcon';
import PriceTagIcon from '@/assets/icons/PriceTagIcon';
import { TCruiseLine, TExpedition } from '@/type';
import InfoDisplay from './InfoDisplay';

type ExpeditionProps = {
  expedition: TExpedition;
  cruiseLine: TCruiseLine;
};

function Expedition({ expedition, cruiseLine }: ExpeditionProps) {
  const { name, duration, startingPrice, photoUrl } = expedition;

  return (
    <div
      id='card'
      className='flex w-full flex-col rounded-md bg-white shadow sm:h-64 sm:flex-row'
    >
      <img
        id='card-image'
        className='sm:max-w-5/12 h-64 rounded-t-md object-cover sm:h-full sm:w-5/12 sm:rounded-none sm:rounded-l-md'
        src={photoUrl}
        alt={name}
      />

      <div
        id='card-content'
        className='flex h-52 flex-col justify-between p-4 sm:h-full sm:flex-1'
      >
        <div className='flex flex-row items-start justify-between'>
          <div className='mr-2 line-clamp-2 text-sm font-semibold text-navy'>
            {name}
          </div>

          <img
            id='card-image'
            className='h-5 sm:h-8'
            src={cruiseLine.logo}
            alt={`${cruiseLine.name} logo`}
          />
        </div>

        <span className='flex flex-row space-x-6 border-t-2 border-solid border-gray-200 pt-2'>
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
    </div>
  );
}

export default Expedition;

const formatPrice = (price: number) => {
  const hasDecimal = price % 1 !== 0;

  return price.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: hasDecimal ? 2 : 0,
    maximumFractionDigits: hasDecimal ? 2 : 0,
  });
};
