import getLayout from '@/Layout';
import { useRouter } from 'next/router';

export default function ExpeditionPage() {
  const router = useRouter();
  const { id } = router.query;

  if (isNaN(Number(id))) return <ErrorPage statusCode={401} />;

  return <div>{id}</div>;
}

ExpeditionPage.getLayout = getLayout;

function ErrorPage({ statusCode }: { statusCode: number }) {
  return <div>{statusCode}</div>;
}
