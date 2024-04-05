import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';

import Layout from '@/Layout';
import Expedition from '@/components/features/expedition';
import { ExpeditionResponse } from '@/lib/type';

type Props = { pageProps: { expedition: ExpeditionResponse } };

export default function ExpeditionPage({ pageProps: { expedition } }: Props) {
  const { name, description } = expedition;

  return (
    <Layout>
      <Head>
        <title>{`${name} | Antarctica Explorer`}</title>
        <meta name='description' content={description[0]} />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Expedition expedition={expedition} />
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

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/cruise-lines/${Number.parseInt(id, 10)}/expeditions/${encodeURIComponent(name)}`,
  );

  return res.status === 200
    ? { props: { expedition: (await res.json()) as ExpeditionResponse } }
    : { notFound: true };
};
