import clsx from 'clsx';

import { TItinerary } from '@/lib/type';
import InfoDisplay from './InfoDisplay';
import DaySchedule from './ItineraryDaySchedule';
import Map from './ItineraryMap';

type Props = {
  itinerary: TItinerary & { id: number };
  className?: string;
};

export default function Itinerary({ itinerary, className }: Props) {
  const { id, name, startPort, endPort, duration, mapUrl, schedules } =
    itinerary;

  return (
    <article className={clsx('', className)}>
      <div className='grid grid-cols-3 gap-4'>
        <div className='space-y-4 md:mb-[180px]'>
          <h4 className='text-sm font-black text-sky-800 md:text-base'>
            {name}
          </h4>

          <ul className='grid grid-cols-1 gap-4'>
            <InfoDisplay label='Origin Port' value={startPort} />

            <InfoDisplay label='Final Port' value={endPort} />

            <InfoDisplay label='Duration' value={`${duration} days`} />
          </ul>
        </div>

        <Map alt={`${name} map`} url={mapUrl} />
      </div>

      <ol className='space-y-2'>
        {schedules.map((schedule, i) => (
          <DaySchedule
            key={`itinerary_${id}_schedule_${i}`}
            schedule={schedule}
          />
        ))}
      </ol>
    </article>
  );
}
