import { TGallery, TVessel } from '@/lib/type';
import { formatDate, formatPrice } from '@/lib/utils';
import Gallery from './Gallery';

type Props = {
  name: string;
  duration: string;
  startingPrice: number;
  cruiseLine: string;
  departures: { startDate: Date; endDate: Date }[];
  numVessels: number;
  vessels: { [id: number]: TVessel };
  gallery: TGallery[];
};

export default function Hero({
  name,
  duration,
  startingPrice,
  cruiseLine,
  departures,
  numVessels,
  vessels,
  gallery,
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
    <section className='w-full bg-navy text-white' aria-label='Header'>
      <div className='mx-auto flex max-w-screen-lg flex-col sm:flex-row sm:py-8'>
        <div className='flex flex-col space-y-3 p-4 sm:w-2/5'>
          <div className='flex flex-col'>
            <div className='text-xs font-medium text-gray-400'>
              {cruiseLine}
            </div>
            <h1 className='text-2xl font-semibold'>{name}</h1>
          </div>

          <div>
            <div className='text-xxs text-gray-200'>Price from</div>
            <div className='text-md font-medium'>
              {formatPrice(startingPrice)}
            </div>
          </div>

          <div className='text-xxs'>
            <div className='text-gray-200'>{`Departure Date(s)`}</div>
            <div className='font-medium'>{getDepartureDatesLabel()}</div>
          </div>

          <div className='flex flex-row space-x-8 text-xxs'>
            {numVessels > 0 && (
              <div>
                <div className='text-gray-200'>Ship</div>

                {Object.values(vessels)
                  .map((vessel) => vessel.name)
                  .map((v, i) => (
                    <div key={'vessel' + i} className='font-medium'>
                      {v}
                    </div>
                  ))}
              </div>
            )}

            <div>
              <div className='text-xxs text-gray-200'>Duration</div>
              <div className='font-medium'>{`${duration} days`}</div>
            </div>
          </div>
        </div>

        <Gallery gallery={gallery} className='sm:mr-4 sm:w-3/5 lg:mr-0' />
      </div>
    </section>
  );
}
