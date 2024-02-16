import { ExpeditionResponse } from '@/lib/type';
import Header from './Header';

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
      <Header
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
