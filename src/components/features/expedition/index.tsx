import { ExpeditionResponse } from '@/lib/type';
import Departures from './Departures';
import Extensions from './Extensions';
import Hero from './Hero';
import Itineraries from './Itineraries';
import Expeditions from './OtherExpeditions';
import Overview from './Overview';
import Vessels from './Vessels';

type Props = { expedition: ExpeditionResponse };

export default function Expedition({ expedition }: Props) {
  const {
    id,
    name,
    website,
    description,
    highlights,
    duration,
    startingPrice,
    itineraries,
    cruiseLine,
    departures,
    vessels,
    gallery,
    extensions,
    otherExpeditions,
  } = expedition;

  const numVessels = Object.keys(vessels).length;

  return (
    <main className='[&>*:nth-child(even)]:bg-muted/80 [&>*:nth-child(odd):not(:first-child)]:bg-white'>
      <Hero
        id={id}
        name={name}
        website={website}
        duration={duration}
        startingPrice={startingPrice}
        cruiseLine={cruiseLine.name}
        departures={departures}
        numVessels={numVessels}
        vessels={vessels}
        gallery={gallery}
      />

      <Overview description={description} highlights={highlights} />

      <Itineraries id={id} itineraries={itineraries} />

      <Departures id={cruiseLine.id} name={name} />

      {numVessels > 0 && <Vessels vessels={vessels} />}

      {extensions.length > 0 && <Extensions id={id} extensions={extensions} />}

      <Expeditions
        expeditions={otherExpeditions.map((x) => ({ ...x, cruiseLine }))}
      />
    </main>
  );
}
