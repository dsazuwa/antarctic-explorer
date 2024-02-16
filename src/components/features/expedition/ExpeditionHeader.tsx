import { TDeparture, Vessel } from '@/lib/type';
import { formatDate, formatPrice } from '@/lib/utils';

type Props = {
  name: string;
  duration: string;
  startingPrice: number;
  photoUrl: string;
  cruiseLine: string;
  departures: TDeparture[];
  vessels: { [id: number]: Vessel };
};

export default function ExpeditionHeader({
  name,
  duration,
  startingPrice,
  cruiseLine,
  departures,
  vessels,
  photoUrl,
}: Props) {
  const getDepartureDatesLabel = () => {
    if (departures.length === 0) return 'None available';
    if (departures.length === 1)
      return formatDate(departures[0].startDate, 'LLL y');

    const firstStart = formatDate(departures[0].startDate, 'LLL y');
    const lastStart = formatDate(
      departures[departures.length - 1].startDate,
      'LLL y',
    );
    return `${departures.length} departures between ${firstStart} and ${lastStart}`;
  };

  return (
    <div className='w-full bg-navy text-white'>
      <div className='mx-auto flex w-full max-w-screen-lg flex-col sm:flex-row sm:py-8'>
        <div className='flex flex-col space-y-3 p-4 sm:w-2/5'>
          <div className='flex flex-col'>
            <div className='text-xs font-medium text-gray-400'>
              {cruiseLine}
            </div>
            <div className='text-2xl font-semibold'>{name}</div>
          </div>

          <div className=''>
            <div className='text-xxs'>Price from</div>
            <div className='text-md font-medium'>
              {formatPrice(startingPrice)}
            </div>
          </div>

          <div className='text-xxs text-gray-200'>
            <div>{`Departure Date(s)`}</div>
            <div className='font-medium'>{getDepartureDatesLabel()}</div>
          </div>

          <div className='flex flex-row space-x-8 text-xxs'>
            <div>
              <div className='text-xxs text-gray-200'>Ship</div>
              {Object.values(vessels)
                .map((vessel) => vessel.name)
                .map((v, i) => (
                  <div key={'vessel' + i} className='font-medium'>
                    {v}
                  </div>
                ))}
            </div>

            <div>
              <div className='text-xxs text-gray-200'>Duration</div>
              <div className='font-medium'>{`${duration} days`}</div>
            </div>
          </div>
        </div>

        <img
          className='h-[240px] object-cover object-bottom sm:h-[400px] sm:w-3/5'
          src={photoUrl}
        />
      </div>
    </div>
  );
}
