import { useRouter } from 'next/router';

import getLayout from '@/Layout';
import { Expedition } from '@/components/features/expedition';
import PageNotFound from '@/components/not-found';
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

  return data == undefined ? <div></div> : <Expedition expedition={data}/>;
}

ExpeditionPage.getLayout = getLayout;
