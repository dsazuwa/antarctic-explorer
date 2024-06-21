import { Metadata } from 'next';

import Footer from '@/components/layout/footer';
import Navbar from '@/components/layout/nav';
import { getExpedition } from '@/lib/data/get-expedition';
import {
  Departures,
  Expeditions,
  Extensions,
  Hero,
  Itineraries,
  Overview,
  Vessels,
} from './components';

type Props = { params: { cruiseLine: string; name: string } };

export default async function ExpeditionPage({ params }: Props) {
  const {
    name,
    cruiseLine,
    website,
    description,
    highlights,
    duration,
    startingPrice,
    itineraries,
    vessels,
    gallery,
    extensions,
    otherExpeditions,
    departures,
  } = await getExpedition(
    decodeURIComponent(params.cruiseLine),
    decodeURIComponent(params.name),
  );

  const numVessels = Object.keys(vessels).length;

  return (
    <>
      <Navbar />
      <main className='[&>*:nth-child(even)]:bg-muted/80 [&>*:nth-child(odd):not(:first-child)]:bg-white'>
        <Hero
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

        <Itineraries itineraries={itineraries} />

        <Departures cruiseLine={cruiseLine.name} name={name} />

        {numVessels > 0 && <Vessels vessels={vessels} />}

        {extensions.length > 0 && <Extensions extensions={extensions} />}

        <Expeditions
          expeditions={otherExpeditions.map((x) => ({ ...x, cruiseLine }))}
        />
      </main>
      <Footer />
    </>
  );
}

export async function generateMetadata({
  params: { cruiseLine, name },
}: Props): Promise<Metadata> {
  const data = await getExpedition(
    decodeURIComponent(cruiseLine),
    decodeURIComponent(name),
  );

  return {
    title: `${decodeURIComponent(name)} | Antarctic Explorer`,
    description: data.description[0],
  };
}
