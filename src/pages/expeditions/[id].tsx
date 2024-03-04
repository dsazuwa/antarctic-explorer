import { GetServerSideProps, GetServerSidePropsContext } from 'next';

import getLayout from '@/Layout';
import { Expedition } from '@/components/features/expedition';
import { ExpeditionResponse } from '@/lib/type';
import { expeditionApi, wrapper } from '@/store';

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps(
    (store) => async (context: GetServerSidePropsContext) => {
      const { id } = context.query;
      const { dispatch } = store;

      if (typeof id !== 'string' || Number.isNaN(Number.parseInt(id, 10)))
        return { notFound: true };

      const expedition = await dispatch(
        expeditionApi.endpoints.getExpedition.initiate(Number.parseInt(id, 10)),
      );

      await Promise.all(dispatch(expeditionApi.util.getRunningQueriesThunk()));

      return expedition.isError
        ? { notFound: true }
        : { props: { expedition: expedition.data } };
    },
  );

type Props = {
  pageProps: { expedition: ExpeditionResponse };
};

export default function ExpeditionPage({ pageProps: { expedition } }: Props) {
  return <Expedition expedition={expedition} />;
}

ExpeditionPage.getLayout = getLayout;
