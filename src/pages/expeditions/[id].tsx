import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import Head from 'next/head';

import Layout from '@/Layout';
import Expedition from '@/components/features/expedition';
import { ExpeditionResponse } from '@/lib/type';
import { api, wrapper } from '@/store';

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps(
    (store) => async (context: GetServerSidePropsContext) => {
      const { id } = context.query;
      const { dispatch } = store;

      if (typeof id !== 'string' || Number.isNaN(Number.parseInt(id, 10)))
        return { notFound: true };

      const expedition = await dispatch(
        api.endpoints.getExpedition.initiate(Number.parseInt(id, 10)),
      );

      await Promise.all(dispatch(api.util.getRunningQueriesThunk()));

      return expedition.isError
        ? { notFound: true }
        : { props: { expedition: expedition.data } };
    },
  );

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
