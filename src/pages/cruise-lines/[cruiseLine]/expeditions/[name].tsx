import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';

import Layout from '@/Layout';
import Expedition from '@/components/features/expedition';
import {
  departureSortOptions,
  departuresPerPageOptions,
} from '@/lib/constants';
import { DeparturesResponse, ExpeditionResponse } from '@/lib/type';

type Props = {
  pageProps: { expedition: ExpeditionResponse };
};

export default function ExpeditionPage({ pageProps: { expedition } }: Props) {
  const { name, description } = expedition;

  return (
    <Layout>
      <Head>
        <title>{`${name} | Antarctic Explorer`}</title>
        <meta name='description' content={description[0]} />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Expedition key={expedition.id} expedition={expedition} />
    </Layout>
  );
}

export const getServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const { cruiseLine, name } = context.query;

  if (typeof name !== 'string' || typeof cruiseLine !== 'string')
    return { notFound: true };

  const url = new URL(
    `${process.env.NEXT_PUBLIC_API_URL}/cruise-lines/${encodeURIComponent(cruiseLine)}/expeditions/${encodeURIComponent(name)}`,
  );

  const params = {
    page: 0,
    size: departuresPerPageOptions[0],
    sort: departureSortOptions[0].sort,
    dir: departureSortOptions[0].dir,
  };

  for (const [key, value] of Object.entries(params))
    url.searchParams.append(key, String(value));

  const res = await fetch(url.toString());

  if (res.status !== 200) return { notFound: true };

  const data = (await res.json()) as {
    expedition: ExpeditionResponse;
    departures: DeparturesResponse;
  };

  return { props: { ...data } };
};
