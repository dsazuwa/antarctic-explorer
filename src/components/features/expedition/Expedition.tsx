import { ExpeditionResponse } from '@/lib/type';
import Departures from './Departures';
import Hero from './Hero';
import Overview from './Overview';
import Vessels from './Vessels';

type Props = {
  expedition: ExpeditionResponse;
};

export default function Expedition({ expedition }: Props) {
  const {
    id,
    name,
    description,
    highlights,
    duration,
    startingPrice,
    cruiseLine,
    departures,
    vessels,
    gallery,
  } = expedition;

  const numVessels = Object.keys(vessels).length;

  return (
    <div>
      <Hero
        name={name}
        duration={duration}
        startingPrice={startingPrice}
        cruiseLine={cruiseLine.name}
        departures={departures}
        numVessels={numVessels}
        vessels={vessels}
        gallery={gallery}
      />

      <Overview description={description} highlights={highlights} />

      <Departures id={id} />

      {numVessels > 0 && <Vessels vessels={vessels} />}
    </div>
  );
}
