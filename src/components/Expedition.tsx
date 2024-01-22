import DurationIcon from '@/assets/icons/DurationIcon';
import PriceTag from '@/assets/icons/PriceTag';
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
      className='flex w-full flex-col rounded-md bg-white shadow sm:h-[240px] sm:flex-row'
    >
      <img
        id='card-image'
        className='sm:max-w-5/12 h-[240px] rounded-t-md object-cover sm:h-full sm:w-5/12 sm:rounded-none sm:rounded-l-md'
        src={photoUrl}
        alt={name}
      />

      <div
        id='card-content'
        className='flex h-[200px] flex-col justify-between p-4 sm:h-full sm:flex-1'
      >
        <div className='flex flex-row items-start justify-between'>
          <div className='mr-2 line-clamp-2 text-sm font-semibold text-navy sm:text-base'>
            {name}
          </div>

          <img
            id='card-image'
            className='h-[20px] sm:h-[32px]'
            src={cruiseLine.logo}
            alt={`${cruiseLine.name} logo`}
          />
        </div>

        <span className='flex flex-row space-x-8 border-t-2 border-solid border-gray-200 pt-2'>
          {startingPrice && (
            <InfoDisplay
              Icon={PriceTag}
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
