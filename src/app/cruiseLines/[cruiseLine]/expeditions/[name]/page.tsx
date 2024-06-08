import { Metadata } from 'next';

import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import { fetchExpedition } from '@/lib/data';
import {
  Departures,
  Expeditions,
  Extensions,
  Hero,
  Itineraries,
  Overview,
  Vessels,
} from './_components';

type Props = { params: { cruiseLine: string; name: string } };

export default async function ExpeditionPage({ params }: Props) {
  const { expedition } = await fetchExpedition(params.cruiseLine, params.name);

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
  } = expedition;

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
          departures={expedition.departures}
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
  const data = await fetchExpedition(cruiseLine, name);

  return {
    title: `${decodeURIComponent(name)} | Antarctic Explorer`,
    description: data.expedition.description[0],
  };
}
