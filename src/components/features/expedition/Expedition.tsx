import { ExpeditionResponse } from '@/lib/type';
import ExpeditionHeader from './ExpeditionHeader';

type Props = {
  expedition: ExpeditionResponse;
};

export default function Expedition({ expedition }: Props) {
  const {
    name,
    duration,
    startingPrice,
    cruiseLine,
    departures,
    vessels,
    photoUrl,
  } = expedition;

  return (
    <div>
      <ExpeditionHeader
        name={name}
        duration={duration}
        startingPrice={startingPrice}
        cruiseLine={cruiseLine.name}
        departures={departures}
        vessels={vessels}
        photoUrl={photoUrl}
      />
    </div>
  );
}
