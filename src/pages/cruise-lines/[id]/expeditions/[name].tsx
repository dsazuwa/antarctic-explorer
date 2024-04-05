import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';

import Layout from '@/Layout';
import Expedition from '@/components/features/expedition';
import { DeparturesResponse, ExpeditionResponse } from '@/lib/type';

type Props = {
  pageProps: {
    expedition: ExpeditionResponse;
    departures: DeparturesResponse;
  };
};

export default function ExpeditionPage({
  pageProps: { expedition, departures },
}: Props) {
  const { name, description } = expedition;

  return (
    <Layout>
      <Head>
        <title>{`${name} | Antarctica Explorer`}</title>
        <meta name='description' content={description[0]} />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Expedition
        key={expedition.id}
        expedition={expedition}
        departures={departures}
      />
    </Layout>
  );
}

export const getServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const { id, name } = context.query;

  if (
    typeof name !== 'string' ||
    typeof id !== 'string' ||
    Number.isNaN(Number.parseInt(id, 10))
  )
    return { notFound: true };

  const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/cruise-lines/${Number.parseInt(id, 10)}/expeditions/${encodeURIComponent(name)}`;

  const expeditionRes = await fetch(baseUrl);
  const departuresRes = await fetch(`${baseUrl}/departures?size=5`);

  if (expeditionRes.status !== 200 || departuresRes.status !== 200)
    return { notFound: true };

  const expedition = (await expeditionRes.json()) as ExpeditionResponse;
  const departures = (await departuresRes.json()) as DeparturesResponse;

  return { props: { expedition, departures } };
};
