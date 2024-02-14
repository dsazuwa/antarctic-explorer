import { useRouter } from 'next/router';

import getLayout from '@/Layout';
import PageNotFound from '@/components/not-found';
import { formatDate, formatPrice } from '@/lib/utils';
import { useGetExpeditionQuery } from '@/store';

export default function ExpeditionPage() {
  const router = useRouter();
  const { id } = router.query;

  const { isError, data } = useGetExpeditionQuery(
    Number.parseInt(id as string, 10),
    { skip: id === undefined },
  );

  if (isError)
    return (
      <PageNotFound href='/expeditions' buttonLabel='Back to Expeditions' />
    );

  if (data == undefined) return <div></div>;

  const { name, startingPrice, duration, photoUrl, vessels, departures } = data;

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
          <div className='text-2xl font-semibold'>{name}</div>

          <div className=''>
            <div className='text-xxs'>Price from</div>
            <div className='text-md font-medium'>
              {formatPrice(startingPrice)}
            </div>
          </div>

          <div className='text-xxs text-gray-200'>
            <div>Departure Dates</div>
            <div className='font-medium'>{getDepartureDatesLabel()}</div>
          </div>

          <div className='flex flex-row space-x-8 text-xxs'>
            <div>
              <div className='text-xxs text-gray-200'>Ship</div>
              {vessels.map((v, i) => (
                <div key={'vessel' + i} className='font-medium'>
                  {v.name}
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

ExpeditionPage.getLayout = getLayout;
