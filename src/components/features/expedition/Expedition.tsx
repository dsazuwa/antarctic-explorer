import { ExpeditionResponse } from '@/lib/type';
import Header from './Header';
import Overview from './Overview';
import Vessels from './Vessels';

type Props = {
  expedition: ExpeditionResponse;
};

export default function Expedition({ expedition }: Props) {
  const {
    name,
    description,
    highlights,
    duration,
    startingPrice,
    cruiseLine,
    departures,
    vessels,
    photoUrl,
    gallery,
  } = expedition;

  const numVessels = Object.keys(vessels).length;

  return (
    <div>
      <Header
        name={name}
        duration={duration}
        startingPrice={startingPrice}
        cruiseLine={cruiseLine.name}
        departures={departures}
        numVessels={numVessels}
        vessels={vessels}
        photoUrl={photoUrl}
      />

      <Overview
        description={description}
        highlights={highlights}
        gallery={gallery}
      />

      {numVessels > 0 && <Vessels vessels={vessels} />}
    </div>
  );
}
