import { Metadata } from 'next';

import Expedition from '@/components/expedition';
import { fetchExpedition } from '@/lib/data';

type Props = { params: { cruiseLine: string; name: string } };

export async function generateMetadata({
  params: { cruiseLine, name },
}: Props): Promise<Metadata> {
  const data = await fetchExpedition(cruiseLine, name);

  return {
    title: `${decodeURIComponent(name)} | Antarctic Explorer`,
    description: data.expedition.description[0],
  };
}

export default async function ExpeditionPage({
  params: { cruiseLine, name },
}: Props) {
  const { expedition } = await fetchExpedition(cruiseLine, name);

  return <Expedition key={expedition.id} expedition={expedition} />;
}
