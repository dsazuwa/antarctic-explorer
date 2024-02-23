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

      <Overview
        description={description}
        highlights={highlights}
        gallery={gallery}
      />

      <Vessels vessels={vessels}/>
    </div>
  );
}
