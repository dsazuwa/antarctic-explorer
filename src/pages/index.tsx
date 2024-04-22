import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { parse } from 'querystring';
import { useEffect } from 'react';

import Layout from '@/Layout';
import Loader from '@/components/common/Loader';
import Expeditions from '@/components/features/expeditions';
import { getExpeditionsUrl } from '@/lib/param.utils';
import { ExpeditionsResponse } from '@/lib/type';
import { useExpeditionsStore } from '@/store';

type Props = {
  pageProps: { expeditions: ExpeditionsResponse };
};

export default function ExpeditionsPage({ pageProps: { expeditions } }: Props) {
  const isLoading = useExpeditionsStore((state) => state.isLoading);
  const setExpeditions = useExpeditionsStore((state) => state.setExpeditions);
  const setIsLoading = useExpeditionsStore((state) => state.setIsLoading);

  const router = useRouter();

  useEffect(() => {
    setExpeditions(expeditions);
  }, []);

  useEffect(() => {
    const handleRouteChange = (route: string) => {
      setIsLoading(true);

      const parsedRoute = parse(route.split('?')[1]);

      fetch(getExpeditionsUrl(parsedRoute))
        .then((res) => res.json())
        .then((data) => {
          window.scroll({ top: 0, behavior: 'smooth' });
          setExpeditions(data);
        });
    };

    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, []);

  return (
    <Layout>
      <Head>
        <title>Antarctic Explorer</title>
        <meta
          name='description'
          content='Embark on an Antarctic adventure with Antarctica Explorer. Discover curated expeditions to Antarctica sourced from renowned expedition cruise lines, such as Lindblad and Quark Expeditions. Explore the wonders of the icy continent through our comprehensive selection of voyages, offering unforgettable experiences amidst breathtaking landscapes and unique wildlife encounters.'
        />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Expeditions />

      {isLoading && (
        <div className='fixed bottom-0 left-0 right-0 top-0 z-50 flex bg-[hsla(0,0%,100%,0.5)]'>
          <Loader className='my-auto' />
        </div>
      )}
    </Layout>
  );
}

export const getServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const res = await fetch(getExpeditionsUrl(context.query));

  const expeditions: ExpeditionsResponse = await res.json();

  return { props: { expeditions } };
};
