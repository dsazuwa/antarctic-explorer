import { useRouter } from 'next/router';

import getLayout from '@/Layout';
import PageNotFound from '@/components/PageNotFound';
import Loader from '@/components/common/Loader';
import { Expedition } from '@/components/features/expedition';
import { useGetExpeditionQuery } from '@/store';

export default function ExpeditionPage() {
  const router = useRouter();
  const { id } = router.query;

  const { isError, data } = useGetExpeditionQuery(
    Number.parseInt(id as string, 10),
    { skip: id === undefined },
  );

  if (isError)
    return (
      <PageNotFound href='/expeditions' buttonLabel='Back to Expeditions' />
    );

  return data == undefined ? <Loader /> : <Expedition expedition={data} />;
}

ExpeditionPage.getLayout = getLayout;
